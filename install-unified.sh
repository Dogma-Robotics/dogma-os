#!/bin/bash
# DOGMA OS — Full Fix Install
# Run from project root: bash install.sh
set -e

echo "🤖 Installing DOGMA OS fixes..."

cp ~/Downloads/dogma-os/services.ts src/lib/services.ts
echo "  ✅ src/lib/services.ts"

cp ~/Downloads/dogma-os/chat-route.ts src/app/api/chat/route.ts
echo "  ✅ src/app/api/chat/route.ts"

cp ~/Downloads/dogma-os/orchestrate-route.ts src/app/api/orchestrate/route.ts
echo "  ✅ src/app/api/orchestrate/route.ts"

cp ~/Downloads/dogma-os/dashboard-page.tsx src/app/dashboard/page.tsx
echo "  ✅ src/app/dashboard/page.tsx"

# Create generated files directory
mkdir -p public/generated
echo "  ✅ public/generated/ (file storage)"

echo ""
echo "🎉 Done! Changes:"
echo "  • Files now save to public/generated/ (no Vercel Blob needed)"
echo "  • Real HTML reports instead of fake .doc/.pptx"
echo "  • Native web_search for both Chat and Swarm"
echo "  • MCP connections shown in chat panel"
echo "  • Supabase errors won't crash the app"
echo ""
echo "Restart: kill -9 \$(lsof -t -i:3000) 2>/dev/null; rm -rf .next && npm run dev"
