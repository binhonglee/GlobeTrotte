// This is a generated file
//
// If you would like to make any changes, please edit the source file (src/wings/struct/confirm_email.wings)
// and run the following command:
// plz build //src/wings/...

package wings

// ConfirmEmail - Email confirmation object.
type ConfirmEmail struct {
	Uuid      string    `json:"uuid"`
	Email     string    `json:"email"`
	Userid    int       `json:"userid"`
}

// ConfirmEmails - An array of ConfirmEmail
type ConfirmEmails []ConfirmEmail
