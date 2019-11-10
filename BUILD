filegroup(
    name = "yarn_config",
    srcs = [
        "package.json",
        "yarn.lock",
    ],
    visibility = [
        ":yarn",
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
    name = "wings_config",
    srcs = ["wings.json"],
    visibility = ["//src/wings/..."],
)

genrule(
    name = "yarn",
    outs = ["node_modules"],
    cmd = " && ".join([
        "HOME=\"/home/$USER\"",
        "top_level=$(pwd | awk -F'plz-out' '{print $1}') || exit 1",
        "ln -s \"$top_level\"\"node_modules\" \"node_modules\"",
        "yarn",
    ]),
    output_is_complete = False,
    visibility = [
        ":tslint",
        "//src/cockpit/...",
    ],
    deps = [":yarn_config"],
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
        "yarn run genRouter",
        "yarn run serve",
    ]),
    deps = [":yarn"],
)

gentest(
    name = "tslint",
    test_cmd = "yarn run lint --fix",
    no_test_output = True,
    output_is_complete = False,
    deps = [
        ":yarn",
        "//src/wings/struct:day",
        "//src/wings/struct:new_user",
        "//src/wings/struct:place",
        "//src/wings/struct:trip",
        "//src/wings/struct:user",
        "//src/wings/enum:city",
    ],
    visibility = ["//src/cockpit/..."],
)
