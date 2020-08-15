filegroup(
  name = "404",
  srcs = ["V404.vue"],
  visibility = [
    "//src/cockpit/scripts:gen_router",
    "//src/cockpit:core_files",
  ],
)

filegroup(
  name = "about",
  srcs = ["VAbout.vue"],
  visibility = [
    "//src/cockpit/scripts:gen_router",
    "//src/cockpit:core_files",
  ],
)

filegroup(
  name = "landing",
  srcs = ["VLanding.vue"],
  visibility = [
    "//src/cockpit/scripts:gen_router",
    "//src/cockpit:core_files",
  ],
)

filegroup(
  name = "login",
  srcs = ["VLogin.vue"],
  visibility = [
    "//src/cockpit/scripts:gen_router",
    "//src/cockpit:core_files",
  ],
  deps = [
    "//src/cockpit/shared",
    "//src/cockpit/structs:user",
    "//src/cockpit/structs:new_user",
  ],
)

filegroup(
  name = "register",
  srcs = ["VRegister.vue"],
  visibility = [
    "//src/cockpit/scripts:gen_router",
    "//src/cockpit:core_files",
  ],
  deps = [
    "//src/cockpit/shared",
    "//src/cockpit/structs:user",
    "//src/cockpit/structs:new_user",
  ],
)

filegroup(
  name = "trip_get_view",
  srcs = ["trip/VGetView.vue"],
  visibility = [
    "//src/cockpit/scripts:gen_router",
    "//src/cockpit:core_files",
  ],
  deps = [
    "//src/cockpit/shared",
    "//src/cockpit/structs:trip",
    "//src/cockpit/structs:place",
    "//src/cockpit/components:c_trip_info",
  ],
)

filegroup(
  name = "trip_new",
  srcs = ["trip/VNew.vue"],
  visibility = [
    "//src/cockpit/scripts:gen_router",
    "//src/cockpit:core_files",
  ],
  deps = [
    "//src/cockpit/shared",
    "//src/cockpit/structs:trip",
    "//src/cockpit/components:c_edit_trip",
  ],
)
