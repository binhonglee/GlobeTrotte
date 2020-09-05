package main

import (
	"log"
	"net/http"

	"github.com/binhonglee/GlobeTrotte/src/turbine/logger"
	"github.com/binhonglee/GlobeTrotte/src/turbine/router"
)

func main() {
	router := router.NewRouter()
	logger.Print(logger.Main, "Starting server...")
	log.Fatal(http.ListenAndServe(":4000", router))
}
