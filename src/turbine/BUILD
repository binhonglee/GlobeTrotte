go_binary(
    name = 'main',
    srcs = ['main.go'],
    deps = [
        '//third_party:mux',
        '//third_party:pq',
        '//src/turbine/router',
    ],
    visibility = [
        '//src/turbine/...',
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
    visibility = ['PUBLIC'],
)
