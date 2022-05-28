subinclude("//build_defs/npm")

filegroup(
  name = "srcs",
  srcs = [
    "index.ts",
    "package.json",
    "tsconfig.json"
  ],
)

npm_run_build(
  name = "E",
  cmd = "build",
  srcs = [],
  at_source = True,
  outs = ["dist"],
  exported_deps = [":srcs"],
  deps = ["//:pnpm_install"],
  visibility = ["PUBLIC"],
)
