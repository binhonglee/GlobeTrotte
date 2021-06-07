subinclude("//build_defs/wings")

filegroup(
  name = "enum",
  deps = [
    ":city",
    ":access_level",
  ],
  visibility = ["PUBLIC"],
)

wings_lib(
  name = "city",
  src = "city.wings",
  outs = {
    "src/cockpit/wings": "City.ts",
    "src/turbine/wings": "city.go",
  },
  visibility = ["PUBLIC"],
)

wings_lib(
  name = "access_level",
  src = "access_level.wings",
  outs = {
    "src/cockpit/wings": "AccessLevel.ts",
    "src/turbine/wings": "accesslevel.go",
  },
  visibility = ["PUBLIC"],
)
