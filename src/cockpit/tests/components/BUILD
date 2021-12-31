subinclude("//build_defs/npm:jest")
subinclude("//build_defs/npm:vitest")

jest_tests(
  name = "jest_components",
  srcs = glob(["**/*.spec.ts"]),
  jest_dirs = ["//:jest_test_deps"],
  deps = [
    "//src/cockpit/tests/mockData",
    "//src/cockpit/components:components",
  ],
)

# vitest_test(
#   name = "CEditDays_vitest",
#   src = "CEditDays_vitest.test.ts",
#   vitest_dirs = ["//:vitest_test_deps"],
#   deps = [
#     "//src/cockpit/tests/mockData",
#     "//src/cockpit/components:components",
#   ],
# )
