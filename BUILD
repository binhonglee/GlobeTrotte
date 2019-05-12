genrule(
    name = 'pnpm',
    visibility = ['PUBLIC'],
    outs = ['node_modules'],
    cmd = ' && '.join([
        "HOME=\"/home/$USER\"",
        "top_level=$(pwd | awk -F'plz-out' '{print $1}')",
        "pnpm i",
        "ln -s \"$top_level\"\"node_modules\" \"node_modules\"",
    ]),
)

genrule(
    name = 'cockpit',
    outs = ['dist'],
    cmd = ' && '.join([
        "current=$(pwd)",
        "cd $(pwd | awk -F'plz-out' '{print $1}')",
        "pnpm run build",
        "mv \"dist\" \"$current\""
    ]),
    deps = [':pnpm'],
)

sh_cmd(
    name = 'local_cockpit',
    cmd = 'pnpm run serve',
    deps = [':pnpm'],
)

gentest(
    name = 'tslint',
    test_cmd = 'pnpm run lint',
    srcs = [
        'tsconfig.json',
        'tslint.json',
    ],
    no_test_output = True,
    deps = [':pnpm'],
)
