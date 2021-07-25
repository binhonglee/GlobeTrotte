package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
	"strings"
)

type gopkg struct {
	name    string
	version string
	deps    []string
}

type Config struct {
	Ignore     map[string]bool     `json:"ignore"`
	Install    map[string][]string `json:"install"`
	Name       string              `json:"name"`
	OutputFile string              `json:"output"`
	Silent     bool                `json:"silent"`
}

func main() {
	jsonFile, err := os.Open(os.Args[1])
	byteValue, _ := ioutil.ReadAll(jsonFile)
	var config Config
	json.Unmarshal(byteValue, &config)

	f, _ := os.Create(config.OutputFile)
	defer f.Close()

	packages := make(map[string]gopkg)

	cmd := exec.Command("go", "mod", "graph")
	stdout, err := cmd.Output()

	if err != nil {
		fmt.Println(err.Error())
		return
	}

	f.WriteString(`
# DO NOT EDIT MANUALLY AS IT IS GENERATED AND WILL BE OVERWRITTEN.
#
# This file is generated based on the provided 'go mod graph'. You can run
# 'plz go_mod' to regenerate the file.
#
# Source: src/turbine/scripts/genBUILD.go

package(default_visibility = ["PUBLIC"])
`)

	row := strings.Split(string(stdout), "\n")
	for i := 0; i < len(row); i++ {
		words := strings.Split(row[i], " ")

		if len(words) != 2 {
			continue
		}

		key := strToGopkg(words[0])
		value := strToGopkg(words[1])

		if _, ok := config.Ignore[value.name]; ok {
			continue
		}

		if pkg, ok := packages[key.name]; ok {
			key = pkg
		}

		key.deps = append(key.deps, value.name)
		packages[key.name] = key

		if _, ok := packages[value.name]; !ok {
			packages[value.name] = value
		}
	}

	for _, gopkg := range packages {
		if gopkg.name == config.Name {
			continue
		}
		f.WriteString(printGopkg(gopkg, config.Install))
	}

	f.Sync()

	if !config.Silent {
		prefix := "//" + strings.TrimSuffix(config.OutputFile, "/BUILD")
		fmt.Println(getDeps(packages[config.Name].deps, prefix))
	}
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

func printGopkg(pkg gopkg, install map[string][]string) string {
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
	if installs, ok := install[pkg.name]; ok {
		replacement := "\n  install = ["

		for _, value := range installs {
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

func getDeps(deps []string, prefix string) string {
	if len(deps) < 1 {
		return ""
	}

	toReturn := ""
	for i := 0; i < len(deps); i++ {
		line := `
    "$DEP",`
		line = strings.Replace(line, "$DEP", prefix+":"+getModuleName(deps[i]), 1)
		toReturn += line
	}

	return "\n  deps = [" + toReturn + "\n  ],"
}
