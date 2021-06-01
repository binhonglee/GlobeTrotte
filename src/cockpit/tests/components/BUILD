subinclude("//build_defs/npm")

ava_tests(
  name = "components",
  srcs = glob(["**/*.spec.ts"]),
  ava_dirs = ["//:ava_test_deps"],
  deps = ["//src/cockpit/tests/mockData"],
  vue_components = True,
)
