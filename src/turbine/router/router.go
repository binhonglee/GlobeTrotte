package router

import (
	"net/http"

	"github.com/binhonglee/GlobeTrotte/src/turbine/flags"
	"github.com/gorilla/mux"
)

type route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type routes []route

const api_prefix = "/api"

// NewRouter - Just an average router that create routes.
func NewRouter() http.Handler {
	router := mux.NewRouter()
	for _, actualRoute := range actualRoutes {
		router.
			Methods(actualRoute.Method).
			Path(api_prefix + actualRoute.Pattern).
			Name(actualRoute.Name).
			Handler(actualRoute.HandlerFunc)
	}
	router.
		PathPrefix("/").
		Handler(http.FileServer(http.Dir("plz-out/gen/dist")))

	if flags.ProdServer() {
		router.Use(limit)
	}

	return router
}

var actualRoutes = routes{
	route{
		"Passwd",
		"GET",
		"/passwd",
		passwd,
	},
	route{
		"RateLimitStatus",
		"GET",
		"/ratelimit",
		getAPIRateLimitStatus,
	},
	route{
		"AddUserObj",
		"POST",
		"/v2/user",
		addUserObj,
	},
	route{
		"GetUserObjWithUsername",
		"GET",
		"/username/{username}",
		getUserObjWithUsername,
	},
	route{
		"GetUsernameWithID",
		"GET",
		"/v2/username/{id}",
		getUsernameWithID,
	},
	route{
		"GetUserObjWithUsernameV2",
		"GET",
		"/v3/user/{username}",
		getUserObjWithUsername,
	},
	route{
		"GetUserObj",
		"GET",
		"/v2/user/{id}",
		getUserObj,
	},
	route{
		"UpdateUserObj",
		"POST",
		"/v2/user/{id}",
		updateUserObj,
	},
	route{
		"DeleteUserObj",
		"POST",
		"/del/v2/user/{id}",
		deleteUserObj,
	},
	route{
		"Login",
		"POST",
		"/login",
		login,
	},
	route{
		"Logout",
		"GET",
		"/logout",
		logout,
	},
	route{
		"AddTripObj",
		"POST",
		"/v2/trip",
		addTripObj,
	},
	route{
		"UpdateTripObj",
		"POST",
		"/v2/trip/{id}",
		updateTripObj,
	},
	route{
		"GetTripObj",
		"GET",
		"/v2/trip/{id}",
		getTripObj,
	},
	route{
		"DeleteTripObj",
		"POST",
		"/del/v2/trip/{id}",
		deleteTripObj,
	},
	route{
		"SearchTripObjs",
		"POST",
		"/trip/search",
		searchTripObjs,
	},
	route{
		"WhoAmIV2",
		"GET",
		"/v2/whoami",
		whoamiV2,
	},
	route{
		"GetRecentTripObjs",
		"GET",
		"/v2/sample_trips",
		getRecentTripObjs,
	},
	route{
		"SendResetPasswordEmail",
		"POST",
		"/reset/send_email",
		sendResetEmail,
	},
	route{
		"ResetPassword",
		"POST",
		"/reset/password",
		resetPassword,
	},
	route{
		"ConfirmEmail",
		"POST",
		"/confirm/email",
		confirmEmail,
	},
	route{
		"GetSessionUser",
		"GET",
		"/session",
		getSessionUser,
	},
	route{
		"SearchCities",
		"POST",
		"/cities",
		searchCities,
	},
	// PROD: Used for testing only. To remove on prod.
	route{
		"ForceConfirmEmail",
		"GET",
		"/force_confirm_email/{id}",
		forceConfirmEmail,
	},
	route{
		"GetEmailCode",
		"POST",
		"/get_email_code",
		testGetConfirmCode,
	},
}
