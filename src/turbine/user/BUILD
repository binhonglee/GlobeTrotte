go_library(
  name = "user",
  srcs = [
    "user.go",
    "comparators.go",
    "//src/wings/struct:user_obj",
    "//src/wings/struct:registration_response",
  ],
  deps = [
    "//src/turbine/database",
    "//src/turbine/email",
    "//src/turbine/logger",
    "//src/turbine/trip",
    "//src/turbine/wings",
  ],
  visibility = ["//src/turbine/..."],
)

go_test(
  name = "user_test",
  srcs = [
    "user_test.go",
  ],
  data = ["//config:kdl_config"],
  deps = [
    ":user",
    # This is to prevent race condition on intializing tables
    "//src/turbine/database:db_test",
  ],
  visibility = ["//src/turbine/..."],
)
