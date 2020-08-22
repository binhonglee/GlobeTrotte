filegroup(
  name = "views",
  srcs = glob(["**/*.vue"]),
  visibility = [
    "//src/cockpit/scripts:gen_router",
    "//src/cockpit:core_files",
  ],
  deps = [
    "//src/cockpit/wings:wings",
    "//src/cockpit/shared:shared",
    "//src/cockpit/components:components",
  ]
)
