// @ts-nocheck
'use client'
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { useOpenClaw } from '@/hooks/useOpenClaw';
import { C } from '@/lib/theme';
import { Dot, Tag, dc } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Btn, Sec, Row, EText, EList, EditTitle, NoteBox } from '@/components/ui/EditableCell';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { MsgText } from '@/components/ui/MsgText';
import { TypeWriter } from '@/components/ui/TypeWriter';
import { TopBar } from '@/components/dashboard/TopBar';
import { ChatPanel } from '@/components/dashboard/ChatPanel';
import { SettingsPanel } from '@/components/dashboard/SettingsPanel';
import { NodeBoard } from '@/components/dashboard/NodeBoard';
import { NODE_TREE, findNode, buildNodes3D, buildLinks3D } from '@/lib/nodes';
import { SEED_DATA } from '@/lib/seed-data';
import KanbanView from '@/components/dashboard/KanbanView';
import FiltersBar from '@/components/dashboard/FiltersBar';
import AutomationsPanel from '@/components/dashboard/AutomationsPanel';
import RelationsPanel from '@/components/dashboard/RelationsPanel';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import NodeTemplates from '@/components/dashboard/NodeTemplates';
import { useNodeData } from '@/hooks/useNodeData';
var THREE = typeof window !== "undefined" ? require("three") : null;
var nw=function(){return new Date().toLocaleString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"});};
var dy=function(){return new Date().toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"});};
function PB({val,w,color}){return <ProgressBar val={val} w={w} color={color}/>;}
function cleanResponse(t){if(!t)return"";var idx=t.indexOf("Error: {");if(idx>0)t=t.slice(0,idx).trim();return t;}
function parseThinking(t){if(!t)return{thinking:"",text:t};var start=t.indexOf(":::thinking\n");var end=t.indexOf(":::thinking_end");if(start>=0&&end>start){return{thinking:t.slice(start+13,end).trim(),text:t.slice(end+16).trim()};}return{thinking:"",text:t};}


// File upload component per node
function FileUpload({nodeId,files,onUpload,onRemove}){
  var nodeFiles=(files[nodeId]||[]);
  var inputRef=useRef(null);
  var handleFile=function(e){
    var f=e.target.files;if(!f||!f.length)return;
    for(var i=0;i<f.length;i++){
      var file=f[i];var reader=new FileReader();
      reader.onload=function(ev){
        onUpload(nodeId,{name:file.name,size:file.size,type:file.type,data:ev.target.result,at:nw()});
      };
      reader.readAsDataURL(file);
    }
    e.target.value="";
  };
  return(<div style={{marginTop:10}}>
    <Sec>Files ({nodeFiles.length})</Sec>
    {nodeFiles.map(function(f,i){return <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 8px",background:C.bg,borderRadius:3,marginBottom:3,border:"1px solid "+C.bd}}>
      <span style={{fontSize:16}}>{f.type&&f.type.indexOf("image")>=0?"\uD83D\uDDBC":f.type&&f.type.indexOf("pdf")>=0?"\uD83D\uDCC4":"\uD83D\uDCC1"}</span>
      <div style={{flex:1}}><div style={{fontSize:13,color:C.tx}}>{f.name}</div><div style={{fontSize:10,color:C.tx3}}>{(f.size/1024).toFixed(1)}KB - {f.at}</div></div>
      {f.type&&f.type.indexOf("image")>=0&&<img src={f.data} style={{width:40,height:40,objectFit:"cover",borderRadius:3,border:"1px solid "+C.bd}}/>}
      <span onClick={function(){onRemove(nodeId,i);}} style={{cursor:"pointer",color:C.tx3,fontSize:14}}>x</span>
    </div>;})}
    <input ref={inputRef} type="file" multiple style={{display:"none"}} onChange={handleFile}/>
    <div onClick={function(){inputRef.current.click();}} style={{padding:"8px 12px",border:"1px dashed "+C.bd,borderRadius:3,textAlign:"center",cursor:"pointer",fontSize:13,color:C.tx3,marginTop:4}}>+ Upload files</div>
  </div>);
}

function seed(){return{
ss:[
{id:"ss1",name:"Bone Structure",mat:82,status:"validated",ver:"v3.2",owner:"Jero",issues:1,lastTest:"Mar 7",d:["Joint tolerance 0.1mm","PLA+ material, optimized for injection molding","10K cycle fatigue tested - all joints passed","27 phalanges across 5 fingers","DFM analysis complete - mold cost estimated $12K","Weight per phalanx: 2.3g average"],risks:["Material fatigue at sustained >45C operation","Injection mold tooling lead time 8 weeks","PLA+ not suitable for food-contact applications"],notes:[{t:"DFM review with Protolabs completed. Ready for quoting.",by:"JM",at:"Mar 5"}]},
{id:"ss2",name:"Tendon Network",mat:68,status:"testing",ver:"v2.8",owner:"Jero",issues:3,lastTest:"Mar 14",d:["Dyneema PE 0.5mm braided line","108 tendon routes mapped across hand","PTFE pulley sleeves on all contact points","Crimped terminations rated to 30N","Max operational tension 25N per tendon","Tendon routing jig designed for repeatability"],risks:["Pulley contact wear observable at 500+ cycles","Routing complexity increases assembly time to 4hr/hand","Dyneema stretch under sustained load not characterized"],notes:[]},
{id:"ss3",name:"Ligament System",mat:55,status:"iterating",ver:"v2.1",owner:"Jero",issues:5,lastTest:"Mar 6",d:["Silicone elastomer bands for passive joint limits","Ecoflex 00-30 Shore A material","Tension calibration per-joint required","Provides natural return force on all joints"],risks:["Stiffness variance 15% batch-to-batch","UV degradation after 6mo exposure","Calibration not yet automated"],notes:[]},
{id:"ss4",name:"McKibben Actuators",mat:74,status:"validated",ver:"v4.0",owner:"Jero",issues:2,lastTest:"Mar 13",d:["6mm outer diameter pneumatic muscle","40 PSI maximum operating pressure","27 actuators per hand assembly","Rubber bladder inner tube","Braided nylon mesh sleeve","Contraction ratio 22% at 40PSI","Response time <50ms to 90% force"],risks:["Single-source bladder supplier in Shenzhen","Fatigue failure observed at 800+ cycles on 3 units","Hysteresis 3% - within spec but monitor"],notes:[{t:"Batch #4 received. 2 units failed incoming QC.",by:"JM",at:"Mar 10"}]},
{id:"ss5",name:"Tactile Sensors",mat:61,status:"testing",ver:"v2.5",owner:"Jero",issues:4,lastTest:"Mar 11",d:["FSR 402 force-sensing resistors","Per-phalanx coverage - 27 sensors total","EWMA smoothing filter in firmware","I2C bus multiplexed via TCA9548A","Range: 0.2N to 20N","Resolution: ~0.1N at 5N midpoint"],risks:["Temperature drift 8% over 4hr at 22-28C","FSR 402 backordered 2 weeks from Interlink","No redundancy - single sensor failure = blind phalanx"],notes:[{t:"Drift confirmed correlating with PCB temp rise.",by:"JM",at:"Mar 11"}]},
{id:"ss6",name:"Wrist Assembly",mat:45,status:"iterating",ver:"v1.9",owner:"Jero",issues:6,lastTest:"Mar 9",d:["2-DOF wrist: flexion/extension + radial/ulnar","Current flexion range: 40deg (target: 65deg)","Central cable passthrough for tendon routing","Coupled ligament mechanism for stability"],risks:["Flexion range 38% below target","Ligament coupling adds unwanted constraint","Cable routing through wrist is assembly bottleneck"],notes:[{t:"EXP-044 failed. Need v2.2 ligament design.",by:"JM",at:"Mar 9"}]},
{id:"ss7",name:"Control M0-M4",mat:78,status:"validated",ver:"v5.1",owner:"Jero",issues:2,lastTest:"Mar 8",d:["Force-first control architecture","Position fallback mode for non-contact moves","1KHz real-time control loop","ROS 2 Jazzy integration via rosbridge","5 grasp primitives implemented","Impedance control on all fingers"],risks:["Latency spikes to 3ms under full sensor load","ROS 2 bridge adds 0.5ms overhead"],notes:[]},
{id:"ss8",name:"Control M5-M9",mat:52,status:"dev",ver:"v3.0",owner:"Jero",issues:8,lastTest:"Mar 3",d:["Predictive grasp planning layer","Sensor fusion input pipeline","Reinforcement learning module prototype","Sim-to-real transfer pipeline (Isaac Gym)","Grasp quality prediction from tactile"],risks:["Sim-to-real gap not quantified","Training data insufficient for generalization","Compute requirements may exceed edge budget"],notes:[]},
{id:"ss9",name:"Firmware",mat:70,status:"testing",ver:"v2.3",owner:"Jero",issues:3,lastTest:"Mar 3",d:["ESP32-S3 dual-core platform","I2C bus master for all sensors","1KHz ADC sampling on force channels","OTA firmware update capability","Watchdog timer for safety","CAN bus interface for arm communication"],risks:["OTA update reliability in production unclear","Memory usage at 78% - limited headroom"],notes:[]},
{id:"ss10",name:"Sensor Fusion",mat:38,status:"dev",ver:"v1.4",owner:"Jero",issues:7,lastTest:"Mar 5",d:["Multi-modal: tactile + force + position + current","Target end-to-end latency: 5ms","Kalman filter for state estimation","Currently measuring 8ms average","3-modality fusion operational","Contact detection confidence: 85%"],risks:["3ms above latency target","Per-unit calibration required","No online recalibration capability"],notes:[]}
],
skills:[
{id:"sk1",name:"Pinch Grasp",success:92,status:"validated",tests:48,lastTest:"Mar 10",protocol:"10 object types (sphere, cylinder, cube, irregular), force range 5-15N, slip detection active, 3 trials per object",gaps:["Small objects <5mm diameter untested","Wet/slippery surfaces not characterized"],notes:[]},
{id:"sk2",name:"Power Grasp",success:96,status:"validated",tests:62,lastTest:"Mar 8",protocol:"Cylinders 40-120mm diameter, 25N sustained force, dynamic force adjustment, hold duration 30s min",gaps:[],notes:[]},
{id:"sk3",name:"Key Grasp",success:68,status:"testing",tests:24,lastTest:"Mar 9",protocol:"Standard key insertion into lock, lateral pinch force 8N, torque application for turning",gaps:["Wrist flexion limits approach angle for horizontal locks","Alignment reliability 72% on first attempt"],notes:[]},
{id:"sk4",name:"Pick-Place",success:88,status:"validated",tests:55,lastTest:"Mar 7",protocol:"Structured bin (sorted) and unstructured bin (random), target speed 12 picks/min, accuracy >95%",gaps:["Unstructured bin accuracy only 78%","Speed drops to 8/min for irregular objects"],notes:[]},
{id:"sk5",name:"Screw Drive",success:45,status:"dev",tests:12,lastTest:"Mar 4",protocol:"M3-M6 machine screws, torque control 0.1-1.5 Nm, alignment verification via force feedback",gaps:["Wrist blocks optimal approach angle for vertical screws","Torque sensing noise floor too high for M3"],notes:[]},
{id:"sk6",name:"Assembly",success:38,status:"dev",tests:8,lastTest:"Mar 1",protocol:"Snap fit connectors, press fit bearings, multi-step assembly sequences up to 5 operations",gaps:["Multi-step sequencing fails at step 3+","Force feedback latency causes overshoot on press fits"],notes:[]}
],
exps:[
{id:"EXP-047",title:"Tendon tension calibration under cyclic load",outcome:"pass",conf:4,date:"Mar 14",notes:[],p:["Load range: 0-25N sinusoidal","Cycles: 500 at 2Hz","Temperature: 22C controlled","Measurement: inline load cell"],conclusion:"All 108 tendons maintained tension within 5% of target after 500 cycles. No observable wear on PTFE sleeves. Crimps held at 30N proof load."},
{id:"EXP-046",title:"McKibben pressure response characterization",outcome:"pass",conf:5,date:"Mar 13",notes:[],p:["Pressure: 0-40 PSI ramp","Response time measurement","Hysteresis quantification"],conclusion:"Response time 42ms to 90% force. Hysteresis 3.1%. Both within spec. Ready for integration testing."},
{id:"EXP-045",title:"Tactile sensor drift over 4hr continuous contact",outcome:"partial",conf:3,date:"Mar 11",notes:[{t:"Drift correlates strongly with PCB temperature rise from 22C to 28C over 4 hours.",by:"JM",at:"Mar 11"}],p:["Duration: 4 hours continuous","Contact: static 10N load","Temp: ambient start 22C, measured 28C at 4hr","Sensor: FSR 402 on phalanx 3"],conclusion:"PARTIAL. Drift exceeds 8% after 2hr mark. Root cause identified as temperature coefficient of FSR resistance. EWMA thermal compensation algorithm designed but not yet implemented."},
{id:"EXP-044",title:"Wrist flexion range with v2.1 ligament",outcome:"fail",conf:4,date:"Mar 9",notes:[{t:"Ligament v2.1 too stiff. Need softer durometer or different geometry.",by:"JM",at:"Mar 9"}],p:["Range: flexion/extension measurement","Ligament: v2.1 Ecoflex 00-30","Load: none (free motion)","Measurement: goniometer"],conclusion:"FAIL. Achieved 40deg flexion vs 65deg target. Ligament v2.1 excessively constrains motion. Recommend redesign with lower durometer (00-20) or reduced cross-section."},
{id:"EXP-043",title:"Force-first grasp on cylinder test set",outcome:"pass",conf:5,date:"Mar 8",notes:[],p:["Objects: 10 cylinders 50-120mm diameter","Force: 5-25N adaptive range","Controller: M0-M4 force-first mode"],conclusion:"All 10 objects grasped successfully on first attempt. Force profiles clean with <5% overshoot. Slip detection triggered correctly on 2 objects."},
{id:"EXP-041",title:"Sensor fusion end-to-end latency",outcome:"partial",conf:3,date:"Mar 5",notes:[],p:["Target latency: 5ms end-to-end","Modalities: tactile + force + position","Fusion: Kalman filter v1.4"],conclusion:"PARTIAL. Measured 8.2ms average, 3.2ms above target. Bottleneck identified in I2C read cycle. Optimization path: batch sensor reads + DMA transfer. Estimated improvement: 2-3ms."}
],
tasks:[
{id:"t1",pct:40,title:"Tactile sensor drift root cause + fix",ws:"R&D",status:"progress",pri:"critical",due:"Mar 16",owner:"Jero",created:"Mar 13",notes:[{t:"Suspect temp coefficient of FSR. Need controlled thermal test.",by:"JM",at:"Mar 14"}],blocked:"",sb:["Build thermal test chamber with Peltier control","Run 4hr baseline at fixed 22C","Implement EWMA thermal compensation in FW","Validate drift <2% over 4hr with compensation"],impact:"Blocks tactile sensor validation -> blocks QC skill -> blocks Modelo and Amazon pilots -> blocks first proposal"},
{id:"t2",pct:60,title:"Finalize pitch deck v3 for Eclipse",ws:"Fund",status:"progress",pri:"high",due:"Mar 15",owner:"Jero",created:"Mar 12",notes:[],blocked:"",sb:["Update traction metrics with latest experiment results","Record 30-second grasp demo video","Add Mexico nearshoring market size slide","Review with Residency mentor"],impact:"Required for Eclipse Ventures meeting on Mar 16. They requested live demo evidence."},
{id:"t3",pct:0,title:"ISO/TS 15066 gap analysis",ws:"Safety",status:"todo",pri:"critical",due:"Mar 18",owner:"Jero",created:"Mar 10",notes:[],blocked:"",sb:["Purchase and download ISO/TS 15066:2016","Map all collaborative robot requirements","Cross-reference with current DOGMA capabilities","Write gap report with remediation timeline"],impact:"Blocks Amazon MX pilot (requires cobot compliance) -> blocks first pilot proposal -> weakens fundraising narrative"},
{id:"t4",pct:0,title:"Order McKibben actuator batch #5",ws:"Builds",status:"todo",pri:"high",due:"Mar 17",owner:"Jero",created:"Mar 14",notes:[],blocked:"",sb:["Finalize updated spec sheet with 500-cycle inspection","Send PO to Shenzhen supplier","Track 4-week shipping timeline"],impact:"Blocks v0.7 Genesis Hand assembly -> blocks 6-skill validation milestone"},
{id:"t5",pct:0,title:"Modelo factory bottleneck analysis",ws:"Pilots",status:"todo",pri:"high",due:"Mar 18",owner:"Jero",created:"Mar 11",notes:[],blocked:"",sb:["Map all bottleneck stations on Line 3","Measure cycle times for palletizing operations","Document conveyor layout and dimensions","Draft preliminary ROI estimate"],impact:"Required for first pilot proposal to Modelo"},
{id:"t6",pct:15,title:"GH-DEV-B actuator #4 replacement",ws:"Fleet",status:"blocked",pri:"medium",due:"Mar 15",owner:"Jero",created:"Mar 12",notes:[],blocked:"Replacement bladders on order. ETA 5 business days from Mar 13.",sb:["Remove failed actuator #4 assembly","Install new bladder","Run 40PSI pressure test for 1hr","Return to service"],impact:"DEV-B offline reduces test throughput by 50%. Blocking tactile drift experiments."},
{id:"t7",pct:0,title:"Validate lateral key grasp skill",ws:"Skills",status:"todo",pri:"high",due:"Mar 19",owner:"Jero",created:"Mar 13",notes:[],blocked:"",sb:["Build key insertion test fixture","Record force profile during insertion","Run 10-trial validation protocol","Document success rate and failure modes"],impact:"Required for 6-skill validation milestone (ms2)"},
{id:"t8",pct:0,title:"Build pilot ROI model template",ws:"Pilots",status:"todo",pri:"high",due:"Mar 20",owner:"Jero",created:"Mar 14",notes:[],blocked:"",sb:["Design spreadsheet with labor cost inputs","Build payback period calculator","Add sensitivity analysis for utilization rate"],impact:"Required template for all pilot proposals"}
],
pilots:[
{id:"p1",name:"Cerveceria Modelo",stage:"Line Analysis",viab:82,roi:"$180K/yr",champ:"Carlos Vega - Operations Director",champStr:"Strong",plant:"GDL Brewery #2",plc:"Siemens S7-1500",pain:"Manual palletizing creates bottleneck on Line 3. 3 operators per shift, high turnover. QC inconsistency on final inspection.",skills:["Palletize","QC Inspection"],comp:["ISO 10218-1","NOM-004 STPS"],notes:[{t:"Strong internal champion. Budget authority confirmed. 3 shifts = 9 operator positions addressable.",by:"JM",at:"Mar 12"},{t:"Conveyor layout mapped. 3 palletizing stations on Line 3. Speed: 12 boxes/min per station.",by:"JM",at:"Mar 5"}],risk:"medium",qs:["Union approval process and timeline?","Shift transition protocol?","Conveyor speed adjustment capability?","Budget cycle - when is next capex window?"],nextStep:"Complete bottleneck mapping and cycle time analysis for Line 3",fu:"Mar 18",meetings:[{d:"Mar 5",n:"Initial plant tour with Carlos. 3 stations identified on Line 3."},{d:"Mar 12",n:"Detailed line walk. Conveyor layout and dimensions documented."}],blockers:[]},
{id:"p2",name:"Amazon MX - Cuautitlan",stage:"Site Visit",viab:88,roi:"$250K/yr",champ:"TBD - pursuing via introduction",champStr:"Weak",plant:"Cuautitlan Fulfillment Center",plc:"Proprietary / Kiva",pain:"Mixed SKU variety in pick stations causing 4.2% error rate. 55% annual picker turnover drives retraining costs.",skills:["Unstructured Pick","QC Tactile Inspection"],comp:["ISO 10218-1","ISO/TS 15066"],notes:[{t:"Highest ROI opportunity in pipeline. Key blocker is cobot safety compliance for human proximity zones.",by:"JM",at:"Mar 10"}],risk:"high",qs:["Human proximity zone layout and dimensions?","Kiva system integration path?","Pick error tolerance threshold?","Safety pre-assessment process and timeline?"],nextStep:"Conduct ISO/TS 15066 pre-assessment before requesting line access",fu:"Mar 17",meetings:[],blockers:["ISO/TS 15066 compliance gap unresolved","No internal champion identified yet"]},
{id:"p3",name:"Foxconn - Juarez",stage:"Identified",viab:90,roi:"$400K+/yr",champ:"TBD",champStr:"None",plant:"Juarez Electronics Assembly",plc:"Siemens / Mitsubishi",pain:"Precision PCB component assembly at volume. Current 2.1% defect rate on fine-pitch placements.",skills:["Precision Pinch","Screw Drive","Snap Fit Assembly"],comp:["ISO 10218-1","ISO 10218-2"],notes:[],risk:"high",qs:["Contact pathway - CAINTRA introduction or Residency network?","Monthly production volume?","PCB form factors and component sizes?","Current defect tolerance vs target?"],nextStep:"Establish initial contact through CAINTRA or Residency",fu:"Mar 25",meetings:[],blockers:["No contact established","Requires screw drive skill (currently 45% success)","Requires assembly skill (currently 38% success)"]},
{id:"p4",name:"Grupo Bimbo - Toluca",stage:"Auto Score",viab:71,roi:"$95K/yr",champ:"Luis Mendez - Production Lead",champStr:"Medium",plant:"Toluca Bakery #1",plc:"Allen-Bradley",pain:"Packaging line product damage rate of 3.5%. Manual handling of fragile baked goods causes deformation.",skills:["Gentle Pick-Place"],comp:["ISO 10218-1","NOM-004 STPS"],notes:[],risk:"low",qs:["Food-safe material certification requirements?","Line speed target for automated packaging?"],nextStep:"Prepare preliminary proposal with ROI model",fu:"Mar 19",meetings:[{d:"Feb 28",n:"Initial call with Luis. Interest confirmed."},{d:"Mar 10",n:"Packaging line flow mapped. 3.5% damage rate confirmed."}],blockers:[]}
],
investors:[
{id:"inv1",name:"Y Combinator",stage:"Researched",prob:15,check:"$500K",next:"Apply for S25 batch",nextDate:"Mar 20",notes:[],tp:["YC website and thesis review","S25 batch timeline confirmed: apply by Apr 15","Partner research: Jared Friedman covers hardware"],thesis:"Deep tech hardware + Mexico nearshoring angle aligns with international expansion thesis",objections:["Pre-revenue stage concern","Hardware company risk profile","Small team size"]},
{id:"inv2",name:"Khosla Ventures",stage:"Warm Intro",prob:20,check:"$1-2M",next:"Follow up on deck review",nextDate:"Mar 18",notes:[{t:"Intro email sent via Residency SF contact. Deck v2 attached.",by:"JM",at:"Mar 8"}],tp:["Intro email sent Mar 8","Pitch deck v2 shared","Awaiting partner response"],thesis:"Industrial automation and workforce transformation thesis. Strong interest in manufacturing robotics.",objections:["Stage too early for typical Khosla check","Want to see working demo before meeting"]},
{id:"inv3",name:"Eclipse Ventures",stage:"1st Meeting",prob:35,check:"$500K-1M",next:"Prepare live demo for follow-up",nextDate:"Mar 16",notes:[{t:"Strong interest in nearshoring thesis. Partner asked for live grasp demonstration at next meeting.",by:"JM",at:"Mar 12"}],tp:["Intro call - 15 min overview","30-min technical deep dive with partner","Live demo requested for next meeting","Pitch deck v2 sent"],thesis:"Industrial deep tech thesis match. Nearshoring angle resonates strongly with their Mexico investment thesis.",objections:["Need to see live hardware demonstration","Want evidence of pilot LOI or strong interest"]},
{id:"inv4",name:"The Residency SF",stage:"Active",prob:40,check:"Strategic intros",next:"Weekly office hours + new VC intros",nextDate:"Mar 21",notes:[{t:"2 new VC introductions generated from last office hours session.",by:"JM",at:"Mar 14"}],tp:["Attended 4 weekly office hours","Generated 2 direct VC introductions","Paired with hardware startup mentor","Access to demo day pipeline"],thesis:"Network acceleration and intro generation. Not a direct investor but highest-value relationship for pipeline building.",objections:[]},
{id:"inv5",name:"Angel Syndicate MX",stage:"Warm Intro",prob:25,check:"$100-250K",next:"Send deck + schedule call",nextDate:"Mar 17",notes:[],tp:["CAINTRA business council introduction","Added to WhatsApp investor group"],thesis:"Mexico-based manufacturing innovation. Local ecosystem building.",objections:["Want to see Mexico-based customer traction before committing","Prefer post-revenue companies"]}
],
fleet:[
{id:"fl1",unit:"GH-001",type:"Genesis Hand v0.6 - Primary Prototype",status:"active",hours:342,health:92,loc:"DOGMA Lab - Main Workbench",config:"Full 27-DOF hand + UR10e arm mount",sys:["Bone structure: All joints within spec","Tendon network: All 108 routes tensioned","Tactile sensors: Phalanx 3 showing drift (INC-002)","Firmware: v2.3 running stable","McKibben actuators: All 27 operational","Wrist: v1.9 assembled, limited flexion"],lastMaint:"Mar 5 - Full tendon tension check",nextMaint:"Mar 20 - Scheduled sensor recalibration"},
{id:"fl2",unit:"GH-002",type:"Genesis Hand v0.7 - Assembly In Progress",status:"build",hours:0,health:0,loc:"DOGMA Lab - Assembly Station",config:"Updated bone design + new tendon routing",sys:["Assembly progress: 72% complete","Bone structure: All 27 phalanges printed and assembled","Tendon routing: 64/108 routes complete","Actuator installation: Waiting for batch #5","Wrist: v2.0 design pending"],lastMaint:"-",nextMaint:"-"},
{id:"fl3",unit:"DEV-A",type:"Development Rig - Actuator Testing",status:"active",hours:1240,health:78,loc:"Test Bench A",config:"4-finger subset with full actuator bank",sys:["McKibben actuators: All operational","PTFE pulley sleeves: Installed post-INC-001","High mileage: 1240 hours - approaching maintenance","Tendon inspection: Due at 1300 hours"],lastMaint:"Mar 2 - PTFE sleeve installation after INC-001",nextMaint:"Mar 16 - 1300hr tendon + pulley inspection"},
{id:"fl4",unit:"DEV-B",type:"Development Rig - Tactile Sensor Testing",status:"maintenance",hours:890,health:65,loc:"Test Bench B - Offline",config:"Full sensor array with test load fixtures",sys:["Actuator #4: Pressure leak detected (INC-003)","Awaiting replacement bladder parts - ETA Mar 18","Sensor calibration: Due when unit returns to service","Operating at 3/4 actuator capacity if needed for emergency"],lastMaint:"Mar 12 - Taken offline for INC-003",nextMaint:"Pending replacement parts arrival"}
],
incidents:[
{id:"INC-003",sev:"medium",desc:"Actuator #4 sustained pressure leak under load on DEV-B",down:"8h",root:"Rubber bladder fatigue after 800+ actuation cycles. Micro-tear at fold point.",status:"open",reported:"Mar 12 4:00 PM",notes:[{t:"Replacement bladders ordered from Shenzhen supplier. ETA 5 business days. Unit offline until repair.",by:"JM",at:"Mar 13 9:00 AM"}],acts:["Remove and replace bladder on actuator #4","Run 40PSI sustained pressure test for 1 hour","Update preventive inspection interval from 1000 to 500 cycles","Order batch of 10 spare bladders for inventory"],timeline:["Mar 12 4:00 PM - Leak detected during force calibration test","Mar 12 4:30 PM - Unit pressure tested, leak confirmed on act #4","Mar 12 5:00 PM - DEV-B taken offline, root cause investigation started","Mar 13 9:00 AM - Bladder micro-tear identified under magnification","Mar 13 2:00 PM - Replacement parts ordered, PO sent to supplier"]},
{id:"INC-002",sev:"low",desc:"Tactile sensor drift on phalanx 3 of GH-001 after 4hr continuous operation",down:"2h",root:"Temperature coefficient of FSR 402 resistance not compensated in firmware. PCB temp rises from 22C to 28C.",status:"investigating",reported:"Mar 8",notes:[],acts:["Run controlled thermal test at fixed temperature to isolate variable","Design and implement EWMA thermal compensation algorithm in firmware","Add thermal drift test to standard sensor validation protocol","Evaluate alternative sensor (FSR 406) with lower temp coefficient"],timeline:["Mar 8 - Drift first observed during EXP-045 4hr test","Mar 11 - Temperature correlation confirmed with IR thermometer","Mar 14 - Thermal compensation algorithm designed, implementation started"]},
{id:"INC-001",sev:"high",desc:"Dyneema tendon snap during 25N force test on DEV-A index finger",down:"24h",root:"Dyneema strand fraying at bare metal pulley contact point. No PTFE sleeve protection.",status:"resolved",reported:"Feb 28",notes:[{t:"Root cause confirmed. All pulleys across all units now PTFE sleeved. 200-cycle inspection protocol added.",by:"JM",at:"Mar 2"}],acts:["Replaced snapped tendon with new Dyneema strand and sleeve","PTFE sleeved ALL pulley contact points on ALL units (27 pulleys x 4 units)","Added 200-cycle tendon and pulley inspection to maintenance protocol","Updated tendon routing spec to require PTFE sleeve at every contact"],timeline:["Feb 28 10:00 AM - Tendon snap during 25N force profile test on DEV-A","Feb 28 2:00 PM - Fraying identified at index proximal pulley under microscope","Mar 1 - Root cause analysis complete, PTFE sleeve solution designed","Mar 2 9:00 AM - All pulleys sleeved on DEV-A, testing resumed","Mar 2-5 - Remaining 3 units retrofitted with PTFE sleeves"]}
],
milestones:[
{id:"ms1",title:"Genesis Hand v0.7 fully assembled",target:"Mar 30",pct:72,risk:"medium",blockers:["8 components waiting for McKibben batch #5 delivery","Wrist v2.0 redesign needed based on EXP-044 failure"],cr:["All 27 bone phalanges printed and assembled","All 108 tendons routed and tensioned to spec","All 27 McKibben actuators installed and pressure tested","Wrist mechanism integrated with full range of motion","Firmware v2.3 flashed and basic self-test passing"],deps:["t4","ss6"]},
{id:"ms2",title:"6 manipulation skills validated >80%",target:"Apr 15",pct:40,risk:"high",blockers:["Tactile sensor drift blocks sensor-dependent skills","Wrist flexion failure limits key grasp and screw drive"],cr:["Pinch grasp >90% success rate","Power grasp >95% success rate","Key grasp >80% success rate","Pick-place >90% success rate","Assembly >70% success rate","Palletize >85% success rate"],deps:["t1","t7","ss5","ss6"]},
{id:"ms3",title:"ISO/TS 15066 compliance documentation ready",target:"Apr 30",pct:60,risk:"critical",blockers:["Gap analysis not yet started - standard not purchased","No force limit validation testing done","Speed monitoring not implemented in control system"],cr:["Complete gap analysis against ISO/TS 15066:2016","Risk assessment documented per required methodology","Force limits validated for all grasp types","Speed and separation monitoring implemented","Full compliance documentation package assembled"],deps:["t3"]},
{id:"ms4",title:"First factory line analysis complete",target:"Mar 25",pct:65,risk:"low",blockers:[],cr:["All bottleneck stations mapped with process flow","Cycle times measured for target operations","Preliminary ROI estimate calculated"],deps:["t5","p1"]},
{id:"ms5",title:"First pilot proposal delivered",target:"Apr 20",pct:0,risk:"medium",blockers:["Blocked by safety compliance clearance","Blocked by completed line analysis"],cr:["ROI model complete with sensitivity analysis","Safety compliance clearance obtained","Technical deployment specification written","Implementation timeline with milestones defined"],deps:["ms3","ms4","t8"]},
{id:"ms6",title:"Pre-seed round closed",target:"Jun 30",pct:15,risk:"high",blockers:["Zero investor commitments secured to date","Need live demonstration capability","Need pilot LOI or strong customer signal"],cr:["Lead investor term sheet signed","Legal review and documentation complete","Wire transfer received and confirmed"],deps:["t2","inv3"]}
],
safety:[{id:"sf1",name:"ISO 10218-1",cov:85,gaps:["Emergency stop validation testing pending","Safety-rated controller certification needed"]},{id:"sf2",name:"ISO 10218-2",cov:60,gaps:["System integration risk assessment incomplete","Safeguard selection and validation pending"]},{id:"sf3",name:"ISO/TS 15066",cov:40,gaps:["Collaborative force limit validation not done","Speed and separation monitoring not implemented","Human proximity zone mapping needed","Power and force limiting mode not characterized"]},{id:"sf4",name:"NOM-004 STPS",cov:70,gaps:["Spanish language documentation incomplete","STPS formal registration process not started"]}],
supply:[{id:"sp1",item:"McKibben bladders",supplier:"Custom MFG Shenzhen",lead:"4 weeks",risk:"high",note:"Single source. No backup supplier identified. Critical path item."},{id:"sp2",item:"FSR 402 sensors",supplier:"Interlink Electronics",lead:"2 weeks",risk:"medium",note:"Currently backordered. Alternative: FSR 406 (higher cost, lower temp drift)."},{id:"sp3",item:"Dyneema PE line",supplier:"DSM via distributor",lead:"1 week",risk:"low",note:"Stock available at local distributor."},{id:"sp4",item:"ESP32-S3 modules",supplier:"Espressif",lead:"2 weeks",risk:"low",note:"Alternative: ESP32-WROOM-1 pin-compatible."}],
decisions:[{title:"McKibben pneumatic over electric actuators",why:"Superior compliance and force density for biomimetic grasping. 3x force-to-weight ratio.",date:"Jan 2026"},{title:"Industrial pilots before full humanoid deployment",why:"Faster path to revenue validation. Deploy Genesis Hand on existing UR10e arm platform.",date:"Feb 2026"},{title:"Mexico nearshoring as initial market entry",why:"Lower deployment cost, founder network advantage, proximity to US customers.",date:"Dec 2025"}],
fin:{burn:12500,cash:45000,runway:3.6,bom:4280,spend:[{c:"Components & Materials",a:4200},{c:"Lab & Equipment",a:2800},{c:"Software & Cloud",a:600},{c:"Travel & Site Visits",a:1800},{c:"Professional Services",a:1200},{c:"Misc Operating",a:1900}]},
log:[{t:"EXP-047 Tendon cal PASSED",at:"Mar 14 4:30PM"},{t:"Eclipse Ventures advanced to 1st Meeting",at:"Mar 14 2:30PM"},{t:"INC-003 opened: DEV-B actuator leak",at:"Mar 12 4:15PM"},{t:"Amazon MX viability updated to 88%",at:"Mar 12 11:00AM"},{t:"Pinch grasp validated at 92%",at:"Mar 10 3:00PM"},{t:"INC-001 resolved: Tendon snap fix",at:"Mar 2 5:00PM"},{t:"PTFE sleeve retrofit completed on all units",at:"Mar 5 2:00PM"}],
seq:{exp:48,inc:4,task:9},
// Causal dependency chains: source → blocks [targets]
deps:[
{from:"ss10",fromLabel:"Sensor Fusion 38%",blocks:["sk5","sk6"],reason:"Fusion latency 8ms blocks real-time force feedback for precision tasks"},
{from:"ss6",fromLabel:"Wrist Assembly 45%",blocks:["sk3","sk5"],reason:"40deg flex vs 65deg target blocks approach angles for key grasp and screw drive"},
{from:"ss5",fromLabel:"Tactile Sensors 61%",blocks:["sk4","p2"],reason:"Drift >8% after 2hr blocks sensor-dependent skills and Amazon pilot validation"},
{from:"INC-002",fromLabel:"Tactile drift INC-002",blocks:["ss5","t1"],reason:"Unresolved drift incident blocks sensor validation chain"},
{from:"INC-003",fromLabel:"Actuator leak INC-003",blocks:["fl4","t6"],reason:"DEV-B offline, reduces test throughput 50%"},
{from:"t1",fromLabel:"Tactile drift fix",blocks:["ss5","ms2"],reason:"Fix required before sensor revalidation and 6-skill milestone"},
{from:"t3",fromLabel:"ISO/TS 15066 gap",blocks:["ms3","p2","ms5"],reason:"Compliance gap blocks Amazon pilot and first proposal"},
{from:"sf3",fromLabel:"ISO/TS 15066 40%",blocks:["p2","ms3"],reason:"Lowest compliance blocks highest-ROI pilot"},
{from:"ms2",fromLabel:"6 skills validated",blocks:["ms5","p1","p3"],reason:"Skill milestone gates pilot proposals"},
{from:"ms3",fromLabel:"ISO compliance",blocks:["ms5","p2"],reason:"Compliance gates first proposal"},
],
// Incident → entity links
incLinks:{
"INC-002":{ss:["ss5"],tasks:["t1"],fleet:["fl1"],desc:"Tactile sensor drift on GH-001 phalanx 3"},
"INC-003":{ss:["ss4"],tasks:["t6"],fleet:["fl4"],desc:"Actuator #4 pressure leak on DEV-B"},
"INC-001":{ss:["ss2"],tasks:[],fleet:["fl3"],desc:"Tendon snap on DEV-A (RESOLVED)"},
},
// Pilot deadlines tied to runway
pilotDeadlines:{
"p1":{needBy:"Apr 15",reason:"Must close before next raise or runway runs out",gatedBy:["ms2","ms4"]},
"p2":{needBy:"May 1",reason:"Highest ROI but needs ISO compliance first",gatedBy:["ms3","sf3"]},
"p3":{needBy:"Jun 15",reason:"Requires screw drive + assembly skills",gatedBy:["ms2","sk5","sk6"]},
"p4":{needBy:"Apr 30",reason:"Lowest complexity, fastest to close",gatedBy:["ms4"]},
},
};}

// ── Risk Scoring Engine ──
function calcRisks(D){
  var alerts=[];
  // Runway
  if(D.fin.runway<4)alerts.push({sev:"critical",cat:"Finance",msg:"Runway "+D.fin.runway+"mo. Fundraise immediately.",score:10});
  if(D.fin.runway<2)alerts.push({sev:"critical",cat:"Finance",msg:"SURVIVAL: <2 months. All non-revenue tasks should stop.",score:15});
  // Subsystems <50%
  D.ss.forEach(function(s){if(s.mat<50)alerts.push({sev:"high",cat:"R&D",msg:s.name+" at "+s.mat+"% maturity. Blocks downstream.",score:7,id:s.id});});
  // Skills <50%
  D.skills.forEach(function(s){if(s.success<50)alerts.push({sev:"high",cat:"Skills",msg:s.name+" at "+s.success+"%. Dev priority.",score:6,id:s.id});});
  // Stalled pilots (no meetings in 14+ days)
  D.pilots.forEach(function(p){
    var lastMeet=p.meetings&&p.meetings.length>0?p.meetings[p.meetings.length-1].d:"";
    if(!lastMeet&&p.stage!=="Identified")alerts.push({sev:"medium",cat:"Pilots",msg:p.name+" has NO meetings logged. Stalled?",score:5,id:p.id});
  });
  // Open incidents
  D.incidents.forEach(function(i){if(i.status!=="resolved")alerts.push({sev:i.sev==="high"?"critical":"medium",cat:"Incidents",msg:i.id+": "+i.desc.slice(0,50),score:i.sev==="high"?8:4,id:i.id});});
  // Safety gaps
  D.safety.forEach(function(s){if(s.cov<50)alerts.push({sev:"high",cat:"Safety",msg:s.name+" at "+s.cov+"%. Blocks pilots.",score:6,id:s.id});});
  // Milestones at risk
  D.milestones.forEach(function(m){if(m.risk==="critical"||m.risk==="high")alerts.push({sev:m.risk==="critical"?"critical":"high",cat:"Roadmap",msg:m.title+" ("+m.pct+"%) — "+m.risk+" risk",score:m.risk==="critical"?8:5,id:m.id});});
  // Sort by score desc
  alerts.sort(function(a,b){return b.score-a.score;});
  return alerts;
}

// ── Dependency chain resolver ──
function getBlockedBy(entityId,deps){
  return(deps||[]).filter(function(d){return d.blocks.indexOf(entityId)>=0;});
}
function getBlocks(entityId,deps){
  return(deps||[]).filter(function(d){return d.from===entityId;});
}
// NODES and LINKS are now computed inside Dashboard via useMemo on liveTree

function getSubs(pid,D,nodesArray){var R=3.5;var items=[];
if(pid==="rd"){items=D.ss.map(function(s){return{id:s.id,label:s.name,metric:s.mat+"%",color:dc(s.status),r:0.45,type:"ss",data:s};}).concat(D.skills.map(function(s){return{id:s.id,label:s.name,metric:s.success+"%",color:dc(s.status),r:0.45,type:"skill",data:s};}));}
else if(pid==="experiments"){items=D.exps.map(function(e){return{id:e.id,label:e.id,metric:e.outcome,color:dc(e.outcome),r:0.4,type:"exp",data:e};});}
else if(pid==="incidents"){items=D.incidents.map(function(i){return{id:i.id,label:i.id,metric:i.status,color:dc(i.status),r:0.4,type:"inc",data:i};});}
else if(pid==="fleet"){items=D.fleet.map(function(f){return{id:f.id,label:f.unit,metric:f.health?f.health+"%":"--",color:dc(f.status),r:0.4,type:"fl",data:f};});}
else if(pid==="pilots"){items=D.pilots.map(function(p){return{id:p.id,label:p.name,metric:p.viab+"%",color:p.viab>80?C.g:C.a,r:0.5,type:"pilot",data:p};});}
else if(pid==="fundraising"){items=D.investors.map(function(v){return{id:v.id,label:v.name,metric:v.prob+"%",color:v.prob>=30?C.g:C.a,r:0.45,type:"inv",data:v};});}
else if(pid==="team"){items=D.tasks.map(function(t){var pct=t.pct||0;return{id:t.id,label:t.title,metric:(pct||0)+"%",color:t.status==="done"?C.g:dc(t.pri),r:0.4,type:"task",data:t};});}
else if(pid==="finance"){var fi=D.fin;items=[{id:"fn_b",label:"Burn",metric:"$"+(fi.burn/1000).toFixed(1)+"K",color:C.r,r:0.45,type:"fmet",data:{n:"Monthly Burn Rate",v:"$"+(fi.burn/1000).toFixed(1)+"K/mo",d:fi.spend.map(function(s){return s.c+": $"+(s.a/1000).toFixed(1)+"K";})}},{id:"fn_c",label:"Cash",metric:"$"+(fi.cash/1000).toFixed(0)+"K",color:C.a,r:0.45,type:"fmet",data:{n:"Cash Position",v:"$"+fi.cash,d:["Current bank balance"]}},{id:"fn_r",label:"Runway",metric:fi.runway+"mo",color:fi.runway<4?C.r:C.a,r:0.45,type:"fmet",data:{n:"Runway",v:fi.runway+" months remaining",d:[fi.runway<4?"CRITICAL: Less than 4 months runway. Fundraising is survival priority.":"Manageable but tight. Monitor monthly."]}},{id:"fn_m",label:"BOM",metric:"$"+(fi.bom/1000).toFixed(1)+"K",color:C.gold,r:0.45,type:"fmet",data:{n:"BOM Cost - Genesis Hand v0.7",v:"$"+fi.bom+" per unit",d:["142 unique components","8 components pending from batch #5","Target: sub-$3K at 100-unit volume"]}}].concat(D.supply.map(function(s){return{id:s.id,label:s.item.slice(0,12),metric:s.risk,color:dc(s.risk==="high"?"critical":"active"),r:0.4,type:"sply",data:s};}));}
else if(pid==="roadmap"){items=D.milestones.map(function(m){return{id:m.id,label:m.title,metric:m.pct+"%",color:m.risk==="critical"?C.r:m.risk==="high"?C.a:C.g,r:0.45,type:"ms",data:m};}).concat(D.safety.map(function(sf){return{id:sf.id,label:sf.name,metric:sf.cov+"%",color:sf.cov>70?C.g:sf.cov>50?C.a:C.r,r:0.4,type:"safe",data:sf};}));}
var p=(nodesArray||[]).find(function(n){return n.id===pid;});if(!p)return[];
return items.map(function(it,i){var a=(i/items.length)*6.2832;return Object.assign({},it,{pos:[p.pos[0]+Math.cos(a)*R,p.pos[1]+Math.sin(a)*R*0.6,p.pos[2]+Math.sin(a+1)*0.7],parent:pid});});}

function getSSubs(sub){if(!sub||!sub.data)return[];var d=sub.data;var items=[];
if(sub.type==="ss")items=(d.d||[]).concat(d.risks||[]);else if(sub.type==="skill")items=(d.gaps||[]).concat(d.protocol?[d.protocol]:[]);else if(sub.type==="exp")items=(d.p||[]).concat(d.conclusion?[d.conclusion]:[]);else if(sub.type==="inc")items=(d.acts||[]).concat(d.timeline||[]);else if(sub.type==="pilot")items=(d.qs||[]).concat(d.skills||[]).concat(d.comp||[]).concat(d.blockers||[]);else if(sub.type==="inv")items=(d.tp||[]).concat(d.objections||[]);else if(sub.type==="task")items=(d.sb||[]).concat(d.impact?[d.impact]:[]);else if(sub.type==="fl")items=d.sys||[];else if(sub.type==="ms")items=(d.cr||[]).concat(d.blockers||[]);else if(sub.type==="fmet")items=d.d||[];else if(sub.type==="safe")items=d.gaps||[];else if(sub.type==="sply")items=[d.supplier||"",d.lead||"",d.note||""].filter(Boolean);
var R=1.8;return items.filter(Boolean).map(function(it,i){var a=(i/Math.max(items.length,1))*6.2832;return{id:sub.id+"_"+i,label:String(it).slice(0,18),pos:[sub.pos[0]+Math.cos(a)*R,sub.pos[1]+Math.sin(a)*R*0.6,sub.pos[2]+Math.cos(a+2)*0.5],r:0.18,color:C.tx3,type:"leaf",text:String(it),parentType:sub.type,parentLabel:sub.label};});}

// ── FULL PAGES ──
function MainPage({nid,D,files,onUpload,onRemove,acts}){var oI=D.incidents.filter(function(i){return i.status!=="resolved";}).length;var cr=D.tasks.filter(function(t){return t.pri==="critical"&&t.status!=="done";}).length;var am=Math.round(D.ss.reduce(function(a,s){return a+s.mat;},0)/D.ss.length);
if(nid==="command"){var risks=calcRisks(D);var depChains=D.deps||[];var pDead=D.pilotDeadlines||{};return(<div><div style={{fontSize:22,fontWeight:700,color:C.gold,marginBottom:8}}>DOGMA Command Center</div><div style={{fontSize:14,color:C.tx2,marginBottom:12}}>Executive overview - {dy()} <span style={{fontSize:10,padding:"2px 6px",borderRadius:3,background:C.a+"12",color:C.a,marginLeft:8}}>seed data — connect to Supabase for live</span></div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:14}}>{[[D.fin.runway+"mo","Runway",D.fin.runway<4?C.r:C.a],[oI,"Open Incidents",oI?C.r:C.g],[cr,"Critical Tasks",cr?C.r:C.g],[am+"%","Avg Maturity",am>60?C.g:C.a],[D.pilots.length,"Pilot Pipeline",C.gold],[D.investors.length,"Investors",C.a]].map(function(x,i){return <div key={i} style={{background:C.bg,padding:8,borderRadius:4,borderLeft:"3px solid "+x[2]}}><div style={{fontSize:18,fontWeight:700,color:x[2],fontFamily:"'JetBrains Mono',monospace"}}>{x[0]}</div><div style={{fontSize:10,color:C.tx3,textTransform:"uppercase"}}>{x[1]}</div></div>;})}</div>

{risks.length>0&&<div><Sec>Risk Alerts ({risks.length})</Sec>{risks.slice(0,8).map(function(r,i){return <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 8px",background:r.sev==="critical"?C.r+"08":C.a+"06",borderLeft:"3px solid "+(r.sev==="critical"?C.r:r.sev==="high"?C.a:C.b),borderRadius:3,marginBottom:3,fontSize:13}}>
<Tag color={r.sev==="critical"?C.r:r.sev==="high"?C.a:C.b}>{r.sev}</Tag>
<Tag>{r.cat}</Tag>
<span style={{flex:1,color:C.tx}}>{r.msg}</span>
<span style={{fontFamily:"'JetBrains Mono',monospace",color:C.tx3,fontSize:11}}>S{r.score}</span>
</div>;})}</div>}

<Sec>Dependency Chain</Sec>
<div style={{fontSize:12,color:C.tx3,marginBottom:6}}>Causal blockers — resolving upstream unblocks downstream</div>
{depChains.map(function(dep,i){return <div key={i} style={{padding:"6px 8px",background:C.bg,borderRadius:3,marginBottom:4,borderLeft:"3px solid "+C.a}}>
<div style={{display:"flex",alignItems:"center",gap:6,fontSize:13}}>
<span style={{color:C.r,fontWeight:600}}>{dep.fromLabel}</span>
<span style={{color:C.tx3}}>{"\u2192"}</span>
<span style={{color:C.a}}>blocks</span>
<span style={{color:C.tx}}>{dep.blocks.join(", ")}</span>
</div>
<div style={{fontSize:11,color:C.tx2,marginTop:2}}>{dep.reason}</div>
</div>;})}

<Sec>Pilot Timeline vs Runway</Sec>
<div style={{fontSize:12,color:C.tx3,marginBottom:6}}>Runway exhausts ~{new Date(Date.now()+D.fin.runway*30*86400000).toLocaleDateString("en-US",{month:"short",day:"numeric"})}. Pilots must close before.</div>
{D.pilots.map(function(p,i){var dl=pDead[p.id];return <div key={i} style={{padding:"5px 8px",background:C.bg,borderRadius:3,marginBottom:3,borderLeft:"3px solid "+(dl&&dl.needBy?"#A78530":C.bd)}}>
<div style={{display:"flex",alignItems:"center",gap:6,fontSize:13}}>
<span style={{fontWeight:600}}>{p.name}</span>
<Tag color={C.gold}>{p.stage}</Tag>
<span style={{color:C.tx2}}>{p.viab}%</span>
{dl&&<span style={{fontFamily:"'JetBrains Mono',monospace",color:C.a,fontSize:12}}>Need by: {dl.needBy}</span>}
</div>
{dl&&<div style={{fontSize:11,color:C.tx2,marginTop:2}}>{dl.reason}</div>}
{dl&&dl.gatedBy&&<div style={{fontSize:11,color:C.tx3}}>Gated by: {dl.gatedBy.join(", ")}</div>}
</div>;})}

<Sec>Incident Links</Sec>
{Object.keys(D.incLinks||{}).map(function(iid,i){var lk=D.incLinks[iid];var inc=D.incidents.find(function(x){return x.id===iid;});if(!inc||inc.status==="resolved")return null;return <div key={i} style={{padding:"5px 8px",background:C.bg,borderRadius:3,marginBottom:3,borderLeft:"3px solid "+C.r,fontSize:13}}>
<span style={{color:C.r,fontWeight:600}}>{iid}</span> <span style={{color:C.tx}}>{lk.desc}</span>
<div style={{fontSize:11,color:C.tx3,marginTop:2}}>Links: {lk.ss.length>0?"SS:"+lk.ss.join(",")+" ":""}{lk.tasks.length>0?"Tasks:"+lk.tasks.join(",")+" ":""}{lk.fleet.length>0?"Fleet:"+lk.fleet.join(","):""}</div>
</div>;})}

<Sec>Critical Path & Dependency Graph</Sec>
<div style={{fontSize:11,color:C.tx3,marginBottom:8}}>What blocks what — resolve upstream to unblock downstream</div>
<div style={{background:C.bg,borderRadius:6,padding:10,border:"1px solid "+C.bd}}>
{(D.deps||[]).map(function(dep,i){
  var fromColor=dep.fromLabel.indexOf("INC")>=0?C.r:dep.fromLabel.indexOf("ISO")>=0||dep.fromLabel.indexOf("safety")>=0?C.a:C.b;
  return <div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 0",borderBottom:i<(D.deps||[]).length-1?"1px solid "+C.bd+"30":"none",fontSize:11}}>
    <div style={{minWidth:100,display:"flex",alignItems:"center",gap:3}}>
      <div style={{width:6,height:6,borderRadius:"50%",background:fromColor,flexShrink:0}}/>
      <span style={{color:fromColor,fontFamily:"'JetBrains Mono',monospace",fontWeight:600,fontSize:10}}>{dep.fromLabel.split(" ")[0]}</span>
    </div>
    <span style={{color:C.r}}>→</span>
    <div style={{display:"flex",flexWrap:"wrap",gap:2,flex:1}}>
      {dep.blocks.map(function(b,j){return <span key={j} style={{padding:"1px 5px",fontSize:9,borderRadius:3,background:C.a+"12",color:C.a,border:"1px solid "+C.a+"25",fontFamily:"'JetBrains Mono',monospace"}}>{b}</span>;})}
    </div>
    <span style={{fontSize:9,color:C.tx3,maxWidth:140,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{dep.reason}</span>
  </div>;
})}
</div>
<div style={{marginTop:6,fontSize:10,color:C.tx3}}>
  <span style={{color:C.r}}>●</span> Incidents &nbsp;
  <span style={{color:C.a}}>●</span> Safety &nbsp;
  <span style={{color:C.b}}>●</span> Technical
</div>
<Sec>Recent Activity</Sec>{D.log.map(function(l,i){return <div key={i} style={{fontSize:13,color:C.tx2,padding:"2px 0"}}>{l.t} <span style={{color:C.tx3}}>{l.at}</span>{l.by&&<span style={{color:C.gold,fontSize:10,marginLeft:4}}>— {l.by}</span>}</div>;})}

{/* ═══ FOUNDER DAILY BRIEF ═══ */}
<Sec>🌅 Founder Daily Brief</Sec>
<div style={{background:C.bg,borderRadius:6,padding:12,marginBottom:12,border:"1px solid "+C.gold+"20"}}>
{(function(){
  var blocked=D.tasks.filter(function(t){return t.status==="blocked";});
  var critical=D.tasks.filter(function(t){return t.pri==="critical"&&t.status!=="done";});
  var overdue=D.tasks.filter(function(t){return t.due&&t.status!=="done";});
  var openInc=D.incidents.filter(function(i){return i.status!=="resolved";});
  var staleInv=D.investors.filter(function(v){return v.stage==="Researched"||v.stage==="Warm Intro";});
  var failedExp=D.exps.filter(function(e){return e.outcome==="fail"||e.outcome==="partial";}).slice(0,3);
  var pilotFU=D.pilots.filter(function(p){return p.nextStep;});
  var items=[];
  if(critical.length>0)items.push({icon:"🔴",text:critical.length+" critical task"+(critical.length>1?"s":"")+": "+critical.map(function(t){return t.title.slice(0,30);}).join(", "),color:C.r});
  if(blocked.length>0)items.push({icon:"🚫",text:blocked.length+" blocked: "+blocked.map(function(t){return t.title.slice(0,25);}).join(", "),color:C.a});
  if(openInc.length>0)items.push({icon:"⚠️",text:openInc.length+" open incident"+(openInc.length>1?"s":"")+": "+openInc.map(function(i){return i.id;}).join(", "),color:C.r});
  if(failedExp.length>0)items.push({icon:"🔬",text:"Recent failed/partial experiments: "+failedExp.map(function(e){return e.id;}).join(", "),color:C.a});
  if(pilotFU.length>0)items.push({icon:"🏭",text:"Pilots needing follow-up: "+pilotFU.map(function(p){return p.name.split(" ")[0];}).join(", "),color:C.gold});
  if(staleInv.length>0)items.push({icon:"💰",text:staleInv.length+" investor"+(staleInv.length>1?"s":"")+" in early stage — push forward",color:C.a});
  if(D.fin.runway<4)items.push({icon:"💸",text:"Runway "+D.fin.runway+"mo — fundraising is urgent",color:C.r});
  if(items.length===0)items.push({icon:"✅",text:"All clear — no critical blockers today",color:C.g});
  return items.map(function(it,i){return <div key={i} style={{display:"flex",gap:8,padding:"4px 0",fontSize:12,alignItems:"flex-start"}}>
    <span>{it.icon}</span><span style={{color:it.color}}>{it.text}</span>
  </div>;});
})()}
</div>

{/* ═══ RISK ENGINE ═══ */}
<Sec>🚨 Risk Engine</Sec>
<div style={{background:C.bg,borderRadius:6,padding:10,marginBottom:12,border:"1px solid "+C.bd}}>
{(function(){
  var risks=[];
  // Subsystem risks
  D.ss.forEach(function(s){if(s.mat<50)risks.push({area:"Subsystem",entity:s.name,level:s.mat<30?"critical":s.mat<40?"high":"medium",reason:"Maturity "+s.mat+"% — needs iteration",score:100-s.mat});});
  // Pilot risks
  D.pilots.forEach(function(p){if(p.blockers&&p.blockers.length>0)risks.push({area:"Pilot",entity:p.name,level:"high",reason:p.blockers[0].slice(0,50),score:70});});
  // Safety risks
  D.safety.forEach(function(s){if(s.cov<60)risks.push({area:"Safety",entity:s.name,level:s.cov<40?"critical":"high",reason:"Coverage "+s.cov+"% — gaps remain",score:100-s.cov});});
  // Supply risks
  D.supply.forEach(function(s){if(s.risk==="high")risks.push({area:"Supply",entity:s.item,level:"high",reason:s.note?s.note.slice(0,50):"High risk supplier",score:75});});
  // Runway
  if(D.fin.runway<3)risks.push({area:"Finance",entity:"Runway",level:"critical",reason:D.fin.runway+"mo remaining — raise urgently",score:95});
  else if(D.fin.runway<6)risks.push({area:"Finance",entity:"Runway",level:"high",reason:D.fin.runway+"mo remaining",score:70});
  // Milestones
  D.milestones.forEach(function(m){if(m.risk==="critical"||m.risk==="high")risks.push({area:"Milestone",entity:m.title.slice(0,30),level:m.risk,reason:m.blockers&&m.blockers[0]?m.blockers[0].slice(0,40):"At risk",score:m.risk==="critical"?85:65});});
  risks.sort(function(a,b){return b.score-a.score;});
  var levelColor={"critical":C.r,"high":C.a,"medium":C.gold,"low":C.g};
  return risks.slice(0,10).map(function(r,i){return <div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 0",fontSize:11,borderBottom:"1px solid "+C.bd+"20"}}>
    <div style={{width:6,height:6,borderRadius:"50%",background:levelColor[r.level]||C.a,flexShrink:0}}/>
    <Tag color={levelColor[r.level]}>{r.level}</Tag>
    <span style={{color:C.tx3,minWidth:55}}>{r.area}</span>
    <span style={{color:C.tx,fontWeight:500,flex:1}}>{r.entity}</span>
    <span style={{color:C.tx3,fontSize:10,maxWidth:160,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.reason}</span>
  </div>;});
})()}
</div>

{/* ═══ READINESS SCORES ═══ */}
<Sec>📊 Subsystem Readiness</Sec>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:12}}>
{D.ss.map(function(s,i){
  var stage=s.mat>=80?"deployable":s.mat>=65?"robust":s.mat>=50?"tested":s.mat>=30?"prototype":"concept";
  var stageColor={"deployable":C.g,"robust":"#3B9","tested":C.a,"prototype":C.gold,"concept":C.r};
  return <div key={i} style={{background:C.bg,borderRadius:4,padding:"6px 8px",borderLeft:"3px solid "+(stageColor[stage]||C.tx3)}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <span style={{fontSize:11,fontWeight:600,color:C.tx}}>{s.name}</span>
      <span style={{fontSize:14,fontWeight:700,color:stageColor[stage],fontFamily:"'JetBrains Mono',monospace"}}>{s.mat}%</span>
    </div>
    <div style={{fontSize:9,color:stageColor[stage],textTransform:"uppercase",letterSpacing:"0.06em",marginTop:1}}>{stage}</div>
    <div style={{height:3,background:C.bd,borderRadius:2,marginTop:3,overflow:"hidden"}}><div style={{width:s.mat+"%",height:"100%",background:stageColor[stage],borderRadius:2}}/></div>
  </div>;
})}
</div>

{/* ═══ OPPORTUNITY COMPARISON ═══ */}
<Sec>🏭 Pilot Comparison Board</Sec>
<div style={{overflowX:"auto",marginBottom:12}}>
<div style={{display:"grid",gridTemplateColumns:"100px"+D.pilots.map(function(){return" 1fr";}).join(""),gap:0,fontSize:10,minWidth:D.pilots.length*120+100}}>
  <div style={{padding:4,fontWeight:700,color:C.tx3}}></div>
  {D.pilots.map(function(p,i){return <div key={i} style={{padding:4,fontWeight:700,color:C.gold,textAlign:"center",borderBottom:"2px solid "+C.gold+"30"}}>{p.name.split(" ")[0]}</div>;})}
  {["ROI","Viability","Champion","Risk","Stage","Blockers"].map(function(metric){
    return [<div key={metric} style={{padding:"3px 4px",color:C.tx3,fontWeight:600,borderBottom:"1px solid "+C.bd+"20"}}>{metric}</div>].concat(
      D.pilots.map(function(p,i){
        var val=metric==="ROI"?p.roi:metric==="Viability"?p.viab+"%":metric==="Champion"?p.champStr:metric==="Risk"?p.risk:metric==="Stage"?p.stage:metric==="Blockers"?(p.blockers||[]).length+"":"";
        var clr=metric==="Risk"?(p.risk==="high"?C.r:p.risk==="low"?C.g:C.a):metric==="Viability"?(p.viab>80?C.g:p.viab>60?C.a:C.r):metric==="Champion"?(p.champStr==="Strong"?C.g:p.champStr==="Medium"?C.a:C.r):C.tx2;
        return <div key={i} style={{padding:"3px 4px",textAlign:"center",color:clr,borderBottom:"1px solid "+C.bd+"20",fontFamily:metric==="ROI"||metric==="Viability"?"'JetBrains Mono',monospace":"inherit"}}>{val}</div>;
      })
    );
  })}
</div>
</div>

{/* ═══ DECISION JOURNAL + THESIS TRACKER ═══ */}
<Sec>📖 Decision Journal & Strategic Theses</Sec>
{D.decisions.map(function(d,i){return <div key={i} style={{padding:"6px 0",borderBottom:"1px solid "+C.bd+"30"}}>
  <div style={{display:"flex",gap:6,alignItems:"center"}}>
    <span style={{fontSize:12,fontWeight:700,color:C.gold}}>{d.title}</span>
    <span style={{fontSize:10,color:C.tx3,fontFamily:"'JetBrains Mono',monospace"}}>{d.date}</span>
  </div>
  <div style={{fontSize:11,color:C.tx2,marginTop:2,paddingLeft:8,borderLeft:"2px solid "+C.gold+"30"}}>{d.why}</div>
</div>;})}
<div style={{marginTop:8,fontSize:10,color:C.tx3}}>💡 Decisions become your strategic memory. Add more via agents or CRUD.</div>

{/* ═══ ROM / COST ESTIMATOR ═══ */}
<Sec>💵 Quick ROM Estimator</Sec>
<div style={{background:C.bg,borderRadius:6,padding:10,marginBottom:12,border:"1px solid "+C.bd}}>
{[
  {item:"Single Genesis Hand unit",cost:"$"+((D.fin.bom||4280)/1000).toFixed(1)+"K",time:"2 weeks assembly"},
  {item:"Pilot deployment (1 unit + integration)",cost:"$"+(((D.fin.bom||4280)+8000)/1000).toFixed(0)+"K",time:"4-6 weeks"},
  {item:"Scale to 3 units",cost:"$"+((D.fin.bom||4280)*2.5/1000).toFixed(0)+"K",time:"6-8 weeks"},
  {item:"New hardware iteration",cost:"$"+((D.fin.bom||4280)*0.3/1000).toFixed(1)+"K",time:"1-2 weeks"},
  {item:"External arm integration",cost:"~$5K",time:"2-3 weeks"},
  {item:"Full safety certification",cost:"~$15-25K",time:"2-3 months"},
].map(function(r,i){return <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"3px 0",fontSize:11,borderBottom:i<5?"1px solid "+C.bd+"20":"none"}}>
  <span style={{flex:1,color:C.tx}}>{r.item}</span>
  <span style={{color:C.gold,fontWeight:600,fontFamily:"'JetBrains Mono',monospace",minWidth:50,textAlign:"right"}}>{r.cost}</span>
  <span style={{color:C.tx3,fontSize:10,minWidth:80,textAlign:"right"}}>{r.time}</span>
</div>;})}
</div>

{/* ═══ INCIDENT POSTMORTEMS ═══ */}
<Sec>🔍 Incident Postmortems</Sec>
{D.incidents.filter(function(i){return i.status==="resolved";}).map(function(inc,i){
  return <div key={i} style={{background:C.bg,borderRadius:4,padding:8,marginBottom:6,borderLeft:"3px solid "+C.g}}>
    <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:3}}>
      <span style={{fontFamily:"'JetBrains Mono',monospace",color:C.g,fontWeight:700,fontSize:11}}>{inc.id}</span>
      <Tag color={C.g}>RESOLVED</Tag>
      <span style={{flex:1,fontSize:11,color:C.tx}}>{inc.desc.slice(0,40)}</span>
    </div>
    <div style={{fontSize:10}}>
      {inc.root&&<div style={{color:C.a,marginBottom:1}}>Root cause: {inc.root.slice(0,60)}</div>}
      {inc.acts&&inc.acts.length>0&&<div style={{color:C.tx2}}>Prevention: {inc.acts[inc.acts.length-1].slice(0,60)}</div>}
    </div>
  </div>;
})}
{D.incidents.filter(function(i){return i.status==="resolved";}).length===0&&<div style={{fontSize:11,color:C.tx3}}>No resolved incidents yet</div>}

<FileUpload nodeId={nid} files={files} onUpload={onUpload} onRemove={onRemove}/></div>);}
if(nid==="rd")return(<div><div style={{fontSize:22,fontWeight:700,color:C.gold,marginBottom:8}}>Research & Development</div><Row label="Avg Maturity" value={am+"%"} color={am>60?C.g:C.a}/><Row label="Total Issues" value={D.ss.reduce(function(a,s){return a+s.issues;},0)}/><Row label="Skills Validated" value={D.skills.filter(function(s){return s.status==="validated";}).length+"/"+D.skills.length}/><Sec>Subsystems ({D.ss.length})</Sec>{D.ss.map(function(s,i){return <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",fontSize:14,borderBottom:"1px solid "+C.bd+"30"}}><Dot s={s.status}/><span style={{flex:1}}>{s.name}</span><PB val={s.mat} w={50}/><span style={{fontFamily:"'JetBrains Mono',monospace",color:C.tx2,minWidth:35}}>{s.mat}%</span><Tag>{s.ver}</Tag></div>;})}<Sec>Skills ({D.skills.length})</Sec>{D.skills.map(function(s,i){return <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 0",fontSize:14,borderBottom:"1px solid "+C.bd+"30"}}><Dot s={s.status}/><span style={{flex:1}}>{s.name}</span><span style={{fontFamily:"'JetBrains Mono',monospace",color:s.success>80?C.g:s.success>60?C.a:C.r}}>{s.success}%</span><span style={{fontSize:11,color:C.tx3}}>{s.tests} tests</span></div>;})}<Sec>📡 Live View Layers</Sec>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:12}}>
  <div style={{background:C.bg,borderRadius:6,padding:8,border:"1px solid "+C.bd,borderTop:"3px solid "+C.g}}>
    <div style={{fontSize:10,fontWeight:700,color:C.g,textTransform:"uppercase",marginBottom:4}}>Physical Layer</div>
    <div style={{fontSize:10,color:C.tx2}}>Pressure · Force · Tactile · Valves</div>
    <div style={{fontSize:9,color:C.tx3,marginTop:4}}>27 sensors · 27 actuators · 1KHz</div>
  </div>
  <div style={{background:C.bg,borderRadius:6,padding:8,border:"1px solid "+C.bd,borderTop:"3px solid "+C.b}}>
    <div style={{fontSize:10,fontWeight:700,color:C.b,textTransform:"uppercase",marginBottom:4}}>State Layer</div>
    <div style={{fontSize:10,color:C.tx2}}>Pose · Confidence · Fusion · Contacts</div>
    <div style={{fontSize:9,color:C.tx3,marginTop:4}}>Kalman filter · 8.2ms latency · 85% conf</div>
  </div>
  <div style={{background:C.bg,borderRadius:6,padding:8,border:"1px solid "+C.bd,borderTop:"3px solid "+C.gold}}>
    <div style={{fontSize:10,fontWeight:700,color:C.gold,textTransform:"uppercase",marginBottom:4}}>Control Layer</div>
    <div style={{fontSize:10,color:C.tx2}}>M0-M7 state · Outputs · Limits</div>
    <div style={{fontSize:9,color:C.tx3,marginTop:4}}>Force-first · Impedance · 1KHz loop</div>
  </div>
