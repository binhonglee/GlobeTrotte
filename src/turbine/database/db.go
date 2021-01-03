package database

import (
	"bufio"
	"database/sql"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strconv"
	"strings"

	logger "github.com/binhonglee/GlobeTrotte/src/turbine/logger"
	// This is needed for PostgreSQL to work properly
	_ "github.com/lib/pq"
)

const (
	configFile = "config/psql.config"
)

var db *sql.DB
var tableNames = [6]string{"users", "trips", "cities", "days", "places", "emails"}

func init() {
	config := getConfig()

	var port int
	if parsePort, err := strconv.Atoi(strings.TrimSpace(config["port"])); err == nil {
		port = parsePort
	} else {
		logger.Panic(logger.Database, "Invalid port format: "+strings.TrimSpace(config["port"]))
	}

	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		config["host"], port, config["user"], config["password"], config["dbname"])

	if getDB, err := sql.Open("postgres", psqlInfo); err == nil {
		db = getDB
	} else {
		logger.Panic(logger.Database, "Invalid DB config")
	}

	initializeDB()

	logger.PanicErr(logger.Database, db.Ping(), "Unable to connect to database")
	logger.Success(logger.Database, "DB initialization is complete!")
}

func initializeDB() {
	ifTableExists := `
		SELECT EXISTS(
			SELECT 1
			FROM %s
		);`

	for _, element := range tableNames {
		_, err := db.Exec(fmt.Sprintf(ifTableExists, element))

		if err != nil {
			logger.Print(logger.Database, element+" table not found. Creating it...")

			switch element {
			case "users":
				createUsersTable()
			case "trips":
				createTripsTable()
			case "cities":
				createCitiesTable()
			case "days":
				createDaysTable()
			case "places":
				createPlacesTable()
			case "emails":
				createEmailsTable()
			default:
				logger.Panic(logger.Database, "New element was added to 'tableNames' but no creation method is added for it.")
			}

			logger.Print(logger.Database, element+" table created successfully.")
		}
	}
}

func createUsersTable() {
	createTable := `
		CREATE TABLE users (
			id              SERIAL PRIMARY KEY,
			name            TEXT           NOT NULL,
			password        TEXT           NOT NULL,
			email           TEXT UNIQUE    NOT NULL,
			bio             TEXT,
			time_created    TIMESTAMPTZ    NOT NULL,
			trips           INT[]
			confirmed       BOOLEAN        NOT NULL,
		);`
	_, err := db.Exec(createTable)

	logger.PanicErr(logger.Database, err, "Failed to create `users` table. ")
}

func createTripsTable() {
	createTable := `
		CREATE TABLE trips (
			id              SERIAL PRIMARY KEY,
			userid          INT            NOT NULL,
			name            TEXT           NOT NULL,
			cities          INT[]          NOT NULL,
			description     TEXT,
			days            INT[],
			private         BOOLEAN        NOT NULL,
			time_created    TIMESTAMPTZ    NOT NULL,
			last_updated    TIMESTAMPTZ    NOT NULL
		);`
	_, err := db.Exec(createTable)

	logger.PanicErr(logger.Database, err, "Failed to create `trips` table.")
}

func createDaysTable() {
	createTable := `
		CREATE TABLE days (
			id         SERIAL PRIMARY KEY,
			trip_id    INT     NOT NULL,
			day_of     INT     NOT NULL,
			places     INT[]
		);`
	_, err := db.Exec(createTable)

	logger.PanicErr(logger.Database, err, "Failed to create `days` table.")
}

func createPlacesTable() {
	createTable := `
		CREATE TABLE places (
			id             SERIAL PRIMARY KEY,
			label          TEXT,
			url            TEXT,
			description    TEXT
		);`
	_, err := db.Exec(createTable)

	logger.PanicErr(logger.Database, err, "Failed to create `places` table.")
}

func createCitiesTable() {
	createTable := `
		CREATE TABLE cities (
			id          SERIAL PRIMARY KEY,
			name        TEXT    NOT NULL,
			country     TEXT    NOT NULL,
			trips       INT[]
		);`
	_, err := db.Exec(createTable)

	logger.PanicErr(logger.Database, err, "Failed to create `cities` table.")
}

func createEmailsTable() {
	createTable := `
		CREATE TABLE emails (
			id              SERIAL PRIMARY KEY,
			userid          INT            NOT NULL,
			code            TEXT UNIQUE    NOT NULL,
			emailAddress    TEXT           NOT NULL,
			confirmed       BOOLEAN        NOT NULL
		);`
	_, err := db.Exec(createTable)

	logger.PanicErr(logger.Database, err, "Failed to create `emails` table.")
}

func getConfig() map[string]string {
	pwd, _ := os.Getwd()
	file, err := os.Open(filepath.Join(pwd, configFile))

	defer file.Close()
	logger.PanicErr(logger.Database, err, "Failed to open config file.")
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
			config[word[0]] = word[1]
		}
	}

	if err != io.EOF {
		panic(fmt.Sprintf(" > Failed!: %v\n", err))
	}

	return config
}
