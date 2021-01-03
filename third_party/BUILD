package(default_visibility = ["PUBLIC"])

go_get(
  name = "mux",
  get = "github.com/gorilla/mux",
)

go_get(
  name = "sessions",
  get = "github.com/gorilla/sessions",
  deps = [
    ":securecookie"
  ],
)

go_get(
  name = "securecookie",
  get = "github.com/gorilla/securecookie",
)

go_get(
  name = "bcrypt",
  get = "golang.org/x/crypto",
  install = [
    "bcrypt",
    "blowfish",
  ],
)

go_get(
  name = "pq",
  get = "github.com/lib/pq",
  install = [
    ".",
    "oid",
    "scram",
  ],
)

go_get(
  name = "email",
  get = "github.com/jordan-wright/email",
)

go_get(
  name = "uuid",
  get = "github.com/google/uuid",
)
