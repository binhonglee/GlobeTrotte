filegroup(
  name = "views",
  srcs = glob(["**/*.vue"]),
  visibility = [
    "//:ava_test_deps",
    "//:jest_test_deps",
    "//:cockpit",
    "//src/cockpit:core_files",
    "//src/cockpit/scripts:gen_router",
    "//src/cockpit/tests/...",
  ],
  deps = [
    "//src/cockpit/wings:wings",
    "//src/cockpit/shared:shared",
    "//src/cockpit/components:components",
  ],
)
