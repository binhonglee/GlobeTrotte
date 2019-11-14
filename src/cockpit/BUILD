filegroup(
    name = "core_files",
    srcs = [
        "main.ts",
        "App.vue",
    ],
    visibility = [
        "//:cockpit"
    ]
)

genrule(
    name = "cockpit",
    outs = ["dist"],
    cmd = " && ".join([
        "mv src/cockpit/scripts/src/cockpit/router.ts src/cockpit/",
        "rm -rf src/cockpit/scripts/src",
        "pnpm run build",
    ]),
    output_is_complete = False,
    needs_transitive_deps = True,
    deps = [
        ":core_files",
        "//:index_html",
        "//src/assets:assets",
        "//src/cockpit/scripts:gen_router",
        "//src/cockpit/components:components",
        "//src/cockpit/structs:new_user",
        "//src/cockpit/structs:user",
        "//src/cockpit/structs:trip",
        "//src/cockpit/shared:shared",
        "//src/cockpit/shared:trip_editable",
    ],
)

gentest(
    name = "unit_tests",
    cmd = ' && '.join([
        "top_level=$(pwd | awk -F'plz-out' '{print $1}')",
        "pnpm run cover",
        "cp -R coverage/ $top_level/coverage"
    ]),
    outs = [
        "coverage/"
    ],
    test_cmd = "echo 'Do nothing...'",
    no_test_output = True,
    needs_transitive_deps = True,
    deps = [
        "//:pnpm",
        "//:mocha_config",
        "//src/cockpit/structs:day_test",
        "//src/cockpit/structs:new_user_test",
        "//src/cockpit/structs:place_test",
        "//src/cockpit/structs:trip_test",
        "//src/cockpit/structs:user_test",
        "//src/cockpit/shared:trip_editable_test",
        "//src/cockpit/enums:city_test",
    ],
)
