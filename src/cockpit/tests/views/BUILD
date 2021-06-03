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

jest_test(
  name = "v404",
  src = "v404.test.ts",
  jest_dirs = ["//:jest_test_deps"],
  deps = [
    "//src/cockpit/views:views",
    "//src/cockpit/components:components",
  ],
)

jest_test(
  name = "vLanding",
  src = "vLanding.test.ts",
  jest_dirs = ["//:jest_test_deps"],
  deps = [
    "//src/cockpit/views:views",
    "//src/cockpit/components:components",
  ],
)
