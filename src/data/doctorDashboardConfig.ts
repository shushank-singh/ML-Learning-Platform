export type MBBSProfYear = '1st-prof' | '2nd-prof' | '3rd-prof' | 'final-prof';

export interface MBBSSubjectItem {
  id: string;
  title: string;
  profYear: MBBSProfYear;
  profLabel: string;
  badge: string;
  subtitle: string;
  description: string;
  modulesCount: number;
  topicsCount: number;
  estimatedHours: number;
  iconKey:
    | 'anatomy'
    | 'physiology'
    | 'biochem'
    | 'pathology'
    | 'pharma'
    | 'micro'
    | 'forensic'
    | 'psm'
    | 'ophtha'
    | 'ent'
    | 'medicine'
    | 'surgery'
    | 'obgyn'
    | 'peds'
    | 'ortho'
    | 'derm'
    | 'psych'
    | 'radio'
    | 'anesth';
  accentColor: 'emerald' | 'teal' | 'cyan' | 'rose' | 'sky' | 'amber' | 'violet';
  plannedUnits: string[];
  clinicalFocus: string;
}

export const MBBS_PROF_LABELS: Record<MBBSProfYear, string> = {
  '1st-prof': '1st Prof · Pre-Clinical',
  '2nd-prof': '2nd Prof · Para-Clinical',
  '3rd-prof': '3rd Prof · Part I',
  'final-prof': 'Final Prof · Clinical',
};