</div>
<Sec>🔗 Knowledge Graph</Sec>
<div style={{background:C.bg,borderRadius:6,padding:10,border:"1px solid "+C.bd}}>
  <div style={{fontSize:10,color:C.tx3,marginBottom:6}}>Subsystem ↔ Experiment ↔ Skill ↔ Incident connections</div>
  {D.ss.map(function(ss,i){
    var linkedExps=D.exps.filter(function(e){return(e.p||[]).some(function(p){return p.toLowerCase().indexOf(ss.name.toLowerCase().split(" ")[0].toLowerCase())>=0;});});
    var linkedIncs=Object.keys(D.incLinks||{}).filter(function(k){return(D.incLinks[k].ss||[]).indexOf(ss.id)>=0;});
    var linkedSkills=D.skills.filter(function(sk){return(D.deps||[]).some(function(d){return d.from===ss.id&&d.blocks.some(function(b){return b===sk.id;});});});
    if(linkedExps.length===0&&linkedIncs.length===0&&linkedSkills.length===0)return null;
    return <div key={i} style={{padding:"4px 0",borderBottom:"1px solid "+C.bd+"20",fontSize:11}}>
      <span style={{color:C.gold,fontWeight:600,minWidth:100,display:"inline-block"}}>{ss.name}</span>
      {linkedExps.length>0&&<span style={{color:C.c}}> ← {linkedExps.length} exp</span>}
      {linkedIncs.length>0&&<span style={{color:C.r}}> ← {linkedIncs.length} inc</span>}
      {linkedSkills.length>0&&<span style={{color:C.b}}> → {linkedSkills.length} skill</span>}
    </div>;
  }).filter(Boolean)}
  <div style={{marginTop:6,fontSize:9,color:C.tx3}}>
    <span style={{color:C.c}}>●</span> Experiments &nbsp;
    <span style={{color:C.r}}>●</span> Incidents &nbsp;
    <span style={{color:C.b}}>●</span> Skills blocked
  </div>
</div>
<FileUpload nodeId={nid} files={files} onUpload={onUpload} onRemove={onRemove}/></div>);
if(nid==="experiments"){var pr=D.exps.length?Math.round(D.exps.filter(function(e){return e.outcome==="pass";}).length/D.exps.length*100):0;return(<div><div style={{fontSize:22,fontWeight:700,color:C.gold,marginBottom:8}}>Experiment Log</div><Row label="Total" value={D.exps.length}/><Row label="Pass Rate" value={pr+"%"} color={pr>60?C.g:C.a}/><Row label="Failed" value={D.exps.filter(function(e){return e.outcome==="fail";}).length} color={C.r}/><Sec>All Experiments</Sec>{D.exps.map(function(e,i){return <div key={i} style={{padding:"8px 0",borderBottom:"1px solid "+C.bd+"30"}}><div style={{display:"flex",alignItems:"center",gap:6,fontSize:14}}><Dot s={e.outcome}/><span style={{color:C.gold,fontFamily:"'JetBrains Mono',monospace"}}>{e.id}</span><span style={{flex:1}}>{e.title}</span><Tag color={dc(e.outcome)}>{e.outcome}</Tag><span style={{fontSize:12,color:C.tx3}}>{e.date}</span></div>{e.conclusion&&<div style={{fontSize:12,color:C.tx2,marginTop:3,paddingLeft:20}}>{e.conclusion.slice(0,100)}...</div>}</div>;})}<FileUpload nodeId={nid} files={files} onUpload={onUpload} onRemove={onRemove}/></div>);}
if(nid==="incidents")return(<div><div style={{fontSize:22,fontWeight:700,color:C.gold,marginBottom:8}}>Incident Tracker</div><Row label="Open" value={oI} color={oI?C.r:C.g}/><Row label="Investigating" value={D.incidents.filter(function(i){return i.status==="investigating";}).length} color={C.a}/><Row label="Resolved" value={D.incidents.filter(function(i){return i.status==="resolved";}).length} color={C.g}/><Sec>All Incidents</Sec>{D.incidents.map(function(ic,i){return <div key={i} style={{padding:"8px 0",borderBottom:"1px solid "+C.bd+"30"}}><div style={{display:"flex",alignItems:"center",gap:6,fontSize:14}}><Dot s={ic.status}/><span style={{color:C.gold,fontFamily:"'JetBrains Mono',monospace"}}>{ic.id}</span><span style={{flex:1}}>{ic.desc.slice(0,50)}</span><Tag color={dc(ic.sev)}>{ic.sev}</Tag><Tag color={dc(ic.status)}>{ic.status}</Tag></div><div style={{fontSize:12,color:C.tx3,marginTop:2}}>Down: {ic.down} | Root: {ic.root}</div></div>;})}<FileUpload nodeId={nid} files={files} onUpload={onUpload} onRemove={onRemove}/></div>);
if(nid==="fleet"){
var totalHours=D.fleet.reduce(function(a,f){return a+f.hours;},0);
var activeU=D.fleet.filter(function(f){return f.status==="active";}).length;
var avgHealth=D.fleet.length?Math.round(D.fleet.reduce(function(a,f){return a+(f.health||0);},0)/D.fleet.length):0;
return(<div><div style={{fontSize:22,fontWeight:700,color:C.gold,marginBottom:8}}>Asset & Build Management</div>

{/* Fleet KPIs */}
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:6,marginBottom:12}}>
{[[activeU+"/"+D.fleet.length,"Active",C.g],[totalHours+"h","Total Hours",C.a],[avgHealth+"%","Avg Health",avgHealth>70?C.g:C.a],[D.fleet.filter(function(f){return f.status==="maintenance";}).length,"In Maint.",C.r]].map(function(x,i){
  return <div key={i} style={{background:C.bg,padding:"6px 8px",borderRadius:4,textAlign:"center"}}><div style={{fontSize:15,fontWeight:700,color:x[2],fontFamily:"'JetBrains Mono',monospace"}}>{x[0]}</div><div style={{fontSize:9,color:C.tx3}}>{x[1]}</div></div>;
})}
</div>

{canEdit&&<div style={{marginBottom:10}}><Btn v="gold" onClick={function(){setShowCreate({type:"fleet"});}}>+ Add Unit</Btn></div>}

<Sec>Fleet Units</Sec>
{D.fleet.map(function(f,i){
  var healthColor=f.health>80?C.g:f.health>50?C.a:C.r;
  var linkedIncs=Object.keys(D.incLinks||{}).filter(function(k){return(D.incLinks[k].fleet||[]).indexOf(f.id)>=0;});
  return <div key={i} style={{background:C.bg,borderRadius:6,padding:10,marginBottom:8,border:"1px solid "+C.bd,borderLeft:"3px solid "+dc(f.status)}}>
    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
      <span style={{fontSize:15,fontWeight:700,color:C.gold}}>{f.unit}</span>
      <span style={{flex:1,fontSize:11,color:C.tx2}}>{f.type}</span>
      <Tag color={dc(f.status)}>{f.status}</Tag>
    </div>
    {/* Health + Hours bar */}
    <div style={{display:"flex",gap:12,marginBottom:6}}>
      <div style={{flex:1}}>
        <div style={{fontSize:9,color:C.tx3,marginBottom:2}}>HEALTH</div>
        <div style={{height:6,background:C.bd,borderRadius:3,overflow:"hidden"}}><div style={{width:(f.health||0)+"%",height:"100%",background:healthColor,borderRadius:3}}/></div>
        <div style={{fontSize:10,color:healthColor,fontFamily:"'JetBrains Mono',monospace",marginTop:1}}>{f.health||0}%</div>
      </div>
      <div style={{textAlign:"right"}}>
        <div style={{fontSize:9,color:C.tx3}}>HOURS</div>
        <div style={{fontSize:13,fontWeight:700,color:C.tx,fontFamily:"'JetBrains Mono',monospace"}}>{f.hours}h</div>
      </div>
    </div>
    <div style={{fontSize:11,color:C.tx3}}>{f.loc}</div>
    {/* Systems/parts inventory */}
    {f.sys&&f.sys.length>0&&<div style={{marginTop:4}}>
      <div style={{fontSize:9,color:C.tx3,textTransform:"uppercase",marginBottom:2}}>Systems & Parts</div>
      {f.sys.map(function(s,j){return <div key={j} style={{fontSize:10,color:C.tx2,padding:"1px 0"}}>{s}</div>;})}
    </div>}
    {/* Maintenance schedule */}
    <div style={{display:"flex",gap:12,marginTop:6,fontSize:10,color:C.tx3}}>
      {f.lastMaint&&<span>Last: {f.lastMaint}</span>}
      {f.nextMaint&&<span style={{color:C.a}}>Next: {f.nextMaint}</span>}
    </div>
    {/* Linked incidents */}
    {linkedIncs.length>0&&<div style={{marginTop:4,fontSize:10,color:C.r}}>⚠ Linked: {linkedIncs.join(", ")}</div>}
  </div>;
})}

