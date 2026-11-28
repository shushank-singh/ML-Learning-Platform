'use client';

import React from 'react';
import { Sparkles, Eye } from 'lucide-react';

interface MedicalNoteDiagramProps {
  topicId: string;
  captions?: Array<{ title: string; description: string }>;
}

interface FlowNode {
  emoji: string;
  label: string;
  sub: string;
  tone?: 'teal' | 'cyan' | 'rose' | 'amber' | 'violet' | 'emerald' | 'sky';
}

interface SplitCompareSpec {
  kind: 'compare';
  title: string;
  subtitle: string;
  leftTitle: string;
  leftColor: string;
  leftSvg: React.ReactNode;
  leftPoints: string[];
  rightTitle: string;
  rightColor: string;
  rightSvg: React.ReactNode;
  rightPoints: string[];
}

interface PipelineSvgSpec {
  kind: 'pipeline';
  title: string;
  subtitle: string;
  nodes: FlowNode[];
  footerBadge: string;
}

interface Matrix2x2Spec {
  kind: 'matrix';
  title: string;
  subtitle: string;
  colHeaders: [string, string];
  rowHeaders: [string, string];
  cells: [
    { label: string; emoji: string; sub: string; cls: string },
    { label: string; emoji: string; sub: string; cls: string },
    { label: string; emoji: string; sub: string; cls: string },
    { label: string; emoji: string; sub: string; cls: string },
  ];
  formulaNote: string;
}

interface CustomSvgSpec {
  kind: 'custom';
  title: string;
  subtitle: string;
  legend: Array<{ label: string; color: string }>;
  svg: React.ReactNode;
}

type DiagramSpec = SplitCompareSpec | PipelineSvgSpec | Matrix2x2Spec | CustomSvgSpec;

const TONE_BOX: Record<NonNullable<FlowNode['tone']>, string> = {
  teal: 'bg-teal-50 dark:bg-teal-950/60 border-teal-300 dark:border-teal-700 text-teal-900 dark:text-teal-100',
  cyan: 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-300 dark:border-cyan-700 text-cyan-900 dark:text-cyan-100',
  rose: 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-100',
  amber: 'bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-100',
  violet: 'bg-violet-50 dark:bg-violet-950/60 border-violet-300 dark:border-violet-700 text-violet-900 dark:text-violet-100',
  emerald: 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-100',
  sky: 'bg-sky-50 dark:bg-sky-950/60 border-sky-300 dark:border-sky-700 text-sky-900 dark:text-sky-100',
};

