package(default_visibility = ["//src/cockpit/..."])
subinclude("//build_defs/npm")
subinclude("//build_defs/npm:vitest")

filegroup(
  name = "core_files",
  srcs = [
    "App.vue",
    "main.ts",
    "shims-vue.d.ts",
    "//src/cockpit/scripts:gen_router",
  ],
  exported_deps = [
    "//src/cockpit/cache",
    "//src/cockpit/components",
    "//src/cockpit/shared",
    "//src/cockpit/views",
    "//src/cockpit/wings",
  ],
  visibility = ["//..."],
)

filegroup(
  name = "package_json",
  srcs = ["package.json"],
  visibility = [
    "//:pnpm_install",
    "//src/cockpit/...",
  ],
)

filegroup(
  name = "index_html",
  srcs = ["index.html", "public/"],
)

filegroup(
  name = "vite_config",
  srcs = ["vite.config.ts"],
  exported_deps = ["//src/cockpit/configs:vite_base"],
)

filegroup(
  name = "tsconfig",
  srcs = ["tsconfig.json"],
)

filegroup(
  name = "eslint_config",
  srcs = [".eslintignore", ".eslintrc.js"],
)

npm_run_build(
  name = "cockpit",
  cmd = "build",
  at_source = True,
  srcs = [
    ":index_html",
    ":tsconfig",
    "//:pnpm_install",
  ],
  outs = ["dist"],
  deps = [
    "//src/assets:assets",
    "//src/cockpit:core_files",
  ],
  visibility = ["//deploy"],
)

npm_run(
  name = "serve",
  cmd = "serve",
  deps = [
    ":core_files",
    ":index_html",
    "//:pnpm_install",
    "//src/assets:assets",
    "//src/cockpit/scripts:check_backend",
  ],
)

vitest_dir(
  name = "vitest_test_deps",
  srcs = [
    ":core_files",
    ":package_json",
    ":tsconfig",
    "//:pnpm_config",
    "//src/cockpit/cache:cache",
    "//src/cockpit/components:components",
    "//src/cockpit/shared:shared",
    "//src/cockpit/tests:helper",
    "//src/cockpit/tests:vitest_helper",
    "//src/cockpit/views:views",
    "//src/cockpit/wings:wings",
  ],
  visibility = [
    "//src/cockpit/tests/..."
  ],
)

npm_test(
  name = "cypress",
  srcs = ["cypress.json"],
  cmd = "test:cypress:plz",
  result_dir = "cypress/junit",
  requires_server = 3000,
  set_home = True,
  deps = [
    ":core_files",
    ":index_html",
    "//:pnpm_install",
    "//src/assets:assets",
    "//src/cockpit/tests/cypress",
    "//src/cockpit/scripts:check_backend",
  ],
)

npm_test(
  name = "vue_tsc",
  srcs = [
    ":tsconfig",
    "//:pnpm_install",
    "//:prettier",
    "//src/assets:assets",
    "//src/cockpit:core_files",
  ],
  cmd = "check:vue_tsc",
)
