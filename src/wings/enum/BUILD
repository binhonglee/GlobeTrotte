subinclude("//build_defs/wings")
package(default_visibility = ["PUBLIC"])

filegroup(
  name = "enum",
  deps = [
    ":city",
    ":access_level",
    ":registration_error",
  ],
)

wings_lib(
  name = "city",
  src = "city.wings",
  outs = {
    "src/cockpit/wings": "City.ts",
    "src/turbine/wings": "city.go",
  },
)

wings_lib(
  name = "access_level",
  src = "access_level.wings",
  outs = {
    "src/cockpit/wings": "AccessLevel.ts",
    "src/turbine/wings": "accesslevel.go",
  },
)

wings_lib(
  name = "registration_error",
  src = "registration_error.wings",
  outs = {
    "src/cockpit/wings": "RegistrationError.ts",
    "src/turbine/wings": "registrationerror.go",
  },
)
