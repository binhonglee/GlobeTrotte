filegroup(
  name = "components",
  srcs = glob(["**/*.ts"]) + ["_setup.js"],
  visibility = ["//:cockpit_ava"],
  deps = [
    "//src/cockpit/tests/mockData:mockData",
    "//src/cockpit/shared:shared",
    "//src/cockpit/components:components",
  ]
)
