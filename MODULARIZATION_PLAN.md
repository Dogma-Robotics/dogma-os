# DOGMA OS — Modularization Plan

## Current state: 2317 lines in a single page.tsx
## Target: ~15 files, each <200 lines

### Proposed structure:
```
src/app/dashboard/
  page.tsx              # Shell: layout, routing, state provider (~150 lines)
  
src/components/
  theme.ts              # C colors, dc(), nw(), dy() (~20 lines)
  ui/
    Tag.tsx             # Tag, Dot, PB, Btn, Sec, Row (~60 lines)
    EList.tsx           # EList, EListItem (~40 lines)
    EText.tsx           # EText (~20 lines)
    NoteBox.tsx         # NoteBox (~30 lines)
    EditTitle.tsx       # EditTitle (~20 lines)
    FileUpload.tsx      # FileUpload, FileCard (~80 lines)
    CreateModal.tsx     # Inline create form (~60 lines)
    CmdPalette.tsx      # Cmd+K overlay (~100 lines)
    LoginModal.tsx      # Login form (~50 lines)
  
  pages/
    MainPage.tsx        # All main node pages (~300 lines)
    SubPage.tsx         # All sub-node pages (~400 lines)
    LeafPage.tsx        # Sub-sub-node page (~40 lines)
  
  panels/
    ChatPanel.tsx       # Chat mode (~200 lines)
    SwarmPanel.tsx      # Swarm mode (~150 lines)
    TimelinePanel.tsx   # Timeline mode (~80 lines)
    MapPanel.tsx        # Workspace map (~100 lines)
    MissionPanel.tsx    # Mission control (~140 lines)
    ApprovalsPanel.tsx  # Approval queue (~80 lines)
  
  three/
    NeuralNet.tsx       # Three.js 3D scene (~200 lines)
    Sidebar.tsx         # Left sidebar tree (~100 lines)
  
  data/
    seed.ts             # seed() data (~100 lines)
    nodes.ts            # NODES, LINKS, getSubs, getSSubs (~60 lines)
    agents.ts           # AGENTS, SWARM_WORKFLOWS (~100 lines)
    helpers.ts          # calcRisks, getBlockedBy, getBlocks (~40 lines)
  
  hooks/
    useData.ts          # D state + localStorage persistence
    useAuth.ts          # Auth state + session
    useCrud.ts          # apiCreate, apiDelete, apiSave, updateField
```

### Priority order:
1. Extract theme.ts + ui/ components (zero risk, pure extraction)
2. Extract data/ (seed, nodes, agents, helpers)
3. Extract panels/ (each mode becomes its own file)
4. Extract pages/ (MainPage, SubPage, LeafPage)
5. Extract hooks/ (state management)
6. Extract three/ (3D scene)
7. Rewrite page.tsx as thin shell importing everything

### Critical fixes during modularization:
- Move useState out of map() calls (Safety/Run config cards)
- Add proper error boundaries per panel
- Add loading states for API calls
- Remove founder_admin fallback in auth.ts
- Add proper TypeScript types for D state shape
