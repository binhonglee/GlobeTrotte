subinclude("//build_defs/pnpm")

ava_test(
  name = "wings",
  test_srcs = glob(["**/*.spec.ts"]),
  srcs = ["//:ava_test_deps"],
  visibility = ["//src/cockpit/scripts:gen_report"],
)
