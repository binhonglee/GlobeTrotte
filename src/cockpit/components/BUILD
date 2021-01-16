filegroup(
  name = "components",
  srcs = glob(["**/*.vue"]),
  visibility = [
    "//:ava_test_deps",
    "//:cockpit",
    "//src/cockpit/views:views",
    "//src/cockpit/tests/...",
  ],
  deps = [
    "//src/cockpit/wings:wings",
    "//src/cockpit/shared:shared",
  ],
)
