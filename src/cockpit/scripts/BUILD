subinclude("//build_defs/pnpm")

filegroup(
  name = "check_backend",
  srcs = ["checkBackend.ts"],
  visibility = [
    "//:cockpit_cypress",
    "//:ava_test_deps",
    "//:serve",
  ],
)

pnpm_run_build(
  name = "gen_router",
  srcs = [
    "genRouter.ts",
    "//:pnpm_config",
    "//:tsconfig",
    "//src/cockpit/views:views",
  ],
  cmd = "genRouter",
  outs = ["router.ts"],
  make_copy = True,
  copy_path = "src/cockpit/",
  deps =["//:pnpm"],
  visibility = [
    "//src/cockpit:core_files",
  ],
)

pnpm_run_build(
  name = "gen_report",
  srcs = [
    "genReport.ts",
    "//:nycrc",
    "//:pnpm_config",
    "//:tsconfig",
    "//src/cockpit/tests/components",
    "//src/cockpit/tests/shared",
    "//src/cockpit/tests/views",
    "//src/cockpit/tests/wings",
  ],
  outs = [".nyc_output"],
  cmd = "genReport:plz",
  test_only = True,
  deps = ["//:pnpm"],
  visibility = ["//:report"]
)

pnpm_run(
  name = "gen_component",
  srcs = ["genComponent.ts"],
  cmd = "genComponent",
  deps = ["//:pnpm"],
)
