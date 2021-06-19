subinclude("//build_defs/wings")
package(default_visibility = ["PUBLIC"])

filegroup(
  name = "struct",
  deps = [
    ":day",
    ":email_obj",
    ":new_user",
    ":place",
    ":trip",
    ":trip_basic",
    ":trip_obj",
    ":user",
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
  name = "trip",
  src = "trip.wings",
  outs = {
    "src/cockpit/wings": "Trip.ts",
    "src/turbine/wings": "trip.go",
  },
  deps = [
    ":day",
    ":user_access_level",
    "//src/wings/enum:city",
  ],
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
    "//src/wings/enum:city",
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
  name = "user",
  src = "user.wings",
  outs = {
    "src/cockpit/wings": "User.ts",
    "src/turbine/wings": "user.go",
  },
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
    ":trip_basic",
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
