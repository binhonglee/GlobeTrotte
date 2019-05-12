# gentest(
#     name = 'trip_test',
#     test_cmd = 'pnpm run test:unit src/cockpit/structs/Trip.test.ts',
#     no_test_output = True,
# )

# gentest(
#     name = 'trip_editable_test',
#     test_cmd = 'pnpm run test:unit src/cockpit/shared/TripEditable.test.ts',
#     no_test_output = True,
# )

# gentest(
#     name = 'city_util_test',
#     test_cmd = 'pnpm run test:unit src/cockpit/enums/CityUtil.test.ts',
#     no_test_output = True,
# )

gentest(
    name = 'unit_tests',
    test_cmd = ' && '.join([
        "pnpm run cover:unit",
    ]),
    no_test_output = True,
    deps = ['//:pnpm'],
)