{/* Parts inventory summary */}
<Sec>Supply & Parts Inventory</Sec>
{D.supply.map(function(s,i){return <div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 0",fontSize:12,borderBottom:"1px solid "+C.bd+"30"}}>
  <Dot s={s.risk==="high"?"critical":s.risk==="medium"?"progress":"active"}/>
  <span style={{flex:1,fontWeight:500}}>{s.item}</span>
  <span style={{fontSize:10,color:C.tx3}}>{s.supplier}</span>
  <Tag color={dc(s.risk==="high"?"critical":"active")}>{s.risk}</Tag>
  <span style={{fontSize:10,color:C.tx3}}>{s.lead}</span>
</div>;})}
<FileUpload nodeId={nid} files={files} onUpload={onUpload} onRemove={onRemove}/></div>);}
if(nid==="pilots"){
var tr=D.pilots.reduce(function(a,p){return a+(parseInt(String(p.roi).replace(/[^0-9]/g,""))||0);},0);
// Scoring engine
var scored=D.pilots.map(function(p){
  var stageW={"Identified":10,"Contact":20,"Site Visit":30,"Line Analysis":40,"Bottleneck Map":50,"Auto Score":55,"Automation Score":60,"Proposal":70,"Pilot":90};
  var champW={"Strong":30,"Medium":20,"Weak":10,"None":0};
  var riskW={"low":25,"medium":15,"high":5};
  var roiVal=parseInt(String(p.roi).replace(/[^0-9]/g,""))||0;
  var economic=Math.min(Math.round(roiVal/500*100),100);
  var integration=Math.round((stageW[p.stage]||20)*0.5+(champW[p.champStr]||10));
  var probability=Math.round((p.viab||0)*0.5+(stageW[p.stage]||20)*0.3+(champW[p.champStr]||10)*0.2);
  var urgency=p.blockers&&p.blockers.length>0?30:p.stage==="Line Analysis"||p.stage==="Proposal"?80:50;
  var total=Math.round((economic*0.3+integration*0.25+probability*0.25+urgency*0.2));
  var verdict=total>=65?"pursue":total>=40?"nurture":"discard";
  return Object.assign({},p,{score:{economic:economic,integration:integration,probability:probability,urgency:urgency,total:total,verdict:verdict}});
}).sort(function(a,b){return b.score.total-a.score.total;});

return(<div><div style={{fontSize:22,fontWeight:700,color:C.gold,marginBottom:8}}>Pilot Scoring Engine</div>
<Row label="Opportunities" value={D.pilots.length}/><Row label="Total ROI" value={"~$"+tr+"K/yr"} color={C.g}/>
<Row label="Pursue Now" value={scored.filter(function(p){return p.score.verdict==="pursue";}).length} color={C.g}/>

{canEdit&&<div style={{marginBottom:10}}><Btn v="gold" onClick={function(){setShowCreate({type:"pilots"});}}>+ New Pilot</Btn></div>}

<Sec>Ranked Pipeline</Sec>
{scored.map(function(p,i){var sc=p.score;var vc=sc.verdict==="pursue"?C.g:sc.verdict==="nurture"?C.a:C.r;
return <div key={i} style={{padding:"10px 0",borderBottom:"1px solid "+C.bd+"30"}}>
  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
    <span style={{fontSize:18,fontWeight:700,color:vc,fontFamily:"'JetBrains Mono',monospace",minWidth:28}}>#{i+1}</span>
    <span style={{fontWeight:700,fontSize:15,flex:1}}>{p.name}</span>
    <Tag color={vc}>{sc.verdict.toUpperCase()}</Tag>
    <span style={{fontSize:16,fontWeight:700,color:vc,fontFamily:"'JetBrains Mono',monospace"}}>{sc.total}</span>
  </div>
  <div style={{display:"flex",gap:6,marginBottom:4}}>
    <Tag color={C.gold}>{p.stage}</Tag><Tag color={dc(p.risk)}>{p.risk}</Tag>
    <span style={{fontSize:12,color:C.g}}>{p.roi}</span>
    <span style={{fontSize:11,color:C.tx3}}>Viab: {p.viab}%</span>
    <span style={{fontSize:11,color:C.tx3}}>Champ: {p.champStr}</span>
  </div>
  {/* Score breakdown bars */}
  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:4,fontSize:10}}>
    {[["Economic",sc.economic,C.g],["Integration",sc.integration,C.b],["Probability",sc.probability,C.a],["Urgency",sc.urgency,C.c]].map(function(x,j){
      return <div key={j}>
        <div style={{display:"flex",justifyContent:"space-between",color:C.tx3}}><span>{x[0]}</span><span style={{color:x[2],fontFamily:"'JetBrains Mono',monospace"}}>{x[1]}</span></div>
        <div style={{height:3,background:C.bd,borderRadius:2,marginTop:1,overflow:"hidden"}}><div style={{width:x[1]+"%",height:"100%",background:x[2],borderRadius:2}}/></div>
      </div>;
    })}
  </div>
  {p.blockers&&p.blockers.length>0&&<div style={{fontSize:10,color:C.r,marginTop:4}}>⚠ {p.blockers.join(" | ")}</div>}
  {p.nextStep&&<div style={{fontSize:10,color:C.tx2,marginTop:2}}>Next: {p.nextStep}</div>}
</div>;})}
<FileUpload nodeId={nid} files={files} onUpload={onUpload} onRemove={onRemove}/></div>);}
if(nid==="fundraising"){var wp=Math.round(D.investors.reduce(function(a,v){return a+(parseFloat(v.check.replace(/[^0-9.]/g,""))||0)*(v.prob/100);},0));return(<div><div style={{fontSize:22,fontWeight:700,color:C.gold,marginBottom:8}}>Fundraising</div><Row label="Investors" value={D.investors.length}/><Row label="Weighted Pipeline" value={"~$"+wp+"K"} color={C.a}/><Row label="Runway Pressure" value={D.fin.runway<4?"HIGH":"Moderate"} color={D.fin.runway<4?C.r:C.a}/><Sec>Pipeline</Sec>{D.investors.map(function(v,i){return <div key={i} style={{padding:"8px 0",borderBottom:"1px solid "+C.bd+"30"}}><div style={{display:"flex",alignItems:"center",gap:6,fontSize:14}}><span style={{fontWeight:600}}>{v.name}</span><Tag color={C.gold}>{v.stage}</Tag><span style={{fontFamily:"'JetBrains Mono',monospace",color:v.prob>=30?C.g:C.a}}>{v.prob}%</span><span style={{color:C.tx2}}>{v.check}</span></div><div style={{fontSize:12,color:C.tx3,marginTop:2}}>Next: {v.next} | {v.thesis&&v.thesis.slice(0,60)}</div></div>;})}
{/* Investor Update Generator */}
<Sec>📨 Quick Update Generator</Sec>
<div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:8}}>
  {["Weekly Update","Monthly Report","Milestone Update"].map(function(tpl,i){
    return <span key={i} onClick={function(){setMode("chat");setInp("Generate a "+tpl+" for DOGMA Robotics investors. Include current metrics: burn $"+(D.fin.burn/1000).toFixed(1)+"K/mo, runway "+D.fin.runway+"mo, "+D.pilots.length+" pilots in pipeline, "+D.investors.length+" investors tracked. Milestones: "+D.milestones.map(function(m){return m.title+" ("+m.pct+"%)";}).join(", ")+". Format as a professional investor email.");}} style={{padding:"4px 10px",fontSize:11,borderRadius:4,cursor:"pointer",background:C.gold+"08",color:C.gold,border:"1px solid "+C.gold+"20",fontWeight:600}}>{tpl} →</span>;
  })}
</div>
<FileUpload nodeId={nid} files={files} onUpload={onUpload} onRemove={onRemove}/></div>);}
if(nid==="finance"){
var totalSpend=D.fin.spend.reduce(function(a,s){return a+s.a;},0);
var capex=D.fin.spend.filter(function(s){return s.c.indexOf("Component")>=0||s.c.indexOf("Equipment")>=0;}).reduce(function(a,s){return a+s.a;},0);
var opex=totalSpend-capex;
return(<div><div style={{fontSize:22,fontWeight:700,color:C.gold,marginBottom:8}}>Financial Operating Cockpit</div>

{/* KPI Grid */}
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6,marginBottom:12}}>
{[["$"+(D.fin.burn/1000).toFixed(1)+"K","Burn / mo",C.r],["$"+(D.fin.cash/1000).toFixed(0)+"K","Cash on Hand",C.a],[D.fin.runway+"mo","Runway",D.fin.runway<4?C.r:C.g],["$"+(D.fin.bom/1000).toFixed(1)+"K","BOM Cost",C.gold],["$"+(capex/1000).toFixed(1)+"K","CAPEX",C.b],["$"+(opex/1000).toFixed(1)+"K","OPEX",C.c]].map(function(x,i){return <div key={i} style={{background:C.bg,padding:"8px 10px",borderRadius:4,borderLeft:"3px solid "+x[2]}}><div style={{fontSize:16,fontWeight:700,color:x[2],fontFamily:"'JetBrains Mono',monospace"}}>{x[0]}</div><div style={{fontSize:9,color:C.tx3,textTransform:"uppercase",letterSpacing:"0.04em"}}>{x[1]}</div></div>;})}
</div>

{/* Runway bar */}
<Sec>Runway Projection</Sec>
<div style={{background:C.bg,borderRadius:6,padding:10,marginBottom:12}}>
  <div style={{height:20,background:C.bd,borderRadius:4,overflow:"hidden",position:"relative"}}>
    <div style={{width:Math.min(D.fin.runway/12*100,100)+"%",height:"100%",background:D.fin.runway<3?C.r:D.fin.runway<6?C.a:C.g,borderRadius:4}}/>
    <span style={{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)",fontSize:10,fontWeight:700,color:C.tx,fontFamily:"'JetBrains Mono',monospace"}}>{D.fin.runway} months</span>
  </div>
  <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:C.tx3,marginTop:4}}>
    <span>Today</span><span>3mo</span><span>6mo</span><span>9mo</span><span>12mo</span>
  </div>
</div>

{/* Scenario Simulator */}
<Sec>💡 Scenario Simulator</Sec>
<div style={{background:C.bg,borderRadius:6,padding:10,marginBottom:12,border:"1px solid "+C.gold+"20"}}>
  <div style={{fontSize:11,color:C.tx3,marginBottom:8}}>What happens if...</div>
  {[
    {label:"Raise $1.5M",newCash:D.fin.cash+1500000,newBurn:D.fin.burn+5000,desc:"+2 hires → burn $"+((D.fin.burn+5000)/1000).toFixed(1)+"K/mo"},
    {label:"Raise $500K",newCash:D.fin.cash+500000,newBurn:D.fin.burn,desc:"No new hires, extend runway"},
    {label:"Cut burn 20%",newCash:D.fin.cash,newBurn:Math.round(D.fin.burn*0.8),desc:"Burn → $"+(D.fin.burn*0.8/1000).toFixed(1)+"K/mo"},
    {label:"Close Modelo pilot",newCash:D.fin.cash+50000,newBurn:D.fin.burn,desc:"+$50K deposit, +$15K/mo revenue"},
  ].map(function(sc,i){
    var newRunway=sc.newBurn>0?Math.round(sc.newCash/sc.newBurn*10)/10:99;
    return <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:i<3?"1px solid "+C.bd+"30":"none",fontSize:12}}>
      <span style={{color:C.gold,fontWeight:600,minWidth:120}}>{sc.label}</span>
      <span style={{flex:1,color:C.tx3,fontSize:11}}>{sc.desc}</span>
      <span style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:700,color:newRunway>6?C.g:newRunway>3?C.a:C.r}}>{newRunway}mo</span>
    </div>;
  })}
</div>

{/* Spend breakdown with visual bars */}
<Sec>Spend Breakdown (CAPEX vs OPEX)</Sec>
{D.fin.spend.map(function(s,i){var pct=totalSpend>0?Math.round(s.a/totalSpend*100):0;var isCapex=s.c.indexOf("Component")>=0||s.c.indexOf("Equipment")>=0;return <div key={i} style={{padding:"4px 0"}}>
  <div style={{display:"flex",alignItems:"center",gap:6,fontSize:12}}>
    <span style={{flex:1}}>{s.c}</span>
    <Tag color={isCapex?C.b:C.c}>{isCapex?"CAPEX":"OPEX"}</Tag>
    <span style={{fontFamily:"'JetBrains Mono',monospace",minWidth:50,textAlign:"right"}}>{"$"+(s.a/1000).toFixed(1)+"K"}</span>
    <span style={{fontFamily:"'JetBrains Mono',monospace",color:C.tx3,minWidth:30,textAlign:"right"}}>{pct}%</span>
  </div>
  <div style={{height:3,background:C.bd,borderRadius:2,marginTop:2,overflow:"hidden"}}><div style={{width:pct+"%",height:"100%",background:isCapex?C.b:C.c,borderRadius:2}}/></div>
</div>;})}

