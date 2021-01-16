subinclude("//build_defs/wings")

wings_lib(
  name = "city",
  config = "wings.json",
  src = "city.wings",
  outs = {
    "src/cockpit/wings": "City.ts",
    "src/turbine/wings": "city.go",
  },
  deps = [
    "//:wings_config",
  ],
  visibility = ["PUBLIC"],
)

wings_lib(
  name = "access_level",
  config = "wings.json",
  src = "access_level.wings",
  outs = {
    "src/cockpit/wings": "AccessLevel.ts",
    "src/turbine/wings": "accesslevel.go",
  },
  deps = [
    "//:wings_config",
  ],
  visibility = ["PUBLIC"],
)