export const MBBS_SUBJECTS: MBBSSubjectItem[] = [
  // 1st Prof (Pre-Clinical)
  {
    id: 'mbbs-anatomy',
    title: 'Human Anatomy',
    profYear: '1st-prof',
    profLabel: '1st Prof · Pre-Clinical',
    badge: 'Pre-Clinical Core',
    subtitle: 'Gross, Neuroanatomy, Histology & Embryology',
    description:
      'Regional dissection maps, brachial plexus & cranial nerves, thoracic/abdominal relations, histology slides, and clinical embryology.',
    modulesCount: 10,
    topicsCount: 74,
    estimatedHours: 65,
    iconKey: 'anatomy',
    accentColor: 'emerald',
    plannedUnits: [
      'Upper & Lower Limb Plexus Anatomy',
      'Thorax, Mediastinum & Coronary Supply',
      'Abdomen, Pelvis & Peritoneal Reflections',
      'Head, Neck & Cranial Nerve Pathways',
      'Neuroanatomy: Tracts, Brainstem & Cortex',
      'General Histology & Organ Embryology',
    ],
    clinicalFocus: 'Nerve palsy localization, coronary angiography correlation & surgical landmarks',
  },
  {
    id: 'mbbs-physiology',
    title: 'Human Physiology',
    profYear: '1st-prof',
    profLabel: '1st Prof · Pre-Clinical',
    badge: 'Systems Physiology',
    subtitle: 'Cardiac Cycle, Renal, Neuro & Respiratory',
    description:
      'Action potentials, Wiggers cardiac cycle diagrams, respiratory mechanics, nephron countercurrent system, and endocrine feedback loops.',
    modulesCount: 9,
    topicsCount: 62,
    estimatedHours: 54,
    iconKey: 'physiology',
    accentColor: 'teal',
    plannedUnits: [
      'Nerve-Muscle & Membrane Transport',
      'Cardiovascular & Wiggers Cycle Mechanics',
      'Respiratory Volumes, V/Q & Gas Transport',
      'Renal Clearance & Acid-Base Regulation',
      'Gastrointestinal Motility & Secretion',
      'Endocrine Axes & CNS Sensory-Motor Pathways',
    ],
    clinicalFocus: 'ECG physiology, shock hemodynamics, hypoxia patterns & acid-base compensation',
  },
  {
    id: 'mbbs-biochemistry',
    title: 'Medical Biochemistry',
    profYear: '1st-prof',
    profLabel: '1st Prof · Pre-Clinical',
    badge: 'Metabolic Pathways',
    subtitle: 'Enzymes, Metabolism & Molecular Genetics',
    description:
      'Glycolysis, TCA cycle, urea cycle, lipid transport, inborn errors of metabolism, acid-base buffers, and clinical molecular diagnostics.',
    modulesCount: 8,
    topicsCount: 48,
    estimatedHours: 40,
    iconKey: 'biochem',
    accentColor: 'cyan',
    plannedUnits: [
      'Enzyme Kinetics & Clinical Isoenzymes',
      'Carbohydrate & Bioenergetics Pathways',
      'Lipid Lipoproteins & Cholesterol Metabolism',
      'Amino Acid & Urea Cycle Disorders',
      'Vitamins, Minerals & Nutrition Deficiencies',
      'DNA Replication, PCR & Molecular Medicine',
    ],
    clinicalFocus: 'DKA ketogenesis, glycogen storage diseases, jaundice panels & lab biomarkers',
  },

  // 2nd Prof (Para-Clinical)
  {
    id: 'mbbs-pathology',
    title: 'Pathology',
    profYear: '2nd-prof',
    profLabel: '2nd Prof · Para-Clinical',
    badge: 'Disease Mechanisms',
    subtitle: 'Cell Injury, Neoplasia & Systemic Pathology',
    description:
      'Inflammation cascades, hemodynamic shock, immune hypersensitivity, neoplasia genetics, hematopathology, and organ-specific histopathology.',
    modulesCount: 12,
    topicsCount: 84,
    estimatedHours: 72,
    iconKey: 'pathology',
    accentColor: 'rose',
    plannedUnits: [
      'Cell Injury, Necrosis & Apoptosis',
      'Acute/Chronic Inflammation & Repair',
      'Neoplasia & Oncogenic Pathways',
      'Anemias, Leukemias & Coagulation',
      'Cardiovascular & Pulmonary Pathology',
      'Renal Glomerulopathies & Hepatobiliary',
    ],
    clinicalFocus: 'Biopsy slide interpretation, tumor staging & hematology peripheral smears',
  },
  {
    id: 'mbbs-pharmacology',
    title: 'Pharmacology',
    profYear: '2nd-prof',
    profLabel: '2nd Prof · Para-Clinical',
    badge: 'Therapeutics & MOA',
    subtitle: 'PK/PD, Autonomic, CVS, CNS & Antimicrobials',
    description:
      'Receptor kinetics, autonomic drugs, antihypertensives, antimicrobial stewardship, chemotherapy mechanisms, and clinical adverse drug interactions.',
    modulesCount: 11,
    topicsCount: 78,
    estimatedHours: 64,
    iconKey: 'pharma',
    accentColor: 'emerald',
    plannedUnits: [
      'Pharmacokinetics (ADME) & Dose-Response',
      'Autonomic Nervous System Pharmacology',
      'Cardiovascular, Diuretics & Heart Failure',
      'Antimicrobials, Antivirals & Stewardship',
      'CNS, Anesthetics & Psychopharmacology',
      'Endocrine & Antineoplastic Therapeutics',
    ],
    clinicalFocus: 'Rational prescription writing, drug-drug interactions & emergency antidotes',
  },
  {
    id: 'mbbs-microbiology',
    title: 'Microbiology',
    profYear: '2nd-prof',
    profLabel: '2nd Prof · Para-Clinical',
    badge: 'Infectious Diseases',
    subtitle: 'Bacteriology, Virology, Mycology & Immunology',
    description:
      'Gram stain flowcharts, virulence factors, viral replication cycles, parasitology life cycles, serology panels, and hospital infection control.',
    modulesCount: 9,
    topicsCount: 60,
    estimatedHours: 48,
    iconKey: 'micro',
    accentColor: 'teal',
    plannedUnits: [
      'Sterilization, Culture & Diagnostic Staining',
      'Clinical Immunology & Vaccines',
      'Systemic Bacteriology (Gram+ / Gram-)',
      'Medical Virology & Emerging Pathogens',
      'Medical Mycology & Opportunistic Fungi',
      'Parasitology & Vector-Borne Syndromes',
    ],
    clinicalFocus: 'Sepsis blood-culture interpretation, antibiotic sensitivity & outbreak control',
  },
  {
    id: 'mbbs-forensic',
    title: 'Forensic Medicine & Toxicology',
    profYear: '2nd-prof',
    profLabel: '2nd Prof · Para-Clinical',
    badge: 'Medico-Legal',
    subtitle: 'Autopsy, Medical Ethics & Clinical Toxicology',
    description:
      'Medico-legal documentation, post-mortem changes, wound ballistics, medical jurisprudence, and acute poisoning antidote protocols.',
    modulesCount: 6,
    topicsCount: 36,
    estimatedHours: 28,
    iconKey: 'forensic',
    accentColor: 'amber',
    plannedUnits: [
      'Medical Jurisprudence & Consent Ethics',
      'Thanatology & Autopsy Findings',
      'Mechanical Injuries & Ballistics',
      'Asphyxial & Thermal Deaths',
      'Clinical Toxicology: Organophosphates & Heavy Metals',
      'Drug Overdose & Antidote Management',
    ],
    clinicalFocus: 'ER poisoning triage, MLC documentation & ethical clinical decision-making',
  },

  // 3rd Prof (Part I)
  {
    id: 'mbbs-psm',
    title: 'Community Medicine (PSM)',
    profYear: '3rd-prof',
    profLabel: '3rd Prof · Part I',
    badge: 'Public Health',
    subtitle: 'Epidemiology, Biostatistics & National Programs',
    description:
      'Study designs, sensitivity/specificity & screening biostatistics, immunization schedules, maternal-child health, and outbreak epidemiology.',
    modulesCount: 8,
    topicsCount: 52,
    estimatedHours: 44,
    iconKey: 'psm',
    accentColor: 'cyan',
    plannedUnits: [
      'Epidemiological Study Designs & Bias',
      'Biostatistics, NNT & Screening Metrics',
      'Communicable Disease Control & Vaccines',
      'Non-Communicable Disease Prevention',
      'Maternal, Neonatal & Child Health (RMNCH)',
      'Health Systems, Nutrition & Disaster Triage',
    ],
    clinicalFocus: 'Diagnostic test predictive values, outbreak curves & evidence-based medicine',
  },
  {
    id: 'mbbs-ophthalmology',
    title: 'Ophthalmology',
    profYear: '3rd-prof',
    profLabel: '3rd Prof · Part I',
    badge: 'Clinical Specialty',
    subtitle: 'Optics, Cataract, Glaucoma & Fundoscopy',
    description:
      'Visual pathway lesions, red eye differential, acute angle-closure glaucoma, cataract surgery basics, and diabetic/hypertensive retinopathy.',
    modulesCount: 6,
    topicsCount: 34,
    estimatedHours: 30,
    iconKey: 'ophtha',
    accentColor: 'sky',
    plannedUnits: [
      'Ocular Anatomy & Visual Field Defects',
      'Refractive Errors & Clinical Optics',
      'Cornea, Uveitis & Red Eye Triage',
      'Lens, Cataract & IOL Principles',
      'Glaucoma Mechanisms & Fundus Findings',
      'Retinal Vascular Disorders & Neuro-Ophtha',
    ],
    clinicalFocus: 'Direct ophthalmoscopy findings, acute vision loss emergencies & pupil reflexes',
  },
  {
    id: 'mbbs-ent',
    title: 'ENT (Otorhinolaryngology)',
    profYear: '3rd-prof',
    profLabel: '3rd Prof · Part I',
    badge: 'Clinical Specialty',
    subtitle: 'Otology, Rhinology & Head-Neck Airway',
    description:
      'Tuning fork tests (Rinne/Weber), CSOM complications, sinusitis & epistaxis management, laryngeal stridor, and emergency tracheostomy.',
    modulesCount: 6,
    topicsCount: 32,
    estimatedHours: 28,
    iconKey: 'ent',
    accentColor: 'violet',
    plannedUnits: [
      'Ear Anatomy, Audiometry & Tuning Forks',
      'Otitis Media & Cholesteatoma Complications',
      'Vertigo, Meniere & Vestibular Testing',
      'Sinonasal Anatomy, Polyps & Epistaxis',
      'Pharynx, Tonsils & Deep Neck Spaces',
      'Larynx, Stridor & Airway Emergencies',
    ],
    clinicalFocus: 'Conductive vs sensorineural hearing loss, epistaxis packing & stridor triage',
  },

  // Final Prof (Clinical)
  {
    id: 'mbbs-medicine',
    title: 'General Medicine',
    profYear: 'final-prof',
    profLabel: 'Final Prof · Clinical',
    badge: 'Major Clinical',
    subtitle: 'Cardiology, Pulmonology, Neuro, Nephro & ICU',
    description:
      'Systematic bedside diagnosis, ECG & ABG interpretation, heart failure, stroke thrombolysis, AKI/CKD staging, sepsis, and endocrine crises.',
    modulesCount: 14,
    topicsCount: 112,
    estimatedHours: 110,
    iconKey: 'medicine',
    accentColor: 'emerald',
    plannedUnits: [
      'Cardiology: ACS, Arrhythmias & Valvular Disease',
      'Pulmonology: Asthma, COPD & Pleural Effusion',
      'Neurology: Stroke, Seizures & Cranial Palsies',
      'Nephrology: AKI, CKD & Electrolyte Crises',
      'Gastroenterology & Cirrhosis Complications',
      'Endocrinology: Diabetes, Thyroid & Adrenal',
    ],
    clinicalFocus: 'Bedside differential diagnosis, ICU stabilization & evidence-based guidelines',
  },
  {
    id: 'mbbs-surgery',
    title: 'General Surgery',
    profYear: 'final-prof',
    profLabel: 'Final Prof · Clinical',
    badge: 'Major Clinical',
    subtitle: 'Trauma ATLS, Acute Abdomen & Surgical Oncology',
    description:
      'ATLS trauma resuscitation, fluid & shock management, acute abdomen (appendicitis, perforation, obstruction), hernias, and hepatobiliary surgery.',
    modulesCount: 12,
    topicsCount: 86,
    estimatedHours: 88,
    iconKey: 'surgery',
    accentColor: 'teal',
    plannedUnits: [
      'Perioperative Care, Shock & Fluids',
      'ATLS Trauma & Head Injury Triage',
      'Thyroid, Breast & Endocrine Surgery',
      'GI & Acute Abdomen Emergencies',
      'Hepatobiliary, Pancreas & Hernias',
      'Vascular, Urology & Surgical Oncology',
    ],
    clinicalFocus: 'Acute abdomen workup, trauma primary survey & pre-op risk optimization',
  },
  {
    id: 'mbbs-obgyn',
    title: 'Obstetrics & Gynecology',
    profYear: 'final-prof',
    profLabel: 'Final Prof · Clinical',
    badge: 'Major Clinical',
    subtitle: 'Antenatal Care, Labor, High-Risk OB & Gyn',
    description:
      'Partograph monitoring, pre-eclampsia/eclampsia, postpartum hemorrhage (PPH) protocols, ectopic pregnancy, PCOS, and cervical screening.',
    modulesCount: 10,
    topicsCount: 68,
    estimatedHours: 64,
    iconKey: 'obgyn',
    accentColor: 'rose',
    plannedUnits: [
      'Maternal Physiology & Antenatal Screening',
      'Normal Labor, Partograph & CTG Traces',
      'High-Risk OB: Pre-eclampsia, GDM & APH',
      'Obstetric Emergencies: PPH & Cord Prolapse',
      'Benign Gynecology, PCOS & Contraception',
      'Gynecologic Oncology & Screening',
    ],
    clinicalFocus: 'CTG fetal monitoring, PPH emergency bundle & ectopic pregnancy recognition',
  },
  {
    id: 'mbbs-pediatrics',
    title: 'Pediatrics',
    profYear: 'final-prof',
    profLabel: 'Final Prof · Clinical',
    badge: 'Major Clinical',
    subtitle: 'Neonatology, Milestones, IMNCI & Peds Emergencies',
    description:
      'Neonatal resuscitation (NRP), developmental milestones, congenital heart defects, pediatric dehydration, febrile seizures, and immunization.',
    modulesCount: 9,
    topicsCount: 58,
    estimatedHours: 52,
    iconKey: 'peds',
    accentColor: 'sky',
    plannedUnits: [
      'Neonatology, APGAR & NRP Resuscitation',
      'Growth Charts & Developmental Milestones',
      'Nutrition, SAM & Micronutrient Therapy',
      'Congenital Heart Disease & Cyanotic Spells',
      'Pediatric Respiratory & Diarrheal Triage',
      'Pediatric Neurology & Immunization',
    ],
    clinicalFocus: 'Weight-based pediatric dosing, neonatal jaundice nomograms & PALS triage',
  },
  {
    id: 'mbbs-orthopedics',
    title: 'Orthopedics',
    profYear: 'final-prof',
    profLabel: 'Final Prof · Clinical',
    badge: 'Clinical Allied',
    subtitle: 'Fracture Healing, Trauma & Joint Disorders',
    description:
      'Classic fracture eponyms, compartment syndrome, nerve injuries in trauma, bone tumors on X-ray, and osteoarthritis/spinal cord compression.',
    modulesCount: 6,
    topicsCount: 36,
    estimatedHours: 28,
    iconKey: 'ortho',
    accentColor: 'amber',
    plannedUnits: [
      'Bone Healing & Fracture Principles',
      'Upper & Lower Limb Trauma',
      'Compartment Syndrome & Vascular Injury',
      'Bone Infections & Tuberculosis of Spine',
      'Orthopedic Oncology Radiographs',
      'Congenital & Degenerative Joint Disease',
    ],
    clinicalFocus: 'Trauma radiograph interpretation, splinting & compartment syndrome urgency',
  },
  {
    id: 'mbbs-dermatology',
    title: 'Dermatology & Venereology',
    profYear: 'final-prof',
    profLabel: 'Final Prof · Clinical',
    badge: 'Clinical Allied',
    subtitle: 'Lesion Morphology, Papulosquamous & STIs',
    description:
      'Primary skin lesion recognition, psoriasis, eczema, vesiculobullous disorders (Nikolsky sign), leprosy spectrum, and syndromic STI care.',
    modulesCount: 5,
    topicsCount: 28,
    estimatedHours: 22,
    iconKey: 'derm',
    accentColor: 'rose',
    plannedUnits: [
      'Dermatologic Morphology & Bedside Signs',
      'Infectious Dermatoses & Leprosy',
      'Papulosquamous & Eczematous Disorders',
      'Autoimmune Bullous Diseases',
      'Drug Reactions (SJS/TEN) & STIs',
    ],
    clinicalFocus: 'Visual rash pattern recognition & severe cutaneous drug reaction triage',
  },
  {
    id: 'mbbs-psychiatry',
    title: 'Psychiatry',
    profYear: 'final-prof',
    profLabel: 'Final Prof · Clinical',
    badge: 'Clinical Allied',
    subtitle: 'Mood, Psychosis, Anxiety & Behavioral Med',
    description:
      'Mental status examination (MSE), schizophrenia vs mood disorders, SSRI/lithium pharmacology, substance withdrawal, and emergency agitation.',
    modulesCount: 5,
    topicsCount: 26,
    estimatedHours: 20,
    iconKey: 'psych',
    accentColor: 'violet',
    plannedUnits: [
      'Mental Status Exam & Psychopathology',
      'Schizophrenia & Delusional Disorders',
      'Depressive & Bipolar Mood Disorders',
      'Anxiety, OCD & Trauma-Related Care',
      'Substance Use & Psychiatric Emergencies',
    ],
    clinicalFocus: 'Suicide risk assessment, lithium toxicity & neuroleptic malignant syndrome',
  },
  {
    id: 'mbbs-radiology',
    title: 'Radiodiagnosis',
    profYear: 'final-prof',
    profLabel: 'Final Prof · Clinical',
    badge: 'Imaging & Dx',
    subtitle: 'CXR, CT Head, Ultrasound & MRI Basics',
    description:
      'Systematic chest X-ray reading, non-contrast CT head for acute stroke/hemorrhage, abdominal air-fluid levels, and FAST trauma ultrasound.',
    modulesCount: 5,
    topicsCount: 30,
    estimatedHours: 24,
    iconKey: 'radio',
    accentColor: 'cyan',
    plannedUnits: [
      'Radiation Safety & Imaging Modalities',
      'Systematic Chest X-Ray Interpretation',
      'Neuroimaging: Stroke, EDH & SDH on CT',
      'Abdominal Radiographs & Contrast Studies',
      'Bedside Ultrasound & eFAST Protocols',
    ],
    clinicalFocus: 'Pneumothorax, bowel perforation & intracranial bleed rapid recognition',
  },
  {
    id: 'mbbs-anesthesia',
    title: 'Anesthesiology & Critical Care',
    profYear: 'final-prof',
    profLabel: 'Final Prof · Clinical',
    badge: 'Critical Care',
    subtitle: 'Airway, Mechanical Ventilation & ACLS',
    description:
      'Mallampati airway grading, rapid sequence intubation, inhaled & IV anesthetics, spinal/epidural blocks, and ICU ventilator settings.',
    modulesCount: 5,
    topicsCount: 26,
    estimatedHours: 22,
    iconKey: 'anesth',
    accentColor: 'teal',
    plannedUnits: [
      'Pre-Anesthetic Assessment & Airway',
      'IV & Inhalational Anesthetic Agents',
      'Regional Blocks & Neuraxial Anesthesia',
      'Mechanical Ventilation & ICU Monitoring',
      'ACLS Arrest Algorithms & Anaphylaxis',
    ],
    clinicalFocus: 'Airway management, ventilator ABG adjustments & malignant hyperthermia',
  },
];

