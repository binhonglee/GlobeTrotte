package database

import (
    "bufio"
    "database/sql"
    "fmt"
    "io"
    "os"
    "strconv"
    "strings"

    // This is needed for PostgreSQL to work properly
    _ "github.com/lib/pq"
)

const (
    configFile = "config/psql.config"
)

var db *sql.DB
var tableNames = [3]string{"users", "trips", "cities"}

func init() {
    config := getConfig()

    var port int
    if parsePort, err := strconv.Atoi(strings.TrimSpace(config["port"])); err == nil {
        port = parsePort
    } else {
        panic("Invalid port format: " + strings.TrimSpace(config["port"]))
    }

    psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
        "password=%s dbname=%s sslmode=disable",
        config["host"], port, config["user"], config["password"], config["dbname"])

    if getDB, err := sql.Open("postgres", psqlInfo); err == nil {
        db = getDB
    } else {
        panic("Invalid DB config")
    }

    initializeDB()

    if err := db.Ping(); err != nil {
        panic("Unable to connect to database")
    }
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
            fmt.Println(element, " table not found. Creating it...")
            fmt.Println(err)

            switch element {
                case "users":
                    createUsersTable()
                case "trips":
                    createTripsTable()
                case "cities":
                    createCitiesTable()
                default:
                    panic("New element was added to 'tableNames' but no creation method is added for it.")
            }

            fmt.Println(element, " table created successfully.")
        }
    }
}

func createUsersTable() {
    createTable := `
    CREATE TABLE users (
        id              SERIAL PRIMARY KEY,
        name            TEXT        NOT NULL,
        password        TEXT,
        email           TEXT UNIQUE NOT NULL,
        bio             TEXT,
        time_created    TIMESTAMPTZ NOT NULL,
        trips           INT[]
    );`
    _, err := db.Exec(createTable)

    if err != nil {
        panic(err)
    }
}

func createTripsTable() {
    createTable := `
    CREATE TABLE trips (
        id              SERIAL PRIMARY KEY,
        userid          INT         NOT NULL,
        name            TEXT        NOT NULL,
        city            INT         NOT NULL,
        description     TEXT,
        places          TEXT[],
        links           TEXT[],
        time_created    TIMESTAMPTZ NOT NULL,
        last_updated    TIMESTAMPTZ NOT NULL
    );`
    _, err := db.Exec(createTable)

    if err != nil {
        panic(err)
    }
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

    if err != nil {
        panic(err)
    }
}

func getConfig() map[string]string {
    file, err := os.Open(configFile)
    defer file.Close()
    if err != nil {
        panic(err)
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
            config[word[0]] = word[1]
        }
    }

    if err != io.EOF {
        panic(fmt.Sprintf(" > Failed!: %v\n", err))
    }

    return config
}
