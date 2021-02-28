// This is a generated file
// This file will be regenerated on each build thus changes here will be overwritten
//
// If you would like to make any changes, please edit the source file (src/wings/struct/user_obj.wings)
// and run the following command:
// plz build //src/wings/...

package user

import (
	wings "github.com/binhonglee/GlobeTrotte/src/turbine/wings"
	"time"
)

// UserObj - All information of a single user.
type UserObj struct {
	ID          int               `json:"id"`
	Details     wings.UserBasic   `json:"details"`
	Trips       []wings.TripBasic `json:"trips"`
	TimeCreated time.Time         `json:"time_created"`
}

// GetID (istruct) - Returns the user ID.
func (user UserObj) GetID() int {
	return user.ID
}

// SetID (istruct) - Sets the user ID.
func (user *UserObj) SetID(id int) {
	user.ID = id
}

// UserObjs - An array of UserObj
type UserObjs []UserObj
