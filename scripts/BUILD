gentest(
    name = 'shellcheck',
    test_cmd = ' && '.join([
        "current=$(pwd)",
        "cd $(pwd | awk -F'plz-out' '{print $1}') || exit 1",
        "shellcheck -e SC2039,SC1117 -s sh scripts/*.sh",
    ]),
    no_test_output = True,
)

sh_cmd(
    name = 'full_clean',
    cmd = ' && '.join([
        "echo \"Removing '.cache'...\"",
        "rm -rf .cache",
        "echo \"Removing 'node_modules'...\"",
        "rm -rf node_modules",
        "echo \"Removing '~/.cache/please'...\"",
        "rm -rf ~/.cache/please",
        "echo \"Removing 'plz-out'...\"",
        "rm -rf plz-out",
        "echo \"All removal completed successfully!\"",
    ])
)
