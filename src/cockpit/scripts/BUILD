genrule(
    name = "gen_router",
    srcs = ["genRouter.ts"],
    outs = [
        "src/cockpit/router.ts",
    ],
    # DO NOT CHANGE THIS (unless you REALLY know what you are doing)
    #   You should stick to only editing the script file itself
    #   or the command in package.json.
    #
    #   If a change cannot be avoided, make sure the same change is
    #   also applied to `:local_cockpit`
    cmd = "yarn run genRouter",
    deps = [
        "//:yarn",
        "//:tsconfig",
        "//src/cockpit/views:views",
    ],
    needs_transitive_deps = True,
    output_is_complete = False,
    visibility = [
        '//src/cockpit:cockpit',
    ],
)
