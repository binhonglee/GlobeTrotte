// DO NOT USE ANYTHING HERE DIRECTLY
// Use email package instead

package database

import (
	"database/sql"
	"strconv"

	"github.com/google/uuid"

	"github.com/binhonglee/GlobeTrotte/src/turbine/logger"
)

// AddEmailDB - Do not call this directly. Use `NewEmail` from `email` instead.
func AddEmailDB(userid int, emailAddress string) string {
	sqlStatement := `
		INSERT INTO emails (userid, code, emailAddress, confirmed)
		VALUES ($1, $2, $3, $4)
		RETURNING id`
	id := -1
	uuid := newUniqueUUIDString()

	err := db.QueryRow(
		sqlStatement,
		userid,
		uuid,
		emailAddress,
		false,
	).Scan(&id)

	if err != nil || id == -1 {
		logger.Err(logger.Database, err, "Adding new email failed.")
		return ""
	}
	logger.Print(
		logger.Database,
		"New email "+emailAddress+
			" added for "+strconv.Itoa(userid)+
			" with id "+strconv.Itoa(id),
	)
	return uuid
}

func newUniqueUUIDString() string {
	unused := false
	var err error
	var id uuid.UUID
	for !unused {
		id, err = uuid.NewRandom()
		if err == nil {
			unused = verifyUUIDIsUnused(id.String())
		}
	}

	return id.String()
}

func verifyUUIDIsUnused(uuid string) bool {
	sqlStatement := `
		SELECT * FROM emails WHERE code=$1;`
	err := db.QueryRow(sqlStatement, uuid).Scan()
	return err == sql.ErrNoRows
}

func GetEmailDB(code string) (int, int, string, bool) {
	var id int
	var userid int
	var emailAddress string
	var confirmed bool
	sqlStatement := `
		SELECT id, userid, emailAddress, confirmed
		FROM emails WHERE code=$1;`
	err := db.QueryRow(
		sqlStatement, code,
	).Scan(&id, &userid, &emailAddress, &confirmed)
	if err != nil {
		id = -1
		logger.Err(
			logger.Database, err,
			"Failed to fetch email from DB",
		)
	}
	return id, userid, emailAddress, confirmed
}

func GetEmailWithIDDB(userid int) string {
	var emailAddress string
	sqlStatement := `
		SELECT emailAddress
		FROM emails WHERE userid=$1;`
	err := db.QueryRow(sqlStatement, userid).Scan(&emailAddress)
	logger.Err(logger.Database, err, "Failed to fetch email with user id "+strconv.Itoa(userid))
	return emailAddress
}

// ConfirmEmailDB - Do not call this directly. Use `ConfirmEmail` from `email` instead.
func ConfirmEmailDB(
	id int, userid int, emailAddress string, code string,
) bool {
	sqlStatement := `
		UPDATE emails
		SET confirmed = $1
		WHERE id = $2
		AND userid = $3
		AND emailAddress = $4
		AND code = $5;`
	_, err := db.Exec(
		sqlStatement, true, id, userid, emailAddress, code,
	)

	if err != nil {
		logger.Err(
			logger.Database, err,
			"Failed to confirm email for "+code,
		)
		return false
	}
	return confirmUser(userid)
}

func DeleteEmailDB(userid int, emailAddress string) bool {
	sqlStatement := `
		DELETE FROM emails
		WHERE userid = $1
		AND emailAddress = $2;`
	if _, err := db.Exec(
		sqlStatement, userid, emailAddress,
	); err != nil {
		logger.Err(
			logger.Database, err, "Failed deleting email "+
				emailAddress+" for "+strconv.Itoa(userid),
		)
		return false
	}
	return true
}

func DeleteEmailsDB(userid int) bool {
	sqlStatement := `
		DELETE FROM emails
		WHERE userid = $1;`
	if _, err := db.Exec(sqlStatement, userid); err != nil {
		logger.Err(
			logger.Database, err,
			"Failed deleting email for "+strconv.Itoa(userid),
		)
		return false
	}
	return true
}
