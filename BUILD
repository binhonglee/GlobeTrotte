subinclude("//build_defs/pnpm")

filegroup(
  name = "index_html",
  srcs = ["public/index.html"],
  visibility = [":cockpit", ":serve"],
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
  name = "prettier",
  srcs = [
    ".prettierrc"
  ],
  visibility = [":cockpit", ":serve"],
)

filegroup(
  name = "cypress_config",
  srcs = ["cypress.json"],
  visibility = [":cockpit_e2e"],
)

filegroup(
  name = "eslint_config",
  srcs = [".eslintignore", ".eslintrc.js"],
  visibility = [":cockpit", ":serve"],
)

filegroup(
  name = "wings_config",
  srcs = ["wings.json"],
  visibility = ["//src/wings/..."],
)

filegroup(
  name = "vue_config",
  srcs = ["vue.config.js"],
  visibility = [":cockpit", ":serve"],
)

pnpm_install(
  name = "pnpm",
  deps = [":pnpm_config"],
)

pnpm_build(
  name = "cockpit",
  deps = [
    ":pnpm",
    ":prettier",
    ":tsconfig",
    ":index_html",
    ":vue_config",
    ":eslint_config",
    "//src/assets:assets",
    "//src/cockpit:core_files",
  ],
  denullify_files = ["src/cockpit/router.ts"],
)

pnpm_gen_prep(
  name = "prep_gen",
  denullify_files = ["src/cockpit/router.ts"],
  deps = ["//src/cockpit/scripts:gen_router"],
)

pnpm_run(
  name = "serve",
  cmd = "serve",
  deps = [
    ":pnpm",
    ":prettier",
    ":prep_gen",
    ":index_html",
    ":vue_config",
    ":eslint_config",
    "//src/assets:assets",
    "//src/cockpit:core_files",
  ],
  at_top_level = False,
)

pnpm_test(
  name = "cockpit_unit",
  srcs = [":prep_gen"],
  cmd = "cover",
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
  ],
)

pnpm_test(
  name = "cockpit_e2e",
  srcs = [":prep_gen"],
  cmd = "test:e2e",
  flaky = 2,
  deps = [
    ":pnpm",
    ":prep_gen",
    ":cypress_config",
    ":eslint_config",
    ":index_html",
    ":vue_config",
    "//src/assets:assets",
    "//src/cockpit:core_files",
    "//src/cockpit/tests/e2e",
    "//src/cockpit/tests:e2e_eslint",
  ],
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
  at_top_level = True,
  visibility = [
    ":lint",
    "//src/cockpit/..."
  ],
  deps = [":pnpm"],
)

gentest(
  name = "golint",
  test_cmd = " && ".join([
    "current=$(pwd)",
    "cd $(pwd | awk -F'plz-out' '{print $1}') || exit 1",
    "gofmt -w src/turbine/**/*.go",
  ]),
  no_test_output = True,
  visibility = [":lint"],
)
