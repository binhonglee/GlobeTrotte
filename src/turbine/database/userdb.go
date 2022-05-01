/*
 * DO NOT CALL ANY OF THESE FUNCTIONS DIRECTLY.
 * They should only be used by handlers.
 * TODO: Add additional wrapper around these functions for additional layer of vetting
 */

package database

import (
	"context"
	"database/sql"
	"strconv"
	"time"

	logger "github.com/binhonglee/GlobeTrotte/src/turbine/logger"
	wings "github.com/binhonglee/GlobeTrotte/src/turbine/wings"
	"github.com/jackc/pgtype"

	"github.com/lib/pq"
)

type UserExtra struct {
	ID          int
	TripIDs     []int
	TimeCreated time.Time
}

// NewUserDB - Adding new user to the database.
func NewUserDB(user wings.NewUser) (int, wings.RegistrationError) {
	exists, err := ifExists("email", user.Email)
	if exists || err != nil {
		logger.Print(
			logger.Database,
			"New user creation failed. Email already exists "+user.Email,
		)
		return -1, wings.EmailAlreadyExists
	}

	exists, err = ifExists("username", user.Username)
	if exists || err != nil {
		logger.Print(
			logger.Database,
			"New user creation failed. Username already exists "+user.Username,
		)
		return -1, wings.UsernameTaken
	}

	return addNewUser(user)
}

func ifExists(field_name string, value interface{}) (bool, error) {
	sqlStatement := `SELECT id FROM users WHERE ` + field_name + ` = $1;`
	id := -1
	err := db.QueryRow(
		sqlStatement,
		value,
	).Scan(&id)
	if err != nil {
		if err != sql.ErrNoRows {
			logger.Err(logger.Database, err, "")
			return false, err
		}
		return false, nil
	}
	return true, nil
}

func getIDFromUsername(username string) int {
	sqlStatement := `SELECT id FROM users WHERE username=$1;`
	id := -1
	err := db.QueryRow(sqlStatement, username).Scan(&id)
	if err != nil {
		return -1
	}
	return id
}

func GetUserTripsWithID(id int) []int {
	var trips []sql.NullInt64
	tripsIDs := []int{}
	sqlStatement := `
		SELECT trips
		FROM users WHERE id=$1;`
	err := db.QueryRow(sqlStatement, id).Scan(
		pq.Array(&trips),
	)
	if err != nil {
		if err == sql.ErrNoRows {
			logger.Print(logger.Database, "User "+strconv.Itoa(id)+" not found.")
		} else {
			logger.Err(logger.Database, err, "")
		}
		return tripsIDs
	}

	for _, trip := range trips {
		if trip.Valid {
			tripsIDs = append(tripsIDs, int(trip.Int64))
		}
	}
	return tripsIDs
}

func GetUserIDWithUsername(username string) int {
	id := -1
	sqlStatement := `SELECT id FROM users WHERE username=$1;`
	switch err := db.QueryRow(sqlStatement, username).Scan(&id); err {
	case sql.ErrNoRows:
		return -1
	default:
		logger.Err(logger.Database, err, "")
	}

	return id
}

func GetUsernameWithID(id int) string {
	username := ""
	sqlStatement := `SELECT username FROM users WHERE id=$1;`
	c := getConn()
	err := c.QueryRow(context.Background(), sqlStatement, id).Scan(&username)
	defer c.Close()

	if err != nil {
		logger.Debug(err)
		logger.Failure(logger.Database, "Username not found for "+strconv.Itoa(id)+".")
	}
	return username
}

// GetUserBasicDBWithID - Retrieve basic user information from database with ID.
func GetUserBasicDBWithID(id int) (wings.UserBasic, UserExtra) {
	var user wings.UserBasic
	var extra UserExtra
	var bio sql.NullString
	var link sql.NullString
	var username sql.NullString
	var trips pgtype.Int4Array
	sqlStatement := `
		SELECT id, username, name, email, bio, confirmed, link, trips, time_created
		FROM users WHERE id=$1;`
	switch err := db.QueryRow(sqlStatement, id).Scan(
		&user.ID,
		&username,
		&user.Name,
		&user.Email,
		&bio,
		&user.Confirmed,
		&link,
		&trips,
		&extra.TimeCreated,
	); err {
	case sql.ErrNoRows:
		user.ID = -1
	default:
		logger.Err(logger.Database, err, "")
	}

	if bio.Valid {
		user.Bio = bio.String
	}
	if link.Valid {
		user.Link = link.String
	}
	if username.Valid {
		user.Username = username.String
	}
	extra.TripIDs = intV(trips)
	return user, extra
}

func GetTimeInfoDBWithID(id int) (bool, time.Time) {
	var timeCreated time.Time
	sqlStatement := `
		SELECT time_created
		FROM users WHERE id=$1;`
	err := db.QueryRow(sqlStatement, id).Scan(
		&timeCreated,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			logger.Print(logger.Database, "User "+strconv.Itoa(id)+" not found.")
		} else {
			logger.Err(logger.Database, err, "")
		}
		return false, time.Now()
	}

	return true, timeCreated
}

