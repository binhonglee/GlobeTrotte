subinclude("//build_defs/pnpm")

filegroup(
  name = "check_backend",
  srcs = ["checkBackend.ts"],
  visibility = [
    "//:cockpit_cypress",
    "//:cockpit_ava",
    "//:serve",
  ],
)

pnpm_build_script(
  name = "gen_router",
  srcs = ["genRouter.ts"],
  cmd = "genRouter",
  outs = ["router.ts"],
  deps = [
    "//:pnpm",
    "//:tsconfig",
    "//src/cockpit/views:views",
  ],
  outpath = "src/cockpit/",
  visibility = [
    "//src/cockpit:core_files",
  ],
  nullify_outs = True,
)

pnpm_run(
  name = "gen_component",
  srcs = ["genComponent.ts"],
  cmd = "genComponent",
  deps = ["//:pnpm"],
  at_top_level = True,
)
