go_library(
  name = "email",
  srcs = [
    "email.go",
    "//src/wings/struct:_email_obj#go",
  ],
  deps = [
    "//third_party/go:jordan-wright_email",
    "//src/turbine/database:database",
    "//src/turbine/wings:wings",
    "//src/turbine/logger:logger",
  ],
  visibility = ["//src/turbine/..."],
)
