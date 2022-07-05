package database

import (
	"archive/zip"
	"bufio"
	"context"
	"io"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/binhonglee/GlobeTrotte/src/turbine/logger"
	"github.com/binhonglee/GlobeTrotte/src/turbine/wings"
	"github.com/jackc/pgx/v4/pgxpool"
)

var cityConfig = CityConfig{}

func setupCities(config map[string]string) {
	if len(config) < 1 {
		logger.Failure(logger.Database, "Missing city_map config, skipping...")

		sqlStatement := `
			INSERT INTO parsed_cities (id, name, search_name, iso2, iso3, country, population)
			VALUES ($1, $2, $3, $4, $5, $6, $7);
		`

		c := getConn()
		c.Exec(
			context.Background(),
			sqlStatement,
			1840000455,
			"Boston, Massachusetts",
			"Boston, Massachusetts, United States",
			"US",
			"USA",
			"United States",
			"99999999",
		)

		c.Close()
		return
	}

	resp, err := http.Get(config["url"])
	logger.PanicErr(logger.Database, err, "")
	// if resp.StatusCode != 200 {
	// 	logger.Panic(logger.Database, "Download failed from the url.")
	// }
	defer resp.Body.Close()

	out, err := os.Create(config["download"])
	logger.PanicErr(logger.Database, err, "")
	defer out.Close()

	_, err = io.Copy(out, resp.Body)
	logger.PanicErr(logger.Database, err, "")

	archive, err := zip.OpenReader(config["download"])
	logger.PanicErr(logger.Database, err, "")
	defer archive.Close()
	foundFile := false

	for _, f := range archive.File {
		if f.FileInfo().Name() == config["filename"] {
			foundFile = true
			file, err := f.Open()
			logger.PanicErr(logger.Database, err, "")

			parseFile(file)
			file.Close()
		}
	}

	if !foundFile {
		logger.Panic(logger.Database, "Data file from simplemaps not found.")
	}
}

func parseFile(file io.Reader) {
	reader := bufio.NewReader(file)

	firstLine, err := reader.ReadString('\n')
	logger.PanicErr(logger.Database, err, "")

	categories := strings.Split(firstLine, ",")

	for i, c := range categories {
		c, _ = strconv.Unquote(strings.TrimSpace(c))
		switch c {
		case "admin_name":
			cityConfig.admin_name = i
		case "capital":
			cityConfig.capital = i
		case "city":
			cityConfig.city = i
		case "city_ascii":
			cityConfig.city_ascii = i
		case "country":
			cityConfig.country = i
		case "iso2":
			cityConfig.iso2 = i
		case "iso3":
			cityConfig.iso3 = i
		case "id":
			cityConfig.id = i
		case "population":
			cityConfig.population = i
		}
	}

	conn, _ := pgxpool.Connect(
		context.Background(),
		pgxConnString,
	)

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			if err.Error() == "EOF" {
				break
			}

			logger.PanicErr(logger.Database, err, "")
		}

		fields := strings.Split(line, "\",\"")

		id, err := strconv.Atoi(
			strings.TrimSuffix(
				strings.TrimSpace(
					fields[cityConfig.id],
				),
				"\"",
			),
		)
		logger.PanicErr(logger.Database, err, "Failed to parse id from string.")

		var population int
		if fields[cityConfig.population] == "" {
			population = -1
		} else {
			populationStr := strings.Split(fields[cityConfig.population], ".")[0]
			population, err = strconv.Atoi(populationStr)
			logger.PanicErr(logger.Database, err, "Failed to parse population.")
		}

		sqlStatement := `
			INSERT INTO parsed_cities (id, name, search_name, iso2, iso3, country, population)
			VALUES ($1, $2, $3, $4, $5, $6, $7);
		`
		displayName := parseCityDisplayName(fields)

		_, err = conn.Exec(
			context.Background(),
			sqlStatement,
			id,
			displayName,
			displayName+", "+fields[cityConfig.country],
			fields[cityConfig.iso2],
			fields[cityConfig.iso3],
			fields[cityConfig.country],
			population,
		)
		logger.Err(logger.Database, err, "")
	}

	conn.Close()
}

func parseCityDisplayName(fields []string) string {
	if fields[cityConfig.country] == "United States" {
		return fields[cityConfig.city_ascii] + ", " + fields[cityConfig.admin_name]
	}

	if fields[cityConfig.city_ascii] == fields[cityConfig.admin_name] ||
		fields[cityConfig.city] == fields[cityConfig.admin_name] ||
		fields[cityConfig.capital] == "primary" {
		return fields[cityConfig.city_ascii]
	}
	return fields[cityConfig.city_ascii] + ", " + fields[cityConfig.admin_name]
}

type CityConfig struct {
	admin_name int
	capital    int
	city       int
	city_ascii int
	country    int
	id         int
	iso2       int
	iso3       int
	population int
}

func GetCitiesDB(searchTerm string) wings.ParsedCitys {
	sqlStatement := `
		SELECT id, name, iso2
		FROM parsed_cities
		WHERE search_name ILIKE $1
		ORDER BY population DESC
		LIMIT 50;
	`

	c := getConn()
	rows, err := c.Query(context.Background(), sqlStatement, "%"+searchTerm+"%")
	logger.Err(logger.Database, err, "")
	var cities wings.ParsedCitys
	for rows.Next() {
		var city wings.ParsedCity
		err := rows.Scan(&city.ID, &city.Display, &city.Iso2)
		logger.Err(logger.Database, err, "")
		cities = append(cities, city)
	}

	rows.Close()
	c.Close()

	return cities
}

func GetCityDB(id int) wings.ParsedCity {
	var city wings.ParsedCity
	sqlStatement := `
		SELECT id, name, iso2
		FROM parsed_cities
		WHERE id = $1;
	`

	c := getConn()
	err := c.QueryRow(context.Background(), sqlStatement, id).Scan(&city.ID, &city.Display, &city.Iso2)
	logger.Err(logger.Database, err, "Can't find "+strconv.Itoa(id))
	c.Close()
	return city
}

func getNewCityIDFromLegacyCityID(id int) int {
	idMap := map[int]int{
		1:  1840021543,
		2:  1840021570,
		3:  1840034016,
		4:  1840023385,
		5:  1250015082,
		6:  1458988644,
		7:  1458236750,
		8:  1840021117,
		9:  1840006060,
		10: 1840000455,
		11: 1840020568,
		12: 1840020336,
		13: 1840020491,
		14: 1840020364,
		15: 1840021579,
		16: 1840013305,
		17: 1840023232,
	}

	if value, exist := idMap[id]; exist {
		return value
	}
	return id
}
