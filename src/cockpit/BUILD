filegroup(
  name = "core_files",
  srcs = [
    "//src/cockpit/scripts:gen_router",
    "main.ts",
    "App.vue"
  ],
  deps = [
    "//src/cockpit/views:views",
  ],
  visibility = [
    "//:cockpit",
    "//:serve",
    "//:prep_gen",
    "//:cockpit_e2e",
    "//:cockpit_ava",
  ],
)
