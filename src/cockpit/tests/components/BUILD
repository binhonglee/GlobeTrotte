subinclude("//build_defs/pnpm")

ava_tests(
  name = "components",
  srcs = glob(["**/*.spec.ts"]),
  ava_dirs = ["//:ava_test_deps"],
  deps = ["//src/cockpit/tests/mockData"],
  visibility = ["//src/cockpit/scripts:gen_report"],
)
