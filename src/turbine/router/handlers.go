package router

import (
	"encoding/json"
	"io"
	"net/http"
	"regexp"
	"strings"

	flags "github.com/binhonglee/GlobeTrotte/src/turbine/flags"
	logger "github.com/binhonglee/GlobeTrotte/src/turbine/logger"
)

func passwd(res http.ResponseWriter, req *http.Request) {
	respond(res, "hunter2")
}

func respond(res http.ResponseWriter, info interface{}) {
	allowCORS(&res)
	(res).Header().Set("Content-Type", "application/json; charset=UTF-8")
	(res).WriteHeader(http.StatusOK)
	json.NewEncoder(res).Encode(info)
}

func allowCORS(res *http.ResponseWriter) {
	if flags.ProdServer() {
		return
	}
	var url = "http://localhost:3000"

	(*res).Header().Set(
		"Access-Control-Allow-Origin", url)
	(*res).Header().Set(
		"Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	(*res).Header().Set(
		"Access-Control-Allow-Credentials", "true")
}

func unpackJSON(
	_ *http.ResponseWriter,
	req *http.Request,
	objType interface{},
) {
	body, err := io.ReadAll(
		io.LimitReader(req.Body, 1048576),
	)
	logger.Err(logger.Router, err, "")
	logger.Err(logger.Router, req.Body.Close(), "")

	if err := json.Unmarshal(body, objType); err != nil {
		logger.Err(
			logger.Router,
			err,
			"",
		)
	}
}

func handleEmails(email string) (string, bool) {
	newEmail := strings.ToLower(strings.TrimSpace(email))
	emailPattern := regexp.MustCompile(
		"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$",
	)
	if !emailPattern.MatchString(newEmail) {
		logger.Print(
			logger.Router,
			newEmail+" is not a valid email address.",
		)
		return newEmail, false
	}
	return newEmail, true
}
