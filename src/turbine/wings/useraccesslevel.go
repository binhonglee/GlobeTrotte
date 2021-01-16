// This is a generated file
// This file will be regenerated on each build thus changes here will be overwritten
//
// If you would like to make any changes, please edit the source file (src/wings/struct/user_access_level.wings)
// and run the following command:
// plz build //src/wings/...

package wings

// UserAccessLevel - UserAccessLevel - User access level of a specific object.
type UserAccessLevel struct {
	ID        int            `json:"id"`
	ObjID     int            `json:"obj_id"`
	UserID    int            `json:"user_id"`
	Access    AccessLevel    `json:"access"`
}

// UserAccessLevels - An array of UserAccessLevel
type UserAccessLevels []UserAccessLevel
