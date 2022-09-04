package router

import (
	"net/http"
	"strconv"
	"time"

	"github.com/binhonglee/GlobeTrotte/src/turbine/access"
	"github.com/binhonglee/GlobeTrotte/src/turbine/config"
	"github.com/binhonglee/GlobeTrotte/src/turbine/flags"
	"github.com/binhonglee/GlobeTrotte/src/turbine/logger"
	"github.com/binhonglee/GlobeTrotte/src/turbine/nonprod"
	"github.com/binhonglee/GlobeTrotte/src/turbine/user"

	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
)

var store *sessions.CookieStore

func init() {
	key := config.GetConfigStringMap("access")["key"]
	store = sessions.NewCookieStore([]byte(key))
}

func login(res http.ResponseWriter, req *http.Request) {
	var item *access.LoginCredential
	var ok bool
	unpackJSON(&res, req, &item)
	dummyUser := user.DummyUserObj()
	if item == nil {
		respond(res, dummyUser)
		return
	}

	item.Email, ok = handleEmails(item.Email)
	if !ok {
		respond(res, dummyUser)
		return
	}

	user, success := access.Login(*item)
	if success {
		newCookie(res, req, user.ID)
	}

	respond(res, user)
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

func newCookie(
	res http.ResponseWriter,
	req *http.Request,
	userID int,
) {
	session, _ := store.Get(req, "logged-in")
	session.Values["authenticated"] = true
	session.Values["userid"] = userID
	session.Values["startTime"] = time.Now().Unix()
	session.Save(req, res)
}

func sendResetEmail(res http.ResponseWriter, req *http.Request) {
	var email string
	var ok bool
	unpackJSON(&res, req, &email)

	email, ok = handleEmails(email)
	if !ok {
		logger.Failure(logger.Router, "Invalid email")
		respond(res, false)
		return
	}
	respond(res, access.SendPasswordResetEmail(email))
}

func resetPassword(res http.ResponseWriter, req *http.Request) {
	var item access.ResetPassword
	var ok bool
	unpackJSON(&res, req, &item)

	item.Email, ok = handleEmails(item.Email)
	if !ok {
		logger.Failure(logger.Router, "Invalid email")
		respond(res, false)
		return
	}
	respond(res, access.TriggerResetPassword(item))
}

func whoamiV2(
	res http.ResponseWriter, req *http.Request) {
	session, _ := store.Get(req, "logged-in")
	var val int

	if auth, ok := session.Values["authenticated"].(bool); !ok || !auth {
		val = -1
	} else if id, ok := session.Values["userid"].(int); ok {
		refreshSession := true
		if startTime, ok := session.Values["startTime"].(int64); ok {
			if time.Now().Unix()-startTime <= (86400 * 30 / 2) {
				refreshSession = false
			}
		}

		if refreshSession {
			logout(res, req)
			newCookie(res, req, id)
		}
		val = id
	} else {
		val = -1
	}
	respond(res, user.GetUserObj(val, val))
}

func whoamiV3(
	res http.ResponseWriter, req *http.Request) {
	session, _ := store.Get(req, "logged-in")
	var val int

	if auth, ok := session.Values["authenticated"].(bool); !ok || !auth {
		val = -1
	} else if id, ok := session.Values["userid"].(int); ok {
		refreshSession := true
		if startTime, ok := session.Values["startTime"].(int64); ok {
			if time.Now().Unix()-startTime <= (86400 * 30 / 2) {
				refreshSession = false
			}
		}

		if refreshSession {
			logout(res, req)
			newCookie(res, req, id)
		}
		val = id
	} else {
		val = -1
	}
	respond(res, access.GetAuth(val))
}

// Non-prod functions below this line
// -----------------------------------------------------------------------------

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
		if nonprod.ForceConfirm(id) {
			respond(res, true)
			return
		}
	}

	respond(res, false)
}

func testGetConfirmCode(res http.ResponseWriter, req *http.Request) {
	if flags.ProdServer() {
		logger.Failure(logger.Router, "Get confirm email code attempted on prod.")
		respond(res, false)
		return
	}

	var email string
	var ok bool
	unpackJSON(&res, req, &email)

	email, ok = handleEmails(email)
	if !ok {
		logger.Failure(logger.Router, "Invalid email")
		respond(res, false)
		return
	}

	respond(res, nonprod.GetConfirmEmailCode(email, getUserID(req)))
}
