filegroup(
  name = "shared",
  srcs = glob(["**/*.ts"]) + glob(["**/*.scss"]) ,
  visibility = [
    "//:cockpit",
    "//:ava_test_deps",
    "//src/cockpit/components:components",
    "//src/cockpit/tests/...",
    "//src/cockpit/views:views",
  ],
  deps = ["//src/cockpit/wings:wings"]
)
