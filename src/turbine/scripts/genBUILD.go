package main

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
	"os/exec"
	"sort"
	"strings"
	"sync"
	"time"
)

type Config struct {
	Install    map[string][]string `json:"install"`
	OutputFile string              `json:"output"`
	Silent     bool                `json:"silent"`
}

type gopkg struct {
	name     string
	key      string
	version  string
	deps     map[string]bool
	installs map[string]bool
}

type golistmod struct {
	Path    string `json:"Path"`
	Version string `json:"Version"`
}

type golistobj struct {
	ImportPath string    `json:"ImportPath"`
	Module     golistmod `json:"Module"`
	Deps       []string  `json:"Deps"`
}

type node struct {
	next *node
	key  string
	val  *golistobj
}

type llist struct {
	head *node
	tail *node
}

var toProcess llist
var processed map[string]string
var f *os.File
var config Config

func main() {
	start := time.Now()
	jsonFile, err := os.Open(os.Args[1])
	directDeps := []string{}
	if err != nil {
		panic(err)
	}
	byteValue, _ := io.ReadAll(jsonFile)
	json.Unmarshal(byteValue, &config)
	var wg sync.WaitGroup
	wg.Add(2)
	var moduleName string
	var row []string
	go func() {
		moduleName = strings.TrimSpace(string(run("go", "list", "-m")))
		wg.Done()
	}()
	go func() {
		row = strings.Split(string(run("go", "mod", "graph")), "\n")
		wg.Done()
	}()
	wg.Wait()

	f, _ = os.Create(config.OutputFile)
	defer f.Close()

	packages := make(map[string]gopkg)
	f.WriteString(`
# DO NOT EDIT MANUALLY AS IT IS GENERATED AND WILL BE OVERWRITTEN.
#
# This file is generated based on the provided 'go mod graph'. You can run
# 'plz go_mod' to regenerate the file.
#
# Source: src/turbine/scripts/genBUILD.go

package(default_visibility = ["PUBLIC"])

go_toolchain(
    name = "toolchain",
    version = "1.24.0",
)

go_stdlib(name = "std")
`)

	for i := 0; i < len(row); i++ {
		words := strings.Split(row[i], " ")
		if len(words) != 2 || words[0] != moduleName {
			break
		}

		value := strToGopkg(words[1])
		directDeps = append(directDeps, value.name)
	}
	fmt.Println(time.Since(start))

	sort.Strings(directDeps)
	processDirectDeps(directDeps)

	f.Sync()

	if !config.Silent {
		prefix := "//" + strings.TrimSuffix(config.OutputFile, "/BUILD")
		fmt.Println(getDeps(packages[moduleName].deps, prefix))
	}
	fmt.Println(time.Since(start))
}

func strToGopkg(rawString string) gopkg {
	words := strings.Split(rawString, "@")
	if len(words) > 2 {
		panic("More than 1 '@' sign found in string " + rawString)
	}
	toReturn := gopkg{}
	toReturn.name = words[0]
	if len(words) < 2 {
		return toReturn
	}
	toReturn.version = words[1]
	return toReturn
}

func printGopkgs(pkg gopkg) string {
	toReturn := `
go_module(
  name = "$NAME",
  module = "$MODULE",
  version = "$VERSION",$INSTALL$DEPS
)
`
	toReturn = strings.ReplaceAll(toReturn, "$NAME", getModuleName(pkg.name))
	toReturn = strings.ReplaceAll(toReturn, "$MODULE", pkg.name)
	toReturn = strings.ReplaceAll(toReturn, "$VERSION", pkg.version)
	if len(pkg.installs) > 0 {
		replacement := "\n  install = ["

		for _, value := range sortedKeys(pkg.installs) {
			replacement += "\n    \"" + value + "\","
		}
		replacement += "\n  ],"
		toReturn = strings.ReplaceAll(toReturn, "$INSTALL", replacement)
	} else {
		toReturn = strings.ReplaceAll(toReturn, "$INSTALL", "")
	}

	toReturn = strings.ReplaceAll(toReturn, "$DEPS", getDeps(pkg.deps, ""))
	return toReturn
}

func getModuleName(pkgName string) string {
	return strings.Join(strings.Split(pkgName, "/")[1:], "_")
}

func getDeps(deps map[string]bool, prefix string) string {
	if len(deps) < 1 {
		return ""
	}

	toReturn := ""
	for _, dep := range sortedKeys(deps) {
		line := `
    "$DEP",`
		line = strings.Replace(line, "$DEP", prefix+":"+getModuleName(dep), 1)
		toReturn += line
	}

	return "\n  deps = [" + toReturn + "\n  ],"
}

