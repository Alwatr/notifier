#!/bin/sh

# Exit immediately if a command exits with a non-zero status.
set -e

# Log the initialization of the database.
if [ -n "${initializeMode:-}" ]; then
  printf "\n\033[1;32m🚀 Initializing...\033[0m\n\n"
  node ./initialize.mjs

  # Freeze the script if in initializeMode.
  printf "\n\n\033[1;32m✅ Initialization done. Waiting for signals...\033[0m\n"

  # Set up signal handler to gracefully exit on SIGTERM/SIGINT
  trap "printf '\n\033[1;33m⚠️  Received signal, exiting...\033[0m\n'; exit 0" TERM INT

  # Wait forever but respond to signals
  while true; do
    sleep 1 & wait $!
  done

  exit 0
fi

# Log the migration of the database.
printf "\n\033[1;32m🔄 Migrating...\033[0m\n\n"
node ./migration.mjs

# Log the start of the application.
printf "\n\033[1;32m🚀 Starting application...\033[0m\n\n"

# Use `exec` to replace the current shell process with the Node.js process.
# This ensures that signals are properly handled by the Node.js application.
exec node ./start.mjs
