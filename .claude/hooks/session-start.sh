#!/bin/bash
# SessionStart hook for Claude Code on the web.
# 1. Installs project dependencies so dev/build/lint work in remote sessions.
# 2. Installs the Superpowers plugin (obra/superpowers) so it persists across
#    ephemeral web sessions.
#
# NOTE: The Superpowers install clones github.com/obra/superpowers-marketplace.
# That requires the environment's network policy to allow GitHub egress beyond
# this repo. If the policy blocks it, the plugin step is skipped gracefully and
# the session still starts normally — widen the network policy to enable it.
set -uo pipefail

# Only run in Claude Code on the web (remote) environment.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}"

# --- 1. Project dependencies -------------------------------------------------
if [ -f "$PROJECT_DIR/package.json" ]; then
  echo "[session-start] Installing npm dependencies…"
  npm install --prefix "$PROJECT_DIR" --no-audit --no-fund
fi

# --- 2. Superpowers plugin ---------------------------------------------------
if command -v claude >/dev/null 2>&1; then
  echo "[session-start] Ensuring Superpowers plugin is installed…"
  # Idempotent: 'marketplace add' / 'install' are no-ops if already present.
  # Tolerant: a network-policy denial (403) must not fail session startup.
  if claude plugin marketplace add obra/superpowers-marketplace 2>&1; then
    claude plugin install superpowers@superpowers-marketplace --scope project 2>&1 \
      || echo "[session-start] WARN: Superpowers install failed (see output above)."
  else
    echo "[session-start] WARN: Could not reach obra/superpowers-marketplace."
    echo "[session-start]       This usually means the environment's network policy"
    echo "[session-start]       blocks GitHub egress. Widen it to allow Superpowers."
  fi
else
  echo "[session-start] WARN: 'claude' CLI not found; skipping Superpowers install."
fi

exit 0
