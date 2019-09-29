subinclude('//build_defs/nim')
package(default_visibility = ['PUBLIC'])

go_get(
    name = 'mux',
    get = 'github.com/gorilla/mux',
    revision = 'ed099d42384823742bba0bf9a72b53b55c9e2e38'
)

go_get(
    name = 'sessions',
    get = 'github.com/gorilla/sessions',
    revision = '56c33e9da484d617e23f395ecec61db32d99dcf3',
    deps = [
        ':securecookie'
    ],
)

go_get(
    name = 'securecookie',
    get = 'github.com/gorilla/securecookie',
    revision = '629b6af17341019b261eab06da74c418942918d9',
)

go_get(
    name = 'bcrypt',
    get = 'golang.org/x/crypto',
    install = [
        'bcrypt',
        'blowfish',
    ],
    revision = '4def268fd1a49955bfb3dda92fe3db4f924f2285',
)

go_get(
    name = 'pq',
    get = 'github.com/lib/pq',
    install = [
        '.',
        'oid',
        'scram',
    ],
    revision = 'bc6a3c0594130b1e34005880bc600b6d3f49fa7f',
)

nimble_install(
    name = 'wings',
    pkg_name = 'wings',
    revision = '#028a1a6650f7a81aafd75f471908b2537c5200ab',
)
