package main

import (
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/binhonglee/GlobeTrotte/src/turbine/logger"
	"github.com/binhonglee/GlobeTrotte/src/turbine/router"
)

const port = "4000"

func main() {
	sigs := make(chan os.Signal, 1)
	signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)
	logger.FromMain()

	go func() {
		<-sigs
		cleanup()
	}()

	r := router.NewRouter()
	logger.Print(logger.Main, "Listening on port "+port+"...")
	logger.PanicErr(
		logger.Main,
		http.ListenAndServe("127.0.0.1:"+port, r),
		"Server failed",
	)
}

func cleanup() {
	logger.NewLine()
	logger.Exit(logger.Main, "Exit signal received!")
	logger.Cleanup()
	os.Exit(0)
}
