/*
 * DO NOT CALL ANY OF THESE FUNCTIONS DIRECTLY.
 * They should only be used by handlers or inside the database class.
 *
 * TODO: Add additional wrapper around these functions for additional layer of vetting
 */

package database

import (
	"database/sql"
	"strconv"

	logger "github.com/binhonglee/GlobeTrotte/src/turbine/logger"
	structs "github.com/binhonglee/GlobeTrotte/src/turbine/structs"
	wings "github.com/binhonglee/GlobeTrotte/src/turbine/wings"

	"github.com/lib/pq"
)

// DummyTrip -- Self explanatory, trip that's empty / placeholder
func DummyTrip() wings.Trip {
	trip := new(wings.Trip)
	trip.ID = -1
	return *trip
}

// AddTripDB - Adding new trip into the database.
func AddTripDB(newTrip structs.IStructs) int {
	trip, ok := newTrip.(*wings.Trip)
	if !ok {
		logger.Print(
			logger.Database,
			"Trip add failed since interface passed in is not a trip.",
		)
		return -1
	}

	newTripID := addTrip(*trip)
	user := getUserWithID(trip.UserID)
	if user.ID == -1 {
		logger.Print(
			logger.Database,
			"User adding the new trip is not found.",
		)
		return failAddingTripToUser(newTripID)
	}

	user.Trips = append(user.Trips, newTripID)
	if ok = updateUser(user); !ok {
		logger.Print(
			logger.Database,
			"Fail to add trip id to new user.",
		)
		return failAddingTripToUser(newTripID)
	}

	return newTripID
}

// GetTripDB - Retrieve trip information from database with ID.
func GetTripDB(id int, userid int) structs.IStructs {
	trip := fetchTrip(id)
	if trip.Private && trip.UserID != userid {
		trip = DummyTrip()
	}
	return &trip
}

// UpdateTripDB - Update trip information back into the database.
func UpdateTripDB(updatedTrip structs.IStructs) bool {
	trip, ok := updatedTrip.(*wings.Trip)
	if !ok {
		logger.Print(
			logger.Database,
			"Trip update failed since interface passed in is not a trip.",
		)
		return false
	}

	existingTrip := fetchTrip(updatedTrip.GetID())
	if existingTrip.UserID != trip.UserID {
		logger.Print(
			logger.Database,
			"Update request comes from a different user than the original trip owner",
		)
		return false
	}

	return updateTrip(*trip)
}

// DeleteTripDB - Delete trip from the database.
func DeleteTripDB(existingTrip structs.IStructs) bool {
	trip, ok := existingTrip.(*wings.Trip)
	if !ok {
		logger.Print(
			logger.Database,
			"Trip deletion failed since interface passed in is not a trip.",
		)
		return false
	}

	existingTrip = GetTripDB(trip.GetID(), trip.UserID)
	if existingTrip.GetID() == -1 {
		return false
	}

	return deleteTripWithID(
		trip.GetID(),
	) && deleteTripFromUserDB(
		trip.GetID(),
		trip.UserID,
	)
}

func addTrip(newTrip wings.Trip) int {
	for index, day := range newTrip.Days {
		dayID := addDay(day)
		newTrip.Days[index].ID = dayID
	}
	sqlStatement := `
		INSERT INTO trips (userid, name, private, cities, description, days, time_created, last_updated)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
		RETURNING id`
	id := 0
	err := db.QueryRow(
		sqlStatement,
		newTrip.UserID,
		newTrip.Name,
		newTrip.Private,
		pq.Array(cityEnumArrayToIDs(newTrip.Cities)),
		newTrip.Description,
		pq.Array(daysToIDArray(newTrip.Days)),
		newTrip.TimeCreated,
		newTrip.LastUpdated,
	).Scan(&id)

	if err != nil {
		logger.Err(logger.Database, err, "")
		return -1
	}
	logger.Print(
		logger.Database,
		"New trip ID is: "+strconv.Itoa(id),
	)
	return id
}

