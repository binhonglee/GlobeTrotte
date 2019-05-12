go_library(
    name = 'router',
    srcs = [
        'handlers.go',
        'router.go',
        'structhandlers.go',
    ],
    deps = [
        '//third_party:mux',
        '//third_party:bcrypt',
        '//third_party:sessions',
        '//src/turbine/database:db',
        '//src/turbine/structs:istructs',
        '//src/turbine/structs:user',
        '//src/turbine/structs:trip',
        '//src/turbine/structs:newuser',
    ],
    visibility = ['//src/...'],
)

go_test(
    name = 'router_test',
    srcs = [
        'router_test.go',
        'triprouter_test.go',
    ],
    data = ['//config:psql.config'],
    deps = [
        ':router',
        '//src/turbine/structs:istructs',
        '//src/turbine/structs:user',
        '//src/turbine/structs:trip',
    ],
)
