// This is a generated file
// This file will be regenerated on each build thus changes here will be overwritten
//
// If you would like to make any changes, please edit the source file (src/wings/struct/user_basic.wings)
// and run the following command:
// plz build //src/wings/...

package wings

// UserBasic - Basic info of a user.
type UserBasic struct {
	ID           int       `json:"id"`
	Name         string    `json:"name"`
	Email        string    `json:"email"`
	Bio          string    `json:"bio"`
	Confirmed    bool      `json:"confirmed"`
}

// GetID (istruct) - Returns the trip ID.
func (user UserBasic) GetID() int {
	return user.ID
}

// SetID (istruct) - Sets the trip ID.
func (user *UserBasic) SetID(id int) {
	user.ID = id
}

// UserBasics - An array of UserBasic
type UserBasics []UserBasic
