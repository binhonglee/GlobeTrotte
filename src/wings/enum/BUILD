subinclude("//build_defs/wings")

wings_lib(
  name = "city",
  config = "wings.json",
  srcs = ["city.wings"],
  outs = {
    "src/cockpit/wings": "City.ts",
    "src/turbine/city": "city.go",
  },
  deps = [
    "//:wings_config",
  ],
  visibility = ["PUBLIC"],
)
