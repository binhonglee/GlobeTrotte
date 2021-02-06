subinclude("//build_defs/pnpm")

ava_tests(
  name = "wings",
  srcs = glob(["**/*.spec.ts"]),
  ava_dirs = ["//:ava_test_deps"],
  visibility = ["//src/cockpit/scripts:gen_report"],
)
