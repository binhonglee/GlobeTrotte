package router

import (
	"encoding/json"
	"fmt"
	"net/http"
	"regexp"
	"strings"

	db "github.com/binhonglee/GlobeTrotte/src/turbine/database"
	wings "github.com/binhonglee/GlobeTrotte/src/turbine/wings"

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
	addItem(&res, req, db.AddTripDB, item)
}

func getTrip(res http.ResponseWriter, req *http.Request) {
	getItem(&res, req, db.GetTripDB)
}

func updateTrip(res http.ResponseWriter, req *http.Request) {
	var item *wings.Trip
	unpackJSON(&res, req, &item)
	updateItem(&res, req, db.UpdateTripDB, db.GetTripDB, item)
}

func deleteTrip(res http.ResponseWriter, req *http.Request) {
	deleteItem(&res, req, db.GetTripDB, db.DeleteTripDB)
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
	hash, err := bcrypt.GenerateFromPassword([]byte(item.Password), 14)
	if err != nil {
		fmt.Println("Password hashing failed: ", err)
		response(&res, http.StatusNotAcceptable)
		return
	}

	item.Password = string(hash)
	addItem(&res, req, db.NewUserDB, item)
}

func authenticate(req *http.Request) bool {
	session, _ := store.Get(req, "logged-in")

	if auth, ok := session.Values["authenticated"].(bool); !ok || !auth {
		return false
	}

	return true
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

	fmt.Println("Authentication successful for", item.Email)

	session, _ := store.Get(req, "logged-in")
	session.Values["authenticated"] = true
	session.Save(req, res)
	response(&res, http.StatusAccepted)
	json.NewEncoder(res).Encode(db.GetUserWithEmailDB(*item))
}

func logout(res http.ResponseWriter, req *http.Request) {
	session, _ := store.Get(req, "logged-in")

	session.Values["authenticated"] = false
	session.Save(req, res)
}

func getUser(res http.ResponseWriter, req *http.Request) {
	getItem(&res, req, db.GetUserDB)
}

func updateUser(res http.ResponseWriter, req *http.Request) {
	var item *wings.User
	unpackJSON(&res, req, &item)
	updateItem(&res, req, db.UpdateUserDB, db.GetUserDB, item)
}

func deleteUser(res http.ResponseWriter, req *http.Request) {
	deleteItem(&res, req, db.GetUserDB, db.DeleteUserDB)
}
