/*
 * DO NOT CALL ANY OF THESE FUNCTIONS DIRECTLY.
 * They should only be used by handlers.
 * TODO: Add additional wrapper around these functions for additional layer of vetting
 */

package database

import (
	"database/sql"
	"strconv"
	"time"

	logger "github.com/binhonglee/GlobeTrotte/src/turbine/logger"
	structs "github.com/binhonglee/GlobeTrotte/src/turbine/structs"
	wings "github.com/binhonglee/GlobeTrotte/src/turbine/wings"

	"github.com/lib/pq"
)

// DummyUser -- Self explanatory, user that's empty / placeholder
func DummyUser() wings.User {
	user := new(wings.User)
	user.ID = -1
	return *user
}

// NewUserDB - Adding new user to the database.
func NewUserDB(newUser structs.IStructs) int {
	user, ok := newUser.(*wings.NewUser)
	if !ok {
		logger.Print(logger.Database, "User add failed since interface passed in is not a NewUser.")
		return -1
	}

	sqlStatement := `SELECT id FROM users WHERE email = $1`
	id := -1
	err := db.QueryRow(
		sqlStatement,
		user.Email,
	).Scan(&id)
	if err != nil {
		if err != sql.ErrNoRows {
			logger.Err(logger.Database, err, "")
			return -1
		}
		return addNewUser(*user)
	}
	logger.Print(
		logger.Database,
		"New user creation failed. Email already exists "+user.Email,
	)
	return -1
}

// GetUserDB - Retrieve user information from database with ID.
func GetUserDB(id int, viewer int) structs.IStructs {
	newUser := getUserWithID(id)

	// Remove private trips from profile if the viewer isn't the user themselves
	if viewer != id {
		tripsCopy := newUser.Trips
		for i := len(tripsCopy) - 1; i >= 0; i-- {
			if tripsCopy[i] == -1 || fetchTrip(tripsCopy[i]).Private {
				tripsCopy = append(tripsCopy[:i], tripsCopy[i+1:]...)
			}
		}
		newUser.Trips = tripsCopy
	}
	return &newUser
}

// GetUserPasswordHashDB - Retreives and return the password hash of the user account.
func GetUserPasswordHashDB(user wings.NewUser) string {
	return getUserWithEmail(user.Email).Password
}

// GetUserWithEmailDB - Retrieve user information from database with their email.
func GetUserWithEmailDB(user wings.NewUser) wings.User {
	return getUserWithID(getUserWithEmail(user.Email).ID)
}

// UpdateUserDB - Update user information back into the database.
func UpdateUserDB(updatedUser structs.IStructs) bool {
	user, ok := updatedUser.(*wings.User)
	if !ok {
		logger.Print(logger.Database, "User update failed since interface passed in is not a user.")
		return false
	}

	return updateUser(*user)
}

func deleteTripFromUserDB(tripID int, userID int) bool {
	user := getUserWithID(userID)
	var trips []int
	for _, trip := range user.Trips {
		if trip != tripID {
			trips = append(trips, trip)
		}
	}
	user.Trips = trips

	return UpdateUserDB(&user)
}

// DeleteUserDB - Delete user from the database.
func DeleteUserDB(existingUser structs.IStructs) bool {
	user, ok := existingUser.(*wings.User)
	if !ok {
		logger.Print(logger.Database, "User deletion failed since interface passed in is not a trip.")
		return false
	}

	existingUser = GetUserDB(user.GetID(), user.GetID())

	if existingUser.GetID() == -1 {
		return false
	}

	//TODO: More testing to make sure this is the same user
	DeleteEmailDB(user.ID, user.Email)
	return deleteUserWithID(existingUser.GetID())
}

func addNewUser(newUser wings.NewUser) int {
	sqlStatement := `
		INSERT INTO users (name, email, password, bio, time_created, confirmed)
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING id`
	id := 0
	err := db.QueryRow(
		sqlStatement,
		newUser.Name,
		newUser.Email,
		newUser.Password,
		"",
		time.Now(),
		false,
	).Scan(&id)
	if err != nil {
		logger.Err(logger.Database, err, "")
		return -1
	}
	logger.Print(logger.Database, "New record ID is: "+strconv.Itoa(id))
	return id
}

func getUserWithID(id int) wings.User {
	var user wings.User
	var sqlInt64 []sql.NullInt64
	sqlStatement := `
		SELECT id, name, email, bio, time_created, trips, confirmed
		FROM users WHERE id=$1;`
	switch err := db.QueryRow(sqlStatement, id).Scan(
		&user.ID,
		&user.Name,
		&user.Email,
		&user.Bio,
		&user.TimeCreated,
		pq.Array(&sqlInt64),
		&user.Confirmed,
	); err {
	case sql.ErrNoRows:
		logger.Print(logger.Database, "User not found.")
		user.ID = -1
	default:
		logger.Err(logger.Database, err, "")
	}

	user.Trips = []int{}
	for _, trip := range sqlInt64 {
		if trip.Valid {
			user.Trips = append(user.Trips, int(trip.Int64))
		}
	}

	return user
}

func getUserWithEmail(hashedPassword string) wings.NewUser {
	var user wings.NewUser
	sqlStatement := `
		SELECT id, password
		FROM users WHERE email=$1;`
	switch err := db.QueryRow(sqlStatement, hashedPassword).Scan(
		&user.ID,
		&user.Password,
	); err {
	case sql.ErrNoRows:
		logger.Print(logger.Database, "User not found.")
		user.ID = -1
	default:
		logger.Err(logger.Database, err, "")
	}

	return user
}

func updateUser(updatedUser wings.User) bool {
	existingUser := getUserWithID(updatedUser.GetID())
	if existingUser.GetID() != updatedUser.GetID() {
		logger.Print(logger.Database, "Existing User is not found. Aborting update.")
		logger.Print(logger.Database,
			"Given ID is "+strconv.Itoa(updatedUser.GetID())+
				" but found ID is "+strconv.Itoa(existingUser.GetID())+
				" instead.",
		)
		return false
	}

	sqlStatement := `
		UPDATE users
		SET name = $2,
		email = $3,
		bio = $4,
		trips = $5,
		confirmed = $6
		WHERE id = $1;`

	_, err := db.Exec(
		sqlStatement,
		updatedUser.ID,
		updatedUser.Name,
		updatedUser.Email,
		updatedUser.Bio,
		pq.Array(updatedUser.Trips),
		existingUser.Email == updatedUser.Email,
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

func deleteUserWithID(id int) bool {
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
