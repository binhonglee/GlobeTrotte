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
	Email    = "email"
	Flags    = "flags"
	User     = "user"
	Access   = "access"
	NonProd  = "nonprod"

	// These are kept private since they should only be used
	// in this package anyway
	logger = "logger"
	debug  = "debug"
)
