package router

import (
	"encoding/json"
	"net/http"
	"strconv"

	db "github.com/binhonglee/GlobeTrotte/src/turbine/database"
	email "github.com/binhonglee/GlobeTrotte/src/turbine/email"
	flags "github.com/binhonglee/GlobeTrotte/src/turbine/flags"
	logger "github.com/binhonglee/GlobeTrotte/src/turbine/logger"
	wings "github.com/binhonglee/GlobeTrotte/src/turbine/wings"

	mux "github.com/gorilla/mux"
	sessions "github.com/gorilla/sessions"
	bcrypt "golang.org/x/crypto/bcrypt"
)

var (
	key   = []byte("somethingsomething-magic")
	store = sessions.NewCookieStore(key)
)

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
	dummyUser := db.DummyUser()
	if item == nil {
		response(&res, http.StatusOK)
		json.NewEncoder(res).Encode(dummyUser)
		return
	}

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
	response(&res, http.StatusAccepted)
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

func confirmEmail(res http.ResponseWriter, req *http.Request) {
	var item *email.EmailObj
	unpackJSON(&res, req, &item)
	allowCORS(&res)
	if item == nil || !verifyUser(req, item.Userid) {
		response(&res, http.StatusOK)
		json.NewEncoder(res).Encode(false)
		return
	}

	json.NewEncoder(res).Encode(email.ConfirmEmail(*item))
}

func forceConfirmEmail(res http.ResponseWriter, req *http.Request) {
	if flags.ProdServer() {
		logger.Failure(logger.Router, "Force confirm email attempted on prod.")
		respond(res, false)
		return
	}

	vars := mux.Vars(req)
	var id int
	var err error

	if id, err = strconv.Atoi(vars["id"]); err != nil {
		logger.Err(logger.Router, err, "")
		respond(res, false)
		return
	}

	if verifyUser(req, id) {
		if db.ForceConfirm(id) {
			respond(res, true)
			return
		}
	}

	respond(res, false)
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
	return db.GetUserBasicDBWithID(getUserID(req))
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
