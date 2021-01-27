#!/bin/sh

OS=$(uname -s)

echo "Removing 'cypress'..."
rm -rf cypress
echo "Removing 'node_modules'..."
rm -rf node_modules
echo "Removing parcel cache..."
rm -rf .cache
echo "Removing please cache folder..."
if [ "$OS" = "Darwin" ]; then
  rm -rf ~/Library/Caches/please
else
  rm -rf ~/.cache/please
fi
echo "Removing 'plz-out'..."
rm -rf plz-out
echo "Removing log files..."
rm -rf logs
echo "Removing '.nyc_output'..."
rm -rf .nyc_output
echo "Removing 'coverage'..."
rm -rf coverage
echo "Removing 'dist'..."
rm -rf dist
echo "Removing generated wings files..."
rm -rf src/cockpit/wings/*.ts src/turbine/wings/*.go

if [ "$1" = "--all" ]; then
  echo "Dropping database"
  psql --username="$USER" -w -c "DROP DATABASE globetrotte;" || echo "Database does not exist. Skipping..."
fi

echo "All removal completed successfully!"
echo
echo "Initializing pnpm..."
pnpm i

if [ "$1" = "--all" ]; then
  echo
  echo "Creating database..."
  psql --username="$USER" -w -c "CREATE DATABASE globetrotte;"
fi
