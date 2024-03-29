// DO NOT EDIT THIS FILE DIRECTLY!
// Edits will be overwritten on build.
//
// If you would like to make any changes, please edit the source file (src/wings/struct/new_user.wings)
// and run the following command:
// plz build //src/wings/...

package wings

// NewUser - Basic information for user registeration.
type NewUser struct {
	ID       int    `json:"id"`
	Username string `json:"username"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Bio      string `json:"bio"`
	Password string `json:"password"`
}

// GetID (istruct) - Returns the trip ID.
func (newUser NewUser) GetID() int {
	return newUser.ID
}

// SetID (istruct) - Sets the trip ID.
func (newUser *NewUser) SetID(id int) {
	newUser.ID = id
}

// NewUsers - An array of NewUser
type NewUsers []NewUser
