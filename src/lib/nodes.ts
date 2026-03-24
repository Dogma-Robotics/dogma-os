export interface ColumnDef {
  key: string; label: string; type: 'text'|'number'|'progress'|'status'|'priority'|'date'|'person'|'tags'
  editable: boolean; width?: number
}
export interface NodeConfig {
  id: string; label: string; icon: string; description: string
  children: NodeConfig[]; dbTable: string; columns: ColumnDef[]
}

/* ── Column Templates ─────────────────────────────────────────────── */

const ssCols: ColumnDef[] = [
  {key:'name',label:'Name',type:'text',editable:true,width:180},
  {key:'description',label:'Description',type:'text',editable:true,width:250},
  {key:'maturity_level',label:'Maturity',type:'progress',editable:true,width:120},
  {key:'status',label:'Status',type:'status',editable:true,width:100},
  {key:'criticality',label:'Criticality',type:'priority',editable:true,width:100},
  {key:'owner',label:'Owner',type:'person',editable:true,width:100},
]

const controlCols: ColumnDef[] = [
  {key:'name',label:'Name',type:'text',editable:true,width:180},
  {key:'description',label:'Description',type:'text',editable:true,width:250},
  {key:'rate_hz',label:'Rate (Hz)',type:'number',editable:true,width:100},
  {key:'status',label:'Status',type:'status',editable:true,width:100},
  {key:'criticality',label:'Criticality',type:'priority',editable:true,width:100},
  {key:'owner',label:'Owner',type:'person',editable:true,width:100},
]

const appCols: ColumnDef[] = [
  {key:'name',label:'Name',type:'text',editable:true,width:180},
  {key:'description',label:'Description',type:'text',editable:true,width:250},
  {key:'status',label:'Status',type:'status',editable:true,width:100},
  {key:'user_role',label:'User Role',type:'text',editable:true,width:120},
  {key:'criticality',label:'Criticality',type:'priority',editable:true,width:100},
]

const taskCols: ColumnDef[] = [
  {key:'title',label:'Task',type:'text',editable:true,width:220},
  {key:'description',label:'Description',type:'text',editable:true,width:200},
  {key:'progress',label:'Progress',type:'progress',editable:true,width:120},
  {key:'status',label:'Status',type:'status',editable:true,width:100},
  {key:'priority',label:'Priority',type:'priority',editable:true,width:100},
  {key:'owner',label:'Owner',type:'person',editable:true,width:100},
  {key:'due_date',label:'Due',type:'date',editable:true,width:100},
]

const pilotCols: ColumnDef[] = [
  {key:'company_name',label:'Company',type:'text',editable:true,width:180},
  {key:'stage',label:'Stage',type:'status',editable:true,width:120},
  {key:'viability_score',label:'Viability',type:'progress',editable:true,width:120},
  {key:'champion_name',label:'Champion',type:'person',editable:true,width:120},
  {key:'risk_level',label:'Risk',type:'priority',editable:true,width:100},
]

const investorCols: ColumnDef[] = [
  {key:'name',label:'Firm',type:'text',editable:true,width:180},
  {key:'stage',label:'Stage',type:'status',editable:true,width:120},
  {key:'check_size',label:'Check Size',type:'text',editable:true,width:100},
  {key:'contact',label:'Contact',type:'person',editable:true,width:120},
]

const incidentCols: ColumnDef[] = [
  {key:'title',label:'Incident',type:'text',editable:true,width:220},
  {key:'severity',label:'Severity',type:'priority',editable:true,width:100},
  {key:'status',label:'Status',type:'status',editable:true,width:100},
  {key:'root_cause',label:'Root Cause',type:'text',editable:true,width:200},
  {key:'owner',label:'Owner',type:'person',editable:true,width:100},
]

const financeCols: ColumnDef[] = [
  {key:'month',label:'Month',type:'date',editable:false,width:100},
  {key:'burn_rate',label:'Burn Rate',type:'number',editable:true,width:100},
  {key:'runway_months',label:'Runway',type:'number',editable:true,width:100},
  {key:'cash_balance',label:'Cash',type:'number',editable:true,width:100},
]

const milestoneCols: ColumnDef[] = [
  {key:'title',label:'Milestone',type:'text',editable:true,width:220},
  {key:'progress',label:'Progress',type:'progress',editable:true,width:120},
  {key:'due_date',label:'Due',type:'date',editable:true,width:100},
  {key:'status',label:'Status',type:'status',editable:true,width:100},
  {key:'owner',label:'Owner',type:'person',editable:true,width:100},
]

