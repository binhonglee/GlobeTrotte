package main

import (
    "log"
    "net/http"
    "turbine/router"
)

func main() {
    router := router.NewRouter()
    log.Fatal(http.ListenAndServe(":4000", router))
}
