package database

import (
	"context"
	"strconv"

	"github.com/binhonglee/GlobeTrotte/src/turbine/logger"
	"github.com/binhonglee/GlobeTrotte/src/turbine/wings"
	"github.com/jackc/pgx/v4"
)

func addTravelTime(newTravelTime wings.TravelTime) int {
	sqlStatement := `
		INSERT INTO travel_time (from_place_id, to_place_id, time_in_minutes)
		VALUES($1, $2, $3)
		RETURNING id;`
	id := 0
	c := getConn()
	err := c.QueryRow(
		context.Background(),
		sqlStatement,
		newTravelTime.FromPlaceID,
		newTravelTime.ToPlaceID,
		newTravelTime.TimeInMinutes,
	).Scan(&id)
	defer c.Close()

	if err != nil {
		logger.Failure(logger.Database, "Failed to add new travel time.")
		return -1
	}
	logger.Print(
		logger.Database,
		"New travel time ID is: "+strconv.Itoa(id),
	)
	return id
}

func updateTravelTime(updatedTravelTime *wings.TravelTime) bool {
	if updatedTravelTime.ID == -1 || fetchTravelTime(int64(updatedTravelTime.ID)).ID != updatedTravelTime.ID {
		logger.Print(
			logger.Database,
			"Existing Travel time not found. Creating...",
		)
		updatedTravelTime.ID = addTravelTime(*updatedTravelTime)
		return updatedTravelTime.ID != -1
	}

	sqlStatement := `
		UPDATE travel_time
		SET from_place_id = $2,
		to_place_id = $3,
		time_in_minutes = $4
		WHERE id = $1;`

	c := getConn()
	_, err := c.Exec(
		context.Background(),
		sqlStatement,
		updatedTravelTime.ID,
		updatedTravelTime.FromPlaceID,
		updatedTravelTime.ToPlaceID,
		updatedTravelTime.TimeInMinutes,
	)
	defer c.Close()

	if err != nil {
		logger.Err(
			logger.Database, err,
			"Failed to update travel time "+strconv.Itoa(updatedTravelTime.ID),
		)
		return false
	}
	return true
}

func fetchTravelTimes(ids []int64) wings.TravelTimes {
	var travelTimes wings.TravelTimes = make(wings.TravelTimes, len(ids))
	for index, id := range ids {
		travelTimes[index] = fetchTravelTime(id)
	}
	return travelTimes
}

func fetchTravelTime(id int64) wings.TravelTime {
	var travelTime wings.TravelTime
	sqlStatement := `
		SELECT id, from_place_id, to_place_id, time_in_minutes
		FROM travel_time WHERE id=$1;`
	c := getConn()
	row := c.QueryRow(context.Background(), sqlStatement, id)
	switch err := row.Scan(
		&travelTime.ID,
		&travelTime.FromPlaceID,
		&travelTime.ToPlaceID,
		&travelTime.TimeInMinutes,
	); err {
	case pgx.ErrNoRows:
		logger.Print(
			logger.Database,
			"Travel time "+strconv.FormatInt(id, 10)+" not found.",
		)
		travelTime.ID = -1
	default:
		logger.Err(logger.Database, err, "")
	}

	defer c.Close()
	return travelTime
}

func deleteTravelTimeWithID(id int) bool {
	return deleteFromTableWithID(id, "travel_time")
}

func processTravelTimeMapping(day wings.Day) wings.Day {
	if len(day.TravelTime) < 1 {
		return day
	}
	ret := day.TravelTime
	for index, travelTime := range day.TravelTime {
		if travelTime.ToPlaceIndex > 0 {
			ret[index].FromPlaceID = day.Places[travelTime.ToPlaceIndex-1].ID
			ret[index].ToPlaceID = day.Places[travelTime.ToPlaceIndex].ID
		}
	}
	day.TravelTime = ret
	return day
}
