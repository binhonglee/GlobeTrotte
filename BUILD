subinclude("//build_defs/pnpm")

filegroup(
  name = "index_html",
  srcs = ["index.html"],
)

filegroup(
  name = "pnpm_config",
  srcs = [
    ".npmrc",
    ".babelrc",
    "package.json",
    "pnpm-lock.yaml",
  ],
)

filegroup(
  name = "tsconfig",
  srcs = [
    "tsconfig.json",
  ],
  visibility = [
    "//src/cockpit/scripts/..."
  ],
)

filegroup(
  name = "prettier",
  srcs = [".prettierrc"],
)

filegroup(
  name = "eslint_config",
  srcs = [".eslintignore", ".eslintrc.js"],
)

filegroup(
  name = "wings_config",
  srcs = ["wings.json"],
  visibility = ["//src/wings/..."],
)

filegroup(
  name = "vue_config",
  srcs = ["vue.config.js"],
)

filegroup(
  name = "nycrc",
  srcs = [".nycrc.json"],
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

pnpm_run(
  name = "report",
  cmd = "report",
  deps = [
    ":pnpm",
    ":nycrc",
  ],
  at_top_level = False,
)

pnpm_test(
  name = "cockpit_ava",
  srcs = ["ava.config.js"],
  cmd = "test:ava",
  out = "ava",
  priority = 2,
  deps = [
    ":pnpm",
    ":nycrc",
    ":tsconfig",
    "//src/cockpit:core_files",
    "//src/cockpit/tests/components:ava_files",
  ],
  denullify_files = ["src/cockpit/router.ts"],
)

pnpm_test(
  name = "cockpit_mocha",
  srcs = ["reporter.json"],
  cmd = "test:mocha",
  out = "mocha/unit",
  # coverage = "coverage",
  deps = [
    ":pnpm",
    ":nycrc",
    ":tsconfig",
    "//src/cockpit/tests/wings:wings",
    "//src/cockpit/tests/shared:shared",
  ],
)

pnpm_test(
  name = "cockpit_e2e",
  srcs = ["cypress.json"],
  cmd = "test:e2e",
  out = "cypress/junit",
  flaky = 2,
  priority = 4,
  requires_server = True,
  deps = [
    ":pnpm",
    ":index_html",
    ":vue_config",
    ":eslint_config",
    "//src/assets:assets",
    "//src/cockpit/tests/e2e",
    "//src/cockpit:core_files",
    "//src/cockpit/tests:e2e_eslint",
  ],
  denullify_files = ["src/cockpit/router.ts"],
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
)
