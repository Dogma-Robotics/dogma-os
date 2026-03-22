#!/usr/bin/env python3
"""Patch dashboard/page.tsx for OpenClaw v2 — removes swarm, updates agents"""
import re, sys, os

f = os.path.expanduser('~/dogma-os/src/app/dashboard/page.tsx')
if not os.path.exists(f):
    print('ERROR: cannot find', f); sys.exit(1)

with open(f, 'r') as fh:
    c = fh.read()

print(f'Read {len(c)} chars, {c.count(chr(10))} lines')

# ── 1. Replace AGENTS array ──
old_agents = re.compile(
    r'var AGENTS=\[.*?\];\s*var AGENT_CATEGORIES=\[.*?\];',
    re.DOTALL
)
new_agents = '''var AGENTS=[
  {id:"planner",name:"Planner",icon:"\\u{1F4D0}",color:C.gold,cat:"strategy",desc:"Phased implementation blueprints",access:{shell:true,files:true,browser:true}},
  {id:"architect",name:"Architect",icon:"\\u{1F3D7}",color:C.b,cat:"strategy",desc:"Technology decisions and system design",access:{shell:true,files:true,browser:true}},
  {id:"researcher",name:"Researcher",icon:"\\u{1F50D}",color:C.c,cat:"strategy",desc:"Deep research with real browser access",access:{shell:true,files:true,browser:true}},
  {id:"coder",name:"Coder",icon:"\\u{1F4BB}",color:C.g,cat:"implementation",desc:"Full-stack dev with shell + browser on your machine",access:{shell:true,files:true,browser:true}},
  {id:"data-engineer",name:"Data Eng",icon:"\\u{1F5C4}",color:C.c,cat:"implementation",desc:"Schemas, migrations, SQL",access:{shell:true,files:true,browser:false}},
  {id:"tester",name:"Tester",icon:"\\u{1F9EA}",color:C.r,cat:"quality",desc:"Writes and runs tests on your machine",access:{shell:true,files:true,browser:true}},
  {id:"reviewer",name:"Reviewer",icon:"\\u{1F441}",color:C.a,cat:"quality",desc:"Code review with codebase access (read-only)",access:{shell:true,files:false,browser:false}},
  {id:"security-scanner",name:"Security",icon:"\\u{1F512}",color:C.r,cat:"quality",desc:"npm audit, secret scanning",access:{shell:true,files:false,browser:true}},
  {id:"documenter",name:"Documenter",icon:"\\u{1F4C4}",color:C.b,cat:"operations",desc:"Polished reports and docs as real files",access:{shell:true,files:true,browser:true}},
  {id:"coordinator",name:"Coordinator",icon:"\\u{1F3AF}",color:C.gold,cat:"operations",desc:"Synthesizes multi-agent outputs",access:{shell:true,files:true,browser:false}},
  {id:"devops",name:"DevOps",icon:"\\u{1F680}",color:C.g,cat:"operations",desc:"CI/CD, deployment, Docker",access:{shell:true,files:true,browser:false}},
];
var AGENT_CATEGORIES=[
  {id:"strategy",label:"Strategy",color:C.gold},
  {id:"implementation",label:"Implementation",color:C.g},
  {id:"quality",label:"Quality",color:C.r},
  {id:"operations",label:"Operations",color:C.b},
];'''

if old_agents.search(c):
    c = old_agents.sub(new_agents, c)
    print('  OK replaced AGENTS + AGENT_CATEGORIES')
else:
    print('  WARN: could not find AGENTS pattern')

# ── 2. Replace SWARM_WORKFLOWS ──
old_wf = re.compile(r'var SWARM_WORKFLOWS=\[.*?\];', re.DOTALL)
new_wf = 'var SWARM_WORKFLOWS=[];'
if old_wf.search(c):
    c = old_wf.sub(new_wf, c)
    print('  OK emptied SWARM_WORKFLOWS')

# ── 3. Remove swarm mode tab from tab bar ──
# Find the swarm tab div and replace with empty string
swarm_tab = re.compile(
    r'<div onClick=\{function\(\)\{setMode\("swarm"\);\}\}[^>]*>.*?Swarm</div>',
    re.DOTALL
)
if swarm_tab.search(c):
    c = swarm_tab.sub('', c)
    print('  OK removed Swarm tab')

# ── 4. Remove the entire swarm mode panel ──
# This is between {mode==="swarm"&&<> ... </>}  
# We need to be careful — just comment-disable it by replacing the condition
c = c.replace('mode==="swarm"&&<>', 'false&&<>')
print('  OK disabled swarm panel')

# ── 5. Update sendAgent to include gateway info in response handling ──
# Add gateway state variable after the mode state
mode_line = 'var _mode=useState("chat"),mode=_mode[0],setMode=_mode[1];'
gateway_addition = '''var _mode=useState("chat"),mode=_mode[0],setMode=_mode[1];
var _gwStatus=useState({connected:false,version:"",model:""}),gwStatus=_gwStatus[0],setGwStatus=_gwStatus[1];'''
c = c.replace(mode_line, gateway_addition, 1)
print('  OK added gateway state')

# ── 6. Update chat response handler to capture gateway status ──
old_mcp = 'if(data.mcpConnected&&data.mcpConnected.length>0)setMcpConn(data.mcpConnected);'
new_mcp = 'if(data.gateway)setGwStatus(data.gateway);\n    if(data.mcpConnected&&data.mcpConnected.length>0)setMcpConn(data.mcpConnected);'
c = c.replace(old_mcp, new_mcp, 1)
print('  OK added gateway status capture')

# Write
with open(f, 'w') as fh:
    fh.write(c)

lines = c.count('\n')
print(f'\nDone. {lines} lines written to {f}')
print('Run: npm run build 2>&1 | tail -10')
