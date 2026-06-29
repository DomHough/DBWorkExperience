#!/usr/bin/env bash

set -euo pipefail

corepack enable
pnpm install

if [[ -n "${CODEX_AUTH_JSON_B64:-}" ]]; then
  mkdir -p "${HOME}/.codex"
  printf '%s' "${CODEX_AUTH_JSON_B64}" | base64 --decode > "${HOME}/.codex/auth.json"
  chmod 600 "${HOME}/.codex/auth.json"
fi
