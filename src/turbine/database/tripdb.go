/*
 * DO NOT CALL ANY OF THESE FUNCTIONS DIRECTLY.
 * They should only be used by handlers or inside the database class.
 *
 * TODO: Add additional wrapper around these functions for additional layer of vetting
 */

package database

import (
    "database/sql"
    "fmt"
    "strconv"

    structs "github.com/binhonglee/GlobeTrotte/src/turbine/structs"

    "github.com/lib/pq"
)

// AddTripDB - Adding new trip into the database.
func AddTripDB(newTrip structs.IStructs) int {
    trip, ok := newTrip.(*structs.Trip)
    if !ok {
        fmt.Println("Trip add failed since interface passed in is not a trip.")
        return -1
    }

    newTripID := addTrip(*trip)
    user := getUserWithID(trip.UserID)
    if user.ID == -1 {
        fmt.Println("User adding the new trip is not found.")
        return failAddingTripToUser(newTripID)
    }

    user.Trips = append(user.Trips, newTripID)
    if ok = updateUser(user); !ok {
        fmt.Println("Fail to add trip id to new user.")
        return failAddingTripToUser(newTripID)
    }

    return newTripID
}

// GetTripDB - Retrieve trip information from database with ID.
func GetTripDB(id int) structs.IStructs {
    var trip structs.Trip = fetchTrip(id)
    return &trip
}

// UpdateTripDB - Update trip information back into the database.
func UpdateTripDB(updatedTrip structs.IStructs) bool {
    trip, ok := updatedTrip.(*structs.Trip)
    if !ok {
        fmt.Println("Trip update failed since interface passed in is not a trip.")
        return false
    }

    return updateTrip(*trip)
}

// DeleteTripDB - Delete trip from the database.
func DeleteTripDB(existingTrip structs.IStructs) bool {
    trip, ok := existingTrip.(*structs.Trip)
    if !ok {
        fmt.Println("Trip deletion failed since interface passed in is not a trip.")
        return false
    }

    existingTrip = GetTripDB(trip.GetID())

    if existingTrip.GetID() == -1 {
        return false
    }

    //TODO: More testing to make sure this is the same trip
    return deleteTripWithID(existingTrip.GetID())
}

func addTrip(newTrip structs.Trip) int {
    sqlStatement := `
    INSERT INTO trips (userid, name, cities, description, days, time_created, last_updated)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id`
    id := 0
    err := db.QueryRow(
        sqlStatement,
        newTrip.UserID,
        newTrip.Name,
        pq.Array(cityEnumArrayToIDs(newTrip.Cities)),
        newTrip.Description,
        pq.Array(daysToIDArray(newTrip.Days)),
        newTrip.TimeCreated,
        newTrip.LastUpdated,
    ).Scan(&id)

    if err != nil {
        fmt.Println(err)
        return -1
    }
    fmt.Println("New record ID is: ", id)
    return id
}

func fetchTrip(id int) structs.Trip {
    var trip structs.Trip
    var days []int
    var cities []int64
    sqlStatement := `
    SELECT id, userid, name, cities, description, days, time_created, last_updated
    FROM trips WHERE id=$1;`
    row := db.QueryRow(sqlStatement, id)
    switch err := row.Scan(
        &trip.ID,
        &trip.UserID,
        &trip.Name,
        pq.Array(&cities),
        &trip.Description,
        pq.Array(&days),
        &trip.TimeCreated,
        &trip.LastUpdated,
    ); err {
        case sql.ErrNoRows:
            fmt.Println("Trip not found.")
            trip.ID = -1
        default:
            fmt.Println(err)
    }

    trip.Cities = cityIDsToEnumArray(cities)
    trip.Days = fetchDays(days)
    return trip
}

func fetchDays(ids []int) structs.Days {
    var days structs.Days = make([]structs.Day, len(ids))

    for index, id := range ids {
        var day structs.Day
        var places []int
        sqlStatement := `
		SELECT id, trip_id, day_of, places
		FROM days WHERE id=$1;`
        row := db.QueryRow(sqlStatement, id)
        switch err := row.Scan(
            &day.ID,
            &day.TripID,
            &day.DayOf,
            pq.Array(&places),
        ); err {
            case sql.ErrNoRows:
                fmt.Println("Trip not found.")
                day.ID = -1
            default:
                fmt.Println(err)
        }
        day.Places = fetchPlaces(places)
        days[index] = day
    }

    return days
}

func fetchPlaces(ids []int) structs.Places {
    var places structs.Places = make([]structs.Place, len(ids))

    for index, id := range ids {
        var place structs.Place
        sqlStatement := `
		SELECT id, label, url, description
		FROM days WHERE id=$1;`
        row := db.QueryRow(sqlStatement, id)
        switch err := row.Scan(
            &place.ID,
            &place.Label,
            &place.URL,
            &place.Description,
        ); err {
            case sql.ErrNoRows:
                fmt.Println("Trip not found.")
                place.ID = -1
            default:
                fmt.Println(err)
        }
        places[index] = place
    }

    return places
}

func updateTrip(updatedTrip structs.Trip) bool {
    existingTrip := GetTripDB(updatedTrip.GetID())
    if existingTrip.GetID() != updatedTrip.GetID() {
        fmt.Println("Existing Trip is not found. Aborting update.")
        fmt.Println("Given ID is " + strconv.Itoa(updatedTrip.GetID()) +
            " but found ID is " + strconv.Itoa(existingTrip.GetID()) +
            " instead.")
        return false
    }

    sqlStatement := `
    UPDATE trips
	SET name = $2,
    description = $3,
	cities = $4,
	days = $5,
    last_updated = $6
    WHERE id = $1;`

    _, err := db.Exec(
        sqlStatement,
        updatedTrip.ID,
        updatedTrip.Name,
        updatedTrip.Description,
        pq.Array(cityEnumArrayToIDs(updatedTrip.Cities)),
        pq.Array(daysToIDArray(updatedTrip.Days)),
        updatedTrip.LastUpdated,
    )

    if err != nil {
        fmt.Println("Failed to update trip.")
        fmt.Println(err)
        return false
    }

    return true
}

func deleteTripWithID(id int) bool {
    sqlStatement := `
    DELETE FROM trips
    WHERE id = $1;`
    if _, err := db.Exec(sqlStatement, id); err != nil {
        fmt.Println(err)
        return false
    }
    fmt.Println("Trip ID ", id, " deleted")
    return true
}

func failAddingTripToUser(id int) int {
    deleteTripWithID(id)
    return -1
}
