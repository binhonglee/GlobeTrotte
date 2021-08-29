subinclude("//build_defs/npm")

filegroup(
  name = "check_backend",
  srcs = ["checkBackend.ts"],
  visibility = ["//..."],
)

ts_run_build(
  name = "gen_router",
  script = "genRouter.ts",
  srcs = [
    "//:pnpm_config",
    "//:tsconfig",
    "//src/cockpit/views:views",
  ],
  outs = ["router.ts", "routes.ts"],
  make_copy = True,
  copy_path = "src/cockpit/",
  deps =["//:pnpm_install"],
  visibility = [
    "//src/cockpit:core_files",
  ],
)

ts_binary(
  name = "gen_report",
  script = "genReport.ts",
  srcs = [
    "//:nycrc",
    "//:pnpm_config",
    "//:tsconfig",
  ],
  post_run = [
    "pnpx nyc report",
  ],
  test_only = True,
  deps = ["//:pnpm_install"],
)

ts_binary(
  name = "gen_component",
  script = "genComponent.ts",
  deps = ["//:pnpm_install"],
)
