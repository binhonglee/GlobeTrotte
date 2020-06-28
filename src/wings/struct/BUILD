subinclude("//build_defs/wings")

wings_lib(
  name = "day",
  config = "wings.json",
  srcs = ["day.wings"],
  outs = [
    "src/cockpit/structs/Day.ts",
    "src/turbine/structs/day.go",
  ],
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
  outs = [
    "src/cockpit/structs/NewUser.ts",
    "src/turbine/structs/newuser.go",
  ],
  deps = [
    "//:wings_config",
  ],
  visibility = ["PUBLIC"],
)

wings_lib(
  name = "place",
  config = "wings.json",
  srcs = ["place.wings"],
  outs = [
    "src/cockpit/structs/Place.ts",
    "src/turbine/structs/place.go",
  ],
  deps = [
    "//:wings_config",
  ],
  visibility = ["PUBLIC"],
)

wings_lib(
  name = "trip",
  config = "wings.json",
  srcs = ["trip.wings"],
  outs = [
    "src/cockpit/structs/Trip.ts",
    "src/turbine/structs/trip.go",
  ],
  deps = [
    "//:wings_config",
    ":day",
    "//src/wings/enum:city"
  ],
  visibility = ["PUBLIC"],
)

wings_lib(
  name = "user",
  config = "wings.json",
  srcs = ["user.wings"],
  outs = [
    "src/cockpit/structs/User.ts",
    "src/turbine/structs/user.go",
  ],
  deps = [
    "//:wings_config",
  ],
  visibility = ["PUBLIC"],
)
