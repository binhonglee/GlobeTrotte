subinclude("//build_defs/npm:ava")

ava_tests(
  name = "shared",
  srcs = glob(["**/*.spec.ts"]),
  ava_dirs = ["//:ava_test_deps"],
  deps = ["//src/cockpit/shared:shared"],
)
