subinclude("//build_defs/sh")

filegroup(
  name = "wings_config",
  srcs = ["wings.json"],
  visibility = ["//src/wings/..."],
)

sh_exec(
  name = "wings_binary",
  cmd = "curl -s https://wings.sh/install.sh | sh -s -- -d",
  outs = ["wings"],
  binary = True,
  set_home_path = True,
  visibility = ["PUBLIC"],
)
