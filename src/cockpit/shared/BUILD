filegroup(
  name = "shared",
  srcs = glob(["**/*.ts"]) + glob(["**/*.scss"]) ,
  visibility = [
    "//:ava_test_deps",
    "//:jest_test_deps",
    "//src/cockpit:core_files",
    "//src/cockpit/tests/...",
    "//src/cockpit/views:views",
    "//src/cockpit/components:components",
  ],
  deps = ["//src/cockpit/wings:wings"]
)
