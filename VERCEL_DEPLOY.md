# DOGMA OS v2 — Vercel Deployment Guide

## The Architecture on Vercel

```
Your laptop                          Vercel (cloud)
┌─────────────────────┐    ┌────────────────────────┐
│ OpenClaw Gateway    │    │ Next.js API routes      │
│ localhost:18789     │    │ /api/chat (fallback)    │
│                     │    │ /api/dashboard/summary  │
│ Shell, browser,     │    │ /api/entities           │
│ files, canvas       │    │ /api/commands           │
└──────────▲──────────┘    └────────────▲───────────┘
           │                            │
           │ Chat + tools               │ Auth + data
           │ (primary)                  │ (always)
           │                            │
      ┌────┴────────────────────────────┴───┐
      │          Browser (Dashboard)         │
      │  useOpenClaw() hook decides routing  │
      └─────────────────────────────────────┘

Gateway running → Browser talks to localhost (full computer access)
Gateway down   → Browser talks to Vercel API (text-only, web search)
```

## Step-by-Step Deployment

### 1. Copy new files into your project

```bash
# From your DOGMA OS project root:

# Core library files
cp dogma-v2/src/lib/agents.ts        src/lib/agents.ts
cp dogma-v2/src/lib/openclaw.ts       src/lib/openclaw.ts

# API routes (Vercel-compatible versions)
cp dogma-v2/src/app/api/chat/route.ts src/app/api/chat/route.ts

# Client-side hook (THIS IS THE KEY FILE)
mkdir -p src/hooks
cp dogma-v2/src/hooks/useOpenClaw.ts  src/hooks/useOpenClaw.ts

# OpenClaw workspace (stays on your laptop, not deployed)
cp -r dogma-v2/workspace/ ~/.openclaw/workspaces/dogma/
```

### 2. Wire the hook into the dashboard

In `src/app/dashboard/page.tsx`, at the top of the `Dashboard` component:

```tsx
// Add this import at the top of the file:
import { useOpenClaw } from '@/hooks/useOpenClaw'

// Inside the Dashboard component, add:
var oc = useOpenClaw();
// oc.gateway     → { connected, version, model }
// oc.toolLog     → ToolCall[]
// oc.sessionId   → string | null
// oc.loading     → boolean
// oc.sendMessage → (agentId, message, options) => Promise<ChatResponse>
```

Then replace the `sendAgent` function body:

```tsx
var sendAgent = function() {
  if (!inp.trim() || oc.loading) return;
  var userTxt = inp.trim();
  setInp("");
  setMsgs(function(prev) {
    var n = Object.assign({}, prev);
    n[agentId] = (n[agentId] || []).concat([{ role: "user", text: userTxt }]);
    return n;
  });

  // Build context snapshot
  var dataSnap = "SS:" + D.ss.map(function(s) { return s.name + " " + s.mat + "%"; }).join(",") +
    "|Pilots:" + D.pilots.map(function(p) { return p.name + " " + p.viab + "%"; }).join(",") +
    "|Fin:burn=$" + D.fin.burn + ",runway=" + D.fin.runway + "mo";

  // useOpenClaw decides: gateway (local) or Vercel API (cloud fallback)
  oc.sendMessage(agentId, userTxt, { dataContext: dataSnap, mode: approvalMode })
    .then(function(result) {
      setMsgs(function(prev) {
        var n = Object.assign({}, prev);
        n[agentId] = (n[agentId] || []).concat([{
          role: "ai",
          text: result.text + (result.via === 'vercel' ? '\n\n⚠️ Cloud fallback — no computer access. Start OpenClaw gateway for full capabilities.' : ''),
          files: result.files.map(function(f) { return { name: f.name, url: f.url, icon: "📄", at: nw() }; }),
          toolCalls: result.toolCalls,
        }]);
        return n;
      });
    });
};
```

And replace the gateway indicator with `oc.gateway`:

```tsx
{/* In the header or agent info panel: */}
<div style={{display:"flex",alignItems:"center",gap:4}}>
  <span style={{width:6,height:6,borderRadius:"50%",
    background:oc.gateway.connected?"#2D7A5D":"#8A3333"}}/>
  <span style={{fontSize:10,fontWeight:600,color:oc.gateway.connected?"#2D7A5D":"#8A3333"}}>
    {oc.gateway.connected ? "OpenClaw " + oc.gateway.version : "Cloud mode"}
  </span>
</div>
```

### 3. Push to Vercel

```bash
# Commit
git add -A
git commit -m "feat: OpenClaw v2 integration — browser-direct gateway + cloud fallback"

# Push (triggers Vercel deploy)
git push origin main
```

### 4. Set Vercel environment variables

Go to Vercel Dashboard → your project → Settings → Environment Variables:

| Variable | Value | Notes |
|----------|-------|-------|
| `ANTHROPIC_API_KEY` | `sk-ant-...` | Required for cloud fallback |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | Already set |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` | Already set |
| `SUPABASE_SERVICE_KEY` | `eyJ...` | Already set |

**You do NOT need** `OPENCLAW_*` variables on Vercel — the gateway connection happens from the browser, not from Vercel's servers.

### 5. Start OpenClaw locally (for full capabilities)

```bash
# Install OpenClaw (one time)
sudo npm i -g openclaw@latest

# Configure
openclaw config set model.default claude-sonnet-4-20250514
openclaw config set gateway.mode local

# Start gateway
openclaw gateway run
```

When the gateway is running on your laptop and you open the Vercel-hosted dashboard in your browser, the `useOpenClaw` hook will detect the local gateway and route chat messages through it — giving your agents full computer access.

When the gateway is off (e.g., on your phone, on someone else's computer), the dashboard falls back to the Vercel API route which calls Claude directly — text-only, no execution.

### 6. Verify

Open your Vercel URL. You should see:

- **Gateway running:** Green dot, "OpenClaw v0.x.x", agents can run shell commands
- **Gateway off:** Red dot, "Cloud mode", agents can only reason + web search

## OpenClaw CORS

The browser needs to reach `http://localhost:18789` from your Vercel domain. OpenClaw's gateway allows CORS on loopback by default. If you hit CORS issues:

```bash
openclaw config set gateway.cors.origins "https://your-app.vercel.app,http://localhost:3000"
```

## What Deploys to Vercel vs What Stays Local

| Deploys to Vercel | Stays on your machine |
|---|---|
| `src/lib/agents.ts` (definitions only) | `~/.openclaw/workspaces/dogma/SOUL.md` |
| `src/hooks/useOpenClaw.ts` | `~/.openclaw/workspaces/dogma/.skills/` |
| `src/app/api/chat/route.ts` (fallback) | `~/.openclaw/workspaces/dogma/MEMORY.md` |
| `src/app/api/orchestrate/route.ts` | OpenClaw gateway binary |
| Dashboard UI (page.tsx) | Session transcripts (JSONL) |
| Supabase connection | API keys (in gateway config) |
