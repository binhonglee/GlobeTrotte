package(default_visibility = ['PUBLIC'])

go_get(
    name = 'mux',
    get = 'github.com/gorilla/mux',
    revision = '00bdffe0f3c77e27d2cf6f5c70232a2d3e4d9c15'
)

go_get(
    name = 'sessions',
    get = 'github.com/gorilla/sessions',
    revision = '4355a998706e83fe1d71c31b07af94e34f68d74a',
    deps = [
        ':securecookie'
    ],
)

go_get(
    name = 'securecookie',
    get = 'github.com/gorilla/securecookie',
    revision = '61b4ad17eb88d0d1118560d1101176279be2bc88',
)

go_get(
    name = 'bcrypt',
    get = 'golang.org/x/crypto',
    install = [
        'bcrypt',
        'blowfish',
    ],
    revision = '8986dd9e96cf0a6f74da406c005ba3df38527c04',
)

go_get(
    name = 'pq',
    get = 'github.com/lib/pq',
    install = [
        '.',
        'oid',
        'scram',
    ],
    revision = '3427c32cb71afc948325f299f040e53c1dd78979',
)
