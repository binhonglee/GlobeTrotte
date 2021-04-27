go_library(
  name = "access",
  srcs = [
    "access.go",
    "//src/wings/struct:reset_password",
  ],
  deps = [
    "//src/turbine/database",
    "//src/turbine/email",
    "//src/turbine/logger",
    "//src/turbine/user",
    "//third_party:bcrypt",
    "//third_party:cache",
    "//third_party:uuid",
  ],
  visibility = ["//src/turbine/..."],
)
