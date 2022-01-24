subinclude("//build_defs/npm:vitest")

vitest_tests(
  name = "vitest_components",
  srcs = glob(["**/*_vitest.test.ts"]),
  vitest_dirs = ["//:vitest_test_deps"],
  deps = [
    "//src/cockpit/tests/mockData",
    "//src/cockpit/components:components",
  ],
)
