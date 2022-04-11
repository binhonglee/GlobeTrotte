package database

import (
	"context"
	"strconv"
	"time"

	"github.com/binhonglee/GlobeTrotte/src/turbine/logger"
	"github.com/binhonglee/GlobeTrotte/src/turbine/wings"
	"github.com/jackc/pgtype"
	"github.com/jackc/pgx/v4"
)

type TripExtra struct {
	ID          int
	UserID      int
	TimeCreated time.Time
	LastUpdated time.Time
}

// AddTripDB - Adding new trip into the database.
func AddTripDB(trip wings.TripBasic, userID int) int {
	user, _ := GetUserBasicDBWithID(userID)
	if user.ID == -1 {
		logger.Print(
			logger.Database,
			"User adding the new trip is not found.",
		)
		return -1
	}

	newTripID := addTripBasic(trip, userID)
	if AddTripToUserDB(newTripID, user) {
		return newTripID
	}
	return failAddingTripToUser(newTripID)
}

func GetTripBasicWithID(id int) (wings.TripBasic, TripExtra) {
	return fetchTripBasic(id)
}

// UpdateTripDB - Update trip information back into the database.
func UpdateTripDB(trip wings.TripBasic, userID int) bool {
	_, extra := fetchTripBasic(trip.ID)
	if extra.UserID != userID {
		logger.Print(
			logger.Database,
			"Update request comes from a different user than the original trip owner",
		)
		return false
	}

	return updateTripBasic(trip)
}

// DeleteTripDB - Delete trip from the database.
func DeleteTripDB(trip wings.TripBasic) bool {
	t, _ := GetTripBasicWithID(trip.GetID())
	if t.ID == -1 {
		return false
	}

	return deleteTripWithID(
		trip.GetID(),
	)
}

// SearchTripsDB - Search for trip from the database
func SearchTripsDB(
	cities []wings.City, days int, query string,
) ([]wings.TripBasic, []TripExtra) {
	toReturnTripBasic := make([]wings.TripBasic, 0)
	toReturnTripExtra := make([]TripExtra, 0)
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
		sqlStatement += " AND name LIKE $" + strconv.Itoa(count) + ""
		args = append(args, "%"+query+"%")
		count++
	}
	sqlStatement += " ORDER BY last_updated DESC;"

	c := getConn()
	rows, err := c.Query(context.Background(), sqlStatement, args...)
	defer c.Close()
	logger.Err(logger.Database, err, "")

	defer rows.Close()
	for rows.Next() {
		var id int
		err = rows.Scan(&id)
		logger.Err(logger.Database, err, "")
		tripBasic, extra := fetchTripBasic(int(id))
		toReturnTripBasic = append(toReturnTripBasic, tripBasic)
		toReturnTripExtra = append(toReturnTripExtra, extra)
	}

	return toReturnTripBasic, toReturnTripExtra
}

// GetRecentTripsDB - Get most recent public trips from database
func GetRecentTripsDB() ([]wings.TripBasic, []TripExtra) {
	toReturnTrips := make([]wings.TripBasic, 0)
	toReturnExtra := make([]TripExtra, 0)
	sqlStatement := `
		SELECT id
		FROM trips
		WHERE
			private = FALSE
			AND CARDINALITY(days) > 0
		ORDER BY last_updated DESC
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
		tripBasic, tripExtra := fetchTripBasic(int(id))
		toReturnTrips = append(toReturnTrips, tripBasic)
		toReturnExtra = append(toReturnExtra, tripExtra)
	}

	return toReturnTrips, toReturnExtra
}

func fetchTripBasic(id int) (wings.TripBasic, TripExtra) {
	var trip wings.TripBasic
	var extra TripExtra
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
		&extra.UserID,
		&trip.Name,
		&trip.Private,
		&cities,
		&trip.Description,
		&days,
		&extra.TimeCreated,
		&extra.LastUpdated,
	); err {
	case pgx.ErrNoRows:
		logger.Print(logger.Database, "Trip not found.")
		trip.ID = -1
	default:
		logger.Err(logger.Database, err, "")
	}

	defer c.Close()

	extra.ID = trip.ID
	trip.Cities = cityIDsToEnumArray(int64V(cities))
	trip.Days = fetchDays(int64V(days))
	return trip, extra
}

func addTripBasic(newTrip wings.TripBasic, userID int) int {
	for index, day := range newTrip.Days {
		newTrip.Days[index].ID = addDay(day)
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
		userID,
		newTrip.Name,
		newTrip.Private,
		cityEnumArrayToIDs(newTrip.Cities),
		newTrip.Description,
		daysToIDArray(newTrip.Days),
		time.Now(),
		time.Now(),
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

func updateTripBasic(updatedTrip wings.TripBasic) bool {
	existingTrip, _ := fetchTripBasic(updatedTrip.GetID())
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
		time.Now(),
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
