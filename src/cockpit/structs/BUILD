filegroup(
  name = "day",
  srcs = ["Day.ts"],
  needs_transitive_deps = True,
  visibility = ["//src/cockpit/..."],
  deps = [":place"],
)

filegroup(
  name = "new_user",
  srcs = ["NewUser.ts"],
  visibility = ["//src/cockpit/..."],
)

filegroup(
  name = "place",
  srcs = [
    "Place.ts",
  ],
  visibility = ["//src/cockpit/..."],
)

filegroup(
  name = "trip",
  srcs = ["Trip.ts"],
  needs_transitive_deps = True,
  visibility = ["//src/cockpit/..."],
  deps = [
    ":day",
    "//src/cockpit/enums:city",
  ]
)

filegroup(
  name = "user",
  srcs = ["User.ts"],
  visibility = ["//src/cockpit/..."],
)
