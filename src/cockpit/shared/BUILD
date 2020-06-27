filegroup(
  name = "shared",
  srcs = [
    "HTTPReq.ts",
    "lib.scss",
  ],
  visibility = ["//:cockpit"],
)

filegroup(
  name = "trip_editable",
  srcs = [
    "TripEditable.ts",
  ],
  visibility = [
    "//:cockpit",
    "//src/cockpit/tests/shared:trip_editable_test",
  ],
)

filegroup(
  name = "city_util",
  srcs = [
    "CityUtil.ts"
  ],
  visibility = [
    "//:cockpit",
    "//src/cockpit/tests/shared:city_util_test",
  ],
  deps = [
    "//src/cockpit/enums:city"
  ]
)
