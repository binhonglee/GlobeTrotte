subinclude("//build_defs/npm:vitest")

vitest_tests(
  name = "shared",
  srcs = glob(["**/*_vitest.test.ts"]),
  config = "//src/cockpit/configs:vitest_plz",
  root = "src/cockpit",
  vitest_dirs = ["//src/cockpit:vitest_test_deps"],
  deps = ["//src/cockpit/shared:shared"],
)
