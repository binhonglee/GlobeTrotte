package router

import (
    "net/http"
    "strconv"
    "testing"
    city "turbine/enums/city"
    newuser "turbine/structs/newuser"
    trip "turbine/structs/trip"
    user "turbine/structs/user"
)

var addedTrip trip.Trip
var addedUser user.User

func TestAddUser(t *testing.T) {
    var newUser = newuser.NewUser{
        Email:       "routertest@test.com",
        Password:    "shouldReplaceThisWithRand",
    }

    var returned *user.User
    addTest("/user", t, &newUser, &returned)
    addedUser = *returned

    if returned.Email != newUser.Email {
        t.Errorf(
            "Sent Email is ",
            newUser.Email,
            " but returned Email is ",
            returned.Email,
            ".",
        )
    }
}

func TestGetUser(t *testing.T) {
    var returned *user.User
    getTest(
        "/user/"+strconv.Itoa(addedUser.GetID()),
        t,
        &returned,
        http.StatusOK,
    )

    if returned.Id != addedUser.Id {
        t.Errorf(
            "Expected ID is ",
            strconv.Itoa(addedUser.Id),
            " but returned ID is ",
            strconv.Itoa(returned.Id),
            ".",
        )
    }

    if returned.Name != addedUser.Name {
        t.Errorf(
            "Expected Name is ",
            addedUser.Name,
            " but returned Name is ",
            returned.Name,
            ".",
        )
    }

    if returned.Email != addedUser.Email {
        t.Errorf(
            "Expected Email is ",
            addedUser.Email,
            " but returned Email is ",
            returned.Email,
            ".",
        )
    }
}

func TestAddTrip(t *testing.T) {
    var newTrip = trip.Trip{
        UserId:         addedUser.Id,
        Name:           "TestUser",
        Location:       city.SanFranciscoCAUS,
        Description:    "Description",
    }

    var returned *trip.Trip
    addTest("/trip", t, &newTrip, &returned)
    addedTrip = *returned

    if returned.Name != newTrip.Name {
        t.Errorf(
            "Sent Name is ",
            newTrip.Name,
            " but returned Name is ",
            returned.Name,
            ".",
        )
    }

    if returned.Location != newTrip.Location {
        t.Errorf(
            "Sent Location is ",
            newTrip.Location,
            " but returned Location is ",
            returned.Location,
            ".",
        )
    }

    if returned.Description != newTrip.Description {
        t.Errorf(
            "Sent Description is ",
            newTrip.Description,
            " but returned Description is ",
            returned.Description,
            ".",
        )
    }
}

func TestGetTrip(t *testing.T) {
    var returned *trip.Trip
    getTest("/trip/"+strconv.Itoa(addedTrip.GetID()), t, &returned, http.StatusOK)

    if returned.Id != addedTrip.Id {
        t.Errorf(
            "Expected ID is ",
            strconv.Itoa(addedTrip.Id),
            " but returned ID is ",
            strconv.Itoa(returned.Id),
            ".",
        )
    }

    if returned.Name != addedTrip.Name {
        t.Errorf(
            "Expected Name is ",
            addedTrip.Name,
            " but returned Name is ",
            returned.Name,
            ".",
        )
    }

    if returned.Location != addedTrip.Location {
        t.Errorf(
            "Expected Location is ",
            addedTrip.Location,
            " but returned Location is ",
            returned.Location,
            ".",
        )
    }

    if returned.Description != addedTrip.Description {
        t.Errorf(
            "Expected Description is ",
            addedTrip.Description,
            " but returned Description is ",
            returned.Description,
            ".",
        )
    }
}

func TestGetNonExistentTrip(t *testing.T) {
    var returned *trip.Trip
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
