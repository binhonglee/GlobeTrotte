package router

import (
	"net/http"

	"github.com/gorilla/mux"
)

// Route - struct for URL routing.
type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

// Routes - Multiple Route in an array.
type Routes []Route

// NewRouter - Just an average router that create routes.
func NewRouter() *mux.Router {
	router := mux.NewRouter()
	for _, route := range routes {
		router.
			Methods(route.Method).
			Path("/api" + route.Pattern).
			Name(route.Name).
			Handler(route.HandlerFunc)
	}
	router.
		PathPrefix("/").
		Handler(http.FileServer(http.Dir("plz-out/gen/dist")))

	return router
}

var routes = Routes{
	Route{
		"Passwd",
		"GET",
		"/passwd",
		passwd,
	},
	Route{
		"AddUser",
		"POST",
		"/user",
		newUser,
	},
	Route{
		"GetUser",
		"GET",
		"/user/{id}",
		getUser,
	},
	Route{
		"DeleteUser",
		"DELETE",
		"/user/{id}",
		deleteUser,
	},
	Route{
		"Login",
		"POST",
		"/login",
		login,
	},
	Route{
		"AddTrip",
		"POST",
		"/trip",
		addTrip,
	},
	Route{
		"UpdateTrip",
		"POST",
		"/trip/{id}",
		updateTrip,
	},
	Route{
		"GetTrip",
		"GET",
		"/trip/{id}",
		getTrip,
	},
	Route{
		"DeleteTrip",
		"DELETE",
		"/trip/{id}",
		deleteTrip,
	},
}
