#!/bin/sh

FORMAT_FILE="config/goformat"
LOCATION=${PWD##*/}
FOLDERS="src/turbine"

if [ "$LOCATION" = "golint._test" ]; then
    cd "../../../../" || exit 1
fi

if [ $# -ne 0 ]; then
    for file in "$@"; do 
        echo "$file"
        format "$file"
    done

    exit
fi

OUT=""

for FOLDER in $FOLDERS; do
    FILES=$(find "$FOLDER" -type f -name '*.go')
    for f in $FILES; do
        LINT=$(goformat -style $FORMAT_FILE -w "$f")
        
        if [ "$LINT" != "" ]; then
            OUT='\n'"$LINT"
        fi
    done
done

if [ "$OUT" != "" ]; then
    echo "$OUT"
    exit 1
fi
