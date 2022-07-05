package router

import (
	"net/http"
	"strconv"
	"strings"
	"testing"

	"github.com/binhonglee/GlobeTrotte/src/turbine/trip"
	"github.com/binhonglee/GlobeTrotte/src/turbine/user"
	"github.com/binhonglee/GlobeTrotte/src/turbine/wings"
)

var addedTrip trip.TripObj
var addedUser user.UserObj
var cookies *http.Cookie

func TestAddInvalidEmailUser(t *testing.T) {
	var newUser = wings.NewUser{
		Username: "structroutertestdummyuser",
		Email:    "wronglyformattedstring",
		Password: "shouldReplaceThisWithRand",
	}

	var returned *user.RegistrationResponse
	addTest("/v2/user", t, &newUser, &returned, true)
	if returned.User.ID != -1 {
		t.Errorf(
			"Returned ID is expected to be -1 (indicating failure) but was %v.",
			returned.User.ID,
		)
	}
}

func TestAddUser(t *testing.T) {
	var newUser = wings.NewUser{
		Username: "structroutertestdummyuser",
		Email:    "routertest@test.com",
		Password: "shouldReplaceThisWithRand",
	}

	var returned *user.RegistrationResponse
	addTest("/v2/user", t, &newUser, &returned, true)
	addedUser = returned.User

	if returned.User.GetID() == -1 {
		t.Errorf("User failed to add.")
	}

	if returned.User.Details.Email != newUser.Email {
		t.Errorf(
			"Sent Email is %v but returned Email is %v.",
			newUser.Email,
			returned.User.Details.Email,
		)
	}
}

func TestGetUser(t *testing.T) {
	var returned *user.UserObj
	getTest(
		"/v2/user/"+strconv.Itoa(addedUser.GetID()),
		t,
		&returned,
		http.StatusOK,
	)

	if _, diff := user.CompareUserObj(addedUser, *returned); len(diff) > 0 {
		t.Errorf(
			"The followings fields does not match:\n%v",
			strings.Join(diff, ", "),
		)
	}
}

func TestWrongPasswordLogin(t *testing.T) {
	loginTest(
		t, &wings.NewUser{
			Email:    "routertest@test.com",
			Password: "shouldReplaceThisWithAnotherRand",
		}, http.StatusAccepted,
	)
}

func TestCorrectPasswordLogin(t *testing.T) {
	loginTest(
		t, &wings.NewUser{
			Email:    "routertest@test.com",
			Password: "shouldReplaceThisWithRand",
		}, http.StatusAccepted,
	)
}

func TestAddTrip(t *testing.T) {
	var newTrip = wings.TripBasic{
		Name: "TestUser",
		Cities: []wings.ParsedCity{
			{
				ID:      1840000455,
				Display: "Boston, Massachusetts",
				Iso2:    "US",
			},
		},
		Days: []wings.Day{
			{
				DayOf:  0,
				Places: []wings.Place{},
			},
		},
		Description: "Description",
	}

	var returned *trip.TripObj
	addTest("/v2/trip", t, &newTrip, &returned, true)
	addedTrip = *returned

	if _, diff := removeIDFromArray(
		trip.CompareTripBasic(newTrip, returned.Details),
	); len(diff) > 1 {
		t.Errorf(
			"The followings fields does not match:\n%v",
			strings.Join(diff, ", "),
		)
	}
}

func TestGetTrip(t *testing.T) {
	var returned *trip.TripObj
	getTest("/v2/trip/"+strconv.Itoa(
		addedTrip.GetID()), t, &returned, http.StatusOK,
	)

	if _, diff := trip.CompareTripObj(addedTrip, *returned); len(diff) > 0 {
		t.Errorf(
			"The followings fields does not match:\n%v",
			strings.Join(diff, ", "),
		)
	}
}

func TestGetNonExistentTrip(t *testing.T) {
	var returned *trip.TripObj
	getTest("/v2/trip/"+strconv.Itoa(-1), t, &returned, http.StatusOK)

	if returned.ID > 0 {
		t.Errorf("Getting non-existent trip somehow does not return DummyTripObj.")
	}
}

func TestUpdateTrip(t *testing.T) {
	var returned *trip.TripObj
	addedTrip.Details.Description = "Updated description"

	updateTest(
		"/v2/trip/", t,
		&addedTrip, &returned, http.StatusOK,
	)

	if _, diff := trip.CompareTripObj(addedTrip, *returned); len(diff) > 0 {
		t.Errorf(
			"The followings fields does not match:\n%v",
			strings.Join(diff, ", "),
		)
	}
}

func TestUpdateUser(t *testing.T) {
	var returned *user.UserObj
	addedUser.Details.Name = "My NewName"
	addedUser.Details.ID = addedUser.ID

	updateTest(
		"/v2/user/", t,
		&addedUser.Details, &returned, http.StatusOK,
	)

	if _, diff := user.CompareUserObj(addedUser, *returned); len(diff) > 0 {
		t.Errorf(
			"The followings fields does not match:\n%v",
			strings.Join(diff, ", "),
		)
	}
}

func TestDeleteTrip(t *testing.T) {
	if !deleteTest(
		"/v2/trip/"+strconv.Itoa(addedTrip.GetID()),
		t, addedTrip,
	) {
		t.Errorf(
			"TestDeleteTrip, unable to delete trip.",
		)
	}
}

func TestDeleteNonExistentTrip(t *testing.T) {
	if deleteTest(
		"/v2/trip/"+strconv.Itoa(-1),
		t, trip.DummyTripObj(),
	) {
		t.Errorf(
			"TestDeleteNonExistentTrip, non existent trip deletion should return false.",
		)
	}
}

func TestDeleteUser(t *testing.T) {
	if !deleteTest(
		"/v2/user/"+strconv.Itoa(addedUser.GetID()),
		t, addedUser.Details,
	) {
		t.Errorf(
			"TestDeleteUser, unable to delete user.",
		)
	}
}

func TestDeleteNonExistentUser(t *testing.T) {
	if deleteTest(
		"/v2/user/"+strconv.Itoa(-1),
		t, user.DummyUserObj().Details,
	) {
		t.Errorf(
			"TestDeleteNonExistentUser, non existent user deletion should return false.",
		)
	}
}

func TestLogout(t *testing.T) {
	get("/logout", t, http.StatusOK)
}

func removeIDFromArray(status bool, arr []string) (bool, []string) {
	ret := []string{}
	for _, s := range arr {
		if s != "ID" {
			ret = append(ret, s)
		}
	}
	return status, ret
}
