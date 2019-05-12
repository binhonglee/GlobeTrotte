#!/bin/sh
dir=".vscode"
file="settings.json"
if [ -d "$dir" ]; then
    if [ -f "$dir/$file" ]; then
        echo "'settings.json' already exist in '.vscode'. Please remove it first and try again."
        exit 1
    fi
else
    mkdir $dir
fi

gopath=$(pwd)"/plz-out/go"
cd $dir || exit 1
touch 'settings.json'
cat << EOF >> settings.json
{
    "editor.autoIndent": true,
    "editor.detectIndentation": false,
    "editor.insertSpaces": true,
    "editor.tabSize": 4,
    "eslint.packageManager": "pnpm",
    "files.insertFinalNewline": true,
    "files.watcherExclude": {
        "**/.git/**": true,
        "**/enums/**": true,
        "**/node_modules/*/**": true,
        "**/plz-out/**": true,
        "**/structs/**": true,
    },
    "go.inferGopath": false,
    "go.formatTool": "goformat",
    "go.formatFlags": ["-style config/goformat"],
    "go.gopath": "$gopath:$gopath/src",
    "typescript.validate.enable": false,
    "vetur.format.defaultFormatter.ts": "vscode-typescript",
}
EOF

echo "'$dir/$file' is created. You might need to restart your VSCode for it to take effect."
