package router

import (
	"net/http"
	"strconv"

	"github.com/binhonglee/GlobeTrotte/src/turbine/database"
	"github.com/binhonglee/GlobeTrotte/src/turbine/logger"
	"github.com/binhonglee/GlobeTrotte/src/turbine/trip"
	"github.com/binhonglee/GlobeTrotte/src/turbine/wings"
	"github.com/gorilla/mux"
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
	vars := mux.Vars(req)
	var id int
	var err error

	if id, err = strconv.Atoi(vars["id"]); err != nil {
		logger.Err(logger.Router, err, "")
		return
	}

	item := trip.GetTripObj(id, getCaller(req))
	respond(res, item)
}

func updateTripObj(res http.ResponseWriter, req *http.Request) {
	vars := mux.Vars(req)
	var id int
	var err error

	if id, err = strconv.Atoi(vars["id"]); err != nil {
		logger.Err(logger.Router, err, "")
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
	vars := mux.Vars(req)
	var id int
	var err error

	if id, err = strconv.Atoi(vars["id"]); err != nil {
		logger.Err(logger.Router, err, "")
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

func getCaller(req *http.Request) wings.UserBasic {
	return database.GetUserBasicDBWithID(getUserID(req))
}
