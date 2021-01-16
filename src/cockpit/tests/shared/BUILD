subinclude("//build_defs/pnpm")

ava_test(
  name = "shared",
  test_srcs = glob(["**/*.spec.ts"]),
  srcs = [
    "//:ava_test_deps",
    "//src/cockpit/shared:shared",
  ],
  visibility = ["//src/cockpit/scripts:gen_report"],
)
