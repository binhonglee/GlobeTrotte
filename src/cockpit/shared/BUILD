filegroup(
  name = "shared",
  srcs = [
    "HTTPReq.ts",
    "lib.scss",
  ],
  visibility = ["//src/cockpit/..."],
)

filegroup(
  name = "trip_editable",
  srcs = [
    "TripEditable.ts",
  ],
  visibility = [
    "//:cockpit",
    "//src/cockpit/...",
  ],
)

filegroup(
  name = "city_util",
  srcs = [
    "CityUtil.ts"
  ],
  visibility = ["//src/cockpit/..."],
  deps = ["//src/cockpit/enums:city"]
)
