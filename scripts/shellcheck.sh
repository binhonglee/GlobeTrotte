#!/bin/sh

cd "$(pwd | awk -F'plz-out' '{print $1}')" || exit 1

OUT=$(shellcheck scripts/*.sh)

if [ "$OUT" != "" ]; then
    echo "$OUT"
    exit 1
fi
