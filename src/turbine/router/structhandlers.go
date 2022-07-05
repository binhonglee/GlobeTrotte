package router

import (
	"net/http"
	"strconv"

	db "github.com/binhonglee/GlobeTrotte/src/turbine/database"
	email "github.com/binhonglee/GlobeTrotte/src/turbine/email"
	logger "github.com/binhonglee/GlobeTrotte/src/turbine/logger"
	"github.com/binhonglee/GlobeTrotte/src/turbine/user"
	wings "github.com/binhonglee/GlobeTrotte/src/turbine/wings"

	mux "github.com/gorilla/mux"
)

func getSessionUser(
	res http.ResponseWriter, req *http.Request) {
	session, _ := store.Get(req, "logged-in")

	var currentUser user.UserObj
	if auth, ok := session.Values["authenticated"].(bool); !ok || !auth {
		currentUser = user.DummyUserObj()
	} else if id, ok := session.Values["userid"].(int); ok {
		currentUser = user.GetUserObj(id, id)
	} else {
		currentUser = user.DummyUserObj()
	}

	respond(res, currentUser)
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

func searchCities(res http.ResponseWriter, req *http.Request) {
	var searchTerm string
	unpackJSON(&res, req, &searchTerm)
	respond(res, db.GetCitiesDB(searchTerm))
}
