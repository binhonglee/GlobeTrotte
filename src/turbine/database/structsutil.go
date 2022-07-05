package database

import (
	"strconv"

	wings "github.com/binhonglee/GlobeTrotte/src/turbine/wings"
	"github.com/jackc/pgtype"
)

func daysToIDArray(days wings.Days) []int {
	var idArray []int = make([]int, len(days))
	for index := range days {
		idArray[index] = days[index].GetID()
	}
	return idArray
}

func placesToIDArray(places wings.Places) []int {
	var idArray []int = make([]int, len(places))
	for index := range places {
		idArray[index] = places[index].GetID()
	}
	return idArray
}

func travelTimesToIDArray(travelTimes wings.TravelTimes) []int {
	var idArray []int = make([]int, len(travelTimes))
	for index := range travelTimes {
		idArray[index] = travelTimes[index].ID
	}
	return idArray
}

func cityEnumArrayToIDs(cities []wings.City) []int {
	var idArray []int = make([]int, len(cities))
	for index := range cities {
		idArray[index] = int(cities[index])
	}
	return idArray
}

func parsedCitiesToIDs(cities []wings.ParsedCity) []int {
	var idArray []int = make([]int, len(cities))
	for index := range cities {
		idArray[index] = cities[index].ID
	}
	return idArray
}

func cityIDsToParsedCities(cityIDs []int64) []wings.ParsedCity {
	var cityArray []wings.ParsedCity = make([]wings.ParsedCity, len(cityIDs))
	for index := range cityIDs {
		cityID := int(cityIDs[index])
		if cityID < 20 {
			cityID = getNewCityIDFromLegacyCityID(cityID)
		}

		cityArray[index] = GetCityDB(cityID)
	}
	return cityArray
}

func cityIDsToEnumArray(cityIDs []int64) []wings.City {
	var cityArray []wings.City = make([]wings.City, len(cityIDs))
	for index := range cityIDs {
		cityArray[index] = wings.City(cityIDs[index])
	}
	return cityArray
}

func tripsToString(tripIDs []int) string {
	var toReturn = ""

	for _, trip := range tripIDs {
		toReturn += strconv.Itoa(trip)
	}

	return toReturn
}

func int64V(arr pgtype.Int4Array) []int64 {
	var ret []int64
	arr.AssignTo(&ret)
	return ret
}

func intV(arr pgtype.Int4Array) []int {
	var ret []int
	arr.AssignTo(&ret)
	return ret
}
