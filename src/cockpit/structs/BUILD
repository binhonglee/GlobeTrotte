filegroup(
  name = "day",
  srcs = ["//src/wings/struct:day_#ts"],
  needs_transitive_deps = True,
  visibility = ["//src/cockpit/..."],
  deps = [":place"],
)

filegroup(
  name = "new_user",
  srcs = ["//src/wings/struct:new_user_#ts"],
  visibility = ["//src/cockpit/..."],
)

filegroup(
  name = "place",
  srcs = ["//src/wings/struct:place_#ts"],
  visibility = ["//src/cockpit/..."],
)

filegroup(
  name = "trip",
  srcs = ["//src/wings/struct:trip_#ts"],
  needs_transitive_deps = True,
  visibility = ["//src/cockpit/..."],
  deps = [
    ":day",
    "//src/cockpit/enums:city",
  ]
)

filegroup(
  name = "user",
  srcs = ["//src/wings/struct:user_#ts"],
  visibility = ["//src/cockpit/..."],
)
