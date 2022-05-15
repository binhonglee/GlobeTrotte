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
    "//src/cockpit:package_json",
    "//src/cockpit:tsconfig",
    "//src/cockpit/views:views",
  ],
  outs = ["router.ts", "routes.ts"],
  make_copy = True,
  copy_path = "src/cockpit/",
  deps =["//:pnpm_install"],
  visibility = [
    "//src/cockpit:core_files",
  ],
  run_install = True,
  root = "src/cockpit",
)

ts_binary(
  name = "gen_component",
  script = "genComponent.ts",
  deps = ["//:pnpm_install"],
)
