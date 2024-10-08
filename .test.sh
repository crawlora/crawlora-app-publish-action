#!/bin/bash
# act push  -j 'test-action' --container-architecture linux/amd64 --rm -w

# npm run package:watch

source .env

rm -rf dist

npm run package

npx concurrently "npm run package:watch" "act push --secret-file .env -j 'test-action' --container-architecture linux/amd64 --rm -w"