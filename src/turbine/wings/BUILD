subinclude("//build_defs/wings")

wings_filegroup(
  name = "wings_files",
  srcs = [
    "//src/wings/enum:_city#go",
    "//src/wings/enum:_access_level#go",
    "//src/wings/enum:_registration_error#go",
    "//src/wings/struct:_day#go",
    "//src/wings/struct:_travel_time#go",
    "//src/wings/struct:_place#go",
    "//src/wings/struct:_parsed_city#go",
    "//src/wings/struct:_new_user#go",
    "//src/wings/struct:_user_access_level#go",
    "//src/wings/struct:_trip_basic#go",
    "//src/wings/struct:_user_basic#go",
  ],
  filetype = "go",
  outs = [
    "city.go",
    "accesslevel.go",
    "registrationerror.go",
    "day.go",
    "traveltime.go",
    "place.go",
    "parsedcity.go",
    "newuser.go",
    "useraccesslevel.go",
    "tripbasic.go",
    "userbasic.go",
  ]
)

go_library(
  name = "wings",
  srcs = [":wings_files"],
  visibility = ["//src/turbine/..."],
)
