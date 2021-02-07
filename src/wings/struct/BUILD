subinclude("//build_defs/wings")

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
  visibility = ["PUBLIC"],
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
  visibility = ["PUBLIC"],
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
  visibility = ["PUBLIC"],
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
  visibility = ["PUBLIC"],
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
  visibility = ["PUBLIC"],
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
  visibility = ["PUBLIC"],
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
  visibility = ["PUBLIC"],
)
