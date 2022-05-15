filegroup(
  name = "vite_base",
  srcs = ["vite_base_config.ts"],
  visibility = ["//src/cockpit/..."],
)

filegroup(
  name = "vitest_circleci",
  srcs = ["vitest_circleci.config.ts"],
  exported_deps = [":vite_base"],
  visibility = ["//src/cockpit/..."],
)

filegroup(
  name = "vitest_playwright",
  srcs = ["vitest_playwright.config.ts"],
  exported_deps = [":vite_base"],
  visibility = ["//src/cockpit/..."],
)

filegroup(
  name = "vitest_plz",
  srcs = ["vitest_plz.config.ts"],
  exported_deps = [":vite_base"],
  visibility = ["//src/cockpit/..."],
)
