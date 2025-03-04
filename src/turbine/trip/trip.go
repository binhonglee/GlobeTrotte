package trip

import (
	"slices"

	"github.com/binhonglee/GlobeTrotte/src/turbine/database"
	"github.com/binhonglee/GlobeTrotte/src/turbine/logger"
	"github.com/binhonglee/GlobeTrotte/src/turbine/wings"
)

func DummyTripObj() TripObj {
	trip := TripObj{}
	trip.ID = -1
	return trip
}

func NewTrip(newTrip wings.TripBasic, self wings.UserBasic) TripObj {
	id := database.AddTripDB(newTrip, self.ID)
	if id == -1 {
		return DummyTripObj()
	}
	for _, image := range newTrip.Photos {
		if database.CheckImageOwner(image, self.ID) {
			database.AttachTripToImage(image, id)
		}
	}
	return GetTripObj(id, self)
}

func GetTripObj(id int, self wings.UserBasic) TripObj {
	trip, extra := database.GetTripBasicWithID(id)
	tripObj := toTripObj(trip, extra)
	if tripObj.ID == -1 || tripObj.User.ID == -1 || tripObj.User.ID == 0 {
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

	if database.UpdateTripDB(toUpdate.Details, self.ID) {
		images := database.FetchImagesForTrip(toUpdate.ID)
		for _, image := range images {
			if !slices.Contains(toUpdate.Details.Photos, image) {
				database.DeleteImageDB(image)
			}
		}

		for _, image := range toUpdate.Details.Photos {
			if database.CheckImageOwner(image, self.ID) {
				database.AttachTripToImage(image, toUpdate.ID)
			}
		}
		return GetTripObj(toUpdate.ID, self)
	}

	return DummyTripObj()
}

func DeleteTripObj(toDelete TripObj, self wings.UserBasic) bool {
	if toDelete.User.ID != self.ID {
		return false
	}

	return database.DeleteTripDB(toDelete.Details) &&
		database.DeleteTripFromUserDB(toDelete.Details, self)
}

func SearchTrips(query TripsSearchQuery, self wings.UserBasic) TripObjs {
	tripObjs := toTripObjs(database.SearchTripsDB(query.Cities, query.Length, query.Query))
	var ret TripObjs

	for _, tripObj := range tripObjs {
		if !tripObj.Details.Private ||
			tripObj.User.ID == self.ID ||
			checkTripPrivacy(
				tripObj.Details,
				map[wings.AccessLevel]bool{
					wings.Owner: true, wings.Edit: true, wings.View: true,
				},
				self.ID,
			) {
			ret = append(ret, tripObj)
		}
	}
	return ret
}

func GetLatestTrips() TripObjs {
	return toTripObjs(database.GetRecentTripsDB())
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

func toTripObjs(trips []wings.TripBasic, extras []database.TripExtra) []TripObj {
	tripObjs := make([]TripObj, len(trips))
	for index := range trips {
		tripObjs[index] = toTripObj(trips[index], extras[index])
	}
	return tripObjs
}

func toTripObj(trip wings.TripBasic, extra database.TripExtra) TripObj {
	tripObj := TripObj{}
	tripObj.Details = trip
	tripObj.ID = trip.ID
	if trip.ID != extra.ID {
		logger.Failure(logger.Trip, "TripExtra ID is different from TripBasic ID.")
		return tripObj
	}
	user, _ := database.GetUserBasicDBWithID(extra.UserID)
	tripObj.User = user
	tripObj.LastUpdated = extra.LastUpdated
	tripObj.TimeCreated = extra.TimeCreated
	return tripObj
}
