package database

import (
    "strconv"
    "testing"
    "time"
    newuser "turbine/structs/newuser"
    place "turbine/structs/place"
    trip "turbine/structs/trip"
    user "turbine/structs/user"
)

var newNewUser newuser.NewUser
var newUser user.User
var newTrip trip.Trip

func TestAddNewUserDB(t *testing.T) {
    failCondition := -1
    newNewUser = newuser.NewUser{
        Name:        "DummyUser",
        Email:       "dummyuser.com",
        Password:    "shouldReplaceThisWithRand",
    }
    if actual := NewUserDB(&newNewUser); actual == failCondition {
        t.Errorf("NewUserDB(), unable to add new user.")
    } else {
        newNewUser.Id = actual
    }
}

func TestGetUserDB(t *testing.T) {
    retrievedUser, ok := GetUserDB(newNewUser.Id).(*user.User)
    if !ok {
        t.Errorf("GetUserDB(), somehow does not return 'User' object.")
        return
    }

    if retrievedUser.Id != newNewUser.Id {
        t.Errorf(
            "GetUserDB(), given ID is ",
            strconv.Itoa(retrievedUser.Id),
            " but expected ID is ",
            strconv.Itoa(newNewUser.Id),
            ".",
        )
    }
    if retrievedUser.Name != newNewUser.Name {
        t.Errorf(
            "GetUserDB(), given name is ",
            retrievedUser.Name,
            " but expected name is ",
            newNewUser.Name,
            ".",
        )
    }
    /* TODO: newNewUser does not have the "bio" field
     */
    // if retrievedUser.Bio != newNewUser.Bio {
    //     t.Errorf(
    //         "GetUserDB(), given bio is ",
    //         retrievedUser.Bio,
    //         " but expected bio is ",
    //         newNewUser.Bio,
    //         ".",
    //     )
    // }
    if retrievedUser.Email != newNewUser.Email {
        t.Errorf(
            "GetUserDB(), given email is ",
            retrievedUser.Email,
            " but expected email is ",
            retrievedUser.Email,
            ".",
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

    updatedUser, ok := GetUserDB(newUser.Id).(*user.User)
    if !ok {
        t.Errorf("GetUserDB(), somehow does not return 'User' object.")
        // t.Errorf(strconv.Itoa(updatedUser.GetID()))
        return
    }

    if updatedUser.Name != newUser.Name {
        t.Errorf(
            "UpdateUserDB(), given Name is ",
            updatedUser.Name,
            " but expected Name is ",
            newUser.Name,
            ".",
        )
    }

    var given = tripsToString(updatedUser.Trips)
    var expected = tripsToString(newUser.Trips)

    if given != expected {
        t.Errorf(
            // Breaking this into multiple lines somehow breaks its formatting
            "UpdateUserDB(), given Trips are " + given + " but expected Trips are " + expected + ".",
        )
    }
}

func TestAddTripDB(t *testing.T) {
    failCondition := -1
    newTrip = trip.Trip{
        Name:           "DummyTrip",
        UserId:         newUser.Id,
        Description:    "dummytrip.com",
        TimeCreated:    time.Now(),
        LastUpdated:    time.Now(),
    }

    if actual := AddTripDB(&newTrip); actual == failCondition {
        t.Errorf("AddTripDB(), unable to add new trip.")
    } else {
        newTrip.Id = actual
    }
}

func TestGetTripDB(t *testing.T) {
    retrievedTrip, ok := GetTripDB(newTrip.Id).(*trip.Trip)
    if !ok {
        t.Errorf("GetTripDB(), somehow does not return 'Trip' object.")
        return
    }

    if retrievedTrip.Id != newTrip.Id {
        t.Errorf(
            "GetTripDB(), given ID is ",
            strconv.Itoa(retrievedTrip.Id),
            " but expected ID is ",
            strconv.Itoa(newTrip.Id)+".",
        )
    }
    if retrievedTrip.UserId != newTrip.UserId {
        t.Errorf(
            "GetTripDB(), given UserId is ",
            strconv.Itoa(retrievedTrip.UserId),
            " but expected UserId is ",
            strconv.Itoa(newTrip.UserId)+".",
        )
    }
    if retrievedTrip.Name != newTrip.Name {
        t.Errorf(
            "GetTripDB(), given Name is ",
            retrievedTrip.Name,
            " but expected Name is ",
            newTrip.Name+".",
        )
    }
    if retrievedTrip.Location != newTrip.Location {
        t.Errorf(
            "GetTripDB(), given Location is ",
            retrievedTrip.Location,
            " but expected Location is ",
            newTrip.Location,
            ".",
        )
    }
    if retrievedTrip.Description != newTrip.Description {
        t.Errorf(
            "GetTripDB(), given Description is ",
            retrievedTrip.Description,
            " but expected Description is ",
            newTrip.Description+".",
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
    newTrip.Places = append(newTrip.Places, place.Place{
        Label:    "newLabel",
        Url:      "https://binhong.me/",
    })
    // newTrip.LastUpdated = time.Now()

    if update := UpdateTripDB(&newTrip); !update {
        t.Errorf("UpdateTripDB(), failed to update trip.")
        return
    }

    updatedTrip, ok := GetTripDB(newTrip.Id).(*trip.Trip)
    if !ok {
        t.Errorf("GetTripDB(), somehow does not return 'Trip' object.")
        return
    }

    if updatedTrip.Name != newTrip.Name {
        t.Errorf(
            "UpdateTripDB(), given Name is ",
            updatedTrip.Name,
            " but expected Name is ",
            newTrip.Name+".",
        )
    }

    if updatedTrip.Description != newTrip.Description {
        t.Errorf(
            "UpdateTripDB(), given Description is ",
            updatedTrip.Description,
            " but expected Description is ",
            newTrip.Description+".",
        )
    }

    given := placesToString(updatedTrip.Places)
    expected := placesToString(newTrip.Places)

    if given != expected {
        t.Errorf(
            "UpdateTripDB(), given Description is ",
            given,
            " but expected Description is ",
            expected,
            ".",
        )
    }

    // if updatedTrip.LastUpdated != newTrip.LastUpdated {
    //     t.Errorf(
    //         "UpdateTripDB(), given LastUpdated is ",
    //         updatedTrip.LastUpdated,
    //         " but expected LastUpdated is ",
    //         newTrip.LastUpdated+".",
    //     )
    // }
}

func TestDeleteTripDB(t *testing.T) {
    if !DeleteTripDB(&newTrip) {
        t.Errorf("DeleteTripDB(), unable to delete trip.")
    }
    id := GetTripDB(newTrip.Id).GetID()
    if id > 0 {
        t.Errorf("DeleteTripDB(), deleted Trip still exist in database.")
    }
}

func TestDeleteUserDB(t *testing.T) {
    if !DeleteUserDB(&newUser) {
        t.Errorf("DeleteUserDB(), unable to delete user.")
    }
    id := GetUserDB(newUser.Id).GetID()
    if id > 0 {
        t.Errorf("DeleteUserDB(), deleted User still exist in database.")
    }
}
