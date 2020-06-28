subinclude("//build_defs/pnpm")

pnpm_build_script(
  name = "gen_router",
  srcs = ["genRouter.ts"],
  cmd = "genRouter",
  outs = ["src/cockpit/router.ts"],
  deps = [
    "//:pnpm",
    "//:tsconfig",
    "//src/cockpit/views:404",
    "//src/cockpit/views:about",
    "//src/cockpit/views:landing",
    "//src/cockpit/views:login",
    "//src/cockpit/views:register",
    "//src/cockpit/views:trip_get_view",
    "//src/cockpit/views:trip_new",
  ],
  nullify_outs = True,
  visibility = ["//src/cockpit:core_files"],
)

pnpm_run(
  name = "gen_component",
  srcs = ["genComponent.ts"],
  cmd = "genComponent",
  deps = ["//:pnpm"],
)