export interface ClinicalCaseVignette {
  id: string;
  title: string;
  specialty: string;
  profLevel: string;
  duration: string;
  vitals: string;
  chiefComplaint: string;
  presentation: string;
  investigations: string[];
  differentialTags: string[];
  keyLearningPoint: string;
}

export const CLINICAL_CASE_VIGNETTES: ClinicalCaseVignette[] = [
  {
    id: 'case-stemi',
    title: 'Acute Inferior Wall STEMI & Bradycardia',
    specialty: 'Cardiology · Emergency',
    profLevel: 'Final Prof · Medicine',
    duration: '15 min case',
    vitals: 'BP 96/62 · HR 52 bpm · SpO2 94%',
    chiefComplaint: 'Crushing retrosternal chest pain radiating to left jaw for 90 mins',
    presentation:
      '58-year-old male smoker presents with diaphoresis, nausea, and ST-segment elevations in leads II, III, and aVF with reciprocal depression in aVL.',
    investigations: ['12-Lead ECG (II, III, aVF ↑)', 'Right-sided V4R Lead', 'Troponin I & Echo'],
    differentialTags: ['Inferior STEMI', 'RV Infarction', 'Aortic Dissection'],
    keyLearningPoint:
      'Always check right-sided lead V4R before giving nitrates in inferior STEMI to avoid catastrophic preload-dependent hypotension.',
  },
  {
    id: 'case-dka',
    title: 'Diabetic Ketoacidosis (DKA) Resuscitation',
    specialty: 'Endocrinology · ICU',
    profLevel: 'Final Prof · Medicine',
    duration: '12 min case',
    vitals: 'BP 102/66 · HR 118 bpm · RR 28 (Kussmaul)',
    chiefComplaint: 'Polyuria, vomiting, abdominal pain & fruity breath odor',
    presentation:
      '21-year-old with Type 1 DM missed insulin for 48h. Labs: Glucose 460 mg/dL, pH 7.14, HCO3- 10 mEq/L, Na+ 131, K+ 3.4 mEq/L, Anion Gap 24.',
    investigations: ['ABG (Anion Gap Acidosis)', 'Serum K+ & Electrolytes', 'Urine/Serum Ketones'],
    differentialTags: ['DKA', 'HHS', 'Sepsis Acidosis'],
    keyLearningPoint:
      'Check serum potassium before starting IV insulin: if K+ is 3.3–5.2 mEq/L, add KCl to IV fluids alongside insulin to prevent life-threatening hypokalemia.',
  },
  {
    id: 'case-pneumonia',
    title: 'Community-Acquired Pneumonia & Sepsis Workup',
    specialty: 'Pulmonology · Infectious Dx',
    profLevel: '2nd–Final Prof Integrated',
    duration: '14 min case',
    vitals: 'BP 88/58 · HR 122 · Temp 39.2°C · SpO2 89%',
    chiefComplaint: 'High fever, productive rusty sputum & right pleuritic chest pain',
    presentation:
      '67-year-old presents with confusion (CURB-65 = 3), bronchial breath sounds in the right lower zone, and lobar consolidation on chest radiograph.',
    investigations: ['CXR (RLL Consolidation)', 'Blood Cultures x2', 'Serum Lactate & Procalcitonin'],
    differentialTags: ['Pneumococcal CAP', 'Septic Shock', 'Pulmonary Embolism'],
    keyLearningPoint:
      'Apply CURB-65 for ICU disposition and administer empiric IV beta-lactam + macrolide promptly after drawing blood cultures.',
  },
];

