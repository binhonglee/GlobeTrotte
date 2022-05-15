subinclude("//build_defs/npm")
subinclude("//build_defs/npm:vitest")
subinclude("//build_defs/sh")

filegroup(
  name = "pnpm_config",
  srcs = [
    "package.json",
    "pnpm-lock.yaml",
    "pnpm-workspace.yaml",
  ],
  visibility = [
    "//src/..."
  ],
)

filegroup(
  name = "prettier",
  srcs = [".prettierrc"],
  visibility = ["//src/..."],
)

# pnpm(
#   name= "pnpm",
#   version = "v16.7.0",
# )

npm_install(
  name = "pnpm_install",
  srcs = [
    ":pnpm_config",
    "//src/cockpit:package_json"
  ],
)

sh_tools_cmd(
  name = "lint_all",
  # TODO: Turn this into rules to run in parallel instead of sequential.
  cmd = " && ".join([
    "./pleasew run //:eslint",
    "./pleasew run //:gofmt",
    "./pleasew run //:staticcheck",
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
    ":pnpm_install",
    ":pnpm_config",
    ":prettier",
    "//src/assets:assets",
    "//src/cockpit:core_files",
  ],
  deps =  [
    "//src/wings/enum",
    "//src/wings/struct",
  ],
)

sh_tools_cmd(
  name = "staticcheck",
  cmd = " && ".join([
    "cd $(pwd | awk -F'plz-out' '{print $1}')",
    "for DIR in \\\\$(ls -d src/turbine/*/); do staticcheck \\\\$DIR*.go; done",
  ]),
  deps = [
    "//src/turbine:main",
  ],
)

sh_tools_cmd(
  name = "gofmt",
  cmd = " && ".join([
    "cd $(pwd | awk -F'plz-out' '{print $1}')",
    "gofmt -s -w src/turbine/**/*.go",
  ]),
  deps =  [
    "//src/turbine:main",
    "//src/wings/enum",
    "//src/wings/struct",
  ],
)
