// This is a generated file
// This file will be regenerated on each build thus changes here will be overwritten
//
// If you would like to make any changes, please edit the source file (src/wings/enum/access_level.wings)
// and run the following command:
// plz build //src/wings/...

package wings

type AccessLevel int

const (
	None = iota
	View = iota
	Edit = iota
	Owner = iota
)