export interface ECGPreset {
  id: string;
  label: string;
  rhythmName: string;
  hr: string;
  prInterval: string;
  qrsDuration: string;
  interpretation: string;
  managementPearl: string;
  svgPath: string;
  strokeColor: string;
}

export const ECG_PRESETS: ECGPreset[] = [
  {
    id: 'nsr',
    label: 'Normal Sinus Rhythm',
    rhythmName: 'Normal Sinus Rhythm (NSR)',
    hr: '74 bpm',
    prInterval: '160 ms (Normal)',
    qrsDuration: '88 ms (Narrow)',
    interpretation:
      'Upright P wave before every QRS complex, regular R-R intervals, and isoelectric ST segments.',
    managementPearl: 'Physiologic baseline — verify clinical vitals and correlate with symptoms.',
    svgPath:
      'M 0 55 L 25 55 Q 32 45 38 55 L 48 55 L 52 60 L 58 15 L 64 68 L 69 55 L 82 55 Q 94 38 106 55 L 145 55 Q 152 45 158 55 L 168 55 L 172 60 L 178 15 L 184 68 L 189 55 L 202 55 Q 214 38 226 55 L 265 55 Q 272 45 278 55 L 288 55 L 292 60 L 298 15 L 304 68 L 309 55 L 322 55 Q 334 38 346 55 L 360 55',
    strokeColor: '#10b981',
  },
  {
    id: 'stemi',
    label: 'Acute STEMI (ST Elevation)',
    rhythmName: 'Acute ST-Elevation Myocardial Infarction',
    hr: '104 bpm',
    prInterval: '165 ms',
    qrsDuration: '96 ms',
    interpretation:
      'Marked convex ST-segment elevation ("tombstone" morphology) merging directly into a tall hyperacute T wave.',
    managementPearl:
      'Activate cath lab immediately (Door-to-Balloon < 90 min), dual antiplatelet therapy + anticoagulation.',
    svgPath:
      'M 0 55 L 20 55 Q 26 46 32 55 L 40 55 L 44 60 L 50 15 L 55 48 L 64 25 Q 80 20 94 55 L 130 55 Q 136 46 142 55 L 150 55 L 154 60 L 160 15 L 165 48 L 174 25 Q 190 20 204 55 L 240 55 Q 246 46 252 55 L 260 55 L 264 60 L 270 15 L 275 48 L 284 25 Q 300 20 314 55 L 360 55',
    strokeColor: '#f43f5e',
  },
  {
    id: 'afib',
    label: 'Atrial Fibrillation',
    rhythmName: 'Atrial Fibrillation (Irregularly Irregular)',
    hr: '128 bpm',
    prInterval: 'Absent P waves',
    qrsDuration: '84 ms (Narrow)',
    interpretation:
      'Irregularly irregular R-R intervals with chaotic fibrillatory baseline (f-waves) and absent discrete P waves.',
    managementPearl:
      'Assess hemodynamic stability; rate control (beta-blocker/CCB) & CHA2DS2-VASc anticoagulation scoring.',
    svgPath:
      'M 0 55 Q 6 51 12 57 Q 18 52 24 56 L 28 60 L 34 15 L 40 66 L 45 55 Q 55 50 64 58 Q 72 52 80 55 Q 88 51 96 56 L 100 60 L 106 16 L 112 66 L 117 55 Q 126 52 136 57 L 140 60 L 146 15 L 152 66 L 157 55 Q 170 51 182 57 Q 194 52 206 56 Q 216 51 226 56 L 230 60 L 236 15 L 242 66 L 247 55 Q 260 51 272 57 L 276 60 L 282 16 L 288 66 L 293 55 Q 310 51 326 57 Q 340 52 360 55',
    strokeColor: '#f59e0b',
  },
];

