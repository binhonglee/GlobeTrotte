package router

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"strconv"

	logger "github.com/binhonglee/GlobeTrotte/src/turbine/logger"
	structs "github.com/binhonglee/GlobeTrotte/src/turbine/structs"

	"github.com/gorilla/mux"
)

func passwd(res http.ResponseWriter, req *http.Request) {
	fmt.Fprint(res, "hunter2")
	response(&res, http.StatusOK)
}

func response(res *http.ResponseWriter, status int) {
	(*res).Header().Set(
		"Content-Type", "application/json; charset=UTF-8",
	)
	(*res).WriteHeader(status)
}

func allowCORS(res *http.ResponseWriter) {
	var url = "http://localhost:1234"

	(*res).Header().Set(
		"Access-Control-Allow-Origin", url)
	(*res).Header().Set(
		"Access-Control-Allow-Methods", "POST, GET")
	(*res).Header().Set(
		"Access-Control-Allow-Credentials", "true")
}

func unpackJSON(
	res *http.ResponseWriter,
	req *http.Request,
	objType interface{},
) {
	body, err := ioutil.ReadAll(
		io.LimitReader(req.Body, 1048576),
	)
	logger.Err(logger.Router, err, "")
	logger.Err(logger.Router, req.Body.Close(), "")

	if err := json.Unmarshal(body, objType); err != nil {
		response(res, http.StatusUnprocessableEntity)
		logger.Err(
			logger.Router,
			json.NewEncoder(*res).Encode(err),
			"",
		)
	}
}

func addItem(
	res *http.ResponseWriter,
	req *http.Request,
	addFunc func(structs.IStructs) int,
	item structs.IStructs,
) {
	if newID := addFunc(item); newID != -1 {
		item.SetID(newID)
		allowCORS(res)
		response(res, http.StatusCreated)
		json.NewEncoder(*res).Encode(item)
	} else {
		response(res, http.StatusNotAcceptable)
	}
}

func getItem(
	res *http.ResponseWriter,
	req *http.Request,
	getFunc func(int) structs.IStructs,
) {
	vars := mux.Vars(req)
	var id int
	var err error

	if id, err = strconv.Atoi(vars["id"]); err != nil {
		logger.Err(logger.Router, err, "")
		return
	}
	allowCORS(res)

	item := getFunc(id)
	if item.GetID() > 0 {
		response(res, http.StatusOK)
		json.NewEncoder(*res).Encode(item)
	} else {
		response(res, http.StatusNotFound)
	}
}

func updateItem(
	res *http.ResponseWriter,
	id int,
	updateFunc func(structs.IStructs) bool,
	getFunc func(int) structs.IStructs,
	item structs.IStructs,
) {
	if rItem := getFunc(item.GetID()); rItem.GetID() != id {
		response(res, http.StatusNotFound)
		return
	}

	if updated := updateFunc(item); updated {
		allowCORS(res)
		response(res, http.StatusAccepted)
		json.NewEncoder(*res).Encode(true)
	} else {
		response(res, http.StatusNotAcceptable)
	}
}

func deleteItem(
	res *http.ResponseWriter,
	id int,
	getFunc func(int) structs.IStructs,
	deleteFunc func(structs.IStructs) bool,
) bool {
	inf := getFunc(id)

	return deleteFunc(inf)
}

func setDeletionStatus(
	res *http.ResponseWriter,
	success bool,
) {
	if success {
		response(res, http.StatusOK)
		json.NewEncoder(*res).Encode(true)
	} else {
		response(res, http.StatusNotFound)
		json.NewEncoder(*res).Encode(false)
	}
	allowCORS(res)
}
