package database

import (
    "strconv"

    city "github.com/binhonglee/GlobeTrotte/src/turbine/city"
    structs "github.com/binhonglee/GlobeTrotte/src/turbine/structs"
)

func daysToIDArray(days structs.Days) []int {
    var idArray []int = make([]int, len(days))
    for index := range days {
        idArray[index] = days[index].GetID()
    }
    return idArray
}

func placesToIDArray(places structs.Places) []int {
    var idArray []int = make([]int, len(places))
    for index := range places {
        idArray[index] = places[index].GetID()
    }
    return idArray
}

func cityEnumArrayToIDs(cities []city.City) []int {
    var idArray []int = make([]int, len(cities))
    for index := range cities {
        idArray[index] = int(cities[index])
    }
    return idArray
}

func cityIDsToEnumArray(cityIDs []int64) []city.City {
    var cityArray []city.City = make([]city.City, len(cityIDs))
    for index := range cityIDs {
        cityArray[index] = city.City(cityIDs[index])
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
