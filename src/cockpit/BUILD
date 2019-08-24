gentest(
    name = 'unit_tests',
    test_cmd = ' && '.join([
        "yarn run cover",
    ]),
    no_test_output = True,
    deps = ['//:yarn'],
)

genrule(
    name = 'cockpit_router',
    outs = ['genRouter.js'],
    cmd = ' && '.join([
        "current=$(pwd)",
        "cd $(pwd | awk -F'plz-out' '{print $1}')",
        "yarn run genRouter",
        "mv plz-out/genRouter.js -t $current/",
    ]),
    deps = [
        '//src/cockpit/views:views',
        '//:yarn',
    ],
    visibility = ['PUBLIC'],
)
