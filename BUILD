filegroup(
    name = "index_html",
    srcs = ["index.html"],
    visibility = ["//src/cockpit/..."],
)

filegroup(
    name = "mocha_config",
    srcs = [".mocharc.json"],
    visibility = ["//src/cockpit/..."],
)

filegroup(
    name = "pnpm_config",
    srcs = [
        "package.json",
        "pnpm-lock.yaml",
    ],
    visibility = [
        ":pnpm",
        "//src/cockpit/...",
    ],
)

filegroup(
    name = "tsconfig",
    srcs = [
        "tsconfig.json",
        "tslint.json",
    ],
    visibility = ["//src/cockpit/..."],
)

filegroup(
    name = "wings_config",
    srcs = ["wings.json"],
    visibility = ["//src/wings/..."],
)

genrule(
    name = "pnpm",
    outs = ["node_modules"],
    cmd = " && ".join([
        "HOME=\"/home/$USER\"",
        "top_level=$(pwd | awk -F'plz-out' '{print $1}')",
        "ln -s \"$top_level\"\"node_modules\" \"node_modules\"",
        # "pnpm install --shamefully-hoist",
    ]),
    output_is_complete = False,
    visibility = [
        ":tslint",
        "//src/cockpit/...",
    ],
    deps = [":pnpm_config"],
)

sh_cmd(
    name = "local_cockpit",
    cmd = " && ".join([
        "cd $(pwd | awk -F'plz-out' '{print $1}') || exit 1",
        # DO NOT CHANGE THIS (unless you REALLY know what you are doing)
        #   You should stick to only editing the script file itself
        #   or the command in package.json.
        #
        #   If a change cannot be avoided, make sure the same change is
        #   also applied to `//src/cockpit/scripts:gen_router`
        "pnpm run genRouter",
        "pnpm run serve",
    ]),
    deps = [":pnpm"],
)

gentest(
    name = "lint",
    test_cmd = "echo 'Lint everything~'",
    no_test_output = True,
    deps = [
        ":tslint",
        ":golint",
    ]
)

gentest(
    name = "tslint",
    test_cmd = "pnpm run lint -- --fix",
    no_test_output = True,
    output_is_complete = False,
    deps = [
        "//src/wings/struct:day",
        "//src/wings/struct:new_user",
        "//src/wings/struct:place",
        "//src/wings/struct:trip",
        "//src/wings/struct:user",
        "//src/wings/enum:city",
    ],
    visibility = [
        ":lint",
        "//src/cockpit/..."
    ],
)

gentest(
    name = 'golint',
    test_cmd = ' && '.join([
        "current=$(pwd)",
        "cd $(pwd | awk -F'plz-out' '{print $1}') || exit 1",
        "goformat -style config/goformat -w src/turbine/**/*.go",
    ]),
    no_test_output = True,
    deps = [
        '//src/wings/struct:day',
        '//src/wings/struct:new_user',
        '//src/wings/struct:place',
        '//src/wings/struct:trip',
        '//src/wings/struct:user',
        '//src/wings/enum:city',
    ],
    visibility = [':lint'],
)