<Sec>Supply Chain Risk</Sec>
{D.supply.map(function(s,i){return <div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 0",fontSize:13,borderBottom:"1px solid "+C.bd+"30"}}>
  <Dot s={s.risk==="high"?"critical":s.risk==="medium"?"progress":"active"}/>
  <span style={{flex:1}}>{s.item}</span>
  <span style={{fontSize:11,color:C.tx3}}>{s.supplier}</span>
  <Tag color={dc(s.risk==="high"?"critical":"active")}>{s.risk}</Tag>
  <span style={{fontSize:11,color:C.tx3}}>{s.lead}</span>
</div>;})}
<FileUpload nodeId={nid} files={files} onUpload={onUpload} onRemove={onRemove}/></div>);}
if(nid==="team"){var doneCount=D.tasks.filter(function(t){return t.status==="done";}).length;var avgPct=D.tasks.length?Math.round(D.tasks.reduce(function(a,t){return a+(t.pct||0);},0)/D.tasks.length):0;return(<div><div style={{fontSize:22,fontWeight:700,color:C.gold,marginBottom:8}}>Task Board</div><Row label="Total" value={D.tasks.length}/><Row label="Critical" value={cr} color={cr?C.r:C.g}/><Row label="Done" value={doneCount+"/"+D.tasks.length} color={C.g}/><Row label="Avg Completion" value={avgPct+"%"} color={avgPct>60?C.g:C.a}/><div style={{marginTop:6,marginBottom:12}}><div style={{height:8,background:C.bd,borderRadius:4,overflow:"hidden"}}><div style={{width:avgPct+"%",height:"100%",background:avgPct>=80?C.g:avgPct>=40?C.gold:C.a,borderRadius:4,transition:"width 0.3s"}}/></div></div>{canEdit&&<div style={{marginBottom:10}}><Btn v="gold" onClick={function(){setShowCreate({type:"tasks"});}}>+ New Task</Btn></div>}<Sec>All Tasks</Sec>{D.tasks.map(function(t,i){var pct=t.pct||0;return <div key={i} style={{padding:"6px 0",borderBottom:"1px solid "+C.bd+"30"}}><div style={{display:"flex",alignItems:"center",gap:6,fontSize:14}}><Dot s={t.status}/><span style={{flex:1}}>{t.title}</span><Tag color={dc(t.pri)}>{t.pri}</Tag><Tag>{t.ws}</Tag><span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:pct>=100?C.g:pct>=50?C.gold:C.tx3,minWidth:32,textAlign:"right"}}>{pct}%</span><span style={{fontSize:12,color:C.tx3}}>{t.due}</span></div><div style={{marginTop:3,height:4,background:C.bd,borderRadius:2,overflow:"hidden"}}><div style={{width:pct+"%",height:"100%",background:pct>=100?C.g:pct>=50?C.gold:C.a,borderRadius:2}}/></div></div>;})}<FileUpload nodeId={nid} files={files} onUpload={onUpload} onRemove={onRemove}/></div>);}
if(nid==="roadmap"){var avgS=Math.round(D.safety.reduce(function(a,s){return a+s.cov;},0)/D.safety.length);return(<div><div style={{fontSize:22,fontWeight:700,color:C.gold,marginBottom:8}}>Roadmap</div><Sec>Milestones</Sec>{D.milestones.map(function(m,i){return <div key={i} style={{padding:"8px 0",borderBottom:"1px solid "+C.bd+"30"}}><div style={{fontSize:14}}><span style={{fontWeight:600}}>{m.title}</span> <Tag color={dc(m.risk)}>{m.risk}</Tag> <span style={{color:C.tx3}}>{m.target}</span></div><div style={{marginTop:3}}><PB val={m.pct} w={100}/> <span style={{fontFamily:"'JetBrains Mono',monospace"}}>{m.pct}%</span></div>{m.blockers.length>0&&<div style={{fontSize:12,color:C.r,marginTop:2}}>{m.blockers.join(" | ")}</div>}</div>;})}<Sec>Safety ({avgS}%)</Sec>{D.safety.map(function(sf,i){return <div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 0",fontSize:14}}><span style={{flex:1}}>{sf.name}</span><PB val={sf.cov} w={50} color={sf.cov>70?C.g:sf.cov>50?C.a:C.r}/><span style={{fontFamily:"'JetBrains Mono',monospace"}}>{sf.cov}%</span></div>;})}<FileUpload nodeId={nid} files={files} onUpload={onUpload} onRemove={onRemove}/></div>);}
// ── Catch-all: render any NODE_TREE node with full features ──
var nodeConfig=findNode(nid,acts.liveTree);
if(nodeConfig){
  var seedRows=acts.applyFilters(acts.getSeedRows(nid),nodeConfig.columns);
  var ce=acts.canEdit;
  var vm=acts.viewMode;
  var nodeRels=(acts.relations||[]).filter(function(r){return r.sourceId===nid||r.targetId===nid;});
  var addNewRow=function(){var newId="new_"+Date.now();var name=prompt("Name:");if(!name||!name.trim())return;var row={id:newId,name:name.trim(),description:""};nodeConfig.columns.forEach(function(col){if(!row[col.key]){if(col.type==="progress"||col.type==="number")row[col.key]=0;else if(col.type==="status")row[col.key]="planned";else if(col.type==="priority")row[col.key]="medium";else if(col.type==="person")row[col.key]="Jero";else row[col.key]="";}});acts.seedAddRow(nid,row);acts.logActivity("create",nid,nodeConfig.label,"Added row: "+name.trim());};
  return(<div>
    {/* Header */}
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
      <span style={{fontSize:22}}>{nodeConfig.icon}</span>
      <div style={{flex:1,fontSize:22,fontWeight:700,color:C.gold}}>{nodeConfig.label}</div>
      {!ce&&<span style={{fontSize:10,color:C.tx3,padding:"2px 8px",background:C.bg3,borderRadius:3,border:"1px solid "+C.bd}}>🔒 Login to edit</span>}
      {ce&&<span onClick={function(){acts.deleteNodeFromTree(nid);acts.logActivity("delete",nid,nodeConfig.label,"Deleted node");}} style={{fontSize:10,color:C.r,padding:"3px 8px",borderRadius:3,border:"1px solid "+C.r+"30",background:C.r+"08",cursor:"pointer"}}>🗑 Delete</span>}
    </div>
    <div style={{fontSize:13,color:C.tx2,marginBottom:8,lineHeight:1.6}}>{nodeConfig.description}</div>
    <div style={{fontSize:10,color:C.tx3,marginBottom:12,fontFamily:"'JetBrains Mono',monospace"}}>ID: {nid} | Table: {nodeConfig.dbTable}</div>

    {/* Sub-nodes */}
    {nodeConfig.children&&nodeConfig.children.length>0&&<div style={{marginBottom:14}}>
      <Sec>Sub-nodes ({nodeConfig.children.length}){ce&&<span onClick={function(){var name=prompt("New sub-node name:");if(!name||!name.trim())return;var id="sub-"+Date.now();acts.addNodeToTree(nid,{id:id,label:name.trim(),icon:"📎",description:name.trim(),dbTable:"subsystems",columns:[{key:"name",label:"Name",type:"text",editable:true,width:180},{key:"description",label:"Description",type:"text",editable:true,width:250},{key:"maturity_level",label:"Maturity",type:"progress",editable:true,width:120},{key:"status",label:"Status",type:"status",editable:true,width:100},{key:"criticality",label:"Criticality",type:"priority",editable:true,width:100},{key:"owner",label:"Owner",type:"person",editable:true,width:100}],children:[]});acts.logActivity("create",nid,nodeConfig.label,"Added sub-node: "+name.trim());}} style={{color:C.gold,cursor:"pointer",marginLeft:8,fontSize:11,fontWeight:400}}>+ Add</span>}</Sec>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
        {nodeConfig.children.map(function(ch){var chRows=acts.getSeedRows(ch.id);return <div key={ch.id} onClick={function(){setSel({level:"sub",id:ch.id});}} style={{padding:"8px 10px",background:C.bg,borderRadius:4,border:"1px solid "+C.bd,cursor:"pointer",borderLeft:"3px solid "+C.gold+"40"}} onMouseEnter={function(e){e.currentTarget.style.borderLeftColor=C.gold;}} onMouseLeave={function(e){e.currentTarget.style.borderLeftColor=C.gold+"40";}}>
          <div style={{display:"flex",alignItems:"center",gap:4}}><span>{ch.icon}</span><span style={{fontSize:12,fontWeight:600,color:C.tx,flex:1}}>{ch.label}</span><span style={{fontSize:9,color:C.tx3,fontFamily:"'JetBrains Mono',monospace"}}>{chRows.length}</span>{ce&&<span onClick={function(e){e.stopPropagation();acts.deleteNodeFromTree(ch.id);}} style={{color:C.r,fontSize:9,opacity:0.5}}>x</span>}</div>
          <div style={{fontSize:10,color:C.tx3,marginTop:2}}>{ch.description}</div>
        </div>;})}
      </div>
    </div>}

    {/* View toggle + Filters */}
    <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
      <div style={{display:"flex",gap:2}}>
        {[["table","Table"],["kanban","Kanban"]].map(function(v){return <span key={v[0]} onClick={function(){acts.setViewMode(v[0]);}} style={{padding:"3px 10px",fontSize:10,fontWeight:600,borderRadius:3,cursor:"pointer",background:vm===v[0]?C.gold+"15":"transparent",color:vm===v[0]?C.gold:C.tx3,border:"1px solid "+(vm===v[0]?C.gold+"30":C.bd)}}>{v[1]}</span>;})}
      </div>
      <div style={{flex:1}}/>
      <span style={{fontSize:11,color:C.tx3}}>{seedRows.length} entries</span>
      {ce&&<span onClick={addNewRow} style={{fontSize:10,color:C.gold,cursor:"pointer",padding:"3px 8px",borderRadius:3,border:"1px solid "+C.gold+"30"}}>+ Add row</span>}
    </div>

    {/* Filters bar */}
    <FiltersBar columns={nodeConfig.columns} rows={acts.getSeedRows(nid)} filters={acts.filters} onFilterChange={function(k,v){acts.setFilters(function(p){var n=Object.assign({},p);if(v)n[k]=v;else delete n[k];return n;});}} onClearFilters={function(){acts.setFilters({});acts.setNodeSearch("");acts.setSortKey("");acts.setGroupBy("");}} sortKey={acts.sortKey} sortDir={acts.sortDir} onSortChange={function(k){if(acts.sortKey===k)acts.setSortDir(acts.sortDir==="asc"?"desc":"asc");else{acts.setSortKey(k);acts.setSortDir("asc");}}} groupBy={acts.groupBy} onGroupByChange={function(k){acts.setGroupBy(k);}} searchQuery={acts.nodeSearch} onSearchChange={function(q){acts.setNodeSearch(q);}}/>

    {/* Table or Kanban view */}
    {vm==="table"&&seedRows.length>0&&<div style={{overflowX:"auto",marginTop:8}}>
      <NodeBoard nodeConfig={nodeConfig} rows={seedRows}
        onCellEdit={ce?function(rowId,key,val){acts.seedUpdateCell(nid,rowId,key,val);acts.logActivity("edit",nid,nodeConfig.label,"Updated "+key);}:undefined}
        onAddRow={ce?addNewRow:undefined}
        onDeleteRow={ce?function(rowId){if(confirm("Delete?"))acts.seedDeleteRow(nid,rowId);acts.logActivity("delete",nid,nodeConfig.label,"Deleted row");}:undefined}
      />
    </div>}
    {vm==="kanban"&&<KanbanView rows={seedRows} statusKey="status" labelKey={nodeConfig.columns[0]?nodeConfig.columns[0].key:"name"} onStatusChange={ce?function(rowId,newStatus){acts.seedUpdateCell(nid,rowId,"status",newStatus);acts.logActivity("status_change",nid,nodeConfig.label,"Status → "+newStatus);}:undefined}/>}
    {seedRows.length===0&&<div style={{padding:20,textAlign:"center",color:C.tx3,fontSize:13}}>No data yet.</div>}

    {/* Relations */}
    <div style={{marginTop:16}}><RelationsPanel nodeId={nid} relations={nodeRels} allNodes={acts.allNodesList} canEdit={ce} onAddRelation={function(r){var nr=Object.assign({id:"rel_"+Date.now()},r);acts.setRelations(function(p){return p.concat([nr]);});acts.logActivity("create",nid,nodeConfig.label,"Added relation: "+r.type+" → "+r.targetId);}} onDeleteRelation={function(id){acts.setRelations(function(p){return p.filter(function(r){return r.id!==id;});});}}/></div>

    {/* Automations */}
    {ce&&<div style={{marginTop:16}}><Sec>Automations</Sec><AutomationsPanel rules={acts.automations.filter(function(a){return true;})} onAddRule={function(rule){acts.setAutomations(function(p){return p.concat([rule]);});acts.logActivity("automation",nid,nodeConfig.label,"Created automation: "+rule.name);}} onDeleteRule={function(id){acts.setAutomations(function(p){return p.filter(function(r){return r.id!==id;});});}} onToggleRule={function(id){acts.setAutomations(function(p){return p.map(function(r){return r.id===id?Object.assign({},r,{enabled:!r.enabled}):r;});});}} agents={AGENTS.map(function(a){return{id:a.id,name:a.name,icon:a.icon};})}/></div>}

    {/* Activity Feed */}
    <div style={{marginTop:16}}><Sec>Activity</Sec><ActivityFeed events={(acts.activity||[]).filter(function(e){return e.nodeId===nid;}).slice(0,20)}/></div>

    <FileUpload nodeId={nid} files={files} onUpload={onUpload} onRemove={onRemove}/>
  </div>);
}
return null;}


function SubPage({sub,D,acts,files,onUpload,onRemove}){if(!sub)return null;var d=sub.data;var tp=sub.type;var ce=acts.canEdit;var uf=acts.updateField;var uaf=acts.updateArrayField;
// col mapping
var col=tp==="ss"?"ss":tp==="skill"?"skills":tp==="exp"?"exps":tp==="inc"?"incidents":tp==="pilot"?"pilots":tp==="inv"?"investors":tp==="task"?"tasks":tp==="fl"?"fleet":tp==="ms"?"milestones":tp==="safe"?"safety":tp==="sply"?"supply":"";
var F=function(field,val){if(col){uf(col,d.id,field,val);if(acts.apiSave)acts.apiSave(col,d.id,Object.fromEntries([[field,val]]));}};
var FA=function(field,arr){if(col){uaf(col,d.id,field,arr);if(acts.apiSave)acts.apiSave(col,d.id,Object.fromEntries([[field,arr]]));}};
var DeleteBtn=ce?<div style={{marginTop:12}}><span onClick={function(){if(acts.apiDelete)acts.apiDelete(col,d.id);}} style={{cursor:"pointer",fontSize:11,color:C.r,padding:"4px 10px",border:"1px solid "+C.r+"30",borderRadius:3,background:C.r+"08"}}>🗑 Delete {tp}</span></div>:null;

if(tp==="ss")return(<div><EditTitle text={d.name} canEdit={ce} onSave={function(v){F("name",v);}}/><div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}><Tag color={dc(d.status)}>{d.status}</Tag><Tag>{d.ver}</Tag><Tag>Owner: {d.owner}</Tag></div>
<Row label="Maturity" value={d.mat+"%"} color={d.mat>70?C.g:d.mat>50?C.a:C.r} canEdit={ce} onSave={function(v){F("mat",parseInt(v)||0);}}/><Row label="Issues" value={d.issues} canEdit={ce} onSave={function(v){F("issues",parseInt(v)||0);}}/><Row label="Status" value={d.status} canEdit={ce} onSave={function(v){F("status",v);}}/><Row label="Version" value={d.ver} canEdit={ce} onSave={function(v){F("ver",v);}}/><Row label="Owner" value={d.owner} canEdit={ce} onSave={function(v){F("owner",v);}}/><Row label="Last Test" value={d.lastTest} canEdit={ce} onSave={function(v){F("lastTest",v);}}/>
<Sec>Technical Specifications</Sec><EList items={d.d||[]} canEdit={ce} onUpdate={function(a){FA("d",a);}}/><Sec>Known Risks</Sec><EList items={d.risks||[]} canEdit={ce} onUpdate={function(a){FA("risks",a);}} color={C.r}/>
<NoteBox notes={d.notes} onAdd={function(t){acts.addNote("ss",d.id,t);}}/>
{getBlocks(d.id,D.deps).length>0&&<div><Sec>Blocks (downstream)</Sec>{getBlocks(d.id,D.deps).map(function(dep,i){return <div key={i} style={{fontSize:13,color:C.a,padding:"3px 0"}}>{"\u2192"} {dep.blocks.join(", ")} - {dep.reason}</div>;})}</div>}
{getBlockedBy(d.id,D.deps).length>0&&<div><Sec>Blocked By (upstream)</Sec>{getBlockedBy(d.id,D.deps).map(function(dep,i){return <div key={i} style={{fontSize:13,color:C.r,padding:"3px 0"}}>{"\u2190"} {dep.fromLabel} - {dep.reason}</div>;})}</div>}
{D.incLinks&&Object.keys(D.incLinks).filter(function(k){return(D.incLinks[k].ss||[]).indexOf(d.id)>=0;}).length>0&&<div><Sec>Linked Incidents</Sec>{Object.keys(D.incLinks).filter(function(k){return(D.incLinks[k].ss||[]).indexOf(d.id)>=0;}).map(function(k,i){return <div key={i} style={{fontSize:13,color:C.r}}>{k}: {D.incLinks[k].desc}</div>;})}</div>}

{/* Version History & Architecture Docs */}
<Sec>📐 Version History</Sec>
<div style={{background:C.bg,borderRadius:6,padding:10,marginBottom:8,border:"1px solid "+C.bd}}>
  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
    <span style={{fontSize:14,fontWeight:700,color:C.gold,fontFamily:"'JetBrains Mono',monospace"}}>{d.ver}</span>
    <Tag color={dc(d.status)}>{d.status}</Tag>
    <span style={{fontSize:10,color:C.tx3}}>Current version</span>
  </div>
  <div style={{fontSize:10,color:C.tx3,marginBottom:4}}>Maturity: {d.mat}% | Issues: {d.issues} | Last tested: {d.lastTest}</div>
  {/* Readiness stage */}
  {(function(){var stage=d.mat>=80?"DEPLOYABLE":d.mat>=65?"ROBUST":d.mat>=50?"TESTED":d.mat>=30?"PROTOTYPE":"CONCEPT";
    var stageColor=d.mat>=80?C.g:d.mat>=65?"#3B9":d.mat>=50?C.a:d.mat>=30?C.gold:C.r;
    return <div style={{display:"inline-block",padding:"2px 8px",fontSize:10,fontWeight:700,borderRadius:3,background:stageColor+"15",color:stageColor,border:"1px solid "+stageColor+"30",letterSpacing:"0.06em",marginBottom:6}}>{stage}</div>;
  })()}
  {/* Architecture details */}
  {d.d&&d.d.length>0&&<div>
    <div style={{fontSize:9,color:C.tx3,textTransform:"uppercase",marginBottom:2}}>Architecture Specs</div>
    {d.d.map(function(spec,j){return <div key={j} style={{fontSize:10,color:C.tx2,padding:"1px 0",paddingLeft:6,borderLeft:"2px solid "+C.gold+"20"}}>{spec}</div>;})}
  </div>}
  {/* What changed / risks */}
  {d.risks&&d.risks.length>0&&<div style={{marginTop:6}}>
    <div style={{fontSize:9,color:C.r,textTransform:"uppercase",marginBottom:2}}>Known Risks & Open Issues</div>
    {d.risks.map(function(r,j){return <div key={j} style={{fontSize:10,color:C.r,padding:"1px 0",paddingLeft:6,borderLeft:"2px solid "+C.r+"30"}}>{r}</div>;})}
  </div>}
  {ce&&<div style={{marginTop:6,display:"flex",gap:4}}>
    <span onClick={function(){var v=prompt("New version tag (e.g. v3.3):");if(v)F("ver",v);}} style={{fontSize:9,color:C.gold,cursor:"pointer",padding:"2px 6px",border:"1px solid "+C.gold+"25",borderRadius:3}}>+ Bump Version</span>
  </div>}
</div>
<FileUpload nodeId={d.id} files={files} onUpload={onUpload} onRemove={onRemove}/>{DeleteBtn}</div>);

if(tp==="skill")return(<div><EditTitle text={d.name} canEdit={ce} onSave={function(v){F("name",v);}}/><Tag color={dc(d.status)}>{d.status}</Tag>
<Row label="Success Rate" value={d.success+"%"} color={d.success>80?C.g:C.a} canEdit={ce} onSave={function(v){F("success",parseInt(v)||0);}}/><Row label="Tests Run" value={d.tests} canEdit={ce} onSave={function(v){F("tests",parseInt(v)||0);}}/><Row label="Status" value={d.status} canEdit={ce} onSave={function(v){F("status",v);}}/><Row label="Last Tested" value={d.lastTest} canEdit={ce} onSave={function(v){F("lastTest",v);}}/>
<Sec>Test Protocol</Sec><EText text={d.protocol} canEdit={ce} onSave={function(v){F("protocol",v);}}/><Sec>Gaps</Sec><EList items={d.gaps||[]} canEdit={ce} onUpdate={function(a){FA("gaps",a);}} color={C.a}/>
<NoteBox notes={d.notes} onAdd={function(t){acts.addNote("skills",d.id,t);}}/>
{getBlockedBy(d.id,D.deps).length>0&&<div><Sec>Blocked By</Sec>{getBlockedBy(d.id,D.deps).map(function(dep,i){return <div key={i} style={{fontSize:13,color:C.r,padding:"3px 0"}}>{"\u2190"} {dep.fromLabel} - {dep.reason}</div>;})}</div>}
{getBlocks(d.id,D.deps).length>0&&<div><Sec>Blocks</Sec>{getBlocks(d.id,D.deps).map(function(dep,i){return <div key={i} style={{fontSize:13,color:C.a,padding:"3px 0"}}>{"\u2192"} {dep.blocks.join(", ")} - {dep.reason}</div>;})}</div>}
</div>);

if(tp==="exp")return(<div><div style={{fontSize:14,fontWeight:700,color:C.gold,fontFamily:"'JetBrains Mono',monospace",marginBottom:4}}>{d.id}</div><EditTitle text={d.title} canEdit={ce} onSave={function(v){F("title",v);}}/><div style={{display:"flex",gap:6,marginBottom:8}}><Tag color={dc(d.outcome)}>{d.outcome}</Tag><Tag>Conf {d.conf}/5</Tag><Tag>{d.date}</Tag></div>
<Row label="Outcome" value={d.outcome} canEdit={ce} onSave={function(v){F("outcome",v);}}/><Row label="Confidence" value={d.conf+"/5"} canEdit={ce} onSave={function(v){F("conf",parseInt(v)||0);}}/><Row label="Title" value={d.title} canEdit={ce} onSave={function(v){F("title",v);}}/><Row label="Date" value={d.date} canEdit={ce} onSave={function(v){F("date",v);}}/>
<Sec>Parameters</Sec><EList items={d.p||[]} canEdit={ce} onUpdate={function(a){FA("p",a);}}/>{d.conclusion&&<div><Sec>Conclusion</Sec><EText text={d.conclusion} canEdit={ce} onSave={function(v){F("conclusion",v);}}/></div>}
<NoteBox notes={d.notes} onAdd={function(t){acts.addNote("exps",d.id,t);}}/>{DeleteBtn}</div>);

if(tp==="inc")return(<div><div style={{fontSize:14,fontWeight:700,color:C.gold,fontFamily:"'JetBrains Mono',monospace",marginBottom:4}}>{d.id}</div><EditTitle text={d.desc} canEdit={ce} onSave={function(v){F("desc",v);}}/><div style={{display:"flex",gap:6,marginBottom:8}}><Tag color={dc(d.sev)}>{d.sev}</Tag><Tag color={dc(d.status)}>{d.status}</Tag></div>
<Row label="Description" value={d.desc} canEdit={ce} onSave={function(v){F("desc",v);}}/><Row label="Severity" value={d.sev} canEdit={ce} onSave={function(v){F("sev",v);}}/><Row label="Status" value={d.status} canEdit={ce} onSave={function(v){F("status",v);}}/><Row label="Downtime" value={d.down} color={C.r} canEdit={ce} onSave={function(v){F("down",v);}}/><Row label="Root Cause" value={d.root} canEdit={ce} onSave={function(v){F("root",v);}}/><Row label="Reported" value={d.reported} canEdit={ce} onSave={function(v){F("reported",v);}}/>
<Sec>Corrective Actions</Sec><EList items={d.acts||[]} canEdit={ce} onUpdate={function(a){FA("acts",a);}}/><Sec>Timeline</Sec><EList items={d.timeline||[]} canEdit={ce} onUpdate={function(a){FA("timeline",a);}} color={C.tx2}/>
{d.status!=="resolved"&&<div style={{marginTop:8}}><Btn v="success" onClick={function(){acts.resInc(d.id);}}>Mark Resolved</Btn></div>}
{D.incLinks&&D.incLinks[d.id]&&<div><Sec>Linked Entities</Sec>
<div style={{fontSize:13}}>{(D.incLinks[d.id].ss||[]).length>0&&<div style={{color:C.tx}}>Subsystems: {(D.incLinks[d.id].ss||[]).map(function(s){var ss=D.ss.find(function(x){return x.id===s;});return ss?ss.name+" ("+ss.mat+"%)":s;}).join(", ")}</div>}
{(D.incLinks[d.id].tasks||[]).length>0&&<div style={{color:C.tx}}>Tasks: {(D.incLinks[d.id].tasks||[]).join(", ")}</div>}
{(D.incLinks[d.id].fleet||[]).length>0&&<div style={{color:C.tx}}>Fleet: {(D.incLinks[d.id].fleet||[]).map(function(f){var fl=D.fleet.find(function(x){return x.id===f;});return fl?fl.unit:f;}).join(", ")}</div>}
</div></div>}
{getBlocks(d.id,D.deps).length>0&&<div><Sec>Downstream Impact</Sec>{getBlocks(d.id,D.deps).map(function(dep,i){return <div key={i} style={{fontSize:13,color:C.a,padding:"3px 0"}}>{"\u2192"} blocks {dep.blocks.join(", ")} - {dep.reason}</div>;})}</div>}
<NoteBox notes={d.notes} onAdd={function(t){acts.addNote("incidents",d.id,t);}}/>{DeleteBtn}</div>);

if(tp==="pilot")return(<div><EditTitle text={d.name} canEdit={ce} onSave={function(v){F("name",v);}}/><div style={{display:"flex",gap:6,marginBottom:8,flexWrap:"wrap"}}><Tag color={C.gold}>{d.stage}</Tag><Tag color={dc(d.risk)}>{d.risk} risk</Tag></div>
<Row label="ROI" value={d.roi} color={C.g} canEdit={ce} onSave={function(v){F("roi",v);}}/><Row label="Viability" value={d.viab+"%"} canEdit={ce} onSave={function(v){F("viab",parseInt(v)||0);}}/><Row label="Champion" value={d.champ} canEdit={ce} onSave={function(v){F("champ",v);}}/><Row label="Champ Strength" value={d.champStr} color={d.champStr==="Strong"?C.g:d.champStr==="None"?C.r:C.a} canEdit={ce} onSave={function(v){F("champStr",v);}}/><Row label="Plant" value={d.plant} canEdit={ce} onSave={function(v){F("plant",v);}}/><Row label="PLC" value={d.plc} canEdit={ce} onSave={function(v){F("plc",v);}}/><Row label="Stage" value={d.stage} canEdit={ce} onSave={function(v){F("stage",v);}}/><Row label="Risk" value={d.risk} canEdit={ce} onSave={function(v){F("risk",v);}}/><Row label="Next Step" value={d.nextStep} canEdit={ce} onSave={function(v){F("nextStep",v);}}/><Row label="Follow-up" value={d.fu} canEdit={ce} onSave={function(v){F("fu",v);}}/>
<Sec>Pain Point</Sec><EText text={d.pain} canEdit={ce} onSave={function(v){F("pain",v);}}/><Sec>Required Skills</Sec><EList items={d.skills||[]} canEdit={ce} onUpdate={function(a){FA("skills",a);}} color={C.c}/><Sec>Compliance</Sec><EList items={d.comp||[]} canEdit={ce} onUpdate={function(a){FA("comp",a);}} color={C.r}/><Sec>Blockers</Sec><EList items={d.blockers||[]} canEdit={ce} onUpdate={function(a){FA("blockers",a);}} color={C.r}/><Sec>Open Questions</Sec><EList items={d.qs||[]} canEdit={ce} onUpdate={function(a){FA("qs",a);}} color={C.tx2}/>
{d.meetings&&d.meetings.length>0&&<div><Sec>Meetings</Sec>{d.meetings.map(function(m,i){return <div key={i} style={{fontSize:13,padding:"4px 0"}}><span style={{color:C.gold,fontFamily:"'JetBrains Mono',monospace"}}>{m.d}</span> {m.n}</div>;})}</div>}
{D.pilotDeadlines&&D.pilotDeadlines[d.id]&&<div><Sec>Timeline Constraint</Sec><div style={{padding:"6px 8px",background:C.a+"08",borderLeft:"3px solid "+C.a,borderRadius:3,fontSize:13}}><div style={{fontWeight:600,color:C.a}}>Need by: {D.pilotDeadlines[d.id].needBy}</div><div style={{color:C.tx2,marginTop:2}}>{D.pilotDeadlines[d.id].reason}</div>{D.pilotDeadlines[d.id].gatedBy&&<div style={{color:C.tx3,marginTop:2}}>Gated by: {D.pilotDeadlines[d.id].gatedBy.join(", ")}</div>}</div></div>}
{getBlockedBy(d.id,D.deps).length>0&&<div><Sec>Blocked By</Sec>{getBlockedBy(d.id,D.deps).map(function(dep,i){return <div key={i} style={{fontSize:13,color:C.r,padding:"3px 0"}}>{"\u2190"} {dep.fromLabel} - {dep.reason}</div>;})}</div>}
<div style={{marginTop:8,display:"flex",gap:6}}><Btn v="gold" onClick={function(){acts.advP(d.id);}}>Advance Stage</Btn></div>

{/* Manufacturing Line Analysis Template */}
<Sec>🏭 Line Analysis</Sec>
<div style={{background:C.bg,borderRadius:6,padding:10,marginBottom:8,border:"1px solid "+C.bd}}>
  <Row label="Plant" value={d.plant} canEdit={ce} onSave={function(v){F("plant",v);}}/>
  <Row label="PLC System" value={d.plc} canEdit={ce} onSave={function(v){F("plc",v);}}/>
  <Row label="Pain Point" value={d.pain} canEdit={ce} onSave={function(v){F("pain",v);}}/>
  <Row label="ROI Estimate" value={d.roi} canEdit={ce} onSave={function(v){F("roi",v);}}/>
  <Row label="Risk Level" value={d.risk} canEdit={ce} onSave={function(v){F("risk",v);}}/>
  {/* Compliance requirements */}
  {d.comp&&d.comp.length>0&&<div style={{marginTop:4}}>
    <div style={{fontSize:9,color:C.tx3,textTransform:"uppercase",marginBottom:2}}>Compliance Requirements</div>
    <div style={{display:"flex",gap:3,flexWrap:"wrap"}}>{d.comp.map(function(c2,j){
      var sf=D.safety.find(function(s){return s.name===c2;});
      var cov=sf?sf.cov:0;
      return <span key={j} style={{padding:"2px 6px",fontSize:10,borderRadius:3,background:(cov>70?C.g:cov>40?C.a:C.r)+"12",color:cov>70?C.g:cov>40?C.a:C.r,border:"1px solid "+(cov>70?C.g:cov>40?C.a:C.r)+"25"}}>{c2} {cov}%</span>;
    })}</div>
  </div>}
  {/* Open questions */}
  {d.qs&&d.qs.length>0&&<div style={{marginTop:6}}>
    <div style={{fontSize:9,color:C.tx3,textTransform:"uppercase",marginBottom:2}}>Open Questions</div>
    {d.qs.map(function(q,j){return <div key={j} style={{fontSize:10,color:C.a,padding:"1px 0",paddingLeft:6,borderLeft:"2px solid "+C.a+"30"}}>{q}</div>;})}
  </div>}
  {ce&&<span onClick={function(){var q2=prompt("Add open question:");if(q2){var qs2=(d.qs||[]).concat([q2]);F("qs",qs2);}}} style={{display:"inline-block",marginTop:4,fontSize:9,color:C.gold,cursor:"pointer",padding:"2px 6px",border:"1px solid "+C.gold+"25",borderRadius:3}}>+ Add Question</span>}
</div>

{/* Meeting Intelligence */}
<Sec>📅 Meeting Intelligence</Sec>
<div style={{background:C.bg,borderRadius:6,padding:10,marginBottom:8,border:"1px solid "+C.bd}}>
  {d.meetings&&d.meetings.length>0?d.meetings.map(function(m,i){return <div key={i} style={{padding:"4px 0",borderBottom:i<d.meetings.length-1?"1px solid "+C.bd+"20":"none",fontSize:12}}>
    <div style={{display:"flex",gap:6}}>
      <span style={{color:C.gold,fontFamily:"'JetBrains Mono',monospace",minWidth:50,fontSize:11}}>{m.d}</span>
      <span style={{color:C.tx}}>{m.n}</span>
    </div>
  </div>;}):
  <div style={{fontSize:11,color:C.tx3}}>No meetings recorded</div>}
  {ce&&<div style={{marginTop:6}}><span onClick={function(){var d2=prompt("Meeting date (e.g. Mar 20):");var n2=prompt("Meeting notes:");if(d2&&n2){var meetings=(d.meetings||[]).concat([{d:d2,n:n2}]);F("meetings",meetings);}}} style={{fontSize:10,color:C.gold,cursor:"pointer",padding:"3px 8px",border:"1px solid "+C.gold+"25",borderRadius:3}}>+ Add Meeting</span></div>}
</div>

{/* Contact / Champion */}
<Sec>👤 Key Contacts</Sec>
<Row label="Champion" value={d.champ} canEdit={ce} onSave={function(v){F("champ",v);}}/>
<Row label="Strength" value={d.champStr} canEdit={ce} onSave={function(v){F("champStr",v);}}/>
<Row label="Next Step" value={d.nextStep} canEdit={ce} onSave={function(v){F("nextStep",v);}}/>
{d.fu&&<Row label="Follow-up" value={d.fu} canEdit={ce} onSave={function(v){F("fu",v);}}/>}

{/* Skills required */}
{d.skills&&d.skills.length>0&&<div><Sec>Required Skills</Sec>
  <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{d.skills.map(function(sk,j){
    var matched=D.skills.find(function(s){return s.name.toLowerCase().indexOf(sk.toLowerCase())>=0;});
    var pct=matched?matched.success:0;
    return <span key={j} style={{padding:"3px 8px",fontSize:11,borderRadius:4,background:(pct>80?C.g:pct>50?C.a:C.r)+"12",color:pct>80?C.g:pct>50?C.a:C.r,border:"1px solid "+(pct>80?C.g:pct>50?C.a:C.r)+"25"}}>{sk} {pct>0?pct+"%":""}</span>;
  })}</div>
</div>}

<NoteBox notes={d.notes} onAdd={function(t){acts.addNote("pilots",d.id,t);}}/>{DeleteBtn}</div>);

if(tp==="inv")return(<div><EditTitle text={d.name} canEdit={ce} onSave={function(v){F("name",v);}}/><Tag color={C.gold}>{d.stage}</Tag>
<Row label="Probability" value={d.prob+"%"} color={d.prob>=30?C.g:C.a} canEdit={ce} onSave={function(v){F("prob",parseInt(v)||0);}}/><Row label="Check Size" value={d.check} canEdit={ce} onSave={function(v){F("check",v);}}/><Row label="Stage" value={d.stage} canEdit={ce} onSave={function(v){F("stage",v);}}/><Row label="Next Action" value={d.next} canEdit={ce} onSave={function(v){F("next",v);}}/><Row label="Date" value={d.nextDate} canEdit={ce} onSave={function(v){F("nextDate",v);}}/>
<Sec>Thesis Fit</Sec><EText text={d.thesis} canEdit={ce} onSave={function(v){F("thesis",v);}}/><Sec>Touchpoints</Sec><EList items={d.tp||[]} canEdit={ce} onUpdate={function(a){FA("tp",a);}}/><Sec>Objections</Sec><EList items={d.objections||[]} canEdit={ce} onUpdate={function(a){FA("objections",a);}} color={C.a}/>
<div style={{marginTop:8,display:"flex",gap:6}}><Btn v="gold" onClick={function(){acts.advI(d.id);}}>Advance Stage</Btn></div>

{/* Touchpoints */}
<Sec>📞 Touchpoints & Follow-ups</Sec>
<div style={{background:C.bg,borderRadius:6,padding:10,marginBottom:8,border:"1px solid "+C.bd}}>
  {d.tp&&d.tp.length>0?d.tp.map(function(t,i){return <div key={i} style={{fontSize:11,color:C.tx2,padding:"2px 0"}}>{t}</div>;}):
  <div style={{fontSize:11,color:C.tx3}}>No touchpoints recorded</div>}
</div>
<Row label="Next Action" value={d.next} canEdit={ce} onSave={function(v){F("next",v);}}/>
{d.thesis&&<Row label="Thesis Match" value={d.thesis} canEdit={ce} onSave={function(v){F("thesis",v);}}/>}

{/* Objections */}
{d.objections&&d.objections.length>0&&<div><Sec>⚠️ Objections</Sec>
  {d.objections.map(function(o,j){return <div key={j} style={{fontSize:12,color:C.a,padding:"2px 0",paddingLeft:8,borderLeft:"2px solid "+C.a+"30"}}>{o}</div>;})}
</div>}

<NoteBox notes={d.notes} onAdd={function(t){acts.addNote("investors",d.id,t);}}/>{DeleteBtn}</div>);

if(tp==="task"){
var priColors={"low":C.b,"medium":C.a,"high":C.a,"critical":C.r};
var priOpts=["low","medium","high","critical"];
var statusOpts=["todo","progress","blocked","done"];
var pct=d.pct||0;
return(<div><EditTitle text={d.title} canEdit={ce} onSave={function(v){F("title",v);}}/>
<div style={{display:"flex",gap:6,marginBottom:12,flexWrap:"wrap"}}><Tag color={dc(d.status)}>{d.status}</Tag><Tag color={dc(d.pri)}>{d.pri}</Tag><Tag>{d.ws}</Tag>{d.due&&<Tag>{d.due}</Tag>}</div>

{/* Progress bar */}
<Sec>Completion</Sec>
<div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
  <div style={{flex:1,height:20,background:C.bd,borderRadius:4,overflow:"hidden",position:"relative"}}>
    <div style={{width:pct+"%",height:"100%",background:pct>=100?C.g:pct>=50?C.gold:C.a,borderRadius:4,transition:"width 0.3s"}}/>
    <span style={{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)",fontSize:11,fontWeight:700,color:pct>40?"#0A0A18":C.tx,fontFamily:"'JetBrains Mono',monospace"}}>{pct}%</span>
  </div>
  {ce&&<input type="range" min="0" max="100" step="5" value={pct} onChange={function(e){var v=parseInt(e.target.value);F("pct",v);}} style={{width:80,accentColor:C.gold}}/>}
</div>
{ce&&<div style={{display:"flex",gap:4,marginBottom:8}}>{[0,25,50,75,100].map(function(v){return <span key={v} onClick={function(){F("pct",v);}} style={{cursor:"pointer",padding:"2px 8px",fontSize:10,borderRadius:3,background:pct===v?C.gold+"20":C.bg3,color:pct===v?C.gold:C.tx3,border:"1px solid "+(pct===v?C.gold+"40":C.bd),fontFamily:"'JetBrains Mono',monospace"}}>{v}%</span>;})}</div>}

{/* Priority selector */}
<Sec>Priority</Sec>
<div style={{display:"flex",gap:4,marginBottom:12}}>
  {priOpts.map(function(p){var active=d.pri===p;return <span key={p} onClick={function(){if(ce)F("pri",p);}} style={{cursor:ce?"pointer":"default",padding:"4px 12px",fontSize:12,fontWeight:600,borderRadius:4,textTransform:"uppercase",letterSpacing:"0.04em",fontFamily:"'JetBrains Mono',monospace",background:active?(priColors[p]||C.a)+"18":"transparent",color:active?(priColors[p]||C.a):C.tx3,border:"1px solid "+(active?(priColors[p]||C.a)+"40":C.bd),transition:"all 0.15s"}}>{p}</span>;})}
</div>

{/* Status selector */}
<Sec>Status</Sec>
<div style={{display:"flex",gap:4,marginBottom:12}}>
  {statusOpts.map(function(s){var active=d.status===s;return <span key={s} onClick={function(){if(ce){F("status",s);if(s==="done")F("pct",100);}}} style={{cursor:ce?"pointer":"default",padding:"4px 12px",fontSize:12,fontWeight:600,borderRadius:4,textTransform:"uppercase",fontFamily:"'JetBrains Mono',monospace",background:active?dc(s)+"18":"transparent",color:active?dc(s):C.tx3,border:"1px solid "+(active?dc(s)+"40":C.bd),transition:"all 0.15s"}}>{s}</span>;})}
</div>

<Row label="Title" value={d.title} canEdit={ce} onSave={function(v){F("title",v);}}/><Row label="Due" value={d.due} canEdit={ce} onSave={function(v){F("due",v);}}/><Row label="Owner" value={d.owner} canEdit={ce} onSave={function(v){F("owner",v);}}/><Row label="Workspace" value={d.ws} canEdit={ce} onSave={function(v){F("ws",v);}}/>{d.blocked&&<Row label="Blocked By" value={d.blocked} color={C.r} canEdit={ce} onSave={function(v){F("blocked",v);}}/>}
<Sec>Business Impact</Sec><EText text={d.impact} canEdit={ce} onSave={function(v){F("impact",v);}}/><Sec>Subtasks</Sec><EList items={d.sb||[]} canEdit={ce} onUpdate={function(a){FA("sb",a);}}/>
{getBlockedBy(d.id,D.deps).length>0&&<div><Sec>Blocked By</Sec>{getBlockedBy(d.id,D.deps).map(function(dep,i){return <div key={i} style={{fontSize:13,color:C.r,padding:"3px 0"}}>{"←"} {dep.fromLabel} - {dep.reason}</div>;})}</div>}
{getBlocks(d.id,D.deps).length>0&&<div><Sec>Unblocks</Sec>{getBlocks(d.id,D.deps).map(function(dep,i){return <div key={i} style={{fontSize:13,color:C.a,padding:"3px 0"}}>{"→"} {dep.blocks.join(", ")} - {dep.reason}</div>;})}</div>}
{D.incLinks&&Object.keys(D.incLinks).filter(function(k){return(D.incLinks[k].tasks||[]).indexOf(d.id)>=0;}).length>0&&<div><Sec>Linked Incidents</Sec>{Object.keys(D.incLinks).filter(function(k){return(D.incLinks[k].tasks||[]).indexOf(d.id)>=0;}).map(function(k,i){return <div key={i} style={{fontSize:13,color:C.r}}>{k}: {D.incLinks[k].desc}</div>;})}</div>}
<div style={{marginTop:8,display:"flex",gap:8}}><Btn v={d.status==="done"?"default":"success"} onClick={function(){acts.togTask(d.id);if(d.status!=="done")F("pct",100);}}>{d.status==="done"?"Reopen":"Mark Done"}</Btn></div><NoteBox notes={d.notes} onAdd={function(t){acts.addNote("tasks",d.id,t);}}/>{DeleteBtn}</div>);}


if(tp==="fl")return(<div><EditTitle text={d.unit} canEdit={ce} onSave={function(v){F("unit",v);}}/><div style={{fontSize:15,color:C.tx2,marginBottom:8}}>{d.type}</div><Tag color={dc(d.status)}>{d.status}</Tag>
<Row label="Status" value={d.status} canEdit={ce} onSave={function(v){F("status",v);}}/><Row label="Configuration" value={d.config} canEdit={ce} onSave={function(v){F("config",v);}}/><Row label="Location" value={d.loc} canEdit={ce} onSave={function(v){F("loc",v);}}/><Row label="Hours" value={d.hours+"h"} canEdit={ce} onSave={function(v){F("hours",parseInt(v)||0);}}/>{d.health>0&&<Row label="Health" value={d.health+"%"} color={d.health>80?C.g:C.a} canEdit={ce} onSave={function(v){F("health",parseInt(v)||0);}}/>}<Row label="Last Maintenance" value={d.lastMaint} canEdit={ce} onSave={function(v){F("lastMaint",v);}}/><Row label="Next Maintenance" value={d.nextMaint} canEdit={ce} onSave={function(v){F("nextMaint",v);}}/>
<Sec>Systems Status</Sec><EList items={d.sys||[]} canEdit={ce} onUpdate={function(a){FA("sys",a);}}/></div>);

if(tp==="ms")return(<div><EditTitle text={d.title} canEdit={ce} onSave={function(v){F("title",v);}}/><div style={{display:"flex",gap:6,marginBottom:8}}><Tag color={dc(d.risk)}>{d.risk}</Tag><Tag>{d.target}</Tag></div><div style={{fontSize:15,marginBottom:8}}>Progress: <PB val={d.pct} w={100}/> <span style={{fontFamily:"'JetBrains Mono',monospace"}}>{d.pct}%</span></div>
<Row label="Title" value={d.title} canEdit={ce} onSave={function(v){F("title",v);}}/><Row label="Progress %" value={d.pct} canEdit={ce} onSave={function(v){F("pct",parseInt(v)||0);}}/><Row label="Risk" value={d.risk} canEdit={ce} onSave={function(v){F("risk",v);}}/><Row label="Target" value={d.target} canEdit={ce} onSave={function(v){F("target",v);}}/>
<Sec>Blockers</Sec><EList items={d.blockers||[]} canEdit={ce} onUpdate={function(a){FA("blockers",a);}} color={C.r}/><Sec>Acceptance Criteria</Sec><EList items={d.cr||[]} canEdit={ce} onUpdate={function(a){FA("cr",a);}}/>{d.deps&&<div><Sec>Dependencies</Sec><EList items={d.deps||[]} canEdit={ce} onUpdate={function(a){FA("deps",a);}} color={C.tx2}/></div>}
{getBlockedBy(d.id,D.deps).length>0&&<div><Sec>Upstream Blockers (causal)</Sec>{getBlockedBy(d.id,D.deps).map(function(dep,i){return <div key={i} style={{fontSize:13,color:C.r,padding:"3px 0"}}>{"\u2190"} {dep.fromLabel} - {dep.reason}</div>;})}</div>}
{getBlocks(d.id,D.deps).length>0&&<div><Sec>Downstream (gates)</Sec>{getBlocks(d.id,D.deps).map(function(dep,i){return <div key={i} style={{fontSize:13,color:C.a,padding:"3px 0"}}>{"\u2192"} {dep.blocks.join(", ")} - {dep.reason}</div>;})}</div>}
</div>);

if(tp==="safe")return(<div><EditTitle text={d.name} canEdit={ce} onSave={function(v){F("name",v);}}/><div style={{fontSize:15,marginBottom:8}}>Coverage: <PB val={d.cov} w={100} color={d.cov>70?C.g:d.cov>50?C.a:C.r}/> <span style={{fontFamily:"'JetBrains Mono',monospace"}}>{d.cov}%</span></div>
<Row label="Coverage %" value={d.cov} canEdit={ce} onSave={function(v){F("cov",parseInt(v)||0);}}/>
<Sec>Compliance Gaps</Sec><EList items={d.gaps||[]} canEdit={ce} onUpdate={function(a){FA("gaps",a);}} color={C.r}/>
{getBlocks(d.id,D.deps).length>0&&<div><Sec>Blocks (pilots/milestones)</Sec>{getBlocks(d.id,D.deps).map(function(dep,i){return <div key={i} style={{fontSize:13,color:C.a,padding:"3px 0"}}>{"\u2192"} {dep.blocks.join(", ")} - {dep.reason}</div>;})}</div>}
</div>);

if(tp==="sply")return(<div>
<EditTitle text={d.item} canEdit={ce} onSave={function(v){F("item",v);}}/>
<div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
  <Tag color={dc(d.risk==="high"?"critical":d.risk==="medium"?"progress":"active")}>{d.risk} risk</Tag>
  <Tag>{d.lead}</Tag>
</div>

{/* Supplier Intel Card */}
<Sec>🏢 Vendor Intelligence</Sec>
<div style={{background:C.bg,borderRadius:6,padding:10,marginBottom:8,border:"1px solid "+C.bd}}>
  <Row label="Supplier" value={d.supplier} canEdit={ce} onSave={function(v){F("supplier",v);}}/>
  <Row label="Lead Time" value={d.lead} canEdit={ce} onSave={function(v){F("lead",v);}}/>
  <Row label="Risk Level" value={d.risk} canEdit={ce} onSave={function(v){F("risk",v);}}/>
  <Row label="Notes" value={d.note} canEdit={ce} onSave={function(v){F("note",v);}}/>
</div>

{/* Risk assessment */}
<Sec>⚠️ Supply Risk Assessment</Sec>
<div style={{background:C.bg,borderRadius:6,padding:10,border:"1px solid "+(d.risk==="high"?C.r:d.risk==="medium"?C.a:C.g)+"30"}}>
  {d.risk==="high"&&<div style={{color:C.r,fontSize:12,fontWeight:600,marginBottom:4}}>🔴 HIGH RISK — Single source / long lead</div>}
  {d.risk==="medium"&&<div style={{color:C.a,fontSize:12,fontWeight:600,marginBottom:4}}>🟡 MEDIUM RISK — Alternatives available but not qualified</div>}
  {d.risk==="low"&&<div style={{color:C.g,fontSize:12,fontWeight:600,marginBottom:4}}>🟢 LOW RISK — Multiple sources, short lead</div>}
  <div style={{fontSize:11,color:C.tx2,marginTop:4}}>
    {d.note||"No additional notes"}
  </div>
  {/* Linked fleet units */}
  {(function(){var linked=D.fleet.filter(function(f){return(f.sys||[]).some(function(s){return s.toLowerCase().indexOf(d.item.toLowerCase().split(" ")[0].toLowerCase())>=0;});});
    if(linked.length>0)return <div style={{marginTop:6,fontSize:10,color:C.tx3}}>Used in: {linked.map(function(f){return f.unit;}).join(", ")}</div>;
    return null;
  })()}
</div>

{/* Fallback recommendations */}
{d.risk==="high"&&<div style={{marginTop:8,padding:8,background:C.a+"08",border:"1px solid "+C.a+"20",borderRadius:4,fontSize:11,color:C.a}}>
  💡 Recommendation: Identify backup supplier and qualify within 4 weeks to reduce single-source risk.
</div>}

{DeleteBtn}</div>);

// ── Catch-all for SubPage: render NODE_TREE child via NodeBoard ──
var subNodeConfig=findNode(sub.id,acts.liveTree);
if(subNodeConfig){
  var subSeedRows=acts.getSeedRows(sub.id);
  return(<div>
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
      <span style={{fontSize:20}}>{subNodeConfig.icon}</span>
      <div style={{flex:1,fontSize:20,fontWeight:700,color:C.gold}}>{subNodeConfig.label}</div>
      {ce&&<span onClick={function(){acts.deleteNodeFromTree(sub.id);}} style={{fontSize:10,color:C.r,padding:"3px 8px",borderRadius:3,border:"1px solid "+C.r+"30",background:C.r+"08",cursor:"pointer"}}>🗑 Delete</span>}
    </div>
    <div style={{fontSize:13,color:C.tx2,marginBottom:8}}>{subNodeConfig.description}</div>
    <div style={{fontSize:10,color:C.tx3,marginBottom:12,fontFamily:"'JetBrains Mono',monospace"}}>ID: {sub.id} | Table: {subNodeConfig.dbTable}</div>
    {subNodeConfig.children&&subNodeConfig.children.length>0&&<div style={{marginBottom:12}}>
      <Sec>Children ({subNodeConfig.children.length}){ce&&<span onClick={function(){var name=prompt("New child name:");if(!name||!name.trim())return;var id="ssub-"+Date.now();acts.addNodeToTree(sub.id,{id:id,label:name.trim(),icon:"•",description:name.trim(),dbTable:"subsystems",columns:[{key:"name",label:"Name",type:"text",editable:true,width:180},{key:"description",label:"Description",type:"text",editable:true,width:250},{key:"status",label:"Status",type:"status",editable:true,width:100},{key:"criticality",label:"Criticality",type:"priority",editable:true,width:100}],children:[]});}} style={{color:C.gold,cursor:"pointer",marginLeft:8,fontSize:11,fontWeight:400}}>+ Add child</span>}</Sec>
      <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
        {subNodeConfig.children.map(function(ch){return <span key={ch.id} style={{padding:"4px 8px",fontSize:11,borderRadius:3,background:C.bg,border:"1px solid "+C.bd,color:C.tx,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:4}}>
          {ch.icon} {ch.label}
          {ce&&<span onClick={function(e){e.stopPropagation();acts.deleteNodeFromTree(ch.id);}} style={{color:C.r,fontSize:9,opacity:0.5,marginLeft:2}}>x</span>}
        </span>;})}
      </div>
    </div>}
    <Sec>Data ({subSeedRows.length} entries){ce&&<span onClick={function(){var newId="new_"+Date.now();var name=prompt("Name:");if(!name||!name.trim())return;var row={id:newId,name:name.trim(),description:""};subNodeConfig.columns.forEach(function(col){if(!row[col.key]){if(col.type==="progress"||col.type==="number")row[col.key]=0;else if(col.type==="status")row[col.key]="planned";else if(col.type==="priority")row[col.key]="medium";else if(col.type==="person")row[col.key]="Jero";else row[col.key]="";}});acts.seedAddRow(sub.id,row);}} style={{color:C.gold,cursor:"pointer",marginLeft:8,fontSize:11,fontWeight:400}}>+ Add row</span>}</Sec>
    {subSeedRows.length>0&&<div style={{overflowX:"auto"}}><NodeBoard nodeConfig={subNodeConfig} rows={subSeedRows}
      onCellEdit={ce?function(rowId,key,val){acts.seedUpdateCell(sub.id,rowId,key,val);}:undefined}
      onAddRow={ce?function(){var newId="new_"+Date.now();var name=prompt("Name:");if(!name||!name.trim())return;var row={id:newId,name:name.trim(),description:""};subNodeConfig.columns.forEach(function(col){if(!row[col.key]){if(col.type==="progress"||col.type==="number")row[col.key]=0;else if(col.type==="status")row[col.key]="planned";else if(col.type==="priority")row[col.key]="medium";else if(col.type==="person")row[col.key]="Jero";else row[col.key]="";}});acts.seedAddRow(sub.id,row);}:undefined}
      onDeleteRow={ce?function(rowId){if(confirm("Delete this entry?"))acts.seedDeleteRow(sub.id,rowId);}:undefined}
    /></div>}
    {subSeedRows.length===0&&<div style={{padding:16,textAlign:"center",color:C.tx3,fontSize:12}}>No data yet.</div>}
  </div>);
}
return null;}

function LeafPage({leaf,acts}){if(!leaf)return null;
var _editing=useState(false),editing=_editing[0],setEditing=_editing[1];
var _editVal=useState(leaf.text),editVal=_editVal[0],setEditVal=_editVal[1];
useEffect(function(){setEditVal(leaf.text);},[leaf.text]);
var parentId=leaf.id.split("_").slice(0,-1).join("_");
var itemIdx=parseInt(leaf.id.split("_").pop())||0;
var save=function(){
  if(!editVal.trim()||!acts)return;
  var colMap={ss:"ss",skill:"skills",exp:"exps",inc:"incidents",pilot:"pilots",inv:"investors",task:"tasks",fl:"fleet",ms:"milestones",safe:"safety",sply:"supply",fmet:""};
  var col=colMap[leaf.parentType]||"";
  var fieldMap={ss:"d",skill:"gaps",exp:"p",inc:"acts",pilot:"qs",inv:"tp",task:"sb",fl:"sys",ms:"cr",safe:"gaps",sply:"note",fmet:"d"};
  var field=fieldMap[leaf.parentType]||"d";
  if(col&&acts.editSubItem)acts.editSubItem(col,parentId,field,itemIdx,editVal);
  setEditing(false);
};
var remove=function(){
  var colMap={ss:"ss",skill:"skills",exp:"exps",inc:"incidents",pilot:"pilots",inv:"investors",task:"tasks",fl:"fleet",ms:"milestones",safe:"safety",sply:"supply"};
  var col=colMap[leaf.parentType]||"";
  var fieldMap={ss:"d",skill:"gaps",exp:"p",inc:"acts",pilot:"qs",inv:"tp",task:"sb",fl:"sys",ms:"cr",safe:"gaps"};
  var field=fieldMap[leaf.parentType]||"d";
  if(col&&acts.removeSubItem&&confirm("Remove this item?")){acts.removeSubItem(col,parentId,field,itemIdx);}
};
return(<div><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
  <div style={{fontSize:20,fontWeight:700,color:C.gold}}>{editing?<input value={editVal} onChange={function(e){setEditVal(e.target.value);}} onKeyDown={function(e){if(e.key==="Enter")save();if(e.key==="Escape")setEditing(false);}} autoFocus style={{width:"100%",fontSize:18,fontWeight:700,padding:"4px 8px",background:C.bg,border:"1px solid "+C.gold+"40",borderRadius:4,color:C.gold,outline:"none",fontFamily:"inherit"}}/>:leaf.text}</div>
  {acts&&acts.canEdit&&!editing&&<div style={{display:"flex",gap:6}}><span onClick={function(){setEditing(true);}} style={{cursor:"pointer",fontSize:11,color:C.gold,opacity:0.6}}>✏️ Edit</span><span onClick={remove} style={{cursor:"pointer",fontSize:11,color:C.r,opacity:0.6}}>🗑</span></div>}
  {editing&&<div style={{display:"flex",gap:4}}><span onClick={save} style={{cursor:"pointer",fontSize:11,color:C.g}}>Save</span><span onClick={function(){setEditing(false);setEditVal(leaf.text);}} style={{cursor:"pointer",fontSize:11,color:C.tx3}}>Cancel</span></div>}
</div>
<Row label="Source Node" value={leaf.parentLabel}/><Row label="Category" value={leaf.parentType}/>
<Sec>Content</Sec>
<div style={{fontSize:15,color:C.tx,lineHeight:1.7,padding:"12px 14px",background:C.bg,borderRadius:6,borderLeft:"3px solid "+C.gold+"25",whiteSpace:"pre-wrap"}}>{leaf.text}</div>
</div>);}

// ── Agents ──
var AGENTS=[
  {id:"planner",name:"Planner",icon:"📐",color:C.gold,cat:"strategy",desc:"Phased implementation blueprints",access:{shell:true,files:true,browser:true}},
  {id:"architect",name:"Architect",icon:"🏗",color:C.b,cat:"strategy",desc:"Technology decisions and system design",access:{shell:true,files:true,browser:true}},
  {id:"researcher",name:"Researcher",icon:"🔍",color:C.c,cat:"strategy",desc:"Deep research with real browser access",access:{shell:true,files:true,browser:true}},
  {id:"coder",name:"Coder",icon:"💻",color:C.g,cat:"implementation",desc:"Full-stack dev with shell + browser",access:{shell:true,files:true,browser:true}},
  {id:"data-engineer",name:"Data Eng",icon:"🗄",color:C.c,cat:"implementation",desc:"Schemas, migrations, SQL",access:{shell:true,files:true,browser:false}},
  {id:"tester",name:"Tester",icon:"🧪",color:C.r,cat:"quality",desc:"Writes and runs tests",access:{shell:true,files:true,browser:true}},
  {id:"reviewer",name:"Reviewer",icon:"👁",color:C.a,cat:"quality",desc:"Code review (read-only)",access:{shell:true,files:false,browser:false}},
  {id:"security-scanner",name:"Security",icon:"🔒",color:C.r,cat:"quality",desc:"npm audit, secret scanning",access:{shell:true,files:false,browser:true}},
  {id:"documenter",name:"Documenter",icon:"📄",color:C.b,cat:"operations",desc:"Reports and docs as real files",access:{shell:true,files:true,browser:true}},
  {id:"coordinator",name:"Coordinator",icon:"🎯",color:C.gold,cat:"operations",desc:"Synthesizes multi-agent outputs",access:{shell:true,files:true,browser:false}},
  {id:"devops",name:"DevOps",icon:"🚀",color:C.g,cat:"operations",desc:"CI/CD, deployment, Docker",access:{shell:true,files:true,browser:false}},
];
var AGENT_CATEGORIES=[
  {id:"strategy",label:"Strategy",color:C.gold},
  {id:"implementation",label:"Implementation",color:C.g},
  {id:"quality",label:"Quality",color:C.r},
  {id:"operations",label:"Operations",color:C.b},
];

export default function Dashboard(){
var _mounted=useState(false),mounted=_mounted[0],setMounted=_mounted[1];
useEffect(function(){setMounted(true);},[]);
var _showSettings=useState(false),showSettings=_showSettings[0],setShowSettings=_showSettings[1];
var _agentEditPolicy=useState('approval'),agentEditPolicy=_agentEditPolicy[0],setAgentEditPolicy=_agentEditPolicy[1];
// Dynamic node tree (add/delete nodes at any level)
var _dynTree=useState(null),dynTree=_dynTree[0],setDynTree=_dynTree[1];
var liveTree=mounted&&dynTree?dynTree:NODE_TREE;
// Persist dynamic tree
useEffect(function(){try{var saved=localStorage.getItem("dogma_dyn_tree");if(saved){var parsed=JSON.parse(saved);if(parsed&&parsed.length>0)setDynTree(parsed);}}catch(e){}},[]);
useEffect(function(){if(dynTree)try{localStorage.setItem("dogma_dyn_tree",JSON.stringify(dynTree));}catch(e){}},[dynTree]);
// Node CRUD
var addNodeToTree=function(parentId,newNode){
  if(!canEdit)return;
  function insertChild(nodes){return nodes.map(function(n){if(n.id===parentId)return Object.assign({},n,{children:(n.children||[]).concat([newNode])});return Object.assign({},n,{children:insertChild(n.children||[])});});}
  setDynTree(insertChild(liveTree));
};
var deleteNodeFromTree=function(nodeId){
  if(!canEdit||!confirm("Delete node '"+nodeId+"' and all its children?"))return;
  function removeNode(nodes){return nodes.filter(function(n){return n.id!==nodeId;}).map(function(n){return Object.assign({},n,{children:removeNode(n.children||[])});});}
  setDynTree(removeNode(liveTree));
  if(sel&&sel.id===nodeId)setSel(null);
};
// Rebuild 3D when tree changes
var NODES=useMemo(function(){return buildNodes3D(liveTree);},[liveTree]);
var LINKS=useMemo(function(){return buildLinks3D(NODES);},[NODES]);
// Seed data local edits (add/delete/update rows per node)
var _seedEdits=useState({}),seedEdits=_seedEdits[0],setSeedEdits=_seedEdits[1];
var getSeedRows=function(nodeId){
  var base=(SEED_DATA[nodeId]||[]).slice();
  var edits=seedEdits[nodeId];
  if(!edits)return base;
  // Apply deletions
  if(edits.deleted)base=base.filter(function(r){return edits.deleted.indexOf(r.id)<0;});
  // Apply additions
  if(edits.added)base=base.concat(edits.added);
  // Apply field edits
  if(edits.updates){Object.keys(edits.updates).forEach(function(rowId){var idx=base.findIndex(function(r){return r.id===rowId;});if(idx>=0)base[idx]=Object.assign({},base[idx],edits.updates[rowId]);});}
  return base;
};
var seedAddRow=function(nodeId,row){setSeedEdits(function(prev){var e=Object.assign({},prev[nodeId]||{});e.added=(e.added||[]).concat([row]);var out=Object.assign({},prev);out[nodeId]=e;return out;});};
var seedDeleteRow=function(nodeId,rowId){setSeedEdits(function(prev){var e=Object.assign({},prev[nodeId]||{});e.deleted=(e.deleted||[]).concat([rowId]);var out=Object.assign({},prev);out[nodeId]=e;return out;});};
var seedUpdateCell=function(nodeId,rowId,key,val){setSeedEdits(function(prev){var e=Object.assign({},prev[nodeId]||{});e.updates=Object.assign({},e.updates||{});e.updates[rowId]=Object.assign({},e.updates[rowId]||{});e.updates[rowId][key]=val;var out=Object.assign({},prev);out[nodeId]=e;return out;});};
// Persist seed edits to localStorage
useEffect(function(){try{var saved=localStorage.getItem("dogma_seed_edits");if(saved)setSeedEdits(JSON.parse(saved));}catch(e){}},[]);
useEffect(function(){try{localStorage.setItem("dogma_seed_edits",JSON.stringify(seedEdits));}catch(e){}},[seedEdits]);
// View mode, filters, automations, relations, activity
var _viewMode=useState("table"),viewMode=_viewMode[0],setViewMode=_viewMode[1]; // table | kanban
var _filters=useState({}),filters=_filters[0],setFilters=_filters[1];
var _sortKey=useState(""),sortKey=_sortKey[0],setSortKey=_sortKey[1];
var _sortDir=useState("asc"),sortDir=_sortDir[0],setSortDir=_sortDir[1];
var _groupBy=useState(""),groupBy=_groupBy[0],setGroupBy=_groupBy[1];
var _nodeSearch=useState(""),nodeSearch=_nodeSearch[0],setNodeSearch=_nodeSearch[1];
var _automations=useState([]),automations=_automations[0],setAutomations=_automations[1];
var _relations=useState([]),relations=_relations[0],setRelations=_relations[1];
var _activity=useState([]),activity=_activity[0],setActivity=_activity[1];
// Persist automations/relations
useEffect(function(){try{var s=localStorage.getItem("dogma_automations");if(s)setAutomations(JSON.parse(s));}catch(e){}},[]);
useEffect(function(){try{localStorage.setItem("dogma_automations",JSON.stringify(automations));}catch(e){}},[automations]);
useEffect(function(){try{var s=localStorage.getItem("dogma_relations");if(s)setRelations(JSON.parse(s));}catch(e){}},[]);
useEffect(function(){try{localStorage.setItem("dogma_relations",JSON.stringify(relations));}catch(e){}},[relations]);
var logActivity=function(type,nodeId,nodeLabel,desc){setActivity(function(prev){return[{id:"act_"+Date.now(),type:type,nodeId:nodeId,nodeLabel:nodeLabel,user:userName||"system",description:desc,timestamp:new Date().toISOString()}].concat(prev).slice(0,200);});};
// Filter helper
var applyFilters=function(rows,cols){
  var result=rows;
  if(nodeSearch){var q=nodeSearch.toLowerCase();result=result.filter(function(r){return Object.values(r).some(function(v){return String(v).toLowerCase().indexOf(q)>=0;});});}
  Object.keys(filters).forEach(function(k){if(filters[k])result=result.filter(function(r){return String(r[k])===filters[k];});});
  if(sortKey){result=result.slice().sort(function(a,b){var va=a[sortKey]||"",vb=b[sortKey]||"";if(typeof va==="number"&&typeof vb==="number")return sortDir==="asc"?va-vb:vb-va;return sortDir==="asc"?String(va).localeCompare(String(vb)):String(vb).localeCompare(String(va));});}
  return result;
};
// Flatten all nodes for relations picker
var allNodesList=useMemo(function(){var list=[];function walk(nodes){nodes.forEach(function(n){list.push({id:n.id,label:n.label,icon:n.icon});if(n.children)walk(n.children);});}walk(liveTree);return list;},[liveTree]);
var _designGuide=useState("DOGMA Brand: Navy #0A0A18 bg, Gold #C8A74B accents, Inter body, JetBrains Mono code. Reports: dark luxury, gold headers, metric grids, badges (pass=green fail=red warn=amber). Always include DOGMA header + confidential footer."),designGuide=_designGuide[0],setDesignGuide=_designGuide[1];
var _designImages=useState([]),designImages=_designImages[0],setDesignImages=_designImages[1];
var _showThinking=useState(false),showThinking=_showThinking[0],setShowThinking=_showThinking[1];
var _streamingMsg=useState(null),streamingMsg=_streamingMsg[0],setStreamingMsg=_streamingMsg[1];
var oc=useOpenClaw();
var _s=useState(seed),D=_s[0],setD=_s[1];
var _userInfo=useState({name:'',role:'',loaded:false}),userInfo=_userInfo[0],setUserInfo=_userInfo[1];
var _pendingMutations=useState([]),pendingMuts=_pendingMutations[0],setPendingMuts=_pendingMutations[1];
var _approvalMode=useState('advisory'),approvalMode=_approvalMode[0],setApprovalMode=_approvalMode[1];

// Load data from API on mount
// Dark theme only — no theme toggle
useEffect(function(){try{var g=localStorage.getItem("dogma-design-guide");if(g)setDesignGuide(g);}catch(e){}},[]);
useEffect(function(){try{localStorage.setItem("dogma-design-guide",designGuide);}catch(e){}},[designGuide]);
useEffect(function(){try{var imgs=localStorage.getItem("dogma-design-images");if(imgs)setDesignImages(JSON.parse(imgs));}catch(e){}},[]);
useEffect(function(){try{localStorage.setItem("dogma-design-images",JSON.stringify(designImages));}catch(e){}},[designImages]);
useEffect(function(){
  fetch("/api/dashboard/summary").then(function(r){return r.json();}).then(function(data){
    if(data.error||!data.ss)return; // fallback to seed
    // Map API response to dashboard format (backward compat)
    var mapped={
      ss:(data.ss||[]).map(function(s){return{id:s.id,name:s.name,mat:s.maturity_level||0,status:s.status||'dev',ver:s.version||'',owner:s.owner_user_id?'Jero':'',issues:0,lastTest:'',d:s.details||[],risks:s.risks||[],notes:[]};}),
      skills:(data.skills||[]).map(function(s){return{id:s.id,name:s.name,success:s.success_rate||0,status:s.status||'dev',tests:s.tests_count||0,lastTest:'',protocol:s.protocol||'',gaps:s.gaps||[],notes:[]};}),
      tasks:(data.tasks||[]).map(function(t){return{id:t.id,pct:t.progress||t.pct||0,title:t.title,ws:t.workspace||'General',status:t.status||'todo',pri:t.priority||'medium',due:t.due_at?new Date(t.due_at).toLocaleDateString('en-US',{month:'short',day:'numeric'}):'',owner:'Jero',created:'',notes:[],blocked:t.blocked_by||'',sb:t.sub_tasks||[],impact:t.impact||''};}),
      pilots:(data.pilots||[]).map(function(p){return{id:p.id,name:p.company_name,stage:p.stage||'Identified',viab:p.viability_score||0,roi:p.roi_estimate||'',champ:p.champion_name||'',champStr:p.champion_strength||'None',plant:p.plant_location||'',plc:p.plc_system||'',pain:p.pain_description||'',skills:p.required_skills||[],comp:p.compliance_reqs||[],risk:p.risk_level||'medium',qs:p.open_questions||[],nextStep:p.next_step||'',fu:'',meetings:p.meetings||[],blockers:p.blockers||[],notes:[]};}),
      investors:(data.investors||[]).map(function(v){return{id:v.id,name:v.fund_name,stage:v.stage||'Researched',prob:v.probability||0,check:v.check_size||'',thesis:v.thesis||'',objections:v.objections||[],tp:v.touchpoints||[],next:v.next_action||'',nextDate:'',notes:[]};}),
      incidents:(data.incidents||[]).map(function(i){return{id:i.id,sev:i.severity||'low',desc:i.title||i.description||'',down:i.downtime||'',root:i.root_cause||'',status:i.status||'open',reported:i.reported_at||'',notes:[],acts:i.actions||[],timeline:i.timeline||[]};}),
      fleet:(data.fleet||[]).map(function(f){return{id:f.id,unit:f.unit_name,type:f.unit_type||'',status:f.status||'active',hours:f.hours||0,health:f.health||0,loc:f.location||'',config:f.config||'',sys:f.systems||[],lastMaint:f.last_maintenance?new Date(f.last_maintenance).toLocaleDateString():'',nextMaint:f.next_maintenance?new Date(f.next_maintenance).toLocaleDateString():''};}),
      exps:(data.exps||[]).map(function(e){return{id:e.id,title:e.title,outcome:e.outcome||'',conf:e.confidence||0,date:e.date?new Date(e.date).toLocaleDateString('en-US',{month:'short',day:'numeric'}):'',notes:[],p:e.parameters||[],conclusion:e.conclusion||''};}),
      milestones:(data.milestones||[]).map(function(m){return{id:m.id,title:m.title,target:m.target_date?new Date(m.target_date).toLocaleDateString('en-US',{month:'short',day:'numeric'}):'',pct:m.progress||0,risk:m.risk_level||'low',blockers:m.blockers||[],cr:m.criteria||[],deps:m.dependencies||[]};}),
      safety:(data.safety||[]).map(function(s){return{id:s.id,name:s.name,cov:s.coverage||0,gaps:s.gaps||[]};}),
      supply:(data.supply||[]).map(function(s){return{id:s.id,item:s.item_name,supplier:s.supplier||'',lead:s.lead_time||'',risk:s.risk_level||'low',note:s.notes||''};}),
      fin:data.fin||seed().fin,
      log:seed().log, // keep local log for now
      seq:seed().seq,
      deps:seed().deps,
      incLinks:seed().incLinks,
      pilotDeadlines:seed().pilotDeadlines,
      decisions:seed().decisions,
    };
    setD(mapped);
    if(data.user)setUserInfo({name:data.user.name||'',role:data.user.role||'',loaded:true});
  }).catch(function(e){console.log("Dashboard API fallback to seed:",e);});
},[]);
var _xp=useState({}),xp=_xp[0],setXp=_xp[1];
var _xp2=useState({}),xp2=_xp2[0],setXp2=_xp2[1];
var _sel=useState(null),sel=_sel[0],setSel=_sel[1];
var _files=useState({}),files=_files[0],setFiles=_files[1];
var canvasRef=useRef(null);var sceneRef=useRef(null);var camRef=useRef(null);var rendRef=useRef(null);
var zoomRef=useRef(24);var frameRef=useRef(0);
var panRef=useRef({x:0,y:0});var dragRef=useRef({active:false,moved:false,mode:"",sx:0,sy:0,px:0,py:0,rx:0,ry:0});
var _overlay=useState([]),overlay=_overlay[0],setOverlay=_overlay[1];
var overlayRef=useRef({});
var _agent=useState("planner"),agentId=_agent[0],setAgentId=_agent[1];
var _msgs=useState({}),msgs=_msgs[0],setMsgs=_msgs[1];
var _inp=useState(""),inp=_inp[0],setInp=_inp[1];
var _ld=useState(false),ld=_ld[0],setLd=_ld[1];
var _mcpConn=useState([]),mcpConn=_mcpConn[0],setMcpConn=_mcpConn[1];
var _con=useState(false),con=_con[0],setCon=_con[1];
var _search=useState(""),search=_search[0],setSearch=_search[1];
var _searchOpen=useState(false),searchOpen=_searchOpen[0],setSearchOpen=_searchOpen[1];
var _chatW=useState(600),chatW=_chatW[0],setChatW=_chatW[1];
useEffect(function(){setChatW(Math.round(window.innerWidth*0.33));},[]);
var resizeRef=useRef(null);
var _mode=useState("chat"),mode=_mode[0],setMode=_mode[1]; // "chat" or "swarm" or "timeline" or "approvals"
var _cmdOpen=useState(false),cmdOpen=_cmdOpen[0],setCmdOpen=_cmdOpen[1];
var _cmdQ=useState(""),cmdQ=_cmdQ[0],setCmdQ=_cmdQ[1];
var _swarmResult=useState(null),swarmResult=_swarmResult[0],setSwarmResult=_swarmResult[1];
var _swarmLoading=useState(false),swarmLoading=_swarmLoading[0],setSwarmLoading=_swarmLoading[1];
var _selWorkflow=useState(""),selWorkflow=_selWorkflow[0],setSelWorkflow=_selWorkflow[1];
var _swarmObjective=useState(""),swarmObjective=_swarmObjective[0],setSwarmObjective=_swarmObjective[1];
var SWARM_WORKFLOWS=[];
useEffect(function(){
  var onMove=function(e){if(!resizeRef.current)return;var w=window.innerWidth-e.clientX;setChatW(Math.max(240,Math.min(w,window.innerWidth*0.7)));};
  var onUp=function(){resizeRef.current=false;document.body.style.cursor="";document.body.style.userSelect="";};
  window.addEventListener("mousemove",onMove);window.addEventListener("mouseup",onUp);
  return function(){window.removeEventListener("mousemove",onMove);window.removeEventListener("mouseup",onUp);};
},[]);

// Search index — flatten all entities into searchable list
var searchResults=useMemo(function(){
  if(!search||search.length<2)return[];
  var q=search.toLowerCase();var results=[];
  D.ss.forEach(function(s){if((s.name+s.id+s.status+(s.d||[]).join(" ")).toLowerCase().indexOf(q)>=0)results.push({id:s.id,label:s.name,type:"Subsystem",metric:s.mat+"%",color:dc(s.status),level:"sub",parent:"rd",data:s});});
  D.skills.forEach(function(s){if((s.name+s.id+s.protocol).toLowerCase().indexOf(q)>=0)results.push({id:s.id,label:s.name,type:"Skill",metric:s.success+"%",color:dc(s.status),level:"sub",parent:"rd",data:s});});
  D.exps.forEach(function(e){if((e.id+e.title+e.outcome+e.conclusion).toLowerCase().indexOf(q)>=0)results.push({id:e.id,label:e.title,type:"Experiment",metric:e.outcome,color:dc(e.outcome),level:"sub",parent:"experiments",data:e});});
  D.tasks.forEach(function(t){if((t.id+t.title+t.ws+t.impact).toLowerCase().indexOf(q)>=0)results.push({id:t.id,label:t.title,type:"Task",metric:t.pri,color:dc(t.pri),level:"sub",parent:"team",data:t});});
  D.pilots.forEach(function(p){if((p.id+p.name+p.plant+p.pain+p.champ).toLowerCase().indexOf(q)>=0)results.push({id:p.id,label:p.name,type:"Pilot",metric:p.viab+"%",color:p.viab>80?C.g:C.a,level:"sub",parent:"pilots",data:p});});
  D.investors.forEach(function(v){if((v.id+v.name+v.thesis+v.stage).toLowerCase().indexOf(q)>=0)results.push({id:v.id,label:v.name,type:"Investor",metric:v.prob+"%",color:v.prob>=30?C.g:C.a,level:"sub",parent:"fundraising",data:v});});
  D.incidents.forEach(function(i){if((i.id+i.desc+i.root+i.status).toLowerCase().indexOf(q)>=0)results.push({id:i.id,label:i.desc,type:"Incident",metric:i.status,color:dc(i.status),level:"sub",parent:"incidents",data:i});});
  D.fleet.forEach(function(f){if((f.id+f.unit+f.type+f.loc).toLowerCase().indexOf(q)>=0)results.push({id:f.id,label:f.unit,type:"Fleet",metric:f.health+"%",color:dc(f.status),level:"sub",parent:"fleet",data:f});});
  D.milestones.forEach(function(m){if((m.id+m.title+m.risk).toLowerCase().indexOf(q)>=0)results.push({id:m.id,label:m.title,type:"Milestone",metric:m.pct+"%",color:dc(m.risk),level:"sub",parent:"roadmap",data:m});});
  D.safety.forEach(function(s){if((s.id+s.name+(s.gaps||[]).join(" ")).toLowerCase().indexOf(q)>=0)results.push({id:s.id,label:s.name,type:"Safety",metric:s.cov+"%",color:s.cov>70?C.g:C.r,level:"sub",parent:"roadmap",data:s});});
  D.supply.forEach(function(s){if((s.id+s.item+s.supplier+s.note).toLowerCase().indexOf(q)>=0)results.push({id:s.id,label:s.item,type:"Supply",metric:s.risk,color:dc(s.risk==="high"?"critical":"active"),level:"sub",parent:"finance",data:s});});
  // Also search main nodes
  NODES.forEach(function(n){if(n.label.toLowerCase().indexOf(q)>=0)results.push({id:n.id,label:n.label,type:"Node",metric:"",color:C.gold,level:"main",parent:""});});
  return results.slice(0,12);
},[search,D]);
var chatEnd=useRef(null);

// Auth system
var _auth=useState(false),authed=_auth[0],setAuthed=_auth[1];
var _showLogin=useState(false),showLogin=_showLogin[0],setShowLogin=_showLogin[1];
var _userName=useState(""),userName=_userName[0],setUserName=_userName[1];
var _userRole=useState("viewer"),userRole=_userRole[0],setUserRole=_userRole[1];
// Restore session from localStorage
useEffect(function(){
  try{
    var s=localStorage.getItem("dogma_session");
    if(s){var p=JSON.parse(s);setAuthed(true);setUserName(p.name||"");setUserRole(p.role||"admin");}
  }catch(e){}
},[]);
// Restore saved data from localStorage
useEffect(function(){
  try{
    var saved=localStorage.getItem("dogma_data");
    if(saved){var parsed=JSON.parse(saved);if(parsed&&parsed.ss&&parsed.ss.length>0){setD(function(prev){return Object.assign({},prev,parsed);});}}
  }catch(e){}
},[]);
// Auto-save data to localStorage on changes (debounced)
useEffect(function(){
  var t=setTimeout(function(){
    try{localStorage.setItem("dogma_data",JSON.stringify(D));}catch(e){}
  },2000);
  return function(){clearTimeout(t);};
},[D]);
var _pw=useState(""),pw=_pw[0],setPw=_pw[1];
var _pwErr=useState(false),pwErr=_pwErr[0],setPwErr=_pwErr[1];
var PASS="dogma2026";
var _loginName=useState(""),loginName=_loginName[0],setLoginName=_loginName[1];
var _loginRole=useState("admin"),loginRole=_loginRole[0],setLoginRole=_loginRole[1];
var tryLogin=function(){
  if(pw===PASS&&loginName.trim()){
    setAuthed(true);setShowLogin(false);setPw("");setPwErr(false);
    setUserName(loginName.trim());setUserRole(loginRole);
    try{localStorage.setItem("dogma_session",JSON.stringify({name:loginName.trim(),role:loginRole,at:nw()}));}catch(e){}
  }else{setPwErr(true);}
};
var doLogout=function(){
  setAuthed(false);setUserName("");setUserRole("viewer");
  try{localStorage.removeItem("dogma_session");}catch(e){}
};
var canEdit=mounted&&authed;
var canGen=true; // Everyone can generate documents

// Generic field updater: updateField("ss","ss1","mat",85) or updateField("pilots","p1","viab",90)
var updateField=function(col,eid,field,val){
  setD(function(d){
    if(!d[col])return d;
    var arr=d[col].slice();
    var idx=arr.findIndex(function(x){return x.id===eid;});
    if(idx<0)return d;
    var updated=Object.assign({},arr[idx]);
    updated[field]=val;
    arr[idx]=updated;
    var out={};out[col]=arr;
    return Object.assign({},d,out);
  });
  addLog("Edited "+col+"/"+eid+"."+field);
};
// Update array field: updateArrayField("ss","ss1","d",["new","items"])
var updateArrayField=function(col,eid,field,arr){
  updateField(col,eid,field,arr);
};
// Update finance directly
var updateFin=function(field,val){
  setD(function(d){var fin=Object.assign({},d.fin);fin[field]=val;return Object.assign({},d,{fin:fin});});
  addLog("Edited finance."+field);
};

// ── API-backed CRUD ──
var apiSave=function(entityType,entityId,data){
  fetch("/api/entities",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"update",entityType:entityType,entityId:entityId,data:data})}).catch(function(e){console.log("apiSave error:",e);});
};
var refreshData=function(){
  fetch("/api/dashboard/summary").then(function(r){return r.json();}).then(function(data){
    if(!data||!data.ss)return;
    var mapped={
      ss:(data.ss||[]).map(function(s){return{id:s.id,name:s.name,mat:s.maturity_level||0,status:s.status||"dev",ver:s.version||"",owner:s.owner_user_id?"Jero":"",issues:0,lastTest:"",d:s.details||[],risks:s.risks||[],notes:[]};}),
      skills:(data.skills||[]).map(function(s){return{id:s.id,name:s.name,success:s.success_rate||0,status:s.status||"dev",tests:s.tests_count||0,lastTest:"",protocol:s.protocol||"",gaps:s.gaps||[],notes:[]};}),
      tasks:(data.tasks||[]).map(function(t){return{id:t.id,pct:t.progress||0,title:t.title,ws:t.workspace||"General",status:t.status||"todo",pri:t.priority||"medium",due:t.due_at?new Date(t.due_at).toLocaleDateString("en-US",{month:"short",day:"numeric"}):"",owner:"Jero",created:"",notes:[],blocked:t.blocked_by||"",sb:t.sub_tasks||[],impact:t.impact||""};}),
      pilots:(data.pilots||[]).map(function(p){return{id:p.id,name:p.company_name,stage:p.stage||"Identified",viab:p.viability_score||0,roi:p.roi_estimate||"",champ:p.champion_name||"",champStr:p.champion_strength||"None",plant:p.plant_location||"",plc:p.plc_system||"",pain:p.pain_description||"",skills:p.required_skills||[],comp:p.compliance_reqs||[],risk:p.risk_level||"medium",qs:p.open_questions||[],nextStep:p.next_step||"",fu:"",meetings:p.meetings||[],blockers:p.blockers||[],notes:[]};}),
      investors:(data.investors||[]).map(function(v){return{id:v.id,name:v.fund_name,stage:v.stage||"Researched",prob:v.probability||0,check:v.check_size||"",thesis:v.thesis||"",objections:v.objections||[],tp:v.touchpoints||[],next:v.next_action||"",nextDate:"",notes:[]};}),
      incidents:(data.incidents||[]).map(function(i){return{id:i.id,sev:i.severity||"low",desc:i.title||i.description||"",down:i.downtime||"",root:i.root_cause||"",status:i.status||"open",reported:i.reported_at||"",notes:[],acts:i.actions||[],timeline:i.timeline||[]};}),
      fleet:(data.fleet||[]).map(function(f){return{id:f.id,unit:f.unit_name,type:f.unit_type||"",status:f.status||"active",hours:f.hours||0,health:f.health||0,loc:f.location||"",config:f.config||"",sys:f.systems||[],lastMaint:"",nextMaint:""};}),
      exps:(data.exps||[]).map(function(e){return{id:e.id,title:e.title,outcome:e.outcome||"",conf:e.confidence||0,date:e.date?new Date(e.date).toLocaleDateString("en-US",{month:"short",day:"numeric"}):"",notes:[],p:e.parameters||[],conclusion:e.conclusion||""};}),
      milestones:(data.milestones||[]).map(function(m){return{id:m.id,title:m.title,target:m.target_date?new Date(m.target_date).toLocaleDateString("en-US",{month:"short",day:"numeric"}):"",pct:m.progress||0,risk:m.risk_level||"low",blockers:m.blockers||[],cr:m.criteria||[],deps:m.dependencies||[]};}),
      safety:(data.safety||[]).map(function(s){return{id:s.id,name:s.name,cov:s.coverage||0,gaps:s.gaps||[]};}),
      supply:(data.supply||[]).map(function(s){return{id:s.id,item:s.item_name,supplier:s.supplier||"",lead:s.lead_time||"",risk:s.risk_level||"low",note:s.notes||""};}),
    };
    setD(function(prev){return Object.assign({},prev,mapped);});
  }).catch(function(e){console.log("refreshData error:",e);});
};
var apiCreate=function(entityType,data){
  // LOCAL-FIRST: generate temp ID, update D state immediately, then sync API
  var tempId="new_"+Date.now()+"_"+Math.random().toString(36).slice(2,6);
  var colMap={ss:"ss",subsystem:"ss",skills:"skills",skill:"skills",tasks:"tasks",task:"tasks",pilots:"pilots",pilot:"pilots",investors:"investors",investor:"investors",incidents:"incidents",incident:"incidents",fleet:"fleet",exps:"exps",experiment:"exps",milestones:"milestones",milestone:"milestones",safety:"safety",supply:"supply"};
  var col=colMap[entityType]||entityType;
  // Build new entity with defaults
  var entity=Object.assign({id:tempId},data);
  // Set defaults per type
  if(col==="ss"){entity.mat=parseInt(entity.mat)||0;entity.status=entity.status||"dev";entity.ver=entity.ver||"v0.1";entity.owner="Jero";entity.issues=0;entity.lastTest="";entity.d=[];entity.risks=[];entity.notes=[];}
  if(col==="skills"){entity.success=parseInt(entity.success)||0;entity.status=entity.status||"dev";entity.tests=0;entity.lastTest="";entity.protocol="";entity.gaps=[];entity.notes=[];}
  if(col==="tasks"){entity.status=entity.status||"todo";entity.pri=entity.pri||"medium";entity.ws=entity.ws||"General";entity.pct=0;entity.owner="Jero";entity.created=nw();entity.notes=[];entity.blocked="";entity.sb=[];entity.impact="";}
  if(col==="pilots"){entity.stage=entity.stage||"Identified";entity.viab=parseInt(entity.viab)||0;entity.roi=entity.roi||"";entity.champ=entity.champ||"";entity.champStr=entity.champStr||"None";entity.plant="";entity.plc="";entity.pain=entity.pain||"";entity.skills=[];entity.comp=[];entity.risk=entity.risk||"medium";entity.qs=[];entity.nextStep="";entity.fu="";entity.meetings=[];entity.blockers=[];entity.notes=[];}
  if(col==="investors"){entity.stage=entity.stage||"Researched";entity.prob=parseInt(entity.prob)||0;entity.check=entity.check||"";entity.thesis=entity.thesis||"";entity.objections=[];entity.tp=[];entity.next=entity.next||"";entity.nextDate="";entity.notes=[];}
  if(col==="incidents"){entity.sev=entity.sev||"low";entity.status=entity.status||"open";entity.desc=entity.desc||entity.title||"";entity.down="";entity.root="";entity.reported=nw();entity.notes=[];entity.acts=[];entity.timeline=[];}
  if(col==="fleet"){entity.unit=entity.unit||"New Unit";entity.type=entity.type||"";entity.status="build";entity.hours=0;entity.health=0;entity.loc=entity.loc||"";entity.config="";entity.sys=[];entity.lastMaint="";entity.nextMaint="";}
  if(col==="exps"){entity.outcome=entity.outcome||"";entity.conf=parseInt(entity.conf)||0;entity.date=dy();entity.notes=[];entity.p=[];entity.conclusion="";}
  if(col==="milestones"){entity.target=entity.target||"";entity.pct=0;entity.risk=entity.risk||"low";entity.blockers=[];entity.cr=[];entity.deps=[];}
  if(col==="safety"){entity.cov=parseInt(entity.cov)||0;entity.gaps=[];}
  if(col==="supply"){entity.item=entity.item||"";entity.supplier=entity.supplier||"";entity.lead=entity.lead||"";entity.risk=entity.risk||"low";entity.note="";}
  // Update D state immediately
  setD(function(d){
    if(!d[col])return d;
    var out={};out[col]=d[col].concat([entity]);
    return Object.assign({},d,out);
  });
  addLog("Created "+entityType+": "+(data.name||data.title||data.unit||data.item||data.desc||"new"));
  // Auto-expand parent node so new sub-node is visible in sidebar + 3D
  var parentMap={ss:"rd",skills:"rd",subsystem:"rd",skill:"rd",tasks:"team",task:"team",pilots:"pilots",pilot:"pilots",investors:"fundraising",investor:"fundraising",incidents:"incidents",incident:"incidents",fleet:"fleet",exps:"experiments",experiment:"experiments",milestones:"roadmap",milestone:"roadmap",safety:"roadmap",supply:"finance"};
  var parentId=parentMap[entityType]||parentMap[col];
  if(parentId){setXp(function(p){var n=Object.assign({},p);n[parentId]=true;return n;});}
  // Sync to API in background (non-blocking)
  fetch("/api/entities",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"create",entityType:entityType,data:data})}).catch(function(){});
};
var apiDelete=function(entityType,entityId){
  if(!confirm("Delete this item?"))return;
  var colMap={ss:"ss",subsystem:"ss",skills:"skills",skill:"skills",tasks:"tasks",task:"tasks",pilots:"pilots",pilot:"pilots",investors:"investors",investor:"investors",incidents:"incidents",incident:"incidents",fleet:"fleet",exps:"exps",experiment:"exps",milestones:"milestones",milestone:"milestones",safety:"safety",supply:"supply"};
  var col=colMap[entityType]||entityType;
  setD(function(d){
    if(!d[col])return d;
    var out={};out[col]=d[col].filter(function(x){return x.id!==entityId;});
    return Object.assign({},d,out);
  });
  setSel(null);
  addLog("Deleted "+entityType);
  fetch("/api/entities",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:"delete",entityType:entityType,entityId:entityId})}).catch(function(){});
};

