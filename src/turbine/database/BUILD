go_library(
  name = "database",
  srcs = [
    "db.go",
    "helper.go",
    "structsutil.go",
    "tripdb.go",
    "userdb.go",
  ],
  deps = [
    "//third_party:pq",
    "//src/turbine/wings:wings",
    "//src/turbine/structs:structs",
    "//src/turbine/logger:logger",
  ],
  visibility = ["//src/turbine/..."],
)

go_test(
  name = "db_test",
  srcs = [
    "db_test.go",
    "dbinteraction_test.go",
  ],
  flaky = 2,
  data = ["//config:psql.config"],
  deps = [
    ":database",
  ],
  visibility = ["//src/turbine/..."],
)
