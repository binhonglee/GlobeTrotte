subinclude("//build_defs/npm:vitest")

vitest_tests(
  name = "vitest_wings",
  srcs = glob(["**/*_vitest.test.ts"]),
  vitest_dirs = ["//:vitest_test_deps"],
)
