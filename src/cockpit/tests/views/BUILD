subinclude("//build_defs/pnpm")

ava_tests(
  name = "views",
  srcs = glob(["**/*.spec.ts"]),
  ava_dirs = ["//:ava_test_deps"],
  deps = [
    "//src/cockpit/views:views",
    "//src/cockpit/components:components",
  ],
  visibility = ["//src/cockpit/scripts:gen_report"],
)
