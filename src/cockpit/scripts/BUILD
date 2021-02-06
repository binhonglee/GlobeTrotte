subinclude("//build_defs/pnpm")

filegroup(
  name = "check_backend",
  srcs = ["checkBackend.ts"],
  visibility = ["//..."],
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
  outs = ["router.ts", "routes.ts"],
  make_copy = True,
  copy_path = "src/cockpit/",
  deps =["//:pnpm"],
  visibility = [
    "//src/cockpit:core_files",
  ],
)

pnpm_run(
  name = "gen_report",
  srcs = [
    "genReport.ts",
    "//:nycrc",
    "//:pnpm_config",
    "//:tsconfig",
  ],
  cmd = "genReport",
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