// ── Persist-on-edit wrapper: updates local + API ──
var persistField=function(col,eid,field,val){
  updateField(col,eid,field,val);
  apiSave(col,eid,Object.fromEntries([[field,val]]));
};

// ── Create Form state ──
var _showCreate=useState(null),showCreate=_showCreate[0],setShowCreate=_showCreate[1]; // null or {type:"tasks",parent:"team"}
var _createForm=useState({}),createForm=_createForm[0],setCreateForm=_createForm[1];

// ── Create Form component ──
// CreateForm removed — now inline JSX in the render

var onUpload=function(nodeId,file){setFiles(function(prev){var n=Object.assign({},prev);n[nodeId]=(n[nodeId]||[]).concat([file]);return n;});};
var onRemove=function(nodeId,idx){setFiles(function(prev){var n=Object.assign({},prev);var arr=(n[nodeId]||[]).slice();arr.splice(idx,1);n[nodeId]=arr;return n;});};

var addLog=useCallback(function(t){setD(function(d){return Object.assign({},d,{log:[{t:t,at:nw(),by:userName||"system"}].concat(d.log)});});},[userName]);
var addNote=function(col,eid,txt){setD(function(d){var a=d[col].slice();var i=a.findIndex(function(x){return x.id===eid;});if(i<0)return d;a[i]=Object.assign({},a[i],{notes:(a[i].notes||[]).concat([{t:txt,by:userName||"JM",at:nw()}])});var u={};u[col]=a;return Object.assign({},d,u);});};
var advP=function(pid){var stg=["Identified","Contact","Site Visit","Line Analysis","Bottleneck Map","Automation Score","Proposal","Pilot"];setD(function(d){var ps=d.pilots.slice();var i=ps.findIndex(function(p){return p.id===pid;});if(i<0)return d;var si=stg.indexOf(ps[i].stage);if(si>=stg.length-1)return d;ps[i]=Object.assign({},ps[i],{stage:stg[si+1]});return Object.assign({},d,{pilots:ps});});addLog("Pilot advanced");};
var advI=function(iid){var stg=["Identified","Researched","Warm Intro","1st Meeting","Follow-up","Due Diligence","Term Sheet","Closed"];setD(function(d){var is=d.investors.slice();var i=is.findIndex(function(x){return x.id===iid;});if(i<0)return d;var si=stg.indexOf(is[i].stage);if(si>=stg.length-1)return d;is[i]=Object.assign({},is[i],{stage:stg[si+1],prob:Math.min(is[i].prob+10,95)});return Object.assign({},d,{investors:is});});addLog("Investor advanced");};
var resInc=function(iid){setD(function(d){var is=d.incidents.slice();var i=is.findIndex(function(x){return x.id===iid;});if(i<0)return d;is[i]=Object.assign({},is[i],{status:"resolved"});return Object.assign({},d,{incidents:is});});addLog("Incident resolved");};
var togTask=function(tid){setD(function(d){var ts=d.tasks.slice();var i=ts.findIndex(function(t){return t.id===tid;});if(i<0)return d;ts[i]=Object.assign({},ts[i],{status:ts[i].status==="done"?"todo":"done"});return Object.assign({},d,{tasks:ts});});addLog("Task toggled");};
var addSubItem=function(col,eid,field,text){
  if(!text||!text.trim())return;
  setD(function(d){
    if(!d[col])return d;
    var arr=d[col].slice();var i=arr.findIndex(function(x){return x.id===eid;});
    if(i<0)return d;
    var entity=Object.assign({},arr[i]);
    if(!entity[field])entity[field]=[];
    entity[field]=entity[field].concat([text.trim()]);
    arr[i]=entity;var out={};out[col]=arr;return Object.assign({},d,out);
  });
  addLog("Added item to "+col+"/"+eid+"."+field);
  apiSave(col,eid,{});
};
var editSubItem=function(col,eid,field,idx,newText){
  setD(function(d){
    if(!d[col])return d;
    var arr=d[col].slice();var i=arr.findIndex(function(x){return x.id===eid;});
    if(i<0)return d;
    var entity=Object.assign({},arr[i]);
    if(!entity[field])return d;
    var items=entity[field].slice();items[idx]=newText;
    entity[field]=items;arr[i]=entity;
    var out={};out[col]=arr;return Object.assign({},d,out);
  });
};
var removeSubItem=function(col,eid,field,idx){
  setD(function(d){
    if(!d[col])return d;
    var arr=d[col].slice();var i=arr.findIndex(function(x){return x.id===eid;});
    if(i<0)return d;
    var entity=Object.assign({},arr[i]);
    if(!entity[field])return d;
    var items=entity[field].slice();items.splice(idx,1);
    entity[field]=items;arr[i]=entity;
    var out={};out[col]=arr;return Object.assign({},d,out);
  });
  addLog("Removed item from "+col+"/"+eid+"."+field);
};
var acts={addNote:addNote,advP:advP,advI:advI,resInc:resInc,togTask:togTask,updateField:updateField,updateArrayField:updateArrayField,updateFin:updateFin,canEdit:canEdit,canGen:canGen,persistField:persistField,apiCreate:apiCreate,apiDelete:apiDelete,apiSave:apiSave,addSubItem:addSubItem,editSubItem:editSubItem,removeSubItem:removeSubItem,showCreateForm:function(type){setShowCreate({type:type});},getSeedRows:getSeedRows,seedAddRow:seedAddRow,seedDeleteRow:seedDeleteRow,seedUpdateCell:seedUpdateCell,addNodeToTree:addNodeToTree,deleteNodeFromTree:deleteNodeFromTree,liveTree:liveTree,viewMode:viewMode,setViewMode:setViewMode,filters:filters,setFilters:setFilters,sortKey:sortKey,setSortKey:setSortKey,sortDir:sortDir,setSortDir:setSortDir,groupBy:groupBy,setGroupBy:setGroupBy,nodeSearch:nodeSearch,setNodeSearch:setNodeSearch,applyFilters:applyFilters,automations:automations,setAutomations:setAutomations,relations:relations,setRelations:setRelations,activity:activity,logActivity:logActivity,allNodesList:allNodesList};

var allSubs=useMemo(function(){var r=[];Object.keys(xp).forEach(function(k){if(xp[k])r=r.concat(getSubs(k,D,NODES));});return r;},[xp,D,NODES]);
var allSSubs=useMemo(function(){var r=[];Object.keys(xp2).forEach(function(k){if(xp2[k]){var s=allSubs.find(function(x){return x.id===k;});if(s)r=r.concat(getSSubs(s));}});return r;},[xp2,allSubs]);
var oI=D.incidents.filter(function(i){return i.status!=="resolved";}).length;
var cr=D.tasks.filter(function(t){return t.pri==="critical"&&t.status!=="done";}).length;
var am=Math.round(D.ss.reduce(function(a,s){return a+s.mat;},0)/D.ss.length);

// 3D
var makeLabel=function(text,fs,color){var cv=document.createElement("canvas");cv.width=1024;cv.height=512;var ctx=cv.getContext("2d");ctx.font="bold "+(fs||48)+"px monospace";ctx.textAlign="center";ctx.textBaseline="middle";ctx.shadowColor="rgba(0,0,0,0.85)";ctx.shadowBlur=10;ctx.fillStyle=color||"#C8C4BC";ctx.fillText(text,512,256);var tex=new THREE.CanvasTexture(cv);tex.needsUpdate=true;var mat=new THREE.SpriteMaterial({map:tex,transparent:true,depthWrite:false});var sp=new THREE.Sprite(mat);var sc=3.0*(fs||48)/48;sp.scale.set(sc,sc*0.5,1);sp.userData={dogma:true};return sp;};

useEffect(function(){var el=canvasRef.current;if(!el)return;var W=el.clientWidth;var H=el.clientHeight;var scene=new THREE.Scene();sceneRef.current=scene;var cam=new THREE.PerspectiveCamera(50,W/H,0.1,500);cam.position.set(0,0,24);camRef.current=cam;var rend=new THREE.WebGLRenderer({canvas:el,antialias:true,alpha:true});rend.setSize(W,H);rend.setPixelRatio(Math.min(window.devicePixelRatio,2));rend.setClearColor(new THREE.Color(C.bg),1);rendRef.current=rend;scene.add(new THREE.AmbientLight(0xffffff,0.4));var dl=new THREE.DirectionalLight(0xC8A74B,0.5);dl.position.set(5,8,15);scene.add(dl);
var anim=function(){frameRef.current=requestAnimationFrame(anim);var t=Date.now()*0.001;
// Animate all dogma meshes
scene.children.forEach(function(c){if(c.userData&&c.userData.dogma){
  if(c.type==="Mesh"){
    // Floating motion — each node oscillates differently based on position
    var ox=c.userData.origX;var oy=c.userData.origY;var oz=c.userData.origZ;
    if(ox!==undefined){
      c.position.x=ox+Math.sin(t*0.5+ox*2)*0.15;
      c.position.y=oy+Math.cos(t*0.4+oy*3)*0.12;
      c.position.z=oz+Math.sin(t*0.3+oz)*0.08;
    }
    // Pulse opacity
    if(c.material&&c.material.opacity!==undefined){c.material.opacity=0.72+Math.sin(t*1.5+c.position.x)*0.1;}
  }
  if(c.type==="Line"){
    // Pulse line opacity
    if(c.material)c.material.opacity=0.15+Math.sin(t*2+c.position.x)*0.08;
  }
  if(c.type==="Sprite"){
    // Subtle label float
    var sx=c.userData.origSX;var sy=c.userData.origSY;
    if(sx!==undefined){
      c.position.x=sx+Math.sin(t*0.5+sx*2)*0.15;
      c.position.y=sy+Math.cos(t*0.4+sy*3)*0.12+0.02*Math.sin(t*2);
    }
  }
}});
rend.setClearColor(new THREE.Color(C.bg),1);rend.render(scene,cam);var rect=el.getBoundingClientRect();var nv=[];var all=[];NODES.forEach(function(n){all.push({id:n.id,pos:n.pos,level:"main",label:n.label,r:n.r});});if(overlayRef.current.subs)(overlayRef.current.subs).forEach(function(s){all.push(s);});if(overlayRef.current.ssubs)(overlayRef.current.ssubs).forEach(function(s){all.push(s);});all.forEach(function(n){var v=new THREE.Vector3(n.pos[0],n.pos[1],n.pos[2]);v.project(cam);if(v.z>0&&v.z<1)nv.push({id:n.id,x:(v.x*0.5+0.5)*rect.width,y:(-v.y*0.5+0.5)*rect.height,level:n.level,label:n.label,r:n.r||0.4});});overlayRef.current.pos=nv;};anim();
var intv=setInterval(function(){if(overlayRef.current.pos)setOverlay(overlayRef.current.pos);},100);
var onR=function(){W=el.clientWidth;H=el.clientHeight;cam.aspect=W/H;cam.updateProjectionMatrix();rend.setSize(W,H);};window.addEventListener("resize",onR);return function(){cancelAnimationFrame(frameRef.current);clearInterval(intv);window.removeEventListener("resize",onR);rend.dispose();};},[]);

