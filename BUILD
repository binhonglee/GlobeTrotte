subinclude("//build_defs/pnpm")

filegroup(
  name = "index_html",
  srcs = ["public/index.html"],
  visibility = [":cockpit"],
)

filegroup(
  name = "pnpm_config",
  srcs = [
    "package.json",
    "pnpm-lock.yaml",
    ".npmrc",
  ],
  visibility = [
    ":cockpit",
    ":pnpm",
  ],
)

filegroup(
  name = "tsconfig",
  srcs = [
    "tsconfig.json",
  ],
  visibility = [
    ":cockpit",
    "//src/cockpit/scripts/..."
  ],
)

filegroup(
  name = "cypress_config",
  srcs = ["cypress.json"],
  visibility = [":cockpit_e2e"],
)

filegroup(
  name = "eslint_config",
  srcs = [".eslintignore", ".eslintrc.js"],
  visibility = [":cockpit"],
)

filegroup(
  name = "wings_config",
  srcs = ["wings.json"],
  visibility = ["//src/wings/..."],
)

filegroup(
  name = "vue_config",
  srcs = ["vue.config.js"],
  visibility = [":cockpit"],
)

pnpm_install(
  name = "pnpm",
  deps = ["//:pnpm_config"],
)

pnpm_build(
  name = "cockpit",
  deps = [
    "//:pnpm",
    "//:eslint_config",
    "//:index_html",
    "//:vue_config",
    "//src/assets:assets",
    "//src/cockpit:core_files",
  ],
)

pnpm_run(
  name = "serve",
  cmd = "serve",
  deps = [":pnpm"],
)

pnpm_test(
  name = "cockpit_unit",
  cmd = "test:unit",
  deps = [
    ":pnpm",
    "//src/cockpit/tests/components:c_edit_item_test",
    "//src/cockpit/tests/components:c_edit_places_test",
    "//src/cockpit/tests/components:c_edit_trip_test",
    "//src/cockpit/tests/components:c_places_test",
    "//src/cockpit/tests/components:c_trip_info_test",
    "//src/cockpit/tests/components:c_view_trip_test",
    "//src/cockpit/tests/shared:city_util_test",
    "//src/cockpit/tests/shared:trip_editable_test",
    "//src/cockpit/tests/wings:day_test",
    "//src/cockpit/tests/wings:new_user_test",
    "//src/cockpit/tests/wings:place_test",
    "//src/cockpit/tests/wings:trip_test",
    "//src/cockpit/tests/wings:user_test",
  ]
)

pnpm_test(
  name = "cockpit_e2e",
  cmd = "test:e2e",
  deps = [
    ":pnpm",
    ":cypress_config",
    "//:eslint_config",
    "//:index_html",
    "//:vue_config",
    "//src/assets:assets",
    "//src/cockpit:core_files",
    "//src/cockpit/tests/e2e",
    "//src/cockpit/tests:e2e_eslint",
  ]
)

gentest(
  name = "lint",
  test_cmd = "echo 'Lint everything~'",
  no_test_output = True,
  deps = [
    ":eslint",
    ":golint",
  ]
)

pnpm_test(
  name = "eslint",
  cmd = "format",
  deps = [
    "//src/wings/struct:day",
    "//src/wings/struct:new_user",
    "//src/wings/struct:place",
    "//src/wings/struct:trip",
    "//src/wings/struct:user",
    "//src/wings/enum:city",
  ],
  visibility = [
    ":lint",
    "//src/cockpit/..."
  ],
)

gentest(
  name = "golint",
  test_cmd = " && ".join([
    "current=$(pwd)",
    "cd $(pwd | awk -F'plz-out' '{print $1}') || exit 1",
    "gofmt -w src/turbine/**/*.go",
  ]),
  no_test_output = True,
  deps = [
    "//src/wings/struct:day",
    "//src/wings/struct:new_user",
    "//src/wings/struct:place",
    "//src/wings/struct:trip",
    "//src/wings/struct:user",
    "//src/wings/enum:city",
  ],
  visibility = [":lint"],
)
