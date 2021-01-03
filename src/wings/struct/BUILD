subinclude("//build_defs/wings")

wings_lib(
  name = "day",
  config = "wings.json",
  srcs = ["day.wings"],
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
  srcs = ["new_user.wings"],
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
  srcs = ["place.wings"],
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
  srcs = ["trip.wings"],
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
  srcs = ["user.wings"],
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
  srcs = ["user_access_level.wings"],
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
  name = "confirm_email",
  config = "wings.json",
  srcs = ["confirm_email.wings"],
  outs = {
    "src/cockpit/wings": "ConfirmEmail.ts",
    "src/turbine/wings": "confirmemail.go",
  },
  deps = [
    "//:wings_config",
  ],
  visibility = ["PUBLIC"],
)
