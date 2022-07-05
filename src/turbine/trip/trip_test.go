package trip

import (
	"strconv"
	"testing"

	"github.com/binhonglee/GlobeTrotte/src/turbine/database"
	"github.com/binhonglee/GlobeTrotte/src/turbine/wings"
)

var user wings.UserBasic
var trip TripObj

func TestNewTrip(t *testing.T) {
	failCondition := -1
	newNewUser := wings.NewUser{
		Name:     "DummyUser",
		Username: "triptestdummyuser",
		Email:    "trip_test@testuser.globetrotte.com",
		Password: "shouldReplaceThisWithRand",
	}
	id, _ := database.NewUserDB(newNewUser)
	user, _ = database.GetUserBasicDBWithID(id)

	newTrip := wings.TripBasic{
		Name: "DummyTrip",
		Cities: []wings.ParsedCity{
			{
				ID:      1840000455,
				Display: "Boston, Massachusetts",
				Iso2:    "US",
			},
		},
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
		Description: "dummytrip.com",
		Private:     true,
		SharedWith:  []wings.UserAccessLevel{},
	}

	trip = NewTrip(newTrip, user)

	if trip.ID == failCondition {
		t.Errorf("NewTrip(), unable to add new trip. " + strconv.Itoa(trip.ID))
	}
}

func TestGetTrip(t *testing.T) {
	retrievedTrip := GetTripObj(trip.ID, user)

	if retrievedTrip.ID != trip.ID {
		t.Errorf(
			"GetTripObj(), given ID is %v but expected ID is %v.",
			strconv.Itoa(retrievedTrip.ID),
			strconv.Itoa(trip.ID),
		)
	}

	if retrievedTrip.User.ID != trip.User.ID {
		t.Errorf(
			"GetTripObj(), given UserID is %v but expected UserID is %v.",
			strconv.Itoa(retrievedTrip.User.ID),
			strconv.Itoa(trip.User.ID),
		)
	}

	if retrievedTrip.Details.ID != trip.Details.ID {
		t.Errorf(
			"GetTripObj(), given ID is %v but expected ID is %v.",
			strconv.Itoa(retrievedTrip.Details.ID),
			strconv.Itoa(trip.Details.ID),
		)
	}

	if retrievedTrip.Details.Name != trip.Details.Name {
		t.Errorf(
			"GetTripObj(), given Name is %v but expected Name is %v.",
			retrievedTrip.Details.Name,
			trip.Details.Name,
		)
	}

	if retrievedTrip.Details.Description != trip.Details.Description {
		t.Errorf(
			"GetTripObj(), given Description is %v but expected Description is %v.",
			retrievedTrip.Details.Description,
			trip.Details.Description,
		)
	}
	/* TODO: Implement test to make sure data is consistent
	 * This test currently fails (even with the equivalent data) since accuracy is lost when converting timestamp back from PostgresQL
	 */
	// if retrievedTrip.TimeCreated != newTrip.TimeCreated {
	//     t.Errorf("GetTripDB(), retrieved trip time created is different from the added")
	// }
}

func TestUpdateTrip(t *testing.T) {
	trip.Details.Name = "new Name for DummyTrip"
	trip.Details.Description = "new description for dummytrip.com"
	updatedTrip := UpdateTripObj(trip, user)

	if updatedTrip.Details.Name != trip.Details.Name {
		t.Errorf(
			"UpdateTripObj(), given Name is %v but expected Name is %v.",
			updatedTrip.Details.Name,
			trip.Details.Name,
		)
	}

	if updatedTrip.Details.Description != trip.Details.Description {
		t.Errorf(
			"UpdateTripObj(), given Description is %v but expected Description is %v.",
			updatedTrip.Details.Description,
			trip.Details.Description,
		)
	}

	if updatedTrip.LastUpdated == trip.LastUpdated {
		t.Errorf(
			"UpdateTripObj(), given LastUpdated is %v but expected LastUpdated is %v.",
			updatedTrip.LastUpdated,
			trip.LastUpdated,
		)
	}
}

func TestDeleteTrip(t *testing.T) {
	if !DeleteTripObj(trip, user) {
		t.Errorf("DeleteTripObj(), unable to delete trip.")
	}
	id := GetTripObj(trip.ID, user).ID
	if id > 0 {
		t.Errorf("DeleteTripObj(), deleted Trip still exist in database.")
	}
}

func TestCleanup(t *testing.T) {
	if !database.DeleteUserDBWithID(user.ID) {
		t.Errorf("DeleteUserDB(), unable to delete user.")
	}
	u, _ := database.GetUserBasicDBWithID(user.ID)
	if u.ID > 0 {
		t.Errorf("DeleteUserDB(), deleted User still exist in database.")
	}
}
