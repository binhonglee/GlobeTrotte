subinclude("//build_defs/npm")
subinclude("//build_defs/npm:ava")
subinclude("//build_defs/npm:jest")
subinclude("//build_defs/sh")

filegroup(
  name = "babel_config",
  srcs = [".babelrc"],
)

filegroup(
  name = "ava_config",
  srcs = [
    "ava.config.js",
  ],
)

filegroup(
  name = "jest_config",
  srcs = [
    "jest.config.ts",
  ],
)

filegroup(
  name = "index_html",
  srcs = ["index.html"],
)

filegroup(
  name = "pnpm_config",
  srcs = [
    ".npmrc",
    "vite.config.ts",
    "package.json",
    "pnpm-lock.yaml",
  ],
  visibility = [
    "//src/cockpit/scripts/..."
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

sh_exec(
  name = "wings_binary",
  cmd = "curl -s https://wings.sh/install.sh | sh -s -- -d",
  outs = ["wings"],
  binary = True,
  set_home_path = True,
  visibility = ["PUBLIC"],
)

filegroup(
  name = "nycrc",
  srcs = [".nycrc.json"],
  visibility = [
    "//src/cockpit/scripts/..."
  ],
)

npm_install(
  name = "pnpm",
  srcs = [":pnpm_config"],
)

npm_run_build(
  name = "cockpit",
  cmd = "build",
  srcs = [
    ":pnpm",
    ":pnpm_config",
    ":prettier",
    ":tsconfig",
    ":index_html",
  ],
  outs = ["dist"],
  deps = [
    "//src/assets:assets",
    "//src/cockpit:core_files",
  ],
)

npm_run(
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
)

ava_dir(
  name = "ava_test_deps",
  srcs = [
    ":ava_config",
    ":babel_config",
    ":pnpm_config",
    ":nycrc",
    ":tsconfig",
    "//src/cockpit:core_files",
    "//src/cockpit/tests:ava_setup",
    "//src/cockpit/components:components",
    "//src/cockpit/shared:shared",
    "//src/cockpit/views:views",
    "//src/cockpit/wings:wings",
  ],
  visibility = [
    "//src/cockpit/tests/..."
  ],
)

jest_dir(
  name = "jest_test_deps",
  srcs = [
    ":jest_config",
    ":pnpm_config",
    ":tsconfig",
    "//src/cockpit:core_files",
    "//src/cockpit/components:components",
    "//src/cockpit/shared:shared",
    "//src/cockpit/views:views",
    "//src/cockpit/wings:wings",
  ],
  visibility = [
    "//src/cockpit/tests/..."
  ],
)

npm_test(
  name = "cockpit_cypress",
  srcs = ["cypress.json"],
  cmd = "test:cypress:plz",
  result_dir = "cypress/junit",
  requires_server = 3000,
  server_start_cmd = "pnpm run startServer",
  set_home = True,
  deps = [
    ":pnpm",
    ":index_html",
    ":babel_config",
    ":eslint_config",
    "//src/assets:assets",
    "//src/cockpit:core_files",
    "//src/cockpit/tests/cypress",
    "//src/cockpit/tests:cypress_eslint",
    "//src/cockpit/scripts:check_backend",
  ],
)

sh_cmd(
  name = "lint_all",
  # TODO: Turn this into rules to run in parallel instead of sequential.
  cmd = " && ".join([
    "./pleasew run //:eslint",
    "./pleasew run //:gofmt",
    "echo 'All lints completed!'",
  ]),
  deps = [
    ":eslint",
    ":gofmt",
  ],
)

npm_lint(
  name = "eslint",
  cmd = "format",
  visibility = [
    "//src/cockpit/..."
  ],
  srcs = [
    ":pnpm",
    ":pnpm_config",
    ":prettier",
    ":tsconfig",
    ":index_html",
    "//src/assets:assets",
    "//src/cockpit:core_files",
  ],
  deps =  [
    "//src/wings/enum",
    "//src/wings/struct",
  ],
)

npm_test(
  name = "tsc",
  cmd = "check:tsc",
  srcs = [
    ":pnpm",
    ":pnpm_config",
    ":prettier",
    ":tsconfig",
    ":index_html",
    "//src/assets:assets",
    "//src/cockpit:core_files",
  ],
  needs_transitive_deps = True,
)

sh_cmd(
  name = "gofmt",
  cmd = " && ".join([
    "current=$(pwd)",
    "cd $(pwd | awk -F'plz-out' '{print $1}')",
    "gofmt -s -w src/turbine/**/*.go",
  ]),
  deps =  [
    "//src/turbine:main",
    "//src/wings/enum",
    "//src/wings/struct",
  ],
)
