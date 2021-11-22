/*
 * DO NOT CALL ANY OF THESE FUNCTIONS DIRECTLY.
 * They should only be used by handlers or inside the database class.
 *
 * TODO: Add additional wrapper around these functions for additional layer of vetting
 */

package database

import (
	"context"
	"strconv"

	logger "github.com/binhonglee/GlobeTrotte/src/turbine/logger"
	wings "github.com/binhonglee/GlobeTrotte/src/turbine/wings"

	"github.com/jackc/pgtype"
	"github.com/jackc/pgx/v4"
)

// DummyTrip -- Self explanatory, trip that's empty / placeholder
func DummyTrip() wings.Trip {
	trip := new(wings.Trip)
	trip.ID = -1
	return *trip
}

// AddTripDB - Adding new trip into the database.
func AddTripDB(trip wings.Trip) int {
	newTripID := addTrip(trip)
	user := getUserWithID(trip.UserID)
	if user.ID == -1 {
		logger.Print(
			logger.Database,
			"User adding the new trip is not found.",
		)
		return failAddingTripToUser(newTripID)
	}

	user.Trips = append(user.Trips, newTripID)
	if ok := updateUser(user); !ok {
		logger.Print(
			logger.Database,
			"Fail to add trip id to new user.",
		)
		return failAddingTripToUser(newTripID)
	}

	return newTripID
}

// GetTripDBWithID - Retrieve trip information from database with ID.
func GetTripDBWithID(id int) wings.Trip {
	return fetchTrip(id)
}

func GetTripBasicWithID(id int) wings.TripBasic {
	var trip wings.TripBasic
	var cities pgtype.Int4Array
	var days pgtype.Int4Array

	sqlStatement := `
		SELECT id, name, cities, days, description, private
		FROM trips WHERE id=$1;`
	c := getConn()
	row := c.QueryRow(context.Background(), sqlStatement, id)
	err := row.Scan(
		&trip.ID,
		&trip.Name,
		&cities,
		&days,
		&trip.Description,
		&trip.Private,
	)
	defer c.Close()

	if err != nil {
		if err == pgx.ErrNoRows {
			logger.Print(logger.Database, "Trip "+strconv.Itoa(id)+" not found.")
		} else {
			logger.Err(logger.Database, err, "")
		}
		trip.ID = -1
	}

	trip.Cities = cityIDsToEnumArray(int64V(cities))
	trip.Days = fetchDays(int64V(days))
	return trip
}

// TODO: Update to trip permission instead when we begin to allow trip sharing
func GetTripOwnerWithID(id int) int {
	var user int
	sqlStatement := `SELECT userid FROM trips WHERE id=$1;`
	c := getConn()
	row := c.QueryRow(context.Background(), sqlStatement, id)
	err := row.Scan(&user)
	defer c.Close()
	if err != nil {
		if err == pgx.ErrNoRows {
			logger.Print(logger.Database, "Trip "+strconv.Itoa(id)+" not found.")
		} else {
			logger.Err(logger.Database, err, "")
		}
		user = -1
	}

	return user
}

// UpdateTripDB - Update trip information back into the database.
func UpdateTripDB(trip wings.Trip) bool {
	existingTrip := fetchTrip(trip.ID)
	if existingTrip.UserID != trip.UserID {
		logger.Print(
			logger.Database,
			"Update request comes from a different user than the original trip owner",
		)
		return false
	}

	return updateTrip(trip)
}

// DeleteTripDB - Delete trip from the database.
func DeleteTripDB(trip wings.Trip) bool {
	t := GetTripDBWithID(trip.GetID())
	if t.ID == -1 {
		return false
	}

	return deleteTripWithID(
		trip.GetID(),
	) && deleteTripFromUserDB(
		trip.GetID(),
		trip.UserID,
	)
}

func SearchTripsDB(cities []wings.City, days int, query string) []wings.Trip {
	toReturn := make([]wings.Trip, 0)
	args := make([]interface{}, 0)
	sqlStatement := "SELECT id FROM trips WHERE CARDINALITY(days) > 0"
	count := 1
	if days > 0 {
		sqlStatement += " AND CARDINALITY(days) = $" + strconv.Itoa(count)
		args = append(args, days)
		count++
	}

	if len(cities) > 0 {
		sqlStatement += " AND ("
		for i, city := range cities {
			if i > 0 {
				sqlStatement += " OR "
			}
			sqlStatement += "$" + strconv.Itoa(count) + " = ANY(cities)"
			args = append(args, int(city))
			count++
		}
		sqlStatement += ")"
	}

	if len(query) > 0 {
		sqlStatement += " AND $" + strconv.Itoa(count) + " ~ name"
		args = append(args, query)
		count++
	}
	sqlStatement += ";"

	c := getConn()
	rows, err := c.Query(context.Background(), sqlStatement, args...)
	defer c.Close()
	logger.Err(logger.Database, err, "")

	defer rows.Close()
	for rows.Next() {
		var id int
		err = rows.Scan(&id)
		logger.Err(logger.Database, err, "")
		toReturn = append(toReturn, fetchTrip(int(id)))
	}

	return toReturn
}

