#!/bin/sh

exec_psql() {
  psql --username="$USER" -w -c "$1"
}

echo "Removing please cache folder..."
if [ "$OS" = "Darwin" ]; then
  rm -rf ~/Library/Caches/please
else
  rm -rf ~/.cache/please
fi

echo "Removing a bunch of files and directories..."
sudo rm -rf .nyc_output coverage dist jest_coverage logs node_modules plz-out third_party/go/BUILD .plz_clean*

echo "Removing generated wings files..."
rm -rf src/cockpit/wings/*.ts src/turbine/wings/*.go

if [ "$1" = "--all" ]; then
  echo "Dropping database"
  exec_psql "DROP DATABASE globetrotte;" || echo "Database does not exist. Skipping..."
else
  exec_psql "DELETE FROM users WHERE email = 'routertest@test.com';"
  exec_psql "DELETE FROM users WHERE email = 'dbinteraction_test@dummyuser.com';"
  exec_psql "DELETE FROM users WHERE email = 'accountDeletionTest@globetrotte.com';"
  exec_psql "DELETE FROM users WHERE email = 'tripsTest1@globetrotte.com';"
  exec_psql "DELETE FROM users WHERE email = 'tripsTest2@globetrotte.com';"
fi

echo "All removal completed successfully!"
echo
echo "Initializing pnpm..."
pnpm i

echo "Generating third party BUILD file for Go..."
./pleasew go_mod

if [ "$1" = "--all" ]; then
  echo
  echo "Creating database..."
  exec_psql "CREATE DATABASE globetrotte;"
fi
