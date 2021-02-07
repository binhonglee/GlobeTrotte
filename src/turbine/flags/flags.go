package flags

import (
	"flag"
	"strconv"
)

type flags struct {
	prodServer bool
	toFile     bool
	terminal   bool
}

var ran = false
var prod bool
var instanceFlags flags

var prodFlags = flags{
	prodServer: true,
	toFile:     true,
	terminal:   true,
}

var (
	fProd       *bool
	fProdServer *bool
	fToFile     *bool
	fTerminal   *bool
)

func init() {
	fProd = flag.Bool("prod", false, "")
	fProdServer = flag.Bool("prodServer", false, "")
	fToFile = flag.Bool("toFile", false, "")
	fTerminal = flag.Bool("terminal", true, "")
}

func Run() {
	if ran {
		return
	}

	if !flag.Parsed() {
		flag.Parse()
	}

	if *fProd {
		prod = true
		instanceFlags = prodFlags
		return
	}

	prod = false

	instanceFlags = flags{
		prodServer: *fProdServer,
		toFile:     *fToFile,
		terminal:   *fTerminal,
	}
}

func ProdServer() bool {
	return instanceFlags.prodServer
}

func ToFile() bool {
	return instanceFlags.toFile
}

func Terminal() bool {
	return instanceFlags.terminal
}

func IsProd() bool {
	return prod
}

func FlagStatuses() string {
	return "prodServer: " +
		strconv.FormatBool(instanceFlags.prodServer) +
		", toFile: " + strconv.FormatBool(instanceFlags.toFile) +
		", terminal: " + strconv.FormatBool(instanceFlags.terminal)
}
