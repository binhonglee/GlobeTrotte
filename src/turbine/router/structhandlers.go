package router

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	db "github.com/binhonglee/GlobeTrotte/src/turbine/database"
	logger "github.com/binhonglee/GlobeTrotte/src/turbine/logger"
	wings "github.com/binhonglee/GlobeTrotte/src/turbine/wings"

	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
	"golang.org/x/crypto/bcrypt"
)

var (
	key   = []byte("somethingsomething-magic")
	store = sessions.NewCookieStore(key)
)

func dummyUser() *wings.User {
	user := new(wings.User)
	user.ID = -1
	return user
}

// Trip

func addTrip(res http.ResponseWriter, req *http.Request) {
	var item *wings.Trip
	unpackJSON(&res, req, &item)
	if !verifyUser(req, item.UserID) {
		response(&res, http.StatusForbidden)
		return
	}
	addItem(&res, req, db.AddTripDB, item, false)
}

func getTrip(res http.ResponseWriter, req *http.Request) {
	getItem(&res, req, db.GetTripDB)
}

func updateTrip(res http.ResponseWriter, req *http.Request) {
	var item *wings.Trip
	unpackJSON(&res, req, &item)
	if getRequestID(req) != item.ID || !verifyUser(req, item.UserID) {
		response(&res, http.StatusForbidden)
		return
	}
	updateItem(&res, getRequestID(req), db.UpdateTripDB, db.GetTripDB, item)
}

func deleteTrip(res http.ResponseWriter, req *http.Request) {
	tripID := getRequestID(req)
	trip, _ := db.GetTripDB(tripID).(*wings.Trip)
	if !verifyUser(req, trip.UserID) {
		response(&res, http.StatusForbidden)
		return
	}
	deletion := deleteItem(
		&res, tripID, db.GetTripDB, db.DeleteTripDB,
	)
	setDeletionStatus(&res, deletion)
}

// User

func newUser(res http.ResponseWriter, req *http.Request) {
	var ok bool
	var item *wings.NewUser
	dummyUser := dummyUser()
	unpackJSON(&res, req, &item)
	dummyUser.ID = -1
	dummyUser.Email = item.Email
	item.Email, ok = handleEmails(item.Email)
	if !ok {
		json.NewEncoder(res).Encode(dummyUser)
		response(&res, http.StatusNotAcceptable)
		return
	}
	item.Name = strings.Split(item.Email, "@")[0]
	hash, err :=
		bcrypt.GenerateFromPassword([]byte(item.Password), 14)
	if err != nil {
		logger.Err(logger.Router, err, "Password hashing failed")
		response(&res, http.StatusNotAcceptable)
		json.NewEncoder(res).Encode(dummyUser)
		return
	}

	item.Password = string(hash)
	newID := addItem(&res, req, db.NewUserDB, item, true)
	if newID != -1 {
		user := db.GetUserWithEmailDB(*item)
		newCookie(res, req, user.ID)
		json.NewEncoder(res).Encode(user)
	} else {
		response(&res, http.StatusOK)
		json.NewEncoder(res).Encode(dummyUser)
	}
}

func whoami(
	res http.ResponseWriter, req *http.Request) {
	session, _ := store.Get(req, "logged-in")
	allowCORS(&res)

	val := "{ \"id\": "

	if auth, ok := session.Values["authenticated"].(bool); !ok || !auth {
		val += "-1"
	} else if id, ok := session.Values["userid"].(int); ok {
		val += strconv.Itoa(id)
	} else {
		val += "-1"
	}
	val += " }"
	response(&res, http.StatusOK)
	json.NewEncoder(res).Encode(val)
}

func login(res http.ResponseWriter, req *http.Request) {
	var item *wings.NewUser
	var ok bool
	allowCORS(&res)
	unpackJSON(&res, req, &item)
	dummyUser := dummyUser()

	item.Email, ok = handleEmails(item.Email)
	if !ok {
		response(&res, http.StatusOK)
		json.NewEncoder(res).Encode(dummyUser)
		return
	}

	err := bcrypt.CompareHashAndPassword(
		[]byte(db.GetUserPasswordHashDB(*item)),
		[]byte(item.Password),
	)

	if err != nil {
		logger.Err(
			logger.Router,
			err,
			"Failed authentication attempt for "+item.Email,
		)
		response(&res, http.StatusOK)
		json.NewEncoder(res).Encode(dummyUser)
		return
	}

	user := db.GetUserWithEmailDB(*item)
	logger.Print(
		logger.Router,
		"Authentication successful for "+item.Email,
	)
	newCookie(res, req, user.ID)
	json.NewEncoder(res).Encode(user)
}

func newCookie(
	res http.ResponseWriter,
	req *http.Request,
	userID int,
) {
	session, _ := store.Get(req, "logged-in")
	session.Values["authenticated"] = true
	session.Values["userid"] = userID
	session.Save(req, res)
	response(&res, http.StatusAccepted)
}

func logout(res http.ResponseWriter, req *http.Request) {
	session, _ := store.Get(req, "logged-in")
	id, _ := session.Values["userid"].(int)
	session.Values["authenticated"] = false
	session.Save(req, res)
	logger.Print(
		logger.Router,
		"Session deletion successful for "+strconv.Itoa(id),
	)
	allowCORS(&res)
}

func getUser(res http.ResponseWriter, req *http.Request) {
	getItem(&res, req, db.GetUserDB)
}

func updateUser(res http.ResponseWriter, req *http.Request) {
	var item *wings.User
	unpackJSON(&res, req, &item)
	if getRequestID(req) != item.ID || !verifyUser(req, item.ID) {
		response(&res, http.StatusForbidden)
		return
	}
	updateItem(&res, getRequestID(req), db.UpdateUserDB, db.GetUserDB, item)
}

func deleteUser(res http.ResponseWriter, req *http.Request) {
	if !verifyUser(req, getRequestID(req)) {
		response(&res, http.StatusForbidden)
		json.NewEncoder(res).Encode(false)
		return
	}
	deletion := deleteItem(&res, getRequestID(req), db.GetUserDB, db.DeleteUserDB)
	if deletion {
		logout(res, req)
	}
	setDeletionStatus(&res, deletion)
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

func getRequestID(req *http.Request) int {
	vars := mux.Vars(req)
	var id int
	var error error

	if id, error = strconv.Atoi(vars["id"]); error != nil {
		logger.Err(logger.Router, error, "")
		return -1
	}

	return id
}