export interface ABGPreset {
  id: string;
  label: string;
  ph: string;
  paco2: string;
  hco3: string;
  anionGap: string;
  diagnosis: string;
  compensationCheck: string;
  commonCauses: string[];
}

export const ABG_PRESETS: ABGPreset[] = [
  {
    id: 'met-acidosis',
    label: 'High Anion Gap Metabolic Acidosis',
    ph: '7.18',
    paco2: '24 mmHg',
    hco3: '9 mEq/L',
    anionGap: '24 mEq/L (Elevated)',
    diagnosis: 'Primary HAGMA with Appropriate Respiratory Compensation',
    compensationCheck: 'Winter’s Formula: Expected PaCO2 = 1.5(9) + 8 ± 2 = 21.5 ± 2 mmHg (Compensated)',
    commonCauses: ['Diabetic Ketoacidosis (DKA)', 'Lactic Acidosis (Sepsis)', 'Uremia / Salicylates'],
  },
  {
    id: 'resp-alkalosis',
    label: 'Acute Respiratory Alkalosis',
    ph: '7.52',
    paco2: '26 mmHg',
    hco3: '21 mEq/L',
    anionGap: '11 mEq/L (Normal)',
    diagnosis: 'Primary Acute Respiratory Alkalosis',
    compensationCheck: 'PaCO2 dropped by 14 mmHg -> Expected HCO3- drop ≈ 2.8 mEq/L (24 -> 21.2 mEq/L)',
    commonCauses: ['Pulmonary Embolism', 'Panic / Hyperventilation', 'Early Salicylate Toxicity'],
  },
  {
    id: 'resp-acidosis',
    label: 'Chronic Respiratory Acidosis (COPD)',
    ph: '7.33',
    paco2: '62 mmHg',
    hco3: '32 mEq/L',
    anionGap: '12 mEq/L (Normal)',
    diagnosis: 'Chronic Hypercapnic Respiratory Acidosis (Renal Compensated)',
    compensationCheck: 'PaCO2 elevated by 22 mmHg -> Expected chronic HCO3- rise ≈ 7.7 mEq/L (24 -> 31.7 mEq/L)',
    commonCauses: ['Severe COPD Exacerbation', 'Obesity Hypoventilation', 'Neuromuscular Weakness'],
  },
];

