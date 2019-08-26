package router

import (
    city "github.com/binhonglee/GlobeTrotte/src/turbine/city"
    structs "github.com/binhonglee/GlobeTrotte/src/turbine/structs"
    "net/http"
    "strconv"
    "testing"
)

var addedTrip structs.Trip
var addedUser structs.User

func TestAddUser(t *testing.T) {
    var newUser = structs.NewUser{
        Email:       "routertest@test.com",
        Password:    "shouldReplaceThisWithRand",
    }

    var returned *structs.User
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
    var returned *structs.User
    getTest(
        "/user/"+strconv.Itoa(addedUser.GetID()),
        t,
        &returned,
        http.StatusOK,
    )

    if returned.Id != addedUser.Id {
        t.Errorf(
            "Expected ID is %v but returned ID is %v.",
            strconv.Itoa(addedUser.Id),
            strconv.Itoa(returned.Id),
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
    var newTrip = structs.Trip{
        UserId:         addedUser.Id,
        Name:           "TestUser",
        Location:       city.SanFranciscoCAUS,
        Description:    "Description",
    }

    var returned *structs.Trip
    addTest("/trip", t, &newTrip, &returned)
    addedTrip = *returned

    if returned.Name != newTrip.Name {
        t.Errorf(
            "Sent Name is %v but returned Name is %v.",
            newTrip.Name,
            returned.Name,
        )
    }

    if returned.Location != newTrip.Location {
        t.Errorf(
            "Sent Location is %v but returned Location is %v.",
            newTrip.Location,
            returned.Location,
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
    var returned *structs.Trip
    getTest("/trip/"+strconv.Itoa(addedTrip.GetID()), t, &returned, http.StatusOK)

    if returned.Id != addedTrip.Id {
        t.Errorf(
            "Expected ID is %v but returned ID is %v.",
            strconv.Itoa(addedTrip.Id),
            strconv.Itoa(returned.Id),
        )
    }

    if returned.Name != addedTrip.Name {
        t.Errorf(
            "Expected Name is %v but returned Name is %v.",
            addedTrip.Name,
            returned.Name,
        )
    }

    if returned.Location != addedTrip.Location {
        t.Errorf(
            "Expected Location is %v but returned Location is %v.",
            addedTrip.Location,
            returned.Location,
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
    var returned *structs.Trip
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
