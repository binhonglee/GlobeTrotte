subinclude("//build_defs/wings")
package(default_visibility = ["PUBLIC"])

filegroup(
  name = "struct",
  deps = [
    ":day",
    ":email_obj",
    ":login_credential",
    ":new_user",
    ":place",
    ":registration_response",
    ":trip_basic",
    ":trip_obj",
    ":trip_search_query",
    ":user_access_level",
    ":user_basic",
    ":user_obj",
  ],
)

wings_lib(
  name = "day",
  src = "day.wings",
  outs = {
    "src/cockpit/wings": "Day.ts",
    "src/turbine/wings": "day.go",
  },
  deps = [
    ":place",
    ":travel_time",
  ],
)

wings_lib(
  name = "new_user",
  src = "new_user.wings",
  outs = {
    "src/cockpit/wings": "NewUser.ts",
    "src/turbine/wings": "newuser.go",
  },
)

wings_lib(
  name = "place",
  src = "place.wings",
  outs = {
    "src/cockpit/wings": "Place.ts",
    "src/turbine/wings": "place.go",
  },
)

wings_lib(
  name = "travel_time",
  src = "travel_time.wings",
  outs = {
    "src/cockpit/wings": "TravelTime.ts",
    "src/turbine/wings": "traveltime.go",
  },
)

wings_lib(
  name = "trip_basic",
  src = "trip_basic.wings",
  outs = {
    "src/cockpit/wings": "TripBasic.ts",
    "src/turbine/wings": "tripbasic.go",
  },
  deps = [
    ":day",
    ":user_access_level",
    "//src/wings/struct:parsed_city",
  ],
)

wings_lib(
  name = "trip_obj",
  src = "trip_obj.wings",
  outs = {
    "src/cockpit/wings": "TripObj.ts",
    "src/turbine/trip": "tripobj.go",
  },
  deps = [
    ":user_basic",
    ":trip_basic",
    ":user_access_level",
  ],
)

wings_lib(
  name = "trip_search_query",
  src = "trip_search_query.wings",
  outs = {
    "src/cockpit/wings": "TripSearchQuery.ts",
    "src/turbine/trip": "tripsearchquery.go",
  },
  deps = [
    "//src/wings/enum:city",
  ],
)

wings_lib(
  name = "user_basic",
  src = "user_basic.wings",
  outs = {
    "src/cockpit/wings": "UserBasic.ts",
    "src/turbine/wings": "userbasic.go",
  },
)

wings_lib(
  name = "user_obj",
  src = "user_obj.wings",
  outs = {
    "src/cockpit/wings": "UserObj.ts",
    "src/turbine/user": "userobj.go",
  },
  deps = [
    ":user_basic",
    ":trip_obj",
  ],
)

wings_lib(
  name = "user_access_level",
  src = "user_access_level.wings",
  outs = {
    "src/cockpit/wings": "UserAccessLevel.ts",
    "src/turbine/wings": "useraccesslevel.go",
  },
  deps = [
    "//src/wings/enum:access_level",
  ],
)

wings_lib(
  name = "email_obj",
  src = "email_obj.wings",
  outs = {
    "src/cockpit/wings": "EmailObj.ts",
    "src/turbine/email": "emailobj.go",
  },
)

wings_lib(
  name = "reset_password",
  src = "reset_password.wings",
  outs = {
    "src/cockpit/wings": "ResetPassword.ts",
    "src/turbine/access": "resetpassword.go",
  },
)

wings_lib(
  name = "login_credential",
  src = "login_credential.wings",
  outs = {
    "src/cockpit/wings": "LoginCredential.ts",
    "src/turbine/access": "logincredential.go",
  }
)

wings_lib(
  name = "registration_response",
  src = "registration_response.wings",
  outs = {
    "src/cockpit/wings": "RegistrationResponse.ts",
    "src/turbine/user": "registrationresponse.go",
  },
  deps = [
    ":user_obj",
    "//src/wings/enum:registration_error",
  ],
)

wings_lib(
  name = "parsed_city",
  src = "parsed_city.wings",
  outs = {
    "src/cockpit/wings": "ParsedCity.ts",
    "src/turbine/wings": "parsedcity.go",
  },
)

wings_lib(
  name = "parsed_url_data",
  src = "parsed_url_data.wings",
  outs = {
    "src/cockpit/wings": "ParsedURLData.ts",
    "src/turbine/parsing": "parsedurldata.go",
  },
  deps = [
    "//src/wings/enum:parsed_url_error",
  ],
)

wings_lib(
  name = "auth",
  src = "auth.wings",
  outs = {
    "src/cockpit/wings": "Auth.ts",
    "src/turbine/access": "auth.go",
  },
)
