package database

import (
	"strconv"
	"testing"
	"time"

	wings "github.com/binhonglee/GlobeTrotte/src/turbine/wings"
)

var newNewUser wings.NewUser
var newUser wings.User
var newTrip wings.Trip

func TestAddNewUserDB(t *testing.T) {
	failCondition := -1
	newNewUser = wings.NewUser{
		Name:     "DummyUser",
		Email:    "dbinteraction_test@dummyuser.com",
		Password: "shouldReplaceThisWithRand",
	}
	if actual := NewUserDB(&newNewUser); actual == failCondition {
		t.Errorf("NewUserDB(), unable to add new user.")
	} else {
		newNewUser.ID = actual
	}
}

func TestGetUserDB(t *testing.T) {
	retrievedUser, ok := GetUserDB(newNewUser.ID, newNewUser.ID).(*wings.User)
	if !ok {
		t.Errorf("GetUserDB(), somehow does not return 'User' object.")
		return
	}

	if retrievedUser.ID != newNewUser.ID {
		t.Errorf(
			"GetUserDB(), given ID is %v but expected ID is %v.",
			strconv.Itoa(retrievedUser.ID),
			strconv.Itoa(newNewUser.ID),
		)
	}
	if retrievedUser.Name != newNewUser.Name {
		t.Errorf(
			"GetUserDB(), given name is %v but expected name is %v.",
			retrievedUser.Name,
			newNewUser.Name,
		)
	}
	/* TODO: newNewUser does not have the "bio" field
	 */
	// if retrievedUser.Bio != newNewUser.Bio {
	//     t.Errorf(
	//         "GetUserDB(), given bio is %v but expected bio is %v.",
	//         retrievedUser.Bio,
	//         newNewUser.Bio,
	//     )
	// }
	if retrievedUser.Email != newNewUser.Email {
		t.Errorf(
			"GetUserDB(), given email is %v but expected email is %v.",
			retrievedUser.Email,
			retrievedUser.Email,
		)
	}
	/* TODO: Implement test to make sure data is consistent
	 * Not sure what's a good way to track the accurate timestamp when its added in the DB
	 */
	// if retrievedUser.TimeCreated != newNewUser.TimeCreated {
	//     t.Errorf("GetUserDB(), retrieved user time created is different from the added")
	// }
	newUser = *retrievedUser
}

func TestUpdatedUserDB(t *testing.T) {
	newUser.Name = "NewDummyUser"
	newUser.Trips = append(newUser.Trips, 1)

	if update := UpdateUserDB(&newUser); !update {
		t.Errorf("UpdateUserDB(), failed to update user.")
		return
	}

	updatedUser, ok := GetUserDB(newUser.ID, newUser.ID).(*wings.User)
	if !ok {
		t.Errorf("GetUserDB(), somehow does not return 'User' object.")
		// t.Errorf(strconv.Itoa(updatedUser.GetID()))
		return
	}

	if updatedUser.Name != newUser.Name {
		t.Errorf(
			"UpdateUserDB(), given Name is %v but expected Name is %v.",
			updatedUser.Name,
			newUser.Name,
		)
	}

	var given = tripsToString(updatedUser.Trips)
	var expected = tripsToString(newUser.Trips)

	if given != expected {
		t.Errorf(
			"UpdateUserDB(), given Trips are " +
				given + " but expected Trips are " +
				expected + ".",
		)
	}
}

func TestAddTripDB(t *testing.T) {
	failCondition := -1
	newTrip = wings.Trip{
		Name:        "DummyTrip",
		UserID:      newUser.ID,
		Description: "dummytrip.com",
		Cities:      []wings.City{wings.SanFranciscoCAUS},
		Days: []wings.Day{
			{
				DayOf: 1,
				Places: []wings.Place{
					{
						Label:       "Location 1",
						URL:         "https://globetrotte.com",
						Description: "example place",
					},
				},
			},
		},
		TimeCreated: time.Now(),
		LastUpdated: time.Now(),
	}

	if actual := AddTripDB(newTrip); actual == failCondition {
		t.Errorf("AddTripDB(), unable to add new trip. " + strconv.Itoa(actual))
	} else {
		newTrip.ID = actual
	}
}

func TestGetTripDB(t *testing.T) {
	retrievedTrip := GetTripDBWithID(newTrip.ID)
	if retrievedTrip.ID != newTrip.ID {
		t.Errorf(
			"GetTripDB(), given ID is %v but expected ID is %v.",
			strconv.Itoa(retrievedTrip.ID),
			strconv.Itoa(newTrip.ID),
		)
	}
	if retrievedTrip.UserID != newTrip.UserID {
		t.Errorf(
			"GetTripDB(), given UserID is %v but expected UserID is %v.",
			strconv.Itoa(retrievedTrip.UserID),
			strconv.Itoa(newTrip.UserID),
		)
	}
	if retrievedTrip.Name != newTrip.Name {
		t.Errorf(
			"GetTripDB(), given Name is %v but expected Name is %v.",
			retrievedTrip.Name,
			newTrip.Name,
		)
	}
	if retrievedTrip.Description != newTrip.Description {
		t.Errorf(
			"GetTripDB(), given Description is %v but expected Description is %v.",
			retrievedTrip.Description,
			newTrip.Description,
		)
	}
	/* TODO: Implement test to make sure data is consistent
	 * This test currently fails (even with the equivalent data) since accuracy is lost when converting timestamp back from PostgresQL
	 */
	// if retrievedTrip.TimeCreated != newTrip.TimeCreated {
	//     t.Errorf("GetTripDB(), retrieved trip time created is different from the added")
	// }
}

func TestUpdateTripDB(t *testing.T) {
	newTrip.Name = "new Name for DummyTrip"
	newTrip.Description = "new description for dummytrip.com"
	newTrip.LastUpdated = time.Now()

	if update := UpdateTripDB(newTrip); !update {
		t.Errorf("UpdateTripDB(), failed to update trip.")
		return
	}

	updatedTrip := GetTripDBWithID(newTrip.ID)
	if updatedTrip.Name != newTrip.Name {
		t.Errorf(
			"UpdateTripDB(), given Name is %v but expected Name is %v.",
			updatedTrip.Name,
			newTrip.Name,
		)
	}

	if updatedTrip.Description != newTrip.Description {
		t.Errorf(
			"UpdateTripDB(), given Description is %v but expected Description is %v.",
			updatedTrip.Description,
			newTrip.Description,
		)
	}

	// if updatedTrip.LastUpdated != newTrip.LastUpdated {
	//     t.Errorf(
	//         "UpdateTripDB(), given LastUpdated is %v but expected LastUpdated is %v.",
	//         updatedTrip.LastUpdated,
	//         newTrip.LastUpdated,
	//     )
	// }
}

func TestDeleteTripDB(t *testing.T) {
	if !DeleteTripDB(newTrip) {
		t.Errorf("DeleteTripDB(), unable to delete trip.")
	}
	id := GetTripDBWithID(newTrip.ID).ID
	if id > 0 {
		t.Errorf("DeleteTripDB(), deleted Trip still exist in database.")
	}
}

func TestDeleteUserDB(t *testing.T) {
	if !DeleteUserDB(&newUser) {
		t.Errorf("DeleteUserDB(), unable to delete user.")
	}
	id := GetUserDB(newUser.ID, newUser.ID).GetID()
	if id > 0 {
		t.Errorf("DeleteUserDB(), deleted User still exist in database.")
	}
}