// GetUserPasswordHashDB - Retreives and return the password hash of the user account.
func GetUserPasswordHashDB(user wings.NewUser) string {
	return getUserWithEmail(user.Email).Password
}

func GetUserPwHashDB(email string) string {
	return getUserWithEmail(email).Password
}

func GetUserIDDBWithEmail(email string) int {
	return getUserWithEmail(email).ID
}

func UpdateUserBasicDB(updatedUser wings.UserBasic) bool {
	return updatingUser(updatedUser)
}

func AddTripToUserDB(tripID int, user wings.UserBasic) bool {
	_, extra := GetUserBasicDBWithID(user.ID)
	return updateTripsInUserDB(user.ID, append(extra.TripIDs, tripID))
}

func DeleteTripFromUserDB(trip wings.TripBasic, user wings.UserBasic) bool {
	_, extra := GetUserBasicDBWithID(user.ID)
	var trips []int
	for _, t := range extra.TripIDs {
		if t != trip.ID {
			trips = append(trips, t)
		}
	}

	return updateTripsInUserDB(user.ID, trips)
}

func updateTripsInUserDB(userID int, tripIDs []int) bool {
	sqlStatement := `
		UPDATE users
		SET trips = $2
		WHERE id = $1;`

	_, err := db.Exec(
		sqlStatement,
		userID,
		pq.Array(tripIDs),
	)

	if err != nil {
		logger.Err(logger.Database, err, "Failed to update user.")
		return false
	}

	return true
}

func addNewUser(newUser wings.NewUser) (int, wings.RegistrationError) {
	sqlStatement := `
		INSERT INTO users (name, username, email, password, bio, time_created, confirmed)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
		RETURNING id`
	id := -1
	err := db.QueryRow(
		sqlStatement,
		newUser.Name,
		newUser.Username,
		newUser.Email,
		newUser.Password,
		newUser.Bio,
		time.Now(),
		false,
	).Scan(&id)
	if err != nil {
		logger.Err(logger.Database, err, "")
		return -1, wings.InvalidType
	}
	logger.Print(logger.Database, "New user ID is: "+strconv.Itoa(id))
	return id, wings.Success
}

func getUserWithEmail(email string) wings.NewUser {
	var user wings.NewUser
	sqlStatement := `
		SELECT id, password
		FROM users WHERE email=$1;`
	switch err := db.QueryRow(sqlStatement, email).Scan(
		&user.ID,
		&user.Password,
	); err {
	case sql.ErrNoRows:
		logger.Print(logger.Database, "User "+email+" not found.")
		user.ID = -1
	default:
		logger.Err(logger.Database, err, "")
	}

	return user
}

func updatingUser(updatedUser wings.UserBasic) bool {
	existingUser, _ := GetUserBasicDBWithID(updatedUser.ID)
	if existingUser.GetID() != updatedUser.ID {
		logger.Print(logger.Database, "Existing User is not found. Aborting update.")
		logger.Print(logger.Database,
			"Given ID is "+strconv.Itoa(updatedUser.ID)+
				" but found ID is "+strconv.Itoa(existingUser.GetID())+
				" instead.",
		)
		return false
	}

	sqlStatement := `
		UPDATE users
		SET name = $2,
		username = $3,
		email = $4,
		bio = $5,
		link = $6,
		confirmed = $7
		WHERE id = $1;`

	_, err := db.Exec(
		sqlStatement,
		updatedUser.ID,
		updatedUser.Name,
		updatedUser.Username,
		updatedUser.Email,
		updatedUser.Bio,
		updatedUser.Link,
		updatedUser.Confirmed,
	)

	if err != nil {
		logger.Err(logger.Database, err, "Failed to update user.")
		return false
	}

	return true
}

func confirmUser(id int) bool {
	sqlStatement := `
		UPDATE users
		SET confirmed = $2
		WHERE id = $1;`

	_, err := db.Exec(sqlStatement, id, true)

	logger.Err(
		logger.Database, err,
		"Failed to confirm user "+strconv.Itoa(id),
	)

	return err == nil
}

func DeleteUserDBWithID(id int) bool {
	sqlStatement := `
		DELETE FROM users
		WHERE id = $1;`
	if _, err := db.Exec(sqlStatement, id); err != nil {
		logger.Err(logger.Database, err, "")
		return false
	}
	logger.Print(logger.Database, "User ID "+strconv.Itoa(id)+" deleted")
	return true
}

func UpdatePassword(id int, email string, newPasswordHash string) bool {
	sqlStatement := `
		UPDATE users
		SET password = $3
		WHERE id = $1 AND email = $2;`
	if _, err := db.Exec(sqlStatement, id, email, newPasswordHash); err != nil {
		logger.Err(logger.Database, err, "")
		return false
	}
	logger.Print(logger.Database, "Password for "+email+" is updated")
	return true
}
