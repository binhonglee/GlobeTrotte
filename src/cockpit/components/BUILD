filegroup(
  name = "components",
  srcs = glob(["**/*.vue"]),
  visibility = [
    "//:cockpit",
    "//src/cockpit/tests/...",
    "//src/cockpit/views:views",
  ],
  deps = [
    "//src/cockpit/wings:wings",
    "//src/cockpit/shared:shared",
  ],
)
