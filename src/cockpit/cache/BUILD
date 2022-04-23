filegroup(
  name = "cache",
  srcs = glob(["**/*.ts"]) ,
  visibility = [
    "//:vitest_test_deps",
    "//src/cockpit:core_files",
    "//src/cockpit/views:views",
  ],
  deps = ["//src/cockpit/wings:wings"]
)
