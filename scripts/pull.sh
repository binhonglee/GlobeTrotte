#!/bin/sh

STATUS=$(git status --porcelain)
if [ "$STATUS" != "" ]; then
  echo "Uncommitted changes found. Please commit or stash changes before attempting to pull."
  exit 1
fi

git fetch https://github.com/binhonglee/GlobeTrotte main
git rebase FETCH_HEAD
pnpm i
./pleasew wings
./pleasew go_mod
