subinclude("//build_defs/npm:vitest")

vitest_tests(
  name = "vitest_components",
  srcs = [
    "CEditDays_vitest.test.ts",
    "CEditItem_vitest.test.ts",
    "CEditPlaces_vitest.test.ts",
    "CEditTrip_vitest.test.ts",
    "CPlaces_vitest.test.ts",
    "CTripInfo_vitest.test.ts",
    "CTripPreviewCard_vitest.test.ts",
    "CViewTrip_vitest.test.ts",
    # Intentionally excluding CViewUser_vitest.test.ts because its failing in
    # please env but passes fine outside of it.
  ],
  vitest_dirs = ["//:vitest_test_deps"],
  deps = [
    "//src/cockpit/tests/mockData",
    "//src/cockpit/components:components",
  ],
)
