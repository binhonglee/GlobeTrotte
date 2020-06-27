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
    '//src/turbine/database:database',
    '//src/turbine/structs:structs',
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
    # This is to prevent race condition on intializing tables
    '//src/turbine/database:db_test',
    '//src/turbine/structs:structs',
  ],
)