const TOPIC_DIAGRAMS: Record<string, DiagramSpec> = {
  'cv-heart-blood-flow': {
    kind: 'custom',
    title: '🫀 Dual-Circuit Cardiac Blood Flow & Pressure Loop',
    subtitle: 'Blue = Deoxygenated venous/pulmonary circuit (~25/8 mmHg) · Red = Oxygenated systemic circuit (~120/80 mmHg)',
    legend: [
      { label: 'Deoxygenated (PaO₂ ~40)', color: '#0ea5e9' },
      { label: 'Oxygenated (PaO₂ ~95)', color: '#ef4444' },
      { label: 'Valves: Tricuspid → Pulmonary → Mitral → Aortic', color: '#14b8a6' },
    ],
    svg: (
      <svg viewBox="0 0 760 220" className="w-full h-auto" role="img" aria-label="Dual circuit heart chamber blood flow diagram">
        <defs>
          <marker id="arr-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,1 L9,5 L0,9 z" fill="#0ea5e9" />
          </marker>
          <marker id="arr-red" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,1 L9,5 L0,9 z" fill="#ef4444" />
          </marker>
        </defs>
        {/* SVC/IVC */}
        <rect x="16" y="75" width="95" height="70" rx="14" fill="#0c4a6e" fillOpacity="0.88" stroke="#38bdf8" strokeWidth="2" />
        <text x="63" y="105" textAnchor="middle" fill="#e0f2fe" fontSize="11" fontWeight="700">SVC / IVC</text>
        <text x="63" y="123" textAnchor="middle" fill="#7dd3fc" fontSize="10">0–6 mmHg</text>

        <line x1="111" y1="110" x2="145" y2="110" stroke="#0ea5e9" strokeWidth="3" markerEnd="url(#arr-blue)" />

        {/* RA + RV */}
        <rect x="150" y="34" width="110" height="62" rx="14" fill="#0369a1" fillOpacity="0.9" stroke="#38bdf8" strokeWidth="2" />
        <text x="205" y="61" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700">Right Atrium</text>
        <text x="205" y="78" textAnchor="middle" fill="#bae6fd" fontSize="10">SA Node · a/v wave</text>

        <line x1="205" y1="96" x2="205" y2="128" stroke="#0ea5e9" strokeWidth="3" markerEnd="url(#arr-blue)" />
        <text x="242" y="116" fill="#5eead4" fontSize="9.5" fontWeight="700">Tricuspid</text>

        <rect x="150" y="132" width="110" height="64" rx="14" fill="#075985" fillOpacity="0.95" stroke="#38bdf8" strokeWidth="2" />
        <text x="205" y="159" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700">Right Ventricle</text>
        <text x="205" y="177" textAnchor="middle" fill="#bae6fd" fontSize="10">25 / 5 mmHg · Ant.</text>

        {/* Lungs */}
        <line x1="260" y1="164" x2="318" y2="115" stroke="#0ea5e9" strokeWidth="3" markerEnd="url(#arr-blue)" />
        <text x="282" y="128" fill="#7dd3fc" fontSize="9.5" fontWeight="700">Pulm. Trunk</text>

        <rect x="322" y="66" width="116" height="86" rx="18" fill="#134e4a" fillOpacity="0.92" stroke="#2dd4bf" strokeWidth="2" />
        <text x="380" y="96" textAnchor="middle" fill="#ccfbf1" fontSize="12" fontWeight="700">🫁 Alveoli</text>
        <text x="380" y="114" textAnchor="middle" fill="#99f6e4" fontSize="10">CO₂ out · O₂ in</text>
        <text x="380" y="132" textAnchor="middle" fill="#5eead4" fontSize="10">SpO₂ → 98%</text>

        <line x1="438" y1="108" x2="494" y2="68" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arr-red)" />
        <text x="466" y="75" fill="#fca5a5" fontSize="9.5" fontWeight="700">4 Pulm V.</text>

        {/* LA + LV */}
        <rect x="498" y="34" width="112" height="62" rx="14" fill="#991b1b" fillOpacity="0.92" stroke="#f87171" strokeWidth="2" />
        <text x="554" y="61" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700">Left Atrium</text>
        <text x="554" y="78" textAnchor="middle" fill="#fecaca" fontSize="10">Posterior Base</text>

        <line x1="554" y1="96" x2="554" y2="128" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arr-red)" />
        <text x="585" y="116" fill="#fda4af" fontSize="9.5" fontWeight="700">Mitral</text>

        <rect x="498" y="132" width="112" height="64" rx="14" fill="#7f1d1d" fillOpacity="0.95" stroke="#ef4444" strokeWidth="2.5" />
        <text x="554" y="159" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700">Left Ventricle</text>
        <text x="554" y="177" textAnchor="middle" fill="#fecaca" fontSize="10">120 / 8 mmHg · Apex</text>

        {/* Aorta */}
        <line x1="610" y1="164" x2="646" y2="125" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arr-red)" />
        <rect x="650" y="74" width="95" height="72" rx="14" fill="#be123c" fillOpacity="0.92" stroke="#fda4af" strokeWidth="2" />
        <text x="697" y="104" textAnchor="middle" fill="#ffffff" fontSize="11.5" fontWeight="700">Aorta</text>
        <text x="697" y="122" textAnchor="middle" fill="#ffe4e6" fontSize="10">120/80 mmHg</text>
      </svg>
    ),
  },

  'cv-cardiac-cycle-conduction': {
    kind: 'custom',
    title: '⚡ Conduction Hierarchy, ECG & Coronary Perfusion Timing',
    subtitle: 'LV coronary perfusion peaks during early DIASTOLE when wall tension drops; RCA perfuses SA/AV nodes.',
    legend: [
      { label: 'Electrical Depolarization (P → QRS → T)', color: '#14b8a6' },
      { label: 'Mechanical S1 (AV close) & S2 (Semilunar close)', color: '#f59e0b' },
      { label: 'Peak LV Coronary Flow = Diastole', color: '#ef4444' },
    ],
    svg: (
      <svg viewBox="0 0 760 210" className="w-full h-auto" role="img" aria-label="Cardiac ECG and diastolic coronary perfusion diagram">
        {/* Background grid */}
        <rect x="12" y="12" width="736" height="186" rx="14" fill="#090d16" stroke="#1e293b" strokeWidth="1.5" />
        {/* Systole / Diastole zones */}
        <rect x="180" y="22" width="230" height="166" rx="8" fill="#ef4444" fillOpacity="0.1" />
        <rect x="415" y="22" width="320" height="166" rx="8" fill="#14b8a6" fillOpacity="0.12" />
        <text x="295" y="42" textAnchor="middle" fill="#fda4af" fontSize="11" fontWeight="700">SYSTOLE (S1 → S2 · 0.3s)</text>
        <text x="575" y="42" textAnchor="middle" fill="#5eead4" fontSize="11" fontWeight="700">DIASTOLE (Peak LV Coronary Flow · 0.5s)</text>

        {/* ECG Trace */}
        <polyline
          fill="none"
          stroke="#2dd4bf"
          strokeWidth="3"
          points="30,118 85,118 100,103 115,118 165,118 175,128 190,56 205,138 220,118 330,118 360,92 395,118 710,118"
        />
        <text x="100" y="94" textAnchor="middle" fill="#99f6e4" fontSize="10" fontWeight="700">P (SA→Atria)</text>
        <text x="190" y="50" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="800">QRS (His-Purkinje)</text>
        <text x="360" y="83" textAnchor="middle" fill="#99f6e4" fontSize="10" fontWeight="700">T (Repol.)</text>

        {/* Bottom Coronary Wave */}
        <path
          d="M 30 165 L 180 165 L 200 178 L 410 176 L 445 142 C 510 138, 620 155, 725 162"
          fill="none"
          stroke="#f87171"
          strokeWidth="3"
        />
        <text x="295" y="168" textAnchor="middle" fill="#fca5a5" fontSize="10">Systolic extravascular compression</text>
        <text x="575" y="178" textAnchor="middle" fill="#fecaca" fontSize="10.5" fontWeight="700">Peak Diastolic Coronary Blood Flow</text>
        <circle cx="185" cy="118" r="5" fill="#f59e0b" />
        <text x="165" y="148" fill="#fcd34d" fontSize="10" fontWeight="700">S1</text>
        <circle cx="412" cy="118" r="5" fill="#f59e0b" />
        <text x="415" y="102" fill="#fcd34d" fontSize="10" fontWeight="700">S2</text>
      </svg>
    ),
  },

  'msk-axial-appendicular-skeleton': {
    kind: 'pipeline',
    title: '🦴 High-Yield Fracture Sites → Neurovascular & Bone Injuries',
    subtitle: 'Map every hallmark bone fracture straight to its vulnerable nerve or avascular necrosis zone.',
    footerBadge: '💡 Clavicle = Br. Plexus/Subclavian | Surg. Neck = Axillary | Midshaft = Radial | Med. Epicondyle = Ulnar | Scaphoid & Femoral Neck = AVN',
    nodes: [
      { emoji: '💀', label: 'Pterion Fracture', sub: 'Mid. Meningeal Art. → Epidural Hematoma (EDH)', tone: 'rose' },
      { emoji: '🦴', label: 'Humerus Surg. Neck', sub: 'Axillary Nerve → Deltoid weakness / Regimental badge', tone: 'amber' },
      { emoji: '✋', label: 'Humerus Midshaft', sub: 'Radial Nerve (Spiral groove) → Wrist Drop', tone: 'teal' },
      { emoji: '🤏', label: 'Scaphoid Waist', sub: 'Retrograde Radial Art. → Proximal Pole AVN', tone: 'cyan' },
      { emoji: '🦵', label: 'Femoral Neck (Intracap.)', sub: 'Med. Femoral Circumflex → Short & Ext. Rotated + AVN', tone: 'violet' },
    ],
  },

  'an-brachial-plexus-limbs': {
    kind: 'pipeline',
    title: '🕸️ Brachial Plexus Roots to Terminal Branches ("RTDCB")',
    subtitle: 'Roots (C5–T1) → Trunks (Upper/Mid/Lower) → Divisions → Cords (Lat/Post/Med) → 5 Terminal Nerves',
    footerBadge: '⚠️ Upper Trunk (C5-C6) = Erb "Waiter’s tip" | Lower Trunk (C8-T1) = Klumpke Claw Hand + Horner | Long Thoracic C5-C7 = Winged Scapula',
    nodes: [
      { emoji: '1️⃣', label: 'Roots (C5–T1)', sub: 'Post. interscalene triangle · C5-C7 → Long Thoracic n.', tone: 'teal' },
      { emoji: '2️⃣', label: '3 Trunks', sub: 'Upper (C5-6 Erb), Middle (C7), Lower (C8-T1 Klumpke)', tone: 'cyan' },
      { emoji: '3️⃣', label: '6 Divisions', sub: '3 Anterior (flexors) + 3 Posterior (extensors) behind clavicle', tone: 'sky' },
      { emoji: '4️⃣', label: '3 Cords', sub: 'Lateral, Posterior & Medial named around 2nd part Axillary Art.', tone: 'amber' },
      { emoji: '5️⃣', label: '5 Terminal Nerves', sub: 'M (Musculocut.), A (Axillary), R (Radial), M (Median), U (Ulnar)', tone: 'violet' },
    ],
  },

  'an-brainstem-cranial-nerves': {
    kind: 'pipeline',
    title: '🧠 Brainstem "Rule of 4s" & Skull Base Exit Foramina',
    subtitle: 'Four midline structures ("4 Ms") + Four lateral structures ("4 Ss") + 4 cranial nerves per brainstem segment.',
    footerBadge: '📌 Midbrain: III, IV | Pons: V, VI, VII, VIII | Medulla: IX, X, XI, XII · Paramedian stroke hits M’s; Lateral stroke hits S’s.',
    nodes: [
      { emoji: '👁️', label: 'Midbrain (CN III, IV)', sub: 'Cerebral aqueduct · Weber (III + contra hemiplegia) · Sup. Orb. Fissure', tone: 'rose' },
      { emoji: '👂', label: 'Pons (CN V–VIII)', sub: 'Basilar sulcus · PPRF gaze & CN VI/VII facial colliculus', tone: 'amber' },
      { emoji: '🗣️', label: 'Medulla (CN IX–XII)', sub: 'PICA Lateral Medullary (Wallenberg) · Foramen Magnum / Jugular', tone: 'teal' },
      { emoji: '⚖️', label: '4 Midline "M" Tracts', sub: 'Motor pathway (CST), Medial Lemniscus, MLF, Motor Nuclei (III,IV,VI,XII)', tone: 'cyan' },
    ],
  },

  'resp-mechanics-gas-exchange': {
    kind: 'compare',
    title: '🫁 Boyle’s Law Inspiration vs Passive Expiration',
    subtitle: 'Diaphragm descent expands thoracic volume -> negative alveolar pressure pulls air down the gradient.',
    leftTitle: 'Quiet Inspiration (Active ⚡)',
    leftColor: 'text-teal-700 dark:text-teal-300',
    leftSvg: (
      <div className="text-xs space-y-1.5 font-mono text-slate-700 dark:text-slate-200">
        <div>⬇️ Diaphragm (C3-C5) contracts &amp; flattens</div>
        <div>🌬️ Intrapleural P: -5 → -8 cmH₂O</div>
        <div>📉 Alveolar P: 0 → -1 cmH₂O (Air flows IN)</div>
      </div>
    ),
    leftPoints: ['External intercostals elevate bucket-handle ribs', 'CO₂ crosses alveolar barrier ~20× faster than O₂'],
    rightTitle: 'Quiet Expiration (Passive 🌿)',
    rightColor: 'text-cyan-700 dark:text-cyan-300',
    rightSvg: (
      <div className="text-xs space-y-1.5 font-mono text-slate-700 dark:text-slate-200">
        <div>⬆️ Lung-chest wall elastic recoil dominates</div>
        <div>🌬️ Intrapleural P: -8 → -5 cmH₂O</div>
        <div>📈 Alveolar P: +1 → 0 cmH₂O (Air flows OUT to FRC)</div>
      </div>
    ),
    rightPoints: ['Type II pneumocyte DPPC lowers tension (P = 2T/r)', 'Tension pneumothorax collapses lung via +ve pleural P'],
  },

  'renal-nephron-filtration': {
    kind: 'pipeline',
    title: '🧬 Nephron Segmental Transport & Diuretic Targets',
    subtitle: 'Starling GFR (~125 mL/min = 180 L/day) refined sequentially across PCT, Loop, DCT & Collecting Duct.',
    footerBadge: '💊 Loop (NKCC2) = Furosemide | DCT (NCC) = Thiazides | CD (ENaC/Aldosterone) = Spironolactone/Amiloride | PCT (CAi) = Acetazolamide',
    nodes: [
      { emoji: '🩸', label: 'Glomerulus', sub: 'NFP = PGC(60) - PBS(15) - πGC(32) ≈ +13 mmHg', tone: 'rose' },
      { emoji: '🔋', label: 'PCT (Bulk 65%)', sub: 'Reabsorbs 100% Glucose (SGLT2/1), AA & HCO₃⁻', tone: 'teal' },
      { emoji: '🔁', label: 'Thick Asc. Loop', sub: 'Impermeable to H₂O · NKCC2 dilutes urine (Ca²⁺/Mg²⁺)', tone: 'amber' },
      { emoji: '🧂', label: 'DCT (Early)', sub: 'NCC Na⁺/Cl⁻ cotransport · PTH boosts Ca²⁺ uptake', tone: 'cyan' },
      { emoji: '💧', label: 'Collecting Duct', sub: 'ADH inserts AQP2 water channels · Aldosterone ENaC', tone: 'violet' },
    ],
  },

  'neuro-action-potential-synapse': {
    kind: 'custom',
    title: '⚡ Action Potential Curve & Chemical Synapse Trigger',
    subtitle: 'VG-Na⁺ fast depolarization (+30 mV) → VG-K⁺ repolarization → Presynaptic Ca²⁺ SNARE exocytosis.',
    legend: [
      { label: 'Threshold (-55 mV) -> VG-Na⁺ influx (+30 mV)', color: '#f43f5e' },
      { label: 'VG-K⁺ efflux (Repolarization & Hyperpolarization)', color: '#38bdf8' },
      { label: 'Saltatory conduction at Nodes of Ranvier', color: '#14b8a6' },
    ],
    svg: (
      <svg viewBox="0 0 760 190" className="w-full h-auto" role="img" aria-label="Neuronal action potential waveform diagram">
        <rect x="12" y="12" width="736" height="166" rx="14" fill="#090d16" stroke="#1e293b" strokeWidth="1.5" />
        <line x1="60" y1="130" x2="720" y2="130" stroke="#475569" strokeDasharray="5 4" />
        <text x="20" y="133" fill="#94a3b8" fontSize="10">-70mV</text>
        <line x1="60" y1="108" x2="720" y2="108" stroke="#f59e0b" strokeDasharray="4 4" strokeOpacity="0.6" />
        <text x="16" y="111" fill="#fbbf24" fontSize="10">-55mV</text>
        <line x1="60" y1="36" x2="720" y2="36" stroke="#475569" strokeDasharray="4 4" strokeOpacity="0.4" />
        <text x="18" y="40" fill="#f87171" fontSize="10">+30mV</text>
        <path
          d="M 65 130 L 160 130 C 185 129, 200 108, 212 108 C 228 108, 240 34, 255 34 C 270 34, 285 148, 305 148 C 325 148, 350 130, 385 130 L 470 130"
          fill="none"
          stroke="#2dd4bf"
          strokeWidth="3.5"
        />
        <text x="248" y="25" textAnchor="middle" fill="#fda4af" fontSize="10.5" fontWeight="700">1. VG-Na⁺ Influx</text>
        <text x="335" y="166" textAnchor="middle" fill="#7dd3fc" fontSize="10" fontWeight="700">2. VG-K⁺ Hyperpol.</text>
        {/* Synapse box */}
        <rect x="495" y="34" width="235" height="122" rx="14" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
        <text x="612" y="58" textAnchor="middle" fill="#67e8f9" fontSize="11.5" fontWeight="700">3. Chemical Synapse</text>
        <text x="612" y="80" textAnchor="middle" fill="#e2e8f0" fontSize="10">AP opens Presynaptic VG-Ca²⁺</text>
        <text x="612" y="100" textAnchor="middle" fill="#5eead4" fontSize="10">Synaptotagmin + SNAREs fuse vesicle</text>
        <text x="612" y="120" textAnchor="middle" fill="#fde68a" fontSize="10">NT → Postsynaptic EPSP / IPSP</text>
        <text x="612" y="140" textAnchor="middle" fill="#94a3b8" fontSize="9.5">Oligodendrocyte (CNS) · Schwann (PNS)</text>
      </svg>
    ),
  },

  'msk-sarcomere-contraction': {
    kind: 'compare',
    title: '💪 Sarcomere Sliding-Filament Band Changes During Contraction',
    subtitle: 'Actin (thin) slides over Myosin (thick) — thick A-band stays FIXED while H-zone, I-band, and Z-Z shorten.',
    leftTitle: 'Relaxed Sarcomere',
    leftColor: 'text-slate-800 dark:text-slate-200',
    leftSvg: (
      <div className="space-y-1 text-xs font-mono">
        <div className="text-teal-600 dark:text-teal-400">|---- Z ---- [ Wide I ] ---- [ Wide H ] ---- Z ----|</div>
        <div>✅ Tropomyosin blocks actin binding sites</div>
      </div>
    ),
    leftPoints: ['Low cytosolic Ca²⁺ keeps Troponin-I inhibiting cross-bridge'],
    rightTitle: 'Contracted ("H & I Shorten, A Constant")',
    rightColor: 'text-rose-700 dark:text-rose-300',
    rightSvg: (
      <div className="space-y-1 text-xs font-mono">
        <div className="text-rose-600 dark:text-rose-400">|-- Z -- [Narrow I] -- [A Constant] -- Z --|</div>
        <div>⚡ Ca²⁺ binds Troponin-C → Myosin head pulls (ADP+Pi release)</div>
      </div>
    ),
    rightPoints: ['Fresh ATP needed to DETACH myosin head (lack → rigor mortis)'],
  },

  'biochem-dna-replication': {
    kind: 'pipeline',
    title: '🧬 Semi-Conservative Replication Fork Enzymology (5’ → 3’)',
    subtitle: 'All DNA polymerases synthesize strictly 5’→3’ and proofread 3’→5’.',
    footerBadge: '💡 Leading strand = continuous | Lagging strand = discontinuous Okazaki fragments joined by Ligase after Pol I / RNase H.',
    nodes: [
      { emoji: '🌀', label: 'Topoisomerase', sub: 'Relieves positive supercoils ahead (Fluorquinolone / Etoposide)', tone: 'violet' },
      { emoji: '✂️', label: 'DNA Helicase', sub: 'Unwinds dsDNA into ssDNA templates (SSB protects)', tone: 'cyan' },
      { emoji: '🏷️', label: 'RNA Primase', sub: 'Lays short RNA primer providing free 3’-OH', tone: 'amber' },
      { emoji: '⚡', label: 'DNA Pol III / δ,ε', sub: 'Leading continuous 5’→3’; Lagging Okazaki fragments', tone: 'teal' },
      { emoji: '🔗', label: 'Pol I + Ligase', sub: 'Excises RNA primers (5’→3’ exo) & seals phosphodiester nick', tone: 'emerald' },
    ],
  },

  'biochem-glycolysis-tca': {
    kind: 'pipeline',
    title: '🔥 Glucose Oxidation: Glycolysis (Cytosol) → PDH → TCA (Mitochondria)',
    subtitle: 'Three irreversible glycolytic steps (HK, PFK-1, Pyruvate Kinase) commit glucose toward acetyl-CoA ATP generation.',
    footerBadge: '⚠️ Thiamine (B1) is essential cofactor for PDH & α-KG Dehydrogenase — deficiency causes lactic acidosis & Wernicke!',
    nodes: [
      { emoji: '🍯', label: 'Hexokinase / Glucokinase', sub: 'Traps Glucose → G6P (-1 ATP) · Liver GK high Km', tone: 'teal' },
      { emoji: '🚦', label: 'PFK-1 (Rate-Limiting)', sub: 'Activated by F2,6BP / AMP · Inhibited by ATP / Citrate', tone: 'rose' },
      { emoji: '⚡', label: 'Pyruvate Kinase', sub: 'PEP → Pyruvate (+2 net ATP, +2 NADH per glucose)', tone: 'amber' },
      { emoji: '🔑', label: 'PDH Complex (5 Cofactors)', sub: 'B1, B2, B3, B5, Lipoic · Inhibited by Arsenic / EtOH', tone: 'violet' },
      { emoji: '🔄', label: 'Mitochondrial TCA', sub: '3 NADH + 1 FADH₂ + 1 GTP per Acetyl-CoA (Isocitrate DH RLE)', tone: 'emerald' },
    ],
  },

  'path-ischemic-cell-injury': {
    kind: 'compare',
    title: '🔬 Reversible Injury vs Irreversible Cell Death',
    subtitle: 'Mitochondrial Permeability Transition + severe plasma membrane damage marks the Point of No Return.',
    leftTitle: 'Reversible Injury (Cell Swelling)',
    leftColor: 'text-amber-700 dark:text-amber-300',
    leftSvg: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-200">
        <div>⬇️ ↓ ATP → Na⁺/K⁺ pump fails → Hydropic swelling</div>
        <div>🫧 Ribosome detachment, membrane blebs, myelin figures</div>
      </div>
    ),
    leftPoints: ['Anaerobic glycolysis lowers pH -> nuclear chromatin clumping'],
    rightTitle: 'Irreversible Necrosis vs Apoptosis',
    rightColor: 'text-rose-700 dark:text-rose-300',
    rightSvg: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-200">
        <div>💥 Ca²⁺ activates phospholipases/proteases → membrane rupture</div>
        <div>💀 Pyknosis → Karyorrhexis → Karyolysis + Inflammation</div>
      </div>
    ),
    rightPoints: ['Coagulative (Heart/Kidney) vs Liquefactive (Brain/Abscess) vs Caseous (TB)'],
  },

  'pharma-raas-antihypertensives': {
    kind: 'pipeline',
    title: '💊 RAAS Cascade & Antihypertensive Receptor Targets',
    subtitle: 'Blocking Angiotensin II dilates EFFERENT arterioles, reduces aldosterone/afterload, and reverses remodeling.',
    footerBadge: '⚠️ Dry cough & angioedema = ACEi (bradykinin buildup) -> Switch to ARB. Contraindicated in pregnancy & bilateral RAS!',
    nodes: [
      { emoji: '🫘', label: 'JG Cells → Renin', sub: 'Blocked by β-blockers (Metoprolol) & Aliskiren', tone: 'teal' },
      { emoji: '🫁', label: 'ACE (Pulm. Endothelium)', sub: 'Ang I → Ang II · Blocked by ACEi (-pril) ↑ Bradykinin', tone: 'rose' },
      { emoji: '🎯', label: 'AT1 Receptors', sub: 'Efferent vasoconstriction · Blocked by ARBs (-sartan)', tone: 'cyan' },
      { emoji: '🧂', label: 'Loop / DCT Tubules', sub: 'Furosemide (NKCC2) vs Hydrochlorothiazide (NCC)', tone: 'amber' },
      { emoji: '🛡️', label: 'Aldosterone (MRA)', sub: 'Spironolactone / Eplerenone lower mortality in HFrEF', tone: 'violet' },
    ],
  },

  'micro-gram-positive-cocci': {
    kind: 'pipeline',
    title: '🦠 Gram-Positive Cocci Lab Identification Algorithm',
    subtitle: 'Catalase splits Staphylococci (+) from Streptococci (−); Coagulase & Hemolysis finalize speciation.',
    footerBadge: '💡 MRSA resistance = mecA gene altering PBP2a (Treat: Vancomycin/Linezolid). Viridans = Optochin Resistant; Pneumococcus = Optochin Sensitive!',
    nodes: [
      { emoji: '🟣', label: 'Gram (+) Cocci', sub: 'Thick Peptidoglycan Retains Crystal Violet', tone: 'violet' },
      { emoji: '🫧', label: 'Catalase (+): Clusters', sub: 'Staphylococcus · Coagulase (+) → S. aureus (Gold/Protein A)', tone: 'amber' },
      { emoji: '🧬', label: 'Coagulase (−) Staph', sub: 'Novobiocin Sens. = S. epidermidis · Res. = S. saprophyticus', tone: 'cyan' },
      { emoji: '⛓️', label: 'Catalase (−): Chains', sub: 'β-hemolysis: Grp A (Bacitracin S) vs Grp B (CAMP+)', tone: 'teal' },
      { emoji: '🫁', label: 'α-hemolysis', sub: 'Optochin Sens/Bile Sol = S. pneumoniae · Opt. Res = Viridans', tone: 'emerald' },
    ],
  },

  'fmt-organophosphate-poisoning': {
    kind: 'compare',
    title: '☠️ Organophosphate Cholinergic Toxidrome & Antidote Rescue',
    subtitle: 'Irreversible AChE phosphorylation floods both Muscarinic ("DUMBBELLSS") and Nicotinic ("Days of the Week") synapses.',
    leftTitle: 'Atropine (Muscarinic Blocker)',
    leftColor: 'text-emerald-700 dark:text-emerald-300',
    leftSvg: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-200">
        <div>🫁 Clears bronchorrhea, bronchospasm &amp; bradycardia</div>
        <div>🎯 Titrate until lungs are DRY (not pupil size!)</div>
      </div>
    ),
    leftPoints: ['Does NOT reverse nicotinic skeletal paralysis or fasciculations'],
    rightTitle: 'Pralidoxime / 2-PAM (Enzyme Regenerator)',
    rightColor: 'text-cyan-700 dark:text-cyan-300',
    rightSvg: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-200">
        <div>⚡ Cleaves OP from AChE BEFORE permanent "aging"</div>
        <div>💪 Restores nicotinic respiratory &amp; skeletal muscle power</div>
      </div>
    ),
    rightPoints: ['Give early together with Atropine + airway/decontamination'],
  },

  'cm-phase2-epidemiology-immunization': {
    kind: 'pipeline',
    title: '📊 Epidemiological Chain, Iceberg Phenomenon & Cold Chain',
    subtitle: 'Link epidemiological triad, natural history levels of prevention, and vaccine cold-chain storage (+2°C to +8°C).',
    footerBadge: '❄️ Freeze-sensitive (NEVER freeze): DPT, TT/Td, HepB, Pentavalent (Shake Test). Heat-sensitive: OPV, BCG, Measles/MR.',
    nodes: [
      { emoji: '🔺', label: 'Epidemiological Triad', sub: 'Agent + Host + Environment -> Vector / Reservoir dynamics', tone: 'teal' },
      { emoji: '🧊', label: 'Iceberg Phenomenon', sub: 'Clinical tip vs Huge submerged subclinical/carrier burden', tone: 'cyan' },
      { emoji: '🛡️', label: 'Primary Prevention', sub: 'Health promotion + Specific protection (Vaccines before onset)', tone: 'emerald' },
      { emoji: '🔍', label: 'Secondary Prevention', sub: 'Early diagnosis & prompt treatment (Screening, DOTS, MDT)', tone: 'amber' },
      { emoji: '❄️', label: 'Cold Chain (+2 to +8°C)', sub: 'ILR at PHC · VVM monitors cumulative heat exposure', tone: 'sky' },
    ],
  },

  'psm-diagnostic-screening': {
    kind: 'matrix',
    title: '📈 2×2 Screening Evaluation Matrix (Sensitivity, Specificity & PPV)',
    subtitle: 'Sensitivity & Specificity are intrinsic to the test; PPV & NPV depend strongly on disease prevalence.',
    colHeaders: ['Disease Present (D+)', 'Disease Absent (D−)'],
    rowHeaders: ['Test Positive (T+)', 'Test Negative (T−)'],
    cells: [
      { label: 'True Positive (a)', emoji: '✅', sub: 'Sens = a / (a + c)', cls: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700' },
      { label: 'False Positive (b)', emoji: '⚠️', sub: 'PPV = a / (a + b)', cls: 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700' },
      { label: 'False Negative (c)', emoji: '❌', sub: 'SnNOUT rules OUT', cls: 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700' },
      { label: 'True Negative (d)', emoji: '🛡️', sub: 'Spec = d / (b + d) · SpPIN', cls: 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-300 dark:border-cyan-700' },
    ],
    formulaNote: '💡 ↑ Prevalence → ↑ PPV and ↓ NPV (Sensitivity & Specificity remain unchanged).',
  },

  'fmt-injuries-postmortem-jurisprudence': {
    kind: 'pipeline',
    title: '⚖️ Mechanical Injuries & Postmortem Thanatology Timeline',
    subtitle: 'Differentiate abrasion, contusion, laceration vs incised wound and estimate Time Since Death (TSD).',
    footerBadge: '📌 Algor mortis (cooling) -> Livor mortis (fixes 6–8h) -> Rigor mortis (ATP loss; starts eyelids 1–2h, whole body 12h, passes 24–36h).',
    nodes: [
      { emoji: '🩹', label: 'Abrasion & Contusion', sub: 'Blunt superficial friction vs Extravasated dermal blood (color shift)', tone: 'amber' },
      { emoji: '🔪', label: 'Laceration vs Incised', sub: 'Blunt tearing = tissue bridges & bruised margins · Sharp = clean cut', tone: 'rose' },
      { emoji: '🌡️', label: 'Cooling (Algor Mortis)', sub: 'Rectal temp drops ~0.5–1.0°C/hr toward ambient', tone: 'sky' },
      { emoji: '🟣', label: 'Livor Mortis (Hypostasis)', sub: 'Appears 1–3h, fixes by 6–8h · Cherry red = CO poisoning', tone: 'violet' },
      { emoji: '🦴', label: 'Rigor Mortis (ATP Loss)', sub: 'Rule of 12s: 12h develop, 12h persist, 12h disappear', tone: 'teal' },
    ],
  },

  'ent-hearing-loss-tuning-forks': {
    kind: 'matrix',
    title: '👂 Tuning Fork (512 Hz) Differentiation Matrix',
    subtitle: 'Compare Air Conduction (AC) vs Bone Conduction (BC) via Rinne and lateralization via Weber.',
    colHeaders: ['Conductive Loss (e.g., Otosclerosis / Wax)', 'Sensorineural Loss (e.g., Presbycusis / Acoustic Neuroma)'],
    rowHeaders: ['Rinne Test (AC vs BC)', 'Weber Test (Forehead)'],
    cells: [
      { label: 'Rinne NEGATIVE (BC > AC)', emoji: '🔇', sub: 'Air-bone gap present in affected ear', cls: 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700' },
      { label: 'Rinne POSITIVE (AC > BC)', emoji: '🔊', sub: 'Both AC & BC reduced equally', cls: 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-300 dark:border-cyan-700' },
      { label: 'Weber → AFFECTED Ear', emoji: '➡️', sub: 'Unmasked ambient noise absent', cls: 'bg-teal-50 dark:bg-teal-950/40 border-teal-300 dark:border-teal-700' },
      { label: 'Weber → NORMAL (Better) Ear', emoji: '⬅️', sub: 'Cochlear/CN VIII intact side wins', cls: 'bg-violet-50 dark:bg-violet-950/40 border-violet-300 dark:border-violet-700' },
    ],
    formulaNote: '⚠️ Watch for False-Negative Rinne in profound unilateral SNHL (sound conducts through skull to healthy cochlea)!',
  },

  'ophtha-angle-closure-glaucoma': {
    kind: 'pipeline',
    title: '👁️ Aqueous Humor Flow & Acute Angle-Closure Emergency',
    subtitle: 'Ciliary epithelium -> Posterior chamber -> Pupil -> Trabecular meshwork & Canal of Schlemm (Explore in 3D Eye!).',
    footerBadge: '🚨 Acute Attack (Pain, halos, stony-hard globe, mid-dilated pupil): Acetazolamide + Pilocarpine + Mannitol/Timolol → Laser Iridotomy!',
    nodes: [
      { emoji: '💧', label: 'Ciliary Processes', sub: 'Actively secrete aqueous humor (carbonic anhydrase)', tone: 'cyan' },
      { emoji: '🌑', label: 'Pupillary Margin', sub: 'Blocked by forward lens-iris apposition in mid-dilation', tone: 'amber' },
      { emoji: '🚪', label: 'Iridocorneal Angle', sub: 'Iris bows anteriorly blocking Trabecular Meshwork', tone: 'rose' },
      { emoji: '📈', label: 'IOP Surge (>40–60 mmHg)', sub: 'Corneal epithelial edema (rainbows/halos) + nausea', tone: 'violet' },
      { emoji: '🔦', label: 'Optic Disc Cupping', sub: 'Ischemic axon death at Lamina Cribrosa (CN II)', tone: 'teal' },
    ],
  },

  'clin-ward-history-examination': {
    kind: 'pipeline',
    title: '🩺 3rd-Year Clinical Postings: Structured Ward Case Workflow',
    subtitle: 'Systematic transition across Internal Medicine, General Surgery, Pediatrics, and OB-GYN postings.',
    footerBadge: '📌 Always begin with Consent, Hand Hygiene & General Appearance (PICCLED: Pallor, Icterus, Cyanosis, Clubbing, Lymphadenopathy, Edema).',
    nodes: [
      { emoji: '📋', label: 'Chief Complaint & HPI', sub: 'SOCRATES pain history · Red flags · Past/Drug/Allergy', tone: 'teal' },
      { emoji: '🌡️', label: 'Vitals + GPE (PICCLED)', sub: 'Temp, PR, BP (both arms), RR, SpO₂, Pallor/Icterus/JVP', tone: 'cyan' },
      { emoji: '🫀', label: 'Systemic Triad (Med)', sub: 'Inspection -> Palpation -> Percussion -> Auscultation', tone: 'emerald' },
      { emoji: '🔪', label: 'Surgical Swelling/Abdomen', sub: 'Edges, temperature, fluctuance, transillumination, guarding', tone: 'amber' },
      { emoji: '👶', label: 'OBG & Pediatrics Specifics', sub: 'Obstetric LMP/EDD/SFH/FHS · Peds Immunization & Growth', tone: 'violet' },
    ],
  },

  'med-acute-coronary-syndrome': {
    kind: 'pipeline',
    title: '🫀 Acute Coronary Syndrome (STEMI) ECG Territory & Door-to-Balloon',
    subtitle: 'Immediate aspirin + P2Y12 + anticoagulation + PCI (<90–120 min) or Fibrinolysis.',
    footerBadge: '📊 Ant. (V1-V4) = LAD | Lat. (I, aVL, V5-6) = LCx | Inf. (II, III, aVF) = RCA (avoid nitrates if V4R+ RVMI!).',
    nodes: [
      { emoji: '⚡', label: 'ECG < 10 Minutes', sub: 'Detect ST elevation ≥1 mm (≥2 mm V2-V3) or new LBBB', tone: 'rose' },
      { emoji: '💊', label: 'Immediate Antiplatelets', sub: 'Chewable Aspirin 300–325mg + Ticagrelor/Clopidogrel + Heparin', tone: 'amber' },
      { emoji: '🏥', label: 'Reperfusion Strategy', sub: 'Primary PCI within 90–120m (or Tenecteplase <30m if transfer >120m)', tone: 'teal' },
      { emoji: '🔬', label: 'Troponin I Kinetics', sub: 'Rises 3–6h, peaks 24h, stays high 7–14 days', tone: 'cyan' },
      { emoji: '🛡️', label: 'Secondary Prevention', sub: 'DAPT 12m + High-intensity Statin + β-blocker + ACEi', tone: 'emerald' },
    ],
  },

  'surg-atls-primary-survey': {
    kind: 'pipeline',
    title: '🚑 ATLS Trauma Primary Survey ("ABCDE") & Immediate Threats',
    subtitle: 'Treat life-threatening findings immediately before moving to the next letter.',
    footerBadge: '🚨 Tension Pneumothorax = Needle decompression (4th/5th ICS anterior axillary adults / 2nd ICS MCL) -> Tube Thoracostomy.',
    nodes: [
      { emoji: '🗣️', label: 'A: Airway + C-Spine', sub: 'Speak response? Jaw thrust + C-collar immobilization', tone: 'teal' },
      { emoji: '🫁', label: 'B: Breathing & Chest', sub: 'Rule out Tension PTX, Open PTX, Flail Chest, Massive Hemothorax', tone: 'rose' },
      { emoji: '🩸', label: 'C: Circulation & eFAST', sub: '2 wide-bore IVs, control hemorrhage, pelvic binder, 1:1:1 RBC:FFP:Plt', tone: 'amber' },
      { emoji: '🧠', label: 'D: Disability', sub: 'GCS score + Pupil size/reactivity + Blood glucose', tone: 'cyan' },
      { emoji: '🌡️', label: 'E: Exposure & Warmth', sub: 'Log-roll back exam · Prevent Hypothermia-Acidosis-Coagulopathy triad', tone: 'violet' },
    ],
  },

  'obgyn-pph-management': {
    kind: 'pipeline',
    title: '🤰 Primary Postpartum Hemorrhage (4 Ts) Stepwise Bundle',
    subtitle: 'EBL >500 mL vaginal or >1000 mL cesarean — Tonus (Uterine Atony = 70–80% cases) is commonest.',
    footerBadge: '🚫 Avoid Ergometrine/Methylergonovine in Hypertension/Preeclampsia; avoid Carboprost (PGF2α) in Asthma!',
    nodes: [
      { emoji: '1️⃣', label: 'Tone (70%): Atony', sub: 'Bimanual uterine massage + Empty bladder + High-flow Oxytocin', tone: 'rose' },
      { emoji: '2️⃣', label: 'Uterotonics + TXA', sub: 'Tranexamic acid 1g IV <3h + Misoprostol/Carboprost/Ergometrine', tone: 'amber' },
      { emoji: '3️⃣', label: 'Tissue & Trauma', sub: 'Explore retained placenta fragments & repair genital tract tears', tone: 'cyan' },
      { emoji: '4️⃣', label: 'Thrombin + Tamponade', sub: 'Correct coagulopathy; Bakri uterine tamponade balloon if refractory', tone: 'teal' },
      { emoji: '🔪', label: 'Surgical Escalation', sub: 'B-Lynch brace suture → Uterine/Internal Iliac ligation → Hysterectomy', tone: 'violet' },
    ],
  },

  'peds-neonatal-resuscitation': {
    kind: 'pipeline',
    title: '👶 Neonatal Resuscitation (NRP Golden 60s) & Cyanotic Shunts',
    subtitle: 'Ventilation of the newborn lungs is the single most effective step in neonatal resuscitation.',
    footerBadge: '🔵 Tetralogy of Fallot (Boot heart): VSD + Overriding Aorta + RVH + Pulm. Stenosis. Hypercyanotic spell -> Knee-chest position!',
    nodes: [
      { emoji: '⏱️', label: 'Birth Screening (0–10s)', sub: 'Term gestation? Good tone? Breathing/crying? If YES → skin-to-skin', tone: 'emerald' },
      { emoji: '🔥', label: 'Warm, Dry, Stimulate', sub: 'Clear airway ONLY if obstructed · SpO₂ preductal (Right Hand)', tone: 'amber' },
      { emoji: '💨', label: 'PPV at 60s (MR SOPA)', sub: 'If Apnea/Gasping or HR < 100/min → Positive Pressure Ventilation (21% O₂ term)', tone: 'cyan' },
      { emoji: '🫀', label: 'Compressions (3:1)', sub: 'If HR < 60/min despite 30s effective intubated PPV + 100% O₂', tone: 'rose' },
      { emoji: '💉', label: 'Epinephrine IV/UVC', sub: 'If HR stays < 60/min after 60s coordinated compressions & PPV', tone: 'violet' },
    ],
  },

  'ortho-compartment-syndrome': {
    kind: 'pipeline',
    title: '🦴 Acute Compartment Syndrome — "6 Ps" & Urgent Fasciotomy',
    subtitle: 'Tissue pressure within closed fascial space exceeds capillary perfusion pressure; pain is the earliest hallmark.',
    footerBadge: '⏱️ Do NOT elevate limb or apply ice (worsens ischemia). ΔP (Diastolic BP − Compartment P) < 30 mmHg = Immediate Fasciotomy!',
    nodes: [
      { emoji: '😣', label: '1. Pain Out of Proportion', sub: 'EARLIEST sign · Worse on passive stretch of compartment muscles', tone: 'rose' },
      { emoji: '⚡', label: '2. Paresthesia', sub: 'Early nerve ischemia (e.g., deep peroneal 1st web in anterior leg)', tone: 'amber' },
      { emoji: '🪨', label: '3. Tense Compartment', sub: 'Wood-like swollen tenderness after tibia or supracondylar fracture', tone: 'cyan' },
      { emoji: '🚨', label: 'Late Signs (Do Not Wait!)', sub: 'Pallor, Paralysis & Pulselessness mean irreversible muscle/nerve loss', tone: 'violet' },
      { emoji: '🔪', label: 'Action: Release Cast → Fasciotomy', sub: 'Split cast/dressings immediately -> Dual-incision 4-compartment fasciotomy', tone: 'teal' },
    ],
  },

  'derm-vesiculobullous-disorders': {
    kind: 'compare',
    title: '🧴 Intraepidermal vs Subepidermal Autoimmune Bullous Layers',
    subtitle: 'Desmosomes hold keratinocytes together; Hemidesmosomes anchor basal cells to basement membrane.',
    leftTitle: 'Pemphigus Vulgaris (Desmoglein 1 & 3)',
    leftColor: 'text-rose-700 dark:text-rose-300',
    leftSvg: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-200">
        <div>🫧 <strong>Intraepidermal</strong> acantholysis ("row of tombstones")</div>
        <div>🔴 Flaccid blisters, <strong>Nikolsky (+)</strong>, severe oral erosions</div>
      </div>
    ),
    leftPoints: ['DIF: Net-like "fishnet" IgG intercellular fluorescence'],
    rightTitle: 'Bullous Pemphigoid (BP180 / BP230)',
    rightColor: 'text-teal-700 dark:text-teal-300',
    rightSvg: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-200">
        <div>🛡️ <strong>Subepidermal</strong> dermo-epidermal split</div>
        <div>🟠 Tense, pruritic bullae, <strong>Nikolsky (−)</strong>, oral spared</div>
      </div>
    ),
    rightPoints: ['DIF: Linear IgG & C3 band along basement membrane zone'],
  },

  'psych-bipolar-lithium': {
    kind: 'pipeline',
    title: '🧠 Lithium Narrow Therapeutic Index & Toxicity Thresholds',
    subtitle: 'Reabsorbed in PCT alongside Na⁺: dehydration, NSAIDs, thiazides & ACEi precipitate acute toxicity.',
    footerBadge: '⚠️ Remember "LMNOP": Lithium side effects = Movement (tremor), Nephrogenic DI (ENaC block), hypOthyroidism, Teratogen (Ebstein)!',
    nodes: [
      { emoji: '✅', label: '0.6–1.2 mEq/L', sub: 'Target therapeutic window (0.6–1.0 maintenance; check TSH/Cr/ECG)', tone: 'emerald' },
      { emoji: '🫨', label: '1.5–2.0 mEq/L', sub: 'Mild toxicity: coarse tremor, GI upset, ataxia, dysarthria', tone: 'amber' },
      { emoji: '🚨', label: '> 2.0–2.5 mEq/L', sub: 'Severe neurotoxicity: myoclonus, seizures, coma -> Hemodialysis', tone: 'rose' },
      { emoji: '💊', label: 'Drug Interactions', sub: 'Thiazides, NSAIDs & ACEi ↓ Li clearance (Aspirin/Sulindac safer)', tone: 'cyan' },
    ],
  },

  'anesth-airway-rsi': {
    kind: 'pipeline',
    title: '😷 Mallampati Airway Scoring & RSI ("7 Ps") Sequence',
    subtitle: 'Pre-oxygenation -> Induction + Succinylcholine/Rocuronium -> Intubation without bag-mask aspiration risk.',
    footerBadge: '⚠️ Succinylcholine (depolarizing) causes acute HYPERKALEMIA in burns (>24h), crush injuries, spinal trauma & triggers Malignant Hyperthermia!',
    nodes: [
      { emoji: '👄', label: 'Mallampati Class I–IV', sub: 'I = full uvula/pillars → IV = hard palate only (difficult intubation)', tone: 'cyan' },
      { emoji: '💨', label: 'Pre-oxygenate (100% O₂)', sub: '3–5 min tidal breathing denitrogenates FRC (>5 min apnea buffer)', tone: 'teal' },
      { emoji: '💉', label: 'Induction Agent', sub: 'Etomidate/Ketamine (hemodynamically unstable) vs Propofol (hypotension)', tone: 'amber' },
      { emoji: '⚡', label: 'Paralytic (NMB)', sub: 'Succinylcholine (45–60s; fasciculations) vs Rocuronium (1.2 mg/kg; Sugammadex)', tone: 'violet' },
      { emoji: '🫁', label: 'Confirm ETCO₂ + Auscultate', sub: 'Continuous waveform capnography = gold standard tracheal confirmation', tone: 'emerald' },
    ],
  },

  'radio-ct-head-bleeds': {
    kind: 'compare',
    title: '🩻 Non-Contrast CT Head: Epidural vs Subdural Hematoma',
    subtitle: 'Acute hemorrhage appears bright white (hyperdense); follow cranial sutures vs falx/tentorium boundaries.',
    leftTitle: 'Epidural Hematoma (Arterial · MMA)',
    leftColor: 'text-rose-700 dark:text-rose-300',
    leftSvg: (
      <svg viewBox="0 0 240 120" className="w-full h-28" role="img" aria-label="Epidural hematoma biconvex CT schematic">
        <circle cx="120" cy="60" r="50" fill="#1e293b" stroke="#94a3b8" strokeWidth="3" />
        <path d="M 76 34 Q 108 60 76 86 Q 68 60 76 34 Z" fill="#f8fafc" stroke="#ef4444" strokeWidth="2" />
        <text x="148" y="55" fill="#e2e8f0" fontSize="10" fontWeight="700">Biconvex Lens</text>
        <text x="148" y="70" fill="#fca5a5" fontSize="9">Does NOT cross sutures</text>
      </svg>
    ),
    leftPoints: ['Pterion trauma -> Middle Meningeal Artery', 'Classic lucid interval + CN III herniation'],
    rightTitle: 'Subdural Hematoma (Venous · Bridging Veins)',
    rightColor: 'text-cyan-700 dark:text-cyan-300',
    rightSvg: (
      <svg viewBox="0 0 240 120" className="w-full h-28" role="img" aria-label="Subdural hematoma crescent CT schematic">
        <circle cx="120" cy="60" r="50" fill="#1e293b" stroke="#94a3b8" strokeWidth="3" />
        <path d="M 80 22 C 66 45, 66 75, 80 98 C 76 74, 76 46, 80 22 Z" fill="#f8fafc" stroke="#38bdf8" strokeWidth="2" />
        <text x="148" y="55" fill="#e2e8f0" fontSize="10" fontWeight="700">Crescent / Concave</text>
        <text x="148" y="70" fill="#7dd3fc" fontSize="9">Crosses sutures, not falx</text>
      </svg>
    ),
    rightPoints: ['Elderly atrophy, chronic alcoholism, shaken infant', 'Acute = hyperdense · Chronic = hypodense'],
  },

  'respmed-spirometry-patterns': {
    kind: 'compare',
    title: '💨 Spirometry Loops & Light’s Exudative Pleural Criteria',
    subtitle: 'FEV1/FVC < 0.70 diagnoses airflow obstruction; FEV1/FVC ≥ 0.70–0.80 with ↓ TLC/FVC indicates restriction.',
    leftTitle: 'Obstructive (COPD / Asthma)',
    leftColor: 'text-amber-700 dark:text-amber-300',
    leftSvg: (
      <div className="text-xs space-y-1 font-mono text-slate-700 dark:text-slate-200">
        <div>📉 FEV₁ ↓↓ | FVC ↓ or N → <strong>FEV₁/FVC &lt; 0.70</strong></div>
        <div>📈 TLC &amp; RV ↑ (Air Trapping) · Concave "scooped" loop</div>
      </div>
    ),
    leftPoints: ['Asthma: ≥12% AND ≥200 mL FEV₁ rise post-bronchodilator'],
    rightTitle: 'Restrictive (IPF / Kyphoscoliosis)',
    rightColor: 'text-teal-700 dark:text-teal-300',
    rightSvg: (
      <div className="text-xs space-y-1 font-mono text-slate-700 dark:text-slate-200">
        <div>📊 FEV₁ ↓ | FVC ↓ proportionately → <strong>Ratio Normal/↑</strong></div>
        <div>📉 TLC &lt; 80% predicted · Tall narrow "witch’s hat" loop</div>
      </div>
    ),
    rightPoints: ['Light Exudate if ≥1: PF/Serum Protein >0.5, LDH >0.6, or LDH >2/3 ULN'],
  },

  'em-sepsis-anaphylaxis-acls': {
    kind: 'compare',
    title: '🚨 ACLS Arrest Rhythms, Sepsis Hour-1 Bundle & Anaphylaxis',
    subtitle: 'Immediate high-quality CPR + early Epinephrine; shock ONLY Shockable rhythms (VF & pulseless VT).',
    leftTitle: 'Shockable (VF / Pulseless VT ⚡)',
    leftColor: 'text-rose-700 dark:text-rose-300',
    leftSvg: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-200">
        <div>1️⃣ Immediate CPR + Defibrillate 200J biphasic</div>
        <div>2️⃣ Epinephrine 1 mg IV q3–5m + Amiodarone 300 mg</div>
      </div>
    ),
    leftPoints: ['Non-shockable (PEA / Asystole): CPR + Epinephrine ONLY (No shock!)'],
    rightTitle: 'Anaphylaxis & Sepsis Hour-1 Bundle 💉',
    rightColor: 'text-emerald-700 dark:text-emerald-300',
    rightSvg: (
      <div className="text-xs space-y-1 text-slate-700 dark:text-slate-200">
        <div>💉 Anaphylaxis: IM Epinephrine 0.3–0.5mg (1:1000) Lat. Thigh FIRST</div>
        <div>🧪 Sepsis 1h: Lactate, Blood Cultures, Broad Abx, 30 mL/kg Crystalloid</div>
      </div>
    ),
    rightPoints: ['First-line vasopressor in septic shock = Norepinephrine'],
  },
};

export const MedicalNoteDiagram: React.FC<MedicalNoteDiagramProps> = ({ topicId, captions }) => {
  const spec = TOPIC_DIAGRAMS[topicId];
  if (!spec && (!captions || captions.length === 0)) return null;

  return (
    <div className="rounded-2xl border border-teal-200 dark:border-teal-800/70 bg-gradient-to-br from-slate-50 via-white to-teal-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950/20 p-4 sm:p-5 space-y-4 shadow-xs">
      {spec && (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-300">
                <Eye className="w-3.5 h-3.5" /> Visual High-Yield Diagram
              </span>
              <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white mt-0.5">
                {spec.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">{spec.subtitle}</p>
            </div>
          </div>

          {spec.kind === 'custom' && (
            <div className="space-y-2.5">
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 p-2">
                {spec.svg}
              </div>
              <div className="flex flex-wrap gap-3 text-[11px] text-slate-600 dark:text-slate-300">
                {spec.legend.map((l) => (
                  <span key={l.label} className="inline-flex items-center gap-1.5 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: l.color }} />
                    {l.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {spec.kind === 'pipeline' && (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
                {spec.nodes.map((node, i) => (
                  <div
                    key={node.label}
                    className={`relative rounded-xl border p-3 space-y-1 ${TONE_BOX[node.tone || 'teal']}`}
                  >
                    <div className="flex items-center justify-between text-xs font-extrabold">
                      <span>
                        {node.emoji} {node.label}
                      </span>
                      {i < spec.nodes.length - 1 && (
                        <span className="hidden lg:inline text-slate-400 dark:text-slate-500 font-bold">→</span>
                      )}
                    </div>
                    <p className="text-[11px] opacity-90 leading-snug">{node.sub}</p>
                  </div>
                ))}
              </div>
              <div className="p-2.5 rounded-xl bg-teal-50/90 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/70 text-[11px] text-teal-900 dark:text-teal-200 font-medium">
                {spec.footerBadge}
              </div>
            </div>
          )}

          {spec.kind === 'compare' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/80 p-3.5 space-y-2">
                <h5 className={`text-xs font-extrabold uppercase tracking-wide ${spec.leftColor}`}>
                  {spec.leftTitle}
                </h5>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  {spec.leftSvg}
                </div>
                <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                  {spec.leftPoints.map((pt) => (
                    <li key={pt}>• {pt}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/80 p-3.5 space-y-2">
                <h5 className={`text-xs font-extrabold uppercase tracking-wide ${spec.rightColor}`}>
                  {spec.rightTitle}
                </h5>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  {spec.rightSvg}
                </div>
                <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                  {spec.rightPoints.map((pt) => (
                    <li key={pt}>• {pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {spec.kind === 'matrix' && (
            <div className="space-y-2.5">
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr>
                      <th className="p-2" />
                      {spec.colHeaders.map((c) => (
                        <th
                          key={c}
                          className="p-2 text-center font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900"
                        >
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="p-2 text-left font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                        {spec.rowHeaders[0]}
                      </th>
                      {[0, 1].map((idx) => (
                        <td
                          key={idx}
                          className={`p-3 border text-center ${spec.cells[idx].cls}`}
                        >
                          <div className="font-bold text-slate-900 dark:text-white">
                            {spec.cells[idx].emoji} {spec.cells[idx].label}
                          </div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                            {spec.cells[idx].sub}
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <th className="p-2 text-left font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                        {spec.rowHeaders[1]}
                      </th>
                      {[2, 3].map((idx) => (
                        <td
                          key={idx}
                          className={`p-3 border text-center ${spec.cells[idx].cls}`}
                        >
                          <div className="font-bold text-slate-900 dark:text-white">
                            {spec.cells[idx].emoji} {spec.cells[idx].label}
                          </div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                            {spec.cells[idx].sub}
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] font-medium text-teal-800 dark:text-teal-200 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/70 rounded-xl px-3 py-2">
                {spec.formulaNote}
              </p>
            </div>
          )}
        </>
      )}

      {captions && captions.length > 0 && (
        <div className="space-y-1.5 pt-1">
          {captions.map((cap) => (
            <div
              key={cap.title}
              className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-slate-300 bg-white/80 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-900 dark:text-white">{cap.title}:</strong> {cap.description}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
