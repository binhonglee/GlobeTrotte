package database

import (
	"context"
	"strconv"

	"github.com/binhonglee/GlobeTrotte/src/turbine/logger"
	"github.com/binhonglee/GlobeTrotte/src/turbine/wings"
	"github.com/jackc/pgx/v4"
)

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
	c.Close()

	if err != nil {
		logger.Failure(logger.Database, "Failed to add new place.")
		return -1
	}
	logger.Print(
		logger.Database,
		"New place ID is: "+strconv.Itoa(id),
	)
	return id
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
	c.Close()

	if err != nil {
		logger.Err(
			logger.Database, err,
			"Failed to update place "+strconv.Itoa(updatedPlace.ID),
		)
		return false
	}

	return true
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
	c.Close()
	return place
}

func deletePlaceWithID(id int) bool {
	return deleteFromTableWithID(id, "places")
}
