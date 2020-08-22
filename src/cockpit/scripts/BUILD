subinclude("//build_defs/pnpm")

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
    "//:serve",
    "//:prep_gen"
  ],
  nullify_outs = True,
)

pnpm_run(
  name = "gen_component",
  srcs = ["genComponent.ts"],
  cmd = "genComponent",
  deps = ["//:pnpm"],
)