const supplyChainCols: ColumnDef[] = [
  {key:'item',label:'Item',type:'text',editable:true,width:200},
  {key:'vendor',label:'Vendor',type:'text',editable:true,width:150},
  {key:'status',label:'Status',type:'status',editable:true,width:100},
  {key:'lead_time',label:'Lead Time',type:'text',editable:true,width:100},
  {key:'cost',label:'Cost',type:'number',editable:true,width:80},
]

/* ── Helper ───────────────────────────────────────────────────────── */

const ss = (id:string, label:string, icon:string, desc:string, children:NodeConfig[]=[]): NodeConfig =>
  ({id,label,icon,description:desc,dbTable:'subsystems',columns:ssCols,children})

const ctrl = (id:string, label:string, icon:string, desc:string, children:NodeConfig[]=[]): NodeConfig =>
  ({id,label,icon,description:desc,dbTable:'subsystems',columns:controlCols,children})

const app = (id:string, label:string, icon:string, desc:string, children:NodeConfig[]=[]): NodeConfig =>
  ({id,label,icon,description:desc,dbTable:'subsystems',columns:appCols,children})

/* ── NODE TREE ────────────────────────────────────────────────────── */

export const NODE_TREE: NodeConfig[] = [

  /* ================================================================
     GROUP 1 — Identity & Philosophy (nodes 1-4)
     ================================================================ */
  {id:'group-identity',label:'Identity & Philosophy',icon:'\u{1F3DB}',description:'Core identity, philosophy, naming, and product architecture',dbTable:'subsystems',columns:ssCols,children:[
    ss('identity-nuclear','Identity Nuclear','\u{1F4A0}','Project name, nuclear definition, mission, vision, founding principles'),
    ss('philosophy','Philosophy & Conceptual Framework','\u{1F4DC}','Foundational thesis, science-art-philosophy integration, symbolic narrative'),
    ss('naming-semantics','Naming, Semantics & Language','\u{1F520}','Dual naming system, etymological roots, language usage guide'),
    ss('product-architecture','Product Architecture','\u{1F3D7}','Modular hierarchy (hand, wrist, arm, humanoid), versions, configurations'),
  ]},

  /* ================================================================
     GROUP 2 — Engineering (nodes 5-8)
     ================================================================ */
  {id:'group-engineering',label:'Engineering',icon:'\u{1F527}',description:'Mechanical engineering, sensing, actuation, and specifications',dbTable:'subsystems',columns:ssCols,children:[
    ss('hand-engineering','Hand Engineering','\u{270B}','27-DOF biomimetic hand structure and mechanisms',[
      ss('finger-assembly','Finger Assembly','\u{1F446}','Per-finger McKibben actuator modules'),
      ss('palm-structure','Palm Structure','\u{1F590}','Rigid palm with sensor mounting'),
      ss('wrist-assembly','Wrist Assembly','\u{1F4AA}','3-DOF wrist rotation unit'),
      ss('mckibben-actuators','McKibben Actuators','\u{1F4A8}','Braided pneumatic artificial muscles at 4 bar'),
      ss('tendons','Tendons','\u{1F9F5}','1:1 muscle-tendon transmission system'),
      ss('tactile-sensors','Tactile Sensors','\u{1F91A}','14 tactile sensors, donut-shaped air pressure'),
    ]),
    ss('arm-engineering','Arm Engineering','\u{1F9BE}','6-DOF fully actuated arm, 1m reach, 15 kg payload'),
    ss('sensing-actuation-control','Sensing, Actuation & Control','\u{1F4E1}','Tactile + proprioception sensing and pneumatic actuation',[
      ss('tactile-sensing','Tactile Sensing','\u{1F91A}','Real-time force feedback from tactile array'),
      ss('proprioception','Proprioception','\u{1F9ED}','State estimation without joint encoders'),
      ss('pneumatic-actuation','Pneumatic Actuation','\u{2699}','McKibben muscles at 4 bar operating pressure'),
      ss('sensor-fusion','Sensor Fusion','\u{1F9E0}','EWMA smoothing + multi-modal fusion'),
    ]),
    ss('specifications','Specifications & Performance','\u{1F4CA}','20 DOF hand, 6 DOF arm, 1:1 human replica, performance metrics'),
  ]},

  /* ================================================================
     GROUP 3 — Business (nodes 9-12)
     ================================================================ */
  {id:'group-business',label:'Business',icon:'\u{1F4BC}',description:'Economics, market, competition, and value proposition',dbTable:'subsystems',columns:ssCols,children:[
    ss('costs-pricing','Costs, Pricing & Economics','\u{1F4B2}','$5K arm-hand, $18K humanoid, cost breakdown'),
    {id:'market-clients',label:'Market, Clients & Applications',icon:'\u{1F3AF}',description:'Manufacturing, medicine, research, fine assembly pilots',dbTable:'pilots',columns:pilotCols,children:[]},
    ss('benchmarks-competition','Benchmarks & Competition','\u{1F3C1}','Shadow Hand, Dactyl, Tesla Optimus, Atlas comparisons'),
    ss('differentiators','Differentiators & Value Proposition','\u{1F48E}','Biomimetic musculoskeletal, tendon-force control, 1:1 anatomy, dual narrative'),
  ]},

  /* ================================================================
     GROUP 4 — Brand & Documentation (nodes 13-20)
     ================================================================ */
  {id:'group-brand-docs',label:'Brand & Documentation',icon:'\u{1F4D6}',description:'Branding, documentation, roadmap, governance',dbTable:'subsystems',columns:ssCols,children:[
    ss('branding-narrative','Branding, Narrative & Tone','\u{1F3A8}','Sober academic tone, Latin/Greek/Hebrew roots, visual guide'),
    ss('documentation','Documentation & Knowledge Base','\u{1F4DA}','Foundational ontology, engineering docs, control docs, HMI docs'),
    {id:'roadmap-versions',label:'Roadmap, Versions & Expansion',icon:'\u{1F5FA}',description:'V1/V2 roadmap, hand to humanoid expansion, Control OS v3',dbTable:'milestones',columns:milestoneCols,children:[]},
    ss('community-education','Community, Education & Collaborations','\u{1F393}','Academic potential, industrial pilots, research collaborations'),
    ss('risks-validations','Risks, Validations & Claims','\u{26A0}','Unvalidated claims, conversational benchmarks, technical/market risks'),
    ss('open-questions','Open Questions & Missing Data','\u{2753}','Sensor counts, McKibben type, DOF discrepancies'),
    ss('sources-traceability','Sources, Traceability & Confidence','\u{1F50D}','Certainty markers, corpus source tracking'),
    ss('data-governance','Data Governance & Maintenance','\u{1F6E1}','Data validation rules, update protocols, maintenance'),
  ]},

  /* ================================================================
     GROUP 5 — Control Architecture (nodes 21-27)
     ================================================================ */
  {id:'group-control',label:'Control Architecture',icon:'\u{1F9E9}',description:'M0-M9 hierarchy, state estimation, safety, digital twin, policies, RT software, simulation',dbTable:'subsystems',columns:controlCols,children:[
    ctrl('control-modules','Control Architecture M0-M9','\u{1F3DB}','Hierarchical control from Safety (1-5kHz) to Meta-Supervisor (0.1Hz)',[
      ctrl('m0-safety','M0 Safety','\u{1F6D1}','Hardware safety layer, 1-5 kHz'),
      ctrl('m1-pressure','M1 Pressure','\u{1F4A7}','Pressure regulation loop, 1 kHz'),
      ctrl('m2-force-impedance','M2 Force / Impedance','\u{1F4AA}','Force and impedance control, 500 Hz'),
      ctrl('m3-proprioception','M3 Proprioception','\u{1F9ED}','Joint state estimation, 200 Hz'),
      ctrl('m4-vision','M4 Vision','\u{1F441}','Visual perception pipeline, 30-60 Hz'),
      ctrl('m5-fusion','M5 Fusion','\u{1F504}','Multi-modal sensor fusion, 100 Hz'),
      ctrl('m6-reflex','M6 Reflex','\u{26A1}','Reflexive safety responses, 500 Hz'),
      ctrl('m7-policy','M7 Policy','\u{1F9E0}','Learned manipulation policies, 10-50 Hz'),
      ctrl('m8-language','M8 Language','\u{1F4AC}','Natural language command interface, 1-10 Hz'),
      ctrl('m9-meta-supervisor','M9 Meta-Supervisor','\u{1F451}','System-level orchestrator, 0.1-1 Hz'),
    ]),
    ctrl('state-estimation','State Estimation & Fusion','\u{1F4C8}','BUS SENSORS, BUS STATE signal processing and state estimation'),
    ctrl('safety-reflexes','Safety, Reflexes & Limits','\u{1F6E1}','BUS LIMITS, emergency stops, reflex arcs'),
    ctrl('digital-twin','Digital Twin & Dynamics','\u{1F465}','Physics simulation, dynamic model, real-time mirror'),
    ctrl('policies-active-inference','Policies, Active Inference & Skills','\u{1F916}','Active Inference framework, learned skills, policy execution'),
    ctrl('realtime-software','Real-Time Software & Compute','\u{1F5A5}','RT kernel, compute allocation, latency budgets'),
    ctrl('simulation-dataset','Simulation, Dataset & Sim-to-Real','\u{1F3AE}','Sim environments, training datasets, domain transfer'),
  ]},

  /* ================================================================
     GROUP 6 — Application & Operations (nodes 28-34)
     ================================================================ */
  {id:'group-application',label:'Application & Operations',icon:'\u{1F4F1}',description:'Control app, HMI, ROS Bridge, skills, teaching, data, integrations',dbTable:'subsystems',columns:appCols,children:[
    app('control-app-hmi','Control Application & HMI','\u{1F3AE}','DOGMA Control OS v1.0, React + RosBridge WebSocket'),
    app('digital-product','Digital Product & User Flows','\u{1F5A5}','13 functional pages across Operator/Engineer/Admin roles',[
      app('page-command-center','Command Center','\u{1F4CA}','System-wide dashboard and status overview'),
      app('page-live-view','Live View','\u{1F4F9}','Real-time 3D hand/arm visualization'),
      app('page-manual-control','Manual Control','\u{1F579}','Direct joint and muscle control interface'),
      app('page-ai-planner','AI Planner','\u{1F916}','AI-driven task planning and execution'),
      app('page-arm-planner','Arm Planner','\u{1F4D0}','Arm trajectory planning and IK solver'),
      app('page-skills-library','Skills Library','\u{1F4DA}','Reusable manipulation skill repository'),
      app('page-run-builder','Run Builder','\u{1F3D7}','Compose and sequence skill runs'),
      app('page-teleop','Teleop','\u{1F3AE}','Teleoperation and remote control interface'),
      app('page-calibration-lab','Calibration Lab','\u{1F52C}','Sensor and actuator calibration tools'),
      app('page-data-replay','Data Replay','\u{23EA}','Historical run playback and analysis'),
      app('page-safety-diagnostics','Safety Diagnostics','\u{1F6E1}','Safety system monitoring and diagnostics'),
      app('page-settings','Settings','\u{2699}','System configuration and user preferences'),
    ]),
    app('ros-bridge','ROS Bridge & Connectivity','\u{1F504}','ROS 2 Jazzy, rosbridge WebSocket, topic management'),
    {id:'skills-runs',label:'Skills, Runs & Automation',icon:'\u{1F3C3}',description:'Skill definitions, run sequences, automation workflows',dbTable:'tasks',columns:taskCols,children:[]},
    app('teaching-teleop','Teaching, Teleop & Demonstration Learning','\u{1F91D}','Learning from demonstration, kinesthetic teaching, teleop capture'),
    app('data-replay-exports','Data, Replay & Exports','\u{1F4BE}','Data logging, replay, export formats'),
    app('enterprise-integrations','Enterprise Integrations & Ecosystem','\u{1F310}','MES, ERP, cloud connectors, API gateway'),
  ]},

  /* ================================================================
     GROUP 7 — Operations (existing Supabase tables)
     ================================================================ */
  {id:'group-operations',label:'Operations',icon:'\u{1F3E2}',description:'Operational data backed by dedicated Supabase tables',dbTable:'subsystems',columns:ssCols,children:[
    {id:'tasks',label:'Tasks',icon:'\u{1F4CB}',description:'Engineering and business task tracker',dbTable:'tasks',columns:taskCols,children:[]},
    {id:'pilots',label:'Pilots',icon:'\u{1F3ED}',description:'Manufacturing pilot partnerships',dbTable:'pilots',columns:pilotCols,children:[]},
    {id:'investors',label:'Investors',icon:'\u{1F4B0}',description:'Fundraising pipeline',dbTable:'investors',columns:investorCols,children:[]},
    {id:'incidents',label:'Incidents',icon:'\u{26A0}',description:'Issue and incident tracker',dbTable:'incidents',columns:incidentCols,children:[]},
    {id:'finance',label:'Finance',icon:'\u{1F4B5}',description:'Burn rate, runway, BOM costs',dbTable:'finance_snapshots',columns:financeCols,children:[]},
    {id:'milestones',label:'Milestones',icon:'\u{1F3C6}',description:'Key deliverables and dates',dbTable:'milestones',columns:milestoneCols,children:[]},
    {id:'supply-chain',label:'Supply Chain',icon:'\u{1F69A}',description:'Vendors, parts, procurement',dbTable:'supply_chain',columns:supplyChainCols,children:[]},
  ]},
]

/* ── Recursive node finder ────────────────────────────────────────── */

export function findNode(id: string, nodes: NodeConfig[] = NODE_TREE): NodeConfig | null {
  for (const n of nodes) {
    if (n.id === id) return n
    if (n.children.length > 0) {
      const f = findNode(id, n.children)
      if (f) return f
    }
  }
  return null
}
