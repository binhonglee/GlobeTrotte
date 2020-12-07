filegroup(
  name = "shared",
  srcs = glob(["**/*.spec.ts"]),
  visibility = [
    "//:cockpit_mocha",
  ],
  deps = [
    "//src/cockpit/wings:wings",
    "//src/cockpit/shared:shared",
  ],
)
