go_library(
  name = "router",
  srcs = [
    "handlers.go",
    "ratelimit.go",
    "router.go",
    "structhandlers.go",
  ],
  deps = [
    "//third_party:mux",
    "//third_party:bcrypt",
    "//third_party:rate",
    "//third_party:sessions",
    "//src/turbine/database:database",
    "//src/turbine/email:email",
    "//src/turbine/logger:logger",
    "//src/turbine/structs:structs",
    "//src/turbine/wings:wings",
  ],
  visibility = ["//src/..."],
)

go_test(
  name = "router_test",
  srcs = [
    "router_test.go",
    "structrouter_test.go",
  ],
  flaky = 2,
  data = ["//config:psql.config"],
  deps = [
    ":router",
    # This is to prevent race condition on intializing tables
    "//src/turbine/database:db_test",
    "//src/turbine/structs:structs",
  ],
)
