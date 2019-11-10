filegroup(
    name = "day",
    srcs = ["Day.ts"],
    needs_transitive_deps = True,
    visibility = [
        "//src/cockpit/...",
        ":day_test",
    ],
    deps = [":place"],
)

filegroup(
    name = "day_test",
    srcs = ["Day.test.ts"],
    needs_transitive_deps = True,
    visibility = [
        "//src/cockpit:unit_tests",
    ],
    deps = [":day"],
)

filegroup(
    name = "new_user",
    srcs = [
        "NewUser.ts",
    ],
    visibility = [
        "//src/cockpit/...",
        ":new_user_test",
    ],
)

filegroup(
    name = "new_user_test",
    srcs = [
        "NewUser.test.ts",
    ],
    test_only = True,
    needs_transitive_deps = True,
    visibility = [
        "//src/cockpit:unit_tests",
    ],
    deps = [":new_user"],
)

filegroup(
    name = "place",
    srcs = [
        "Place.ts",
    ],
    visibility = [
        "//src/cockpit/...",
    ],
)

filegroup(
    name = "place_test",
    srcs = [
        "Place.test.ts",
    ],
    test_only = True,
    needs_transitive_deps = True,
    visibility = [
        "//src/cockpit:unit_tests",
    ],
    deps = [":place"],
)

filegroup(
    name = "trip",
    srcs = [
        "Trip.ts",
    ],
    needs_transitive_deps = True,
    visibility = [
        "//src/cockpit/...",
        ":trip_test",
    ],
    deps = [
        ":day",
        "//src/cockpit/enums:city",
    ]
)

filegroup(
    name = "trip_test",
    srcs = [
        "Trip.test.ts",
    ],
    test_only = True,
    needs_transitive_deps = True,
    visibility = [
        "//src/cockpit:unit_tests",
    ],
    deps = [":trip"],
)

filegroup(
    name = "user",
    srcs = [
        "User.ts",
    ],
    visibility = [
        "//src/cockpit/...",
        ":user_test",
    ],
)

filegroup(
    name = "user_test",
    srcs = [
        "User.test.ts",
    ],
    test_only = True,
    needs_transitive_deps = True,
    visibility = [
        "//src/cockpit:unit_tests",
    ],
    deps = [":user"],
)
