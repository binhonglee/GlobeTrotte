#!/bin/sh

STATUS=$(git status --porcelain)
if [ "$STATUS" != "" ]; then
    echo "$STATUS"
    echo
    echo "Some files are changed after running tests."
    echo "This is most probably due to not testing / linting locally before commiting the changes."
    git --no-pager diff
    exit 1
fi
