package(default_visibility = ["PUBLIC"])

filegroup(
  name = "npm",
  srcs = ["npm.build_defs"],
  deps = ["//build_defs/gen"],
)

filegroup(
  name = "ava",
  srcs = ["ava.build_defs"],
  deps = [":npm"],
)

filegroup(
  name = "jest",
  srcs = ["jest.build_defs"],
  deps = [":npm"],
)
