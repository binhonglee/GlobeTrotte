go_library(
  name = "access",
  srcs = [
    "access.go",
    "//src/wings/struct:auth",
    "//src/wings/struct:reset_password",
    "//src/wings/struct:login_credential",
  ],
  deps = [
    "//src/turbine/database",
    "//src/turbine/email",
    "//src/turbine/logger",
    "//src/turbine/user",
    "//third_party/go:x_crypto",
    "//third_party/go:zcache",
    "//third_party/go:google_uuid",
  ],
  visibility = ["//src/turbine/..."],
)
