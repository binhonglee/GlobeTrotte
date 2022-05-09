package router

import (
	"net/http"

	"golang.org/x/crypto/bcrypt"

	"github.com/binhonglee/GlobeTrotte/src/turbine/logger"
	"github.com/binhonglee/GlobeTrotte/src/turbine/user"
	"github.com/binhonglee/GlobeTrotte/src/turbine/wings"
	"github.com/gorilla/mux"
)

func addUserObj(res http.ResponseWriter, req *http.Request) {
	var item wings.NewUser
	var ok bool
	unpackJSON(&res, req, &item)

	item.Email, ok = handleEmails(item.Email)
	if !ok {
		respond(res, user.RegistrationResponse{
			User:  user.DummyUserObj(),
			Error: wings.EmailInvalid,
		})
		return
	}

	hash, err :=
		bcrypt.GenerateFromPassword([]byte(item.Password), 14)
	if err != nil {
		logger.Err(
			logger.Router, err,
			"Password hashing failed or wrong email format",
		)
		respond(res, user.DummyUserObj())
		return
	}

	item.Password = string(hash)
	newUser := user.NewUser(item)
	if newUser.User.ID > 0 {
		newCookie(res, req, newUser.User.ID)
	}
	respond(res, newUser)
}

func getUserObjWithUsername(res http.ResponseWriter, req *http.Request) {
	vars := mux.Vars(req)
	username := vars["username"]
	if username == "" {
		logger.Failure(logger.Router, "Missing username argument")
		respond(res, user.DummyUserObj())
		return
	}

	item := user.GetUserObjWithUsername(username, getUserID(req))
	respond(res, item)
}

func getUserObj(res http.ResponseWriter, req *http.Request) {
	var id int
	if id = getRequestID(req); id == -1 {
		respond(res, user.DummyUserObj())
		return
	}

	item := user.GetUserObj(id, getUserID(req))
	respond(res, item)
}

func getUsernameWithID(res http.ResponseWriter, req *http.Request) {
	var id int
	if id = getRequestID(req); id == -1 {
		respond(res, "")
		return
	}

	respond(res, user.GetUsernameWithID(id))
}

func updateUserObj(res http.ResponseWriter, req *http.Request) {
	var id int
	if id = getRequestID(req); id == -1 {
		respond(res, user.DummyUserObj())
		return
	}

	var item wings.UserBasic
	unpackJSON(&res, req, &item)
	if id != item.ID {
		respond(res, user.DummyUserObj())
		return
	}

	respond(res, user.UpdateUserObj(item, getUserID(req)))
}

func deleteUserObj(res http.ResponseWriter, req *http.Request) {
	var id int
	if id = getRequestID(req); id == -1 {
		respond(res, user.DummyUserObj())
		return
	}

	var item wings.UserBasic
	unpackJSON(&res, req, &item)
	if id != item.ID {
		respond(res, false)
		return
	}

	respond(res, user.DeleteUserObj(item, getUserID(req)))
}

func whoamiV2(
	res http.ResponseWriter, req *http.Request) {
	session, _ := store.Get(req, "logged-in")
	var val int

	if auth, ok := session.Values["authenticated"].(bool); !ok || !auth {
		val = -1
	} else if id, ok := session.Values["userid"].(int); ok {
		val = id
	} else {
		val = -1
	}
	respond(res, user.GetUserObj(val, val))
}
