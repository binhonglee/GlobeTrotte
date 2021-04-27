package router

import (
	"net/http"

	"github.com/binhonglee/GlobeTrotte/src/turbine/access"
	"github.com/binhonglee/GlobeTrotte/src/turbine/logger"
)

func sendResetEmail(res http.ResponseWriter, req *http.Request) {
	var email string
	var ok bool
	unpackJSON(&res, req, &email)
	if &email == nil {
		respond(res, false)
		return
	}

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
	if &item == nil {
		respond(res, false)
		return
	}

	item.Email, ok = handleEmails(item.Email)
	if !ok {
		logger.Failure(logger.Router, "Invalid email")
		respond(res, false)
		return
	}
	respond(res, access.TriggerResetPassword(item))
}
