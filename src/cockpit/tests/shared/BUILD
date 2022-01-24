subinclude("//build_defs/npm:vitest")

vitest_tests(
  name = "shared",
  srcs = glob(["**/*_vitest.test.ts"]),
  vitest_dirs = ["//:vitest_test_deps"],
  deps = ["//src/cockpit/shared:shared"],
)
