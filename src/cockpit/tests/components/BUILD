subinclude("//build_defs/npm:ava")
subinclude("//build_defs/npm:jest")
subinclude("//build_defs/npm:vitest")

ava_tests(
  name = "components",
  srcs = glob(["**/*.spec.ts"]),
  ava_dirs = ["//:ava_test_deps"],
  deps = ["//src/cockpit/tests/mockData"],
  vue_components = True,
)

jest_test(
  name = "CTripInfo",
  src = "CTripInfo.test.ts",
  jest_dirs = ["//:jest_test_deps"],
  deps = [
    "//src/cockpit/tests/mockData",
    "//src/cockpit/components:components",
  ],
)

jest_test(
  name = "CEditItem",
  src = "CEditItem.test.ts",
  jest_dirs = ["//:jest_test_deps"],
  deps = [
    "//src/cockpit/tests/mockData",
    "//src/cockpit/components:components",
  ],
)

jest_test(
  name = "CEditTrip",
  src = "CEditTrip.test.ts",
  jest_dirs = ["//:jest_test_deps"],
  deps = [
    "//src/cockpit/tests/mockData",
    "//src/cockpit/components:components",
  ],
)

vitest_test(
  name = "CEditDays_vitest",
  src = "CEditDays_vitest.test.ts",
  vitest_dirs = ["//:vitest_test_deps"],
  deps = [
    "//src/cockpit/tests/mockData",
    "//src/cockpit/components:components",
  ],
)