useEffect(function(){var scene=sceneRef.current;if(!scene)return;var rem=[];scene.children.forEach(function(c){if(c.userData&&c.userData.dogma)rem.push(c);});rem.forEach(function(c){scene.remove(c);if(c.geometry)c.geometry.dispose();if(c.material){if(c.material.map)c.material.map.dispose();c.material.dispose();}});
NODES.forEach(function(n){var g=new THREE.SphereGeometry(n.r,32,32);var m=new THREE.MeshPhongMaterial({color:n.color,transparent:true,opacity:0.82,shininess:50});var me=new THREE.Mesh(g,m);me.position.set(n.pos[0],n.pos[1],n.pos[2]);me.userData={dogma:true,origX:n.pos[0],origY:n.pos[1],origZ:n.pos[2]};scene.add(me);var fs=n.level==="center"?64:n.level==="group"?48:n.level==="node"?32:24;var l=makeLabel(n.label,fs,"#C8A74B");l.position.set(n.pos[0],n.pos[1]+n.r+0.4,n.pos[2]);l.userData.origSX=n.pos[0];l.userData.origSY=n.pos[1]+n.r+0.4;scene.add(l);});
LINKS.forEach(function(lk){var a=NODES.find(function(n){return n.id===lk[0];});var b=NODES.find(function(n){return n.id===lk[1];});if(!a||!b)return;var mid=new THREE.Vector3((a.pos[0]+b.pos[0])/2,(a.pos[1]+b.pos[1])/2+0.3,(a.pos[2]+b.pos[2])/2);var crv=new THREE.QuadraticBezierCurve3(new THREE.Vector3(a.pos[0],a.pos[1],a.pos[2]),mid,new THREE.Vector3(b.pos[0],b.pos[1],b.pos[2]));var g=new THREE.BufferGeometry().setFromPoints(crv.getPoints(24));var m=new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:0.06});var ln=new THREE.Line(g,m);ln.userData={dogma:true};scene.add(ln);});
allSubs.forEach(function(sub){var cH=typeof sub.color==="string"?parseInt(sub.color.replace("#",""),16):0x6E6A84;var g=new THREE.SphereGeometry(sub.r,20,20);var m=new THREE.MeshPhongMaterial({color:cH||0x6E6A84,transparent:true,opacity:0.72});var me=new THREE.Mesh(g,m);me.position.set(sub.pos[0],sub.pos[1],sub.pos[2]);me.userData={dogma:true,origX:sub.pos[0],origY:sub.pos[1],origZ:sub.pos[2]};scene.add(me);var lt=(sub.label+(sub.metric?" "+sub.metric:"")).slice(0,22);var l=makeLabel(lt,32,"#C8C4BC");l.position.set(sub.pos[0],sub.pos[1]+sub.r+0.3,sub.pos[2]);l.userData.origSX=sub.pos[0];l.userData.origSY=sub.pos[1]+sub.r+0.3;scene.add(l);var p=NODES.find(function(n){return n.id===sub.parent;});if(p){var g2=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(p.pos[0],p.pos[1],p.pos[2]),new THREE.Vector3(sub.pos[0],sub.pos[1],sub.pos[2])]);var m2=new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:0.05});var ln2=new THREE.Line(g2,m2);ln2.userData={dogma:true};scene.add(ln2);}});
allSSubs.forEach(function(ssn){var g=new THREE.SphereGeometry(ssn.r,10,10);var m=new THREE.MeshPhongMaterial({color:0x444060,transparent:true,opacity:0.45});var me=new THREE.Mesh(g,m);me.position.set(ssn.pos[0],ssn.pos[1],ssn.pos[2]);me.userData={dogma:true,origX:ssn.pos[0],origY:ssn.pos[1],origZ:ssn.pos[2]};scene.add(me);var l=makeLabel(ssn.label.slice(0,18),24,"#6E6A84");l.position.set(ssn.pos[0],ssn.pos[1]+ssn.r+0.15,ssn.pos[2]);l.userData.origSX=ssn.pos[0];l.userData.origSY=ssn.pos[1]+ssn.r+0.15;scene.add(l);scene.add(l);var ps=allSubs.find(function(s){return ssn.id.startsWith(s.id+"_");});if(ps){var g2=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(ps.pos[0],ps.pos[1],ps.pos[2]),new THREE.Vector3(ssn.pos[0],ssn.pos[1],ssn.pos[2])]);var m2=new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:0.03});var ln2=new THREE.Line(g2,m2);ln2.userData={dogma:true};scene.add(ln2);}});
overlayRef.current.subs=allSubs.map(function(s){return{id:s.id,pos:s.pos,level:"sub",label:s.label,r:s.r};});
overlayRef.current.ssubs=allSSubs.map(function(s){return{id:s.id,pos:s.pos,level:"ssub",label:s.label,r:s.r};});
},[allSubs,allSSubs,oI,xp]);

// Controls
var onWheel=function(e){e.preventDefault();var cam=camRef.current;if(!cam)return;zoomRef.current=Math.max(1.5,Math.min(120,zoomRef.current+e.deltaY*0.03));var dr=dragRef.current;var d=zoomRef.current;cam.position.x=-panRef.current.x+d*Math.sin(dr.ry||0)*Math.cos(dr.rx||0);cam.position.y=-panRef.current.y+d*Math.sin(dr.rx||0);cam.position.z=d*Math.cos(dr.ry||0)*Math.cos(dr.rx||0);cam.lookAt(-panRef.current.x,-panRef.current.y,0);};
var onDown=function(e){var isOrbit=e.button===2||e.shiftKey;dragRef.current=Object.assign({},dragRef.current,{active:true,moved:false,mode:isOrbit?"orbit":"pan",sx:e.clientX,sy:e.clientY,px:panRef.current.x,py:panRef.current.y});};
var onMove=function(e){var dr=dragRef.current;if(!dr.active)return;if(Math.abs(e.clientX-dr.sx)<4&&Math.abs(e.clientY-dr.sy)<4)return;dr.moved=true;var cam=camRef.current;if(!cam)return;if(dr.mode==="orbit"){var dx=(e.clientX-dr.sx)*0.005;var dy=(e.clientY-dr.sy)*0.005;dr.ry=(dr.ry||0)+dx;dr.rx=Math.max(-1.2,Math.min(1.2,(dr.rx||0)+dy));dr.sx=e.clientX;dr.sy=e.clientY;var d=zoomRef.current;cam.position.x=-panRef.current.x+d*Math.sin(dr.ry)*Math.cos(dr.rx);cam.position.y=-panRef.current.y+d*Math.sin(dr.rx);cam.position.z=d*Math.cos(dr.ry)*Math.cos(dr.rx);cam.lookAt(-panRef.current.x,-panRef.current.y,0);}else{var el=canvasRef.current;if(!el)return;var fov=cam.fov*Math.PI/180;var hVis=2*Math.tan(fov/2)*zoomRef.current;var sc=hVis/el.clientHeight;panRef.current={x:dr.px+(e.clientX-dr.sx)*sc,y:dr.py-(e.clientY-dr.sy)*sc};cam.position.x=-panRef.current.x+zoomRef.current*Math.sin(dr.ry||0)*Math.cos(dr.rx||0);cam.position.y=-panRef.current.y+zoomRef.current*Math.sin(dr.rx||0);cam.position.z=zoomRef.current*Math.cos(dr.ry||0)*Math.cos(dr.rx||0);cam.lookAt(-panRef.current.x,-panRef.current.y,0);}};
var onUp=function(){dragRef.current.active=false;};
// Single click = expand/collapse sub-nodes + center camera. Double click = open page.
var lastClickRef=useRef({id:"",time:0});
var focusNode=function(pos,zoomLevel){
  var cam=camRef.current;if(!cam)return;
  var dr=dragRef.current;
  var targetX=-pos[0];var targetY=-pos[1];
  var targetZoom=zoomLevel||zoomRef.current;
  // Animate camera smoothly
  var startX=panRef.current.x;var startY=panRef.current.y;var startZ=zoomRef.current;
  var startTime=Date.now();var duration=500;
  var ease=function(t){return t<0.5?2*t*t:(1-Math.pow(-2*t+2,2)/2);};
  var animFocus=function(){
    var elapsed=Date.now()-startTime;var p=Math.min(elapsed/duration,1);var ep=ease(p);
    panRef.current={x:startX+(targetX-startX)*ep,y:startY+(targetY-startY)*ep};
    zoomRef.current=startZ+(targetZoom-startZ)*ep;
    var d=zoomRef.current;
    cam.position.x=-panRef.current.x+d*Math.sin(dr.ry||0)*Math.cos(dr.rx||0);
    cam.position.y=-panRef.current.y+d*Math.sin(dr.rx||0);
    cam.position.z=d*Math.cos(dr.ry||0)*Math.cos(dr.rx||0);
    cam.lookAt(-panRef.current.x,-panRef.current.y,0);
    if(p<1)requestAnimationFrame(animFocus);
  };
  animFocus();
};
var onNodeClick=function(id,level){
  var now2=Date.now();var last=lastClickRef.current;
  var isDbl=(last.id===id&&now2-last.time<400);
  lastClickRef.current={id:id,time:now2};
  // Find the node position
  // Find any node from NODES_3D array
  var found=NODES.find(function(n){return n.id===id;});
  if(!found){var sn2=allSubs.find(function(s){return s.id===id;});if(sn2)found={pos:sn2.pos,level:"node"};}
  if(!found){var ssn3=allSSubs.find(function(s){return s.id===id;});if(ssn3)found={pos:ssn3.pos,level:"child"};}
  if(found&&found.pos){
    var zoom2=found.level==="center"?24:found.level==="group"?16:found.level==="node"?10:found.level==="child"?6:8;
    focusNode(found.pos,zoom2);
  }
  if(isDbl){
    setSel({level:level,id:id});
  }else{
    if(level==="main"&&id!=="command"){setXp(function(p){var n=Object.assign({},p);n[id]=!p[id];return n;});}
    else if(level==="sub"){setXp2(function(p){var n=Object.assign({},p);n[id]=!p[id];return n;});}
  }
};

useEffect(function(){var h=function(e){if(e.key==="Escape"){setSel(null);setSearchOpen(false);setSearch("");setShowCreate(null);setCreateForm({});setCmdOpen(false);setCmdQ("");}
    if((e.metaKey||e.ctrlKey)&&e.key==="k"){e.preventDefault();setCmdOpen(true);setCmdQ("");}};window.addEventListener("keydown",h);return function(){window.removeEventListener("keydown",h);};},[]);
useEffect(function(){if(chatEnd.current)chatEnd.current.scrollIntoView({behavior:"smooth"});},[msgs,agentId]);

