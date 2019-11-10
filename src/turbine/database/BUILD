go_library(
    name = 'database',
    srcs = [
        'structsutil.go',
        'db.go',
        'tripdb.go',
        'userdb.go',
    ],
    deps = [
        '//third_party:pq',
        '//src/turbine/structs:structs',
        '//src/turbine/city:city',
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
        ':database',
    ],
)
