package email

import (
	"bufio"
	"io"
	"net/smtp"
	"os"
	"path/filepath"
	"strings"

	sendEmail "github.com/jordan-wright/email"

	db "github.com/binhonglee/GlobeTrotte/src/turbine/database"
	"github.com/binhonglee/GlobeTrotte/src/turbine/logger"
	"github.com/binhonglee/GlobeTrotte/src/turbine/wings"
)

const (
	configFile = "config/email.config"
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
	config := getConfig()

	if !hasConfig {
		return
	}

	if val, ok := config["address"]; ok && val != "" {
		address = val
	} else {
		hasConfig = false
		logger.Failure(
			logger.Email,
			"Address not found in email config. Skipping...",
		)
		return
	}

	if val, ok := config["username"]; ok && val != "" {
		username = val
	} else {
		hasConfig = false
		logger.Failure(
			logger.Email,
			"Username not found in email config. Skipping...",
		)
		return
	}

	if val, ok := config["password"]; ok && val != "" {
		password = val
	} else {
		hasConfig = false
		logger.Failure(
			logger.Email,
			"Password not found in email config. Skipping...",
		)
		return
	}

	if val, ok := config["host"]; ok && val != "" {
		host = val
	} else {
		hasConfig = false
		logger.Failure(
			logger.Email,
			"Host not found in email config. Skipping...",
		)
		return
	}

	if val, ok := config["port"]; ok && val != "" {
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
	e := &sendEmail.Email{
		To:      []string{emailAddress},
		From:    "GlobeTrotte <" + address + ">",
		Subject: "Confirm your GlobeTrotte email",
		HTML:    []byte(html),
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

func ConfirmEmail(confirmation EmailObj) bool {
	var email emailItem
	email.id, email.userID, email.emailAddress,
		email.confirmed = db.GetEmailDB(confirmation.Uuid)
	if email.id == -1 || email.confirmed ||
		email.userID != confirmation.Userid ||
		email.emailAddress != confirmation.Email {
		return false
	}

	user, ok := db.GetUserDB(email.userID, -1).(*wings.User)
	if !ok || user.ID == -1 || user.Email != confirmation.Email {
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

func getConfig() map[string]string {
	pwd, _ := os.Getwd()
	file, err := os.Open(filepath.Join(pwd, configFile))

	defer file.Close()
	if err != nil {
		hasConfig = false
		logger.Err(
			logger.Email, err, "Failed to open config file.",
		)
		return map[string]string{}
	}
	config := make(map[string]string)

	reader := bufio.NewReader(file)
	var line string

	for {
		line, err = reader.ReadString('\n')
		if err != nil {
			break
		}

		word := strings.Split(line, ":")
		if len(word) == 2 {
			config[word[0]] = strings.TrimSpace(word[1])
		}
	}

	if err != io.EOF {
		logger.Err(logger.Email, err, "")
		hasConfig = false
		return map[string]string{}
	}

	return config
}
