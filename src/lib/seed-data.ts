// ─────────────────────────────────────────────────────────────────────────────
// DOGMA OS — Seed Data for all 34 dashboard nodes
// Source: DOGMA_MASTER_DATABASE.md corpus
// ─────────────────────────────────────────────────────────────────────────────

export const SEED_DATA: Record<string, any[]> = {

  /* ================================================================
     GROUP 1 — Identity & Philosophy
     ================================================================ */

  'identity-nuclear': [
    { id: 'id-1', name: 'DOGMA', description: 'Biomimetic musculoskeletal humanoid hand project. 1:1 human replica at accessible cost.', maturity_level: 80, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'id-2', name: 'Dual Nature', description: 'Technical axis (engineering, control, software) + Philosophical axis (narrative, naming, branding). Inseparable.', maturity_level: 90, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'id-3', name: 'Mission', description: 'Create the most anatomically faithful biomimetic hand system at accessible cost.', maturity_level: 70, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'id-4', name: 'Vision', description: 'Expand from hand to wrist to arm to full humanoid — modular biomimetic platform.', maturity_level: 60, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'id-5', name: 'Founding Principles', description: 'Tendon-force control (not joint angles), 1:1 muscle-tendon ratio, no joint encoders, anatomical fidelity.', maturity_level: 85, status: 'active', criticality: 'critical', owner: 'Jero' },
  ],

  'philosophy': [
    { id: 'ph-1', name: 'Foundational Thesis', description: 'Logical sequence: muscle → bone → movement → action. The body as instrument, not mere machine.', maturity_level: 90, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'ph-2', name: 'Act of Creation / Genesis', description: 'The hand as act of creation — genesis narrative where engineering meets philosophy.', maturity_level: 85, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'ph-3', name: 'Science-Art-Philosophy', description: 'Integration of scientific rigor, artistic expression, and philosophical depth in every decision.', maturity_level: 80, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'ph-4', name: 'Biblical/Symbolic Narrative', description: 'Body as temple, breath of life (Ruach), creative hand (Manus Dei). Solemn and academic tone.', maturity_level: 75, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'ph-5', name: 'Sober Academic Tone', description: 'All communication maintains a sober, academic, solemn voice. No hype, no marketing language.', maturity_level: 95, status: 'active', criticality: 'high', owner: 'Jero' },
  ],

  'naming-semantics': [
    { id: 'ns-1', name: 'Dual Naming System', description: 'Every entity has a conceptual name (symbolic) + technical descriptor (engineering). Both mandatory.', maturity_level: 90, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'ns-2', name: 'DOGMA Genesis', description: 'Facsimile Humanum — the full humanoid platform concept name.', maturity_level: 70, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'ns-3', name: 'DOGMA Dextera', description: 'Biomimetic Hand V1 — primary hand subsystem designation.', maturity_level: 85, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'ns-4', name: 'DOGMA Ruach', description: 'Actuated Hand System — pneumatic breath of life powering the muscles.', maturity_level: 80, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'ns-5', name: 'DOGMA Logos / Adama / Manus Dei', description: 'Additional symbolic names: Logos (word/reason), Adama (earth/human), Manus Dei (hand of God).', maturity_level: 60, status: 'active', criticality: 'low', owner: 'Jero' },
    { id: 'ns-6', name: 'Etymological Roots', description: 'Latin, Greek, and Biblical Hebrew roots. Each name carries semantic weight and intention.', maturity_level: 90, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'ns-7', name: 'Language Usage Guide', description: 'Guidelines for when to use conceptual vs technical name in documentation and communication.', maturity_level: 50, status: 'active', criticality: 'medium', owner: 'Jero' },
  ],

  'product-architecture': [
    { id: 'pa-1', name: 'Modular Hierarchy', description: 'Hand → Wrist → Arm → Full Humanoid. Each module independently functional.', maturity_level: 85, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'pa-2', name: 'V1 — Current Version', description: 'Hand + wrist assembly. 20 DOF hand, 3 DOF wrist, McKibben actuation, tendon transmission.', maturity_level: 75, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'pa-3', name: 'V2 — Planned', description: 'Arm integration (6 DOF), improved actuation, enhanced sensing, full arm-hand system.', maturity_level: 30, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'pa-4', name: 'Target Applications', description: 'Industry (manufacturing), Medicine (prosthetics), Research (academia), Fine Assembly.', maturity_level: 70, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'pa-5', name: 'Full Humanoid Config', description: 'Two arms + hands, legs, torso, head. $18K estimated target. Aspirational timeline.', maturity_level: 15, status: 'planned', criticality: 'medium', owner: 'Jero' },
  ],

  /* ================================================================
     GROUP 2 — Engineering
     ================================================================ */

  'hand-engineering': [
    { id: 'he-1', name: 'Mechanical Structure', description: '27-DOF biomimetic hand with anatomically precise finger, palm, and wrist assemblies.', maturity_level: 70, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'he-2', name: '20 Independent DOF', description: '20 degrees of freedom in the hand, independently actuated by McKibben muscles.', maturity_level: 75, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'he-3', name: 'Anatomical Design', description: '1:1 scale replica of human hand anatomy. Bone structure, joint placement, tendon routing.', maturity_level: 65, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'he-4', name: 'Air Supply System', description: 'Compressor and valve manifold providing 4 bar operating pressure to McKibben muscles.', maturity_level: 60, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'he-5', name: 'Tendon System', description: '1:1 muscle-tendon transmission — each McKibben actuator drives exactly one tendon path.', maturity_level: 70, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'he-6', name: 'Sensor Integration', description: '14 tactile sensors integrated into hand structure for real-time force feedback.', maturity_level: 55, status: 'active', criticality: 'high', owner: 'Jero' },
  ],

  'finger-assembly': [
    { id: 'fa-1', name: 'Per-Finger Module', description: 'Each finger is a self-contained module with McKibben actuators and tendon routing.', maturity_level: 65, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'fa-2', name: 'Phalanx Structure', description: 'Proximal, middle, and distal phalanges with biomimetic joint articulation.', maturity_level: 70, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'fa-3', name: 'Thumb Opposition', description: 'Thumb with opposition capability — critical for grasping and manipulation tasks.', maturity_level: 55, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'fa-4', name: 'Tendon Anchor Points', description: 'Anatomically placed tendon insertion points on each phalanx for biomimetic force vectors.', maturity_level: 60, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'fa-5', name: 'Joint Bearings', description: 'Low-friction bearing surfaces at interphalangeal joints for smooth articulation.', maturity_level: 50, status: 'active', criticality: 'medium', owner: 'Jero' },
  ],

  'palm-structure': [
    { id: 'ps-1', name: 'Rigid Palm Chassis', description: 'Rigid palm structure serving as mounting point for finger assemblies and sensors.', maturity_level: 70, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'ps-2', name: 'Sensor Mounting', description: 'Integrated mounting points for tactile sensors across the palm surface.', maturity_level: 60, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'ps-3', name: 'Tendon Routing Channels', description: 'Internal channels for routing tendons from McKibben muscles to finger joints.', maturity_level: 65, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'ps-4', name: 'Metacarpal Arch', description: 'Curved palm mimicking human transverse metacarpal arch for natural grasp shapes.', maturity_level: 55, status: 'active', criticality: 'medium', owner: 'Jero' },
  ],

  'wrist-assembly': [
    { id: 'wa-1', name: '3-DOF Wrist', description: '3 degrees of freedom wrist rotation unit: flexion/extension, radial/ulnar deviation, pronation/supination.', maturity_level: 60, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'wa-2', name: 'Hand-Arm Interface', description: 'Mechanical interface connecting hand module to arm module. Quick-disconnect capability.', maturity_level: 50, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'wa-3', name: 'Cable Pass-Through', description: 'Tendon and pneumatic line routing through wrist assembly without interference.', maturity_level: 55, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'wa-4', name: 'Range of Motion', description: 'Biomimetic wrist ROM: 80 deg flexion/extension, 30 deg radial/ulnar, 180 deg pronation/supination.', maturity_level: 45, status: 'active', criticality: 'high', owner: 'Jero' },
  ],

  'mckibben-actuators': [
    { id: 'mk-1', name: 'Braided PAM', description: 'Braided pneumatic artificial muscles (McKibben type). Contract when pressurized.', maturity_level: 70, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'mk-2', name: 'Operating Pressure', description: '4 bar nominal operating pressure. Valve manifold controls individual muscle pressures.', maturity_level: 75, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'mk-3', name: 'Contraction Ratio', description: 'Typical 20-25% contraction ratio depending on braid angle and internal pressure.', maturity_level: 60, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'mk-4', name: 'Muscle-Tendon 1:1', description: 'Each McKibben muscle maps to exactly one tendon. No gear reduction, direct transmission.', maturity_level: 80, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'mk-5', name: 'Antagonist Pairs', description: 'Flexor/extensor McKibben pairs enabling bidirectional actuation and co-contraction stiffness.', maturity_level: 65, status: 'active', criticality: 'high', owner: 'Jero' },
  ],

  'tendons': [
    { id: 'tn-1', name: '1:1 Transmission', description: 'One tendon per McKibben muscle. Direct force transmission without gears or pulleys.', maturity_level: 75, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'tn-2', name: 'Tendon Routing', description: 'Anatomically faithful tendon routing through phalanges and palm structure.', maturity_level: 65, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'tn-3', name: 'Force Control Primary', description: 'System controlled by tendon forces/tensions, NOT joint angles. Core design principle.', maturity_level: 80, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'tn-4', name: 'Tendon Material', description: 'High-strength low-stretch cable for minimal elastic deformation during force transmission.', maturity_level: 55, status: 'active', criticality: 'high', owner: 'Jero' },
  ],

  'tactile-sensors': [
    { id: 'ts-1', name: '14 Tactile Sensors', description: '14 tactile sensors distributed across hand (primary corpus datum).', maturity_level: 60, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'ts-2', name: 'Donut-Shaped Air Pressure', description: '19 donut-shaped pneumatic tactile sensors per finger (alternate datum — needs validation).', maturity_level: 40, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'ts-3', name: 'Real-Time Force Feedback', description: 'Continuous force/pressure feedback at high frequency for manipulation control.', maturity_level: 55, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'ts-4', name: 'Fingertip Array', description: 'High-density tactile array at fingertips — highest spatial resolution zone.', maturity_level: 45, status: 'active', criticality: 'high', owner: 'Jero' },
  ],

  'arm-engineering': [
    { id: 'ae-1', name: '6-DOF Arm', description: '6 degrees of freedom, fully actuated robotic arm for the DOGMA platform.', maturity_level: 45, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'ae-2', name: '1m Reach', description: 'Arm reach of 1 meter — matching typical human arm workspace.', maturity_level: 50, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'ae-3', name: '15 kg Payload', description: '15 kg maximum payload capacity at end-effector.', maturity_level: 45, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'ae-4', name: 'Arm-Hand Integration', description: 'Seamless mechanical and electrical integration between arm and hand modules.', maturity_level: 35, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'ae-5', name: 'Shoulder Assembly', description: '3-DOF shoulder joint: flexion/extension, abduction/adduction, internal/external rotation.', maturity_level: 30, status: 'planned', criticality: 'high', owner: 'Jero' },
  ],

  'sensing-actuation-control': [
    { id: 'sac-1', name: 'Tactile + Proprioception', description: 'Combined sensing modalities: tactile force feedback and proprioceptive state estimation.', maturity_level: 55, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'sac-2', name: 'Pneumatic Actuation', description: 'McKibben muscles at 4 bar operating pressure as primary actuation method.', maturity_level: 70, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'sac-3', name: 'Force-Based Control', description: 'Primary control via tendon forces/tensions. No joint encoders. Proprioception from state estimation.', maturity_level: 65, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'sac-4', name: 'BUS SENSORS Architecture', description: 'Signal bus carrying raw sensor data — tactile, pressure, proprioceptive — to processing pipeline.', maturity_level: 55, status: 'active', criticality: 'high', owner: 'Jero' },
  ],

  'tactile-sensing': [
    { id: 'tse-1', name: 'Real-Time Force Feedback', description: 'Continuous tactile feedback from sensor array, processed through BUS SENSORS.', maturity_level: 55, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'tse-2', name: 'Contact Detection', description: 'Binary and analog contact detection for grasp planning and object interaction.', maturity_level: 50, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'tse-3', name: 'Pressure Mapping', description: 'Spatial pressure distribution across fingertips and palm for dexterous manipulation.', maturity_level: 45, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'tse-4', name: 'Slip Detection', description: 'Incipient slip detection from tactile signal rate-of-change analysis.', maturity_level: 35, status: 'planned', criticality: 'critical', owner: 'Jero' },
  ],

  'proprioception': [
    { id: 'pr-1', name: 'No Joint Encoders', description: 'State estimation without joint encoders — proprioception derived from muscle/tendon sensing.', maturity_level: 50, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'pr-2', name: 'theta_hat Estimation', description: 'Estimated joint angle (theta_hat) computed from tendon tension and muscle length models.', maturity_level: 45, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'pr-3', name: 'omega_hat Estimation', description: 'Estimated angular velocity (omega_hat) derived from rate of change of state variables.', maturity_level: 40, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'pr-4', name: 'Forward Kinematic Model', description: 'Muscle-to-joint forward model for estimating hand configuration from tendon state.', maturity_level: 35, status: 'planned', criticality: 'high', owner: 'Jero' },
  ],

  'pneumatic-actuation': [
    { id: 'pn-1', name: 'McKibben at 4 Bar', description: 'Pneumatic artificial muscles operating at 4 bar nominal pressure.', maturity_level: 70, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'pn-2', name: 'Valve Manifold', description: 'Proportional valve manifold for individual muscle pressure control.', maturity_level: 60, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'pn-3', name: 'Compressor System', description: 'Air compressor providing regulated 4 bar supply to the valve manifold.', maturity_level: 65, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'pn-4', name: 'Pressure Transducers', description: 'Per-muscle pressure transducers for closed-loop pressure control in M1.', maturity_level: 55, status: 'active', criticality: 'critical', owner: 'Jero' },
  ],

  'sensor-fusion': [
    { id: 'sf-1', name: 'EWMA Smoothing', description: 'Exponentially Weighted Moving Average for real-time signal smoothing across all sensor channels.', maturity_level: 60, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'sf-2', name: 'Multi-Modal Fusion', description: 'Fusion of tactile, proprioceptive, and pressure data into unified state representation.', maturity_level: 45, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'sf-3', name: 'c_hat Contact Estimation', description: 'Estimated contact state (c_hat) fusing tactile and force measurements.', maturity_level: 40, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'sf-4', name: 'BUS SENSORS Processing', description: 'Signal processing pipeline for BUS SENSORS data: filtering, normalization, timestamping.', maturity_level: 50, status: 'active', criticality: 'high', owner: 'Jero' },
  ],

  'specifications': [
    { id: 'sp-1', name: 'Hand: 20 DOF', description: '20 independent degrees of freedom in hand, each actuated by dedicated McKibben muscle.', maturity_level: 80, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'sp-2', name: 'Hand: 14 Tactile Sensors', description: '14 tactile sensors distributed across fingertips and palm (primary datum).', maturity_level: 60, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'sp-3', name: 'Arm: 6 DOF, 1m, 15 kg', description: 'Arm specifications: 6 DOF fully actuated, 1m reach, 15 kg payload capacity.', maturity_level: 50, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'sp-4', name: '1:1 Human Replica', description: 'Anatomical fidelity — 1:1 scale replica of human hand and arm structure.', maturity_level: 70, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'sp-5', name: 'Performance Metrics', description: 'Quantitative performance data pending experimental validation. No measured benchmarks yet.', maturity_level: 15, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'sp-6', name: 'Operating Pressure', description: '4 bar nominal pneumatic operating pressure for all McKibben actuators.', maturity_level: 80, status: 'active', criticality: 'high', owner: 'Jero' },
  ],

  /* ================================================================
     GROUP 3 — Business
     ================================================================ */

  'costs-pricing': [
    { id: 'cp-1', name: 'Arm-Hand Price', description: '$5,000 USD estimated target price for arm-hand system. Conversational estimate.', maturity_level: 30, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'cp-2', name: 'Humanoid Price', description: '$18,000 USD estimated target price for full humanoid. Aspirational.', maturity_level: 15, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'cp-3', name: 'Cost Breakdown Arms/Hands', description: 'Arms + hands: 28% of total humanoid cost. Largest single subsystem after legs.', maturity_level: 25, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'cp-4', name: 'Cost Breakdown Legs', description: 'Legs: 33% of total humanoid cost. Torso: 22%, Head: 10%, Other: 7%.', maturity_level: 20, status: 'planned', criticality: 'medium', owner: 'Jero' },
    { id: 'cp-5', name: 'BOM Optimization', description: 'Pneumatic muscles significantly cheaper than precision servo motors — key cost advantage.', maturity_level: 35, status: 'active', criticality: 'high', owner: 'Jero' },
  ],

  'market-clients': [
    { id: 'mc-1', company_name: 'Manufacturing Sector', stage: 'prospecting', viability_score: 70, champion_name: 'TBD', risk_level: 'medium' },
    { id: 'mc-2', company_name: 'Medical / Prosthetics', stage: 'prospecting', viability_score: 60, champion_name: 'TBD', risk_level: 'high' },
    { id: 'mc-3', company_name: 'Academic Research', stage: 'prospecting', viability_score: 75, champion_name: 'TBD', risk_level: 'low' },
    { id: 'mc-4', company_name: 'Fine Assembly', stage: 'prospecting', viability_score: 65, champion_name: 'TBD', risk_level: 'medium' },
    { id: 'mc-5', company_name: 'Industrial Pilots (Supabase)', stage: 'prospecting', viability_score: 50, champion_name: 'TBD', risk_level: 'medium' },
  ],

  'benchmarks-competition': [
    { id: 'bc-1', name: 'Shadow Hand', description: 'Tendon-driven, 24 DOF. Benchmark for dexterous manipulation. ~$100K+ price point.', maturity_level: 50, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'bc-2', name: 'OpenAI Dactyl', description: 'RL-trained manipulation on Shadow Hand. Software-focused benchmark, not hardware.', maturity_level: 50, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'bc-3', name: 'JSK Lab (University of Tokyo)', description: 'Musculoskeletal humanoid research. Closest technical parallel to DOGMA approach.', maturity_level: 50, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'bc-4', name: 'Tesla Optimus', description: 'Full humanoid, motor-driven. High volume target but conventional actuation.', maturity_level: 50, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'bc-5', name: 'Atlas (Boston Dynamics)', description: 'Advanced full-body humanoid. Hydraulic/electric hybrid. Research platform, not commercial.', maturity_level: 50, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'bc-6', name: 'Unitree G1 / UBTech Walker S2', description: 'Commercial humanoids at lower price points. Motor-driven, limited dexterity.', maturity_level: 50, status: 'active', criticality: 'low', owner: 'Jero' },
    { id: 'bc-7', name: 'Agility Digit', description: 'Warehouse logistics humanoid. Task-specific, not dexterous manipulation focused.', maturity_level: 50, status: 'active', criticality: 'low', owner: 'Jero' },
    { id: 'bc-8', name: 'Ameca (Engineered Arts)', description: 'Expressive humanoid focused on social interaction. Limited manipulation capability.', maturity_level: 50, status: 'active', criticality: 'low', owner: 'Jero' },
  ],

  'differentiators': [
    { id: 'df-1', name: 'Biomimetic Musculoskeletal', description: 'McKibben muscle actuation vs conventional motors. Compliant, human-like force profiles.', maturity_level: 80, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'df-2', name: 'Tendon-Force Control', description: 'Control by tendon forces, not joint angles. No encoders. Unique in the field.', maturity_level: 75, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'df-3', name: '1:1 Anatomical Replica', description: 'Faithful 1:1 scale reproduction of human hand anatomy — bone structure, tendon paths, joint placement.', maturity_level: 70, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'df-4', name: 'Competitive Pricing', description: '$5K arm-hand vs $100K+ Shadow Hand. 20x cost reduction target through pneumatic muscles.', maturity_level: 25, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'df-5', name: 'Dual Technical-Philosophical Narrative', description: 'Unique positioning combining engineering depth with symbolic, philosophical branding.', maturity_level: 85, status: 'active', criticality: 'medium', owner: 'Jero' },
  ],

  /* ================================================================
     GROUP 4 — Brand & Documentation
     ================================================================ */

  'branding-narrative': [
    { id: 'bn-1', name: 'Sober Academic Tone', description: 'All communications use sober, academic, solemn voice. No marketing hype.', maturity_level: 90, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'bn-2', name: 'Latin-Greek-Hebrew Roots', description: 'Naming draws from Latin (Dextera, Manus), Greek (Logos), Hebrew (Ruach, Adama).', maturity_level: 85, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'bn-3', name: 'Genesis Narrative', description: 'Creation narrative: the hand as act of creation, body as temple, breath as life (Ruach).', maturity_level: 80, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'bn-4', name: 'Visual & Aesthetic Guide', description: 'Dark, clinical aesthetic. Minimal chrome. Engineering diagrams as art. Inferred from corpus.', maturity_level: 50, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'bn-5', name: 'Brand Consistency', description: 'Every public artifact must reflect the dual nature: technical depth + philosophical weight.', maturity_level: 75, status: 'active', criticality: 'high', owner: 'Jero' },
  ],

  'documentation': [
    { id: 'dc-1', name: 'Foundational Ontology', description: 'DOGMA Master Database — 34-node hierarchical knowledge architecture (this document).', maturity_level: 80, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'dc-2', name: 'Engineering Documentation', description: 'Mechanical design docs: hand, arm, McKibben, tendons, sensors. In development.', maturity_level: 40, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'dc-3', name: 'Control Architecture Docs', description: 'M0-M9 control module specifications, bus definitions, signal flow documentation.', maturity_level: 45, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'dc-4', name: 'HMI Application Docs', description: 'Control OS v1.0 user documentation, page specifications, API reference.', maturity_level: 35, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'dc-5', name: 'API Reference', description: 'ROS 2 topic/service API reference for developers integrating with DOGMA.', maturity_level: 25, status: 'planned', criticality: 'medium', owner: 'Jero' },
  ],

  'roadmap-versions': [
    { id: 'rv-1', title: 'V1 Hand + Wrist', progress: 65, due_date: '2026-06-01', status: 'active', owner: 'Jero' },
    { id: 'rv-2', title: 'V2 Arm Integration', progress: 15, due_date: '2026-12-01', status: 'planned', owner: 'Jero' },
    { id: 'rv-3', title: 'Control OS v3', progress: 40, due_date: '2026-09-01', status: 'active', owner: 'Jero' },
    { id: 'rv-4', title: 'Full Humanoid Prototype', progress: 5, due_date: '2027-06-01', status: 'planned', owner: 'Jero' },
    { id: 'rv-5', title: 'Modular Expansion: Hand → Wrist → Arm → Humanoid', progress: 35, due_date: '2027-12-01', status: 'active', owner: 'Jero' },
  ],

  'community-education': [
    { id: 'ce-1', name: 'Academic Potential', description: 'University partnerships for biomimetic robotics research and student projects.', maturity_level: 20, status: 'planned', criticality: 'medium', owner: 'Jero' },
    { id: 'ce-2', name: 'Industrial Pilots', description: 'Pilot programs with manufacturing companies for real-world validation.', maturity_level: 15, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'ce-3', name: 'Research Collaborations', description: 'Potential collaborations with robotics labs (JSK Lab, similar musculoskeletal groups).', maturity_level: 10, status: 'planned', criticality: 'medium', owner: 'Jero' },
    { id: 'ce-4', name: 'Open Source Components', description: 'Selective open-source release of non-core components for community building.', maturity_level: 5, status: 'planned', criticality: 'low', owner: 'Jero' },
  ],

  'risks-validations': [
    { id: 'rv-1', name: 'Unvalidated Claims', description: 'Performance claims (DOF, force, speed) are design targets, not experimentally validated.', maturity_level: 40, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'rv-2', name: 'Conversational Benchmarks', description: 'Competitor comparisons are informal/conversational, not rigorous technical benchmarks.', maturity_level: 35, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'rv-3', name: 'Technical Risks', description: 'McKibben fatigue life, tendon wear, sensor reliability at scale, air leak management.', maturity_level: 30, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'rv-4', name: 'Market Risks', description: 'Unproven demand for biomimetic hand at $5K. Competition from motor-driven alternatives.', maturity_level: 25, status: 'active', criticality: 'high', owner: 'Jero' },
  ],

  'open-questions': [
    { id: 'oq-1', name: 'Sensor Count Discrepancy', description: '14 sensors (primary corpus) vs 19 donut-shaped per finger (alternate). Needs resolution.', maturity_level: 30, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'oq-2', name: 'McKibben Type', description: 'Pneumatic confirmed, but hydraulic variant mentioned. Need definitive specification.', maturity_level: 35, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'oq-3', name: 'Active Inference Status', description: 'Active Inference framework listed as hypothesis. No experimental validation yet.', maturity_level: 20, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'oq-4', name: 'Measured Performance Data', description: 'No experimentally measured performance data. All specs are design targets.', maturity_level: 10, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'oq-5', name: 'DOF Discrepancy', description: 'Hand described as 27-DOF (mechanical) vs 20-DOF (independent actuated). Clarify which is canonical.', maturity_level: 25, status: 'active', criticality: 'high', owner: 'Jero' },
  ],

  'sources-traceability': [
    { id: 'st-1', name: 'Conversational Corpus', description: 'Primary source: dogma_master_prompt_profesional.txt — foundational knowledge from Jero.', maturity_level: 85, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'st-2', name: 'Architecture Documents', description: 'ARCHITECTURE.md, MIGRATION.md — system architecture and migration specifications.', maturity_level: 80, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'st-3', name: 'Source Code', description: 'nodes.ts, types.ts, theme.ts — codebase as source of truth for system structure.', maturity_level: 90, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'st-4', name: 'Confidence Levels', description: 'Certainty markers: confirmed, inferred, estimated, candidate, hypothesis, pending validation.', maturity_level: 85, status: 'active', criticality: 'high', owner: 'Jero' },
  ],

  'data-governance': [
    { id: 'dg-1', name: 'Versioning Protocol', description: 'Master database version tracking. Current: v1.0. Update on structural changes.', maturity_level: 40, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'dg-2', name: 'Update Process', description: 'Formal process for updating data: validate source, update confidence markers, log change.', maturity_level: 30, status: 'planned', criticality: 'medium', owner: 'Jero' },
    { id: 'dg-3', name: 'Maintenance Roles', description: 'Data steward responsibilities: Jero as primary maintainer, future delegation plan.', maturity_level: 25, status: 'planned', criticality: 'low', owner: 'Jero' },
    { id: 'dg-4', name: 'Data Validation Rules', description: 'All numeric specs require confidence markers. No datum enters DB without source attribution.', maturity_level: 45, status: 'active', criticality: 'high', owner: 'Jero' },
  ],

  /* ================================================================
     GROUP 5 — Control Architecture
     ================================================================ */

  'control-modules': [
    { id: 'cm-1', name: 'M0-M9 Hierarchy', description: 'Hierarchical control from Safety (1-5kHz) to Meta-Supervisor (0.1Hz). 10 layers.', rate_hz: 0, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'cm-2', name: 'BUS SENSORS', description: 'Signal bus carrying raw sensor data from tactile, pressure, and proprioceptive sensors.', rate_hz: 1000, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'cm-3', name: 'BUS STATE', description: 'Signal bus carrying estimated state variables (theta_hat, omega_hat, c_hat, T_obj_hat, w_hat).', rate_hz: 500, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'cm-4', name: 'BUS COMMANDS', description: 'Command bus from higher control layers to lower actuator layers.', rate_hz: 200, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'cm-5', name: 'BUS LIMITS', description: 'Safety limits bus. Carries threshold values and emergency stop signals.', rate_hz: 5000, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'cm-6', name: 'Frequency Hierarchy', description: 'M0: 1-5kHz, M1: 1kHz, M2: 500Hz, M3: 200Hz, M5: 100Hz, M4: 30Hz, M7: 10-30Hz, M8: 1-10Hz, M9: 0.1-1Hz.', rate_hz: 0, status: 'active', criticality: 'high', owner: 'Jero' },
  ],

  'm0-safety': [
    { id: 'm0-1', name: 'Safety Supervisor', description: 'Hardware safety layer with maximum priority override. Runs at 1-5 kHz.', rate_hz: 5000, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm0-2', name: 'Overpressure Monitor', description: 'Monitors all pressure channels for exceeding safe limits. Triggers safe-open.', rate_hz: 5000, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm0-3', name: 'E-Stop', description: 'Emergency stop — safe-open all valves, vent pressure, lock actuators.', rate_hz: 5000, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm0-4', name: 'Watchdog Timer', description: 'Hardware watchdog detecting communication loss or control loop failure.', rate_hz: 5000, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm0-5', name: 'Safe-State Definition', description: 'All valves open, pressure vented, system in known safe configuration upon any fault.', rate_hz: 5000, status: 'planned', criticality: 'critical', owner: 'Jero' },
  ],

  'm1-pressure': [
    { id: 'm1-1', name: 'Pressure Regulation Loop', description: 'Closed-loop pressure control for each McKibben muscle. PID-based regulation.', rate_hz: 1000, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm1-2', name: 'Valve Command Output', description: 'Proportional valve commands generated from pressure error signal.', rate_hz: 1000, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm1-3', name: 'Pressure Sensor Input', description: 'Reads pressure transducers on each muscle for feedback control.', rate_hz: 1000, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm1-4', name: 'Anti-Windup Protection', description: 'Integrator anti-windup for pressure PID to prevent actuator saturation overshoot.', rate_hz: 1000, status: 'planned', criticality: 'high', owner: 'Jero' },
  ],

  'm2-force-impedance': [
    { id: 'm2-1', name: 'Force Control', description: 'Tendon force regulation. Maps desired forces to pressure setpoints for M1.', rate_hz: 500, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm2-2', name: 'Impedance Control', description: 'Variable stiffness/damping behavior. Adjusts compliance for safe interaction.', rate_hz: 500, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm2-3', name: 'Tendon Tension Estimation', description: 'Estimates actual tendon tension from pressure and muscle model.', rate_hz: 500, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm2-4', name: 'Stiffness Modulation', description: 'Variable stiffness via co-contraction of antagonist McKibben pairs.', rate_hz: 500, status: 'planned', criticality: 'high', owner: 'Jero' },
  ],

  'm3-proprioception': [
    { id: 'm3-1', name: 'Joint State Estimation', description: 'Estimates joint angles (theta_hat) and velocities (omega_hat) without encoders.', rate_hz: 200, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm3-2', name: 'Muscle Length Model', description: 'Forward model mapping pressure/contraction to estimated joint configuration.', rate_hz: 200, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm3-3', name: 'State Publisher', description: 'Publishes estimated state to BUS STATE for consumption by higher layers.', rate_hz: 200, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm3-4', name: 'Calibration Correction', description: 'Online calibration drift correction using periodic reference measurements.', rate_hz: 200, status: 'planned', criticality: 'medium', owner: 'Jero' },
  ],

  'm4-vision': [
    { id: 'm4-1', name: 'Visual Perception Pipeline', description: 'Camera-based perception for object detection, pose estimation, workspace mapping.', rate_hz: 30, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm4-2', name: 'Object Pose Estimation', description: 'Estimates 6D pose of target objects for grasp planning.', rate_hz: 30, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm4-3', name: 'Hand Tracking', description: 'Visual tracking of hand/finger positions for state estimation cross-validation.', rate_hz: 60, status: 'planned', criticality: 'medium', owner: 'Jero' },
  ],

  'm5-fusion': [
    { id: 'm5-1', name: 'Multi-Modal Fusion', description: 'Fuses tactile, proprioceptive, pressure, and visual data into unified state.', rate_hz: 100, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm5-2', name: 'T_obj_hat Estimation', description: 'Estimated torque on grasped object from combined sensor fusion.', rate_hz: 100, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm5-3', name: 'w_hat Estimation', description: 'Estimated stiffness/weight of held object for adaptive grasping.', rate_hz: 100, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm5-4', name: 'Confidence Scoring', description: 'Per-estimate confidence score based on sensor agreement and model consistency.', rate_hz: 100, status: 'planned', criticality: 'medium', owner: 'Jero' },
  ],

  'm6-reflex': [
    { id: 'm6-1', name: 'Reflexive Safety Responses', description: 'Fast reflexive actions: slip detection → grip tighten, impact → retract.', rate_hz: 500, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm6-2', name: 'Slip Detection Reflex', description: 'Detects incipient slip from tactile sensor rate-of-change, triggers grip increase.', rate_hz: 500, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm6-3', name: 'Impact Protection', description: 'Detects sudden impact forces, triggers protective retraction or compliance increase.', rate_hz: 500, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm6-4', name: 'Overforce Clamp', description: 'Clamps grip force when exceeding object-adaptive thresholds from w_hat estimation.', rate_hz: 500, status: 'planned', criticality: 'high', owner: 'Jero' },
  ],

  'm7-policy': [
    { id: 'm7-1', name: 'Learned Manipulation Policies', description: 'Neural network or Active Inference policies for dexterous manipulation tasks.', rate_hz: 30, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm7-2', name: 'Grasp Policy', description: 'Autonomous grasp planning and execution from object pose and shape.', rate_hz: 30, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm7-3', name: 'Skill Execution', description: 'Executes defined skills (sub-skill → skill → run hierarchy) from Skills Library.', rate_hz: 10, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm7-4', name: 'Policy Switching', description: 'Online switching between policies based on task context and M5 fusion state.', rate_hz: 10, status: 'planned', criticality: 'high', owner: 'Jero' },
  ],

  'm8-language': [
    { id: 'm8-1', name: 'Natural Language Interface', description: 'Accepts natural language commands and converts to skill/task sequences.', rate_hz: 5, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm8-2', name: 'Command Parser', description: 'Parses structured and unstructured commands into executable skill parameters.', rate_hz: 10, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm8-3', name: 'LLM Integration', description: 'Optional LLM backend for complex task decomposition and planning.', rate_hz: 1, status: 'planned', criticality: 'medium', owner: 'Jero' },
    { id: 'm8-4', name: 'Skill Invocation', description: 'Maps parsed commands to Skills Library entries with parameter binding.', rate_hz: 5, status: 'planned', criticality: 'high', owner: 'Jero' },
  ],

  'm9-meta-supervisor': [
    { id: 'm9-1', name: 'System Orchestrator', description: 'Top-level supervisor coordinating all M0-M8 modules. Lowest frequency, highest abstraction.', rate_hz: 1, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm9-2', name: 'Task Scheduling', description: 'Schedules and sequences high-level tasks across the entire system.', rate_hz: 1, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm9-3', name: 'System Health Monitor', description: 'Monitors overall system health, resource utilization, and performance metrics.', rate_hz: 0.1, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm9-4', name: 'Mode Manager', description: 'Manages system operation modes: Idle, Manual, Teleop, Autonomous, Calibration, E-Stop.', rate_hz: 1, status: 'planned', criticality: 'critical', owner: 'Jero' },
  ],

  'state-estimation': [
    { id: 'se-1', name: 'theta_hat (Joint Angle)', description: 'Estimated joint angle from tendon tension and muscle model. No encoder.', rate_hz: 200, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'se-2', name: 'omega_hat (Angular Velocity)', description: 'Estimated angular velocity derived from theta_hat differentiation with filtering.', rate_hz: 200, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'se-3', name: 'c_hat (Contact State)', description: 'Estimated contact: binary contact detection + force magnitude from tactile array.', rate_hz: 500, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'se-4', name: 'T_obj_hat (Object Torque)', description: 'Estimated torque applied to grasped object from combined force measurements.', rate_hz: 100, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'se-5', name: 'w_hat (Object Stiffness/Weight)', description: 'Estimated physical properties of held object for adaptive control.', rate_hz: 100, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'se-6', name: 'EWMA Smoothing', description: 'Exponentially Weighted Moving Average applied to all state estimates for noise rejection.', rate_hz: 1000, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'se-7', name: 'BUS STATE Publisher', description: 'Publishes all estimated state variables on BUS STATE at 200 Hz for upper control layers.', rate_hz: 200, status: 'planned', criticality: 'critical', owner: 'Jero' },
  ],

  'safety-reflexes': [
    { id: 'sr-1', name: 'M0 Safety Layer', description: 'Highest priority hardware safety. Overrides all other modules. 1-5 kHz.', rate_hz: 5000, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'sr-2', name: 'M6 Reflex Layer', description: 'Fast reflexive responses to tactile events: slip, impact, overforce.', rate_hz: 500, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'sr-3', name: 'BUS LIMITS', description: 'Dedicated safety bus carrying pressure limits, force limits, and emergency signals.', rate_hz: 5000, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'sr-4', name: 'Emergency Stop Protocols', description: 'E-Stop: vent all pressure, safe-open valves, enter safe state. Hardware + software.', rate_hz: 5000, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'sr-5', name: 'Reflex Arc Latency', description: 'Target reflex latency < 2ms from sensor event to actuator response.', rate_hz: 500, status: 'planned', criticality: 'high', owner: 'Jero' },
  ],

  'digital-twin': [
    { id: 'dt-1', name: 'Physics Simulation', description: 'Dynamic model of hand/arm for real-time simulation and prediction. Pending validation.', rate_hz: 100, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'dt-2', name: 'Three.js 3D Visualization', description: '3D visualization in Control OS using Three.js. Real-time mirror of physical system.', rate_hz: 60, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'dt-3', name: 'Model Parameters', description: 'Physical parameters (mass, inertia, stiffness) for dynamic simulation. Pending validation.', rate_hz: 0, status: 'planned', criticality: 'medium', owner: 'Jero' },
    { id: 'dt-4', name: 'Real-Time Mirror', description: 'Live synchronization between physical hand state and digital twin 3D model.', rate_hz: 60, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'dt-5', name: 'Predictive Simulation', description: 'Forward prediction of hand dynamics for model-predictive control in M2/M7.', rate_hz: 100, status: 'planned', criticality: 'medium', owner: 'Jero' },
  ],

  'policies-active-inference': [
    { id: 'pai-1', name: 'Active Inference Framework', description: 'Theoretical framework for perception-action loops. Hypothesis stage — not validated.', rate_hz: 30, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'pai-2', name: 'Skill Hierarchy', description: 'sub-skill → skill → run. Composable manipulation primitives building complex behaviors.', rate_hz: 10, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'pai-3', name: 'Skill Categories', description: 'Arm, Grasp, Manipulation, Assembly, Sensing, Interaction, Utility — 7 skill categories.', rate_hz: 0, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'pai-4', name: 'M7 Policy Execution', description: 'Policy module executing learned skills at 10-30 Hz via M7 control layer.', rate_hz: 30, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'pai-5', name: 'Free Energy Minimization', description: 'Active Inference core: minimize variational free energy for perception-action coupling.', rate_hz: 30, status: 'planned', criticality: 'high', owner: 'Jero' },
  ],

  'realtime-software': [
    { id: 'rt-1', name: 'ROS 2 Jazzy', description: 'Robot Operating System 2 (Jazzy distribution) as middleware framework.', rate_hz: 0, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'rt-2', name: 'rosbridge WebSocket', description: 'WebSocket bridge between ROS 2 nodes and web-based Control OS application.', rate_hz: 0, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'rt-3', name: 'Real-Time Nodes', description: 'RT-priority ROS nodes for M0-M2 control loops requiring deterministic timing.', rate_hz: 5000, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'rt-4', name: 'Compute Requirements', description: 'Compute allocation for concurrent control loops, fusion, and policy execution. TBD.', rate_hz: 0, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'rt-5', name: 'Latency Budget', description: 'Per-layer latency budgets: M0 < 0.2ms, M1 < 1ms, M2 < 2ms, M3 < 5ms, M7 < 100ms.', rate_hz: 0, status: 'planned', criticality: 'critical', owner: 'Jero' },
  ],

  'simulation-dataset': [
    { id: 'sd-1', name: 'Simulation Environment', description: 'Physics simulation environment for training and testing. Platform TBD (MuJoCo/Isaac).', rate_hz: 0, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'sd-2', name: 'Dataset Collection', description: 'Data collection pipeline for manipulation demonstrations and sensor recordings.', rate_hz: 0, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'sd-3', name: 'Sim-to-Real Transfer', description: 'Domain transfer methodology from simulation to physical system. Research phase.', rate_hz: 0, status: 'planned', criticality: 'medium', owner: 'Jero' },
    { id: 'sd-4', name: 'Training Pipeline', description: 'End-to-end pipeline: simulate → collect → train policy → deploy to M7.', rate_hz: 0, status: 'planned', criticality: 'high', owner: 'Jero' },
  ],

  /* ================================================================
     GROUP 6 — Application & Operations
     ================================================================ */

  'control-app-hmi': [
    { id: 'app-1', name: 'DOGMA Control OS v1.0', description: 'Primary control application and HMI. React + RosBridge WebSocket.', status: 'active', user_role: 'All', criticality: 'critical' },
    { id: 'app-2', name: 'Three User Roles', description: 'Operator (daily use), Engineer (config/tuning), Admin (full system access).', status: 'active', user_role: 'All', criticality: 'high' },
    { id: 'app-3', name: '13 Functional Pages', description: 'Command Center, Live View, Manual Control, AI Planner, Arm Planner, Skills Library, Run Builder, Teleop, Calibration Lab, Data Replay, Safety Diagnostics, Settings + more.', status: 'active', user_role: 'All', criticality: 'critical' },
    { id: 'app-4', name: 'WebSocket Connectivity', description: 'Real-time bidirectional communication with ROS 2 via rosbridge WebSocket.', status: 'active', user_role: 'Engineer', criticality: 'critical' },
    { id: 'app-5', name: 'Dark Theme UI', description: 'Clinical dark interface with engineering aesthetic. Zinc/slate palette, amber accents.', status: 'active', user_role: 'All', criticality: 'medium' },
  ],

  'digital-product': [
    { id: 'dp-1', name: 'Page Architecture', description: '13 pages organized by user workflow: monitoring, control, planning, teaching, diagnostics.', status: 'active', user_role: 'All', criticality: 'high' },
    { id: 'dp-2', name: 'Role-Based Access', description: 'Page visibility and feature access controlled by user role (Operator/Engineer/Admin).', status: 'active', user_role: 'Admin', criticality: 'high' },
    { id: 'dp-3', name: 'User Flow Design', description: 'Defined user flows per role: Operator monitors + executes, Engineer tunes, Admin configures.', status: 'active', user_role: 'All', criticality: 'medium' },
    { id: 'dp-4', name: 'Responsive Layout', description: 'Responsive grid layout adapting to desktop and tablet form factors.', status: 'active', user_role: 'All', criticality: 'medium' },
  ],

  'page-command-center': [
    { id: 'cc-1', name: 'System State Overview', description: 'Real-time system health, active modules, connection status, pressure readings.', status: 'active', user_role: 'Operator', criticality: 'critical' },
    { id: 'cc-2', name: 'Active Skill Monitor', description: 'Currently executing skill with progress, parameters, and abort capability.', status: 'active', user_role: 'Operator', criticality: 'high' },
    { id: 'cc-3', name: 'Alert Dashboard', description: 'Safety alerts, warnings, and system notifications in priority order.', status: 'active', user_role: 'Operator', criticality: 'critical' },
    { id: 'cc-4', name: 'Quick Actions', description: 'One-click actions: E-Stop, Home, Calibrate, Start/Stop skill execution.', status: 'active', user_role: 'Operator', criticality: 'high' },
    { id: 'cc-5', name: 'Pressure Overview', description: 'Summary pressure readings across all McKibben channels with min/max/avg.', status: 'active', user_role: 'Operator', criticality: 'high' },
  ],

  'page-live-view': [
    { id: 'lv-1', name: '3D Hand Visualization', description: 'Real-time Three.js 3D model showing current hand/arm configuration.', status: 'active', user_role: 'Operator', criticality: 'critical' },
    { id: 'lv-2', name: 'Sensor Overlay', description: 'Tactile sensor readings overlaid on 3D model with color-coded force mapping.', status: 'active', user_role: 'Engineer', criticality: 'high' },
    { id: 'lv-3', name: 'Joint State Display', description: 'Estimated joint angles (theta_hat) and velocities displayed per joint.', status: 'active', user_role: 'Engineer', criticality: 'high' },
    { id: 'lv-4', name: 'Camera Feed', description: 'Live camera feed from workspace cameras with object detection overlay.', status: 'planned', user_role: 'Operator', criticality: 'medium' },
  ],

  'page-manual-control': [
    { id: 'mc-1', name: 'Individual Muscle Control', description: 'Direct pressure setpoint control for each McKibben muscle via sliders.', status: 'active', user_role: 'Engineer', criticality: 'critical' },
    { id: 'mc-2', name: 'Preset Postures', description: 'Pre-defined hand postures: open, close, pinch, point, grasp patterns.', status: 'active', user_role: 'Operator', criticality: 'high' },
    { id: 'mc-3', name: 'Force Limit Override', description: 'Adjustable force limits for manual testing. Restricted to Engineer/Admin.', status: 'active', user_role: 'Engineer', criticality: 'critical' },
    { id: 'mc-4', name: 'Real-Time Feedback', description: 'Live sensor values alongside each manual control slider for immediate feedback.', status: 'active', user_role: 'Engineer', criticality: 'high' },
  ],

  'page-ai-planner': [
    { id: 'ai-1', name: 'Task Planner', description: 'AI-driven task decomposition: natural language → skill sequence → execution plan.', status: 'planned', user_role: 'Operator', criticality: 'high' },
    { id: 'ai-2', name: 'Grasp Planning', description: 'Autonomous grasp plan generation from object detection and pose estimation.', status: 'planned', user_role: 'Operator', criticality: 'high' },
    { id: 'ai-3', name: 'Plan Visualization', description: 'Visual preview of planned skill sequence before execution confirmation.', status: 'planned', user_role: 'Operator', criticality: 'medium' },
    { id: 'ai-4', name: 'Natural Language Input', description: 'Accept commands in natural language via M8 Language module integration.', status: 'planned', user_role: 'Operator', criticality: 'high' },
  ],

  'page-arm-planner': [
    { id: 'ap-1', name: 'Trajectory Planning', description: 'Arm trajectory planning with IK solver. Waypoint-based path definition.', status: 'planned', user_role: 'Engineer', criticality: 'high' },
    { id: 'ap-2', name: 'Inverse Kinematics', description: '6-DOF IK solver for arm positioning. Cartesian and joint-space control modes.', status: 'planned', user_role: 'Engineer', criticality: 'critical' },
    { id: 'ap-3', name: 'Collision Avoidance', description: 'Workspace collision checking against known obstacles and joint limits.', status: 'planned', user_role: 'Engineer', criticality: 'high' },
    { id: 'ap-4', name: 'Workspace Visualization', description: '3D workspace boundary and reachability visualization overlaid on arm model.', status: 'planned', user_role: 'Engineer', criticality: 'medium' },
  ],

  'page-skills-library': [
    { id: 'sl-1', name: 'Skill Repository', description: 'Browsable library of reusable manipulation skills organized by category.', status: 'active', user_role: 'Operator', criticality: 'high' },
    { id: 'sl-2', name: 'Skill Categories', description: '7 categories: Arm, Grasp, Manipulation, Assembly, Sensing, Interaction, Utility.', status: 'active', user_role: 'Operator', criticality: 'high' },
    { id: 'sl-3', name: 'Skill Editor', description: 'Create and edit skill definitions with parameters, preconditions, and postconditions.', status: 'planned', user_role: 'Engineer', criticality: 'medium' },
    { id: 'sl-4', name: 'Skill Testing', description: 'Sandbox execution mode to test skills without full system commitment.', status: 'planned', user_role: 'Engineer', criticality: 'medium' },
  ],

  'page-run-builder': [
    { id: 'rb-1', name: 'Run Composer', description: 'Drag-and-drop interface to compose sequential skill runs from library.', status: 'planned', user_role: 'Operator', criticality: 'high' },
    { id: 'rb-2', name: 'Parameter Configuration', description: 'Per-step parameter override for each skill in the run sequence.', status: 'planned', user_role: 'Engineer', criticality: 'medium' },
    { id: 'rb-3', name: 'Run Execution', description: 'Execute composed run with real-time progress monitoring and abort capability.', status: 'planned', user_role: 'Operator', criticality: 'high' },
    { id: 'rb-4', name: 'Run Templates', description: 'Save and share run sequences as reusable templates for common workflows.', status: 'planned', user_role: 'Operator', criticality: 'medium' },
  ],

  'page-teleop': [
    { id: 'to-1', name: 'Teleoperation Interface', description: 'Remote control interface for hand and arm via input devices or gloves.', status: 'active', user_role: 'Operator', criticality: 'high' },
    { id: 'to-2', name: 'Haptic Feedback', description: 'Haptic glove integration for force feedback during teleoperation.', status: 'planned', user_role: 'Operator', criticality: 'medium' },
    { id: 'to-3', name: 'Demonstration Capture', description: 'Record teleoperation sessions as demonstration data for learning.', status: 'planned', user_role: 'Engineer', criticality: 'high' },
    { id: 'to-4', name: 'Latency Display', description: 'Real-time round-trip latency indicator for teleop responsiveness monitoring.', status: 'planned', user_role: 'Operator', criticality: 'medium' },
  ],

  'page-calibration-lab': [
    { id: 'cl-1', name: 'Sensor Calibration', description: 'Guided calibration workflow for tactile sensors and pressure transducers.', status: 'planned', user_role: 'Engineer', criticality: 'critical' },
    { id: 'cl-2', name: 'Actuator Calibration', description: 'McKibben muscle characterization: pressure-contraction curves per muscle.', status: 'planned', user_role: 'Engineer', criticality: 'critical' },
    { id: 'cl-3', name: 'System Identification', description: 'Automated system identification routines for model parameter estimation.', status: 'planned', user_role: 'Engineer', criticality: 'high' },
    { id: 'cl-4', name: 'Calibration History', description: 'Track calibration history per sensor/actuator with drift monitoring.', status: 'planned', user_role: 'Engineer', criticality: 'medium' },
  ],

  'page-data-replay': [
    { id: 'dr-1', name: 'Historical Playback', description: 'Replay recorded sensor and actuator data with synchronized 3D visualization.', status: 'planned', user_role: 'Engineer', criticality: 'high' },
    { id: 'dr-2', name: 'Timeline Scrubbing', description: 'Scrub through recorded data timeline with variable playback speed.', status: 'planned', user_role: 'Engineer', criticality: 'medium' },
    { id: 'dr-3', name: 'Data Annotation', description: 'Annotate replay segments for training data curation and event marking.', status: 'planned', user_role: 'Engineer', criticality: 'medium' },
    { id: 'dr-4', name: 'Comparison Mode', description: 'Side-by-side replay of two runs for performance comparison and regression testing.', status: 'planned', user_role: 'Engineer', criticality: 'low' },
  ],

  'page-safety-diagnostics': [
    { id: 'sd-1', name: 'Safety System Status', description: 'Real-time M0 safety layer status, pressure limits, watchdog state.', status: 'active', user_role: 'Engineer', criticality: 'critical' },
    { id: 'sd-2', name: 'Incident Log', description: 'Historical log of safety events, E-Stops, limit violations, and reflexes triggered.', status: 'active', user_role: 'Engineer', criticality: 'high' },
    { id: 'sd-4', name: 'Pressure Chart', description: 'Real-time pressure chart for all McKibben channels with limit overlays.', status: 'active', user_role: 'Engineer', criticality: 'high' },
    { id: 'sd-3', name: 'Diagnostic Tests', description: 'Run diagnostic routines: leak test, sensor check, actuator test, comms test.', status: 'planned', user_role: 'Engineer', criticality: 'high' },
  ],

  'page-settings': [
    { id: 'st-1', name: 'System Configuration', description: 'ROS connection settings, IP addresses, topic mappings, update rates.', status: 'active', user_role: 'Admin', criticality: 'high' },
    { id: 'st-2', name: 'User Management', description: 'User role assignment, access control, and authentication settings.', status: 'planned', user_role: 'Admin', criticality: 'high' },
    { id: 'st-3', name: 'Control Parameters', description: 'Tunable control parameters: PID gains, safety limits, filter constants.', status: 'active', user_role: 'Engineer', criticality: 'critical' },
    { id: 'st-4', name: 'Logging Configuration', description: 'Configure data logging: channels, rates, storage location, retention.', status: 'planned', user_role: 'Admin', criticality: 'medium' },
  ],

  'ros-bridge': [
    { id: 'ros-1', name: 'rosbridge_server', description: 'WebSocket server bridging ROS 2 topics/services to web clients.', status: 'active', user_role: 'Engineer', criticality: 'critical' },
    { id: 'ros-2', name: 'WebSocket Protocol', description: 'JSON-based publish/subscribe over WebSocket for real-time data streaming.', status: 'active', user_role: 'Engineer', criticality: 'critical' },
    { id: 'ros-3', name: 'Topic Management', description: 'Subscribe/publish to ROS 2 topics: sensor data, commands, state estimates.', status: 'active', user_role: 'Engineer', criticality: 'high' },
    { id: 'ros-4', name: 'Latency & QoS', description: 'Target latency < 50ms for control data. QoS profiles for reliable vs best-effort.', status: 'active', user_role: 'Engineer', criticality: 'high' },
    { id: 'ros-5', name: 'Service Calls', description: 'ROS 2 service interface for request/response operations: calibration, mode changes, config.', status: 'active', user_role: 'Engineer', criticality: 'high' },
  ],

  'skills-runs': [
    { id: 'skr-1', title: 'Define Skill Schema', description: 'Formalize skill definition format: inputs, outputs, preconditions, params.', progress: 40, status: 'active', priority: 'high', owner: 'Jero', due_date: '2026-05-01' },
    { id: 'skr-2', title: 'Implement Run Sequencer', description: 'Build run execution engine that sequences skills with state transitions.', progress: 20, status: 'planned', priority: 'high', owner: 'Jero', due_date: '2026-06-01' },
    { id: 'skr-3', title: 'Basic Grasp Skills', description: 'Implement basic grasp primitives: power grasp, precision pinch, lateral grasp.', progress: 15, status: 'planned', priority: 'critical', owner: 'Jero', due_date: '2026-07-01' },
    { id: 'skr-4', title: 'Automated Run Execution', description: 'Run engine with state transitions, error handling, and retry logic.', progress: 10, status: 'planned', priority: 'high', owner: 'Jero', due_date: '2026-08-01' },
  ],

  'teaching-teleop': [
    { id: 'tt-1', name: 'Kinesthetic Teaching', description: 'Manual guidance of hand to record joint trajectories as demonstration data.', status: 'planned', user_role: 'Engineer', criticality: 'high' },
    { id: 'tt-2', name: 'Glove Teleoperation', description: 'Haptic glove-based teleoperation for intuitive hand control and data capture.', status: 'planned', user_role: 'Operator', criticality: 'high' },
    { id: 'tt-3', name: 'Demonstration Learning', description: 'Learning from demonstration pipeline: capture → segment → learn → replay.', status: 'planned', user_role: 'Engineer', criticality: 'medium' },
    { id: 'tt-4', name: 'Recording Management', description: 'Organize, label, and curate recorded demonstrations for training datasets.', status: 'planned', user_role: 'Engineer', criticality: 'medium' },
  ],

  'data-replay-exports': [
    { id: 'dre-1', name: 'Data Logging', description: 'Continuous logging of all sensor, state, and command data during operation.', status: 'planned', user_role: 'Engineer', criticality: 'high' },
    { id: 'dre-2', name: 'Replay Engine', description: 'Replay recorded data with synchronized visualization and analysis tools.', status: 'planned', user_role: 'Engineer', criticality: 'high' },
    { id: 'dre-3', name: 'Export Formats', description: 'Export data in standard formats: ROS bag, CSV, HDF5 for external analysis.', status: 'planned', user_role: 'Engineer', criticality: 'medium' },
    { id: 'dre-4', name: 'Cloud Backup', description: 'Automated backup of recorded data to cloud storage with retention policies.', status: 'planned', user_role: 'Admin', criticality: 'medium' },
  ],

  'enterprise-integrations': [
    { id: 'ei-1', name: 'SAP S/4HANA', description: 'Integration with SAP for manufacturing execution and resource planning.', status: 'planned', user_role: 'Admin', criticality: 'medium' },
    { id: 'ei-2', name: 'MES/SCADA', description: 'Manufacturing Execution System and SCADA integration for factory floor deployment.', status: 'planned', user_role: 'Admin', criticality: 'high' },
    { id: 'ei-3', name: 'ROS 2 Ecosystem', description: 'Native ROS 2 integration with MoveIt, Nav2, and other standard packages.', status: 'active', user_role: 'Engineer', criticality: 'critical' },
    { id: 'ei-4', name: 'Cloud / Analytics', description: 'Cloud data pipeline for fleet analytics, remote monitoring, OTA updates.', status: 'planned', user_role: 'Admin', criticality: 'medium' },
    { id: 'ei-5', name: 'API Gateway', description: 'REST/gRPC API gateway for third-party integrations and fleet management.', status: 'planned', user_role: 'Admin', criticality: 'high' },
  ],

  /* ================================================================
     GROUP 7 — Operations (empty — populated from Supabase)
     ================================================================ */

  'tasks': [],
  'pilots': [],
  'investors': [],
  'incidents': [],
  'finance': [],
  'milestones': [],
  'supply-chain': [],
}
