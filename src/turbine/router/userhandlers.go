package router

import (
	"net/http"

	"golang.org/x/crypto/bcrypt"

	db "github.com/binhonglee/GlobeTrotte/src/turbine/database"
	"github.com/binhonglee/GlobeTrotte/src/turbine/logger"
	"github.com/binhonglee/GlobeTrotte/src/turbine/user"
	"github.com/binhonglee/GlobeTrotte/src/turbine/wings"
)

func addUserObj(res http.ResponseWriter, req *http.Request) {
	var item wings.NewUser
	var ok bool
	unpackJSON(&res, req, &item)
	if &item == nil {
		respond(res, user.DummyUserObj())
		return
	}
	item.Email, ok = handleEmails(item.Email)
	hash, err :=
		bcrypt.GenerateFromPassword([]byte(item.Password), 14)
	if err != nil || !ok {
		logger.Err(
			logger.Router, err,
			"Password hashing failed or wrong email format",
		)
		respond(res, user.DummyUserObj())
		return
	}
	item.Password = string(hash)
	newUser := user.NewUser(item)
	if newUser.ID > 0 {
		newCookie(res, req, newUser.ID)
	}
	respond(res, newUser)
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

func updateUserObj(res http.ResponseWriter, req *http.Request) {
	var id int
	if id = getRequestID(req); id == -1 {
		respond(res, user.DummyUserObj())
		return
	}

	var item wings.UserBasic
	unpackJSON(&res, req, &item)
	if &item == nil || id != item.ID {
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
	if &item == nil || id != item.ID {
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

func loginV2(res http.ResponseWriter, req *http.Request) {
	var item *wings.NewUser
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
		respond(res, dummyUser)
		return
	}

	userid := db.GetUserIDDBWithEmail(item.Email)
	user := user.GetUserObj(userid, userid)
	if user.ID == -1 {
		logger.Err(
			logger.Router,
			err,
			"Failed to find user for "+item.Email,
		)
		respond(res, dummyUser)
		return
	}

	logger.Print(
		logger.Router,
		"V2 authentication successful for "+item.Email,
	)
	newCookie(res, req, user.ID)
	respond(res, user)
}
