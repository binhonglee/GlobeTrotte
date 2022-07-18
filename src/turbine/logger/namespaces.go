package logger

type Namespace string

// This is hardcoded since its not currently possible to
// iterate through an enum to programmatically figure
// this out.
var namespaceLen = 8

const (
	Main   = "main"
	Router = "router"

	Access   = "access"
	Config   = "config"
	Database = "database"
	Email    = "email"
	Flags    = "flags"
	NonProd  = "nonprod"
	Parsing  = "parsing"
	Trip     = "trip"
	User     = "user"

	// These are kept private since they should only be used
	// in this package anyway
	logger = "logger"
	debug  = "debug"
)
