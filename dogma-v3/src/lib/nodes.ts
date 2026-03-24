export interface ColumnDef {
  key: string; label: string; type: 'text'|'number'|'progress'|'status'|'priority'|'date'|'person'|'tags'
  editable: boolean; width?: number
}
export interface NodeConfig {
  id: string; label: string; icon: string; description: string
  children: NodeConfig[]; dbTable: string; columns: ColumnDef[]
}
const taskCols: ColumnDef[] = [
  {key:'title',label:'Task',type:'text',editable:true,width:220},
  {key:'description',label:'Description',type:'text',editable:true,width:200},
  {key:'progress',label:'Progress',type:'progress',editable:true,width:120},
  {key:'status',label:'Status',type:'status',editable:true,width:100},
  {key:'priority',label:'Priority',type:'priority',editable:true,width:100},
  {key:'owner',label:'Owner',type:'person',editable:true,width:100},
  {key:'due_date',label:'Due',type:'date',editable:true,width:100},
]
const ssCols: ColumnDef[] = [
  {key:'name',label:'Name',type:'text',editable:true,width:180},
  {key:'description',label:'Description',type:'text',editable:true,width:250},
  {key:'maturity_level',label:'Maturity',type:'progress',editable:true,width:120},
  {key:'status',label:'Status',type:'status',editable:true,width:100},
  {key:'criticality',label:'Criticality',type:'priority',editable:true,width:100},
  {key:'owner',label:'Owner',type:'person',editable:true,width:100},
]
export const NODE_TREE: NodeConfig[] = [
  {id:'subsystems',label:'Subsystems',icon:'\u{1F9F0}',description:'Hardware & software subsystem maturity',dbTable:'subsystems',columns:ssCols,children:[
    {id:'hand-mechanism',label:'Hand Mechanism',icon:'\u{270B}',description:'27-DOF biomimetic hand structure',dbTable:'subsystems',columns:ssCols,children:[
      {id:'finger-assembly',label:'Finger Assembly',icon:'\u{1F446}',description:'Per-finger McKibben actuator modules',dbTable:'subsystems',columns:ssCols,children:[]},
      {id:'wrist-assembly',label:'Wrist Assembly',icon:'\u{1F4AA}',description:'3-DOF wrist rotation unit',dbTable:'subsystems',columns:ssCols,children:[]},
      {id:'palm-structure',label:'Palm Structure',icon:'\u{1F590}',description:'Rigid palm with sensor mounting',dbTable:'subsystems',columns:ssCols,children:[]},
    ]},
    {id:'actuators',label:'Actuators',icon:'\u{2699}',description:'McKibben pneumatic muscle system',dbTable:'subsystems',columns:ssCols,children:[
      {id:'mckibben-muscles',label:'McKibben Muscles',icon:'\u{1F4A8}',description:'Braided pneumatic artificial muscles',dbTable:'subsystems',columns:ssCols,children:[]},
      {id:'air-supply',label:'Air Supply',icon:'\u{1F32C}',description:'Compressor and valve manifold',dbTable:'subsystems',columns:ssCols,children:[]},
    ]},
    {id:'sensing',label:'Sensing',icon:'\u{1F4E1}',description:'Tactile + proprioception sensing suite',dbTable:'subsystems',columns:ssCols,children:[
      {id:'tactile-sensors',label:'Tactile Sensors',icon:'\u{1F91A}',description:'19 donut-shaped air pressure sensors per finger',dbTable:'subsystems',columns:ssCols,children:[]},
      {id:'sensor-fusion',label:'Sensor Fusion',icon:'\u{1F9E0}',description:'EWMA smoothing + multi-modal fusion',dbTable:'subsystems',columns:ssCols,children:[]},
    ]},
    {id:'control-software',label:'Control Software',icon:'\u{1F4BB}',description:'DOGMA Control OS + M0-M9 architecture',dbTable:'subsystems',columns:ssCols,children:[
      {id:'control-os',label:'Control OS',icon:'\u{1F5A5}',description:'React/ROS 2 dashboard',dbTable:'subsystems',columns:ssCols,children:[]},
      {id:'ros2-pipeline',label:'ROS 2 Pipeline',icon:'\u{1F504}',description:'Jazzy nodes, rosbridge, topics',dbTable:'subsystems',columns:ssCols,children:[]},
    ]},
  ]},
  {id:'tasks',label:'Tasks',icon:'\u{1F4CB}',description:'Engineering and business task tracker',dbTable:'tasks',columns:taskCols,children:[]},
  {id:'pilots',label:'Pilots',icon:'\u{1F3ED}',description:'Manufacturing pilot partnerships',dbTable:'pilots',columns:[
    {key:'company_name',label:'Company',type:'text',editable:true,width:180},
    {key:'stage',label:'Stage',type:'status',editable:true,width:120},
    {key:'viability_score',label:'Viability',type:'progress',editable:true,width:120},
    {key:'champion_name',label:'Champion',type:'person',editable:true,width:120},
    {key:'risk_level',label:'Risk',type:'priority',editable:true,width:100},
  ],children:[]},
  {id:'investors',label:'Investors',icon:'\u{1F4B0}',description:'Fundraising pipeline',dbTable:'investors',columns:[
    {key:'name',label:'Firm',type:'text',editable:true,width:180},
    {key:'stage',label:'Stage',type:'status',editable:true,width:120},
    {key:'check_size',label:'Check Size',type:'text',editable:true,width:100},
    {key:'contact',label:'Contact',type:'person',editable:true,width:120},
  ],children:[]},
  {id:'incidents',label:'Incidents',icon:'\u{26A0}',description:'Issue and incident tracker',dbTable:'incidents',columns:[
    {key:'title',label:'Incident',type:'text',editable:true,width:220},
    {key:'severity',label:'Severity',type:'priority',editable:true,width:100},
    {key:'status',label:'Status',type:'status',editable:true,width:100},
    {key:'root_cause',label:'Root Cause',type:'text',editable:true,width:200},
    {key:'owner',label:'Owner',type:'person',editable:true,width:100},
  ],children:[]},
  {id:'finance',label:'Finance',icon:'\u{1F4B5}',description:'Burn rate, runway, BOM costs',dbTable:'finance_snapshots',columns:[
    {key:'month',label:'Month',type:'date',editable:false,width:100},
    {key:'burn_rate',label:'Burn Rate',type:'number',editable:true,width:100},
    {key:'runway_months',label:'Runway',type:'number',editable:true,width:100},
    {key:'cash_balance',label:'Cash',type:'number',editable:true,width:100},
  ],children:[]},
  {id:'milestones',label:'Milestones',icon:'\u{1F3C6}',description:'Key deliverables and dates',dbTable:'milestones',columns:[
    {key:'title',label:'Milestone',type:'text',editable:true,width:220},
    {key:'progress',label:'Progress',type:'progress',editable:true,width:120},
    {key:'due_date',label:'Due',type:'date',editable:true,width:100},
    {key:'status',label:'Status',type:'status',editable:true,width:100},
    {key:'owner',label:'Owner',type:'person',editable:true,width:100},
  ],children:[]},
  {id:'supply-chain',label:'Supply Chain',icon:'\u{1F69A}',description:'Vendors, parts, procurement',dbTable:'supply_chain',columns:[
    {key:'item',label:'Item',type:'text',editable:true,width:200},
    {key:'vendor',label:'Vendor',type:'text',editable:true,width:150},
    {key:'status',label:'Status',type:'status',editable:true,width:100},
    {key:'lead_time',label:'Lead Time',type:'text',editable:true,width:100},
    {key:'cost',label:'Cost',type:'number',editable:true,width:80},
  ],children:[]},
]
export function findNode(id:string,nodes:NodeConfig[]=NODE_TREE):NodeConfig|null{
  for(const n of nodes){if(n.id===id)return n;if(n.children.length>0){const f=findNode(id,n.children);if(f)return f;}}return null;
}
