subinclude("//build_defs/npm:vitest")

vitest_tests(
  name = "vitest_views",
  srcs = glob(["**/*_vitest.test.ts"]),
  config = "//src/cockpit/configs:vitest_plz",
  root = "src/cockpit",
  vitest_dirs = [
    ":vitest_snapshots",
    "//src/cockpit:vitest_test_deps",
  ],
  deps = [
    "//src/cockpit/views:views",
    "//src/cockpit/components:components",
  ]
)

vitest_dir(
  name = "vitest_snapshots",
  srcs = glob(["**/__snapshots__/*_vitest.test.ts.snap"]),
)