export interface PharmaCardItem {
  id: string;
  drugName: string;
  classLabel: string;
  target: string;
  moa: string;
  indications: string[];
  contraindications: string[];
  highYieldPearl: string;
}

export const PHARMA_CARDS: PharmaCardItem[] = [
  {
    id: 'metoprolol',
    drugName: 'Metoprolol (Cardioselective β1-Blocker)',
    classLabel: 'Class II Antiarrhythmic / Antihypertensive',
    target: 'Selective β1-Adrenergic Receptors (Cardiac SA/AV Node & Myocytes)',
    moa: 'Inhibits Gs-coupled β1 receptors -> decreases cAMP -> lowers SA node firing, AV conduction velocity, and renin release.',
    indications: ['Chronic HFrEF (Succinate)', 'Post-MI Mortality Reduction', 'Atrial Fibrillation Rate Control'],
    contraindications: ['Decompensated Acute Heart Failure', 'Severe Bradycardia / 2°–3° AV Block', 'Cardiogenic Shock'],
    highYieldPearl: 'β1-selectivity reduces bronchospasm risk in mild COPD, though high doses lose selectivity.',
  },
  {
    id: 'enalapril',
    drugName: 'Enalapril / Lisinopril (ACE Inhibitor)',
    classLabel: 'RAAS Inhibitor · Vasodilator',
    target: 'Angiotensin-Converting Enzyme (Peptidyl-Dipeptidase)',
    moa: 'Blocks conversion of Angiotensin I -> II and inhibits bradykinin degradation; dilates efferent glomerular arteriole.',
    indications: ['Hypertension with Diabetes / CKD', 'HFrEF Remodeling Prevention', 'Post-Anterior STEMI'],
    contraindications: ['Pregnancy (Teratogenic)', 'Bilateral Renal Artery Stenosis', 'History of Angioedema / Hyperkalemia'],
    highYieldPearl: 'Accumulated bradykinin causes dry cough & angioedema — switch to an ARB (Losartan) if cough develops.',
  },
  {
    id: 'furosemide',
    drugName: 'Furosemide (Loop Diuretic)',
    classLabel: 'High-Ceiling Diuretic',
    target: 'NKCC2 Cotransporter (Thick Ascending Limb of Loop of Henle)',
    moa: 'Inhibits Na+/K+/2Cl- reabsorption, abolishing medullary osmotic gradient and increasing Ca2+/Mg2+ excretion.',
    indications: ['Acute Pulmonary Edema', 'Decompensated Heart Failure', 'Hypercalcemia & Refractory Edema'],
    contraindications: ['Anuria', 'Severe Hypokalemia / Volume Depletion', 'Severe Sulfa Allergy (use Ethacrynic acid)'],
    highYieldPearl: 'Remember OH DANG: Ototoxicity, Hypokalemia, Dehydration, Allergy (sulfa), Nephritis (interstitial), Gout.',
  },
];
