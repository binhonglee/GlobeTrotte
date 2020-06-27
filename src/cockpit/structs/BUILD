filegroup(
  name = "day",
  srcs = ["Day.ts"],
  needs_transitive_deps = True,
  visibility = [
    "//src/cockpit/...",
    "//:cockpit",
    ":day_test",
  ],
  deps = [":place"],
)

filegroup(
  name = "new_user",
  srcs = [
    "NewUser.ts",
  ],
  visibility = [
    "//src/cockpit/...",
    "//:cockpit",
    ":new_user_test",
  ],
)

filegroup(
  name = "place",
  srcs = [
    "Place.ts",
  ],
  visibility = [
    "//src/cockpit/...",
    "//:cockpit",
  ],
)

filegroup(
  name = "trip",
  srcs = [
    "Trip.ts",
  ],
  needs_transitive_deps = True,
  visibility = [
    "//src/cockpit/...",
    "//:cockpit",
    ":trip_test",
  ],
  deps = [
    ":day",
    "//src/cockpit/enums:city",
  ]
)

filegroup(
  name = "user",
  srcs = [
    "User.ts",
  ],
  visibility = [
    "//src/cockpit/...",
    "//:cockpit",
    ":user_test",
  ],
)
