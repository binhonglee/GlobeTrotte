go_library(
  name = "router",
  srcs = [
    "handlers.go",
    "ratelimit.go",
    "router.go",
    "structhandlers.go",
    "triphandlers.go",
    "userhandlers.go",
    "accesshandlers.go",
    "imagehandlers.go",
  ],
  deps = [
    "//third_party/go:gorilla_mux",
    "//third_party/go:x_crypto",
    "//third_party/go:x_time",
    "//third_party/go:gorilla_sessions",
    "//third_party/go:aws_aws-sdk-go-v2",
    "//third_party/go:aws_aws-sdk-go-v2_config",
    "//third_party/go:aws_aws-sdk-go-v2_service_s3",
    "//src/turbine/access:access",
    "//src/turbine/agent:agent",
    "//src/turbine/config:config",
    "//src/turbine/database:database",
    "//src/turbine/email:email",
    "//src/turbine/flags:flags",
    "//src/turbine/logger:logger",
    "//src/turbine/nonprod:nonprod",
    "//src/turbine/parsing:parsing",
    "//src/turbine/structs:structs",
    "//src/turbine/trip:trip",
    "//src/turbine/user:user",
    "//src/turbine/wings:wings",
  ],
  visibility = ["//src/turbine:main"],
)

go_test(
  name = "router_test",
  srcs = [
    "router_test.go",
    "structrouter_test.go",
  ],
  flaky = 2,
  data = ["//config:kdl_config"],
  deps = [
    ":router",
    # This is to prevent race condition on intializing tables
    "//src/turbine/database:db_test",
    "//src/turbine/structs:structs",
  ],
)
