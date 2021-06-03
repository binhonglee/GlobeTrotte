filegroup(
  name = "components",
  srcs = glob(["**/*.vue"]),
  visibility = [
    "//:ava_test_deps",
    "//:jest_test_deps",
    "//src/cockpit:core_files",
    "//src/cockpit/views:views",
    "//src/cockpit/tests/...",
  ],
  deps = [
    "//src/cockpit/wings:wings",
    "//src/cockpit/shared:shared",
  ],
)
