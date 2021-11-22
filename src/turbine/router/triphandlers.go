package router

import (
	"net/http"

	"github.com/binhonglee/GlobeTrotte/src/turbine/trip"
	"github.com/binhonglee/GlobeTrotte/src/turbine/wings"
)

func addTripObj(res http.ResponseWriter, req *http.Request) {
	var item wings.TripBasic
	unpackJSON(&res, req, &item)
	if &item == nil {
		respond(res, trip.DummyTripObj())
		return
	}
	respond(res, trip.NewTrip(item, getCaller(req)))
}

func getTripObj(res http.ResponseWriter, req *http.Request) {
	var id int
	if id = getRequestID(req); id == -1 {
		respond(res, trip.DummyTripObj())
		return
	}

	item := trip.GetTripObj(id, getCaller(req))
	respond(res, item)
}

func updateTripObj(res http.ResponseWriter, req *http.Request) {
	var id int
	if id = getRequestID(req); id == -1 {
		respond(res, trip.DummyTripObj())
		return
	}

	var item trip.TripObj
	unpackJSON(&res, req, &item)
	if &item == nil || id != item.ID {
		respond(res, trip.DummyTripObj())
		return
	}

	respond(res, trip.UpdateTripObj(item, getCaller(req)))
}

func deleteTripObj(res http.ResponseWriter, req *http.Request) {
	var id int
	if id = getRequestID(req); id == -1 {
		respond(res, trip.DummyTripObj())
		return
	}

	var item trip.TripObj
	unpackJSON(&res, req, &item)
	if &item == nil || id != item.ID {
		respond(res, false)
		return
	}

	respond(res, trip.DeleteTripObj(item, getCaller(req)))
}

func getRecentTripObjs(res http.ResponseWriter, req *http.Request) {
	respond(res, trip.GetRecentTrips())
}

func searchTripObjs(res http.ResponseWriter, req *http.Request) {
	var item trip.TripsSearchQuery
	unpackJSON(&res, req, &item)
	respond(res, trip.SearchTrips(item, getCaller(req)))
}
