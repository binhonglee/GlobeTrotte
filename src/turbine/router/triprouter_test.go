package router

import (
	"net/http"
	"strconv"
	"testing"

	wings "github.com/binhonglee/GlobeTrotte/src/turbine/wings"
)

var addedTrip wings.Trip
var addedUser wings.User

func TestAddUser(t *testing.T) {
	var newUser = wings.NewUser{
		Email:    "routertest@test.com",
		Password: "shouldReplaceThisWithRand",
	}

	var returned *wings.User
	addTest("/user", t, &newUser, &returned)
	addedUser = *returned

	if returned.Email != newUser.Email {
		t.Errorf(
			"Sent Email is %v but returned Email is %v.",
			newUser.Email,
			returned.Email,
		)
	}
}

func TestGetUser(t *testing.T) {
	var returned *wings.User
	getTest(
		"/user/"+strconv.Itoa(addedUser.GetID()),
		t,
		&returned,
		http.StatusOK,
	)

	if returned.ID != addedUser.ID {
		t.Errorf(
			"Expected ID is %v but returned ID is %v.",
			strconv.Itoa(addedUser.ID),
			strconv.Itoa(returned.ID),
		)
	}

	if returned.Name != addedUser.Name {
		t.Errorf(
			"Expected Name is %v but returned Name is %v.",
			addedUser.Name,
			returned.Name,
		)
	}

	if returned.Email != addedUser.Email {
		t.Errorf(
			"Expected Email is %v but returned Email is %v.",
			addedUser.Email,
			returned.Email,
		)
	}
}

func TestAddTrip(t *testing.T) {
	var newTrip = wings.Trip{
		UserID:      addedUser.ID,
		Name:        "TestUser",
		Cities:      []wings.City{wings.SanFranciscoCAUS},
		Description: "Description",
	}

	var returned *wings.Trip
	addTest("/trip", t, &newTrip, &returned)
	addedTrip = *returned

	if returned.Name != newTrip.Name {
		t.Errorf(
			"Sent Name is %v but returned Name is %v.",
			newTrip.Name,
			returned.Name,
		)
	}

	if len(returned.Cities) != len(newTrip.Cities) {
		t.Errorf(
			"Sent numbers of Cities is %v but returned number of Cities is %v.",
			len(newTrip.Cities),
			len(returned.Cities),
		)
	}

	if returned.Description != newTrip.Description {
		t.Errorf(
			"Sent Description is %v but returned Description is %v.",
			newTrip.Description,
			returned.Description,
		)
	}
}

func TestGetTrip(t *testing.T) {
	var returned *wings.Trip
	getTest("/trip/"+strconv.Itoa(addedTrip.GetID()), t, &returned, http.StatusOK)

	if returned.ID != addedTrip.ID {
		t.Errorf(
			"Expected ID is %v but returned ID is %v.",
			strconv.Itoa(addedTrip.ID),
			strconv.Itoa(returned.ID),
		)
	}

	if returned.Name != addedTrip.Name {
		t.Errorf(
			"Expected Name is %v but returned Name is %v.",
			addedTrip.Name,
			returned.Name,
		)
	}

	if len(returned.Cities) != len(addedTrip.Cities) {
		t.Errorf(
			"Sent numbers of Cities is %v but returned number of Cities is %v.",
			len(addedTrip.Cities),
			len(returned.Cities),
		)
	}

	if returned.Description != addedTrip.Description {
		t.Errorf(
			"Expected Description is %v but returned Description is %v.",
			addedTrip.Description,
			returned.Description,
		)
	}
}

func TestGetNonExistentTrip(t *testing.T) {
	var returned *wings.Trip
	getTest("/trip/"+strconv.Itoa(-1), t, &returned, http.StatusNotFound)
}

func TestDeleteTrip(t *testing.T) {
	deleteTest("/trip/"+strconv.Itoa(addedTrip.GetID()), t, http.StatusOK)
}

func TestDeleteNonExistentTrip(t *testing.T) {
	deleteTest("/trip/"+strconv.Itoa(-1), t, http.StatusNotFound)
}

func TestDeleteUser(t *testing.T) {
	deleteTest("/user/"+strconv.Itoa(addedUser.GetID()), t, http.StatusOK)
}

func TestDeleteNonExistentUser(t *testing.T) {
	deleteTest("/user/"+strconv.Itoa(-1), t, http.StatusNotFound)
}
