filegroup(
    name = "city",
    srcs = [
        "City.ts",
        "CityUtil.ts",
    ],
    visibility = [
        '//src/cockpit:cockpit',
        "//src/cockpit/structs:trip",
        ":city_test",
    ],
)

filegroup(
    name = "city_test",
    srcs = [
        "CityUtil.test.ts",
    ],
    test_only = True,
    needs_transitive_deps = True,
    visibility = [
        "//src/cockpit:unit_tests",
    ],
)
