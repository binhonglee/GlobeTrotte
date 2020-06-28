filegroup(
  name = "c_edit_item",
  srcs = ["CEditItem.vue"],
  visibility = [
    "//:cockpit",
    "//src/cockpit/tests/...",
    "//src/cockpit/views/...",
  ],
  deps = ["//src/cockpit/shared:trip_editable"],
)

filegroup(
  name = "c_edit_places",
  srcs = ["CEditPlaces.vue"],
  visibility = [
    "//:cockpit",
    "//src/cockpit/tests/...",
    "//src/cockpit/views/...",
  ],
  deps = ["//src/cockpit/structs:place"],
)

filegroup(
  name = "c_edit_trip",
  srcs = ["CEditTrip.vue"],
  visibility = [
    "//:cockpit",
    "//src/cockpit/tests/...",
    "//src/cockpit/views/...",
  ],
  deps = [
    ":c_edit_item",
    ":c_edit_places",
    "//src/cockpit/enums:city",
    "//src/cockpit/structs:trip",
    "//src/cockpit/shared:city_util",
    "//src/cockpit/shared:trip_editable",
  ],
)

filegroup(
  name = "c_places",
  srcs = ["CPlaces.vue"],
  visibility = [
    "//:cockpit",
    "//src/cockpit/tests/...",
    "//src/cockpit/views/...",
  ],
  deps = ["//src/cockpit/structs:place"],
)

filegroup(
  name = "c_trip_info",
  srcs = ["CTripInfo.vue"],
  visibility = [
    "//:cockpit",
    "//src/cockpit/tests/...",
    "//src/cockpit/views/...",
  ],
  deps = [
    ":c_edit_trip",
    ":c_view_trip",
    "//src/cockpit/shared",
    "//src/cockpit/structs:trip",
  ],
)

filegroup(
  name = "c_view_trip",
  srcs = ["CViewTrip.vue"],
  visibility = [
    "//:cockpit",
    "//src/cockpit/tests/...",
    "//src/cockpit/views/...",
  ],
  deps = [
    ":c_places",
    "//src/cockpit/enums:city",
    "//src/cockpit/structs:trip",
    "//src/cockpit/shared:city_util",
  ],
)
