gentest(
  name = "shellcheck",
  test_cmd = " && ".join([
    "current=$(pwd)",
    "cd $(pwd | awk -F'plz-out' '{print $1}') || exit 1",
    "shellcheck -e SC2039,SC1117,SC3058 -s sh scripts/*.sh",
  ]),
  no_test_output = True,
)

sh_library(
  name = "reset",
  src = "reset.sh",
)

sh_library(
  name = "pull",
  src = "pull.sh",
)
