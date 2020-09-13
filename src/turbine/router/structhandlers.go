package router

import (
	"encoding/json"
	"fmt"
	"net/http"
	"regexp"
	"strconv"
	"strings"

	db "github.com/binhonglee/GlobeTrotte/src/turbine/database"
	wings "github.com/binhonglee/GlobeTrotte/src/turbine/wings"

	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
	"golang.org/x/crypto/bcrypt"
)

var (
	key   = []byte("somethingsomething-magic")
	store = sessions.NewCookieStore(key)
)

// Trip

func addTrip(res http.ResponseWriter, req *http.Request) {
	var item *wings.Trip
	unpackJSON(&res, req, &item)
	if !verifyUser(req, item.UserID) {
		response(&res, http.StatusForbidden)
		return
	}
	addItem(&res, req, db.AddTripDB, item)
}

func getTrip(res http.ResponseWriter, req *http.Request) {
	getItem(&res, req, db.GetTripDB)
}

func updateTrip(res http.ResponseWriter, req *http.Request) {
	var item *wings.Trip
	unpackJSON(&res, req, &item)
	if getRequestID(req) != item.ID || !verifyUser(req, item.UserID) {
		fmt.Println("uhh")
		fmt.Println(item.ID, " ", getRequestID(req))
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
	deleteItem(&res, tripID, db.GetTripDB, db.DeleteTripDB)
}

// User

func newUser(res http.ResponseWriter, req *http.Request) {
	var item *wings.NewUser
	unpackJSON(&res, req, &item)

	emailPattern := regexp.MustCompile(
		"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
	)
	if !emailPattern.MatchString(item.Email) {
		fmt.Println(item.Email, " is not a valid email address.")
		response(&res, http.StatusNotAcceptable)
		return
	}

	item.Name = strings.Split(item.Email, "@")[0]
	hash, err :=
		bcrypt.GenerateFromPassword([]byte(item.Password), 14)
	if err != nil {
		fmt.Println("Password hashing failed: ", err)
		response(&res, http.StatusNotAcceptable)
		return
	}

	item.Password = string(hash)
	addItem(&res, req, db.NewUserDB, item)
}

func authenticate(
	res http.ResponseWriter, req *http.Request) {
	session, _ := store.Get(req, "logged-in")
	allowCORS(&res)

	if auth, ok := session.Values["authenticated"].(bool); !ok || !auth {
		response(&res, http.StatusForbidden)
		return
	}
	response(&res, http.StatusOK)
}

func login(res http.ResponseWriter, req *http.Request) {
	var item *wings.NewUser
	allowCORS(&res)
	unpackJSON(&res, req, &item)

	err := bcrypt.CompareHashAndPassword(
		[]byte(db.GetUserPasswordHashDB(*item)),
		[]byte(item.Password),
	)

	if err != nil {
		fmt.Println("Failed authentication attempt for", item.Email)
		response(&res, http.StatusNotAcceptable)
		return
	}

	user := db.GetUserWithEmailDB(*item)
	fmt.Println("Authentication successful for", item.Email)
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
	allowCORS(&res)

	fmt.Println("Logout successful")
	session.Values["authenticated"] = false
	session.Save(req, res)
}

func getUser(res http.ResponseWriter, req *http.Request) {
	getItem(&res, req, db.GetUserDB)
}

func updateUser(res http.ResponseWriter, req *http.Request) {
	var item *wings.User
	unpackJSON(&res, req, &item)
	if getRequestID(req) != item.ID || !verifyUser(req, item.ID) {
		response(&res, http.StatusForbidden)
		fmt.Println("uhh")
		fmt.Println(item.ID, " ", getRequestID(req))
		return
	}
	updateItem(&res, getRequestID(req), db.UpdateUserDB, db.GetUserDB, item)
}

func deleteUser(res http.ResponseWriter, req *http.Request) {
	if !verifyUser(req, getRequestID(req)) {
		response(&res, http.StatusForbidden)
		return
	}
	deleteItem(&res, getRequestID(req), db.GetUserDB, db.DeleteUserDB)
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
		fmt.Println(error)
		return -1
	}

	return id
}