func addDay(newDay wings.Day) int {
	for index, place := range newDay.Places {
		placeID := addPlace(place)
		newDay.Places[index].ID = placeID
	}
	sqlStatement := `
		INSERT INTO days (trip_id, day_of, places)
		VALUES($1, $2, $3)
		RETURNING id`
	id := 0
	err := db.QueryRow(
		sqlStatement,
		newDay.TripID,
		newDay.DayOf,
		pq.Array(placesToIDArray(newDay.Places)),
	).Scan(&id)

	if err != nil {
		logger.Failure(logger.Database, "Failed to add new day.")
		return -1
	}
	logger.Print(
		logger.Database,
		"New day ID is: "+strconv.Itoa(id),
	)
	return id
}

func addPlace(newPlace wings.Place) int {
	sqlStatement := `
		INSERT INTO places (label, url, description)
		VALUES($1, $2, $3)
		RETURNING id`
	id := 0
	err := db.QueryRow(
		sqlStatement,
		newPlace.Label,
		newPlace.URL,
		newPlace.Description,
	).Scan(&id)

	if err != nil {
		logger.Failure(logger.Database, "Failed to add new day.")
		return -1
	}
	logger.Print(
		logger.Database,
		"New place ID is: "+strconv.Itoa(id),
	)
	return id
}

func fetchTrip(id int) wings.Trip {
	var trip wings.Trip
	var days []int64
	var cities []int64
	sqlStatement := `
		SELECT id, userid, name, private, cities, description, days, time_created, last_updated
		FROM trips WHERE id=$1;`
	row := db.QueryRow(sqlStatement, id)
	switch err := row.Scan(
		&trip.ID,
		&trip.UserID,
		&trip.Name,
		&trip.Private,
		pq.Array(&cities),
		&trip.Description,
		pq.Array(&days),
		&trip.TimeCreated,
		&trip.LastUpdated,
	); err {
	case sql.ErrNoRows:
		logger.Print(logger.Database, "Trip not found.")
		trip.ID = -1
	default:
		logger.Err(logger.Database, err, "")
	}

	trip.Cities = cityIDsToEnumArray(cities)
	trip.Days = fetchDays(days)
	return trip
}

func fetchDays(ids []int64) wings.Days {
	var days wings.Days = make([]wings.Day, len(ids))
	for index, id := range ids {
		days[index] = fetchDay(id)
	}
	return days
}

func fetchDay(id int64) wings.Day {
	var day wings.Day
	var places []int64
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
		logger.Print(
			logger.Database,
			"Day "+strconv.FormatInt(id, 10)+" not found.",
		)
		day.ID = -1
	default:
		logger.Err(logger.Database, err, "")
	}
	day.Places = fetchPlaces(places)
	return day
}

func fetchPlaces(ids []int64) wings.Places {
	var places wings.Places = make([]wings.Place, len(ids))
	for index, id := range ids {
		places[index] = fetchPlace(id)
	}
	return places
}

func fetchPlace(id int64) wings.Place {
	var place wings.Place
	sqlStatement := `
		SELECT id, label, url, description
		FROM places WHERE id=$1;`
	row := db.QueryRow(sqlStatement, id)
	switch err := row.Scan(
		&place.ID,
		&place.Label,
		&place.URL,
		&place.Description,
	); err {
	case sql.ErrNoRows:
		logger.Print(
			logger.Database,
			"Place "+strconv.FormatInt(id, 10)+" not found.",
		)
		place.ID = -1
	default:
		logger.Err(logger.Database, err, "")
	}
	return place
}

func updateTrip(updatedTrip wings.Trip) bool {
	existingTrip := fetchTrip(updatedTrip.GetID())
	if existingTrip.GetID() != updatedTrip.GetID() {
		logger.Print(
			logger.Database,
			"Existing Trip is not found. Aborting update.",
		)
		logger.Print(
			logger.Database,
			"Given ID is "+strconv.Itoa(updatedTrip.GetID())+
				" but found ID is "+strconv.Itoa(existingTrip.GetID())+
				" instead.")
		return false
	}

	for index, day := range updatedTrip.Days {
		if updateDay(&day, true) {
			updatedTrip.Days[index] = day
		} else {
			logger.Failure(
				logger.Database,
				"Failed to update a day in trip "+strconv.Itoa(updatedTrip.ID),
			)
			return false
		}
	}

	for _, dayID := range NotExists(
		daysToIDArray(existingTrip.Days),
		daysToIDArray(updatedTrip.Days),
	) {
		deleteDayWithID(dayID)
	}

	// TODO: Cleanup days and places that are no longer attached to the day

	sqlStatement := `
		UPDATE trips
		SET name = $2,
		private = $3,
		description = $4,
		cities = $5,
		days = $6,
		last_updated = $7
		WHERE id = $1;`

	_, err := db.Exec(
		sqlStatement,
		updatedTrip.ID,
		updatedTrip.Name,
		updatedTrip.Private,
		updatedTrip.Description,
		pq.Array(cityEnumArrayToIDs(updatedTrip.Cities)),
		pq.Array(daysToIDArray(updatedTrip.Days)),
		updatedTrip.LastUpdated,
	)

	if err != nil {
		logger.Err(
			logger.Database,
			err,
			"Failed to update trip.",
		)
		return false
	}

	return true
}

