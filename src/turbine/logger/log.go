package logger

import (
	"fmt"
	"os"
	"runtime"
	"strconv"
	"strings"
	"time"
)

const logDir = "logs"
const logExt = ".log"

var startTime time.Time
var lastFileTime time.Time
var currentFile *os.File

func init() {
	startTime = time.Now()
	createNewLogFile()
}

// Deprecated: Print an empty newline in terminal. Purely aesthetic reason.
func NewLine() {
	fmt.Println()
}

// Deprecated: DO NOT CALL THIS FUNCTION aside from `cleanup()` in main
func Cleanup() {
	currentFile.Close()
}

func archiveLog(filename string, exit bool) {
	if _, err := os.Stat(logDir); os.IsNotExist(err) {
		os.MkdirAll(logDir, 0755)
	}

	s := "Archiving " + filename + "..."

	if exit {
		Exit(logger, s)
	} else {
		Print(logger, s)
	}

	os.Rename(filename, logDir+"/"+filename)
}

func getFile() *os.File {
	// This shouldn't happen ever but just in case it does
	if currentFile == nil {
		createNewLogFile()
	}

	// This is pretty arbitrary and might need to be fine
	// tuned overtime
	if time.Since(lastFileTime).Hours() > 24.0 {
		// fn := currentFile.Name()
		currentFile.Close()
		// archiveLog(fn, false)
		createNewLogFile()
	}
	return currentFile
}

func createNewLogFile() {
	if _, err := os.Stat(logDir); os.IsNotExist(err) {
		os.MkdirAll(logDir, 0755)
	}
	lastFileTime = time.Now()
	filename := strings.ReplaceAll(
		lastFileTime.Format(time.RFC3339), ":", "_")
	filename = logDir + "/" + strings.ReplaceAll(filename, "-", "")
	currentFile, _ = os.Create(filename + logExt)
	Success(logger, "New log file created: "+currentFile.Name())
}

// This is used for logging in cleanup functions. Calls
// here are not guaranteed to be stored into the log files
// but will always be displayed in the terminal.
func Exit(namespace Namespace, message string) {
	if currentFile != nil {
		Print(namespace, message)
	} else {
		getMessage(none, namespace, message)
	}
}

// Print the message into the log file and the command line
func Print(namespace Namespace, message string) {
	messageToFile(none, namespace, message)
}

func Success(namespace Namespace, message string) {
	messageToFile(successC, namespace, message)
}

func Failure(namespace Namespace, message string) {
	messageToFile(errorC, namespace, message)
}

// Similar to Print() but calls panic right after
func Panic(namespace Namespace, message string) {
	messageToFile(panicC, namespace, message)
	panic(message)
}

// Triggers Panic() on the condition that `if err != nil`
func PanicErr(
	namespace Namespace, err error, message string) {
	if err != nil {
		messageToFile(none, namespace, message)
		Panic(namespace, err.Error())
	}
}

// Prints message in red indicating its an error
// (`if err != nil`) but does not call `panic()` nor ends
// the program
func Err(namespace Namespace, err error, message string) {
	if err != nil {
		s := message
		if len(s) < 1 {
			s = err.Error()
		}
		messageToFile(errorC, namespace, s)
	}
}

// This will print message to the terminal but not into the log file.
// Deprecated: DO NOT COMMIT USE OF THIS FUNCTION.
func Debug(message ...interface{}) {
	debugPrint(yellowC, message)
}

// Same as `Debug()` but green
// Deprecated: DO NOT COMMIT USE OF THIS FUNCTION.
func DebugGreen(message ...interface{}) {
	debugPrint(greenC, message)
}

// Same as `Debug()` but purple
// Deprecated: DO NOT COMMIT USE OF THIS FUNCTION.
func DebugPurple(message ...interface{}) {
	debugPrint(purpleC, message)
}

// Same as `Debug()` but cyan
// Deprecated: DO NOT COMMIT USE OF THIS FUNCTION.
func DebugCyan(message ...interface{}) {
	debugPrint(cyanC, message)
}

// Same as `Debug()` but blue
// Deprecated: DO NOT COMMIT USE OF THIS FUNCTION.
func DebugBlue(message ...interface{}) {
	debugPrint(blueC, message)
}

// Same as `Debug()` but pink
// Deprecated: DO NOT COMMIT USE OF THIS FUNCTION.
func DebugPink(message ...interface{}) {
	debugPrint(pinkC, message)
}

func messageToFile(
	status status, namespace Namespace, message string) {
	s := getMessage(status, namespace, message)
	getFile().WriteString(s)
}

func getMessage(status status, namespace Namespace, message string) string {
	namespaceStr := string(namespace) +
		strings.Repeat(" ", namespaceLen-len(string(namespace)))
	s := message + " " + getCaller(namespace, 4)

	fmt.Println(
		wrap(status, time.Now().Format(time.Stamp)[7:]+" "+
			namespaceStr+" : "+s))

	return time.Now().Format(time.RFC3339) +
		" " + namespaceStr + " : " + s + "\n"
}

func wrap(status status, message string) string {
	return string(status) + message + string(resetC)
}

func debugPrint(
	status status,
	a ...interface{},
) (n int, err error) {
	namespaceStr := string(debug) +
		strings.Repeat(" ", namespaceLen-len(string(debug)))
	return fmt.Println(
		time.Now().Format(time.Stamp)[7:],
		" "+namespaceStr+" : ",
		string(status), a,
		getCaller(debug, 3),
		string(resetC),
	)
}

func DebugCaller(level int) {
	_, file, no, ok := runtime.Caller(level)
	if ok {
		paths := strings.Split(file, "/")
		if paths[len(paths)-1] != "asm_amd64.s" {
			fmt.Println("(" + file + ":" + strconv.Itoa(no) + ")")
			DebugCaller(level + 2)
		}
	}
}

func getCaller(namespace Namespace, level int) string {
	_, file, no, ok := runtime.Caller(level)
	if ok {
		paths := strings.Split(file, "/")
		if paths[len(paths)-1] != "log.go" || namespace == logger || namespace == flags {
			return "(" + file + ":" + strconv.Itoa(no) + ")"
		} else {
			return getCaller(namespace, level+2)
		}
	}
	return ""
}
