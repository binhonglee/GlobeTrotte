subinclude("//build_defs/npm:ava")
subinclude("//build_defs/npm:jest")

jest_tests(
  name = "jest_views",
  srcs = glob(["**/*.spec.ts"]),
  jest_dirs = ["//:jest_test_deps"],
  deps = [
    "//src/cockpit/views:views",
    "//src/cockpit/components:components",
  ],
)
