#!/usr/bin/env bash
# Pulls the game script out of index.html so the Node tests can run it.
set -euo pipefail
cd "$(dirname "$0")/.."
sed -n '/<script>/,/<\/script>/p' index.html | sed '1d;$d' > tests/g.js
node --check tests/g.js && echo "tests/g.js extracted and syntax-checked"
