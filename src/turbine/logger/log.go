package logger

import (
	"fmt"
	"os"
	"strings"
	"time"
)

var startTime time.Time
var lastFileTime time.Time
var currentFile *os.File

func init() {
	startTime = time.Now()
	createNewLogFile()
}

func getFile() *os.File {
	// This is pretty arbitrary and might need to be fine
	// tuned overtime
	if time.Since(lastFileTime).Hours() > 24.0 {
		currentFile.Close()
		createNewLogFile()
	}
	return currentFile
}

func createNewLogFile() {
	lastFileTime = time.Now()
	filename := strings.ReplaceAll(
		lastFileTime.Format(time.RFC3339), ":", "_")
	filename = strings.ReplaceAll(filename, "-", "")
	currentFile, _ = os.Create(filename + ".log")
	Print(logger, "New log file created: "+currentFile.Name())
	defer currentFile.Close()
}

// Print the message into the log file and the command line
func Print(namespace Namespace, message string) {
	getFile().WriteString(getMessage(namespace, message))
}

// Similar to Print() but calls panic right after
func Panic(namespace Namespace, message string) {
	getFile().WriteString(
		"panic: " + getMessage(namespace, message))
	panic(message)
}

// Triggers Panic() on the condition that `if err != nil`
func PanicErr(
	namespace Namespace, err error, message string) {
	if err != nil {
		getFile().WriteString(getMessage(namespace, message))
		Panic(namespace, err.Error())
	}
}

func getMessage(namespace Namespace, message string) string {
	namespaceStr := string(namespace) +
		strings.Repeat(" ", namespaceLen-len(string(namespace)))
	fmt.Println(
		time.Now().Format(time.Stamp)[7:] + " " +
			namespaceStr + " : " + message)
	return time.Now().Format(time.RFC3339) +
		" " + namespaceStr + " : " + message
}
