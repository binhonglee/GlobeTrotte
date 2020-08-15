echo "Removing 'cypress'..."
rm -rf cypress
echo "Removing 'node_modules'..."
rm -rf node_modules
echo "Removing '~/.cache/please'..."
rm -rf ~/.cache/please
echo "Removing 'plz-out'..."
rm -rf plz-out
echo "Removing '.nyc_output'..."
rm -rf .nyc_output
echo "Removing 'coverage'..."
rm -rf coverage
echo "Dropping database"
psql --username="$USER" -w -c "DROP DATABASE globetrotte;"
echo "All removal completed successfully!"
echo
echo "Initializing pnpm..."
pnpm i
echo
echo "Creating database..."
psql --username="$USER" -w -c "CREATE DATABASE globetrotte;"
