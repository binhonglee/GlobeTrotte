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
    var trip structs.Trip
    var places, links []string
    sqlStatement := `
    SELECT id, userid, name, city, description, places, links, time_created, last_updated
    FROM trips WHERE id=$1;`
    row := db.QueryRow(sqlStatement, id)
    switch err := row.Scan(
        &trip.ID,
        &trip.UserID,
        &trip.Name,
        &trip.Location,
        &trip.Description,
        pq.Array(&places),
        pq.Array(&links),
        &trip.TimeCreated,
        &trip.LastUpdated,
    ); err {
        case sql.ErrNoRows:
            fmt.Println("Trip not found.")
            trip.ID = -1
        case nil:
            fmt.Println("Trip found.")
        default:
            panic(err)
    }

    trip.Places = arraysToPlaces(places, links)
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
    INSERT INTO trips (userid, name, city, description, time_created, last_updated)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id`
    id := 0
    err := db.QueryRow(
        sqlStatement,
        newTrip.UserID,
        newTrip.Name,
        newTrip.Location,
        newTrip.Description,
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

func updateTrip(updatedTrip structs.Trip) bool {
    existingTrip := GetTripDB(updatedTrip.GetID())
    places, links := placesToArrays(updatedTrip.Places)
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
    city = $3,
    places = $4,
    links = $5,
    description = $6,
    last_updated = $7
    WHERE id = $1;`

    _, err := db.Exec(
        sqlStatement,
        updatedTrip.ID,
        updatedTrip.Name,
        updatedTrip.Location,
        pq.Array(places),
        pq.Array(links),
        updatedTrip.Description,
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
