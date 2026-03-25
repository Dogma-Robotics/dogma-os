// ─────────────────────────────────────────────────────────────────────────────
// DOGMA OS — Seed Data for all 34 dashboard nodes
// Source: DOGMA_MASTER_DATABASE.md corpus + documented architecture V7.1
// ~600+ rows — exhaustive coverage of every node, subnode, and sub-subnode
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
    { id: 'id-6', name: 'Nuclear Definition', description: 'DOGMA = biomimetic musculoskeletal humanoid hands. Not a robotics company — an act of creation.', maturity_level: 85, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'id-7', name: 'Technical Identity', description: 'Per-DOF independent actuation, per-phalanx tactile sensing, musculoskeletal biomimetic design.', maturity_level: 75, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'id-8', name: 'Philosophical Identity', description: 'Act of creation, genesis, birth of a new robotics form. Body as instrument, not mere machine.', maturity_level: 80, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'id-9', name: 'Accessibility Imperative', description: 'Accessible cost is a founding principle, not an afterthought. $5K arm-hand target vs $300K+ Shadow Hand.', maturity_level: 65, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'id-10', name: 'Future Cognitive Integration', description: 'Future integration of cognitive systems (Active Inference, LLM/VLM) as core differentiator path.', maturity_level: 30, status: 'planned', criticality: 'high', owner: 'Jero' },
  ],

  'philosophy': [
    { id: 'ph-1', name: 'Foundational Thesis', description: 'Logical sequence: músculo → hueso → movimiento → acción. The body as instrument, not mere machine.', maturity_level: 90, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'ph-2', name: 'Act of Creation / Genesis', description: 'The hand as act of creation — genesis narrative where engineering meets philosophy. Birth of new robotics form.', maturity_level: 85, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'ph-3', name: 'Science-Art-Philosophy Integration', description: 'Integration of scientific rigor, artistic expression, and philosophical depth in every decision. Inseparable triad.', maturity_level: 80, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'ph-4', name: 'Biblical/Symbolic Narrative', description: 'Body as temple, breath of life (Ruach), creative hand (Manus Dei). Solemn and academic, not kitsch.', maturity_level: 75, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'ph-5', name: 'Sober Academic Tone', description: 'All communication maintains a sober, elegant, academic voice. No hype, no marketing language, no kitsch.', maturity_level: 95, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'ph-6', name: 'Muscle → Bone → Movement → Action', description: 'Core logic chain: the muscle drives the bone, the bone enables movement, movement enables action. Biomimetic causality.', maturity_level: 90, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'ph-7', name: 'No Separation of Axes', description: 'Technical and philosophical axes cannot be separated. Every engineering decision carries philosophical weight.', maturity_level: 85, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'ph-8', name: 'Symbolic Weight Requirement', description: 'Every name, term, and designation must carry semantic and symbolic weight. No arbitrary naming allowed.', maturity_level: 80, status: 'active', criticality: 'medium', owner: 'Jero' },
  ],

  'naming-semantics': [
    { id: 'ns-1', name: 'Dual Naming System', description: 'Every entity has a conceptual name (symbolic) + technical descriptor (engineering). Both mandatory.', maturity_level: 90, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'ns-2', name: 'DOGMA Genesis — Facsimile Humanum', description: 'Full humanoid platform concept name. CANDIDATO status. Latin: faithful copy of the human.', maturity_level: 70, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'ns-3', name: 'DOGMA Genesis — Manus Biomimetica', description: 'Alternative humanoid name. CANDIDATO status. Latin: biomimetic hand.', maturity_level: 65, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'ns-4', name: 'DOGMA Dextera — Biomimetic Hand V1', description: 'Primary hand subsystem designation. CANDIDATO status. Latin: right hand / skillful hand.', maturity_level: 85, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'ns-5', name: 'DOGMA Ruach — Actuated Hand System', description: 'Pneumatic breath of life powering the muscles. CANDIDATO status. Hebrew: breath/spirit.', maturity_level: 80, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'ns-6', name: 'DOGMA Logos', description: 'Word, reason, rational principle. Greek origin. CANDIDATO status for cognitive subsystem.', maturity_level: 55, status: 'active', criticality: 'low', owner: 'Jero' },
    { id: 'ns-7', name: 'DOGMA Adama', description: 'Earth, human, formed from dust. Hebrew origin. CANDIDATO status for physical body platform.', maturity_level: 55, status: 'active', criticality: 'low', owner: 'Jero' },
    { id: 'ns-8', name: 'Manus Dei', description: 'Hand of God. Latin origin. CANDIDATO status for the complete hand system.', maturity_level: 60, status: 'active', criticality: 'low', owner: 'Jero' },
    { id: 'ns-9', name: 'Etymological Roots', description: 'Latin (Facsimile, Simulacrum, Exemplar, Origo), Greek (Logos), Hebrew (Ruach, Adama). Each carries semantic weight.', maturity_level: 90, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'ns-10', name: 'Language Usage Guide', description: 'Guidelines for when to use conceptual vs technical name in documentation and communication.', maturity_level: 50, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'ns-11', name: 'All Names CANDIDATO Status', description: 'All naming candidates carry CANDIDATO status — none finalized. Selection pending brand consolidation.', maturity_level: 40, status: 'active', criticality: 'medium', owner: 'Jero' },
  ],

  'product-architecture': [
    { id: 'pa-1', name: 'Modular Hierarchy', description: 'Hand → Wrist → Arm → Full Humanoid. Each module independently functional and connectable.', maturity_level: 85, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'pa-2', name: 'V1 — Hand + Wrist', description: 'Current version: 20 DOF hand, 3 DOF wrist, McKibben actuation, tendon transmission, tactile sensing.', maturity_level: 75, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'pa-3', name: 'V2 — Arm Integration', description: '6 DOF arm integration, 1m reach, 15 kg payload. Full arm-hand system at $5K target.', maturity_level: 30, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'pa-4', name: 'Target Applications', description: 'Industry (manufacturing), Medicine (prosthetics), Research (academia), Fine Assembly.', maturity_level: 70, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'pa-5', name: 'Full Humanoid Config', description: 'Two arms + hands, legs, torso, head. $18K estimated target. Arms/hands 28%, legs 33%, torso 22%, head 10%, other 7%.', maturity_level: 15, status: 'planned', criticality: 'medium', owner: 'Jero' },
    { id: 'pa-6', name: 'Correct Palm Design', description: 'Anatomically precise palm structure — a key engineering distinction from competitors.', maturity_level: 70, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'pa-7', name: 'Module Interface Standard', description: 'Standardized mechanical, pneumatic, and electrical interfaces between hand, wrist, and arm modules.', maturity_level: 45, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'pa-8', name: 'Configurations: Left + Right', description: 'Both left and right hand configurations supported through mirrored design.', maturity_level: 50, status: 'active', criticality: 'medium', owner: 'Jero' },
  ],

  /* ================================================================
     GROUP 2 — Engineering
     ================================================================ */

  'hand-engineering': [
    { id: 'he-1', name: 'Mechanical Structure', description: 'Biomimetic hand with anatomically precise finger, palm, and wrist assemblies. 1:1 human replica.', maturity_level: 70, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'he-2', name: '20 Independent DOF', description: '20 degrees of freedom in the hand, each independently actuated by its own McKibben muscle.', maturity_level: 75, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'he-3', name: 'Anatomical Design', description: '1:1 scale replica of human hand anatomy. Bone structure, joint placement, tendon routing all biomimetic.', maturity_level: 65, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'he-4', name: 'Air Supply System', description: 'Compressor and valve manifold providing 4 bar constant operating pressure to McKibben muscles.', maturity_level: 60, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'he-5', name: '1:1 Muscle-Tendon System', description: '1:1 muscle-tendon transmission — each McKibben actuator drives exactly one tendon path. No gear reduction.', maturity_level: 70, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'he-6', name: 'Tactile Sensor Integration', description: '14 tactile sensors (conversational) vs 19 donut-shaped per finger (documented). Conflict to preserve.', maturity_level: 55, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'he-7', name: 'No Joint Encoders', description: 'Design principle: no joint encoders. State estimation via pressure, force, and model inversion.', maturity_level: 80, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'he-8', name: 'Real-Time Force Feedback', description: 'Continuous force feedback from tactile sensor array enabling closed-loop manipulation control.', maturity_level: 55, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'he-9', name: 'Correct Palm Anatomy', description: 'Anatomically correct palm structure with transverse metacarpal arch and thenar/hypothenar eminences.', maturity_level: 60, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'he-10', name: 'Three Subsystem Assemblies', description: 'Hand composed of three assemblies: Finger Assembly, Palm Structure, Wrist Assembly (3-DOF).', maturity_level: 70, status: 'active', criticality: 'high', owner: 'Jero' },
  ],

  'finger-assembly': [
    { id: 'fa-1', name: 'Per-Finger Module', description: 'Each finger is a self-contained module with McKibben actuators, tendon routing, and tactile sensors.', maturity_level: 65, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'fa-2', name: 'Phalanx Structure', description: 'Proximal, middle, and distal phalanges with biomimetic joint articulation. Anatomically faithful bone geometry.', maturity_level: 70, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'fa-3', name: 'Thumb Opposition', description: 'Thumb with opposition capability — critical for grasping and manipulation. Carpometacarpal joint articulation.', maturity_level: 55, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'fa-4', name: 'Tendon Anchor Points', description: 'Anatomically placed tendon insertion points on each phalanx for biomimetic force vectors.', maturity_level: 60, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'fa-5', name: 'Joint Bearings', description: 'Low-friction bearing surfaces at interphalangeal joints for smooth articulation under load.', maturity_level: 50, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'fa-6', name: 'Per-Phalanx Tactile Sensing', description: 'Tactile sensor on each phalanx for distributed contact/force measurement across the finger.', maturity_level: 45, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'fa-7', name: 'Flexor/Extensor Tendon Pairs', description: 'Each finger has flexor and extensor tendon pairs enabling bidirectional actuation.', maturity_level: 65, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'fa-8', name: 'Index/Middle/Ring/Little Fingers', description: 'Four fingers plus thumb, each independently actuated. Different DOF counts per finger.', maturity_level: 60, status: 'active', criticality: 'high', owner: 'Jero' },
  ],

  'palm-structure': [
    { id: 'ps-1', name: 'Rigid Palm Chassis', description: 'Rigid palm structure serving as mounting point for finger assemblies, sensors, and tendon routing.', maturity_level: 70, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'ps-2', name: 'Sensor Mounting Array', description: 'Integrated mounting points for tactile sensors across the palm surface. Contact zone coverage.', maturity_level: 60, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'ps-3', name: 'Tendon Routing Channels', description: 'Internal channels for routing tendons from McKibben muscles through palm to finger joints.', maturity_level: 65, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'ps-4', name: 'Metacarpal Arch', description: 'Curved palm mimicking human transverse metacarpal arch for natural grasp shapes and conformity.', maturity_level: 55, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'ps-5', name: 'Thenar/Hypothenar Zones', description: 'Anatomically placed thenar (thumb base) and hypothenar (little finger base) eminence structures.', maturity_level: 50, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'ps-6', name: 'Wrist Mounting Interface', description: 'Standardized interface plate connecting palm chassis to wrist assembly module.', maturity_level: 60, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'ps-7', name: 'Pneumatic Line Pass-Through', description: 'Channels for pneumatic supply lines from forearm to palm-mounted valve manifold components.', maturity_level: 55, status: 'active', criticality: 'high', owner: 'Jero' },
  ],

  'wrist-assembly': [
    { id: 'wa-1', name: '3-DOF Wrist', description: '3 degrees of freedom: flexion/extension, radial/ulnar deviation, pronation/supination.', maturity_level: 60, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'wa-2', name: 'Hand-Arm Interface', description: 'Mechanical interface connecting hand module to arm module. Designed for modularity.', maturity_level: 50, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'wa-3', name: 'Cable Pass-Through', description: 'Tendon and pneumatic line routing through wrist assembly without interference or binding.', maturity_level: 55, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'wa-4', name: 'Range of Motion', description: 'Biomimetic ROM: ~80 deg flexion/extension, ~30 deg radial/ulnar, ~180 deg pronation/supination.', maturity_level: 45, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'wa-5', name: 'McKibben Wrist Actuation', description: 'Wrist DOFs actuated by dedicated McKibben muscles following same 1:1 muscle-tendon principle.', maturity_level: 50, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'wa-6', name: 'Structural Rigidity', description: 'Wrist must maintain structural rigidity under 15 kg arm payload while allowing full ROM.', maturity_level: 40, status: 'active', criticality: 'high', owner: 'Jero' },
  ],

  'mckibben-actuators': [
    { id: 'mk-1', name: 'Braided PAM', description: 'Braided pneumatic artificial muscles (McKibben type). Contract when pressurized, generating linear force.', maturity_level: 70, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'mk-2', name: 'Operating Pressure', description: '4 bar constant supply nominal operating pressure. Valve manifold controls individual muscle pressures.', maturity_level: 75, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'mk-3', name: 'Contraction Ratio', description: 'Typical 20-25% contraction ratio depending on braid angle and internal pressure level.', maturity_level: 60, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'mk-4', name: 'Muscle-Tendon 1:1', description: 'Each McKibben muscle maps to exactly one tendon. No gear reduction, direct force transmission.', maturity_level: 80, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'mk-5', name: 'Antagonist Pairs', description: 'Flexor/extensor McKibben pairs enabling bidirectional actuation and co-contraction variable stiffness.', maturity_level: 65, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'mk-6', name: 'Pneumatic vs Hydraulic Conflict', description: 'McKibben confirmed pneumatic at 4 bar, but hydraulic variant mentioned in corpus. Conflict to preserve.', maturity_level: 50, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'mk-7', name: 'Inherent Compliance', description: 'McKibben muscles provide inherent compliance — natural back-drivability and safe human interaction.', maturity_level: 70, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'mk-8', name: 'Hysteresis Characteristics', description: 'McKibben muscles exhibit pressure-force hysteresis. M2 must compensate for this nonlinearity.', maturity_level: 55, status: 'active', criticality: 'high', owner: 'Jero' },
  ],

  'tendons': [
    { id: 'tn-1', name: '1:1 Transmission', description: 'One tendon per McKibben muscle. Direct force transmission without gears, pulleys, or reduction.', maturity_level: 75, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'tn-2', name: 'Anatomical Routing', description: 'Anatomically faithful tendon routing through phalanges, palm structure, and wrist.', maturity_level: 65, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'tn-3', name: 'Force Control Primary', description: 'System controlled by tendon forces/tensions, NOT joint angles. Core design principle of DOGMA.', maturity_level: 80, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'tn-4', name: 'Tendon Material', description: 'High-strength low-stretch cable for minimal elastic deformation during force transmission.', maturity_level: 55, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'tn-5', name: 'Slack Detection', description: 'M2 layer detects tendon slack conditions and adjusts preload to maintain taut tendons.', maturity_level: 45, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'tn-6', name: 'Tendon Length as Function of Posture', description: 'Digital twin computes tendon lengths as function of joint posture for state estimation.', maturity_level: 40, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'tn-7', name: 'Length Jacobian', description: 'Jacobian mapping joint angles to tendon lengths. Critical for M3 proprioception inversion.', maturity_level: 45, status: 'active', criticality: 'critical', owner: 'Jero' },
  ],

  'tactile-sensors': [
    { id: 'ts-1', name: '14 Tactile Sensors (Conversational)', description: '14 tactile sensors distributed across hand — primary corpus datum from conversational source.', maturity_level: 60, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'ts-2', name: '19 Donut-Shaped Per Finger (Documented)', description: '19 donut-shaped pneumatic tactile sensors per finger — documented source, higher density.', maturity_level: 40, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'ts-3', name: 'Real-Time Force Feedback', description: 'Continuous force/pressure feedback at high frequency for closed-loop manipulation control.', maturity_level: 55, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'ts-4', name: 'Fingertip Array', description: 'High-density tactile array at fingertips — highest spatial resolution zone for fine manipulation.', maturity_level: 45, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'ts-5', name: 'Air Pressure Transduction', description: 'Donut-shaped sensors use air pressure deformation for contact force measurement.', maturity_level: 50, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'ts-6', name: 'Per-Phalanx Coverage', description: 'Sensor coverage at per-phalanx level across all fingers for distributed tactile feedback.', maturity_level: 45, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'ts-7', name: 'Sensor Count Conflict', description: '14 vs 19 sensors — conversational vs documented. Both preserved as valid data points pending resolution.', maturity_level: 30, status: 'active', criticality: 'high', owner: 'Jero' },
  ],

  'arm-engineering': [
    { id: 'ae-1', name: '6-DOF Arm', description: '6 degrees of freedom, fully actuated robotic arm for the DOGMA platform.', maturity_level: 45, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'ae-2', name: '1 Meter Reach', description: 'Arm reach of 1 meter — matching typical human arm workspace envelope.', maturity_level: 50, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'ae-3', name: '15 kg Payload', description: '15 kg maximum payload capacity beyond arm weight at end-effector.', maturity_level: 45, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'ae-4', name: 'Arm-Hand Integration', description: 'Seamless mechanical, pneumatic, and electrical integration between arm and hand modules.', maturity_level: 35, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'ae-5', name: 'Shoulder Assembly', description: '3-DOF shoulder joint: flexion/extension, abduction/adduction, internal/external rotation.', maturity_level: 30, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'ae-6', name: 'Elbow Assembly', description: '1-DOF elbow joint: flexion/extension. Simple hinge with high torque capacity.', maturity_level: 30, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'ae-7', name: 'Forearm Rotation', description: 'Forearm pronation/supination — part of wrist assembly or separate forearm DOF.', maturity_level: 25, status: 'planned', criticality: 'medium', owner: 'Jero' },
    { id: 'ae-8', name: 'Arm Actuation Method', description: 'Actuation method for arm TBD — McKibben or hybrid. Must support 15 kg payload.', maturity_level: 20, status: 'planned', criticality: 'critical', owner: 'Jero' },
  ],

  'sensing-actuation-control': [
    { id: 'sac-1', name: 'Tactile + Proprioception', description: 'Combined sensing modalities: tactile force feedback and proprioceptive state estimation without encoders.', maturity_level: 55, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'sac-2', name: 'Pneumatic Actuation Primary', description: 'McKibben muscles at 4 bar constant supply as primary actuation method for all hand/wrist DOF.', maturity_level: 70, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'sac-3', name: 'Force-Based Control Paradigm', description: 'Control via tendon forces/tensions, not joint angles. No joint encoders. State estimated from models.', maturity_level: 65, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'sac-4', name: 'BUS SENSORS Architecture', description: 'Signal bus carrying: p (pressure), |F| (force magnitude), x_tac (tactile array) to processing layers.', maturity_level: 55, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'sac-5', name: 'Sensor Data Flow', description: 'Raw sensors → BUS SENSORS → M3 proprioception → M5 fusion → BUS STATE → upper layers.', maturity_level: 50, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'sac-6', name: 'Force → Pressure Conversion', description: 'M2 converts desired tendon forces to pressure setpoints using McKibben inverse model.', maturity_level: 45, status: 'active', criticality: 'critical', owner: 'Jero' },
  ],

  'tactile-sensing': [
    { id: 'tse-1', name: 'Real-Time Force Feedback', description: 'Continuous tactile feedback from sensor array, processed through BUS SENSORS pipeline.', maturity_level: 55, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'tse-2', name: 'Contact Detection', description: 'Binary and analog contact detection for grasp planning and object interaction feedback.', maturity_level: 50, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'tse-3', name: 'Pressure Mapping', description: 'Spatial pressure distribution across fingertips and palm for dexterous manipulation guidance.', maturity_level: 45, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'tse-4', name: 'Slip Detection', description: 'Incipient slip detection from tactile signal rate-of-change analysis. Feeds M6 reflex layer.', maturity_level: 35, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'tse-5', name: 'x_tac Signal Vector', description: 'Tactile array output as x_tac vector on BUS SENSORS — per-sensor force/contact readings.', maturity_level: 45, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'tse-6', name: 'Tactile-Driven Reflexes', description: 'Tactile signals directly drive M6 reflex layer for anti-slip, anti-crush, and freeze responses.', maturity_level: 35, status: 'planned', criticality: 'critical', owner: 'Jero' },
  ],

  'proprioception': [
    { id: 'pr-1', name: 'No Joint Encoders', description: 'State estimation without joint encoders — proprioception derived from pressure, force, and model inversion.', maturity_level: 50, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'pr-2', name: 'theta_hat Estimation', description: 'Estimated joint angle (theta_hat) computed from tendon tension and McKibben inverse model.', maturity_level: 45, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'pr-3', name: 'omega_hat Estimation', description: 'Estimated angular velocity (omega_hat) derived from rate of change of theta_hat with filtering.', maturity_level: 40, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'pr-4', name: 'McKibben Inversion', description: 'Inverse McKibben model: given pressure and force, estimate muscle length → joint angle via Jacobian.', maturity_level: 35, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'pr-5', name: 'Length Jacobian Method', description: 'Uses length Jacobian to map from tendon/muscle lengths to joint angles. Core of M3 layer.', maturity_level: 35, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'pr-6', name: 'Confidence Score per Estimate', description: 'Each theta_hat estimate carries a confidence score based on model agreement and sensor quality.', maturity_level: 30, status: 'planned', criticality: 'high', owner: 'Jero' },
  ],

  'pneumatic-actuation': [
    { id: 'pn-1', name: 'McKibben at 4 Bar', description: 'Pneumatic artificial muscles operating at 4 bar constant nominal pressure supply.', maturity_level: 70, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'pn-2', name: 'Valve Manifold', description: 'Proportional valve manifold for individual muscle pressure control. Per-muscle pressure regulation.', maturity_level: 60, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'pn-3', name: 'Compressor System', description: 'Air compressor providing regulated 4 bar supply to the valve manifold. Constant supply assumption.', maturity_level: 65, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'pn-4', name: 'Pressure Transducers', description: 'Per-muscle pressure transducers for closed-loop pressure control in M1 servo layer.', maturity_level: 55, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'pn-5', name: 'Leak Detection', description: 'Pneumatic leak detection as safety-critical function. Monitored by M0 safety layer.', maturity_level: 40, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'pn-6', name: 'Pressure Venting (Safe-Open)', description: 'Emergency pressure venting to atmosphere on E-stop or fault. All valves open to vent.', maturity_level: 55, status: 'active', criticality: 'critical', owner: 'Jero' },
  ],

  'sensor-fusion': [
    { id: 'sf-1', name: 'EWMA Smoothing', description: 'Exponentially Weighted Moving Average for real-time signal smoothing across all sensor channels.', maturity_level: 60, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'sf-2', name: 'Multi-Modal Fusion', description: 'Fusion of tactile, proprioceptive, pressure, and visual data into unified state representation on BUS STATE.', maturity_level: 45, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'sf-3', name: 'c_hat Contact Estimation', description: 'Estimated contact state (c_hat) fusing tactile force and pressure measurements. Published on BUS STATE.', maturity_level: 40, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'sf-4', name: 'BUS SENSORS Processing', description: 'Signal processing pipeline: filtering, normalization, timestamping of raw p, |F|, x_tac signals.', maturity_level: 50, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'sf-5', name: 'M5 Fusion Observer', description: 'M5 layer fuses all modalities at 60-120 Hz, publishes unified BUS STATE for upper layers.', maturity_level: 40, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'sf-6', name: 'Visual + Proprioceptive Fusion', description: 'Cross-validation of M4 vision estimates with M3 proprioceptive estimates for robust state.', maturity_level: 30, status: 'planned', criticality: 'high', owner: 'Jero' },
  ],

  'specifications': [
    { id: 'sp-1', name: 'Hand: 20 DOF', description: '20 independent degrees of freedom, each actuated by dedicated McKibben muscle via 1:1 tendon.', maturity_level: 80, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'sp-2', name: 'Hand: 14/19 Tactile Sensors', description: '14 sensors (conversational) vs 19 donut-shaped per finger (documented). Both preserved.', maturity_level: 60, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'sp-3', name: 'Arm: 6 DOF, 1m, 15 kg', description: 'Arm: 6 DOF fully actuated, 1 meter reach, 15 kg payload capacity beyond arm weight.', maturity_level: 50, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'sp-4', name: '1:1 Human Replica', description: 'Anatomical fidelity — 1:1 scale replica of human hand and arm structure at bone level.', maturity_level: 70, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'sp-5', name: 'Performance Metrics Pending', description: 'Quantitative performance data pending experimental validation. No measured benchmarks yet.', maturity_level: 15, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'sp-6', name: 'Operating Pressure: 4 Bar', description: '4 bar nominal pneumatic operating pressure for all McKibben actuators. Constant supply.', maturity_level: 80, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'sp-7', name: 'Wrist: 3 DOF', description: 'Wrist with 3 degrees of freedom: flexion/extension, radial/ulnar deviation, pronation/supination.', maturity_level: 60, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'sp-8', name: 'Total Hand+Wrist: 23 DOF', description: '20 DOF hand + 3 DOF wrist = 23 total independently actuated DOF in hand-wrist assembly.', maturity_level: 75, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'sp-9', name: 'Full System: 29 DOF', description: '20 DOF hand + 3 DOF wrist + 6 DOF arm = 29 total DOF in complete arm-hand system.', maturity_level: 50, status: 'active', criticality: 'high', owner: 'Jero' },
  ],

  /* ================================================================
     GROUP 3 — Business
     ================================================================ */

  'costs-pricing': [
    { id: 'cp-1', name: 'Arm-Hand Price', description: '$5,000 USD estimated target price for arm-hand system. ESTIMADO status.', maturity_level: 30, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'cp-2', name: 'Humanoid Price', description: '$18,000 USD estimated target price for full humanoid. ESTIMADO status. Aspirational.', maturity_level: 15, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'cp-3', name: 'Cost Breakdown: Arms/Hands 28%', description: 'Arms + hands: 28% of total humanoid cost ($5,040 of $18K).', maturity_level: 25, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'cp-4', name: 'Cost Breakdown: Legs 33%', description: 'Legs: 33% of total humanoid cost ($5,940). Largest single subsystem cost.', maturity_level: 20, status: 'planned', criticality: 'medium', owner: 'Jero' },
    { id: 'cp-5', name: 'Cost Breakdown: Torso 22%', description: 'Torso: 22% of total humanoid cost ($3,960). Structural and power distribution.', maturity_level: 20, status: 'planned', criticality: 'medium', owner: 'Jero' },
    { id: 'cp-6', name: 'Cost Breakdown: Head 10%', description: 'Head: 10% of total humanoid cost ($1,800). Sensors, cameras, computation.', maturity_level: 15, status: 'planned', criticality: 'low', owner: 'Jero' },
    { id: 'cp-7', name: 'Cost Breakdown: Other 7%', description: 'Other components: 7% of total humanoid cost ($1,260). Wiring, pneumatics, integration.', maturity_level: 15, status: 'planned', criticality: 'low', owner: 'Jero' },
    { id: 'cp-8', name: 'BOM Optimization', description: 'Pneumatic muscles significantly cheaper than precision servo motors — key cost advantage over competition.', maturity_level: 35, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'cp-9', name: 'Price vs Shadow Hand', description: '$5K vs $300K+ Shadow Hand. 60x cost reduction target through McKibben actuator simplicity.', maturity_level: 30, status: 'active', criticality: 'critical', owner: 'Jero' },
  ],

  'market-clients': [
    { id: 'mc-1', company_name: 'Manufacturing Sector', stage: 'prospecting', viability_score: 70, champion_name: 'TBD', risk_level: 'medium' },
    { id: 'mc-2', company_name: 'Medical / Prosthetics', stage: 'prospecting', viability_score: 60, champion_name: 'TBD', risk_level: 'high' },
    { id: 'mc-3', company_name: 'Academic Research', stage: 'prospecting', viability_score: 75, champion_name: 'TBD', risk_level: 'low' },
    { id: 'mc-4', company_name: 'Fine Assembly', stage: 'prospecting', viability_score: 65, champion_name: 'TBD', risk_level: 'medium' },
    { id: 'mc-5', company_name: 'Industrial Automation', stage: 'prospecting', viability_score: 55, champion_name: 'TBD', risk_level: 'medium' },
    { id: 'mc-6', company_name: 'Rehabilitation Engineering', stage: 'prospecting', viability_score: 50, champion_name: 'TBD', risk_level: 'high' },
    { id: 'mc-7', company_name: 'Defense / EOD', stage: 'prospecting', viability_score: 45, champion_name: 'TBD', risk_level: 'high' },
    { id: 'mc-8', company_name: 'Agricultural Robotics', stage: 'prospecting', viability_score: 40, champion_name: 'TBD', risk_level: 'high' },
  ],

  'benchmarks-competition': [
    { id: 'bc-1', name: 'Shadow Hand', description: 'Tendon-driven, 24 DOF. $300K+ price point. Primary benchmark for dexterous manipulation. BENCHMARK CONVERSACIONAL.', maturity_level: 50, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'bc-2', name: 'OpenAI Dactyl', description: 'RL-trained manipulation on Shadow Hand hardware. Software-focused benchmark, not hardware competitor.', maturity_level: 50, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'bc-3', name: 'JSK Lab (University of Tokyo)', description: 'Musculoskeletal humanoid research. Closest technical parallel to DOGMA biomimetic approach.', maturity_level: 50, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'bc-4', name: 'UBTech Walker S2', description: 'Commercial humanoid at ~$16K price point. Motor-driven, limited hand dexterity.', maturity_level: 50, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'bc-5', name: 'Unitree G1', description: 'Commercial humanoid at ~$16K. Motor-driven, focused on locomotion over manipulation.', maturity_level: 50, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'bc-6', name: 'Tesla Optimus', description: 'Full humanoid, motor-driven. High volume target but conventional actuation. No biomimetic approach.', maturity_level: 50, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'bc-7', name: 'Agility Digit', description: 'Warehouse logistics humanoid. Task-specific bipedal platform, not dexterous manipulation focused.', maturity_level: 50, status: 'active', criticality: 'low', owner: 'Jero' },
    { id: 'bc-8', name: 'Ameca (Engineered Arts)', description: 'Expressive humanoid for social interaction. Limited manipulation capability, focused on expression.', maturity_level: 50, status: 'active', criticality: 'low', owner: 'Jero' },
    { id: 'bc-9', name: 'Atlas (Boston Dynamics)', description: 'Advanced full-body humanoid. Hydraulic/electric hybrid. Research platform, not commercial product.', maturity_level: 50, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'bc-10', name: 'NAO (SoftBank Robotics)', description: 'Small educational humanoid. Motor-driven, limited dexterity. Different market segment entirely.', maturity_level: 50, status: 'active', criticality: 'low', owner: 'Jero' },
  ],

  'differentiators': [
    { id: 'df-1', name: 'Biomimetic Musculoskeletal Design', description: 'McKibben muscle actuation vs conventional motors. Compliant, human-like force profiles with inherent safety.', maturity_level: 80, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'df-2', name: 'Tendon-Force Control Paradigm', description: 'Control by tendon forces, not joint angles. No encoders. Unique control philosophy in the field.', maturity_level: 75, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'df-3', name: '1:1 Anatomical Replica', description: 'Faithful 1:1 scale reproduction of human hand anatomy — bone structure, tendon paths, joint placement.', maturity_level: 70, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'df-4', name: 'Price Accessibility', description: '$5K arm-hand vs $300K+ Shadow Hand. Accessible cost through pneumatic muscle simplicity.', maturity_level: 25, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'df-5', name: 'Dual Technical-Philosophical Narrative', description: 'Unique positioning combining engineering depth with symbolic, philosophical branding. No competitor does this.', maturity_level: 85, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'df-6', name: 'Per-DOF Independent Actuation', description: 'Every degree of freedom has its own dedicated McKibben muscle — true independent actuation per DOF.', maturity_level: 75, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'df-7', name: 'Per-Phalanx Tactile Sensing', description: 'Tactile sensor on every phalanx, not just fingertips. Distributed sensing across entire hand surface.', maturity_level: 50, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'df-8', name: 'Future Cognitive System Integration', description: 'Architecture designed for future Active Inference / LLM cognitive integration. M7-M9 pathway.', maturity_level: 25, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'df-9', name: 'Anatomical Fidelity at Accessible Cost', description: 'The intersection of high anatomical fidelity AND accessible pricing — no competitor occupies this space.', maturity_level: 30, status: 'active', criticality: 'critical', owner: 'Jero' },
  ],

  /* ================================================================
     GROUP 4 — Brand & Documentation
     ================================================================ */

  'branding-narrative': [
    { id: 'bn-1', name: 'Sober Academic Tone', description: 'All communications use sober, elegant, academic voice. No marketing hype. No kitsch.', maturity_level: 90, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'bn-2', name: 'Latin-Greek-Hebrew Roots', description: 'Naming draws from Latin (Dextera, Manus, Facsimile), Greek (Logos), Hebrew (Ruach, Adama).', maturity_level: 85, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'bn-3', name: 'Genesis Narrative', description: 'Creation narrative: the hand as act of creation, body as temple, breath as life (Ruach). Birth of new form.', maturity_level: 80, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'bn-4', name: 'Visual & Aesthetic Guide', description: 'Dark, clinical aesthetic. Minimal chrome. Engineering diagrams as art. Sober elegance.', maturity_level: 50, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'bn-5', name: 'Brand Consistency', description: 'Every public artifact must reflect the dual nature: technical depth + philosophical weight.', maturity_level: 75, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'bn-6', name: 'Symbolic Naming Weight', description: 'Each name (Dextera, Ruach, Logos, Adama) carries specific semantic weight and intention. Not decorative.', maturity_level: 80, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'bn-7', name: 'No Kitsch Principle', description: 'Strict prohibition on kitsch, hype, or superficial symbolic usage. All references must be earned.', maturity_level: 90, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'bn-8', name: 'Engineering as Art', description: 'Technical documentation and diagrams treated as aesthetic artifacts. Engineering beauty as brand value.', maturity_level: 60, status: 'active', criticality: 'medium', owner: 'Jero' },
  ],

  'documentation': [
    { id: 'dc-1', name: 'Foundational Ontology', description: 'DOGMA Master Database — 34-node hierarchical knowledge architecture. Primary corpus document.', maturity_level: 80, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'dc-2', name: 'Engineering Documentation', description: 'Mechanical design docs: hand, arm, McKibben, tendons, sensors. In development.', maturity_level: 40, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'dc-3', name: 'Control Architecture V7.1', description: 'M0-M9 control module specifications, bus definitions, signal flow. Documented architecture version 7.1.', maturity_level: 65, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'dc-4', name: 'HMI Application Docs', description: 'Control OS v1.0 user documentation, page specifications, component reference.', maturity_level: 35, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'dc-5', name: 'API Reference', description: 'ROS 2 topic/service API reference for developers integrating with DOGMA platform.', maturity_level: 25, status: 'planned', criticality: 'medium', owner: 'Jero' },
    { id: 'dc-6', name: 'Digital Twin Model Docs', description: 'Tendon length functions, Length Jacobian, dynamic equation, ligament compliance models.', maturity_level: 35, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'dc-7', name: 'Active Inference Theory Paper', description: 'Theoretical framework documentation: free energy, epistemic actions, quantum-like mode selector. HIPOTESIS.', maturity_level: 30, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'dc-8', name: 'Corpus Source: dogma_master_prompt', description: 'Primary conversational corpus: dogma_master_prompt_profesional.txt. Foundation of all knowledge.', maturity_level: 85, status: 'active', criticality: 'critical', owner: 'Jero' },
  ],

  'roadmap-versions': [
    { id: 'rv-1', title: 'Phase 1: Sensors + M0 Safety', progress: 30, due_date: '2026-05-01', status: 'active', owner: 'Jero' },
    { id: 'rv-2', title: 'Phase 2: M1 Pressure Servo', progress: 15, due_date: '2026-06-01', status: 'planned', owner: 'Jero' },
    { id: 'rv-3', title: 'Phase 3: Calibration + M2 Force/Impedance', progress: 10, due_date: '2026-08-01', status: 'planned', owner: 'Jero' },
    { id: 'rv-4', title: 'Phase 4: M3 Proprioception', progress: 5, due_date: '2026-09-01', status: 'planned', owner: 'Jero' },
    { id: 'rv-5', title: 'Phase 5: M5 Fusion Observer', progress: 5, due_date: '2026-10-01', status: 'planned', owner: 'Jero' },
    { id: 'rv-6', title: 'Phase 6: M6 Reflex Layer', progress: 0, due_date: '2026-11-01', status: 'planned', owner: 'Jero' },
    { id: 'rv-7', title: 'Phase 7: M7 Policy Layer', progress: 0, due_date: '2027-01-01', status: 'planned', owner: 'Jero' },
    { id: 'rv-8', title: 'Phase 8: M8 Language/Skills', progress: 0, due_date: '2027-03-01', status: 'planned', owner: 'Jero' },
    { id: 'rv-9', title: 'Phase 9: M9 Meta-Supervisor', progress: 0, due_date: '2027-05-01', status: 'planned', owner: 'Jero' },
    { id: 'rv-10', title: 'V1 Hand + Wrist Complete', progress: 65, due_date: '2026-06-01', status: 'active', owner: 'Jero' },
    { id: 'rv-11', title: 'V2 Arm Integration', progress: 15, due_date: '2026-12-01', status: 'planned', owner: 'Jero' },
    { id: 'rv-12', title: 'Control OS v3', progress: 40, due_date: '2026-09-01', status: 'active', owner: 'Jero' },
    { id: 'rv-13', title: 'Full Humanoid Prototype', progress: 5, due_date: '2027-06-01', status: 'planned', owner: 'Jero' },
  ],

  'community-education': [
    { id: 'ce-1', name: 'Academic Potential', description: 'University partnerships for biomimetic robotics research and student projects.', maturity_level: 20, status: 'planned', criticality: 'medium', owner: 'Jero' },
    { id: 'ce-2', name: 'Industrial Pilots', description: 'Pilot programs with manufacturing companies for real-world validation and market testing.', maturity_level: 15, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'ce-3', name: 'Research Collaborations', description: 'Potential collaborations with musculoskeletal robotics labs (JSK Lab, similar groups).', maturity_level: 10, status: 'planned', criticality: 'medium', owner: 'Jero' },
    { id: 'ce-4', name: 'Open Source Components', description: 'Selective open-source release of non-core components for community building and adoption.', maturity_level: 5, status: 'planned', criticality: 'low', owner: 'Jero' },
    { id: 'ce-5', name: 'Educational Documentation', description: 'Technical documentation suitable for university courses in biomimetic robotics.', maturity_level: 10, status: 'planned', criticality: 'medium', owner: 'Jero' },
    { id: 'ce-6', name: 'Workshop / Training Programs', description: 'Hands-on workshops for operator training and engineer certification on DOGMA platform.', maturity_level: 5, status: 'planned', criticality: 'low', owner: 'Jero' },
  ],

  'risks-validations': [
    { id: 'rk-1', name: 'Unvalidated Performance Claims', description: 'Performance claims (DOF, force, speed) are design targets, not experimentally validated. Critical gap.', maturity_level: 40, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'rk-2', name: 'Conversational Benchmarks', description: 'Competitor comparisons are informal/conversational, not rigorous technical benchmarks. BENCHMARK CONVERSACIONAL.', maturity_level: 35, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'rk-3', name: 'McKibben Fatigue Life', description: 'McKibben muscle fatigue life under repeated cycling at 4 bar. No durability data available.', maturity_level: 20, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'rk-4', name: 'Tendon Wear Risk', description: 'Tendon wear and fraying at routing points under sustained operation. Material validation needed.', maturity_level: 25, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'rk-5', name: 'Air Leak Management', description: 'Pneumatic system leak management at scale. Cumulative leaks degrade performance.', maturity_level: 30, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'rk-6', name: 'Market Demand Unproven', description: 'No validated market demand for biomimetic hand at $5K. Competition from motor-driven alternatives.', maturity_level: 20, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'rk-7', name: 'Active Inference Unvalidated', description: 'Active Inference framework listed as HIPOTESIS. No experimental validation. Proposed vs validated.', maturity_level: 15, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'rk-8', name: 'Sensor Reliability at Scale', description: 'Pneumatic tactile sensor reliability under production conditions. No long-term data.', maturity_level: 20, status: 'active', criticality: 'high', owner: 'Jero' },
  ],

  'open-questions': [
    { id: 'oq-1', name: 'Sensor Count Discrepancy', description: '14 sensors (conversational) vs 19 donut-shaped per finger (documented). Needs definitive resolution.', maturity_level: 30, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'oq-2', name: 'McKibben Type: Pneumatic vs Hydraulic', description: 'Pneumatic confirmed at 4 bar, but hydraulic variant mentioned in corpus. Need definitive specification.', maturity_level: 35, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'oq-3', name: 'Active Inference Status', description: 'Active Inference framework: HIPOTESIS status. No experimental validation. Proposed vs implemented gap.', maturity_level: 20, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'oq-4', name: 'Measured Performance Data', description: 'No experimentally measured performance data exists. All specs are design targets.', maturity_level: 10, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'oq-5', name: 'DOF Discrepancy: 27 vs 20', description: 'Hand described as 27 DOF (total mechanical) vs 20 DOF (independently actuated). Both may be correct.', maturity_level: 25, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'oq-6', name: 'Arm Actuation Method', description: 'Arm actuation not specified: McKibben muscles or different actuator type? Must support 15 kg.', maturity_level: 15, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'oq-7', name: 'Formalized vs Implemented Gap', description: 'Control architecture V7.1 is formalized/documented but not implemented. Gap between design and reality.', maturity_level: 30, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'oq-8', name: 'Conversational vs Documented Versions', description: 'Multiple data points have conversational vs documented versions. Both preserved per governance rules.', maturity_level: 40, status: 'active', criticality: 'high', owner: 'Jero' },
  ],

  'sources-traceability': [
    { id: 'st-1', name: 'Conversational Corpus', description: 'Primary source: dogma_master_prompt_profesional.txt — foundational knowledge from Jero.', maturity_level: 85, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'st-2', name: 'Architecture Documents', description: 'ARCHITECTURE.md, MIGRATION.md — system architecture and migration specifications.', maturity_level: 80, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'st-3', name: 'Source Code', description: 'nodes.ts, types.ts, theme.ts, seed-data.ts — codebase as source of truth for system structure.', maturity_level: 90, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'st-4', name: 'Confidence Markers', description: 'Certainty levels: CONFIRMADO, DOCUMENTADO, ESTIMADO, CANDIDATO, HIPOTESIS, BENCHMARK CONVERSACIONAL.', maturity_level: 85, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'st-5', name: 'Control Architecture V7.1', description: 'Documented control architecture version 7.1 — M0-M9 hierarchy, buses, signal flow.', maturity_level: 75, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'st-6', name: 'Conflict Preservation Rule', description: 'Conflicting data points are preserved as-is, not resolved. Both versions documented with source.', maturity_level: 80, status: 'active', criticality: 'high', owner: 'Jero' },
  ],

  'data-governance': [
    { id: 'dg-1', name: 'Versioning Protocol', description: 'Master database version tracking. Current: v1.0. Update on structural changes.', maturity_level: 40, status: 'active', criticality: 'medium', owner: 'Jero' },
    { id: 'dg-2', name: 'Update Process', description: 'Formal process: validate source → update confidence markers → log change → preserve conflicts.', maturity_level: 30, status: 'planned', criticality: 'medium', owner: 'Jero' },
    { id: 'dg-3', name: 'Maintenance Roles', description: 'Data steward responsibilities: Jero as primary maintainer, future delegation plan.', maturity_level: 25, status: 'planned', criticality: 'low', owner: 'Jero' },
    { id: 'dg-4', name: 'Data Validation Rules', description: 'All numeric specs require confidence markers. No datum enters DB without source attribution.', maturity_level: 45, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'dg-5', name: 'Conflict Preservation Protocol', description: 'When data conflicts exist (e.g. 14 vs 19 sensors), both versions must be preserved with source tags.', maturity_level: 50, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'dg-6', name: 'No Invention Rule', description: 'Data must come from corpus. No data may be invented or inferred beyond what is documented.', maturity_level: 85, status: 'active', criticality: 'critical', owner: 'Jero' },
  ],

  /* ================================================================
     GROUP 5 — Control Architecture
     ================================================================ */

  'control-modules': [
    { id: 'cm-1', name: 'M0-M9 Hierarchy (V7.1)', description: 'Hierarchical control from Safety (1-5kHz) to Meta-Supervisor (0.1Hz). 10 layers. Documented architecture V7.1.', rate_hz: 0, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'cm-2', name: 'BUS SENSORS', description: 'Signal bus carrying raw sensor data: p (pressure), |F| (force magnitude), x_tac (tactile array).', rate_hz: 1000, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'cm-3', name: 'BUS STATE', description: 'Fused state bus: theta_hat (angle), omega_hat (velocity), c_hat (contact), T_obj_hat (object torque), w_hat (weight).', rate_hz: 500, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'cm-4', name: 'BUS COMMANDS', description: 'Command bus: p* (pressure ref), F* (force ref), K* (stiffness), D* (damping), SkillCmd, meta-actions.', rate_hz: 200, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'cm-5', name: 'BUS LIMITS', description: 'Safety bus: p_max, F_max, slew limits, fault flags, emergency stop signals.', rate_hz: 5000, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'cm-6', name: 'Frequency Hierarchy', description: 'M0: 1-5kHz, M1: 500-1000Hz, M2: 200-500Hz, M3: 100-300Hz, M4: 30Hz, M5: 60-120Hz, M6: 100-300Hz, M7: 10-30Hz, M8: 0.5-5Hz, M9: 0.1-1Hz.', rate_hz: 0, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'cm-7', name: 'Data Flow Direction', description: 'Bottom-up: sensors → M0 → M1 → M2 → M3/M4 → M5 → M6 → M7 → M8 → M9. Top-down commands reverse.', rate_hz: 0, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'cm-8', name: 'Implementation Order', description: 'Implementation sequence: sensors+M0 → M1 → calibration+M2 → M3 → M5 → M6 → M7 → M8 → M9.', rate_hz: 0, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'cm-9', name: 'M0 Override All Principle', description: 'M0 Safety can override any other module at any time. Highest priority, cannot be bypassed.', rate_hz: 5000, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'cm-10', name: 'M2 Is THE REAL CONTROL', description: 'M2 Force/Impedance is identified as THE REAL CONTROL — the actual manipulation control layer.', rate_hz: 500, status: 'active', criticality: 'critical', owner: 'Jero' },
  ],

  'm0-safety': [
    { id: 'm0-1', name: 'Safety Supervisor', description: 'Hardware safety layer with maximum priority override. Runs at 1-5 kHz. Overrides all other modules.', rate_hz: 5000, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm0-2', name: 'Overpressure Monitor', description: 'Monitors all pressure channels for exceeding p_max safe limits. Triggers safe-open on violation.', rate_hz: 5000, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm0-3', name: 'Overtension Monitor', description: 'Monitors tendon tensions for exceeding F_max limits. Prevents tendon breakage or structural damage.', rate_hz: 5000, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm0-4', name: 'Leak Detection', description: 'Detects pneumatic leaks through pressure decay monitoring. Triggers safety response on detection.', rate_hz: 5000, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm0-5', name: 'Jam Detection', description: 'Detects mechanical jams where pressure increases but no motion occurs. Prevents actuator damage.', rate_hz: 5000, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm0-6', name: 'Crush Prevention', description: 'Monitors grip force against object-adaptive thresholds to prevent crushing objects or injury.', rate_hz: 5000, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm0-7', name: 'E-Stop', description: 'Emergency stop — safe-open all valves, vent pressure, lock actuators. Hardware + software paths.', rate_hz: 5000, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm0-8', name: 'Watchdog Timer', description: 'Hardware watchdog detecting communication loss, control loop failure, or software hang.', rate_hz: 5000, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm0-9', name: 'Safe-State Definition', description: 'All valves open, pressure vented to atmosphere, system in known safe configuration upon any fault.', rate_hz: 5000, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm0-10', name: 'RT Microcontroller Target', description: 'M0 runs on dedicated RT microcontroller for deterministic timing. No GPU needed for hard safety loop.', rate_hz: 5000, status: 'planned', criticality: 'critical', owner: 'Jero' },
  ],

  'm1-pressure': [
    { id: 'm1-1', name: 'Pressure Servo Loop', description: 'Closed-loop pressure control for each McKibben muscle. Follows p* references from M2. 500-1000 Hz.', rate_hz: 1000, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm1-2', name: 'PID/PI Controller', description: 'PID or PI controller with anti-windup for pressure regulation per muscle channel.', rate_hz: 1000, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm1-3', name: 'Anti-Windup Protection', description: 'Integrator anti-windup for pressure PID to prevent actuator saturation and overshoot.', rate_hz: 1000, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm1-4', name: 'Valve Command Output', description: 'Proportional valve commands generated from pressure error signal. Per-muscle output.', rate_hz: 1000, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm1-5', name: 'Pressure Sensor Input', description: 'Reads per-muscle pressure transducers for feedback. Input to PID error computation.', rate_hz: 1000, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm1-6', name: 'p* Reference Tracking', description: 'Tracks pressure setpoint references (p*) from M2 force/impedance layer. Servo follows target.', rate_hz: 1000, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm1-7', name: 'RT Microcontroller Target', description: 'M1 runs on RT microcontroller alongside M0. Deterministic timing guaranteed ≤1ms loop.', rate_hz: 1000, status: 'planned', criticality: 'critical', owner: 'Jero' },
  ],

  'm2-force-impedance': [
    { id: 'm2-1', name: 'THE REAL CONTROL Layer', description: 'M2 is THE REAL CONTROL — regulates |F| per tendon via pressure. 200-500 Hz. Core manipulation layer.', rate_hz: 500, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm2-2', name: 'Force Regulation per Tendon', description: 'Regulates absolute force |F| on each tendon. Converts force objectives to pressure setpoints for M1.', rate_hz: 500, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm2-3', name: 'Impedance via Preload/Gains', description: 'Controls impedance (stiffness/damping) through preload adjustment and gain scheduling.', rate_hz: 500, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm2-4', name: 'Slack Detection', description: 'Detects tendon slack conditions. Adjusts preload to maintain taut tendons for reliable control.', rate_hz: 500, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm2-5', name: 'Hysteresis Compensation', description: 'Compensates for McKibben pressure-force hysteresis nonlinearity in force-to-pressure conversion.', rate_hz: 500, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm2-6', name: 'Force → Pressure Conversion', description: 'Inverse McKibben model converting desired tendon force to required muscle pressure setpoint.', rate_hz: 500, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm2-7', name: 'Co-Contraction Stiffness', description: 'Variable stiffness via co-contraction of antagonist McKibben pairs. K* and D* from M7.', rate_hz: 500, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm2-8', name: 'Receives F*, K*, D* from M7', description: 'Input: force objectives (F*), desired stiffness (K*), desired damping (D*) from policy layer M7.', rate_hz: 500, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm2-9', name: 'RT Guarantee ≤2ms', description: 'M2 requires real-time guarantee ≤2ms loop time. Runs on embedded GPU computer.', rate_hz: 500, status: 'planned', criticality: 'critical', owner: 'Jero' },
  ],

  'm3-proprioception': [
    { id: 'm3-1', name: 'Joint State Estimation', description: 'Estimates joint angles (theta_hat) and velocities (omega_hat) without joint encoders. 100-300 Hz.', rate_hz: 300, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm3-2', name: 'McKibben Inversion Model', description: 'Inverse McKibben model: given pressure and force, estimates muscle length for state computation.', rate_hz: 300, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm3-3', name: 'Length Jacobian', description: 'Jacobian mapping muscle/tendon lengths to joint angles. Core mathematical tool of M3.', rate_hz: 300, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm3-4', name: 'theta_hat + Confidence', description: 'Produces estimated joint angle (theta_hat) with per-estimate confidence score.', rate_hz: 300, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm3-5', name: 'State Publisher to BUS STATE', description: 'Publishes theta_hat and omega_hat to BUS STATE for consumption by M5 fusion and upper layers.', rate_hz: 300, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm3-6', name: 'Calibration Correction', description: 'Online calibration drift correction using periodic reference measurements and vision cross-check.', rate_hz: 300, status: 'planned', criticality: 'medium', owner: 'Jero' },
    { id: 'm3-7', name: 'Embedded GPU Computer Target', description: 'M3 runs on embedded GPU computer (shared with M2-M7). Sufficient compute for model inversion.', rate_hz: 300, status: 'planned', criticality: 'high', owner: 'Jero' },
  ],

  'm4-vision': [
    { id: 'm4-1', name: 'Camera Pose Estimation', description: 'Camera-based pose estimation for workspace objects. 30 Hz frame rate. Visual confidence output.', rate_hz: 30, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm4-2', name: 'Object Tracking', description: 'Continuous tracking of objects in workspace. Provides T_obj (object pose) to M5 fusion.', rate_hz: 30, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm4-3', name: 'Visual Confidence Score', description: 'Per-frame visual confidence metric based on detection quality, occlusion, and tracking stability.', rate_hz: 30, status: 'planned', criticality: 'medium', owner: 'Jero' },
    { id: 'm4-4', name: 'Hand Visual Tracking', description: 'Visual tracking of hand/finger positions for cross-validation with M3 proprioceptive estimates.', rate_hz: 30, status: 'planned', criticality: 'medium', owner: 'Jero' },
    { id: 'm4-5', name: 'Camera-Hand Extrinsics', description: 'Calibrated camera-to-hand transformation matrix. Maintained by Calibration Lab.', rate_hz: 0, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm4-6', name: 'Workspace Scene Understanding', description: 'Scene-level understanding: object identities, spatial relationships, affordances for grasp planning.', rate_hz: 30, status: 'planned', criticality: 'medium', owner: 'Jero' },
  ],

  'm5-fusion': [
    { id: 'm5-1', name: 'Fusion Observer', description: 'Fuses all modalities (tactile, proprioceptive, pressure, visual) at 60-120 Hz. Publishes BUS STATE.', rate_hz: 120, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm5-2', name: 'BUS STATE Publisher', description: 'Publishes fused state: theta_hat, omega_hat, c_hat, T_obj_hat, w_hat, scene, memory.', rate_hz: 120, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm5-3', name: 'Fused Pose Estimation', description: 'Combined pose estimate from M3 proprioception + M4 vision. Weighted by confidence scores.', rate_hz: 120, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm5-4', name: 'Fused Velocity Estimation', description: 'Angular velocity (omega_hat) from differentiated fused pose with temporal filtering.', rate_hz: 120, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm5-5', name: 'Contact State Fusion', description: 'Fused contact state (c_hat) combining tactile, force, and proximity data.', rate_hz: 120, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm5-6', name: 'Scene Memory', description: 'Maintains temporal memory of scene state for prediction and planning by upper layers.', rate_hz: 120, status: 'planned', criticality: 'medium', owner: 'Jero' },
    { id: 'm5-7', name: 'T_obj_hat + w_hat Estimation', description: 'Estimates object torque (T_obj_hat) and weight/stiffness (w_hat) from combined sensing.', rate_hz: 120, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm5-8', name: 'Confidence Scoring per State', description: 'Per-variable confidence score based on sensor agreement, model consistency, and temporal stability.', rate_hz: 120, status: 'planned', criticality: 'medium', owner: 'Jero' },
  ],

  'm6-reflex': [
    { id: 'm6-1', name: 'Reflex Layer', description: 'Fast reflexive responses at 100-300 Hz. Tactile-driven. Cannot violate M0 safety envelope.', rate_hz: 300, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm6-2', name: 'Anti-Slip Reflex', description: 'Detects incipient slip from tactile rate-of-change, triggers grip force increase. Sub-2ms target.', rate_hz: 300, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm6-3', name: 'Anti-Crush Reflex', description: 'Prevents excessive grip force. Monitors force vs object-adaptive thresholds from w_hat.', rate_hz: 300, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm6-4', name: 'Freeze Reflex', description: 'Freezes all motion on unexpected contact or collision detection. Maintains current state.', rate_hz: 300, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm6-5', name: 'Fast Force Adjustments', description: 'Rapid force corrections based on real-time tactile feedback. Adjusts within reflex latency budget.', rate_hz: 300, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm6-6', name: 'Tactile-Driven Architecture', description: 'All reflexes driven by tactile sensor signals (x_tac). Direct sensor-to-actuator pathway.', rate_hz: 300, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm6-7', name: 'M0 Safety Envelope Respect', description: 'Reflex actions always respect M0 safety envelope. Cannot override safety limits.', rate_hz: 300, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm6-8', name: 'Impact Detection + Retraction', description: 'Detects sudden impact forces, triggers protective retraction or compliance increase.', rate_hz: 300, status: 'planned', criticality: 'high', owner: 'Jero' },
  ],

  'm7-policy': [
    { id: 'm7-1', name: 'Policy Execution Layer', description: 'Decides desired tensions/stiffnesses at 10-30 Hz. Produces preload, F*, K*, D* objectives.', rate_hz: 30, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm7-2', name: 'Force Objective Generation', description: 'Generates per-tendon force objectives (F*) based on task context and learned policy.', rate_hz: 30, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm7-3', name: 'Stiffness/Damping Control', description: 'Sets desired stiffness (K*) and damping (D*) for each DOF. Adaptive compliance.', rate_hz: 30, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm7-4', name: 'RL / Behavioral Cloning', description: 'Can use reinforcement learning or behavioral cloning for policy generation.', rate_hz: 30, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm7-5', name: 'Active Inference Policy', description: 'Active Inference as alternative policy framework. Free energy minimization. HIPOTESIS status.', rate_hz: 30, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm7-6', name: 'Grasp Policy', description: 'Autonomous grasp planning and execution from object pose, shape, and material estimates.', rate_hz: 30, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm7-7', name: 'Policy Switching', description: 'Online switching between policies based on task context, M5 fusion state, and M9 directives.', rate_hz: 10, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm7-8', name: 'Output to M6 → M2 → M1', description: 'Policy output flows through M6 (reflex check) → M2 (force control) → M1 (pressure servo). Under M0.', rate_hz: 30, status: 'planned', criticality: 'critical', owner: 'Jero' },
  ],

  'm8-language': [
    { id: 'm8-1', name: 'Language/Skills Interface', description: 'Converts language/UI/voice to task objectives at 0.5-5 Hz. Event-driven, not continuous.', rate_hz: 5, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm8-2', name: 'Natural Language Input', description: 'Accepts natural language commands and converts to structured skill/task sequences.', rate_hz: 5, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm8-3', name: 'LLM/VLM Integration', description: 'Uses LLM (language) and VLM (vision-language) models for complex task decomposition.', rate_hz: 1, status: 'planned', criticality: 'medium', owner: 'Jero' },
    { id: 'm8-4', name: 'Skill Invocation', description: 'Maps parsed commands to Skills Library entries with parameter binding and sequencing.', rate_hz: 5, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm8-5', name: 'UI Command Processing', description: 'Processes structured commands from Control OS UI — button clicks, form submissions, gestures.', rate_hz: 5, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm8-6', name: 'Voice Command Processing', description: 'Voice-to-text-to-task pipeline for hands-free operation in industrial settings.', rate_hz: 1, status: 'planned', criticality: 'medium', owner: 'Jero' },
    { id: 'm8-7', name: 'Output Through M7 Path', description: 'M8 output goes through M7 → M6 → M2 → M1 under M0. Never bypasses control hierarchy.', rate_hz: 5, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm8-8', name: 'External Server Target', description: 'M8 runs on external server (not real-time). LLM inference requires GPU server, not embedded.', rate_hz: 1, status: 'planned', criticality: 'medium', owner: 'Jero' },
  ],

  'm9-meta-supervisor': [
    { id: 'm9-1', name: 'Meta-Supervisor', description: 'System-level orchestrator at 0.1-1 Hz, event-driven. Highest abstraction, lowest frequency.', rate_hz: 1, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm9-2', name: 'Skill Priority Reconfiguration', description: 'Reconfigures skill priorities based on task context, performance, and operator directives.', rate_hz: 1, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm9-3', name: 'Precision Weight Adjustment', description: 'Adjusts precision weights in M5 fusion based on sensor reliability and environmental conditions.', rate_hz: 0.1, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm9-4', name: 'Reflex Threshold Tuning', description: 'Reconfigures M6 reflex thresholds based on task requirements (e.g., delicate vs robust manipulation).', rate_hz: 0.1, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm9-5', name: 'Replan / Probe / Recalibration', description: 'Triggers replanning, diagnostic probes, or recalibration when performance degrades.', rate_hz: 0.1, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm9-6', name: 'Mode Manager', description: 'Manages system operation modes: Idle, Manual, Teleop, Autonomous, Calibration, E-Stop.', rate_hz: 1, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'm9-7', name: 'System Health Monitoring', description: 'Monitors overall system health, resource utilization, and performance metrics across all modules.', rate_hz: 0.1, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'm9-8', name: 'Meta-Actions Output', description: 'Produces meta-actions on BUS COMMANDS: mode changes, recalibration triggers, priority adjustments.', rate_hz: 1, status: 'planned', criticality: 'high', owner: 'Jero' },
  ],

  'state-estimation': [
    { id: 'se-1', name: 'theta_hat (Joint Angle)', description: 'Estimated joint angle from tendon tension and McKibben inverse model. No encoder. Published on BUS STATE.', rate_hz: 300, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'se-2', name: 'omega_hat (Angular Velocity)', description: 'Estimated angular velocity from theta_hat differentiation with EWMA filtering.', rate_hz: 300, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'se-3', name: 'c_hat (Contact State)', description: 'Estimated contact: binary detection + force magnitude from tactile array. Critical for reflex and grasping.', rate_hz: 500, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'se-4', name: 'T_obj_hat (Object Torque)', description: 'Estimated torque applied to grasped object from combined force measurements across contact points.', rate_hz: 120, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'se-5', name: 'w_hat (Object Properties)', description: 'Estimated weight and stiffness of held object for adaptive grasping and manipulation control.', rate_hz: 120, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'se-6', name: 'EWMA Smoothing', description: 'Exponentially Weighted Moving Average applied to all state estimates for noise rejection.', rate_hz: 1000, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'se-7', name: 'BUS STATE Publisher', description: 'Publishes all estimated state variables on BUS STATE at M5 fusion rate for upper control layers.', rate_hz: 120, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'se-8', name: 'p (Pressure) on BUS SENSORS', description: 'Raw per-muscle pressure readings from transducers. Input to M1 and M3.', rate_hz: 1000, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'se-9', name: '|F| (Force) on BUS SENSORS', description: 'Raw tendon force magnitudes from force sensors. Input to M2 force control.', rate_hz: 1000, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'se-10', name: 'x_tac (Tactile) on BUS SENSORS', description: 'Raw tactile array readings from all tactile sensors. Input to M6 reflex and M5 fusion.', rate_hz: 1000, status: 'planned', criticality: 'critical', owner: 'Jero' },
  ],

  'safety-reflexes': [
    { id: 'sr-1', name: 'M0 Safety Layer', description: 'Highest priority hardware safety. Overrides all other modules. 1-5 kHz. Cannot be bypassed.', rate_hz: 5000, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'sr-2', name: 'M6 Reflex Layer', description: 'Fast reflexive responses to tactile events: anti-slip, anti-crush, freeze, force adjustments. 100-300 Hz.', rate_hz: 300, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'sr-3', name: 'BUS LIMITS Definition', description: 'Safety bus carrying: p_max, F_max, slew limits, fault flags. Continuously monitored by M0.', rate_hz: 5000, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'sr-4', name: 'Emergency Stop Protocols', description: 'E-Stop: vent all pressure, safe-open valves, enter safe state. Both hardware button and software paths.', rate_hz: 5000, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'sr-5', name: 'Reflex Arc Latency Target', description: 'Target reflex latency < 2ms from sensor event to actuator response for M0/M6 pathways.', rate_hz: 500, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'sr-6', name: 'Zone Freeze Capability', description: 'Ability to freeze specific zones (individual fingers, wrist, arm) while others continue operating.', rate_hz: 300, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'sr-7', name: 'Safety Supervisor Visualization', description: 'Real-time visualization of safety state in Control OS Safety & Diagnostics page.', rate_hz: 60, status: 'planned', criticality: 'high', owner: 'Jero' },
  ],

  'digital-twin': [
    { id: 'dt-1', name: 'Tendon Lengths as f(posture)', description: 'Digital twin computes tendon lengths as function of joint posture for state estimation and simulation.', rate_hz: 100, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'dt-2', name: 'Length Jacobian Model', description: 'Jacobian mapping joint angles to tendon lengths. Used by M3 for proprioceptive inversion.', rate_hz: 100, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'dt-3', name: 'Tendon Torques Computation', description: 'Computes joint torques from tendon forces via moment arms and routing geometry.', rate_hz: 100, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'dt-4', name: 'Ligament/Passive Compliance', description: 'Models passive joint compliance from ligaments and joint capsules. Affects equilibrium posture.', rate_hz: 100, status: 'planned', criticality: 'medium', owner: 'Jero' },
    { id: 'dt-5', name: 'Contact Torque Model', description: 'Models external torques from object contact. Integrates with tactile sensing for force estimation.', rate_hz: 100, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'dt-6', name: 'Dynamic Equation', description: 'Full dynamic equation of motion for hand: inertia, Coriolis, gravity, tendon, ligament, contact terms.', rate_hz: 100, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'dt-7', name: 'Emergent Movement Integration', description: 'Movement emerges from interaction of all forces — not commanded at joint level. Biomimetic principle.', rate_hz: 100, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'dt-8', name: 'Three.js 3D Visualization', description: '3D visualization in Control OS using Three.js with URDF/STL models. Real-time mirror of physical system.', rate_hz: 60, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'dt-9', name: 'Predictive Simulation', description: 'Forward prediction of hand dynamics for model-predictive control in M2/M7 layers.', rate_hz: 100, status: 'planned', criticality: 'medium', owner: 'Jero' },
  ],

  'policies-active-inference': [
    { id: 'pai-1', name: 'Active Inference Framework', description: 'Perception-action under uncertainty. Free energy minimization. HIPOTESIS status — not validated.', rate_hz: 30, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'pai-2', name: 'Epistemic Actions / Micro-Probes', description: 'Active sensing through micro-probes: small exploratory movements to reduce uncertainty about objects.', rate_hz: 30, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'pai-3', name: 'Quantum-Like Mode Selector', description: 'Mode selection inspired by quantum superposition — simultaneous consideration of multiple grasp hypotheses.', rate_hz: 10, status: 'planned', criticality: 'medium', owner: 'Jero' },
    { id: 'pai-4', name: 'Preference/Precision Reconfiguration', description: 'M9 reconfigures preferences and precision weights based on task mode and performance feedback.', rate_hz: 1, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'pai-5', name: 'Internal Spacetime Formalization', description: 'Theoretical formalization of internal spacetime representation for embodied cognition. Research stage.', rate_hz: 0, status: 'planned', criticality: 'low', owner: 'Jero' },
    { id: 'pai-6', name: 'Operational Consciousness Criterion', description: 'Proposed criterion for operational consciousness in robotic systems. Theoretical/philosophical.', rate_hz: 0, status: 'planned', criticality: 'low', owner: 'Jero' },
    { id: 'pai-7', name: 'Skill Hierarchy', description: 'sub-skill (atomic) → skill (composed sequence) → run (automation). Composable manipulation primitives.', rate_hz: 10, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'pai-8', name: 'Skill Categories', description: '7 categories: Arm, Grasp, Manipulation, Assembly, Sensing, Interaction, Utility.', rate_hz: 0, status: 'active', criticality: 'high', owner: 'Jero' },
    { id: 'pai-9', name: 'Free Energy Minimization', description: 'Core Active Inference principle: minimize variational free energy for unified perception-action coupling.', rate_hz: 30, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'pai-10', name: 'Proposed vs Validated Gap', description: 'Active Inference is proposed framework, not validated. Gap between theoretical framework and implementation.', rate_hz: 0, status: 'planned', criticality: 'high', owner: 'Jero' },
  ],

  'realtime-software': [
    { id: 'rt-1', name: 'ROS 2 Jazzy', description: 'Robot Operating System 2 (Jazzy distribution) as middleware framework. Target platform.', rate_hz: 0, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'rt-2', name: 'rosbridge WebSocket', description: 'WebSocket bridge between ROS 2 nodes and web-based Control OS application.', rate_hz: 0, status: 'active', criticality: 'critical', owner: 'Jero' },
    { id: 'rt-3', name: 'RT Microcontroller (M0/M1)', description: 'Dedicated real-time microcontroller for M0 safety and M1 pressure servo. Deterministic ≤0.2ms/1ms.', rate_hz: 5000, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'rt-4', name: 'Embedded GPU Computer (M2-M7)', description: 'Embedded GPU computer for M2 force control through M7 policy execution. RT guarantees ≤2ms for M2.', rate_hz: 500, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'rt-5', name: 'External Server (M8)', description: 'External GPU server for M8 language/LLM inference. Not real-time, event-driven.', rate_hz: 5, status: 'planned', criticality: 'medium', owner: 'Jero' },
    { id: 'rt-6', name: 'Latency Budget', description: 'Per-layer: M0 < 0.2ms, M1 < 1ms, M2 < 2ms, M3 < 5ms, M5 < 10ms, M6 < 2ms, M7 < 100ms.', rate_hz: 0, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'rt-7', name: 'Deterministic Bus', description: 'Deterministic communication bus between RT microcontroller and embedded GPU. No jitter tolerance.', rate_hz: 5000, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'rt-8', name: 'No GPU for Hard Loop', description: 'M0/M1 hard safety/control loops run on microcontroller — no GPU required. GPU for upper layers only.', rate_hz: 5000, status: 'planned', criticality: 'high', owner: 'Jero' },
  ],

  'simulation-dataset': [
    { id: 'sd-1', name: 'Simulation Environment', description: 'Physics simulation environment for training and testing. Platform TBD (MuJoCo/Isaac Sim).', rate_hz: 0, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'sd-2', name: 'Dataset Collection Pipeline', description: 'Data collection pipeline: teleop demos → segmentation → labeling → training dataset export.', rate_hz: 0, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'sd-3', name: 'Sim-to-Real Transfer', description: 'Domain transfer methodology from simulation to physical system. Research phase. Critical for M7 policies.', rate_hz: 0, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'sd-4', name: 'Training Pipeline', description: 'End-to-end: simulate → collect → train policy → validate in sim → deploy to M7 on physical system.', rate_hz: 0, status: 'planned', criticality: 'high', owner: 'Jero' },
    { id: 'sd-5', name: 'McKibben Muscle Simulation', description: 'Accurate simulation of McKibben muscle dynamics including hysteresis and nonlinear compliance.', rate_hz: 0, status: 'planned', criticality: 'critical', owner: 'Jero' },
    { id: 'sd-6', name: 'Tendon-Driven Hand Simulation', description: 'Simulation of tendon-driven actuation with routing, friction, and slack dynamics.', rate_hz: 0, status: 'planned', criticality: 'high', owner: 'Jero' },
  ],

  /* ================================================================
     GROUP 6 — Application & Operations
     ================================================================ */

  'control-app-hmi': [
    { id: 'app-1', name: 'DOGMA Control OS v1.0', description: 'Primary control application and HMI. React + RosBridge WebSocket. Dark clinical aesthetic.', status: 'active', user_role: 'All', criticality: 'critical' },
    { id: 'app-2', name: 'Three User Roles', description: 'Operator (daily use, monitoring), Engineer (config, tuning, calibration), Admin (full system access).', status: 'active', user_role: 'All', criticality: 'high' },
    { id: 'app-3', name: '13+ Functional Pages', description: 'Command Center, Live View, Manual Control, Camera Feed, AI Planner, Arm Planner, Skills Library, Run Builder, Teleop, Calibration Lab, Data & Replay, Safety & Diagnostics, Settings, Integrations.', status: 'active', user_role: 'All', criticality: 'critical' },
    { id: 'app-4', name: 'WebSocket Real-Time Connectivity', description: 'Bidirectional real-time communication with ROS 2 via rosbridge WebSocket transport.', status: 'active', user_role: 'Engineer', criticality: 'critical' },
    { id: 'app-5', name: 'Dark Clinical UI Theme', description: 'Clinical dark interface with engineering aesthetic. Zinc/slate palette, amber accents. Sober elegance.', status: 'active', user_role: 'All', criticality: 'medium' },
    { id: 'app-6', name: 'React + TypeScript Stack', description: 'Built with React, TypeScript, Tailwind CSS. Component-based architecture.', status: 'active', user_role: 'Engineer', criticality: 'high' },
    { id: 'app-7', name: 'Live / Sim Modes', description: 'Application supports both live (connected to hardware) and simulation modes for development.', status: 'active', user_role: 'All', criticality: 'high' },
    { id: 'app-8', name: 'ROS Provider Architecture', description: 'RosProvider context with useRosTopic, useRosService, useRosPublisher hooks. Reconnect logic.', status: 'active', user_role: 'Engineer', criticality: 'critical' },
  ],

  'digital-product': [
    { id: 'dp-1', name: 'Page Architecture', description: '13+ pages organized by workflow: monitoring, control, planning, teaching, diagnostics, configuration.', status: 'active', user_role: 'All', criticality: 'high' },
    { id: 'dp-2', name: 'Role-Based Access Control', description: 'Page visibility and feature access controlled by user role: Operator, Engineer, Admin.', status: 'active', user_role: 'Admin', criticality: 'high' },
    { id: 'dp-3', name: 'User Flow: Operator', description: 'Operator monitors system → selects skill → executes → monitors progress → reviews results.', status: 'active', user_role: 'Operator', criticality: 'high' },
    { id: 'dp-4', name: 'User Flow: Engineer', description: 'Engineer calibrates → tunes parameters → tests skills → records demonstrations → analyzes data.', status: 'active', user_role: 'Engineer', criticality: 'high' },
    { id: 'dp-5', name: 'User Flow: Admin', description: 'Admin configures system → manages users → sets safety limits → configures integrations.', status: 'active', user_role: 'Admin', criticality: 'medium' },
    { id: 'dp-6', name: 'Responsive Layout', description: 'Responsive grid layout adapting to desktop and tablet form factors for factory floor use.', status: 'active', user_role: 'All', criticality: 'medium' },
  ],

  'page-command-center': [
    { id: 'cc-1', name: 'System State Overview', description: 'Real-time system health, active modules, connection status, pressure readings across all channels.', status: 'active', user_role: 'Operator', criticality: 'critical' },
    { id: 'cc-2', name: 'Active Skill Monitor', description: 'Currently executing skill with progress, parameters, and abort capability. Real-time updates.', status: 'active', user_role: 'Operator', criticality: 'high' },
    { id: 'cc-3', name: 'Total Force Display', description: 'Aggregated total force reading across all tendons and contact points.', status: 'active', user_role: 'Operator', criticality: 'high' },
    { id: 'cc-4', name: 'Risk Level Indicator', description: 'System-wide risk level indicator based on safety margins, sensor health, and environmental factors.', status: 'active', user_role: 'Operator', criticality: 'critical' },
    { id: 'cc-5', name: 'Performance Metrics', description: 'System performance dashboard: success rate, cycle time, force accuracy, skill confidence.', status: 'active', user_role: 'Operator', criticality: 'medium' },
    { id: 'cc-6', name: 'Quick Actions Panel', description: 'One-click actions: E-Stop, Home, Calibrate, Start/Stop skill, Safe-Open, Reset.', status: 'active', user_role: 'Operator', criticality: 'critical' },
    { id: 'cc-7', name: 'Saved Runs Panel', description: 'List of saved run configurations with one-click execution and status tracking.', status: 'active', user_role: 'Operator', criticality: 'medium' },
    { id: 'cc-8', name: 'Safety Monitor Widget', description: 'M0 safety status, pressure/force limits, watchdog state, fault flags — always visible.', status: 'active', user_role: 'Operator', criticality: 'critical' },
    { id: 'cc-9', name: 'Control Modules M0-M9 Status', description: 'Status indicators for all 10 control modules: running, idle, fault, disabled.', status: 'active', user_role: 'Engineer', criticality: 'high' },
    { id: 'cc-10', name: 'Event Log', description: 'Chronological event log: system events, safety events, skill transitions, user actions.', status: 'active', user_role: 'Operator', criticality: 'high' },
  ],

  'page-live-view': [
    { id: 'lv-1', name: '3D URDF/STL Viewer', description: 'Real-time Three.js 3D model showing current hand/arm configuration from URDF/STL files.', status: 'active', user_role: 'Operator', criticality: 'critical' },
    { id: 'lv-2', name: 'Sensor State Visualization', description: 'Tactile sensor readings overlaid on 3D model with color-coded force/contact mapping.', status: 'active', user_role: 'Engineer', criticality: 'high' },
    { id: 'lv-3', name: 'Force/Pressure Timelines', description: 'Real-time time-series charts of force and pressure across all channels. Scrolling history.', status: 'active', user_role: 'Engineer', criticality: 'high' },
    { id: 'lv-4', name: 'Per-Phalanx Angle/Torque Table', description: 'Table showing estimated angle (theta_hat) and torque per phalanx across all fingers.', status: 'active', user_role: 'Engineer', criticality: 'high' },
    { id: 'lv-5', name: 'Sensor Bus Monitor', description: 'Raw BUS SENSORS data display: p, |F|, x_tac values with update rate indicators.', status: 'active', user_role: 'Engineer', criticality: 'high' },
    { id: 'lv-6', name: 'Tactile Map Visualization', description: 'Spatial tactile map showing contact intensity across all sensor locations on the hand surface.', status: 'active', user_role: 'Operator', criticality: 'high' },
    { id: 'lv-7', name: 'Camera Feed Overlay', description: 'Live camera feed from workspace cameras with object detection overlay from M4 vision.', status: 'planned', user_role: 'Operator', criticality: 'medium' },
  ],

  'page-manual-control': [
    { id: 'mc-1', name: 'Per-Finger Direct Control', description: 'Direct control of each finger independently. Force, pressure, or impedance mode selectable.', status: 'active', user_role: 'Engineer', criticality: 'critical' },
    { id: 'mc-2', name: 'Force Mode', description: 'Control each muscle by desired tendon force (F*). ForceCommand published to M2.', status: 'active', user_role: 'Engineer', criticality: 'critical' },
    { id: 'mc-3', name: 'Pressure Mode', description: 'Control each muscle by desired pressure setpoint (p*). Direct to M1 servo.', status: 'active', user_role: 'Engineer', criticality: 'high' },
    { id: 'mc-4', name: 'Impedance Mode', description: 'Control by desired stiffness (K*) and damping (D*). Variable compliance per DOF.', status: 'active', user_role: 'Engineer', criticality: 'high' },
    { id: 'mc-5', name: 'ForceCommand Publishing', description: 'Publishes ForceCommand messages to ROS 2 /force_command service for M2 consumption.', status: 'active', user_role: 'Engineer', criticality: 'critical' },
    { id: 'mc-6', name: 'Safety Warnings', description: 'Real-time safety warnings when approaching force/pressure limits. Bounded by M0 safety envelope.', status: 'active', user_role: 'Engineer', criticality: 'critical' },
    { id: 'mc-7', name: 'M0 Safety Envelope Bounded', description: 'All manual control commands bounded by M0 safety envelope. Cannot exceed safety limits.', status: 'active', user_role: 'Engineer', criticality: 'critical' },
    { id: 'mc-8', name: 'Preset Postures', description: 'Pre-defined hand postures: open, close, pinch, point, power grasp, lateral grasp patterns.', status: 'active', user_role: 'Operator', criticality: 'medium' },
  ],

  'page-ai-planner': [
    { id: 'ai-1', name: 'Conversational Chat Interface', description: 'Chat-based AI interface for natural language task planning. Relates to M8 Language module.', status: 'planned', user_role: 'Operator', criticality: 'high' },
    { id: 'ai-2', name: 'Anthropic API Integration', description: 'Optional Anthropic API backend for intelligent task decomposition and spatial planning.', status: 'planned', user_role: 'Admin', criticality: 'medium' },
    { id: 'ai-3', name: 'Local Fallback', description: 'Local LLM fallback when cloud API unavailable. Reduced capability but offline operation.', status: 'planned', user_role: 'Engineer', criticality: 'medium' },
    { id: 'ai-4', name: 'Natural Language → Spatial Plans', description: 'Converts natural language descriptions to spatial manipulation plans with waypoints.', status: 'planned', user_role: 'Operator', criticality: 'high' },
    { id: 'ai-5', name: 'Connected to Skills/Execution', description: 'AI plans map to Skills Library entries. Generated plans can be saved as new skills.', status: 'planned', user_role: 'Operator', criticality: 'high' },
    { id: 'ai-6', name: 'Plan Visualization', description: 'Visual preview of planned skill sequence with 3D workspace overlay before execution.', status: 'planned', user_role: 'Operator', criticality: 'medium' },
    { id: 'ai-7', name: 'Plan Review + Edit', description: 'Operator can review, edit, and approve AI-generated plans before execution.', status: 'planned', user_role: 'Operator', criticality: 'high' },
  ],

  'page-arm-planner': [
    { id: 'ap-1', name: 'Visual Structured Flow', description: 'Step-by-step visual flow: select object → select grasp → configure path → review → execute → save.', status: 'planned', user_role: 'Engineer', criticality: 'high' },
    { id: 'ap-2', name: 'Grasp Phase Sequence', description: 'Phases: home → pregrasp → hover → approach → contact → close-grasp → lift → transfer → preplace → place → release → retreat.', status: 'planned', user_role: 'Engineer', criticality: 'critical' },
    { id: 'ap-3', name: 'Motion Plan Generation', description: 'Generates smooth motion plans between grasp phases with velocity/acceleration profiles.', status: 'planned', user_role: 'Engineer', criticality: 'high' },
    { id: 'ap-4', name: 'Reachability Evaluation', description: 'Evaluates workspace reachability for target poses. Shows reachable vs unreachable zones.', status: 'planned', user_role: 'Engineer', criticality: 'high' },
    { id: 'ap-5', name: 'Collision/IK Evaluation', description: 'Collision checking against known obstacles and IK feasibility for each waypoint.', status: 'planned', user_role: 'Engineer', criticality: 'critical' },
    { id: 'ap-6', name: 'Save as Skill', description: 'Save validated arm plans as reusable skills in the Skills Library for future execution.', status: 'planned', user_role: 'Engineer', criticality: 'high' },
    { id: 'ap-7', name: '3D Workspace Visualization', description: '3D workspace boundary, reachability envelope, and obstacle visualization overlaid on arm model.', status: 'planned', user_role: 'Engineer', criticality: 'medium' },
    { id: 'ap-8', name: 'Inverse Kinematics Solver', description: '6-DOF IK solver for arm positioning. Cartesian and joint-space control modes.', status: 'planned', user_role: 'Engineer', criticality: 'critical' },
  ],

  'page-skills-library': [
    { id: 'sl-1', name: 'Skill Repository', description: 'Browsable library of reusable manipulation skills organized by category and type.', status: 'active', user_role: 'Operator', criticality: 'high' },
    { id: 'sl-2', name: '7 Skill Categories', description: 'Arm, Grasp, Manipulation, Assembly, Sensing, Interaction, Utility — comprehensive categorization.', status: 'active', user_role: 'Operator', criticality: 'high' },
    { id: 'sl-3', name: 'Skill Types', description: 'Pick & Place, Assembly, Inspection, Interaction, Manipulation, Testing — task-oriented types.', status: 'active', user_role: 'Operator', criticality: 'high' },
    { id: 'sl-4', name: 'sub-skill → skill → run Hierarchy', description: 'sub-skill (atomic operation) → skill (composed sequence) → run (automation workflow).', status: 'active', user_role: 'Engineer', criticality: 'critical' },
    { id: 'sl-5', name: 'Confidence & Status Fields', description: 'Each skill has confidence score and status: verified, testing, dev. Execution count tracked.', status: 'active', user_role: 'Operator', criticality: 'medium' },
    { id: 'sl-6', name: 'Skill Editor', description: 'Create and edit skill definitions with parameters, preconditions, postconditions, and abort criteria.', status: 'planned', user_role: 'Engineer', criticality: 'high' },
    { id: 'sl-7', name: 'Skill Testing Sandbox', description: 'Sandbox execution mode to test skills without full system commitment. Safe testing environment.', status: 'planned', user_role: 'Engineer', criticality: 'medium' },
    { id: 'sl-8', name: 'Execution Count Tracking', description: 'Tracks how many times each skill has been executed. Builds confidence through usage data.', status: 'active', user_role: 'Operator', criticality: 'low' },
  ],

  'page-run-builder': [
    { id: 'rb-1', name: 'Run Composer', description: 'Compose runs from skills. Drag-and-drop interface to build sequential or branching workflows.', status: 'planned', user_role: 'Operator', criticality: 'high' },
    { id: 'rb-2', name: 'Repeat Mode & Cycles', description: 'Configure run repetition: single, N cycles, continuous. Delay between cycles configurable.', status: 'planned', user_role: 'Operator', criticality: 'high' },
    { id: 'rb-3', name: 'Safety Overrides per Run', description: 'Per-run safety parameter overrides: force limits, speed limits, workspace boundaries.', status: 'planned', user_role: 'Engineer', criticality: 'critical' },
    { id: 'rb-4', name: 'Run History', description: 'Complete history of executed runs with results, duration, success/failure, and sensor logs.', status: 'planned', user_role: 'Operator', criticality: 'medium' },
    { id: 'rb-5', name: 'Save/Load/Clone/Export', description: 'Save runs as templates, load from library, clone existing, export as JSON for sharing.', status: 'planned', user_role: 'Operator', criticality: 'high' },
    { id: 'rb-6', name: 'Draft vs Saved Status', description: 'Runs can be in draft (editing) or saved (ready to execute) status. Version control.', status: 'planned', user_role: 'Operator', criticality: 'medium' },
    { id: 'rb-7', name: 'Parameter Configuration per Step', description: 'Per-step parameter override for each skill in the run sequence. Contextual tuning.', status: 'planned', user_role: 'Engineer', criticality: 'medium' },
  ],

  'page-teleop': [
    { id: 'to-1', name: 'Glove/Haptic Teaching', description: 'Haptic glove-based teleoperation for intuitive hand mirroring and demonstration capture.', status: 'active', user_role: 'Operator', criticality: 'high' },
    { id: 'to-2', name: 'Hand Mirroring', description: 'Real-time mirroring of operator hand movements to robot hand via glove input.', status: 'active', user_role: 'Operator', criticality: 'high' },
    { id: 'to-3', name: 'Recording → Save as Skill', description: 'Record teleoperation demos and save directly as new skills in Skills Library.', status: 'planned', user_role: 'Engineer', criticality: 'critical' },
    { id: 'to-4', name: 'Input Sources', description: 'Input: serial, bluetooth, ros_topic. Multiple input device support for flexibility.', status: 'active', user_role: 'Engineer', criticality: 'high' },
    { id: 'to-5', name: 'Mirror Gain & Force Scale', description: 'Adjustable mirror gain (movement scaling) and force scale (force feedback intensity).', status: 'active', user_role: 'Engineer', criticality: 'medium' },
    { id: 'to-6', name: 'Haptic Feedback', description: 'Force feedback to operator glove during teleoperation. Proportional to robot contact forces.', status: 'planned', user_role: 'Operator', criticality: 'high' },
    { id: 'to-7', name: 'Safety Clamp', description: 'Force and velocity clamping during teleop to prevent operator from exceeding safety limits.', status: 'active', user_role: 'Engineer', criticality: 'critical' },
    { id: 'to-8', name: 'Latency Display', description: 'Real-time round-trip latency indicator for teleop responsiveness monitoring.', status: 'planned', user_role: 'Operator', criticality: 'medium' },
  ],

  'page-calibration-lab': [
    { id: 'cl-1', name: 'Inverse Pressure-Force Mapping', description: 'Calibrate inverse mapping from pressure to force for each McKibben muscle. Core M2 requirement.', status: 'planned', user_role: 'Engineer', criticality: 'critical' },
    { id: 'cl-2', name: 'Routing Matrix Calibration', description: 'Calibrate tendon routing matrix: moment arms, pulley positions, friction coefficients.', status: 'planned', user_role: 'Engineer', criticality: 'critical' },
    { id: 'cl-3', name: 'Vision Confidence Calibration', description: 'Calibrate M4 vision confidence scores against ground truth measurements.', status: 'planned', user_role: 'Engineer', criticality: 'high' },
    { id: 'cl-4', name: 'Camera-Hand Extrinsics', description: 'Calibrate camera-to-hand-base transformation matrix for accurate visual-proprioceptive fusion.', status: 'planned', user_role: 'Engineer', criticality: 'high' },
    { id: 'cl-5', name: 'Tactile Zoning Calibration', description: 'Map tactile sensor zones to physical hand locations. Per-sensor sensitivity calibration.', status: 'planned', user_role: 'Engineer', criticality: 'high' },
    { id: 'cl-6', name: 'Safety Threshold Calibration', description: 'Set and validate M0 safety thresholds: p_max, F_max, slew limits per channel.', status: 'planned', user_role: 'Engineer', criticality: 'critical' },
    { id: 'cl-7', name: 'Calibration Status Tracking', description: 'Per-calibration status: calibrated, needs_update, locked. Visual dashboard of calibration state.', status: 'planned', user_role: 'Engineer', criticality: 'high' },
    { id: 'cl-8', name: 'Calibration History', description: 'Track calibration history per sensor/actuator with drift monitoring and alerts.', status: 'planned', user_role: 'Engineer', criticality: 'medium' },
  ],

  'page-data-replay': [
    { id: 'dr-1', name: 'Session Recording', description: 'Record complete sessions: all sensor channels, commands, state estimates, events with timestamps.', status: 'planned', user_role: 'Engineer', criticality: 'high' },
    { id: 'dr-2', name: 'Session Replay', description: 'Replay recorded sessions with synchronized 3D visualization, charts, and event timeline.', status: 'planned', user_role: 'Engineer', criticality: 'high' },
    { id: 'dr-3', name: 'Annotations', description: 'Annotate replay segments with labels, notes, and markers for training data curation.', status: 'planned', user_role: 'Engineer', criticality: 'medium' },
    { id: 'dr-4', name: 'JSON/CSV Export', description: 'Export recorded data in JSON and CSV formats for external analysis tools.', status: 'planned', user_role: 'Engineer', criticality: 'high' },
    { id: 'dr-5', name: 'Training Dataset Export', description: 'Export annotated sessions as training datasets for M7 policy learning and behavioral cloning.', status: 'planned', user_role: 'Engineer', criticality: 'high' },
    { id: 'dr-6', name: 'Recording Channels', description: 'Channels: force, pressure, tactile, vision, joints, events. All independently selectable.', status: 'planned', user_role: 'Engineer', criticality: 'medium' },
    { id: 'dr-7', name: 'Comparison Mode', description: 'Side-by-side replay of two runs for performance comparison and regression testing.', status: 'planned', user_role: 'Engineer', criticality: 'low' },
  ],

  'page-safety-diagnostics': [
    { id: 'sfd-1', name: 'M0 Watchdog Status', description: 'Real-time M0 watchdog state: running, triggered, reset count, last trigger timestamp.', status: 'active', user_role: 'Engineer', criticality: 'critical' },
    { id: 'sfd-2', name: 'Pressure/Force Limits Display', description: 'Current pressure and force limits (p_max, F_max) per channel with live readings vs limits.', status: 'active', user_role: 'Engineer', criticality: 'critical' },
    { id: 'sfd-3', name: 'Leak Detection Status', description: 'Pneumatic leak detection status per channel. Alert on detected leaks.', status: 'planned', user_role: 'Engineer', criticality: 'critical' },
    { id: 'sfd-4', name: 'Jam Detection Status', description: 'Mechanical jam detection per actuator. Pressure-motion correlation monitoring.', status: 'planned', user_role: 'Engineer', criticality: 'high' },
    { id: 'sfd-5', name: 'Safe-Open Visualization', description: 'Visual indicator when safe-open (all valves vented) is active. System state diagram.', status: 'active', user_role: 'Engineer', criticality: 'critical' },
    { id: 'sfd-6', name: 'E-Stop Status', description: 'Emergency stop state: armed, triggered, reset required. Hardware + software paths.', status: 'active', user_role: 'Operator', criticality: 'critical' },
    { id: 'sfd-7', name: 'Zone Freeze Status', description: 'Per-zone freeze state for individual fingers, wrist, and arm sections.', status: 'planned', user_role: 'Engineer', criticality: 'high' },
    { id: 'sfd-8', name: 'Safety Supervisor Visualization', description: 'Complete safety supervisor state diagram showing all monitored conditions and their status.', status: 'active', user_role: 'Engineer', criticality: 'high' },
    { id: 'sfd-9', name: 'Incident Log', description: 'Historical log of all safety events, E-Stops, limit violations, and reflex triggers with timestamps.', status: 'active', user_role: 'Engineer', criticality: 'high' },
  ],

  'page-settings': [
    { id: 'set-1', name: 'ROS Connection Settings', description: 'WebSocket URL, IP address, port, reconnect interval, QoS profiles configuration.', status: 'active', user_role: 'Admin', criticality: 'critical' },
    { id: 'set-2', name: 'Topic Mappings', description: 'Configure ROS 2 topic names: /hand_state, /system_state, /vision_state, /run_status, /events.', status: 'active', user_role: 'Admin', criticality: 'high' },
    { id: 'set-3', name: 'User Management', description: 'User role assignment, access control, and authentication settings for Operator/Engineer/Admin.', status: 'planned', user_role: 'Admin', criticality: 'high' },
    { id: 'set-4', name: 'Control Parameters', description: 'Tunable control parameters: PID gains, safety limits, filter constants, update rates.', status: 'active', user_role: 'Engineer', criticality: 'critical' },
    { id: 'set-5', name: 'Logging Configuration', description: 'Configure data logging: channels, rates, storage location, retention policy, export format.', status: 'planned', user_role: 'Admin', criticality: 'medium' },
    { id: 'set-6', name: 'Service Endpoints', description: 'Configure ROS 2 service names: /force_command, /safe_action, /execute_skill, /run_control.', status: 'active', user_role: 'Admin', criticality: 'high' },
  ],

  'ros-bridge': [
    { id: 'ros-1', name: 'RosProvider Context', description: 'React context providing ROS connectivity to all child components. Manages connection lifecycle.', status: 'active', user_role: 'Engineer', criticality: 'critical' },
    { id: 'ros-2', name: 'useRosTopic Hook', description: 'React hook for subscribing to ROS 2 topics. Auto-reconnect on connection loss.', status: 'active', user_role: 'Engineer', criticality: 'critical' },
    { id: 'ros-3', name: 'useRosService Hook', description: 'React hook for calling ROS 2 services. Request/response pattern with timeout.', status: 'active', user_role: 'Engineer', criticality: 'high' },
    { id: 'ros-4', name: 'useRosPublisher Hook', description: 'React hook for publishing to ROS 2 topics. Buffered publishing with rate limiting.', status: 'active', user_role: 'Engineer', criticality: 'high' },
    { id: 'ros-5', name: 'WebSocket Transport', description: 'rosbridge WebSocket transport layer. JSON-based publish/subscribe protocol.', status: 'active', user_role: 'Engineer', criticality: 'critical' },
    { id: 'ros-6', name: 'Reconnect Logic', description: 'Automatic reconnection on WebSocket disconnect. Exponential backoff with configurable max retries.', status: 'active', user_role: 'Engineer', criticality: 'high' },
    { id: 'ros-7', name: 'Topic: /hand_state', description: 'Publishes hand joint state: theta_hat, omega_hat per joint. Updated at M5 fusion rate.', status: 'active', user_role: 'Engineer', criticality: 'critical' },
    { id: 'ros-8', name: 'Topic: /system_state', description: 'Publishes overall system state: mode, health, active skill, safety status.', status: 'active', user_role: 'Engineer', criticality: 'critical' },
    { id: 'ros-9', name: 'Service: /force_command', description: 'Service for sending force commands to M2. Used by Manual Control page.', status: 'active', user_role: 'Engineer', criticality: 'critical' },
    { id: 'ros-10', name: 'Service: /execute_skill', description: 'Service for triggering skill execution from Skills Library or Run Builder.', status: 'active', user_role: 'Engineer', criticality: 'high' },
    { id: 'ros-11', name: 'Live / Sim Mode Toggle', description: 'Toggle between live hardware connection and simulated data for development and testing.', status: 'active', user_role: 'Engineer', criticality: 'high' },
  ],

  'skills-runs': [
    { id: 'skr-1', title: 'Define Skill Schema', description: 'Formalize skill definition: inputs, outputs, preconditions, parameters, abort criteria.', progress: 40, status: 'active', priority: 'high', owner: 'Jero', due_date: '2026-05-01' },
    { id: 'skr-2', title: 'Implement Run Sequencer', description: 'Build run execution engine with state transitions, error handling, retry logic.', progress: 20, status: 'planned', priority: 'high', owner: 'Jero', due_date: '2026-06-01' },
    { id: 'skr-3', title: 'Basic Grasp Skills', description: 'Implement: power grasp, precision pinch, lateral grasp, tripod grasp primitives.', progress: 15, status: 'planned', priority: 'critical', owner: 'Jero', due_date: '2026-07-01' },
    { id: 'skr-4', title: 'Pick & Place Skill', description: 'Compose pick-and-place from: approach → grasp → lift → transfer → place → release.', progress: 10, status: 'planned', priority: 'high', owner: 'Jero', due_date: '2026-08-01' },
    { id: 'skr-5', title: 'Skill Confidence Tracking', description: 'Implement per-skill confidence scoring based on execution history and success rate.', progress: 5, status: 'planned', priority: 'medium', owner: 'Jero', due_date: '2026-09-01' },
    { id: 'skr-6', title: 'Skill Import/Export Format', description: 'Define JSON schema for skill import/export enabling sharing between DOGMA instances.', progress: 10, status: 'planned', priority: 'medium', owner: 'Jero', due_date: '2026-07-01' },
  ],

  'teaching-teleop': [
    { id: 'tt-1', name: 'Glove/Haptic Teaching Mode', description: 'Haptic glove-based teleoperation for recording demonstrations. Save as skill capability.', status: 'planned', user_role: 'Engineer', criticality: 'high' },
    { id: 'tt-2', name: 'Hand Mirroring System', description: 'Real-time hand mirroring from operator to robot. Configurable mirror gain and force scale.', status: 'planned', user_role: 'Operator', criticality: 'high' },
    { id: 'tt-3', name: 'Demo Recording Pipeline', description: 'Recording demos: capture all sensor/command data → save session → annotate → convert to skill.', status: 'planned', user_role: 'Engineer', criticality: 'critical' },
    { id: 'tt-4', name: 'Input Device Support', description: 'Multiple input sources: serial, bluetooth, ros_topic. Pluggable input device architecture.', status: 'planned', user_role: 'Engineer', criticality: 'medium' },
    { id: 'tt-5', name: 'Haptic Feedback System', description: 'Force feedback to operator during teaching. Proportional to robot contact forces for intuitive feel.', status: 'planned', user_role: 'Engineer', criticality: 'high' },
    { id: 'tt-6', name: 'Safety Clamp System', description: 'Force and velocity clamping during teaching to prevent exceeding safety limits.', status: 'planned', user_role: 'Engineer', criticality: 'critical' },
  ],

  'data-replay-exports': [
    { id: 'dre-1', name: 'Data Logging System', description: 'Continuous logging of all sensor, state, and command data during operation. Timestamped.', status: 'planned', user_role: 'Engineer', criticality: 'high' },
    { id: 'dre-2', name: 'Replay Engine', description: 'Replay recorded data with synchronized 3D visualization and multi-channel analysis.', status: 'planned', user_role: 'Engineer', criticality: 'high' },
    { id: 'dre-3', name: 'JSON Export', description: 'Export recorded sessions as structured JSON with full metadata and annotations.', status: 'planned', user_role: 'Engineer', criticality: 'high' },
    { id: 'dre-4', name: 'CSV Export', description: 'Export time-series data as CSV for spreadsheet and statistical analysis tools.', status: 'planned', user_role: 'Engineer', criticality: 'medium' },
    { id: 'dre-5', name: 'Training Dataset Export', description: 'Export annotated sessions formatted for ML training: behavioral cloning, RL, Active Inference.', status: 'planned', user_role: 'Engineer', criticality: 'high' },
    { id: 'dre-6', name: 'Cloud Backup', description: 'Automated backup of recorded data to cloud storage with retention policies and versioning.', status: 'planned', user_role: 'Admin', criticality: 'medium' },
    { id: 'dre-7', name: 'Recording Channels', description: 'Independent channel selection: force, pressure, tactile, vision, joints, events, commands.', status: 'planned', user_role: 'Engineer', criticality: 'medium' },
  ],

  'enterprise-integrations': [
    { id: 'ei-1', name: 'SAP S/4HANA', description: 'Integration with SAP for manufacturing execution and resource planning. PLANNED status.', status: 'planned', user_role: 'Admin', criticality: 'medium' },
    { id: 'ei-2', name: 'MES/SCADA', description: 'Manufacturing Execution System and SCADA integration for factory floor deployment. PLANNED status.', status: 'planned', user_role: 'Admin', criticality: 'high' },
    { id: 'ei-3', name: 'ROS 2 Ecosystem', description: 'Native ROS 2 integration with MoveIt, Nav2, and standard packages. ACTIVE status.', status: 'active', user_role: 'Engineer', criticality: 'critical' },
    { id: 'ei-4', name: 'Cloud / Analytics', description: 'Cloud data pipeline for fleet analytics, remote monitoring, OTA updates. DESIGNED status.', status: 'planned', user_role: 'Admin', criticality: 'medium' },
    { id: 'ei-5', name: 'API Gateway', description: 'REST/gRPC API gateway for third-party integrations and fleet management.', status: 'planned', user_role: 'Admin', criticality: 'high' },
    { id: 'ei-6', name: 'ROS 2 Jazzy Target', description: 'ROS 2 Jazzy distribution as target middleware. Latest LTS with real-time support.', status: 'active', user_role: 'Engineer', criticality: 'critical' },
  ],

  /* ================================================================
     GROUP 7 — Operations (empty — populated from Supabase)
     ================================================================ */

  'command-center': [
    {id:'cc-burn',name:'Burn Rate',description:'$12,500/mo — Components $4.2K, Lab $2.8K, Software $600, Travel $1.8K, Professional $1.2K, Misc $1.9K',maturity_level:100,status:'active',criticality:'critical',owner:'Jero'},
    {id:'cc-cash',name:'Cash Position',description:'$45,000 current bank balance',maturity_level:100,status:'active',criticality:'critical',owner:'Jero'},
    {id:'cc-runway',name:'Runway',description:'3.6 months remaining at current burn rate. CRITICAL: Less than 4 months.',maturity_level:30,status:'active',criticality:'critical',owner:'Jero'},
    {id:'cc-bom',name:'BOM Cost',description:'$4,280 per Genesis Hand unit. 142 unique components. Target: sub-$3K at 100-unit volume.',maturity_level:60,status:'active',criticality:'high',owner:'Jero'},
    {id:'cc-m0',name:'M0 Safety Supervisor',description:'1-5 kHz. Hardware safety override. Status: planned',maturity_level:0,status:'planned',criticality:'critical',owner:'Jero'},
    {id:'cc-m1',name:'M1 Pressure Servo',description:'500-1000 Hz. PID/PI with anti-windup. Status: planned',maturity_level:0,status:'planned',criticality:'critical',owner:'Jero'},
    {id:'cc-m2',name:'M2 Force/Impedance',description:'200-500 Hz. THE REAL CONTROL. Tendon force regulation. Status: planned',maturity_level:0,status:'planned',criticality:'critical',owner:'Jero'},
    {id:'cc-m3',name:'M3 Proprioception',description:'100-300 Hz. McKibben inversion → theta_hat. Status: planned',maturity_level:0,status:'planned',criticality:'high',owner:'Jero'},
    {id:'cc-m4',name:'M4 Vision',description:'30 Hz. Camera pose + object tracking. Status: planned',maturity_level:0,status:'planned',criticality:'medium',owner:'Jero'},
    {id:'cc-m5',name:'M5 Fusion',description:'60-120 Hz. Multi-modal sensor fusion. Publishes BUS STATE. Status: planned',maturity_level:0,status:'planned',criticality:'high',owner:'Jero'},
    {id:'cc-m6',name:'M6 Reflex',description:'100-300 Hz. Anti-slip, anti-crush, freeze. Status: planned',maturity_level:0,status:'planned',criticality:'high',owner:'Jero'},
    {id:'cc-m7',name:'M7 Policy',description:'10-30 Hz. RL / Active Inference. Decides F*, K*, D*. Status: planned',maturity_level:0,status:'planned',criticality:'medium',owner:'Jero'},
    {id:'cc-m8',name:'M8 Language',description:'0.5-5 Hz. LLM/VLM → task objectives. Status: planned',maturity_level:0,status:'planned',criticality:'medium',owner:'Jero'},
    {id:'cc-m9',name:'M9 Meta-Supervisor',description:'0.1-1 Hz. Reconfigures priorities, thresholds. Status: planned',maturity_level:0,status:'planned',criticality:'low',owner:'Jero'},
    {id:'cc-pilot-modelo',name:'Pilot: Cerveceria Modelo',description:'Line Analysis stage. Viability 82%. ROI $180K/yr. Champion: Carlos Vega.',maturity_level:82,status:'active',criticality:'high',owner:'Jero'},
    {id:'cc-pilot-amazon',name:'Pilot: Amazon MX',description:'Site Visit stage. Viability 88%. ROI $250K/yr. Needs ISO/TS 15066.',maturity_level:88,status:'active',criticality:'critical',owner:'Jero'},
    {id:'cc-pilot-foxconn',name:'Pilot: Foxconn Juarez',description:'Identified stage. Viability 90%. ROI $400K+/yr. No contact yet.',maturity_level:90,status:'planned',criticality:'high',owner:'Jero'},
    {id:'cc-pilot-bimbo',name:'Pilot: Grupo Bimbo',description:'Auto Score stage. Viability 71%. ROI $95K/yr.',maturity_level:71,status:'active',criticality:'medium',owner:'Jero'},
    {id:'cc-inv-eclipse',name:'Investor: Eclipse Ventures',description:'1st Meeting. Probability 35%. Check $500K-1M. Need live demo.',maturity_level:35,status:'active',criticality:'critical',owner:'Jero'},
    {id:'cc-inv-khosla',name:'Investor: Khosla Ventures',description:'Warm Intro. Probability 20%. Check $1-2M.',maturity_level:20,status:'active',criticality:'high',owner:'Jero'},
    {id:'cc-decision-mckibben',name:'Decision: McKibben over electric',description:'Superior compliance and force density for biomimetic grasping. 3x force-to-weight.',maturity_level:100,status:'done',criticality:'critical',owner:'Jero'},
    {id:'cc-decision-pilots',name:'Decision: Industrial pilots first',description:'Faster path to revenue validation. Deploy hand on existing UR10e arm.',maturity_level:100,status:'done',criticality:'high',owner:'Jero'},
    {id:'cc-decision-mexico',name:'Decision: Mexico nearshoring',description:'Lower deployment cost, founder network, proximity to US customers.',maturity_level:100,status:'done',criticality:'high',owner:'Jero'},
  ],
  'tasks': [],
  'pilots': [],
  'investors': [],
  'incidents': [],
  'finance': [],
  'milestones': [],
  'supply-chain': [],
}
