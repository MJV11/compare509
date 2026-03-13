#!/usr/bin/env bash
# start.sh — launches Vite dev server
set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"

cd "$ROOT/web"
npm run dev
