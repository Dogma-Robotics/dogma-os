# DOGMA OS v3 Architecture

## Overview
Modular Next.js dashboard for DOGMA Robotics. Each node = Monday-like board with DB backing.

## Stack
- Next.js 16 (App Router, Turbopack)
- Supabase (Postgres, Auth, Realtime)
- OpenClaw gateway (localhost:18789, /v1/chat/completions)
- Claude API fallback (Anthropic)
- Three.js (3D visualization)
- Dark theme only

## Key Files
- `src/lib/types.ts` — All TypeScript interfaces
- `src/lib/theme.ts` — Dark theme colors
- `src/lib/nodes.ts` — Node tree config + column definitions
- `src/lib/agents.ts` — 11 agent definitions
- `src/hooks/useOpenClaw.ts` — Gateway health + chat proxy
- `src/app/api/chat/route.ts` — OpenClaw proxy + Claude fallback
- `MIGRATION.md` — Full rebuild plan with 5 phases
