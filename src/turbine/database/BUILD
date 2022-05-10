go_library(
  name = "database",
  srcs = [
    "db.go",
    "helper.go",
    "structsutil.go",
    "emaildb.go",
    "placedb.go",
    "traveltimedb.go",
    "tripdb.go",
    "tripbasicdb.go",
    "userdb.go",
  ],
  deps = [
    "//third_party/go:jackc_pgtype",
    "//third_party/go:jackc_pgx_v4",
    "//third_party/go:google_uuid",
    "//src/turbine/config:config",
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
  data = ["//config:kdl_config"],
  deps = [":database"],
  visibility = ["//src/turbine/..."],
)
