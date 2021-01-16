subinclude("//build_defs/pnpm")

ava_test(
  name = "components",
  test_srcs = glob(["**/*.spec.ts"]),
  srcs = [
    "//:ava_test_deps",
    "//src/cockpit/tests/mockData",
  ],
  visibility = ["//src/cockpit/scripts:gen_report"],
)
