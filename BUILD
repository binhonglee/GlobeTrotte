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
    ":eslint_config",
    "//src/assets:assets",
    "//src/cockpit:core_files",
    "//src/cockpit/scripts:check_backend",
  ],
  denullify_files = ["src/cockpit/router.ts"],
  at_top_level = True,
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
  deps = [
    ":pnpm",
    ":nycrc",
    ":tsconfig",
    "//src/cockpit:core_files",
    "//src/cockpit/scripts:check_backend",
    "//src/cockpit/tests:ava_setup",
    "//src/cockpit/tests/puppeteer:puppeteer",
    "//src/cockpit/tests/components:components",
    "//src/cockpit/tests/shared:shared",
    "//src/cockpit/tests/wings:wings",
  ],
  denullify_files = ["src/cockpit/router.ts"],
)

pnpm_test(
  name = "cockpit_cypress",
  srcs = ["cypress.json"],
  cmd = "test:cypress",
  out = "cypress/junit",
  priority = 2,
  requires_server = 1234,
  deps = [
    ":pnpm",
    ":index_html",
    ":eslint_config",
    "//src/assets:assets",
    "//src/cockpit/tests/cypress",
    "//src/cockpit:core_files",
    "//src/cockpit/tests:cypress_eslint",
    "//src/cockpit/scripts:check_backend",
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
    "gofmt -w $(ls src/turbine/**/*.go | grep -v /wings/)",
  ]),
  no_test_output = True,
)
