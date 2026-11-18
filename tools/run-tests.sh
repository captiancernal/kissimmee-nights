#!/usr/bin/env bash
# Runs every simulation test. Each prints its own results; a crash stops the run.
set -euo pipefail
cd "$(dirname "$0")/.."
tools/extract.sh
for t in tests/*.js; do
  [ "$(basename "$t")" = harness.js ] && continue
  [ "$(basename "$t")" = g.js ] && continue
  echo "=== $t"; timeout 600 node "$t" | tail -25
done