var curAgent=AGENTS.find(function(a){return a.id===agentId;})||AGENTS[0];
var curMsgs=(msgs[agentId]||[]);
// ── File generators ──
var _gf=useState([]),genFiles=_gf[0],setGF=_gf[1];
var dlAndStore=function(blob,name,icon){
  var url=URL.createObjectURL(blob);
  var a=document.createElement("a");a.href=url;a.download=name;document.body.appendChild(a);a.click();document.body.removeChild(a);
  setGF(function(p){return[{name:name,url:url,icon:icon||"\uD83D\uDCC1",at:nw()}].concat(p);});
  return name;
};
var genCSV=function(title,headers,rows){
  var csv="\uFEFF"+headers.join(",")+"\n"+rows.map(function(r){return r.map(function(c){return'"'+String(c).replace(/"/g,'""')+'"';}).join(",");}).join("\n");
  return dlAndStore(new Blob([csv],{type:"text/csv;charset=utf-8"}),title+".csv","\uD83D\uDCC8");
};
var genDOCX=function(title,html){
  var h='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"><style>body{font-family:Calibri,sans-serif;font-size:11pt;max-width:700px;margin:auto}h1{font-size:18pt;color:#C8A74B;border-bottom:2px solid #C8A74B}h2{font-size:14pt;margin-top:16px}table{border-collapse:collapse;width:100%}th,td{border:1px solid #CBD5E0;padding:6px 10px}th{background:#EDF2F7}</style></head><body><h1>'+title+'</h1><p style="font-size:9pt;color:#718096">DOGMA Robotics | '+nw()+'</p>'+html+'</body></html>';
  return dlAndStore(new Blob([h],{type:"application/msword"}),title.replace(/\s+/g,"_")+".doc","\uD83D\uDCC4");
};
var genPDF=function(title,html){
  var w=window.open("","_blank");if(!w)return title+".pdf (popup blocked)";
  w.document.write('<html><head><title>'+title+'</title><style>body{font-family:Helvetica,sans-serif;padding:40px;max-width:700px;margin:auto}h1{color:#C8A74B;border-bottom:2px solid #C8A74B}table{border-collapse:collapse;width:100%}th,td{border:1px solid #ddd;padding:5px 8px}th{background:#f5f5f5}</style></head><body><h1>'+title+'</h1><p style="font-size:8pt;color:#999">'+nw()+'</p>'+html+'<script>setTimeout(function(){window.print()},500)<\/script></body></html>');
  w.document.close();setGF(function(p){return[{name:title+".pdf",url:"#",icon:"\uD83D\uDCCB",at:nw()}].concat(p);});return title+".pdf";
};
var genPPTX=function(title,slides){
  var sh=(slides||[]).map(function(s,i){return'<div style="page-break-after:always;width:960px;height:540px;padding:60px;box-sizing:border-box;background:'+(i===0?'#0A0A18':'#fff')+';color:'+(i===0?'#C8A74B':'#1a1a2e')+'"><h1>'+s.title+'</h1><div style="font-size:14pt">'+s.body+'</div></div>';}).join("");
  return dlAndStore(new Blob(['<html><head><style>@page{size:960px 540px;margin:0}body{margin:0}</style></head><body>'+sh+'</body></html>'],{type:"application/vnd.ms-powerpoint"}),title+".ppt","\uD83D\uDCCA");
};
var genLatex=function(title,content){
  var tex="\\documentclass{article}\n\\usepackage[margin=1in]{geometry}\n\\usepackage{booktabs,hyperref}\n\\title{"+title+"}\n\\author{DOGMA Robotics}\n\\date{\\today}\n\\begin{document}\n\\maketitle\n"+content+"\n\\end{document}";
  return dlAndStore(new Blob([tex],{type:"application/x-tex"}),title.replace(/\s/g,"_")+".tex","\uD83D\uDCDD");
};

function FileCard({file}){
  var _preview=useState(false),showPrev=_preview[0],setShowPrev=_preview[1];
  var isHtml=file.name&&(file.name.endsWith(".html")||file.name.endsWith(".htm"));
  var isCsv=file.name&&file.name.endsWith(".csv");
  var isMd=file.name&&file.name.endsWith(".md");
  var isImg=file.name&&(/\.(png|jpg|jpeg|gif|svg|webp)$/i).test(file.name);
  var canPreview=isHtml||isCsv||isMd||isImg;
  return <div>
    <div style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",background:C.bg,border:"1px solid "+C.gold+"30",borderRadius:4,marginTop:4}}>
      <span style={{fontSize:20}}>{file.icon}</span>
      <div style={{flex:1}}><div style={{fontSize:13,fontWeight:600,color:C.tx}}>{file.name}</div><div style={{fontSize:10,color:C.tx3}}>{file.at}</div></div>
      {canPreview&&<span onClick={function(){setShowPrev(!showPrev);}} style={{cursor:"pointer",fontSize:10,color:C.gold,padding:"2px 6px",border:"1px solid "+C.gold+"30",borderRadius:3}}>{showPrev?"Hide":"Preview"}</span>}
      <span onClick={function(){if(file.url&&file.url!=="#"){var a=document.createElement("a");a.href=file.url;a.download=file.name;a.click();}}} style={{cursor:"pointer",fontSize:12,color:C.gold,fontWeight:700}}>\u2B07</span>
      {isHtml&&file.url&&<span onClick={function(){window.open(file.url,"_blank");}} style={{cursor:"pointer",fontSize:10,color:C.gold,padding:"2px 6px",border:"1px solid "+C.gold+"30",borderRadius:3}}>Open</span>}
    </div>
    {showPrev&&<div style={{marginTop:4,border:"1px solid "+C.bd,borderRadius:4,overflow:"hidden",maxHeight:300}}>
      {isHtml&&<iframe src={file.url} style={{width:"100%",height:280,border:"none",background:"#fff"}}/>}
      {isImg&&<img src={file.url} style={{maxWidth:"100%",maxHeight:280,objectFit:"contain"}}/>}
      {(isCsv||isMd)&&<div style={{padding:8,fontSize:11,color:C.tx2,fontFamily:"'JetBrains Mono',monospace",maxHeight:260,overflowY:"auto",background:C.bg}}>Loading preview...</div>}
    </div>}
  </div>;
}


// Tool definitions
// Data tools (require admin auth)
var DATA_TOOLS=[
{name:"update_field",description:"Update any field on any entity",input_schema:{type:"object",properties:{collection:{type:"string"},entity_id:{type:"string"},field:{type:"string"},value:{type:"string"}},required:["collection","entity_id","field","value"]}},
{name:"add_note",description:"Add note to entity",input_schema:{type:"object",properties:{collection:{type:"string"},entity_id:{type:"string"},text:{type:"string"}},required:["collection","entity_id","text"]}},
{name:"advance_pilot",description:"Advance pilot stage",input_schema:{type:"object",properties:{pilot_id:{type:"string"}},required:["pilot_id"]}},
{name:"advance_investor",description:"Advance investor stage",input_schema:{type:"object",properties:{investor_id:{type:"string"}},required:["investor_id"]}},
{name:"resolve_incident",description:"Resolve incident",input_schema:{type:"object",properties:{incident_id:{type:"string"}},required:["incident_id"]}},
{name:"complete_task",description:"Complete task",input_schema:{type:"object",properties:{task_id:{type:"string"}},required:["task_id"]}},
];
// File tools (always available to everyone)
var FILE_TOOLS=[
{name:"generate_csv",description:"Generate+download CSV spreadsheet",input_schema:{type:"object",properties:{title:{type:"string"},headers:{type:"array",items:{type:"string"}},rows:{type:"array",items:{type:"array",items:{type:"string"}}}},required:["title","headers","rows"]}},
{name:"generate_docx",description:"Generate+download Word .doc",input_schema:{type:"object",properties:{title:{type:"string"},html:{type:"string"}},required:["title","html"]}},
{name:"generate_pdf",description:"Generate PDF via print dialog",input_schema:{type:"object",properties:{title:{type:"string"},html:{type:"string"}},required:["title","html"]}},
{name:"generate_pptx",description:"Generate+download PowerPoint .ppt",input_schema:{type:"object",properties:{title:{type:"string"},slides:{type:"array",items:{type:"object",properties:{title:{type:"string"},body:{type:"string"}},required:["title","body"]}}},required:["title","slides"]}},
{name:"generate_latex",description:"Generate+download LaTeX .tex",input_schema:{type:"object",properties:{title:{type:"string"},content:{type:"string"}},required:["title","content"]}},
];

var execLocal=function(name,input){
  // File tools — always allowed for everyone
  if(name==="generate_csv"){return"FILE:"+genCSV(input.title,input.headers,input.rows);}
  if(name==="generate_docx"){return"FILE:"+genDOCX(input.title,input.html);}
  if(name==="generate_pdf"){return"FILE:"+genPDF(input.title,input.html);}
  if(name==="generate_pptx"){return"FILE:"+genPPTX(input.title,input.slides);}
  if(name==="generate_latex"){return"FILE:"+genLatex(input.title,input.content);}
  // Data tools — require admin password
  if(!canEdit)return"DENIED: Admin login required to modify data.";
  if(name==="update_field"){var v=input.value;var nv=isNaN(Number(v))?v:Number(v);acts.updateField(input.collection,input.entity_id,input.field,nv);return"Updated "+input.collection+"/"+input.entity_id+"."+input.field+"="+v;}
  if(name==="add_note"){acts.addNote(input.collection,input.entity_id,input.text);return"Note added";}
  if(name==="advance_pilot"){acts.advP(input.pilot_id);return"Pilot advanced";}
  if(name==="advance_investor"){acts.advI(input.investor_id);return"Investor advanced";}
  if(name==="resolve_incident"){acts.resInc(input.incident_id);return"Incident resolved";}
  if(name==="complete_task"){acts.togTask(input.task_id);return"Task completed";}
  return"OK";
};

// Multi-turn tool_use loop
// Launch swarm workflow
var launchSwarm=function(){
  if(!swarmObjective.trim()||swarmLoading)return;
  setSwarmLoading(true);setSwarmResult(null);
  var dataSnap="SS:"+D.ss.map(function(s){return s.id+":"+s.name+" "+s.mat+"%";}).join(",")+"|Pilots:"+D.pilots.map(function(p){return p.name+" "+p.viab+"%";}).join(",")+"|Runway:"+D.fin.runway+"mo|Burn:$"+D.fin.burn;
  fetch("/api/orchestrate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({workflow:selWorkflow,objective:swarmObjective,dataContext:dataSnap,mode:approvalMode})})
  .then(function(r){return r.json();})
  .then(function(data){
    setSwarmResult(data);setSwarmLoading(false);
    if(data.mutations&&data.mutations.length>0&&(data.mode==="advisory"||approvalMode==="advisory")){
      setPendingMuts(function(prev){return prev.concat(data.mutations.map(function(m){return Object.assign({},m,{status:"pending",at:nw(),agent:"swarm"});}));});
    }
  })
  .catch(function(e){setSwarmResult({error:String(e)});setSwarmLoading(false);});
};

var sendAgent=function(){if(!inp.trim()||ld)return;var userTxt=inp.trim();setInp("");
  setMsgs(function(prev){var n=Object.assign({},prev);n[agentId]=(n[agentId]||[]).concat([{role:"user",text:userTxt}]);return n;});
  setLd(true);

  var dataSnap="SS:"+D.ss.map(function(s){return s.id+":"+s.name+" "+s.mat+"%";}).join(",")+
  "|Skills:"+D.skills.map(function(s){return s.id+":"+s.name+" "+s.success+"%";}).join(",")+
  "|Tasks:"+D.tasks.map(function(t){return t.id+":"+t.title+"("+t.pri+"/"+t.status+")";}).join(",")+
  "|Pilots:"+D.pilots.map(function(p){return p.id+":"+p.name+" "+p.viab+"%";}).join(",")+
  "|Inv:"+D.investors.map(function(v){return v.id+":"+v.name+" "+v.prob+"%";}).join(",")+
  "|Inc:"+D.incidents.map(function(i){return i.id+":"+i.status;}).join(",")+
  "|Fleet:"+D.fleet.map(function(f){return f.id+":"+f.unit+" "+f.health+"%";}).join(",")+
  "|Fin:burn=$"+D.fin.burn+",cash=$"+D.fin.cash+",runway="+D.fin.runway+"mo";

  var agentRisks=calcRisks(D);
  if(agentRisks.length>0)dataSnap+="|RISKS:"+agentRisks.slice(0,5).map(function(r){return"["+r.sev+"]"+r.msg;}).join(",");
  if(D.deps&&D.deps.length>0)dataSnap+="|DEPS:"+D.deps.map(function(d){return d.from+"->"+d.blocks.join("+");}).join(",");
  if(D.pilotDeadlines)dataSnap+="|DEADLINES:"+Object.keys(D.pilotDeadlines).map(function(k){return k+":"+D.pilotDeadlines[k].needBy;}).join(",");

  // DOGMA ontology context from NODE_TREE + seed data
  var ontologySnap=NODE_TREE.map(function(g){return g.label+":"+g.children.map(function(c){return c.label+"("+c.description.slice(0,40)+")";}).join(",");}).join("|");
  dataSnap+="|ONTOLOGY:"+ontologySnap;
  // Include current node context if user is viewing a node
  if(sel){var selNode=findNode(sel.id);var selSeed=SEED_DATA[sel.id]||[];if(selNode){dataSnap+="|CURRENT_NODE:"+selNode.label+":"+selNode.description;if(selSeed.length>0){dataSnap+="|NODE_DATA:"+selSeed.map(function(r){return(r.name||r.title||"")+"="+(r.description||"").slice(0,50);}).join(",");}}}

  // Backend handles tool_use loop + MCP connections
  fetch("/api/chat",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({message:userTxt,agentId:agentId,dataContext:dataSnap,mode:approvalMode,designGuide:designGuide,showThinking:showThinking,stream:true})
  }).then(function(res){
    if(!res.body){throw new Error("No response body");}
    var reader=res.body.getReader();var decoder=new TextDecoder();var fullText="";var thinkText="";
    setStreamingMsg({agentId:agentId,text:"",thinking:"",done:false});
    function pump(){return reader.read().then(function(result){
      if(result.done){setStreamingMsg(null);return{text:fullText,gateway:{connected:false}};}
      var chunk=decoder.decode(result.value,{stream:true});var lines=chunk.split("\n");
      for(var li=0;li<lines.length;li++){var line=lines[li];
        if(line.startsWith("data: ")){var payload=line.slice(6);if(payload==="[DONE]")continue;
          try{var ev=JSON.parse(payload);
            if(ev.type==="thinking"){thinkText+=ev.text;setStreamingMsg(function(p){return p?Object.assign({},p,{thinking:thinkText}):p;});}
            else if(ev.type==="text"){fullText+=ev.text;setStreamingMsg(function(p){return p?Object.assign({},p,{text:fullText}):p;});}
            else if(ev.type==="done"){setStreamingMsg(null);return{text:cleanResponse(fullText||ev.text)||"(no response)",gateway:ev.gateway||{connected:false}};}
          }catch(e){}}}
      return pump();});}
    return pump();
  }).then(function(data){
    var text=cleanResponse(data.text)||"(empty)";
    if(data.mcpConnected&&data.mcpConnected.length>0)setMcpConn(data.mcpConnected);
    if(data.user&&data.user.role&&!userInfo.loaded)setUserInfo({name:data.user.name||'',role:data.user.role||'',loaded:true});
    var files=(data.files||[]).map(function(f){return{name:f.name,icon:f.type==="csv"?"\uD83D\uDCC8":f.type==="html"?"\uD83D\uDCC4":f.type==="json"?"\uD83D\uDCCB":f.type==="md"?"\uD83D\uDCDD":"\uD83D\uDCC1",url:f.url,at:nw()};});
    var mutations=data.mutations||[];
    if(approvalMode==="advisory"&&mutations.length>0){
      setPendingMuts(function(prev){return prev.concat(mutations.map(function(m){return Object.assign({},m,{status:"pending",at:nw(),agent:agentId});}));});
      text+="\\n\\n\uD83D\uDD12 "+mutations.length+" mutation(s) proposed (advisory mode). Review in approval queue.";
    }
    setMsgs(function(prev){var n=Object.assign({},prev);var parsed=parseThinking(text);n[agentId]=(n[agentId]||[]).concat([{role:"ai",via:(data.gateway&&data.gateway.connected)?"openclaw":"cloud",text:parsed.text,thinking:parsed.thinking,files:files,mutations:mutations}]);return n;});
    // If agent made data mutations, refresh local state from Supabase
    if(mutations.length>0){
      fetch("/api/dashboard/summary").then(function(r){return r.json();}).then(function(data){
        if(data&&data.ss){
          // Re-map just like mount
          var fin=data.fin||D.fin;
          setD(function(prev){return Object.assign({},prev,{
            tasks:(data.tasks||[]).map(function(t){return{id:t.id,pct:t.progress||t.pct||0,title:t.title,ws:t.workspace||'General',status:t.status||'todo',pri:t.priority||'medium',due:'',owner:'Jero',created:'',notes:[],blocked:t.blocked_by||'',sb:t.sub_tasks||[],impact:t.impact||''};}),
            pilots:(data.pilots||[]).map(function(p){return{id:p.id,name:p.company_name,stage:p.stage||'Identified',viab:p.viability_score||0,roi:p.roi_estimate||'',champ:p.champion_name||'',champStr:p.champion_strength||'None',plant:'',plc:'',pain:'',skills:[],comp:[],risk:p.risk_level||'medium',qs:[],nextStep:'',fu:'',meetings:[],blockers:[],notes:[]};}),
            incidents:(data.incidents||[]).map(function(i){return{id:i.id,sev:i.severity||'low',desc:i.title||'',down:i.downtime||'',root:i.root_cause||'',status:i.status||'open',reported:'',notes:[],acts:i.actions||[],timeline:i.timeline||[]};}),
            fin:{burn:fin.burn||prev.fin.burn,cash:fin.cash||prev.fin.cash,runway:fin.runway||prev.fin.runway,bom:fin.bom||prev.fin.bom,spend:fin.spend||prev.fin.spend},
          });});
        }
      }).catch(function(){});
    }
  })
  .catch(function(err){
    setMsgs(function(prev){var n=Object.assign({},prev);n[agentId]=(n[agentId]||[]).concat([{role:"ai",text:"Network error: "+String(err)}]);return n;});
  })
  .finally(function(){setLd(false);});
};

// Page content
var pageTitle="";var pageContent=null;
if(sel){
  if(sel.level==="main"){pageTitle=sel.id.toUpperCase();pageContent=<MainPage nid={sel.id} D={D} files={files} onUpload={onUpload} onRemove={onRemove} acts={acts}/>;}
  else if(sel.level==="sub"){
    var sn=allSubs.find(function(s){return s.id===sel.id;});
    if(sn){pageTitle=sn.label;pageContent=<SubPage sub={sn} D={D} acts={acts} files={files} onUpload={onUpload} onRemove={onRemove}/>;}
    else{/* NODE_TREE sub-node — render via MainPage catch-all */pageTitle=sel.id;pageContent=<MainPage nid={sel.id} D={D} files={files} onUpload={onUpload} onRemove={onRemove} acts={acts}/>;}
  }
  else if(sel.level==="ssub"){
    var ssn2=allSSubs.find(function(s){return s.id===sel.id;});
    if(ssn2){pageTitle=ssn2.label;pageContent=<LeafPage leaf={ssn2} acts={acts}/>;}
    else{/* NODE_TREE sub-sub-node — render via MainPage catch-all */pageTitle=sel.id;pageContent=<MainPage nid={sel.id} D={D} files={files} onUpload={onUpload} onRemove={onRemove} acts={acts}/>;}
  }
}

return(<div suppressHydrationWarning style={{width:"100vw",height:"100vh",overflow:"hidden",background:C.bg,display:"flex",flexDirection:"column",fontFamily:"'Instrument Sans',sans-serif",color:C.tx}}>
  {/* Loading overlay until mounted */}
  {!mounted&&<div style={{position:"fixed",inset:0,zIndex:9999,background:C.bg,display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{textAlign:"center"}}><div style={{width:40,height:40,background:C.gold,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 12px"}}><span style={{color:C.bg,fontWeight:900,fontSize:20,fontFamily:"monospace"}}>D</span></div><div style={{color:C.gold,fontSize:16,fontWeight:700}}>DOGMA OS</div><div style={{color:C.tx3,fontSize:12,marginTop:4}}>Loading...</div></div></div>}
  {/* Create Form Modal */}
  {showCreate&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.7)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center"}} onMouseDown={function(e){if(e.target===e.currentTarget){setShowCreate(null);setCreateForm({});}}}>
    <div style={{background:C.bg1,border:"1px solid "+C.gold+"40",borderRadius:8,padding:24,width:420,maxHeight:"80vh",overflowY:"auto"}} onMouseDown={function(e){e.stopPropagation();}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <div style={{fontSize:18,fontWeight:700,color:C.gold}}>+ New {showCreate.type}</div>
        <span onClick={function(){setShowCreate(null);setCreateForm({});}} style={{cursor:"pointer",color:C.tx3,fontSize:20,lineHeight:1}}>\u00d7</span>
      </div>
      {(function(){var flds={ss:[["name","Name"],["status","Status (dev/testing/validated)"],["mat","Maturity %"],["ver","Version"]],skills:[["name","Name"],["status","Status"],["success","Success %"]],tasks:[["title","Title"],["pri","Priority (low/medium/high/critical)"],["ws","Workspace"],["due","Due Date"]],pilots:[["name","Company Name"],["stage","Stage"],["viab","Viability %"],["roi","ROI Estimate"],["champ","Champion"]],investors:[["name","Fund Name"],["stage","Stage"],["prob","Probability %"],["check","Check Size"]],incidents:[["desc","Description"],["sev","Severity (low/medium/high/critical)"]],fleet:[["unit","Unit Name"],["type","Type"],["loc","Location"]],exps:[["title","Title"],["outcome","Outcome (pass/fail/partial)"]],milestones:[["title","Title"],["target","Target Date"],["risk","Risk Level"]],safety:[["name","Standard Name"],["cov","Coverage %"]],supply:[["item","Item Name"],["supplier","Supplier"],["lead","Lead Time"]]};return(flds[showCreate.type]||[["name","Name"]]).map(function(fld){return <div key={fld[0]} style={{marginBottom:12}}><div style={{fontSize:11,color:C.tx3,marginBottom:3,textTransform:"uppercase",letterSpacing:"0.04em"}}>{fld[1]}</div><input autoFocus={fld===( flds[showCreate.type]||[["name","Name"]])[0]} value={createForm[fld[0]]||""} onChange={function(e){var k=fld[0];setCreateForm(function(p){var n=Object.assign({},p);n[k]=e.target.value;return n;});}} onKeyDown={function(e){if(e.key==="Enter"){var hasVal=Object.values(createForm).some(function(v){return v&&String(v).trim();});if(hasVal){apiCreate(showCreate.type,createForm);setShowCreate(null);setCreateForm({});}}}} style={{width:"100%",padding:"8px 12px",fontSize:14,background:C.bg,border:"1px solid "+C.bd,borderRadius:4,color:C.tx,outline:"none",fontFamily:"inherit"}}/></div>;});})()}
      <div style={{display:"flex",gap:8,marginTop:20}}>
        <button onClick={function(){var hasVal=Object.values(createForm).some(function(v){return v&&String(v).trim();});if(hasVal){apiCreate(showCreate.type,createForm);setShowCreate(null);setCreateForm({});}}} style={{flex:1,padding:"8px 16px",fontSize:13,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",background:"rgba(200,167,75,0.1)",color:C.gold,border:"1px solid rgba(200,167,75,0.25)",borderRadius:4,cursor:"pointer"}}>Create</button>
        <button onClick={function(){setShowCreate(null);setCreateForm({});}} style={{padding:"8px 16px",fontSize:13,fontWeight:600,background:C.bg3,color:C.tx2,border:"1px solid "+C.bd,borderRadius:4,cursor:"pointer"}}>Cancel</button>
      </div>
    </div>
  </div>}
  
  {/* ═══ COMMAND PALETTE (Cmd+K) ═══ */}
  {cmdOpen&&<div style={{position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.6)",zIndex:200,display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:"15vh"}} onMouseDown={function(e){if(e.target===e.currentTarget){setCmdOpen(false);setCmdQ("");}}}>
    <div style={{background:C.bg1,border:"1px solid "+C.gold+"40",borderRadius:12,width:560,maxHeight:"60vh",overflow:"hidden",boxShadow:"0 20px 60px rgba(0,0,0,0.5)"}}>
      <div style={{padding:"12px 16px",borderBottom:"1px solid "+C.bd,display:"flex",alignItems:"center",gap:8}}>
        <span style={{color:C.gold,fontSize:16}}>⌘</span>
        <input autoFocus value={cmdQ} onChange={function(e){setCmdQ(e.target.value);}} placeholder="Type a command... (create task, show pilots, run planner)" style={{flex:1,padding:"6px 0",fontSize:15,background:"transparent",border:"none",color:C.tx,outline:"none",fontFamily:"inherit"}} onKeyDown={function(e){
          if(e.key==="Escape"){setCmdOpen(false);setCmdQ("");}
          if(e.key==="Enter"&&cmdQ.trim()){
            var q=cmdQ.toLowerCase().trim();
            // Navigation commands
            if(q.indexOf("open ")===0||q.indexOf("show ")===0||q.indexOf("go ")===0){
              var target=q.replace(/^(open|show|go) /,"").trim();
              var nodeMap={"rd":"rd","r&d":"rd","research":"rd","experiments":"experiments","exp":"experiments","incidents":"incidents","inc":"incidents","fleet":"fleet","pilots":"pilots","pilot":"pilots","fundraising":"fundraising","fund":"fundraising","investors":"fundraising","finance":"finance","fin":"finance","tasks":"team","team":"team","roadmap":"roadmap","safety":"roadmap","command":"command"};
              var nid=nodeMap[target];
              if(nid){setSel({level:"main",id:nid});setXp(function(p){var n=Object.assign({},p);n[nid]=true;return n;});}
              // Search in subs
              if(!nid){var found=allSubs.find(function(s){return s.label.toLowerCase().indexOf(target)>=0;});if(found){setSel({level:"sub",id:found.id});setXp(function(p){var n=Object.assign({},p);n[found.parent]=true;return n;});}}
            }
            // Create commands
            else if(q.indexOf("create ")===0||q.indexOf("new ")===0||q.indexOf("add ")===0){
              var what=q.replace(/^(create|new|add) /,"").trim();
              var typeMap2={"task":"tasks","subsystem":"ss","ss":"ss","skill":"skills","pilot":"pilots","investor":"investors","incident":"incidents","experiment":"exps","milestone":"milestones","fleet":"fleet"};
              var ct=typeMap2[what]||typeMap2[what+"s"];
              if(ct)setShowCreate({type:ct});
            }
            // Run agent
            else if(q.indexOf("run ")===0||q.indexOf("ask ")===0){
              var parts=q.replace(/^(run|ask) /,"").trim();
              var agentNames={planner:"planner",architect:"architect",researcher:"researcher",coder:"coder",reviewer:"reviewer",tester:"tester",security:"security-scanner",optimizer:"optimizer",documenter:"documenter"};
              var firstWord=parts.split(" ")[0];
              var agId=agentNames[firstWord];
              if(agId){setAgentId(agId);setMode("chat");setInp(parts.slice(firstWord.length).trim());}
              else{setMode("chat");setInp(q.replace(/^(run|ask) /,""));}
            }
            // Mode switch
            else if(q==="chat")setMode("chat");
            else if(q==="swarm")setMode("swarm");
            else if(q==="timeline"||q==="activity")setMode("timeline");
            else if(q==="approvals"||q==="queue")setMode("approvals");
            else if(q==="map"||q==="graph"||q==="workspace")setMode("map");
            else if(q==="mission"||q==="control"||q==="ops")setMode("mission");
            // Blocked tasks
            else if(q.indexOf("blocked")>=0){setSel({level:"main",id:"team"});setXp(function(p){var n=Object.assign({},p);n.team=true;return n;});}
            // Default: search
            else{setSearch(q);setSearchOpen(true);}
            setCmdOpen(false);setCmdQ("");
          }
        }}/>
        <span style={{fontSize:10,color:C.tx3,padding:"2px 6px",border:"1px solid "+C.bd,borderRadius:3,fontFamily:"'JetBrains Mono',monospace"}}>ESC</span>
      </div>
      <div style={{padding:"8px 0",maxHeight:"45vh",overflowY:"auto"}}>
        {(function(){var q=cmdQ.toLowerCase();var items=[];
          // Quick actions
          if(!q||q.length<2){items=[
            {icon:"➕",label:"Create Task",hint:"new task",cat:"Actions"},
            {icon:"➕",label:"Create Pilot",hint:"new pilot",cat:"Actions"},
            {icon:"🔍",label:"Show R&D",hint:"open rd",cat:"Navigation"},
            {icon:"🔍",label:"Show Pilots",hint:"open pilots",cat:"Navigation"},
            {icon:"🔍",label:"Show Finance",hint:"open finance",cat:"Navigation"},
            {icon:"💬",label:"Open Chat",hint:"chat",cat:"Modes"},
            {icon:"🐝",label:"Open Swarm",hint:"swarm",cat:"Modes"},
            {icon:"📊",label:"Open Timeline",hint:"timeline",cat:"Modes"},
            {icon:"🗺️",label:"Workspace Map",hint:"map",cat:"Modes"},
            {icon:"🎯",label:"Mission Control",hint:"mission",cat:"Modes"},
                      ];}
          else{
            // Search nodes
            var matches=[];
            NODES.forEach(function(n){if(n.label.toLowerCase().indexOf(q)>=0)matches.push({icon:"🔵",label:n.label,hint:"open "+n.id,cat:"Nodes"});});
            allSubs.forEach(function(s){if(s.label.toLowerCase().indexOf(q)>=0)matches.push({icon:"🟡",label:s.label,hint:"open "+s.id,cat:"Sub-nodes",metric:s.metric});});
            // Action matches
            if("create".indexOf(q)>=0||"new".indexOf(q)>=0||"add".indexOf(q)>=0){
              ["task","pilot","investor","incident","subsystem","experiment","milestone"].forEach(function(t){
                matches.push({icon:"➕",label:"Create "+t,hint:"create "+t,cat:"Actions"});
              });
            }
            if("run".indexOf(q)>=0||"ask".indexOf(q)>=0){
              ["planner","researcher","architect","coder","reviewer"].forEach(function(a){
                matches.push({icon:"🤖",label:"Ask "+a,hint:"ask "+a+" ",cat:"Agents"});
              });
            }
            items=matches.slice(0,12);
          }
          var lastCat="";
          return items.map(function(item,i){
            var showCat=item.cat!==lastCat;lastCat=item.cat;
            return <div key={i}>
              {showCat&&<div style={{fontSize:9,color:C.tx3,textTransform:"uppercase",letterSpacing:"0.1em",padding:"6px 16px 2px",fontWeight:700}}>{item.cat}</div>}
              <div onClick={function(){setCmdQ(item.hint);}} onDoubleClick={function(){
                setCmdQ(item.hint);
                // Simulate Enter
                var e2=new KeyboardEvent("keydown",{key:"Enter"});
              }} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 16px",cursor:"pointer",fontSize:13}} onMouseEnter={function(e){e.currentTarget.style.background=C.bg3;}} onMouseLeave={function(e){e.currentTarget.style.background="transparent";}}>
                <span>{item.icon}</span>
                <span style={{flex:1,color:C.tx}}>{item.label}</span>
                {item.metric&&<span style={{fontSize:10,color:C.gold,fontFamily:"'JetBrains Mono',monospace"}}>{item.metric}</span>}
                <span style={{fontSize:10,color:C.tx3,fontFamily:"'JetBrains Mono',monospace"}}>{item.hint}</span>
              </div>
            </div>;
          });
        })()}
      </div>
      <div style={{padding:"8px 16px",borderTop:"1px solid "+C.bd,display:"flex",gap:12,fontSize:10,color:C.tx3}}>
        <span>⌘K Open</span><span>↵ Execute</span><span>ESC Close</span><span style={{flex:1}}/><span>Navigation · Create · Agents · Modes</span>
      </div>
    </div>
  </div>}
  {/* Settings Panel */}
  <SettingsPanel
    open={showSettings}
    onClose={function(){setShowSettings(false);}}
    userName={userName}
    userRole={userRole}
    gatewayConnected={oc.gateway.connected}
    approvalMode={approvalMode}
    onToggleApproval={function(){setApprovalMode(approvalMode==="advisory"?"execute":"advisory");}}
    agentEditPolicy={agentEditPolicy}
    onSetAgentPolicy={setAgentEditPolicy}
  />
  {/* Top Bar */}
  <TopBar
    search={search}
    onSearchChange={function(v){setSearch(v);setSearchOpen(v.length>=2);}}
    searchResults={searchResults}
    onSearchSelect={function(r){
      if(r.level==="main"){setSel({level:"main",id:r.id});if(r.id!=="command")setXp(function(p){var n=Object.assign({},p);n[r.id]=true;return n;});}
      else{setXp(function(p){var n=Object.assign({},p);n[r.parent]=true;return n;});setSel({level:"sub",id:r.id});}
    }}
    kpis={[{label:"RUN",value:D.fin.runway+"mo",color:D.fin.runway<4?C.r:C.a},{label:"INC",value:oI,color:oI?C.r:C.g},{label:"CRIT",value:cr,color:cr?C.r:C.g},{label:"MAT",value:am+"%",color:am>60?C.g:C.a},{label:"PILOTS",value:D.pilots.length,color:C.gold}]}
    userName={userName}
    userRole={userRole}
    authed={authed}
    onLogin={function(){setShowLogin(true);}}
    onLogout={doLogout}
    approvalMode={approvalMode}
    onToggleApproval={function(){setApprovalMode(approvalMode==="advisory"?"execute":"advisory");}}
    onOpenSettings={function(){setShowSettings(true);}}
    onOpenCmd={function(){setCmdOpen(true);setCmdQ("");}}
  />

  {/* Main area — Sidebar + 3D/Page + Chat right */}
  <div style={{flex:1,display:"flex",overflow:"hidden",position:"relative"}}>
    {/* Left Sidebar — NODE_TREE driven */}
    <div style={{width:220,minWidth:220,background:C.bg1,borderRight:"1px solid "+C.bd,overflowY:"auto",flexShrink:0,fontSize:12}}>
      {/* COMMAND node */}
      <div onClick={function(){focusNode([0,0,0],24);setSel({level:"main",id:"command"});}} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 10px",cursor:"pointer",borderBottom:"1px solid "+C.bd+"40",background:sel&&sel.id==="command"?C.gold+"12":"transparent"}} onMouseEnter={function(e){e.currentTarget.style.background=C.bg3;}} onMouseLeave={function(e){e.currentTarget.style.background=sel&&sel.id==="command"?C.gold+"12":"transparent";}}>
        <div style={{width:10,height:10,borderRadius:"50%",background:"#C8A74B",flexShrink:0}}/>
        <span style={{fontWeight:700,color:C.gold,fontSize:13}}>DOGMA COMMAND</span>
      </div>
      {/* NODE_TREE groups */}
      {liveTree.map(function(group){
        var isGrpExp=!!xp[group.id];
        return <div key={group.id}>
          <div onClick={function(){setXp(function(p){var n=Object.assign({},p);n[group.id]=!p[group.id];return n;});}} style={{padding:"6px 10px",fontSize:9,color:C.tx3,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:700,background:C.bg+"80",borderBottom:"1px solid "+C.bd+"30",cursor:"pointer",display:"flex",alignItems:"center",gap:4}}>
            <span style={{fontSize:8}}>{isGrpExp?"▼":"▶"}</span>
            <span style={{flex:1}}>{group.icon} {group.label}</span>
            {canEdit&&<span onClick={function(e){e.stopPropagation();var name=prompt("New node name:");if(!name||!name.trim())return;var id="node-"+Date.now();addNodeToTree(group.id,{id:id,label:name.trim(),icon:"📄",description:name.trim(),dbTable:"subsystems",columns:[{key:"name",label:"Name",type:"text",editable:true,width:180},{key:"description",label:"Description",type:"text",editable:true,width:250},{key:"maturity_level",label:"Maturity",type:"progress",editable:true,width:120},{key:"status",label:"Status",type:"status",editable:true,width:100},{key:"criticality",label:"Criticality",type:"priority",editable:true,width:100},{key:"owner",label:"Owner",type:"person",editable:true,width:100}],children:[]});}} style={{color:C.gold,fontSize:10,opacity:0.5,padding:"0 2px"}} title="Add node">+</span>}
          </div>
          {isGrpExp&&group.children.map(function(node){
            var isSel=sel&&sel.id===node.id;
            var isNodeExp=!!xp[node.id];
            return <div key={node.id}>
              <div onClick={function(){
                if(node.children&&node.children.length>0){setXp(function(p){var n=Object.assign({},p);n[node.id]=!p[node.id];return n;});}
                setSel({level:"main",id:node.id});
              }} style={{display:"flex",alignItems:"center",gap:5,padding:"5px 10px 5px 16px",cursor:"pointer",background:isSel?C.gold+"12":"transparent",borderLeft:isSel?"2px solid "+C.gold:"2px solid transparent"}} onMouseEnter={function(e){if(!isSel)e.currentTarget.style.background=C.bg3;}} onMouseLeave={function(e){if(!isSel)e.currentTarget.style.background="transparent";}}>
                {node.children&&node.children.length>0?<span style={{fontSize:8,color:C.tx3}}>{isNodeExp?"▼":"▶"}</span>:<span style={{width:8}}/>}
                <span style={{fontSize:11}}>{node.icon}</span>
                <span style={{flex:1,color:isSel?C.gold:C.tx,fontWeight:isSel?600:400,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontSize:11}}>{node.label}</span>
                {canEdit&&<span onClick={function(e){e.stopPropagation();var name=prompt("New sub-node name:");if(!name||!name.trim())return;var id="sub-"+Date.now();addNodeToTree(node.id,{id:id,label:name.trim(),icon:"📎",description:name.trim(),dbTable:"subsystems",columns:[{key:"name",label:"Name",type:"text",editable:true,width:180},{key:"description",label:"Description",type:"text",editable:true,width:250},{key:"maturity_level",label:"Maturity",type:"progress",editable:true,width:120},{key:"status",label:"Status",type:"status",editable:true,width:100},{key:"criticality",label:"Criticality",type:"priority",editable:true,width:100},{key:"owner",label:"Owner",type:"person",editable:true,width:100}],children:[]});}} style={{color:C.gold,fontSize:9,opacity:0.4,padding:"0 2px"}} title="Add sub-node">+</span>}
                {canEdit&&<span onClick={function(e){e.stopPropagation();deleteNodeFromTree(node.id);}} style={{color:C.r,fontSize:9,opacity:0.4,padding:"0 2px"}} title="Delete node">x</span>}
              </div>
              {/* L2 children */}
              {isNodeExp&&node.children&&node.children.map(function(child){
                var isChildSel=sel&&sel.id===child.id;
                var isChildExp=!!xp2[child.id];
                return <div key={child.id}>
                  <div onClick={function(){
                    if(child.children&&child.children.length>0){setXp2(function(p){var n=Object.assign({},p);n[child.id]=!p[child.id];return n;});}
                    setSel({level:"sub",id:child.id});
                  }} style={{display:"flex",alignItems:"center",gap:4,padding:"3px 10px 3px 30px",cursor:"pointer",fontSize:10,background:isChildSel?C.gold+"08":"transparent",borderLeft:isChildSel?"2px solid "+C.gold:"2px solid transparent"}} onMouseEnter={function(e){if(!isChildSel)e.currentTarget.style.background=C.bg3;}} onMouseLeave={function(e){if(!isChildSel)e.currentTarget.style.background="transparent";}}>
                    {child.children&&child.children.length>0?<span style={{fontSize:7,color:C.tx3}}>{isChildExp?"▼":"▶"}</span>:<span style={{width:7}}/>}
                    <span style={{fontSize:10}}>{child.icon}</span>
                    <span style={{flex:1,color:isChildSel?C.gold:C.tx2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{child.label}</span>
                    {canEdit&&<span onClick={function(e){e.stopPropagation();var name=prompt("New sub-sub-node name:");if(!name||!name.trim())return;var id="ssub-"+Date.now();addNodeToTree(child.id,{id:id,label:name.trim(),icon:"•",description:name.trim(),dbTable:"subsystems",columns:[{key:"name",label:"Name",type:"text",editable:true,width:180},{key:"description",label:"Description",type:"text",editable:true,width:250},{key:"status",label:"Status",type:"status",editable:true,width:100},{key:"criticality",label:"Criticality",type:"priority",editable:true,width:100}],children:[]});}} style={{color:C.gold,fontSize:8,opacity:0.4,padding:"0 1px"}} title="Add child">+</span>}
                    {canEdit&&<span onClick={function(e){e.stopPropagation();deleteNodeFromTree(child.id);}} style={{color:C.r,fontSize:8,opacity:0.4,padding:"0 1px"}} title="Delete">x</span>}
                  </div>
                  {/* L3 grandchildren */}
                  {isChildExp&&child.children&&child.children.map(function(gc){
                    var isGcSel=sel&&sel.id===gc.id;
                    return <div key={gc.id} onClick={function(){setSel({level:"ssub",id:gc.id});}} style={{display:"flex",alignItems:"center",gap:4,padding:"2px 10px 2px 46px",cursor:"pointer",fontSize:9,color:isGcSel?C.gold:C.tx3}} onMouseEnter={function(e){e.currentTarget.style.background=C.bg3;e.currentTarget.style.color=C.tx;}} onMouseLeave={function(e){e.currentTarget.style.background="transparent";e.currentTarget.style.color=isGcSel?C.gold:C.tx3;}}>
                      <div style={{width:3,height:3,borderRadius:"50%",background:isGcSel?C.gold:C.tx3,flexShrink:0}}/>
                      <span style={{flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{gc.label}</span>
                      {canEdit&&<span onClick={function(e){e.stopPropagation();deleteNodeFromTree(gc.id);}} style={{color:C.r,fontSize:8,opacity:0.4,padding:"0 1px"}} title="Delete">x</span>}
                    </div>;
                  })}
                </div>;
              })}
            </div>;
          })}
        </div>;
      })}
    </div>

    {/* Center: 3D always visible + Page overlay */}
    <div style={{flex:2,position:"relative",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      {/* 3D always rendered */}
      <div style={{position:"absolute",inset:0}}>
      <canvas ref={canvasRef} style={{width:"100%",height:"100%",cursor:"grab"}} onWheel={onWheel} onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp} onContextMenu={function(e){e.preventDefault();}}/>
      <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden"}}>
        {overlay.map(function(ov){var sz=ov.level==="main"?30:ov.level==="sub"?20:14;return <div key={ov.id} onClick={function(e){e.stopPropagation();onNodeClick(ov.id,ov.level);}} style={{position:"absolute",left:ov.x-sz/2,top:ov.y-sz/2,width:sz,height:sz,borderRadius:"50%",cursor:"pointer",pointerEvents:"auto"}} title={ov.label}/>;})}</div>
      <div style={{position:"absolute",bottom:8,left:12,fontSize:10,color:C.tx3,fontFamily:"monospace",background:C.bg1+"cc",padding:"3px 8px",borderRadius:2}}>Drag=pan | Shift+drag=orbit | Scroll=zoom | Click=expand | Double-click=open page</div>
      </div>

      {/* Page overlay on top of 3D */}
      {sel&&<div style={{position:"absolute",inset:0,background:C.bg+"f0",zIndex:5,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{padding:"10px 20px",borderBottom:"1px solid "+C.bd,display:"flex",alignItems:"center",gap:10,flexShrink:0,background:C.bg1}}>
          <div onClick={function(){
            if(sel.level==="ssub"){var pid=sel.id.split("_").slice(0,-1).join("_");var ps=allSubs.find(function(s){return s.id===pid;});if(ps){setSel({level:"sub",id:ps.id});return;}}
            if(sel.level==="sub"){var sn=allSubs.find(function(s){return s.id===sel.id;});if(sn&&sn.parent){setSel({level:"main",id:sn.parent});return;}}
            setSel(null);
          }} style={{cursor:"pointer",padding:"4px 10px",background:C.bg3,border:"1px solid "+C.bd,borderRadius:3,fontSize:13,color:C.tx2}}>
            {sel.level==="main"?"\u2190 Back to Network":"\u2190 Back"}
          </div>
          <span style={{fontSize:14,fontWeight:700,color:C.gold,textTransform:"uppercase",letterSpacing:"0.06em"}}>{pageTitle}</span>
          <div style={{flex:1}}/>
          <span onClick={function(){setSel(null);}} style={{cursor:"pointer",color:C.tx3,fontSize:18}}>x</span>
        </div>
        <div style={{flex:1,overflowY:"auto",padding:"16px 24px",maxWidth:800}}>{pageContent||<div style={{color:C.tx3}}>No data available.</div>}</div>
      </div>}
    </div>

    {/* Right: Agent Panel (resizable) */}
    <div style={{width:chatW,minWidth:240,borderLeft:"1px solid "+C.bd,background:C.bg1,display:"flex",flexShrink:0,position:"relative"}}>
      {/* Resize handle */}
      <div onMouseDown={function(e){e.preventDefault();resizeRef.current=true;document.body.style.cursor="col-resize";document.body.style.userSelect="none";}} style={{position:"absolute",left:-3,top:0,bottom:0,width:6,cursor:"col-resize",zIndex:10,background:"transparent"}} onMouseEnter={function(e){e.currentTarget.style.background=C.gold+"30";}} onMouseLeave={function(e){if(!resizeRef.current)e.currentTarget.style.background="transparent";}}/>
      <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>

      {/* Mode toggle: Chat / Swarm */}
      <div style={{display:"flex",borderBottom:"1px solid "+C.bd,flexShrink:0,position:"relative"}}>
        <div onClick={function(){setMode("chat");}} style={{flex:1,padding:"8px 0",textAlign:"center",fontSize:11,fontWeight:600,cursor:"pointer",color:mode==="chat"?C.gold:C.tx3,borderBottom:mode==="chat"?"2px solid "+C.gold:"2px solid transparent",background:mode==="chat"?C.gold+"08":"transparent"}}>💬 Chat</div>
        
        <div onClick={function(){setMode("design");}} style={{flex:1,padding:"8px 0",textAlign:"center",fontSize:11,fontWeight:600,cursor:"pointer",color:mode==="design"?C.gold:C.tx3,borderBottom:mode==="design"?"2px solid "+C.gold:"2px solid transparent",background:mode==="design"?C.gold+"08":"transparent"}}>Design</div>
        <div onClick={function(){setMode("openclaw");}} style={{flex:1,padding:"8px 0",textAlign:"center",fontSize:11,fontWeight:600,cursor:"pointer",color:mode==="openclaw"?C.gold:C.tx3,borderBottom:mode==="openclaw"?"2px solid "+C.gold:"2px solid transparent",background:mode==="openclaw"?C.gold+"08":"transparent"}}>OpenClaw</div>
        <div onClick={function(){setMode("timeline");}} style={{flex:1,padding:"8px 0",textAlign:"center",fontSize:11,fontWeight:600,cursor:"pointer",color:mode==="timeline"?C.gold:C.tx3,borderBottom:mode==="timeline"?"2px solid "+C.gold:"2px solid transparent",background:mode==="timeline"?C.gold+"08":"transparent"}}>📊 Timeline</div>


        <div onClick={function(){setMode("approvals");}} style={{flex:1,padding:"8px 0",textAlign:"center",fontSize:11,fontWeight:600,cursor:"pointer",color:mode==="approvals"?C.gold:C.tx3,borderBottom:mode==="approvals"?"2px solid "+C.gold:"2px solid transparent",background:mode==="approvals"?C.gold+"08":"transparent"}}>{pendingMuts.length>0?"⚠️":"✅"} Queue{pendingMuts.length>0?" ("+pendingMuts.length+")":""}</div>
      </div>

      {/* ═══ CHAT MODE ═══ */}
      {mode==="chat"&&<>
      <div style={{padding:"6px 8px",borderBottom:"1px solid "+C.bd,flexShrink:0,maxHeight:160,overflowY:"auto"}}>
        {AGENT_CATEGORIES.map(function(cat){var catAgents=AGENTS.filter(function(a){return a.cat===cat.id;});return <div key={cat.id} style={{marginBottom:4}}>
          <div style={{fontSize:9,color:cat.color,textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:700,marginBottom:2}}>{cat.label}</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:2}}>
          {catAgents.map(function(ag){var isA=agentId===ag.id;return <div key={ag.id} onClick={function(){setAgentId(ag.id);}} title={ag.desc} style={{display:"flex",alignItems:"center",gap:2,padding:"3px 6px",borderRadius:3,cursor:"pointer",background:isA?ag.color+"15":"transparent",border:"1px solid "+(isA?ag.color+"30":C.bd+"50"),transition:"all 0.15s"}}><span style={{fontSize:11}}>{ag.icon}</span><span style={{fontSize:9,fontWeight:600,color:isA?ag.color:C.tx3}}>{ag.name}</span></div>;})}
          </div>
        </div>;})}
      </div>
      <div style={{padding:"8px 10px",borderBottom:"1px solid "+C.bd,flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:6}}><div style={{fontSize:13,fontWeight:700,color:curAgent.color}}>{curAgent.icon} {curAgent.name}</div><div style={{display:"flex",alignItems:"center",gap:4,padding:"2px 8px",borderRadius:3,fontSize:9,fontWeight:700,background:oc.gateway.connected?"rgba(45,122,93,0.1)":"rgba(138,51,51,0.1)",color:oc.gateway.connected?"#2D7A5D":"#8A3333",border:"1px solid "+(oc.gateway.connected?"rgba(45,122,93,0.25)":"rgba(138,51,51,0.25)")}}><span style={{width:5,height:5,borderRadius:"50%",background:oc.gateway.connected?"#2D7A5D":"#8A3333"}}/>{oc.gateway.connected?"OpenClaw":"Cloud"}</div></div>
        <div style={{fontSize:11,color:C.tx2,lineHeight:1.4,marginTop:2}}>{curAgent.desc}</div>
        {mcpConn.length>0&&<div style={{display:"flex",flexWrap:"wrap",gap:3,marginTop:4}}>{mcpConn.map(function(s,i){return <span key={i} style={{fontSize:9,padding:"2px 6px",borderRadius:3,background:C.g+"15",color:C.g,border:"1px solid "+C.g+"30",fontWeight:600}}>🔗 {s}</span>;})}</div>}
      </div>
      <div style={{flex:1,overflowY:"auto",padding:10,display:"flex",flexDirection:"column",gap:4}}>
        {curMsgs.length===0&&<div style={{fontSize:13,color:C.tx3,textAlign:"center",padding:20}}>Ask {curAgent.name}<br/><span style={{fontSize:11}}>Single agent — direct conversation</span></div>}
        {curMsgs.map(function(msg,i){return <div key={i} style={{maxWidth:"90%",alignSelf:msg.role==="user"?"flex-end":"flex-start"}}><div style={{padding:"6px 10px",borderRadius:6,background:msg.role==="user"?C.bg3:C.bg2,borderLeft:msg.role==="ai"?"2px solid "+(msg.via==="openclaw"?"#2D7A5D":curAgent.color):"none",fontSize:13,color:C.tx,lineHeight:1.5,whiteSpace:"pre-wrap"}}><MsgText text={msg.text}/></div>{msg.thinking&&showThinking&&<div style={{padding:"6px 10px",borderRadius:6,background:C.bg3,borderLeft:"2px solid "+C.a,fontSize:11,color:C.tx3,lineHeight:1.5,whiteSpace:"pre-wrap",marginTop:3,maxHeight:200,overflowY:"auto"}}><div style={{fontSize:9,color:C.a,textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:700,marginBottom:4}}>Claude thinking</div>{msg.thinking}</div>}{msg.files&&msg.files.length>0&&msg.files.map(function(f,j){var isH=f.name&&f.name.endsWith(".html");return <div key={j} style={{marginTop:3}}>
<div style={{display:"flex",alignItems:"center",gap:6,padding:"6px 8px",background:C.bg,border:"1px solid "+C.gold+"30",borderRadius:4,cursor:"pointer"}}>
<span style={{fontSize:16}}>{f.icon||"\uD83D\uDCC1"}</span>
<div style={{flex:1}}><div style={{fontSize:12,fontWeight:600,color:C.tx}}>{f.name}</div></div>
{isH&&f.url&&<span onClick={function(e){e.stopPropagation();window.open(f.url,"_blank");}} style={{fontSize:9,color:C.gold,padding:"2px 6px",border:"1px solid "+C.gold+"25",borderRadius:3,cursor:"pointer"}}>Preview</span>}
<span onClick={function(){if(f.url&&f.url!=="#"){var dl=document.createElement("a");dl.href=f.url;dl.download=f.name||"file";document.body.appendChild(dl);dl.click();document.body.removeChild(dl);}}} style={{color:C.gold,cursor:"pointer"}}>{"\u2B07"}</span>
</div></div>;})}</div>;})}
        {ld&&<div style={{fontSize:12,color:curAgent.color,fontStyle:"italic",padding:4}}>{curAgent.name} working...</div>}
        {streamingMsg&&streamingMsg.agentId===agentId&&<div style={{maxWidth:"90%",alignSelf:"flex-start"}}>
          {showThinking&&streamingMsg.thinking&&<div style={{padding:"6px 10px",borderRadius:6,background:C.bg3,borderLeft:"2px solid "+C.a,fontSize:12,color:C.tx3,lineHeight:1.5,whiteSpace:"pre-wrap",marginBottom:4,maxHeight:200,overflowY:"auto"}}><div style={{fontSize:9,color:C.a,textTransform:"uppercase",letterSpacing:"0.08em",fontWeight:700,marginBottom:4}}>Thinking...</div>{streamingMsg.thinking}</div>}
          {streamingMsg.text&&<TypeWriter text={streamingMsg.text} color={curAgent.color}/>}
        </div>}
        <div ref={chatEnd}/>
      </div>
      <div style={{padding:"4px 10px",borderTop:"1px solid "+C.bd,display:"flex",gap:6,alignItems:"center",flexShrink:0}}><div onClick={function(){setShowThinking(function(v){return !v;});}} style={{fontSize:9,padding:"2px 8px",borderRadius:3,cursor:"pointer",background:showThinking?C.gold+"15":"transparent",color:showThinking?C.gold:C.tx3,border:"1px solid "+(showThinking?C.gold+"30":C.bd),userSelect:"none"}}>{showThinking?"Thinking ON":"Thinking"}</div></div>
      <div style={{padding:"8px 10px",borderTop:"1px solid "+C.bd,display:"flex",gap:4,flexShrink:0}}>
        <input value={inp} onChange={function(e){setInp(e.target.value);}} onKeyDown={function(e){if(e.key==="Enter")sendAgent();}} placeholder={"Ask "+curAgent.name+"..."} style={{flex:1,padding:"6px 10px",fontSize:13,background:C.bg,border:"1px solid "+C.bd,borderRadius:3,color:C.tx,outline:"none"}}/>
        <Btn v="gold" onClick={sendAgent}>{"\u2191"}</Btn>
      </div>
      {/* Approval Queue */}
      {pendingMuts.length>0&&<div style={{borderTop:"1px solid "+C.bd,padding:"6px 10px",maxHeight:120,overflowY:"auto",flexShrink:0}}>
        <div style={{fontSize:9,color:C.gold,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:700,marginBottom:4}}>Pending Mutations ({pendingMuts.length})</div>
        {pendingMuts.map(function(m,i){return <div key={i} style={{display:"flex",alignItems:"center",gap:4,padding:"3px 0",fontSize:11,borderBottom:"1px solid "+C.bd+"30"}}>
          <span style={{color:C.a}}>{m.type}</span>
          <span style={{flex:1,color:C.tx2}}>{m.entity_type}/{(m.entity_id||"").slice(0,8)}</span>
          {m.field&&<span style={{color:C.tx3}}>{m.field}→{String(m.value).slice(0,12)}</span>}
          <span onClick={function(){
            // Approve: re-send mutation via API
            fetch("/api/commands",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:m.type,input:m})}).then(function(){
              setPendingMuts(function(p){return p.filter(function(_,j){return j!==i;});});
            });
          }} style={{cursor:"pointer",color:C.g,fontWeight:600,fontSize:10}}>✓</span>
          <span onClick={function(){setPendingMuts(function(p){return p.filter(function(_,j){return j!==i;});});}} style={{cursor:"pointer",color:C.r,fontSize:10}}>✕</span>
        </div>;})}
      </div>}
      </>}

      {/* ═══ SWARM MODE ═══ */}
      {false&&<>
      {/* Workflow selector */}
      <div style={{padding:"10px",borderBottom:"1px solid "+C.bd,flexShrink:0}}>
        <div style={{fontSize:11,color:C.tx3,textTransform:"uppercase",marginBottom:6}}>Select Workflow</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
          {SWARM_WORKFLOWS.map(function(w){var isSel=selWorkflow===w.id;return <div key={w.id} onClick={function(){setSelWorkflow(w.id);}} style={{padding:"6px 8px",borderRadius:4,cursor:"pointer",background:isSel?C.gold+"12":C.bg,border:"1px solid "+(isSel?C.gold+"40":C.bd),transition:"all 0.15s"}}>
            <div style={{fontSize:12,fontWeight:600,color:isSel?C.gold:C.tx}}>{w.icon} {w.name}</div>
            <div style={{fontSize:9,color:C.tx3,marginTop:2}}>{w.agents} agents</div>
          </div>;})}
        </div>
        {selWorkflow&&<div style={{fontSize:10,color:C.tx2,marginTop:6,padding:"4px 6px",background:C.bg,borderRadius:3}}>{SWARM_WORKFLOWS.find(function(w){return w.id===selWorkflow;})?.desc}</div>}
      </div>

      {/* Objective input */}
      <div style={{padding:"8px 10px",borderBottom:"1px solid "+C.bd,flexShrink:0}}>
        <div style={{fontSize:10,color:C.tx3,textTransform:"uppercase",marginBottom:4}}>7 Core Agents — focused on DOGMA operations</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:2,marginBottom:6}}>
          {AGENTS.map(function(a){return <span key={a.id} title={a.desc} style={{fontSize:9,padding:"2px 5px",borderRadius:2,background:a.color+"10",color:a.color,border:"1px solid "+a.color+"20"}}>{a.icon} {a.name}</span>;})}
        </div>
        <textarea value={swarmObjective} onChange={function(e){setSwarmObjective(e.target.value);}} placeholder="Describe the objective for the swarm..." rows={3} style={{width:"100%",padding:"6px 10px",fontSize:13,background:C.bg,border:"1px solid "+C.bd,borderRadius:3,color:C.tx,outline:"none",resize:"vertical",fontFamily:"inherit"}}/>
        <Btn v="gold" onClick={launchSwarm} style={{marginTop:4,width:"100%",opacity:selWorkflow&&swarmObjective.trim()?1:0.4}}>{swarmLoading?"🐝 Swarm running...":"🐝 Launch Swarm"}</Btn>
      </div>

      {/* Swarm results */}
      <div style={{flex:1,overflowY:"auto",padding:10}}>
        {!swarmResult&&!swarmLoading&&<div style={{textAlign:"center",padding:20,color:C.tx3}}>
          <div style={{fontSize:32,marginBottom:8}}>🐝</div>
          <div style={{fontSize:14,fontWeight:600,color:C.tx2}}>Multi-Agent Swarm</div>
          <div style={{fontSize:12,marginTop:4}}>Select a workflow, describe your objective, and launch. Same 20 agents available in Chat mode — here they collaborate in stages.</div>
          <div style={{fontSize:11,marginTop:8,color:C.tx3}}>7 agents • 6 workflows • parallel execution • automatic handoffs</div>
        </div>}

        {swarmLoading&&<div style={{textAlign:"center",padding:20}}>
          <div style={{fontSize:24,marginBottom:8,animation:"pulse 1.5s ease-in-out infinite"}}>🐝</div>
          <div style={{fontSize:13,color:C.gold,fontWeight:600}}>Swarm executing...</div>
          <div style={{fontSize:11,color:C.tx3,marginTop:4}}>Multiple agents working in parallel. This may take 2-5 minutes.</div>
        </div>}

        {swarmResult&&swarmResult.error&&<div style={{padding:10,background:C.r+"15",border:"1px solid "+C.r+"30",borderRadius:4,color:C.r,fontSize:12}}>{swarmResult.error}</div>}

        {swarmResult&&swarmResult.stages&&<div>
          {/* Summary */}
          <div style={{padding:10,background:C.gold+"08",border:"1px solid "+C.gold+"20",borderRadius:6,marginBottom:10}}>
            <div style={{fontSize:12,fontWeight:700,color:C.gold,marginBottom:4}}>🎯 {swarmResult.workflow} — Summary</div>
            <div style={{fontSize:12,color:C.tx,lineHeight:1.6,whiteSpace:"pre-wrap"}}>{swarmResult.summary}</div>
            <div style={{fontSize:10,color:C.tx3,marginTop:6}}>{swarmResult.totalAgents} agents • {swarmResult.totalStages} stages • {swarmResult.topology}</div>
          </div>

          {/* Generated files from swarm */}
          {swarmResult.files&&swarmResult.files.length>0&&<div style={{padding:8,background:C.bg2,borderRadius:4,marginBottom:10,border:"1px solid "+C.gold+"20"}}>
            <div style={{fontSize:10,fontWeight:700,color:C.gold,marginBottom:4}}>📁 Generated Files ({swarmResult.files.length})</div>
            {swarmResult.files.map(function(f,fi){return <div key={fi} onClick={function(){if(f.url){var dl=document.createElement("a");dl.href=f.url;dl.download=f.name||"file";document.body.appendChild(dl);dl.click();document.body.removeChild(dl);}}} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 6px",background:C.bg,border:"1px solid "+C.gold+"20",borderRadius:3,marginBottom:2,cursor:"pointer"}}>
              <span style={{fontSize:14}}>{f.type==="csv"?"\uD83D\uDCC8":f.type==="doc"?"\uD83D\uDCC4":f.type==="ppt"?"\uD83D\uDCCA":f.type==="tex"?"\uD83D\uDCDD":f.type==="pdf"?"\uD83D\uDCC4":"\uD83D\uDCCB"}</span>
              <span style={{fontSize:11,color:C.tx,flex:1}}>{f.name}</span>
              <span style={{color:C.gold,fontSize:11}}>⬇</span>
            </div>;})}
          </div>}

          {/* Stage results */}
          {swarmResult.stages.map(function(stage,si){return <div key={si} style={{marginBottom:8}}>
            <div style={{fontSize:11,fontWeight:700,color:C.gold,padding:"4px 8px",background:C.bg3,borderRadius:3,marginBottom:4}}>Stage {stage.stage}: {stage.name} [{stage.strategy}]</div>
            {stage.agents.map(function(a,ai){return <div key={ai} style={{marginBottom:4,padding:"6px 8px",background:C.bg2,borderRadius:4,borderLeft:"3px solid "+(a.color||C.bd)}}>
              <div style={{fontSize:11,fontWeight:600,color:a.color||C.tx}}>{a.icon} {a.name}</div>
              <div style={{fontSize:12,color:C.tx,lineHeight:1.5,marginTop:3,whiteSpace:"pre-wrap",maxHeight:200,overflowY:"auto"}}>{a.output}</div>
              {a.files&&a.files.length>0&&a.files.map(function(f,fi){return <div key={fi} onClick={function(){if(f.url){var dl=document.createElement("a");dl.href=f.url;dl.download=f.name;document.body.appendChild(dl);dl.click();document.body.removeChild(dl);}}} style={{display:"inline-flex",alignItems:"center",gap:4,padding:"3px 8px",background:C.bg,border:"1px solid "+C.gold+"25",borderRadius:3,marginTop:4,marginRight:4,cursor:"pointer",fontSize:10,color:C.gold}}>📄 {f.name} ⬇</div>;})}
            </div>;})}
          </div>;})}
        </div>}
      </div>
      </>}

      {/* ═══ TIMELINE MODE ═══ */}
      {mode==="timeline"&&<>
      <div style={{flex:1,overflowY:"auto",padding:10}}>
        <div style={{fontSize:13,fontWeight:700,color:C.gold,marginBottom:10}}>📊 Activity Timeline</div>
        <div style={{display:"flex",gap:4,marginBottom:10,flexWrap:"wrap"}}>
          {["all","R&D","Pilots","Fund","Safety","Fleet","Builds","Skills"].map(function(ws){
            return <span key={ws} style={{padding:"2px 8px",fontSize:10,borderRadius:3,cursor:"pointer",background:C.bg3,color:C.tx3,border:"1px solid "+C.bd}}>{ws}</span>;
          })}
        </div>
        {(D.log||[]).map(function(l,i){
          var isMut=l.t.indexOf("Created")>=0||l.t.indexOf("Edited")>=0||l.t.indexOf("Deleted")>=0||l.t.indexOf("advanced")>=0;
          var isInc=l.t.indexOf("INC")>=0;
          var isExp=l.t.indexOf("EXP")>=0;
          return <div key={i} style={{display:"flex",gap:8,padding:"6px 0",borderBottom:"1px solid "+C.bd+"30",fontSize:12}}>
            <div style={{width:4,borderRadius:2,background:isInc?C.r:isExp?C.c:isMut?C.gold:C.tx3,flexShrink:0}}/>
            <div style={{flex:1}}>
              <div style={{color:C.tx}}>{l.t}</div>
              <div style={{fontSize:10,color:C.tx3,marginTop:1}}>{l.at}{l.by&&<span style={{color:C.gold,marginLeft:6}}>by {l.by}</span>}</div>
            </div>
          </div>;
        })}
        {(D.log||[]).length===0&&<div style={{fontSize:12,color:C.tx3,textAlign:"center",padding:20}}>No activity yet</div>}
        {/* Data Replay */}
        <div style={{marginTop:16,background:C.bg,borderRadius:6,padding:10,border:"1px solid "+C.bd,marginBottom:12}}>
          <div style={{fontSize:11,color:C.gold,fontWeight:700,marginBottom:6}}>📼 Session Replay</div>
          <div style={{fontSize:10,color:C.tx3,marginBottom:6}}>Scrub through past activity to review what happened</div>
          <div style={{display:"flex",alignItems:"center",gap:6}}>
            <span style={{fontSize:10,color:C.tx3,fontFamily:"'JetBrains Mono',monospace"}}>00:00</span>
            <div style={{flex:1,height:6,background:C.bd,borderRadius:3,position:"relative",cursor:"pointer"}}>
              <div style={{width:"65%",height:"100%",background:C.gold,borderRadius:3}}/>
              <div style={{position:"absolute",top:-2,left:"65%",width:10,height:10,borderRadius:"50%",background:C.gold,border:"2px solid "+C.bg1,transform:"translateX(-50%)"}}/>
            </div>
            <span style={{fontSize:10,color:C.tx3,fontFamily:"'JetBrains Mono',monospace"}}>{nw()}</span>
          </div>
          <div style={{display:"flex",gap:4,marginTop:6}}>
            {["⏪","⏸","⏩","🔖 Bookmark","📤 Export"].map(function(btn,i){
              return <span key={i} style={{padding:"2px 8px",fontSize:10,borderRadius:3,cursor:"pointer",background:C.bg3,color:C.tx3,border:"1px solid "+C.bd}}>{btn}</span>;
            })}
          </div>
        </div>

        <div style={{marginTop:16}}>
          <div style={{fontSize:11,color:C.gold,fontWeight:700,marginBottom:6}}>DEPENDENCIES & BLOCKERS</div>
          {(D.deps||[]).map(function(dep,i){
            return <div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 0",fontSize:11,borderBottom:"1px solid "+C.bd+"20"}}>
              <span style={{color:C.r,fontFamily:"'JetBrains Mono',monospace",minWidth:60}}>{dep.fromLabel.split(" ")[0]}</span>
              <span style={{color:C.tx3}}>→</span>
              <span style={{color:C.a}}>{dep.blocks.join(", ")}</span>
              <span style={{flex:1,color:C.tx3,fontSize:10}}>{dep.reason.slice(0,40)}</span>
            </div>;
          })}
        </div>
        <div style={{marginTop:16}}>
          <div style={{fontSize:11,color:C.gold,fontWeight:700,marginBottom:6}}>MILESTONES</div>
          {(D.milestones||[]).map(function(m,i){
            return <div key={i} style={{padding:"6px 0",borderBottom:"1px solid "+C.bd+"20"}}>
              <div style={{display:"flex",alignItems:"center",gap:6,fontSize:12}}>
                <span style={{flex:1,color:C.tx}}>{m.title}</span>
                <Tag color={m.risk==="critical"?C.r:m.risk==="high"?C.a:C.g}>{m.risk}</Tag>
                <span style={{fontFamily:"'JetBrains Mono',monospace",color:m.pct>=80?C.g:m.pct>=40?C.gold:C.tx3}}>{m.pct}%</span>
              </div>
              <div style={{marginTop:3,height:4,background:C.bd,borderRadius:2,overflow:"hidden"}}>
                <div style={{width:m.pct+"%",height:"100%",background:m.pct>=80?C.g:m.pct>=40?C.gold:C.a,borderRadius:2}}/>
              </div>
              {m.blockers&&m.blockers.length>0&&<div style={{fontSize:10,color:C.r,marginTop:2}}>{m.blockers.join(" | ")}</div>}
            </div>;
          })}
        </div>
      </div>
      </>}

      {/* ═══ MISSION CONTROL MODE ═══ */}
      {mode==="mission"&&<>
      <div style={{flex:1,overflowY:"auto",padding:10}}>

        {/* System State Banner */}
        {(function(){
          var openInc=D.incidents.filter(function(i){return i.status!=="resolved";});
          var sysState=openInc.some(function(i){return i.sev==="high"||i.sev==="critical";})?"FAULT":openInc.length>0?"CAUTION":"NOMINAL";
          var sysColor=sysState==="FAULT"?C.r:sysState==="CAUTION"?C.a:C.g;
          return <div style={{background:sysColor+"12",border:"2px solid "+sysColor+"40",borderRadius:8,padding:"12px 16px",marginBottom:12,textAlign:"center"}}>
            <div style={{fontSize:10,color:C.tx3,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:4}}>System State</div>
            <div style={{fontSize:28,fontWeight:700,color:sysColor,fontFamily:"'JetBrains Mono',monospace",letterSpacing:"0.15em"}}>{sysState}</div>
            <div style={{fontSize:11,color:C.tx2,marginTop:4}}>{openInc.length>0?openInc.length+" open incident"+(openInc.length>1?"s":""):"All systems operational"}</div>
          </div>;
        })()}

        {/* Control State: Impedance + Force + Fusion */}
        <Sec>⚡ Control State (M0-M9)</Sec>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4,marginBottom:12}}>
          {[
            ["F* tendon","12.4 N","Force target",C.g],
            ["p* muscle","28 PSI","Pressure target",C.b],
            ["K* stiff","45 N/m","Impedance gain",C.gold],
            ["D* damp","0.8","Damping coeff",C.a],
            ["θ̂ pose","[42°,15°,8°]","Joint estimate",C.c],
            ["g_cam","0.85","Grasp confidence",C.g],
            ["τ fusion","8.2 ms","Fusion latency",C.a],
            ["F slip","0.3 N","Slip threshold",C.r],
            ["M active","M0-M4","Controller tier",C.gold],
          ].map(function(x,i){
            return <div key={i} style={{background:C.bg,borderRadius:4,padding:"5px 6px",borderLeft:"2px solid "+x[3]}}>
              <div style={{fontSize:9,color:C.tx3,fontFamily:"'JetBrains Mono',monospace"}}>{x[0]}</div>
              <div style={{fontSize:13,fontWeight:700,color:x[3],fontFamily:"'JetBrains Mono',monospace"}}>{x[1]}</div>
              <div style={{fontSize:8,color:C.tx3}}>{x[2]}</div>
            </div>;
          })}
        </div>

        {/* Data Source Indicators */}
        <div style={{display:"flex",gap:8,marginBottom:12,fontSize:10}}>
          <span style={{padding:"2px 8px",borderRadius:3,background:C.a+"15",color:C.a,border:"1px solid "+C.a+"30"}}>⚠ SIMULATED — No live ROS connection</span>
          <span style={{padding:"2px 8px",borderRadius:3,background:C.tx3+"15",color:C.tx3,border:"1px solid "+C.tx3+"30"}}>Last sync: {nw()}</span>
        </div>

        {/* Control Authority + Operator */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:12}}>
          <div style={{background:C.bg,borderRadius:6,padding:8,borderLeft:"3px solid "+C.gold}}>
            <div style={{fontSize:9,color:C.tx3,textTransform:"uppercase",letterSpacing:"0.06em"}}>Operator in Control</div>
            <div style={{fontSize:14,fontWeight:700,color:C.gold,marginTop:2}}>{userName||"Not logged in"}</div>
            <div style={{fontSize:10,color:C.tx3,marginTop:1}}>{userRole} — {authed?"authenticated":"read-only"}</div>
          </div>
          <div style={{background:C.bg,borderRadius:6,padding:8,borderLeft:"3px solid "+C.b}}>
            <div style={{fontSize:9,color:C.tx3,textTransform:"uppercase",letterSpacing:"0.06em"}}>Control Authority</div>
            <div style={{fontSize:14,fontWeight:700,color:C.b,marginTop:2}}>MANUAL / DASHBOARD</div>
            <div style={{fontSize:10,color:C.tx3,marginTop:1}}>Source: DOGMA OS</div>
          </div>
        </div>

        {/* Fleet Status Grid */}
        <Sec>🤖 Fleet Status</Sec>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:12}}>
          {D.fleet.map(function(f,i){
            var healthColor=f.health>80?C.g:f.health>50?C.a:C.r;
            var statusIcon=f.status==="active"?"🟢":f.status==="maintenance"?"🟡":f.status==="build"?"🔵":"⚪";
            return <div key={i} style={{background:C.bg,borderRadius:6,padding:8,border:"1px solid "+C.bd}}>
              <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:4}}>
                <span style={{fontSize:12}}>{statusIcon}</span>
                <span style={{fontSize:13,fontWeight:700,color:C.gold}}>{f.unit}</span>
                <div style={{flex:1}}/>
                <Tag color={dc(f.status)}>{f.status}</Tag>
              </div>
              <div style={{display:"flex",gap:8,fontSize:10}}>
                <div style={{flex:1}}>
                  <div style={{color:C.tx3}}>Health</div>
                  <div style={{height:4,background:C.bd,borderRadius:2,marginTop:2,overflow:"hidden"}}><div style={{width:(f.health||0)+"%",height:"100%",background:healthColor,borderRadius:2}}/></div>
                  <div style={{color:healthColor,fontFamily:"'JetBrains Mono',monospace",marginTop:1}}>{f.health||0}%</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{color:C.tx3}}>Hours</div>
                  <div style={{color:C.tx,fontFamily:"'JetBrains Mono',monospace",fontWeight:600}}>{f.hours}h</div>
                </div>
              </div>
              <div style={{fontSize:9,color:C.tx3,marginTop:3}}>{f.loc}</div>
            </div>;
          })}
        </div>

        {/* Active Skills */}
        <Sec>🎯 Skill Readiness</Sec>
        <div style={{marginBottom:12}}>
          {D.skills.map(function(sk,i){
            var ready=sk.success>=80;
            return <div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 0",borderBottom:"1px solid "+C.bd+"20"}}>
              <span style={{fontSize:11}}>{ready?"✅":"⚠️"}</span>
              <span style={{flex:1,fontSize:12,color:C.tx}}>{sk.name}</span>
              <div style={{width:60,height:4,background:C.bd,borderRadius:2,overflow:"hidden"}}><div style={{width:sk.success+"%",height:"100%",background:sk.success>=80?C.g:sk.success>=60?C.a:C.r,borderRadius:2}}/></div>
              <span style={{fontSize:11,fontFamily:"'JetBrains Mono',monospace",color:sk.success>=80?C.g:sk.success>=60?C.a:C.r,minWidth:30,textAlign:"right"}}>{sk.success}%</span>
              <span style={{fontSize:10,color:C.tx3}}>{sk.tests} tests</span>
            </div>;
          })}
        </div>

        {/* Safety Envelope */}
        <Sec>🛡️ Safety Envelope</Sec>
        <div style={{background:C.bg,borderRadius:6,padding:10,marginBottom:12,border:"1px solid "+C.bd}}>
          {D.safety.map(function(sf,i){
            var status=sf.cov>=80?"PASS":sf.cov>=60?"PARTIAL":"FAIL";
            var c2=sf.cov>=80?C.g:sf.cov>=60?C.a:C.r;
            return <div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 0",borderBottom:i<D.safety.length-1?"1px solid "+C.bd+"20":"none",fontSize:11}}>
              <span style={{color:c2,fontWeight:700,fontFamily:"'JetBrains Mono',monospace",minWidth:40}}>{status}</span>
              <span style={{flex:1,color:C.tx}}>{sf.name}</span>
              <div style={{width:60,height:4,background:C.bd,borderRadius:2,overflow:"hidden"}}><div style={{width:sf.cov+"%",height:"100%",background:c2,borderRadius:2}}/></div>
              <span style={{fontFamily:"'JetBrains Mono',monospace",color:c2,minWidth:30,textAlign:"right"}}>{sf.cov}%</span>
            </div>;
          })}
          {D.safety.some(function(sf){return sf.gaps&&sf.gaps.length>0;})&&<div style={{marginTop:6,fontSize:10,color:C.r}}>
            ⚠ Open gaps: {D.safety.reduce(function(a,s){return a+(s.gaps?s.gaps.length:0);},0)} across {D.safety.filter(function(s){return s.gaps&&s.gaps.length>0;}).length} standards
          </div>}
        </div>

        {/* Last Safety Event */}
        <Sec>🚨 Last Safety Events</Sec>
        {D.incidents.slice(0,3).map(function(inc,i){
          return <div key={i} style={{display:"flex",gap:6,padding:"5px 0",borderBottom:"1px solid "+C.bd+"20",fontSize:11}}>
            <Tag color={dc(inc.sev)}>{inc.sev}</Tag>
            <Tag color={dc(inc.status)}>{inc.status}</Tag>
            <span style={{flex:1,color:C.tx}}>{inc.desc.slice(0,45)}</span>
            <span style={{color:C.tx3}}>{inc.reported}</span>
          </div>;
        })}

        {/* Critical Tasks */}
        <Sec>📋 Critical Tasks</Sec>
        {D.tasks.filter(function(t){return t.pri==="critical"&&t.status!=="done";}).map(function(t,i){
          return <div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 0",borderBottom:"1px solid "+C.bd+"20",fontSize:12}}>
            <Dot s={t.status}/>
            <span style={{flex:1,color:C.tx}}>{t.title}</span>
            <Tag color={dc(t.status)}>{t.status}</Tag>
            <span style={{fontSize:10,color:C.tx3}}>{t.due}</span>
          </div>;
        })}
        {D.tasks.filter(function(t){return t.pri==="critical"&&t.status!=="done";}).length===0&&
          <div style={{fontSize:11,color:C.g,padding:4}}>✅ No critical tasks pending</div>}

        {/* Preflight Checklist */}
        <Sec>✈️ Preflight Checklist</Sec>
        <div style={{background:C.bg,borderRadius:6,padding:10,marginBottom:12,border:"1px solid "+C.bd}}>
          {(function(){
            var checks=[
              {label:"All fleet units health >50%",pass:D.fleet.every(function(f){return f.status==="build"||f.health>=50;})},
              {label:"No critical incidents open",pass:!D.incidents.some(function(i){return i.status!=="resolved"&&(i.sev==="critical"||i.sev==="high");})},
              {label:"Operator authenticated",pass:authed},
              {label:"Required skills >60% success",pass:D.skills.filter(function(s){return s.success>=60;}).length>=3},
              {label:"Safety coverage >60% avg",pass:Math.round(D.safety.reduce(function(a,s){return a+s.cov;},0)/D.safety.length)>=60},
              {label:"Runway >2 months",pass:D.fin.runway>=2},
              {label:"No blocked critical tasks",pass:!D.tasks.some(function(t){return t.pri==="critical"&&t.status==="blocked";})},
            ];
            var passCount=checks.filter(function(c){return c.pass;}).length;
            var allPass=passCount===checks.length;
            return <div>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:8}}>
                <span style={{fontSize:16}}>{allPass?"✅":"⚠️"}</span>
                <span style={{fontSize:13,fontWeight:700,color:allPass?C.g:C.a}}>{passCount}/{checks.length} checks passed</span>
                {allPass&&<Tag color={C.g}>READY</Tag>}
                {!allPass&&<Tag color={C.a}>NOT READY</Tag>}
              </div>
              {checks.map(function(ch,i){return <div key={i} style={{display:"flex",alignItems:"center",gap:6,padding:"3px 0",fontSize:11}}>
                <span style={{color:ch.pass?C.g:C.r}}>{ch.pass?"✓":"✗"}</span>
                <span style={{color:ch.pass?C.tx2:C.r}}>{ch.label}</span>
              </div>;})}
            </div>;
          })()}
        </div>

        {/* Emergency Actions */}
        <Sec>🔴 Emergency Actions</Sec>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
          <button onClick={function(){addLog("EMERGENCY STOP triggered by "+(userName||"operator"));}} style={{padding:"12px",fontSize:13,fontWeight:700,background:C.r+"15",color:C.r,border:"2px solid "+C.r,borderRadius:6,cursor:"pointer",textTransform:"uppercase",letterSpacing:"0.06em"}}>⛔ E-STOP</button>
          <button onClick={function(){addLog("Return to safe state initiated by "+(userName||"operator"));}} style={{padding:"12px",fontSize:13,fontWeight:700,background:C.a+"15",color:C.a,border:"2px solid "+C.a,borderRadius:6,cursor:"pointer",textTransform:"uppercase",letterSpacing:"0.06em"}}>🔙 SAFE STATE</button>
        </div>

        {/* Subsystem Readiness Quick View */}
        <Sec>⚡ Subsystem Readiness</Sec>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
          {D.ss.map(function(s,i){
            var stage=s.mat>=80?"DEPLOY":s.mat>=65?"ROBUST":s.mat>=50?"TESTED":s.mat>=30?"PROTO":"CONCEPT";
            var sc=s.mat>=80?C.g:s.mat>=65?"#3B9":s.mat>=50?C.a:s.mat>=30?C.gold:C.r;
            return <div key={i} style={{display:"flex",alignItems:"center",gap:4,padding:"3px 6px",background:C.bg,borderRadius:3,border:"1px solid "+C.bd}}>
              <div style={{width:4,height:16,borderRadius:2,background:sc}}/>
              <span style={{flex:1,fontSize:10,color:C.tx}}>{s.name}</span>
              <span style={{fontSize:10,fontWeight:700,color:sc,fontFamily:"'JetBrains Mono',monospace"}}>{s.mat}%</span>
            </div>;
          })}
        </div>

      </div>
      </>}

      {/* ═══ WORKSPACE MAP MODE ═══ */}
      {mode==="map"&&<>
      <div style={{flex:1,overflowY:"auto",padding:10}}>
        <div style={{fontSize:13,fontWeight:700,color:C.gold,marginBottom:8}}>🗺️ DOGMA Workspace Map</div>
        <div style={{fontSize:11,color:C.tx3,marginBottom:12}}>All entities and their connections. Click any entity to navigate.</div>

        {/* Entity counts */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4,marginBottom:12}}>
          {[["🔬",D.ss.length,"Subsystems"],["🎯",D.skills.length,"Skills"],["🧪",D.exps.length,"Experiments"],["📋",D.tasks.length,"Tasks"],["🏭",D.pilots.length,"Pilots"],["💰",D.investors.length,"Investors"],["⚠️",D.incidents.length,"Incidents"],["🤖",D.fleet.length,"Fleet"],["🏁",D.milestones.length,"Milestones"]].map(function(x,i){
            return <div key={i} style={{background:C.bg,padding:"4px 6px",borderRadius:3,display:"flex",alignItems:"center",gap:4,fontSize:10}}>
              <span>{x[0]}</span>
              <span style={{fontWeight:700,color:C.gold,fontFamily:"'JetBrains Mono',monospace"}}>{x[1]}</span>
              <span style={{color:C.tx3}}>{x[2]}</span>
            </div>;
          })}
        </div>

        {/* Connection map */}
        <Sec>🔗 Entity Connections</Sec>
        {(function(){
          var connections=[];
          // Subsystem → Experiments
          D.ss.forEach(function(s){
            var exps=D.exps.filter(function(e){return(e.title||"").toLowerCase().indexOf(s.name.toLowerCase().split(" ")[0].toLowerCase())>=0||(e.p||[]).some(function(p){return p.toLowerCase().indexOf(s.name.toLowerCase().split(" ")[0].toLowerCase())>=0;});});
            if(exps.length>0)connections.push({from:"🔬 "+s.name,to:exps.map(function(e){return"🧪 "+e.id;}).join(", "),type:"tested by",color:C.c});
          });
          // Skills → Pilots (required)
          D.pilots.forEach(function(p){
            if(p.skills&&p.skills.length>0)connections.push({from:"🏭 "+p.name.split(" ")[0],to:p.skills.map(function(s){return"🎯 "+s;}).join(", "),type:"requires",color:C.b});
          });
          // Incidents → Subsystems
          Object.keys(D.incLinks||{}).forEach(function(iid){
            var lk=D.incLinks[iid];
            var ssNames=(lk.ss||[]).map(function(sid){var s=D.ss.find(function(x){return x.id===sid;});return s?"🔬 "+s.name:"";}).filter(Boolean);
            if(ssNames.length>0)connections.push({from:"⚠️ "+iid,to:ssNames.join(", "),type:"affects",color:C.r});
          });
          // Milestones → Tasks
          D.milestones.forEach(function(m){
            if(m.deps&&m.deps.length>0){
              var depNames=m.deps.map(function(did){
                var t=D.tasks.find(function(x){return x.id===did;});if(t)return"📋 "+t.title.slice(0,20);
                var s=D.ss.find(function(x){return x.id===did;});if(s)return"🔬 "+s.name;
                var ms=D.milestones.find(function(x){return x.id===did;});if(ms)return"🏁 "+ms.title.slice(0,20);
                return did;
              });
              connections.push({from:"🏁 "+m.title.slice(0,25),to:depNames.join(", "),type:"depends on",color:C.gold});
            }
          });
          // Safety → Pilots
          D.safety.forEach(function(sf){
            var blocked=D.pilots.filter(function(p){return(p.comp||[]).some(function(c){return c.indexOf(sf.name)>=0;});});
            if(blocked.length>0&&sf.cov<70)connections.push({from:"🛡️ "+sf.name+" ("+sf.cov+"%)",to:blocked.map(function(p){return"🏭 "+p.name.split(" ")[0];}).join(", "),type:"gates",color:C.a});
          });
          return connections.map(function(cn,i){return <div key={i} style={{display:"flex",alignItems:"center",gap:4,padding:"4px 0",fontSize:10,borderBottom:"1px solid "+C.bd+"15"}}>
            <span style={{color:cn.color,fontWeight:600,minWidth:100}}>{cn.from}</span>
            <span style={{color:C.tx3,fontSize:8}}>{cn.type} →</span>
            <span style={{color:C.tx2,flex:1}}>{cn.to}</span>
          </div>;});
        })()}

        {/* Investor → Milestone links */}
        <Sec>💰 Investor ↔ Milestone Links</Sec>
        {D.investors.map(function(v,i){
          var relatedMs=D.milestones.filter(function(m){return m.deps&&m.deps.some(function(d){return d.indexOf("inv")>=0||d.indexOf("t2")>=0;});});
          return <div key={i} style={{fontSize:10,padding:"2px 0",color:C.tx2}}>
            <span style={{color:C.gold}}>{v.name}</span>
            <span style={{color:C.tx3}}> — {v.stage} ({v.prob}%) — needs: </span>
            <span style={{color:C.a}}>{v.objections&&v.objections.length>0?v.objections[0].slice(0,40):"No objections"}</span>
          </div>;
        })}
      </div>
      </>}

      
      {/* ═══ APPROVALS MODE ═══ */}
      {mode==="design"&&<div style={{flex:1,overflowY:"auto",padding:12}}>
        <div style={{fontSize:15,fontWeight:700,color:C.gold,marginBottom:4}}>Design Guide</div>
        <div style={{fontSize:11,color:C.tx2,marginBottom:12}}>These guidelines are injected into agents when they generate documents, reports, and presentations.</div>
        <div style={{fontSize:10,color:C.gold,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:700,marginBottom:6}}>Brand Guidelines</div>
        <textarea value={designGuide} onChange={function(e){setDesignGuide(e.target.value);}} style={{width:"100%",minHeight:180,padding:"10px 12px",fontSize:12,lineHeight:1.6,background:C.bg,border:"1px solid "+C.bd,borderRadius:4,color:C.tx,outline:"none",resize:"vertical",fontFamily:"'JetBrains Mono',monospace"}}/>
        <div style={{fontSize:10,color:C.gold,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:700,marginTop:16,marginBottom:6}}>Reference Images</div>
        <div style={{fontSize:11,color:C.tx2,marginBottom:8}}>Upload logos, color palettes, mockups, or style references.</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8}}>
          {designImages.map(function(img,i){return <div key={i} style={{position:"relative",width:100,height:100,borderRadius:4,overflow:"hidden",border:"1px solid "+C.bd}}>
            <img src={img.data} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
            <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"2px 4px",background:"rgba(0,0,0,0.7)",fontSize:9,color:"#fff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{img.name}</div>
            <div onClick={function(){setDesignImages(function(prev){return prev.filter(function(_,j){return j!==i;});});}} style={{position:"absolute",top:2,right:4,cursor:"pointer",color:"#fff",fontSize:12,textShadow:"0 1px 3px rgba(0,0,0,0.8)"}}>x</div>
          </div>;})}
        </div>
        <div style={{position:"relative"}}>
          <input type="file" accept="image/*" multiple onChange={function(e){var files=e.target.files;if(files){for(var i=0;i<files.length;i++){(function(file){var reader=new FileReader();reader.onload=function(ev){setDesignImages(function(prev){return prev.concat([{name:file.name,data:ev.target.result}]);});};reader.readAsDataURL(file);})(files[i]);}e.target.value="";}}} style={{position:"absolute",inset:0,opacity:0,cursor:"pointer"}}/>
          <div style={{padding:"12px",border:"1px dashed "+C.bd,borderRadius:4,textAlign:"center",cursor:"pointer",fontSize:12,color:C.tx3}}>+ Upload reference images</div>
        </div>
        <div onClick={function(){setDesignGuide("DOGMA Brand: Navy #0A0A18 bg, Gold #C8A74B accents, Inter body, JetBrains Mono code. Reports: dark luxury, gold headers, metric grids, badges (pass=green fail=red warn=amber). Always include DOGMA header + confidential footer.");}} style={{marginTop:12,fontSize:10,color:C.tx3,cursor:"pointer",textDecoration:"underline"}}>Reset to defaults</div>
      </div>}

      {mode==="openclaw"&&<div style={{flex:1,overflowY:"auto",padding:12}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
          <div style={{width:10,height:10,borderRadius:"50%",background:oc.gateway.connected?C.g:C.r,boxShadow:oc.gateway.connected?"0 0 8px rgba(45,122,93,0.5)":"none"}}/>
          <div style={{fontSize:15,fontWeight:700,color:C.gold}}>OpenClaw Gateway</div>
          <div style={{fontSize:10,color:C.tx2,fontFamily:"'JetBrains Mono',monospace"}}>{oc.gateway.connected?"Connected":"Offline"}</div>
        </div>
        <div style={{fontSize:12,color:C.tx2,lineHeight:1.7,marginBottom:12}}>OpenClaw is an open-source AI agent runtime (100K+ GitHub stars, MIT licensed) that runs on your machine and gives your AI agents real-world capabilities. When connected, every message you send in Chat is routed through the local gateway, giving agents full access to your computer.</div>
        <div style={{padding:"10px 12px",background:C.bg2,borderRadius:4,border:"1px solid "+C.bd,marginBottom:16}}>
          <div style={{fontSize:11,color:C.tx,lineHeight:1.7}}>
            <div style={{fontWeight:600,color:C.gold,marginBottom:4}}>How it works</div>
            When you send a message, DOGMA OS tries to route it through OpenClaw first. If the gateway is running locally, the agent gets full computer access and can execute actions on your machine. If the gateway is offline, the message falls back to the Claude API in the cloud (text-only, no execution). The green/red badge next to the agent name shows which path was used.
          </div>
        </div>
        <div style={{fontSize:10,color:C.gold,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:700,marginBottom:8}}>Computer access</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:16}}>
          <div style={{padding:"10px 12px",background:C.bg2,borderRadius:4,border:"1px solid "+C.bd}}><div style={{fontSize:13,fontWeight:600,color:C.tx}}>Terminal</div><div style={{fontSize:11,color:C.tx2,marginTop:3}}>bash, npm, python, git, docker, psql</div></div>
          <div style={{padding:"10px 12px",background:C.bg2,borderRadius:4,border:"1px solid "+C.bd}}><div style={{fontSize:13,fontWeight:600,color:C.tx}}>Browser</div><div style={{fontSize:11,color:C.tx2,marginTop:3}}>Navigate, scrape, test UIs, read docs</div></div>
          <div style={{padding:"10px 12px",background:C.bg2,borderRadius:4,border:"1px solid "+C.bd}}><div style={{fontSize:13,fontWeight:600,color:C.tx}}>Files</div><div style={{fontSize:11,color:C.tx2,marginTop:3}}>Read, create, edit code and documents</div></div>
          <div style={{padding:"10px 12px",background:C.bg2,borderRadius:4,border:"1px solid "+C.bd}}><div style={{fontSize:13,fontWeight:600,color:C.tx}}>Web Search</div><div style={{fontSize:11,color:C.tx2,marginTop:3}}>Research, papers, competitor analysis</div></div>
        </div>
        <div style={{fontSize:10,color:C.gold,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:700,marginBottom:8}}>Features</div>
        <div style={{display:"flex",flexDirection:"column",gap:4,marginBottom:16}}>
          {[["SOUL.md Identity","Define who your agent is in a plain Markdown file. Version-control personality, tone, domain knowledge, and mission. Each agent can have a unique identity."],["SKILL.md Modules","Install modular skills from ClawHub (5,400+ community skills) or write your own. Skills are YAML+Markdown files that teach agents new capabilities like API integrations, data analysis, or domain expertise."],["Persistent Memory","MEMORY.md stores long-term context between sessions. Your agent remembers your project, past decisions, preferences, and ongoing work. Embedding-based semantic search for recall."],["Session History","Every conversation saved as JSONL transcripts on disk. Resume any conversation where you left off. Session compaction summarizes old turns when context window fills."],["Multi-Channel","Talk to the same agent from 20+ platforms: WhatsApp, Telegram, Slack, Discord, iMessage, Signal, Google Chat, Microsoft Teams, IRC, Matrix, and more. Group routing and mention gating."],["Tool Approval","Three-tier security model: ask (requires approval), record (logs actions), ignore (unrestricted). Glob patterns for tool allowlists/denylists per agent. VirusTotal scanning for skills."],["Canvas (A2UI)","Agents can push live interactive HTML interfaces to a visual canvas via WebSocket. Build dashboards, previews, forms, and tools that agents control in real-time."],["Heartbeat Daemon","Background process (systemd/launchd) with configurable heartbeat interval. Agents can run proactive tasks on a schedule without being prompted: monitoring, reports, alerts."],["Browser Control","Dedicated OpenClaw-managed Chrome/Chromium with CDP control. Agents can navigate, click, fill forms, take screenshots, upload files, and manage browser profiles."],["Voice Mode","Wake words on macOS/iOS, continuous voice on Android. ElevenLabs TTS + system fallback. Push-to-talk overlay for hands-free interaction."],["Security Model","Gateway binds to loopback by default. Token/password auth for all connections. Device pairing with cryptographic signatures. Docker sandboxing for non-main sessions."],["Model Agnostic","Works with Claude, GPT, Gemini, Llama, Mistral, and local models via Ollama/vLLM. Automatic failover chain with exponential backoff between providers."]].map(function(item){return <div key={item[0]} style={{padding:"8px 12px",background:C.bg2,borderRadius:4,border:"1px solid "+C.bd}}><div style={{fontSize:12,fontWeight:600,color:C.tx}}>{item[0]}</div><div style={{fontSize:11,color:C.tx2}}>{item[1]}</div></div>;})}
        </div>
        <div style={{fontSize:10,color:C.gold,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:700,marginBottom:8}}>Getting started</div>
        <div style={{display:"flex",flexDirection:"column",gap:4,marginBottom:16}}>
          <div style={{padding:"8px 12px",background:C.bg2,borderRadius:4,border:"1px solid "+C.bd,fontSize:11,color:C.tx2,lineHeight:1.6,fontFamily:"'JetBrains Mono',monospace"}}>
            <span style={{color:C.tx}}>1.</span> sudo npm i -g openclaw@latest<br/>
            <span style={{color:C.tx}}>2.</span> openclaw onboard<br/>
            <span style={{color:C.tx}}>3.</span> openclaw gateway run<br/>
            <span style={{color:C.tx}}>4.</span> Open this dashboard - badge turns green
          </div>
        </div>
        <div style={{fontSize:10,color:C.gold,textTransform:"uppercase",letterSpacing:"0.1em",fontWeight:700,marginBottom:8}}>Try it</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
          {["Run my test suite","Audit npm dependencies","Review the auth code","Write a status report","Research actuator suppliers","Plan next sprint"].map(function(action){return <div key={action} onClick={function(){setMode("chat");setInp(action);}} style={{padding:"6px 10px",fontSize:11,borderRadius:3,cursor:"pointer",background:C.bg2,color:C.tx,border:"1px solid "+C.bd}}>{action}</div>;})}
        </div>
      </div>}

            {mode==="approvals"&&<>
      <div style={{flex:1,overflowY:"auto",padding:10}}>
        <div style={{fontSize:13,fontWeight:700,color:C.gold,marginBottom:6}}>⚠️ Approval Queue</div>
        <div style={{fontSize:11,color:C.tx2,marginBottom:12}}>Agent-proposed mutations waiting for your approval.</div>
        {pendingMuts.length===0&&<div style={{textAlign:"center",padding:30,color:C.tx3}}>
          <div style={{fontSize:32,marginBottom:8}}>✅</div>
          <div style={{fontSize:14}}>No pending approvals</div>
          <div style={{fontSize:11,marginTop:4}}>When agents propose mutations in Advisory mode, they appear here.</div>
        </div>}
        {pendingMuts.map(function(m,i){
          return <div key={i} style={{background:C.bg,border:"1px solid "+C.bd,borderRadius:6,padding:12,marginBottom:8,borderLeft:"3px solid "+C.gold}}>
            <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
              <span style={{fontSize:11,fontWeight:700,color:C.gold,textTransform:"uppercase",fontFamily:"'JetBrains Mono',monospace"}}>{m.type}</span>
              <span style={{fontSize:10,color:C.tx3}}>by {m.agent||"agent"}</span>
              <div style={{flex:1}}/>
              <span style={{fontSize:9,color:C.tx3}}>{m.at}</span>
            </div>
            <div style={{fontSize:12,color:C.tx,marginBottom:4}}>
              <span style={{color:C.tx2}}>Entity:</span> {m.entity_type||m.type}/{(m.entity_id||"").slice(0,12)}
              {m.field&&<span> → <span style={{color:C.gold}}>{m.field}</span> = {String(m.value).slice(0,30)}</span>}
            </div>
            <div style={{display:"flex",gap:6,marginTop:8}}>
              <button onClick={function(){
                fetch("/api/commands",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:m.type,input:m})}).then(function(){
                  setPendingMuts(function(p){return p.filter(function(_,j){return j!==i;});});
                  addLog("Approved: "+m.type);
                });
              }} style={{flex:1,padding:"6px 12px",fontSize:11,fontWeight:700,background:"rgba(45,122,93,0.1)",color:C.g,border:"1px solid rgba(45,122,93,0.3)",borderRadius:4,cursor:"pointer"}}>✓ Approve</button>
              <button onClick={function(){setPendingMuts(function(p){return p.filter(function(_,j){return j!==i;});});addLog("Rejected: "+m.type);}} style={{flex:1,padding:"6px 12px",fontSize:11,fontWeight:700,background:"rgba(138,51,51,0.1)",color:C.r,border:"1px solid rgba(138,51,51,0.3)",borderRadius:4,cursor:"pointer"}}>✕ Reject</button>
            </div>
          </div>;
        })}
        {pendingMuts.length>0&&<div style={{display:"flex",gap:6,marginTop:8}}>
          <button onClick={function(){
            pendingMuts.forEach(function(m){
              fetch("/api/commands",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({command:m.type,input:m})}).catch(function(){});
            });
            setPendingMuts([]);addLog("Approved all mutations");
          }} style={{flex:1,padding:"8px",fontSize:11,fontWeight:700,background:C.g+"15",color:C.g,border:"1px solid "+C.g+"30",borderRadius:4,cursor:"pointer"}}>✓ Approve All ({pendingMuts.length})</button>
          <button onClick={function(){setPendingMuts([]);addLog("Rejected all mutations");}} style={{flex:1,padding:"8px",fontSize:11,fontWeight:700,background:C.r+"15",color:C.r,border:"1px solid "+C.r+"30",borderRadius:4,cursor:"pointer"}}>✕ Reject All</button>
        </div>}
      </div>
      </>}

    </div>{/* close inner flex */}
    </div>{/* close chat panel */}
  </div>{/* close main area */}
  {/* Login Modal */}
  {showLogin&&<div onMouseDown={function(e){if(e.target===e.currentTarget){setShowLogin(false);setPwErr(false);setPw("");}}} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:100,display:"flex",alignItems:"center",justifyContent:"center"}}>
    <div onMouseDown={function(e){e.stopPropagation();}} style={{background:C.bg1,border:"1px solid "+C.gold+"40",borderRadius:8,padding:24,width:380}}>
      <div style={{fontSize:18,fontWeight:700,color:C.gold,marginBottom:6}}>Login to DOGMA OS</div>
      <div style={{fontSize:12,color:C.tx2,marginBottom:16}}>Enter your name, role, and password to enable editing.</div>
      <div style={{marginBottom:10}}>
        <div style={{fontSize:10,color:C.tx3,marginBottom:2,textTransform:"uppercase"}}>Your Name</div>
        <input value={loginName} onChange={function(e){setLoginName(e.target.value);}} placeholder="e.g. Jero" autoFocus style={{width:"100%",padding:"8px 12px",fontSize:14,background:C.bg,border:"1px solid "+C.bd,borderRadius:4,color:C.tx,outline:"none"}}/>
      </div>
      <div style={{marginBottom:10}}>
        <div style={{fontSize:10,color:C.tx3,marginBottom:2,textTransform:"uppercase"}}>Role</div>
        <div style={{display:"flex",gap:4}}>
          {["admin","engineer","ops","finance","advisor"].map(function(r){return <span key={r} onClick={function(){setLoginRole(r);}} style={{padding:"4px 10px",fontSize:11,borderRadius:4,cursor:"pointer",fontWeight:600,textTransform:"uppercase",background:loginRole===r?C.gold+"15":"transparent",color:loginRole===r?C.gold:C.tx3,border:"1px solid "+(loginRole===r?C.gold+"40":C.bd)}}>{r}</span>;})}
        </div>
      </div>
      <div style={{marginBottom:10}}>
        <div style={{fontSize:10,color:C.tx3,marginBottom:2,textTransform:"uppercase"}}>Password</div>
        <input value={pw} onChange={function(e){setPw(e.target.value);setPwErr(false);}} onKeyDown={function(e){if(e.key==="Enter")tryLogin();}} type="password" placeholder="Password" style={{width:"100%",padding:"8px 12px",fontSize:14,background:C.bg,border:"1px solid "+(pwErr?C.r:C.bd),borderRadius:4,color:C.tx,outline:"none"}}/>
      </div>
      {pwErr&&<div style={{fontSize:12,color:C.r,marginBottom:6}}>Name required + correct password.</div>}
      <div style={{display:"flex",gap:8,marginTop:12}}>
        <button onClick={tryLogin} style={{flex:1,padding:"8px",fontSize:13,fontWeight:700,background:C.gold+"10",color:C.gold,border:"1px solid "+C.gold+"30",borderRadius:4,cursor:"pointer"}}>Login</button>
        <button onClick={function(){setShowLogin(false);setPw("");setPwErr(false);}} style={{padding:"8px 16px",fontSize:13,background:C.bg3,color:C.tx2,border:"1px solid "+C.bd,borderRadius:4,cursor:"pointer"}}>Cancel</button>
      </div>
    </div>
  </div>}
  <style>{"@import url('https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:"+C.bg+"}::-webkit-scrollbar-thumb{background:"+C.bd+";border-radius:3px}button:hover{opacity:0.88}input::placeholder{color:"+C.tx3+"}"}</style>
</div>);}
