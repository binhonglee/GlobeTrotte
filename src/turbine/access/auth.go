// DO NOT EDIT THIS FILE DIRECTLY!
// Edits will be overwritten on build.
//
// If you would like to make any changes, please edit the source file (src/wings/struct/auth.wings)
// and run the following command:
// plz build //src/wings/...

package access

// Auth -
type Auth struct {
	ID        int    `json:"id"`
	Username  string `json:"username"`
	Confirmed bool   `json:"confirmed"`
}

// Auths - An array of Auth
type Auths []Auth