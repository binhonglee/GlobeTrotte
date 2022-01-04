filegroup(
  name = "cypress_eslint",
  srcs = [".eslintrc.js"],
  visibility = ["//..."],
)

filegroup(
  name = "helper",
  srcs = ["helper.ts"],
  visibility = ["//:ava_test_deps", "//:jest_test_deps"]
)

filegroup(
  name = "ava_setup",
  srcs = ["_setup.js"],
  visibility = ["//:ava_test_deps"],
)

filegroup(
  name = "jest_snapshot_resolver",
  srcs = ["snapshotResolver.js"],
  visibility = ["//:jest_test_deps"],
)

filegroup(
  name = "jest_snapshots",
  srcs = glob(["__snapshots__/**/*.snap"]),
  visibility = ["//:jest_test_deps"],
)
