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
  name = "full",
  cmd = "build:plz",
  srcs = [],
  at_source = True,
  outs = ["dist"],
  exported_deps = [
    ":srcs",
    "//src/glareshield/E",
    "//src/glareshield/H",
    "//src/glareshield/R",
  ],
  deps = [
    "//:pnpm_install",
  ],
  visibility = ["PUBLIC"],
)
