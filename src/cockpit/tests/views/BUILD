subinclude("//build_defs/pnpm")

ava_test(
  name = "views",
  test_srcs = glob(["**/*.spec.ts"]),
  srcs = [
    "//:ava_test_deps",
    "//src/cockpit/views:views",
    "//src/cockpit/components:components",
  ],
  visibility = ["//src/cockpit/scripts:gen_report"],
)
