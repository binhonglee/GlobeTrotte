filegroup(
  name = "cypress_eslint",
  srcs = [".eslintrc.js"],
  visibility = ["//..."],
)

filegroup(
  name = "helper",
  srcs = ["helper.ts"],
  visibility = ["//:vitest_test_deps"],
)

filegroup(
  name = "vitest_helper",
  srcs = ["vitest_setup.ts", "vitestSpy.ts"],
  visibility = ["//:vitest_test_deps"],
)
