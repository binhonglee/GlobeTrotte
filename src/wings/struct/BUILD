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
  config = "wings.json",
  src = "day.wings",
  outs = {
    "src/cockpit/wings": "Day.ts",
    "src/turbine/wings": "day.go",
  },
  deps = [
    "//:wings_config",
    ":place",
  ],
)

wings_lib(
  name = "new_user",
  config = "wings.json",
  src = "new_user.wings",
  outs = {
    "src/cockpit/wings": "NewUser.ts",
    "src/turbine/wings": "newuser.go",
  },
  deps = [
    "//:wings_config",
  ],
)

wings_lib(
  name = "place",
  config = "wings.json",
  src = "place.wings",
  outs = {
    "src/cockpit/wings": "Place.ts",
    "src/turbine/wings": "place.go",
  },
  deps = [
    "//:wings_config",
  ],
)

wings_lib(
  name = "trip",
  config = "wings.json",
  src = "trip.wings",
  outs = {
    "src/cockpit/wings": "Trip.ts",
    "src/turbine/wings": "trip.go",
  },
  deps = [
    "//:wings_config",
    ":day",
    ":user_access_level",
    "//src/wings/enum:city",
  ],
)

wings_lib(
  name = "trip_basic",
  config = "wings.json",
  src = "trip_basic.wings",
  outs = {
    "src/cockpit/wings": "TripBasic.ts",
    "src/turbine/wings": "tripbasic.go",
  },
  deps = [
    "//:wings_config",
    ":day",
    ":user_access_level",
    "//src/wings/enum:city",
  ],
)

wings_lib(
  name = "trip_obj",
  config = "wings.json",
  src = "trip_obj.wings",
  outs = {
    "src/cockpit/wings": "TripObj.ts",
    "src/turbine/trip": "tripobj.go",
  },
  deps = [
    "//:wings_config",
    ":user_basic",
    ":trip_basic",
    ":user_access_level",
  ],
)

wings_lib(
  name = "user",
  config = "wings.json",
  src = "user.wings",
  outs = {
    "src/cockpit/wings": "User.ts",
    "src/turbine/wings": "user.go",
  },
  deps = [
    "//:wings_config",
  ],
)

wings_lib(
  name = "user_basic",
  config = "wings.json",
  src = "user_basic.wings",
  outs = {
    "src/cockpit/wings": "UserBasic.ts",
    "src/turbine/wings": "userbasic.go",
  },
  deps = ["//:wings_config"],
)

wings_lib(
  name = "user_obj",
  config = "wings.json",
  src = "user_obj.wings",
  outs = {
    "src/cockpit/wings": "UserObj.ts",
    "src/turbine/user": "userobj.go",
  },
  deps = [
    "//:wings_config",
    ":user_basic",
    ":trip_basic",
  ],
)

wings_lib(
  name = "user_access_level",
  config = "wings.json",
  src = "user_access_level.wings",
  outs = {
    "src/cockpit/wings": "UserAccessLevel.ts",
    "src/turbine/wings": "useraccesslevel.go",
  },
  deps = [
    "//:wings_config",
    "//src/wings/enum:access_level",
  ],
)

wings_lib(
  name = "email_obj",
  config = "wings.json",
  src = "email_obj.wings",
  outs = {
    "src/cockpit/wings": "EmailObj.ts",
    "src/turbine/email": "emailobj.go",
  },
  deps = [
    "//:wings_config",
  ],
)
