genrule(
    name = 'yarn',
    visibility = ['PUBLIC'],
    outs = ['node_modules'],
    cmd = ' && '.join([
        "HOME=\"/home/$USER\"",
        "top_level=$(pwd | awk -F'plz-out' '{print $1}')",
        "yarn",
        "ln -s \"$top_level\"\"node_modules\" \"node_modules\"",
    ]),
)

genrule(
    name = 'cockpit',
    outs = ['dist'],
    cmd = ' && '.join([
        "current=$(pwd)",
        "cd $(pwd | awk -F'plz-out' '{print $1}')",
        "yarn run build",
        "mv \"dist\" \"$current\""
    ]),
    deps = [':yarn'],
)

sh_cmd(
    name = 'local_cockpit',
    cmd = 'yarn run serve',
    deps = [':yarn'],
)

gentest(
    name = 'tslint',
    test_cmd = 'yarn run lint',
    srcs = [
        'tsconfig.json',
        'tslint.json',
    ],
    no_test_output = True,
    deps = [':yarn'],
)
