from os import paramCount, paramStr
import tables
import wingspkg/core

const header = """
This is a generated file

If you would like to make any changes, please edit the source file instead.
run `plz gen "{SOURCE_FILE}" && plz test --nocache` upon completion.
"""

proc genFiles(filename: string): void =
    var outputFiles: Table[string, string] = fromFile(filename, header)

    for path in outputFiles.keys:
        try:
            writeFile(path, outputFiles[path])
            echo "Successfully generated " & path
        except:
            echo "Failed to generate " & path

proc dryRun(): void =
    const prefix = "src/wings/"
    var files = @[
        "struct/new_user.struct",
        "struct/place.struct",
        "struct/trip.struct",
        "struct/user.struct",
        "enum/city.enum",
    ]

    for file in files:
        genFiles(prefix & file)

proc init(): void =
    if paramCount() < 1:
        dryRun()
        return

    for i in countup(1, paramCount(), 1):
        genFiles(paramStr(i))

init()
