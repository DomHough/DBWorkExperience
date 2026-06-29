#!/usr/bin/env bash

set -euo pipefail

if ! command -v codex >/dev/null 2>&1; then
  npm install -g @openai/codex >/tmp/db-work-experience-codex-install.log 2>&1
fi

if ! lsof -tiTCP:5173 -sTCP:LISTEN >/dev/null 2>&1; then
  nohup pnpm run dev -- --host 0.0.0.0 >/tmp/db-work-experience-vite.log 2>&1 &
fi

if [[ ! -f "${HOME}/.codex/auth.json" ]]; then
  cat <<EOF

Codex is installed but not authenticated yet.
Run this in the terminal:
codex login --device-auth

Codex install log:
/tmp/db-work-experience-codex-install.log
EOF
fi

if [[ -n "${CODESPACES:-}" && -n "${CODESPACE_NAME:-}" && -n "${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN:-}" ]]; then
  cat <<EOF

Codespaces Codex auth callback:
https://${CODESPACE_NAME}-1455.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}/auth/callback

If Codex sign-in redirects to http://localhost:1455/auth/callback?... in the browser,
replace the base URL with the forwarded host above and open that URL instead.

Vite dev server log:
/tmp/db-work-experience-vite.log
EOF
fi
