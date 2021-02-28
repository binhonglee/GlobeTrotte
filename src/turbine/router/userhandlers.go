package router

import (
	"net/http"

	"github.com/binhonglee/GlobeTrotte/src/turbine/user"
	"github.com/binhonglee/GlobeTrotte/src/turbine/wings"
)

func addUserObj(res http.ResponseWriter, req *http.Request) {
	var item wings.NewUser
	unpackJSON(&res, req, &item)
	if &item == nil {
		respond(res, user.DummyUserObj())
		return
	}
	respond(res, user.NewUser(item))
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
