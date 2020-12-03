subinclude("//build_defs/pnpm")

filegroup(
  name = "index_html",
  srcs = ["index.html"],
  visibility = [":cockpit", ":serve"],
)

filegroup(
  name = "pnpm_config",
  srcs = [
    ".npmrc",
    "package.json",
    "pnpm-lock.yaml",
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
  name = "multi_reporter_mocha_config",
  srcs = ["mochaReporter.json"],
  visibility = [":cockpit_unit"],
)

filegroup(
  name = "multi_reporter_component_config",
  srcs = ["componentReporter.json"],
  visibility = [":cockpit_component"],
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
    ":index_html",
    ":vue_config",
    ":eslint_config",
    "//src/assets:assets",
    "//src/cockpit:core_files",
  ],
  denullify_files = ["src/cockpit/router.ts"],
  at_top_level = False,
)

pnpm_test(
  name = "cockpit_component",
  cmd = "test:component",
  out = "mocha/component",
  priority = 2,
  deps = [
    ":pnpm",
    ":prep_gen",
    ":multi_reporter_component_config",
    "//src/cockpit/tests/components:components",
  ],
)

pnpm_test(
  name = "cockpit_unit",
  cmd = "test:mocha",
  out = "mocha/unit",
  coverage = "coverage",
  priority = 4,
  deps = [
    ":pnpm",
    ":prep_gen",
    ":multi_reporter_mocha_config",
    "//src/cockpit/tests/wings:wings",
    "//src/cockpit/tests/shared:shared",
  ],
)

pnpm_test(
  name = "cockpit_e2e",
  cmd = "test:e2e",
  out = "cypress/junit",
  flaky = 2,
  requires_server = True,
  deps = [
    ":pnpm",
    ":prep_gen",
    ":index_html",
    ":vue_config",
    ":eslint_config",
    ":cypress_config",
    "//src/assets:assets",
    "//src/cockpit/tests/e2e",
    "//src/cockpit:core_files",
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
