package user

import (
	"regexp"
	"strconv"
	"strings"

	"github.com/binhonglee/GlobeTrotte/src/turbine/database"
	"github.com/binhonglee/GlobeTrotte/src/turbine/email"
	"github.com/binhonglee/GlobeTrotte/src/turbine/logger"
	"github.com/binhonglee/GlobeTrotte/src/turbine/wings"
)

func DummyUserObj() UserObj {
	user := UserObj{}
	user.ID = -1
	return user
}

func NewUser(newUser wings.NewUser) RegistrationResponse {
	user := UserObj{}
	if len(newUser.Username) < 3 {
		return RegistrationResponse{
			User:  DummyUserObj(),
			Error: wings.UsernameTooShort,
		}
	}
	if !regexp.MustCompile(`^[a-zA-Z]+[a-zA-Z0-9]*$`).MatchString(newUser.Username) {
		return RegistrationResponse{
			User:  DummyUserObj(),
			Error: wings.UsernameInvalid,
		}
	}
	newUser.Username = strings.ToLower(newUser.Username)
	id, err := database.NewUserDB(&newUser)
	if id < 1 {
		return RegistrationResponse{
			User:  DummyUserObj(),
			Error: err,
		}
	}

	user.ID = id
	// TODO: Gracefully fail email creation / sending. Its just ignored for now.
	email.NewEmail(user.ID, newUser.Email)
	return RegistrationResponse{
		User:  GetUserObj(user.ID, user.ID),
		Error: wings.Success,
	}
}

func GetUserObjWithUsername(username string, self int) UserObj {
	return GetUserObj(database.GetUserIDWithUsername(username), self)
}

func GetUserObj(id int, self int) UserObj {
	user := UserObj{}
	user.Details = database.GetUserBasicDBWithID(id)

	tripIDs := database.GetUserTripsWithID(id)
	for _, tripID := range tripIDs {
		trip := database.GetTripBasicWithID(tripID)
		if !trip.Private || database.GetTripOwnerWithID(tripID) == self {
			user.Trips = append(user.Trips, trip)
		}
	}

	success, timeCreated := database.GetTimeInfoDBWithID(id)
	if success {
		user.ID = id
		user.TimeCreated = timeCreated
		return user
	}
	return DummyUserObj()
}

func UpdateUserObj(toUpdate wings.UserBasic, self int) UserObj {
	if toUpdate.ID == self && database.UpdateUserBasicDB(toUpdate) {
		return GetUserObj(self, self)
	}
	logger.Print(
		logger.User,
		"User "+strconv.Itoa(self)+
			" attempt to update "+strconv.Itoa(toUpdate.ID)+
			" failed as updating other users is not allowed.",
	)
	return DummyUserObj()
}

func DeleteUserObj(toDelete wings.UserBasic, self int) bool {
	if self != toDelete.ID ||
		!same(toDelete, database.GetUserBasicDBWithID(self)) {
		logger.Print(
			logger.User,
			"User "+strconv.Itoa(self)+
				" attempt to delete "+strconv.Itoa(toDelete.ID)+
				" failed as user detail is not synced.",
		)
		return false
	}

	// Writing it this way to make sure all deletion process is always ran
	// regardless of any failure status.
	success := database.DeleteEmailsDB(toDelete.ID)
	success = database.DeleteTripWithOwnerIDDB(toDelete.ID) && success
	return database.DeleteUserDBWithID(toDelete.ID) && success
}

// Deprecated: This bypasses proper privacy checks.
func GetUserObjWithEmail(email string) UserObj {
	id := database.GetUserIDDBWithEmail(email)
	return GetUserObj(database.GetUserIDDBWithEmail(email), id)
}

func same(a wings.UserBasic, b wings.UserBasic) bool {
	return a.ID == b.ID &&
		a.Name == b.Name &&
		a.Email == b.Email &&
		a.Bio == b.Bio
}
