// This is a generated file
// This file will be regenerated on each build thus changes here will be overwritten
//
// If you would like to make any changes, please edit the source file (src/wings/struct/email_obj.wings)
// and run the following command:
// plz build //src/wings/...

package email

// EmailObj - Email confirmation object.
type EmailObj struct {
	Uuid   string `json:"uuid"`
	Email  string `json:"email"`
	Userid int    `json:"userid"`
}

// EmailObjs - An array of EmailObj
type EmailObjs []EmailObj
