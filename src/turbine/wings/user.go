// This is a generated file
//
// If you would like to make any changes, please edit the source file (src/wings/struct/user.wings)
// and run the following command:
// plz build //src/wings/...

package wings

import (
	"time"
)

// User - User - An individual registered user.
type User struct {
	ID             int          `json:"id"`
	Name           string       `json:"name"`
	Email          string       `json:"email"`
	Bio            string       `json:"bio"`
	TimeCreated    time.Time    `json:"time_created"`
	Trips          []int        `json:"trips"`
	Confirmed      bool         `json:"confirmed"`
}

// GetID (istruct) - Returns the trip ID.
func (user User) GetID() int {
	return user.ID
}

// SetID (istruct) - Sets the trip ID.
func (user *User) SetID(id int) {
	user.ID = id
}

// Users - An array of User
type Users []User
