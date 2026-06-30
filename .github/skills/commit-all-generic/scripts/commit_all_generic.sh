#!/usr/bin/env bash

set -euo pipefail

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Not inside a git repository." >&2
  exit 1
fi

git add -A

if git diff --cached --quiet; then
  echo "Nothing to commit."
  exit 0
fi

git commit -m "chore: update files"
