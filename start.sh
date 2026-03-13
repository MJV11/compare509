#!/usr/bin/env bash
# start.sh — launches FastAPI backend + Vite frontend together
set -e

ROOT="$(cd "$(dirname "$0")" && pwd)"

echo "▶ Starting FastAPI backend on http://localhost:8000 ..."
cd "$ROOT/api"
uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
API_PID=$!

echo "▶ Starting Vite frontend on http://localhost:5173 ..."
cd "$ROOT/web"
npm run dev &
WEB_PID=$!

echo ""
echo "  Backend  → http://localhost:8000"
echo "  Frontend → http://localhost:5173"
echo "  API docs → http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop both."

trap "kill $API_PID $WEB_PID 2>/dev/null" INT TERM
wait
