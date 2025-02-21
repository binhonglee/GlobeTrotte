package database

import (
	"context"
	"fmt"
	"strconv"
	"strings"

	"github.com/binhonglee/GlobeTrotte/src/turbine/config"
	"github.com/binhonglee/GlobeTrotte/src/turbine/logger"

	"github.com/jackc/pgx/v4/pgxpool"
)

var pgxConnString string
var tableNames = [9]string{
	"users", "trips", "cities", "days", "places", "travel_time", "emails", "parsed_cities", "images",
}

func init() {
	psqlConfig := config.GetConfigStringMap("psql")

	var port int
	if parsePort, err := strconv.Atoi(
		strings.TrimSpace(psqlConfig["port"]),
	); err == nil {
		port = parsePort
	} else {
		logger.Panic(
			logger.Database,
			"Invalid port format: "+strings.TrimSpace(psqlConfig["port"]),
		)
	}

	pgxConnString = fmt.Sprintf(
		"postgres://%s:%s@%s:%d//%s",
		psqlConfig["user"],
		psqlConfig["password"],
		psqlConfig["host"], port,
		psqlConfig["dbname"],
	)

	conn, err := pgxpool.Connect(
		context.Background(),
		pgxConnString,
	)
	logger.PanicErr(logger.Database, err, "Unable to connect to database.\n")
	logger.PanicErr(
		logger.Database,
		conn.Ping(context.Background()),
		"Unable to connect to database",
	)

	initializeDB()

	logger.PanicErr(
		logger.Database,
		conn.Ping(context.Background()),
		"Unable to connect to database",
	)
	logger.Success(logger.Database, "DB initialization is complete!")
}

func getConn() *pgxpool.Pool {
	var conn *pgxpool.Pool
	if getConn, err := pgxpool.Connect(
		context.Background(),
		pgxConnString,
	); err == nil {
		conn = getConn
	} else {
		logger.Err(logger.Database, err, "Unable to connect to database.\n")
	}
	return conn
}

func initializeDB() {
	ifTableExists := `
		SELECT EXISTS(
			SELECT 1
			FROM %s
		);`

	for _, element := range tableNames {
		c := getConn()
		_, err := c.Exec(context.Background(), fmt.Sprintf(ifTableExists, element))
		defer c.Close()

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
			case "travel_time":
				createTravelTimeTable()
			case "emails":
				createEmailsTable()
			case "parsed_cities":
				createParsedCitiesTable()
				setupCities(config.GetConfigStringMap("city_map"))
			case "images":
				createImagesTable()
			default:
				logger.Panic(
					logger.Database,
					"New element was added to 'tableNames' but no creation method is added for it.",
				)
			}

			logger.Print(logger.Database, element+" table created successfully.")
		}
	}

	updateUserTable()
	updateDaysTable()
}

func createUsersTable() {
	createTable := `
		CREATE TABLE users (
			id              SERIAL PRIMARY KEY,
			username        TEXT UNIQUE,
			name            TEXT           NOT NULL,
			password        TEXT           NOT NULL,
			email           TEXT UNIQUE    NOT NULL,
			bio             TEXT,
			link            TEXT,
			time_created    TIMESTAMPTZ    NOT NULL,
			trips           INT[],
			bookmarked      INT[],
			confirmed       BOOLEAN        NOT NULL
		);`
	c := getConn()
	_, err := c.Exec(context.Background(), createTable)
	defer c.Close()

	logger.PanicErr(logger.Database, err, "Failed to create `users` table. ")
}

func updateUserTable() {
	c := getConn()
	c.Exec(context.Background(), `ALTER TABLE users ADD COLUMN IF NOT EXISTS link TEXT;`)
	c.Exec(context.Background(), `ALTER TABLE users ADD COLUMN IF NOT EXISTS bio TEXT;`)
	c.Exec(context.Background(), `ALTER TABLE users ADD COLUMN IF NOT EXISTS trips INT[];`)
	c.Exec(context.Background(), `ALTER TABLE users ADD COLUMN IF NOT EXISTS username TEXT UNIQUE;`)
	c.Exec(context.Background(), `ALTER TABLE users ADD COLUMN IF NOT EXISTS bookmarked INT[];`)
	defer c.Close()
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
	c := getConn()
	_, err := c.Exec(context.Background(), createTable)
	defer c.Close()

	logger.PanicErr(logger.Database, err, "Failed to create `trips` table.")
}

func createDaysTable() {
	createTable := `
		CREATE TABLE days (
			id             SERIAL PRIMARY KEY,
			trip_id        INT     NOT NULL,
			day_of         INT     NOT NULL,
			places         INT[],
			travel_times   INT[]
		);`
	c := getConn()
	_, err := c.Exec(context.Background(), createTable)
	defer c.Close()

	logger.PanicErr(logger.Database, err, "Failed to create `days` table.")
}

func updateDaysTable() {
	c := getConn()
	c.Exec(context.Background(), `ALTER TABLE days ADD COLUMN IF NOT EXISTS travel_times INT[];`)
	defer c.Close()
}

func createPlacesTable() {
	createTable := `
		CREATE TABLE places (
			id             SERIAL PRIMARY KEY,
			label          TEXT,
			url            TEXT,
			description    TEXT
		);`
	c := getConn()
	_, err := c.Exec(context.Background(), createTable)
	defer c.Close()

	logger.PanicErr(logger.Database, err, "Failed to create `places` table.")
}

func createTravelTimeTable() {
	createTable := `
		CREATE TABLE travel_time (
			id                SERIAL PRIMARY KEY,
			from_place_id     INT,
			to_place_id       INT,
			time_in_minutes   INT
		);`
	c := getConn()
	_, err := c.Exec(context.Background(), createTable)
	defer c.Close()

	logger.PanicErr(logger.Database, err, "Failed to create `travel_time` table.")
}

func createCitiesTable() {
	createTable := `
		CREATE TABLE cities (
			id          SERIAL PRIMARY KEY,
			name        TEXT    NOT NULL,
			country     TEXT    NOT NULL,
			trips       INT[]
		);`
	c := getConn()
	_, err := c.Exec(context.Background(), createTable)
	defer c.Close()

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
	c := getConn()
	_, err := c.Exec(context.Background(), createTable)
	defer c.Close()

	logger.PanicErr(logger.Database, err, "Failed to create `emails` table.")
}

func createParsedCitiesTable() {
	createTable := `
		CREATE TABLE parsed_cities (
			id          INT PRIMARY KEY UNIQUE,
			name        TEXT,
			search_name TEXT,
			iso2        TEXT,
			iso3        TEXT,
			country     TEXT,
			population  INT
		);`
	c := getConn()
	_, err := c.Exec(context.Background(), createTable)
	defer c.Close()

	logger.PanicErr(logger.Database, err, "Failed to create `parsed_cities` table.")
}

func createImagesTable() {
	createTable := `
		CREATE TABLE images (
			id      SERIAL PRIMARY KEY,
			userid  INT NOT NULL,
			trip_id INT
		);
	`
	c := getConn()
	_, err := c.Exec(context.Background(), createTable)
	defer c.Close()

	logger.PanicErr(logger.Database, err, "Failed to create `images` table.")
}
