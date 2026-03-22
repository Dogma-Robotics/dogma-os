#!/bin/bash
set -e
echo "Installing DOGMA OS v2..."
cd ~/dogma-os
mkdir -p src/hooks src/app/api/sessions
SRCDIR="$(dirname "$0")"
cp "$SRCDIR/src/hooks/useOpenClaw.ts" src/hooks/useOpenClaw.ts
echo "  OK src/hooks/useOpenClaw.ts"
cp "$SRCDIR/src/lib/agents.ts" src/lib/agents.ts
echo "  OK src/lib/agents.ts"
cp "$SRCDIR/src/app/api/chat/route.ts" src/app/api/chat/route.ts
echo "  OK src/app/api/chat/route.ts"
cp "$SRCDIR/src/app/api/sessions/route.ts" src/app/api/sessions/route.ts
echo "  OK src/app/api/sessions/route.ts"
rm -f src/app/api/orchestrate/route.ts
rmdir src/app/api/orchestrate 2>/dev/null || true
echo "  OK removed orchestrate (swarm)"
echo ""
echo "Done. Now run: npm run build 2>&1 | tail -10"
