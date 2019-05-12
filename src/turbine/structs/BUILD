go_library(
    name = 'istructs',
    srcs = ['istructs.go'],
    visibility = ['//src/turbine/...'],
)

go_library(
    name = 'place',
    srcs = ['place.go'],
    visibility = ['//src/turbine/...'],
)

go_library(
    name = 'newuser',
    srcs = ['newuser.go'],
    visibility = ['//src/turbine/...'],
)

go_library(
    name = 'user',
    srcs = ['user.go'],
    visibility = ['//src/turbine/...'],
)

go_library(
    name = 'trip',
    srcs = ['trip.go'],
    deps = [
        '//src/turbine/enums:city',
        ':place',
    ],
    visibility = ['//src/turbine/...'],
)
