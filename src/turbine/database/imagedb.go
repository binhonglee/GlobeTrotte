package database

import (
	"context"
	"strconv"

	"github.com/binhonglee/GlobeTrotte/src/turbine/logger"
	"github.com/jackc/pgx/v4"
)

func NewImageDB(userID int) int {
	if userID == -1 {
		logger.Print(logger.Database, "User adding image is not found.")
		return -1
	}

	sqlStatement := `
		INSERT INTO images (userid)
		VALUES ($1)
		RETURNING id;`
	id := 0
	c := getConn()
	err := c.QueryRow(
		context.Background(),
		sqlStatement,
		userID,
	).Scan(&id)
	defer c.Close()

	if err != nil {
		logger.Err(logger.Database, err, "")
		return -1
	}
	logger.Print(logger.Database, "New image ID is: "+strconv.Itoa(id))
	return id
}

func AttachTripToImage(imageID int, tripID int) bool {
	sqlStatement := `SELECT id FROM images WHERE id=$1;`
	c := getConn()
	var serverImageID int
	row := c.QueryRow(
		context.Background(),
		sqlStatement,
		imageID,
	)
	switch err := row.Scan(&serverImageID); err {
	case pgx.ErrNoRows:
		logger.Print(logger.Database, "Image not found.")
		return false
	default:
		logger.Err(logger.Database, err, "")
	}

	sqlStatement = `
		UPDATE images
		SET trip_id = $2
		WHERE id = $1;`
	_, err := c.Exec(
		context.Background(),
		sqlStatement,
		imageID,
		tripID,
	)
	defer c.Close()

	if err != nil {
		logger.Err(
			logger.Database,
			err,
			"Failed to update image "+strconv.Itoa(imageID))
		return false
	}

	return true
}

func FetchImagesForTrip(tripID int) []int {
	existingTrip, _ := fetchTripBasic(tripID)
	if existingTrip.GetID() == -1 {
		return []int{}
	}

	imageIDs := make([]int, 0)
	sqlStatement := `SELECT id FROM images WHERE trip_id=$1;`
	c := getConn()
	rows, err := c.Query(context.Background(), sqlStatement, tripID)
	defer c.Close()
	logger.Err(logger.Database, err, "")

	defer rows.Close()
	for rows.Next() {
		var id int
		logger.Err(logger.Database, rows.Scan(&id), "")
		imageIDs = append(imageIDs, id)
	}

	return imageIDs
}

func DeleteImageDB(imageID int) bool {
	return deleteFromTableWithID(imageID, "images")
}
