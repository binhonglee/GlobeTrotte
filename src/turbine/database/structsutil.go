package database

import (
    place "github.com/binhonglee/GlobeTrotte/src/turbine/place"
    "strconv"
)

func arraysToPlaces(placesArr []string, linksArr []string) place.Places {
    var places place.Places

    for index, _ := range placesArr {
        var tempPlace place.Place
        tempPlace.Label = placesArr[index]
        tempPlace.Url = linksArr[index]
        places = append(places, tempPlace)
    }

    return places
}

func placesToArrays(places place.Places) ([]string, []string) {
    var placesArr []string
    var linkArr []string

    for _, element := range places {
        placesArr = append(placesArr, element.Label)
        linkArr = append(linkArr, element.Url)
    }

    return placesArr, linkArr
}

func placesToString(places place.Places) string {
    placeString := ""

    for _, element := range places {
        placeString += element.Label
        placeString += " "
        placeString += element.Url
        placeString += "\n"
    }

    return placeString
}

func tripsToString(tripIDs []int) string {
    var toReturn = ""

    for _, trip := range tripIDs {
        toReturn += strconv.Itoa(trip)
    }

    return toReturn
}
