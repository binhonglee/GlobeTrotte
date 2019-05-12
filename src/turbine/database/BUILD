go_library(
    name = 'db',
    srcs = [
        'structsutil.go',
        'db.go',
        'tripdb.go',
        'userdb.go',
    ],
    deps = [
        '//third_party:pq',
        '//src/turbine/structs:istructs',
        '//src/turbine/structs:user',
        '//src/turbine/structs:trip',
        '//src/turbine/structs:place',
        '//src/turbine/structs:newuser',
        '//src/turbine/enums:city',
    ],
    visibility = ['//src/turbine/...'],
)

go_test(
    name = 'db_test',
    srcs = [
        'db_test.go',
        'dbinteraction_test.go',
    ],
    data = ['//config:psql.config'],
    deps = [
        ':db',
    ],
)
