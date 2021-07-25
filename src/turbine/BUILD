go_binary(
  name = "main",
  srcs = ["main.go"],
  deps = [
    "//third_party/go:gorilla_mux",
    "//third_party/go:lib_pq",
    "//src/turbine/router:router",
    "//src/turbine/logger:logger",
  ],
  visibility = [
    "//...",
  ],
)
