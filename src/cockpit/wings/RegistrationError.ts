// DO NOT EDIT THIS FILE DIRECTLY!
// Edits will be overwritten on build.
//
// If you would like to make any changes, please edit the source file (src/wings/enum/registration_error.wings)
// and run the following command:
// plz build //src/wings/...

enum RegistrationError {
  InvalidType,
  EmailAlreadyExists,
  EmailInvalid,
  UsernameInvalid,
  UsernameTaken,
  UsernameTooShort,
  Success,
}

export default RegistrationError;