func GetRecentTrips() []wings.Trip {
	toReturn := make([]wings.Trip, 0)
	sqlStatement := `
		SELECT id
		FROM trips
		WHERE
			private = FALSE
			AND CARDINALITY(days) > 0
		ORDER BY time_created DESC
		LIMIT 10;
	`
	c := getConn()
	rows, err := c.Query(context.Background(), sqlStatement)
	defer c.Close()
	logger.Err(logger.Database, err, "")

	defer rows.Close()
	for rows.Next() {
		var id int
		err = rows.Scan(&id)
		logger.Err(logger.Database, err, "")
		toReturn = append(toReturn, fetchTrip(int(id)))
	}

	return toReturn
}

func addTrip(newTrip wings.Trip) int {
	for index, day := range newTrip.Days {
		dayID := addDay(day)
		newTrip.Days[index].ID = dayID
	}
	sqlStatement := `
		INSERT INTO trips (userid, name, private, cities, description, days, time_created, last_updated)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
		RETURNING id;`
	id := 0
	c := getConn()
	err := c.QueryRow(
		context.Background(),
		sqlStatement,
		newTrip.UserID,
		newTrip.Name,
		newTrip.Private,
		cityEnumArrayToIDs(newTrip.Cities),
		newTrip.Description,
		daysToIDArray(newTrip.Days),
		newTrip.TimeCreated,
		newTrip.LastUpdated,
	).Scan(&id)
	defer c.Close()

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
		RETURNING id;`
	id := 0
	c := getConn()
	err := c.QueryRow(
		context.Background(),
		sqlStatement,
		newDay.TripID,
		newDay.DayOf,
		placesToIDArray(newDay.Places),
	).Scan(&id)
	defer c.Close()

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
		RETURNING id;`
	id := 0
	c := getConn()
	err := c.QueryRow(
		context.Background(),
		sqlStatement,
		newPlace.Label,
		newPlace.URL,
		newPlace.Description,
	).Scan(&id)
	defer c.Close()

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
	var days pgtype.Int4Array
	var cities pgtype.Int4Array
	sqlStatement := `
		SELECT id, userid, name, private, cities, description, days, time_created, last_updated
		FROM trips WHERE id=$1;`
	c := getConn()
	row := c.QueryRow(
		context.Background(),
		sqlStatement,
		id,
	)
	switch err := row.Scan(
		&trip.ID,
		&trip.UserID,
		&trip.Name,
		&trip.Private,
		&cities,
		&trip.Description,
		&days,
		&trip.TimeCreated,
		&trip.LastUpdated,
	); err {
	case pgx.ErrNoRows:
		logger.Print(logger.Database, "Trip not found.")
		trip.ID = -1
	default:
		logger.Err(logger.Database, err, "")
	}

	defer c.Close()

	trip.Cities = cityIDsToEnumArray(int64V(cities))
	trip.Days = fetchDays(int64V(days))
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
	var places pgtype.Int4Array
	sqlStatement := `
		SELECT id, trip_id, day_of, places
		FROM days WHERE id=$1;`
	c := getConn()
	row := c.QueryRow(
		context.Background(),
		sqlStatement,
		id,
	)
	defer c.Close()
	switch err := row.Scan(
		&day.ID,
		&day.TripID,
		&day.DayOf,
		&places,
	); err {
	case pgx.ErrNoRows:
		logger.Print(
			logger.Database,
			"Day "+strconv.FormatInt(id, 10)+" not found.",
		)
		day.ID = -1
	default:
		logger.Err(logger.Database, err, "")
	}
	day.Places = fetchPlaces(int64V(places))
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
	c := getConn()
	row := c.QueryRow(context.Background(), sqlStatement, id)
	switch err := row.Scan(
		&place.ID,
		&place.Label,
		&place.URL,
		&place.Description,
	); err {
	case pgx.ErrNoRows:
		logger.Print(
			logger.Database,
			"Place "+strconv.FormatInt(id, 10)+" not found.",
		)
		place.ID = -1
	default:
		logger.Err(logger.Database, err, "")
	}
	defer c.Close()
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

	c := getConn()
	_, err := c.Exec(
		context.Background(),
		sqlStatement,
		updatedTrip.ID,
		updatedTrip.Name,
		updatedTrip.Private,
		updatedTrip.Description,
		cityEnumArrayToIDs(updatedTrip.Cities),
		daysToIDArray(updatedTrip.Days),
		updatedTrip.LastUpdated,
	)
	defer c.Close()

	if err != nil {
		logger.Err(
			logger.Database,
			err,
			"Failed to update trip "+strconv.Itoa(updatedTrip.ID),
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

	c := getConn()
	_, err := c.Exec(
		context.Background(),
		sqlStatement,
		updatedDay.ID,
		updatedDay.TripID,
		updatedDay.DayOf,
		placesToIDArray(updatedDay.Places),
	)
	defer c.Close()

	if err != nil {
		logger.Err(
			logger.Database, err,
			"Failed to update day "+strconv.Itoa(updatedDay.ID),
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

	c := getConn()
	_, err := c.Exec(
		context.Background(),
		sqlStatement,
		updatedPlace.ID,
		updatedPlace.Label,
		updatedPlace.URL,
		updatedPlace.Description,
	)
	defer c.Close()

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
	c := getConn()
	if _, err := c.Exec(context.Background(), sqlStatement, id); err != nil {
		logger.Err(
			logger.Database, err,
			"Failed deleting ID: "+strconv.Itoa(id)+" from "+table,
		)
		return false
	}
	defer c.Close()
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
