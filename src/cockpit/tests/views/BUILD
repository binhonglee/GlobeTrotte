subinclude("//build_defs/npm:ava")
subinclude("//build_defs/npm:jest")

ava_tests(
  name = "views",
  srcs = glob(["**/*.spec.ts"]),
  ava_dirs = ["//:ava_test_deps"],
  deps = [
    "//src/cockpit/views:views",
    "//src/cockpit/components:components",
  ],
  vue_components = True,
)

jest_tests(
  name = "jest_views",
  srcs = glob(["**/*.test.ts"]),
  jest_dirs = ["//:jest_test_deps"],
  deps = [
    "//src/cockpit/views:views",
    "//src/cockpit/components:components",
  ],
)
