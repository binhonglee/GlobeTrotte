package router

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"regexp"
	"strconv"
	"strings"

	flags "github.com/binhonglee/GlobeTrotte/src/turbine/flags"
	logger "github.com/binhonglee/GlobeTrotte/src/turbine/logger"
	structs "github.com/binhonglee/GlobeTrotte/src/turbine/structs"

	"github.com/gorilla/mux"
)

func passwd(res http.ResponseWriter, req *http.Request) {
	fmt.Fprint(res, "hunter2")
	response(&res, http.StatusOK)
}

// DEPRECATED: Do not add new use of this function.
func response(res *http.ResponseWriter, status int) {
	(*res).Header().Set("Content-Type", "application/json; charset=UTF-8")
	(*res).WriteHeader(status)
}

func respond(res http.ResponseWriter, info interface{}) {
	allowCORS(&res)
	(res).Header().Set("Content-Type", "application/json; charset=UTF-8")
	(res).WriteHeader(http.StatusOK)
	json.NewEncoder(res).Encode(info)
}

func allowCORS(res *http.ResponseWriter) {
	if flags.ProdServer() {
		return
	}
	var url = "http://localhost:1234"

	(*res).Header().Set(
		"Access-Control-Allow-Origin", url)
	(*res).Header().Set(
		"Access-Control-Allow-Methods", "POST, GET, OPTIONS")
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
		logger.Err(
			logger.Router,
			err,
			"",
		)
	}
}

func addItem(
	res *http.ResponseWriter,
	req *http.Request,
	addFunc func(structs.IStructs) int,
	item structs.IStructs,
	skipRes bool,
) int {
	if newID := addFunc(item); newID != -1 {
		item.SetID(newID)
		allowCORS(res)
		if !skipRes {
			response(res, http.StatusCreated)
			json.NewEncoder(*res).Encode(item)
		}
		return newID
	} else {
		allowCORS(res)
		if !skipRes {
			response(res, http.StatusNotAcceptable)
		}
		return -1
	}
}

func getItem(
	res *http.ResponseWriter,
	req *http.Request,
	getFunc func(int, int) structs.IStructs,
	v interface{},
) {
	vars := mux.Vars(req)
	var id int
	var err error

	if id, err = strconv.Atoi(vars["id"]); err != nil {
		logger.Err(logger.Router, err, "")
		return
	}
	allowCORS(res)

	item := getFunc(id, getUserID(req))
	if item.GetID() > 0 {
		respond(*res, item)
	} else {
		respond(*res, v)
	}
}

func updateItem(
	res *http.ResponseWriter,
	req *http.Request,
	id int,
	updateFunc func(structs.IStructs) bool,
	getFunc func(int, int) structs.IStructs,
	item structs.IStructs,
) bool {
	if rItem := getFunc(
		item.GetID(),
		getUserID(req),
	); rItem.GetID() != id {
		response(res, http.StatusNotFound)
		return false
	}

	if updated := updateFunc(item); updated {
		allowCORS(res)
		response(res, http.StatusAccepted)
		json.NewEncoder(*res).Encode(true)
		return true
	} else {
		respond(*res, false)
		return false
	}
}

func deleteItem(
	res *http.ResponseWriter,
	req *http.Request,
	id int,
	getFunc func(int, int) structs.IStructs,
	deleteFunc func(structs.IStructs) bool,
) bool {
	inf := getFunc(id, getUserID(req))

	return deleteFunc(inf)
}

func setDeletionStatus(
	res *http.ResponseWriter,
	success bool,
) {
	if success {
		respond(*res, true)
	} else {
		response(res, http.StatusNotFound)
		json.NewEncoder(*res).Encode(false)
	}
	allowCORS(res)
}

func handleEmails(email string) (string, bool) {
	newEmail := strings.ToLower(strings.TrimSpace(email))
	emailPattern := regexp.MustCompile(
		"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
	)
	if !emailPattern.MatchString(newEmail) {
		logger.Print(
			logger.Router,
			newEmail+" is not a valid email address.",
		)
		return newEmail, false
	}
	return newEmail, true
}
