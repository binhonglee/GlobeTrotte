sh_binary(
    name = 'vscode',
    main = 'vscode.sh',
)

sh_test(
    name = 'golint',
    src = 'golint.sh',
    deps = ['//src/turbine:main'],
)

sh_test(
    name = 'shellcheck',
    src = 'shellcheck.sh',
)