func (l *llist) add(key string, val *golistobj) {
	list := &node{
		next: nil,
		key:  key,
		val:  nil,
	}

	if val != nil {
		list.val = val
	}

	if l.head == nil {
		l.head = list
		l.tail = list
	} else {
		l.tail.next = list
		l.tail = list
	}
}

func nextUnprocessed(c *node) *node {
	if c == nil {
		return nil
	}
	if _, ok := processed[c.key]; ok {
		return nextUnprocessed(c.next)
	}
	return c
}

func processDirectDeps(directDeps []string) {
	pkgs := make(map[string]gopkg)
	processed = make(map[string]string)
	var wg sync.WaitGroup
	for _, name := range directDeps {
		installPkgs := []string{"."}
		if arr, ok := config.Install[name]; ok {
			installPkgs = arr
		}

		for _, i := range installPkgs {
			if i == "." {
				i = name
			} else {
				i = name + "/" + i
			}
			wg.Add(1)
			go func(i string) {
				newPkg := getModuleInfo(i, nil)

				if pkg, ok := pkgs[newPkg.name]; ok {
					newPkg = mergeGopkg(pkg, newPkg)
				}
				pkgs[newPkg.name] = newPkg
				processed[i] = newPkg.name
				wg.Done()
			}(i)
		}
	}

	wg.Wait()
	c := toProcess.head
	for {
		c = nextUnprocessed(c)
		for c != nil {
			newPkg := getModuleInfo(c.key, c.val)
			if pkg, ok := pkgs[newPkg.name]; ok {
				newPkg = mergeGopkg(pkg, newPkg)
			}
			pkgs[newPkg.name] = newPkg
			processed[c.key] = newPkg.name

			c = nextUnprocessed(c)
		}

		if nextUnprocessed(c) == nil {
			break
		}
	}

	keys := []string{}
	for k := range pkgs {
		keys = append(keys, k)
	}
	sort.Strings(keys)

	for _, k := range keys {
		if k == "" {
			continue
		}
		f.WriteString(printGopkgs(pkgs[k]))
	}
}

func getModuleInfo(name string, gmod *golistobj) gopkg {
	var mod golistobj
	if gmod == nil {
		res := runNoPanic("go", "list", "--json", name)
		if len(res) == 0 {
			return gopkg{}
		}

		json.Unmarshal(res, &mod)
	} else {
		mod = *gmod
	}

	var temp []string
	sort.Strings(mod.Deps)
	var wg sync.WaitGroup
	for _, dep := range mod.Deps {
		if strings.HasPrefix(dep, mod.Module.Path) {
			toProcess.add(dep, nil)
			continue
		}
		words := strings.Split(dep, "/")
		firstWord := strings.Split(words[0], ".")
		if len(words) >= 3 && len(firstWord) >= 2 {
			if val, ok := processed[dep]; ok {
				temp = append(temp, val)
			} else {
				wg.Add(1)
				go func(dep string) {
					var t golistobj
					json.Unmarshal(run("go", "list", "--json", dep), &t)
					if t.Module.Path == mod.Module.Path {
						return
					}
					temp = append(temp, t.Module.Path)
					toProcess.add(dep, &t)
					wg.Done()
				}(dep)
			}
		}
	}
	wg.Wait()
	mod.Deps = temp

	var toRet gopkg
	toRet.name = mod.Module.Path
	toRet.key = name
	toRet.deps = make(map[string]bool)
	for _, dep := range mod.Deps {
		toRet.deps[dep] = true
	}
	toRet.installs = make(map[string]bool)
	install := strings.TrimPrefix(mod.ImportPath, mod.Module.Path)
	if install == "" {
		install = "."
	} else {
		install = strings.TrimPrefix(install, "/")
	}
	toRet.installs[install] = true
	toRet.version = mod.Module.Version

	return toRet
}

func mergeGopkg(first gopkg, second gopkg) gopkg {
	if first.name != second.name || first.version != second.version {
		panic("Can't merge package of different name and / or version.")
	}

	for dep := range second.deps {
		if _, ok := first.deps[dep]; !ok {
			first.deps[dep] = true
		}
	}

	for install := range second.installs {
		if _, ok := first.installs[install]; !ok {
			first.installs[install] = true
		}
	}

	return first
}

func run(name string, args ...string) []byte {
	cmd := exec.Command(name, args...)
	stdout, err := cmd.Output()

	if err != nil {
		panic(err)
	}

	return stdout
}

func runNoPanic(name string, args ...string) []byte {
	cmd := exec.Command(name, args...)
	stdout, err := cmd.Output()

	if err != nil {
		return []byte{}
	}

	return stdout
}

func sortedKeys(m map[string]bool) []string {
	keys := make([]string, 0, len(m))
	for k := range m {
		keys = append(keys, k)
	}
	sort.Strings(keys)
	return keys
}
