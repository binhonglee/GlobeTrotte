filegroup(
    name = "shared",
    srcs = [
        "HTTPReq.ts",
        "lib.scss",
    ],
    visibility = [
        '//src/cockpit:cockpit',
    ],
)

filegroup(
    name = "trip_editable",
    srcs = [
        "TripEditable.ts",
    ],
    visibility = [
        '//src/cockpit:cockpit',
        ":trip_editable_test",
    ],
)

filegroup(
    name = "trip_editable_test",
    srcs = [
        "TripEditable.test.ts",
    ],
    needs_transitive_deps = True,
    visibility = [
        "//src/cockpit:unit_tests",
    ],
    deps = [":trip_editable"],
)
