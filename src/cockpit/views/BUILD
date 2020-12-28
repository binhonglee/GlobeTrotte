filegroup(
  name = "views",
  srcs = glob(["**/*.vue"]),
  visibility = [
    "//src/cockpit:core_files",
    "//src/cockpit/scripts:gen_router",
    "//src/cockpit/tests/views:views",
  ],
  deps = [
    "//src/cockpit/wings:wings",
    "//src/cockpit/shared:shared",
    "//src/cockpit/components:components",
  ]
)
