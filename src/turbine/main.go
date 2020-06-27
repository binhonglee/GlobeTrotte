package main

import (
	"github.com/binhonglee/GlobeTrotte/src/turbine/router"
	"log"
	"net/http"
)

func main() {
	router := router.NewRouter()
	log.Fatal(http.ListenAndServe(":4000", router))
}
