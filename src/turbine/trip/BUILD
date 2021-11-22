go_library(
  name = "trip",
  srcs = [
    "trip.go",
    "comparators.go",
    "//src/wings/struct:trip_obj",
    "//src/wings/struct:trip_search_query",
  ],
  deps = [
    "//src/turbine/database",
    "//src/turbine/logger",
    "//src/turbine/wings",
  ],
  visibility = ["//src/turbine/..."],
)

go_test(
  name = "trip_test",
  srcs = [
    "trip_test.go",
  ],
  data = ["//config:kdl_config"],
  deps = [
    ":trip",
    # This is to prevent race condition on intializing tables
    "//src/turbine/database:db_test",
  ],
  visibility = ["//src/turbine/..."],
)
