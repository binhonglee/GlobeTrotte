package router

import (
	"net/http"
	"strconv"

	db "github.com/binhonglee/GlobeTrotte/src/turbine/database"
	email "github.com/binhonglee/GlobeTrotte/src/turbine/email"
	logger "github.com/binhonglee/GlobeTrotte/src/turbine/logger"
	wings "github.com/binhonglee/GlobeTrotte/src/turbine/wings"

	mux "github.com/gorilla/mux"
)

func whoami(
	res http.ResponseWriter, req *http.Request) {
	session, _ := store.Get(req, "logged-in")

	val := "{ \"id\": "

	if auth, ok := session.Values["authenticated"].(bool); !ok || !auth {
		val += "-1"
	} else if id, ok := session.Values["userid"].(int); ok {
		val += strconv.Itoa(id)
	} else {
		val += "-1"
	}
	val += " }"
	respond(res, val)
}

func confirmEmail(res http.ResponseWriter, req *http.Request) {
	var item *email.EmailObj
	unpackJSON(&res, req, &item)
	if item == nil || !verifyUser(req, item.Userid) {
		respond(res, false)
		return
	}

	respond(res, email.ConfirmEmail(*item))
}

func verifyUser(req *http.Request, userID int) bool {
	session, _ := store.Get(req, "logged-in")

	if auth, ok := session.Values["authenticated"].(bool); !ok || !auth {
		return false
	}

	if id, ok := session.Values["userid"].(int); ok {
		return id == userID
	}

	return false
}

func getUserID(req *http.Request) int {
	session, _ := store.Get(req, "logged-in")

	if auth, ok := session.Values["authenticated"].(bool); !ok || !auth {
		return -1
	}

	if id, ok := session.Values["userid"].(int); ok {
		return id
	}

	return -1
}

func getCaller(req *http.Request) wings.UserBasic {
	u, _ := db.GetUserBasicDBWithID(getUserID(req))
	return u
}

func getRequestID(req *http.Request) int {
	vars := mux.Vars(req)
	var id int
	var err error

	if id, err = strconv.Atoi(vars["id"]); err != nil {
		logger.Err(logger.Router, err, "")
		return -1
	}

	return id
}
