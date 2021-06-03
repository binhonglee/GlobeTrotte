subinclude("//build_defs/npm:ava")
subinclude("//build_defs/npm:jest")

ava_tests(
  name = "components",
  srcs = glob(["**/*.spec.ts"]),
  ava_dirs = ["//:ava_test_deps"],
  deps = ["//src/cockpit/tests/mockData"],
  vue_components = True,
)

jest_test(
  name = "CTripInfo",
  src = "CTripInfo.test.ts",
  jest_dirs = ["//:jest_test_deps"],
  deps = [
    "//src/cockpit/tests/mockData",
    "//src/cockpit/components:components",
  ],
)
