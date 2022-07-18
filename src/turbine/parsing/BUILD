go_library(
  name = "parsing",
  srcs = [
    "parsing.go",
    "//src/wings/struct:parsed_url_data",
    "//src/wings/enum:parsed_url_error",
  ],
  deps = [
    "//src/turbine/logger",
    "//third_party/go:dyatlov_go-opengraph_opengraph"
  ],
  visibility = ["//src/turbine/..."],
)

go_test(
  name = "parsing_test",
  srcs = ["parsing_test.go"],
  deps = [":parsing"],
)
