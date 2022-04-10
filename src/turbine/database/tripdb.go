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

func DeleteTripWithOwnerIDDB(id int) bool {
	tripIDs := make([]int, 0)
	sqlStatement := `SELECT id FROM trips WHERE userid=$1`
	c := getConn()
	rows, err := c.Query(context.Background(), sqlStatement, id)
	defer c.Close()
	logger.Err(logger.Database, err, "")

	defer rows.Close()
	for rows.Next() {
		var id int
		err = rows.Scan(&id)
		logger.Err(logger.Database, err, "")
		tripIDs = append(tripIDs, id)
	}

	succeed := true

	for _, id := range tripIDs {
		if !deleteTripWithID(id) {
			succeed = false
		}
	}

	return succeed
}

func addDay(newDay wings.Day) int {
	for index, place := range newDay.Places {
		placeID := addPlace(place)
		newDay.Places[index].ID = placeID
	}
	newDay = processTravelTimeMapping(newDay)
	for index, travelTime := range newDay.TravelTime {
		travelTimeID := addTravelTime(travelTime)
		newDay.TravelTime[index].ID = travelTimeID
	}

	sqlStatement := `
		INSERT INTO days (trip_id, day_of, places, travel_times)
		VALUES($1, $2, $3, $4)
		RETURNING id;`
	id := 0
	c := getConn()
	err := c.QueryRow(
		context.Background(),
		sqlStatement,
		newDay.TripID,
		newDay.DayOf,
		placesToIDArray(newDay.Places),
		travelTimesToIDArray(newDay.TravelTime),
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
	var travelTimes pgtype.Int4Array
	sqlStatement := `
		SELECT id, trip_id, day_of, places, travel_times
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
		&travelTimes,
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
	day.TravelTime = fetchTravelTimes(int64V(travelTimes))
	return day
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

	*updatedDay = processTravelTimeMapping(*updatedDay)

	for _, travelTimeID := range NotExists(
		travelTimesToIDArray(existingDay.TravelTime),
		travelTimesToIDArray(updatedDay.TravelTime),
	) {
		deleteTravelTimeWithID(travelTimeID)
	}

	for index, travelTime := range updatedDay.TravelTime {
		if updateTravelTime(&travelTime) {
			updatedDay.TravelTime[index] = travelTime
		} else {
			return false
		}
	}

	sqlStatement := `
		UPDATE days
		SET trip_id = $2,
		day_of = $3,
		places = $4,
		travel_times = $5
		WHERE id = $1;`

	c := getConn()
	_, err := c.Exec(
		context.Background(),
		sqlStatement,
		updatedDay.ID,
		updatedDay.TripID,
		updatedDay.DayOf,
		placesToIDArray(updatedDay.Places),
		travelTimesToIDArray(updatedDay.TravelTime),
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

func deleteTripWithID(id int) bool {
	existingTrip, _ := fetchTripBasic(id)
	for _, day := range existingTrip.Days {
		if !deleteDayWithID(day.ID) {
			logger.Failure(
				logger.Database,
				"Failed deleting trip ID: "+strconv.Itoa(existingTrip.ID),
			)
			updateTripBasic(existingTrip)
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
	for _, travelTime := range existingDay.TravelTime {
		if !deleteTravelTimeWithID(travelTime.ID) {
			return false
		}
	}
	return deleteFromTableWithID(id, "days")
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
