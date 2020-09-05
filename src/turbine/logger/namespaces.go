package logger

type Namespace string

// This is hardcoded since its not currently possible to
// iterate through an enum to programmatically figure
// this out.
var namespaceLen = 8

const (
	Main     = "main"
	Router   = "router"
	Database = "database"
	// This is the only one kept private since it should only
	// be used in this package anyway
	logger = "logger"
)
