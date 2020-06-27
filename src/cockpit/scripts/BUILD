subinclude('//build_defs/pnpm')

pnpm_build_script(
  name = "gen_router",
  srcs = ["genRouter.ts"],
  cmd = "genRouter",
  deps = [
    '//:pnpm',
    "//:tsconfig",
    "//src/cockpit/views:views",
  ],
  visibility = [
    '//:cockpit',
    '//src/cockpit:core_files',
  ],
)

pnpm_run(
  name = "gen_component",
  srcs = ["genComponent.ts"],
  cmd = "genComponent",
  deps = ["//:pnpm"],
)