func updateDay(
	updatedDay *wings.Day, createOnNonExist bool,
) bool {
	existingDay := fetchDay(int64(updatedDay.ID))
	if updatedDay.ID == -1 || existingDay.ID != updatedDay.ID {
		logger.Print(logger.Database, "Existing Day not found.")

		if createOnNonExist {
			updatedDay.ID = addDay(*updatedDay)
			return updatedDay.ID != -1
		} else {
			return false
		}
	}

	for _, placeID := range NotExists(
		placesToIDArray(existingDay.Places),
		placesToIDArray(updatedDay.Places),
	) {
		deletePlaceWithID(placeID)
	}

	for index, place := range updatedDay.Places {
		if updatePlace(&place) {
			updatedDay.Places[index] = place
		} else {
			return false
		}
	}

	sqlStatement := `
		UPDATE days
		SET trip_id = $2,
		day_of = $3,
		places = $4
		WHERE id = $1;`

	_, err := db.Exec(
		sqlStatement,
		updatedDay.ID,
		updatedDay.TripID,
		updatedDay.DayOf,
		pq.Array(placesToIDArray(updatedDay.Places)),
	)

	if err != nil {
		logger.Err(
			logger.Database, err,
			"Failed to update day"+strconv.Itoa(updatedDay.ID),
		)
		return false
	}

	return true
}

func updatePlace(updatedPlace *wings.Place) bool {
	if updatedPlace.ID == -1 ||
		fetchPlace(int64(updatedPlace.ID)).ID != updatedPlace.ID {
		logger.Print(
			logger.Database,
			"Existing Place not found. Creating...",
		)
		updatedPlace.ID = addPlace(*updatedPlace)
		return updatedPlace.ID != -1
	}

	sqlStatement := `
		UPDATE places
		SET label = $2,
		url = $3,
		description = $4
		WHERE id = $1;`

	_, err := db.Exec(
		sqlStatement,
		updatedPlace.ID,
		updatedPlace.Label,
		updatedPlace.URL,
		updatedPlace.Description,
	)

	if err != nil {
		logger.Err(
			logger.Database, err,
			"Failed to update place"+strconv.Itoa(updatedPlace.ID),
		)
		return false
	}

	return true
}

func deleteTripWithID(id int) bool {
	existingTrip := fetchTrip(id)
	for _, day := range existingTrip.Days {
		if !deleteDayWithID(day.ID) {
			logger.Failure(
				logger.Database,
				"Failed deleting trip ID: "+strconv.Itoa(existingTrip.ID),
			)
			updateTrip(existingTrip)
			return false
		}
	}

	return deleteFromTableWithID(id, "trips")
}

func deleteDayWithID(id int) bool {
	existingDay := fetchDay(int64(id))
	for _, place := range existingDay.Places {
		if !deletePlaceWithID(place.ID) {
			return false
		}
	}
	return deleteFromTableWithID(id, "days")
}

func deletePlaceWithID(id int) bool {
	return deleteFromTableWithID(id, "places")
}

func deleteFromTableWithID(id int, table string) bool {
	sqlStatement := `
		DELETE FROM ` + table + `
		WHERE id = $1;`
	if _, err := db.Exec(sqlStatement, id); err != nil {
		logger.Err(
			logger.Database, err,
			"Failed deleting ID: "+strconv.Itoa(id)+" from "+table,
		)
		return false
	}
	logger.Print(
		logger.Database,
		"ID: "+strconv.Itoa(id)+" deleted from "+table,
	)
	return true
}

func failAddingTripToUser(id int) int {
	deleteTripWithID(id)
	return -1
}
