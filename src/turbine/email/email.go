package email

import (
	"net/smtp"
	"strings"

	sendEmail "github.com/jordan-wright/email"

	"github.com/binhonglee/GlobeTrotte/src/turbine/config"
	db "github.com/binhonglee/GlobeTrotte/src/turbine/database"
	"github.com/binhonglee/GlobeTrotte/src/turbine/logger"
)

const (
	configsFile = "configs/email.configs"
)

var hasConfig bool = true
var address string
var username string
var password string
var host string
var port string

type emailItem struct {
	id           int
	userID       int
	code         string
	emailAddress string
	confirmed    bool
}

func init() {
	configs := config.GetConfigStringMap("email")

	if !hasConfig {
		return
	}

	if val, ok := configs["address"]; ok && val != "" {
		address = val
	} else {
		hasConfig = false
		logger.Failure(
			logger.Email,
			"Address not found in email config. Skipping...",
		)
		return
	}

	if val, ok := configs["username"]; ok && val != "" {
		username = val
	} else {
		hasConfig = false
		logger.Failure(
			logger.Email,
			"Username not found in email config. Skipping...",
		)
		return
	}

	if val, ok := configs["password"]; ok && val != "" {
		password = val
	} else {
		hasConfig = false
		logger.Failure(
			logger.Email,
			"Password not found in email config. Skipping...",
		)
		return
	}

	if val, ok := configs["host"]; ok && val != "" {
		host = val
	} else {
		hasConfig = false
		logger.Failure(
			logger.Email,
			"Host not found in email config. Skipping...",
		)
		return
	}

	if val, ok := configs["port"]; ok && val != "" {
		port = val
	} else {
		hasConfig = false
		logger.Failure(
			logger.Email,
			"Port not found in email config. Skipping...",
		)
		return
	}

	logger.Success(logger.Email, "Email config is found and successfully setup.")
}

func SendEmail(subject string, content string, emailAddress string) bool {
	e := &sendEmail.Email{
		To:      []string{emailAddress},
		From:    "GlobeTrotte <" + address + ">",
		Subject: subject,
		HTML:    []byte(content),
	}
	err := e.Send(
		host+":"+port,
		smtp.PlainAuth(
			"",
			username,
			password,
			host,
		),
	)
	if err != nil {
		logger.Err(logger.Email, err, "")
		return false
	}
	logger.Print(
		logger.Email,
		"Confirmation email sent to "+emailAddress,
	)
	return true
}

func NewEmail(userid int, emailAddress string) bool {
	uuid := db.AddEmailDB(userid, emailAddress)
	if uuid == "" {
		return false
	}

	if !hasConfig || strings.HasSuffix(emailAddress, "@globetrotte.com") {
		logger.Print(
			logger.Email, "Email config not set. Skip sending email...",
		)
		return true
	}
	html := `<p>Click <a href="` +
		"https://globetrotte.com/confirm/email/" + uuid +
		`">here</a> to confirm your GlobeTrotte account email</p>`

	return SendEmail("Confirm your GlobeTrotte email", html, emailAddress)
}

func ConfirmEmail(confirmation EmailObj) bool {
	var email emailItem
	email.id, email.userID, email.emailAddress,
		email.confirmed = db.GetEmailDB(confirmation.Uuid)
	if email.id == -1 || email.confirmed ||
		email.userID != confirmation.Userid ||
		email.emailAddress != confirmation.Email {
		return false
	}

	user := db.GetUserBasicDBWithID(email.userID)
	if user.ID == -1 || user.Email != confirmation.Email {
		return false
	}

	return db.ConfirmEmailDB(
		email.id, email.userID, email.emailAddress, email.code,
	)
}

func UpdateEmail(userid int, newEmail string) bool {
	existingEmail := db.GetEmailWithIDDB(userid)
	if existingEmail == "" {
		return NewEmail(userid, newEmail)
	}

	if existingEmail == newEmail {
		return true
	} else {
		if !db.DeleteEmailsDB(userid) {
			return false
		}

		return NewEmail(userid, newEmail)
	}
}
