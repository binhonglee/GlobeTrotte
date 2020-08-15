filegroup(
  name = "core_files",
  srcs = [
    "//src/cockpit/scripts:gen_router",
    "main.ts",
    "App.vue"
  ],
  deps = [
    "//src/cockpit/views:404",
    "//src/cockpit/views:about",
    "//src/cockpit/views:landing",
    "//src/cockpit/views:login",
    "//src/cockpit/views:register",
    "//src/cockpit/views:404",
    "//src/cockpit/views:trip_get_view",
    "//src/cockpit/views:trip_new",
  ],
  visibility = [
    "//:cockpit",
    "//:serve",
    "//:prep_gen",
    "//:cockpit_e2e",
  ],
)
