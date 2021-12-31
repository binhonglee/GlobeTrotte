subinclude("//build_defs/npm:ava")

ava_tests(
  name = "shared",
  srcs = glob(["**/*_ava.test.ts"]),
  ava_dirs = ["//:ava_test_deps"],
  deps = ["//src/cockpit/shared:shared"],
)
