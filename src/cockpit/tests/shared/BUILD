filegroup(
  name = "shared",
  srcs = glob(["**/*.spec.ts"]),
  visibility = [
    "//:cockpit_unit",
  ],
  deps = [
    "//src/cockpit/wings:wings",
    "//src/cockpit/shared:shared",
  ],
)
