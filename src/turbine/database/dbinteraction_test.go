package database

import (
	"strconv"
	"testing"

	wings "github.com/binhonglee/GlobeTrotte/src/turbine/wings"
)

var newNewUser wings.NewUser
var newUser wings.UserBasic
var newTrip wings.TripBasic

// var newTripExtra TripExtra
var newUserExtra UserExtra

func TestAddNewUserDB(t *testing.T) {
	failCondition := -1
	newNewUser = wings.NewUser{
		Name:     "DummyUser",
		Email:    "dbinteraction_test@dummyuser.com",
		Password: "shouldReplaceThisWithRand",
	}
	if actual, _ := NewUserDB(newNewUser); actual == failCondition {
		t.Errorf("NewUserDB(), unable to add new user.")
	} else {
		newNewUser.ID = actual
	}
}

func TestGetUserDB(t *testing.T) {
	retrievedUser, extra := GetUserBasicDBWithID(newNewUser.ID)
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
	newUser = retrievedUser
	newUserExtra = extra
}

func TestUpdatedUserDB(t *testing.T) {
	newUser.Name = "NewDummyUser"
	newUserExtra.TripIDs = append(newUserExtra.TripIDs, 1)

	if update := UpdateUserBasicDB(newUser); !update {
		t.Errorf("UpdateUserBasicDB(), failed to update user.")
		return
	}

	if update := AddTripToUserDB(1, newUser); !update {
		t.Errorf("AddTripToUserDB(), failed to add trip onto user.")
		return
	}

	updatedUser, extra := GetUserBasicDBWithID(newUser.ID)
	if updatedUser.Name != newUser.Name {
		t.Errorf(
			"UpdateUserDB(), given Name is %v but expected Name is %v.",
			updatedUser.Name,
			newUser.Name,
		)
	}

	var given = tripsToString(extra.TripIDs)
	var expected = tripsToString(newUserExtra.TripIDs)

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
	newTrip = wings.TripBasic{
		Name:        "DummyTrip",
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
					{
						Label:       "Location 2",
						URL:         "https://globetrotte.app",
						Description: "example place 2",
					},
				},
				TravelTime: []wings.TravelTime{
					{
						ID:            -1,
						FromPlaceID:   0,
						ToPlaceID:     0,
						ToPlaceIndex:  1,
						TimeInMinutes: 10,
					},
				},
			},
		},
	}

	if actual := AddTripDB(newTrip, newUser.ID); actual == failCondition {
		t.Errorf("AddTripDB(), unable to add new trip. " + strconv.Itoa(actual))
	} else {
		newTrip.ID = actual
	}
}

func TestGetTripDB(t *testing.T) {
	retrievedTrip, retrievedExtra := GetTripBasicWithID(newTrip.ID)
	if retrievedTrip.ID != newTrip.ID {
		t.Errorf(
			"GetTripDB(), given ID is %v but expected ID is %v.",
			strconv.Itoa(retrievedTrip.ID),
			strconv.Itoa(newTrip.ID),
		)
	}
	if retrievedExtra.UserID != newUser.ID {
		t.Errorf(
			"GetTripDB(), given UserID is %v but expected UserID is %v.",
			strconv.Itoa(retrievedExtra.UserID),
			strconv.Itoa(newUser.ID),
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

	if update := UpdateTripDB(newTrip, newUser.ID); !update {
		t.Errorf("UpdateTripDB(), failed to update trip.")
		return
	}

	updatedTrip, _ := GetTripBasicWithID(newTrip.ID)
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
	trip, _ := GetTripBasicWithID(newTrip.ID)
	if trip.ID > 0 {
		t.Errorf("DeleteTripDB(), deleted Trip still exist in database.")
	}
}

func TestDeleteUserDBWithID(t *testing.T) {
	if !DeleteUserDBWithID(newUser.ID) {
		t.Errorf("DeleteUserDBWithID(), unable to delete user.")
	}
	u, _ := GetUserBasicDBWithID(newUser.ID)
	if u.ID > 0 {
		t.Errorf("DeleteUserDBWithID(), deleted User still exist in database.")
	}
}
