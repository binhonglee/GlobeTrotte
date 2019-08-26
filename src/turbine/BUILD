genrule(
    name = 'pre_build',
    visibility = [':main'],
    outs = ['go.mod'],
    cmd = ' && '.join([
        "current=$(pwd)",
        "cd $(pwd | awk -F'plz-out' '{print $1}')",
        "touch plz-out/go.mod",
        "ln -s \"plz-out/go.mod\" \"$current/go.mod\"",
    ]),
)

go_binary(
    name = 'main',
    srcs = ['main.go'],
    deps = [
        ':pre_build',
        '//third_party:mux',
        '//third_party:pq',
        '//src/turbine/router',
    ],
    visibility = [
        '//scripts:golint',
        '//src/turbine/...',
    ],
)
