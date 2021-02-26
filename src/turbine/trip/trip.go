package trip

import (
	"time"

	"github.com/binhonglee/GlobeTrotte/src/turbine/database"
	"github.com/binhonglee/GlobeTrotte/src/turbine/wings"
)

func DummyTripObj() TripObj {
	trip := TripObj{}
	trip.ID = -1
	return trip
}

func NewTrip(newTrip wings.TripBasic, self wings.UserBasic) TripObj {
	tripObj := TripObj{}
	tripObj.Details = newTrip
	tripObj.User = self
	tripObj.LastUpdated = time.Now()
	tripObj.TimeCreated = time.Now()
	trip := parseTripObjToTrip(tripObj)
	tripObj.ID = database.AddTripDB(&trip)
	if tripObj.ID == -1 {
		return DummyTripObj()
	}
	return GetTripObj(tripObj.ID, self)
}

func GetTripObj(id int, self wings.UserBasic) TripObj {
	trip := database.GetTripDBWithID(id)
	tripObj := parseTripToTripObj(trip)
	tripObj.User = database.GetUserBasicDBWithID(trip.UserID)
	if tripObj.ID == -1 || tripObj.User.ID == -1 {
		return DummyTripObj()
	}
	if tripObj.Details.Private && tripObj.User.ID != self.ID {
		for _, access := range tripObj.Details.SharedWith {
			if access.UserID == self.ID && access.Access != wings.None {
				return tripObj
			}
		}
	} else {
		return tripObj
	}

	return DummyTripObj()
}

func UpdateTripObj(toUpdate TripObj, self wings.UserBasic) TripObj {
	if toUpdate.User.ID != self.ID && !checkTripPrivacy(
		toUpdate.Details,
		map[wings.AccessLevel]bool{wings.Owner: true, wings.Edit: true},
		self.ID,
	) {
		return DummyTripObj()
	}

	toUpdate.LastUpdated = time.Now()
	trip := parseTripObjToTrip(toUpdate)
	if database.UpdateTripDB(&trip) {
		return GetTripObj(toUpdate.ID, self)
	}

	return DummyTripObj()
}

func DeleteTripObj(toDelete TripObj, self wings.UserBasic) bool {
	if toDelete.User.ID != self.ID {
		return false
	}

	trip := parseTripObjToTrip(toDelete)
	return database.DeleteTripDB(&trip) &&
		database.DeleteTripFromUserDB(toDelete.Details, self)
}

func GetRecentTrips() []TripObj {
	recentTrips := database.GetRecentTrips()
	trips := make([]TripObj, len(recentTrips))

	for index, trip := range recentTrips {
		trips[index] = parseTripToTripObj(trip)
	}

	return trips
}

func checkTripPrivacy(
	trip wings.TripBasic,
	permissionLevels map[wings.AccessLevel]bool,
	userid int,
) bool {
	for _, access := range trip.SharedWith {
		if _, ok := permissionLevels[access.Access]; ok && access.UserID == userid {
			return true
		}
	}
	return false
}

func parseTripObjToTrip(tripObj TripObj) wings.Trip {
	trip := wings.Trip{}
	trip.ID = tripObj.ID
	trip.Name = tripObj.Details.Name
	trip.Cities = tripObj.Details.Cities
	trip.Days = tripObj.Details.Days
	trip.Description = tripObj.Details.Description
	trip.Private = tripObj.Details.Private
	trip.SharedWith = tripObj.Details.SharedWith
	trip.UserID = tripObj.User.ID
	trip.LastUpdated = tripObj.LastUpdated
	trip.TimeCreated = tripObj.TimeCreated
	return trip
}

func parseTripToTripObj(trip wings.Trip) TripObj {
	tripObj := TripObj{}
	tripObj.ID = trip.ID
	tripObj.Details = parseTripToTripBasic(trip)
	tripObj.User = database.GetUserBasicDBWithID(trip.UserID)
	tripObj.LastUpdated = trip.LastUpdated
	tripObj.TimeCreated = trip.TimeCreated
	return tripObj
}

func parseTripToTripBasic(trip wings.Trip) wings.TripBasic {
	tripBasic := new(wings.TripBasic)
	tripBasic.ID = trip.ID
	tripBasic.Name = trip.Name
	tripBasic.Cities = trip.Cities
	tripBasic.Days = trip.Days
	tripBasic.Description = trip.Description
	tripBasic.Private = trip.Private
	tripBasic.SharedWith = trip.SharedWith
	return *tripBasic
}
