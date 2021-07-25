go_library(
  name = "database",
  srcs = [
    "db.go",
    "helper.go",
    "structsutil.go",
    "emaildb.go",
    "tripdb.go",
    "userdb.go",
  ],
  deps = [
    "//third_party/go:lib_pq",
    "//third_party/go:google_uuid",
    "//src/turbine/flags:flags",
    "//src/turbine/logger:logger",
    "//src/turbine/structs:structs",
    "//src/turbine/wings:wings",
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
  deps = [":database"],
  visibility = ["//src/turbine/..."],
)
