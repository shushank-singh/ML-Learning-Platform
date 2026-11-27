import {
  AnatomicalStructureMetadata,
  MedicalReference,
  PathologyTerritoryPreset,
} from '@/types/medverse';

const BP3D_ONTOLOGY_REF: MedicalReference = {
  id: 'ref-bp3d-organs',
  citation:
    'Mitsuhashi N et al. BodyParts3D: 3D structure database for anatomical concepts. Nucleic Acids Res. 2009;37:D782–D785.',
  sourceType: 'ontology',
  url: 'https://doi.org/10.1093/nar/gkn613',
};

const GRAYS_REF: MedicalReference = {
  id: 'ref-grays-regional',
  citation:
    'Standring S. Gray’s Anatomy: The Anatomical Basis of Clinical Practice. 42nd ed. Elsevier; 2020.',
  sourceType: 'textbook',
};

const ROBBINS_REF: MedicalReference = {
  id: 'ref-robbins-path',
  citation:
    'Kumar V, Abbas AK, Aster JC. Robbins & Cotran Pathologic Basis of Disease. 10th ed. Elsevier; 2021.',
  sourceType: 'textbook',
};

function makeStructure(
  input: Omit<AnatomicalStructureMetadata, 'references'> & { references?: MedicalReference[] }
): AnatomicalStructureMetadata {
  return {
    ...input,
    references: input.references || [GRAYS_REF, BP3D_ONTOLOGY_REF],
  };
}

// =========================================================================
// 1. HUMAN BRAIN (brain.glb — 19 segmented structures, CC BY 4.0)
// =========================================================================
export const BRAIN_STRUCTURES: AnatomicalStructureMetadata[] = [
  makeStructure({
    id: 'left-frontal',
    assetId: 'brain-bp3d',
    meshId: 'left-frontal',
    fmaId: 'FMA72970',
    latinName: 'Lobus frontalis sinister',
    standardName: 'Left Frontal Lobe',
    sourceName: 'left frontal lobe',
    group: 'Cerebral Cortex',
    color: '#6366f1',
    location: 'Anterior cranial fossa superior to orbital plate, anterior to central sulcus.',
    anatomicalRelationships: [
      'Separated posteriorly from parietal lobe by Central Sulcus (of Rolando).',
      'Contains Precentral Gyrus (Primary Motor M1) and Inferior Frontal Gyrus (Broca’s area 44/45 on dominant left side).',
    ],
    mainFunction:
      'Executive control, voluntary motor execution (contralateral corticospinal tract), expressive speech (Broca), and working memory.',
    clinicalCorrelations: [
      'Left inferior frontal gyrus (MCA superior division) lesion produces Broca’s non-fluent (expressive) aphasia with intact comprehension.',
      'Precentral gyrus ischemia causes contralateral hemiparesis (face/arm > leg for MCA, leg > arm for ACA).',
    ],
    relatedTopicIds: ['neuro-action-potential-synapse'],
    relatedAnimationIds: ['anim-action-potential'],
    relatedQuizQuestionIds: [],
  }),
  makeStructure({
    id: 'right-frontal',
    assetId: 'brain-bp3d',
    meshId: 'right-frontal',
    fmaId: 'FMA72969',
    latinName: 'Lobus frontalis dexter',
    standardName: 'Right Frontal Lobe',
    sourceName: 'right frontal lobe',
    group: 'Cerebral Cortex',
    color: '#818cf8',
    location: 'Right anterior cranial fossa anterior to central sulcus and superior to Sylvian fissure.',
    anatomicalRelationships: [
      'Separated medially from Left Frontal Lobe by the longitudinal cerebral fissure and falx cerebri.',
      'Houses Frontal Eye Field (FEF, Brodmann area 8) driving contralateral horizontal saccades.',
    ],
    mainFunction: 'Contralateral motor control, executive judgment, emotional prosody, and conjugate gaze deviation.',
    clinicalCorrelations: [
      'Destructive right FEF lesion causes eyes to deviate toward the ipsilateral right hemisphere ("looks toward the lesion").',
      'Orbitofrontal injury causes behavioral disinhibition and loss of social judgment.',
    ],
    relatedTopicIds: ['neuro-action-potential-synapse'],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: [],
  }),
  makeStructure({
    id: 'left-parietal',
    assetId: 'brain-bp3d',
    meshId: 'left-parietal',
    fmaId: 'FMA72972',
    latinName: 'Lobus parietalis sinister',
    standardName: 'Left Parietal Lobe',
    sourceName: 'left parietal lobe',
    group: 'Cerebral Cortex',
    color: '#06b6d4',
    location: 'Posterior to central sulcus and superior to occipital/temporal borders.',
    anatomicalRelationships: [
      'Contains Postcentral Gyrus (Primary Somatosensory S1, areas 3,1,2) and Angular/Supramarginal Gyri.',
    ],
    mainFunction: 'Tactile localization, proprioception, stereognosis, graphesthesia, calculation, and writing.',
    clinicalCorrelations: [
      'Dominant (left) parietal angular gyrus lesion produces Gerstmann syndrome (agraphia, acalculia, left-right disorientation, finger agnosia).',
    ],
    relatedTopicIds: ['neuro-action-potential-synapse'],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: [],
  }),
  makeStructure({
    id: 'right-parietal',
    assetId: 'brain-bp3d',
    meshId: 'right-parietal',
    fmaId: 'FMA72971',
    latinName: 'Lobus parietalis dexter',
    standardName: 'Right Parietal Lobe',
    sourceName: 'right parietal lobe',
    group: 'Cerebral Cortex',
    color: '#22d3ee',
    location: 'Right cerebral convexity between central sulcus and parieto-occipital sulcus.',
    anatomicalRelationships: [
      'Receives thalamocortical sensory radiations from VPL and VPM nuclei via posterior limb of internal capsule.',
    ],
    mainFunction: 'Spatial awareness, visuospatial orientation, and contralateral somatosensory processing.',
    clinicalCorrelations: [
      'Non-dominant (right) parietal lobe infarct classically produces contralateral hemineglect (ignoring left visual/body space) and anosognosia.',
    ],
    relatedTopicIds: ['neuro-action-potential-synapse'],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: [],
  }),
  makeStructure({
    id: 'left-temporal',
    assetId: 'brain-bp3d',
    meshId: 'left-temporal',
    fmaId: 'FMA72974',
    latinName: 'Lobus temporalis sinister',
    standardName: 'Left Temporal Lobe',
    sourceName: 'left temporal lobe',
    group: 'Cerebral Cortex',
    color: '#14b8a6',
    location: 'Middle cranial fossa inferior to the lateral sulcus (Sylvian fissure).',
    anatomicalRelationships: [
      'Superior temporal gyrus houses Primary Auditory Cortex (Heschl’s gyri 41/42) and Wernicke’s area (22) on the dominant side.',
      'Medial aspect arches over the hippocampus and uncus.',
    ],
    mainFunction: 'Auditory decoding, language comprehension (Wernicke), and temporal-lobe memory integration.',
    clinicalCorrelations: [
      'Wernicke’s area lesion causes fluent ("word salad") receptive aphasia with impaired comprehension and repetition.',
      'Meyer’s loop radiation disruption yields contralateral superior quadrantanopia ("pie in the sky").',
    ],
    relatedTopicIds: ['neuro-action-potential-synapse'],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: [],
  }),
  makeStructure({
    id: 'right-temporal',
    assetId: 'brain-bp3d',
    meshId: 'right-temporal',
    fmaId: 'FMA72973',
    latinName: 'Lobus temporalis dexter',
    standardName: 'Right Temporal Lobe',
    sourceName: 'right temporal lobe',
    group: 'Cerebral Cortex',
    color: '#2dd4bf',
    location: 'Right middle cranial fossa below the Sylvian fissure.',
    anatomicalRelationships: [
      'Medial uncus lies adjacent to tentorial notch and oculomotor nerve (CN III).',
    ],
    mainFunction: 'Non-verbal auditory/music recognition, facial recognition, and prosody comprehension.',
    clinicalCorrelations: [
      'Right uncal herniation compresses ipsilateral CN III ("blown pupil" + down-and-out gaze) and contralateral cerebral peduncle.',
    ],
    relatedTopicIds: ['neuro-action-potential-synapse'],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: [],
  }),
  makeStructure({
    id: 'left-occipital',
    assetId: 'brain-bp3d',
    meshId: 'left-occipital',
    fmaId: 'FMA72976',
    latinName: 'Lobus occipitalis sinister',
    standardName: 'Left Occipital Lobe',
    sourceName: 'left occipital lobe',
    group: 'Cerebral Cortex',
    color: '#a855f7',
    location: 'Rests on the tentorium cerebelli posterior to the parieto-occipital sulcus.',
    anatomicalRelationships: [
      'Centered on Calcarine Sulcus (Primary Visual Cortex V1, area 17); supplied predominantly by Posterior Cerebral Artery (PCA).',
    ],
    mainFunction: 'Primary visual processing of the contralateral (right) visual hemifield.',
    clinicalCorrelations: [
      'Left PCA occlusion causes right homonymous hemianopia with macular sparing (dual MCA/PCA macular supply).',
    ],
    relatedTopicIds: [],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: [],
  }),
  makeStructure({
    id: 'right-occipital',
    assetId: 'brain-bp3d',
    meshId: 'right-occipital',
    fmaId: 'FMA72975',
    latinName: 'Lobus occipitalis dexter',
    standardName: 'Right Occipital Lobe',
    sourceName: 'right occipital lobe',
    group: 'Cerebral Cortex',
    color: '#c084fc',
    location: 'Right posterior cranial pole superior to the tentorium cerebelli.',
    anatomicalRelationships: ['Contains cuneus and lingual gyrus flanking the calcarine sulcus.'],
    mainFunction: 'Visual processing of the left visual hemifield.',
    clinicalCorrelations: ['Right PCA stroke produces left homonymous hemianopia with macular sparing.'],
    relatedTopicIds: [],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: [],
  }),
  makeStructure({
    id: 'left-hippocampus',
    assetId: 'brain-bp3d',
    meshId: 'left-hippocampus',
    fmaId: 'FMA73107',
    latinName: 'Hippocampus sinister',
    standardName: 'Left Hippocampus',
    sourceName: 'left hippocampus',
    group: 'Limbic System',
    color: '#f59e0b',
    location: 'Floor of the inferior (temporal) horn of the left lateral ventricle.',
    anatomicalRelationships: [
      'Projects via fimbria-fornix to mammillary bodies (Papez circuit).',
      'Highly vulnerable to hypoxic-ischemic injury (CA1 Sommer sector).',
    ],
    mainFunction: 'Consolidation of declarative (episodic/semantic) short-term memory into long-term memory.',
    clinicalCorrelations: [
      'Bilateral hippocampal sclerosis or early Alzheimer’s pathology causes severe anterograde amnesia.',
    ],
    relatedTopicIds: [],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: [],
  }),
  makeStructure({
    id: 'right-hippocampus',
    assetId: 'brain-bp3d',
    meshId: 'right-hippocampus',
    fmaId: 'FMA73106',
    latinName: 'Hippocampus dexter',
    standardName: 'Right Hippocampus',
    sourceName: 'right hippocampus',
    group: 'Limbic System',
    color: '#fbbf24',
    location: 'Medial temporal lobe along the floor of the right temporal ventricular horn.',
    anatomicalRelationships: ['Part of the limbic Papez circuit; feeds the right fornix.'],
    mainFunction: 'Spatial navigation memory and non-verbal episodic memory consolidation.',
    clinicalCorrelations: ['Mesial temporal sclerosis is the commonest structural cause of refractory focal impaired-awareness epilepsy.'],
    relatedTopicIds: [],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: [],
  }),
  makeStructure({
    id: 'midbrain',
    assetId: 'brain-bp3d',
    meshId: 'midbrain',
    fmaId: 'FMA67937',
    latinName: 'Mesencephalon',
    standardName: 'Midbrain (Mesencephalon)',
    sourceName: 'midbrain',
    group: 'Brainstem',
    color: '#f43f5e',
    location: 'Rostral brainstem bridging diencephalon and pons at the tentorial notch.',
    anatomicalRelationships: [
      'Houses CN III (oculomotor) and CN IV (trochlear) nuclei, substantia nigra, red nucleus, and superior/inferior colliculi.',
      'Traversed centrally by the cerebral aqueduct.',
    ],
    mainFunction: 'Visual/auditory reflexes, vertical gaze modulation, dopaminergic nigrostriatal drive, and descending motor conduits.',
    clinicalCorrelations: [
      'Weber syndrome (PCA paramedian branch): ipsilateral CN III palsy + contralateral hemiplegia.',
      'Parinaud dorsal midbrain syndrome (pinealoma): upward gaze palsy and light-near dissociation.',
    ],
    relatedTopicIds: ['an-brainstem-cranial-nerves'],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: [],
  }),
  makeStructure({
    id: 'pons',
    assetId: 'brain-bp3d',
    meshId: 'pons',
    fmaId: 'FMA67943',
    latinName: 'Pons',
    standardName: 'Pons',
    sourceName: 'pons',
    group: 'Brainstem',
    color: '#ec4899',
    location: 'Middle brainstem anterior to the cerebellum and fourth ventricle, seated on the clivus.',
    anatomicalRelationships: [
      'Houses CN V, VI, VII, VIII nuclei and pontine respiratory pneumotaxic/apneustic centers.',
      'Basilar artery runs along the ventral basilar sulcus.',
    ],
    mainFunction: 'Cortico-ponto-cerebellar coordination, horizontal conjugate gaze (PPRF/CN VI), facial sensation/expression.',
    clinicalCorrelations: [
      'Basilar artery occlusion causes Locked-in Syndrome (quadriplegia + aphonia with preserved consciousness and vertical blinking).',
      'Rapid hyponatremia overcorrection causes Osmotic Demyelination Syndrome (central pontine myelinolysis).',
    ],
    relatedTopicIds: ['an-brainstem-cranial-nerves'],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: [],
  }),
  makeStructure({
    id: 'medulla',
    assetId: 'brain-bp3d',
    meshId: 'medulla',
    fmaId: 'FMA62004',
    latinName: 'Medulla oblongata',
    standardName: 'Medulla Oblongata',
    sourceName: 'medulla oblongata',
    group: 'Brainstem',
    color: '#fb7185',
    location: 'Caudal brainstem extending from pontomedullary junction to foramen magnum.',
    anatomicalRelationships: [
      'Ventral pyramids (corticospinal decussation); houses CN IX, X, XII nuclei and cardiovascular/respiratory medullary centers.',
    ],
    mainFunction: 'Autonomic control of heart rate, blood pressure (baroreceptor NTS), respiration, swallowing, and airway reflexes.',
    clinicalCorrelations: [
      'Lateral Medullary (Wallenberg, PICA) syndrome: dysphagia/hoarseness (nucleus ambiguus), ipsilateral Horner syndrome, crossed pain/temperature loss, ataxia.',
    ],
    relatedTopicIds: ['an-brainstem-cranial-nerves'],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: [],
  }),
  makeStructure({
    id: 'cerebellum',
    assetId: 'brain-bp3d',
    meshId: 'cerebellum',
    fmaId: 'FMA67944',
    latinName: 'Cerebellum',
    standardName: 'Cerebellum',
    sourceName: 'cerebellum',
    group: 'Posterior Fossa',
    color: '#10b981',
    location: 'Posterior cranial fossa beneath the tentorium cerebelli and posterior to fourth ventricle.',
    anatomicalRelationships: [
      'Connected to brainstem via Superior, Middle, and Inferior Cerebellar Peduncles.',
    ],
    mainFunction: 'Motor coordination, postural equilibrium (flocculonodular/vermis), dysdiadochokinesia prevention, and error-corrective motor learning.',
    clinicalCorrelations: [
      'Hemispheric cerebellar lesion yields ipsilateral limb ataxia, intention tremor, and dysmetria ("past-pointing").',
      'Cerebellar tonsillar herniation through foramen magnum compresses medullary respiratory centers.',
    ],
    relatedTopicIds: [],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: [],
  }),
  makeStructure({
    id: 'left-lateral-ventricle',
    assetId: 'brain-bp3d',
    meshId: 'left-lateral-ventricle',
    fmaId: 'FMA78449',
    latinName: 'Ventriculus lateralis sinister',
    standardName: 'Left Lateral Ventricle',
    sourceName: 'left lateral ventricle',
    group: 'Ventricular System',
    color: '#38bdf8',
    location: 'C-shaped CSF cavity deep within the left cerebral hemisphere.',
    anatomicalRelationships: ['Drains via Interventricular Foramen of Monro into the Third Ventricle.'],
    mainFunction: 'Produces (via choroid plexus) and circulates cerebrospinal fluid (CSF).',
    clinicalCorrelations: ['Use X-Ray mode to inspect ventricular dilatation patterns seen in hydrocephalus.'],
    relatedTopicIds: [],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: [],
  }),
  makeStructure({
    id: 'right-lateral-ventricle',
    assetId: 'brain-bp3d',
    meshId: 'right-lateral-ventricle',
    fmaId: 'FMA78448',
    latinName: 'Ventriculus lateralis dexter',
    standardName: 'Right Lateral Ventricle',
    sourceName: 'right lateral ventricle',
    group: 'Ventricular System',
    color: '#0ea5e9',
    location: 'C-shaped CSF cavity within the right cerebral hemisphere.',
    anatomicalRelationships: ['Head of caudate nucleus forms its lateral anterior horn wall.'],
    mainFunction: 'Choroid plexus CSF secretion and buoyant mechanical brain cushioning.',
    clinicalCorrelations: ['Germinal matrix hemorrhage in premature neonates originates adjacent to lateral ventricles.'],
    relatedTopicIds: [],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: [],
  }),
  makeStructure({
    id: 'third-ventricle',
    assetId: 'brain-bp3d',
    meshId: 'third-ventricle',
    fmaId: 'FMA62007',
    latinName: 'Ventriculus tertius',
    standardName: 'Third Ventricle',
    sourceName: 'third ventricle',
    group: 'Ventricular System',
    color: '#0284c7',
    location: 'Narrow midline slit between the left and right thalami and hypothalami.',
    anatomicalRelationships: ['Superiorly receives foramina of Monro; inferiorly drains into Cerebral Aqueduct.'],
    mainFunction: 'Midline diencephalic CSF conduit.',
    clinicalCorrelations: ['Colloid cyst at the foramen of Monro causes positional headaches and acute biventricular hydrocephalus.'],
    relatedTopicIds: [],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: [],
  }),
  makeStructure({
    id: 'cerebral-aqueduct',
    assetId: 'brain-bp3d',
    meshId: 'cerebral-aqueduct',
    fmaId: 'FMA62493',
    latinName: 'Aqueductus mesencephali',
    standardName: 'Cerebral Aqueduct (of Sylvius)',
    sourceName: 'cerebral aqueduct',
    group: 'Ventricular System',
    color: '#60a5fa',
    location: 'Narrow CSF channel passing longitudinally through the midbrain tegmentum.',
    anatomicalRelationships: ['Connects Third Ventricle to Fourth Ventricle; surrounded by periaqueductal gray.'],
    mainFunction: 'Narrowest CSF bottleneck in the ventricular pathway.',
    clinicalCorrelations: [
      'Aqueductal stenosis causes triventricular non-communicating hydrocephalus (enlarged lateral + 3rd ventricles, normal 4th).',
    ],
    relatedTopicIds: [],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: [],
  }),
  makeStructure({
    id: 'fourth-ventricle',
    assetId: 'brain-bp3d',
    meshId: 'fourth-ventricle',
    fmaId: 'FMA62008',
    latinName: 'Ventriculus quartus',
    standardName: 'Fourth Ventricle',
    sourceName: 'fourth ventricle',
    group: 'Ventricular System',
    color: '#3b82f6',
    location: 'Diamond-shaped cavity dorsal to pons/medulla and ventral to cerebellum.',
    anatomicalRelationships: ['CSF exits into subarachnoid space via midline Foramen of Magendie and paired Foramina of Luschka.'],
    mainFunction: 'Transitions ventricular CSF into cranial and spinal subarachnoid cisterns.',
    clinicalCorrelations: ['Medulloblastoma and ependymoma commonly arise in the fourth ventricle roof/floor in children.'],
    relatedTopicIds: [],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: [],
  }),
];

// =========================================================================
// 2. HUMAN LUNGS & BRONCHIAL TREE (lungs.glb — 20 structures, CC BY-SA 2.1 JP)
// =========================================================================
const LUNGS_RAW: Array<{
  id: string;
  name: string;
  latin: string;
  group: 'Airways' | 'Right Lung' | 'Left Lung';
  color: string;
  clinical: string;
}> = [
  { id: 'FMA7394', name: 'Trachea', latin: 'Trachea', group: 'Airways', color: '#38bdf8', clinical: 'C-shaped hyaline cartilage rings maintain patency; carina at T4-T5 marks bronchial bifurcation and cough reflex trigger.' },
  { id: 'FMA26661', name: 'Right Bronchial Tree', latin: 'Bronchus principalis dexter', group: 'Airways', color: '#0ea5e9', clinical: 'Wider, shorter, and more vertical (~25°) than left main bronchus—commonest site for aspirated foreign bodies.' },
  { id: 'FMA26662', name: 'Left Bronchial Tree', latin: 'Bronchus principalis sinister', group: 'Airways', color: '#0284c7', clinical: 'Longer and more horizontal (~45°), passing inferior to aortic arch and anterior to descending aorta.' },
  { id: 'FMA7338', name: 'Right Apical Segment (S1)', latin: 'Segmentum apicale dextrum', group: 'Right Lung', color: '#fb7185', clinical: 'Pancoast superior sulcus tumors here compress brachial plexus (C8-T1) and sympathetic chain (Horner syndrome).' },
  { id: 'FMA7339', name: 'Right Posterior Segment (S2)', latin: 'Segmentum posterius dextrum', group: 'Right Lung', color: '#f43f5e', clinical: 'Dependent upper-lobe aspiration site when lying supine; common site for reactivation TB and aspiration abscess.' },
  { id: 'FMA7359', name: 'Right Anterior Segment (S3)', latin: 'Segmentum anterius dextrum', group: 'Right Lung', color: '#e11d48', clinical: 'Separated from Right Middle Lobe anteriorly by the horizontal (minor) fissure.' },
  { id: 'FMA7361', name: 'Right Lateral Middle Segment (S4)', latin: 'Segmentum laterale lobi medii', group: 'Right Lung', color: '#f59e0b', clinical: 'Right middle lobe borders right heart silhouette; middle lobe syndrome blurs right cardiac border on CXR.' },
  { id: 'FMA7360', name: 'Right Medial Middle Segment (S5)', latin: 'Segmentum mediale lobi medii', group: 'Right Lung', color: '#d97706', clinical: 'Directly abuts the right atrial border; consolidation obliterates the right heart border ("silhouette sign").' },
  { id: 'FMA7366', name: 'Right Superior Basal Segment (S6)', latin: 'Segmentum superius lobi inferioris', group: 'Right Lung', color: '#ec4899', clinical: 'Most dependent posterior lower lobe segment when supine—classical site for aspiration pneumonia in bedridden patients.' },
  { id: 'FMA7364', name: 'Right Anterior Basal Segment (S8)', latin: 'Segmentum basale anterius dextrum', group: 'Right Lung', color: '#db2777', clinical: 'Seated near the costodiaphragmatic recess; pleural effusions collect dependently inferior to basal segments.' },
  { id: 'FMA7363', name: 'Right Lateral Basal Segment (S9)', latin: 'Segmentum basale laterale dextrum', group: 'Right Lung', color: '#be185d', clinical: 'Auscultated posterolaterally at 8th-10th intercostal space.' },
  { id: 'FMA7362', name: 'Right Posterior Basal Segment (S10)', latin: 'Segmentum basale posterius dextrum', group: 'Right Lung', color: '#9d174d', clinical: 'Extends deepest into posterior costodiaphragmatic recess near T10-T12.' },
  { id: 'FMA7372', name: 'Left Apicoposterior Segment (S1+S2)', latin: 'Segmentum apicoposterius sinistrum', group: 'Left Lung', color: '#14b8a6', clinical: 'Fused apical + posterior segment in Left Upper Lobe supplied by apicoposterior segmental bronchus.' },
  { id: 'FMA7373', name: 'Left Anterior Segment (S3)', latin: 'Segmentum anterius sinistrum', group: 'Left Lung', color: '#0d9488', clinical: 'Forms upper anterior left thoracic lung surface.' },
  { id: 'FMA7374', name: 'Superior Lingular Segment (S4)', latin: 'Segmentum lingulare superius', group: 'Left Lung', color: '#0f766e', clinical: 'Lingula corresponds embryologically to the right middle lobe and borders the left ventricle (silhouette sign).' },
  { id: 'FMA7375', name: 'Inferior Lingular Segment (S5)', latin: 'Segmentum lingulare inferius', group: 'Left Lung', color: '#10b981', clinical: 'Adjacent to cardiac notch; consolidation obscures left cardiac apex border on PA chest radiograph.' },
  { id: 'FMA7376', name: 'Left Superior Basal Segment (S6)', latin: 'Segmentum superius sinistrum', group: 'Left Lung', color: '#34d399', clinical: 'Separated from Left Upper Lobe by the oblique (major) fissure.' },
  { id: 'FMA7378', name: 'Left Anterior Basal Segment (S8)', latin: 'Segmentum basale anterius sinistrum', group: 'Left Lung', color: '#059669', clinical: 'Usually shares common anteromedial basal trunk with medial basal fibers on the left.' },
  { id: 'FMA7379', name: 'Left Lateral Basal Segment (S9)', latin: 'Segmentum basale laterale sinistrum', group: 'Left Lung', color: '#047857', clinical: 'Basal pleural percussion dullness here points to subpulmonic or dependent pleural effusion.' },
  { id: 'FMA7380', name: 'Left Posterior Basal Segment (S10)', latin: 'Segmentum basale posterius sinistrum', group: 'Left Lung', color: '#065f46', clinical: 'Abuts descending thoracic aorta and left hemidiaphragm.' },
];

export const LUNGS_STRUCTURES: AnatomicalStructureMetadata[] = LUNGS_RAW.map((s) =>
  makeStructure({
    id: s.id,
    assetId: 'lungs-bp3d',
    meshId: s.id,
    fmaId: s.id,
    latinName: s.latin,
    standardName: s.name,
    sourceName: s.name,
    group: s.group,
    color: s.color,
    location:
      s.group === 'Airways'
        ? 'Mediastinal and hilar conducting airway tree.'
        : `${s.group} bronchopulmonary segment enclosed by visceral pleura.`,
    anatomicalRelationships: [
      'Each bronchopulmonary segment is pyramidal, aerated by a tertiary (segmental) bronchus, and supplied by a companion branch of the pulmonary artery.',
      'Intersegmental pulmonary veins course between adjacent segments, forming surgical resection planes.',
    ],
    mainFunction:
      s.group === 'Airways'
        ? 'Conducts, warms, humidifies, and distributes inspired air to lobar and segmental bronchi.'
        : 'Provides an independent anatomical & surgical respiratory unit for alveolar gas exchange.',
    clinicalCorrelations: [s.clinical],
    relatedTopicIds: ['resp-mechanics-gas-exchange'],
    relatedAnimationIds: ['anim-respiratory-mechanics'],
    relatedQuizQuestionIds: [],
  })
);

// =========================================================================
// 3. HUMAN KIDNEYS & URINARY TRACT (kidneys.glb — 6 structures, CC BY 4.0)
// =========================================================================
export const KIDNEYS_STRUCTURES: AnatomicalStructureMetadata[] = [
  makeStructure({
    id: 'right-kidney',
    assetId: 'kidneys-bp3d',
    meshId: 'right-kidney',
    fmaId: 'FMA7204',
    latinName: 'Ren dexter',
    standardName: 'Right Kidney',
    sourceName: 'right kidney',
    group: 'Renal Parenchyma',
    color: '#b45309',
    location: 'Retroperitoneal T12–L3 level, positioned slightly lower than left kidney due to the right hepatic lobe.',
    anatomicalRelationships: [
      'Anteriorly relates to liver (hepatorenal recess), descending (2nd) duodenum, and hepatic colonic flexure.',
      'Hilum contains (Anterior->Posterior): Renal Vein, Renal Artery, Renal Pelvis (VAP).',
    ],
    mainFunction: 'Glomerular filtration (~180 L/day), fluid-electrolyte homeostasis, renin-angiotensin BP control, and erythropoietin secretion.',
    clinicalCorrelations: [
      'Right kidney lower pole sits closer to L3, making it palpable on deep inspiration in thin individuals.',
      'Morison’s (hepatorenal) pouch is the commonest supine site for free intraperitoneal fluid on FAST ultrasound.',
    ],
    relatedTopicIds: ['renal-nephron-filtration'],
    relatedAnimationIds: ['anim-renal-nephron'],
    relatedQuizQuestionIds: [],
  }),
  makeStructure({
    id: 'left-kidney',
    assetId: 'kidneys-bp3d',
    meshId: 'left-kidney',
    fmaId: 'FMA7205',
    latinName: 'Ren sinister',
    standardName: 'Left Kidney',
    sourceName: 'left kidney',
    group: 'Renal Parenchyma',
    color: '#d97706',
    location: 'Retroperitoneal at T11/12–L2/3 level, superior to the right kidney.',
    anatomicalRelationships: [
      'Anteriorly relates to stomach, pancreas tail, spleen, jejunum, and splenic flexure.',
      'Left renal vein runs longer anterior to abdominal aorta and inferior to SMA ("nutcracker zone").',
    ],
    mainFunction: 'Ultrafiltration, tubular reabsorption/secretion, acid-base buffering, and calcitriol activation.',
    clinicalCorrelations: [
      'Nutcracker syndrome: SMA compression of left renal vein causes left flank pain, hematuria, and left-sided varicocele (receives left gonadal vein).',
    ],
    relatedTopicIds: ['renal-nephron-filtration'],
    relatedAnimationIds: ['anim-renal-nephron'],
    relatedQuizQuestionIds: [],
  }),
  makeStructure({
    id: 'right-ureter',
    assetId: 'kidneys-bp3d',
    meshId: 'right-ureter',
    fmaId: 'FMA15858',
    latinName: 'Ureter dexter',
    standardName: 'Right Ureter',
    sourceName: 'right ureter',
    group: 'Collecting System',
    color: '#f59e0b',
    location: 'Retroperitoneal fibromuscular tube descending over psoas major into the pelvis.',
    anatomicalRelationships: [
      'Three physiological constrictions for kidney stones: UPJ, Pelvic brim (crossing common iliac bifurcation), and UVJ ("water under the bridge" behind uterine artery / vas deferens).',
    ],
    mainFunction: 'Peristaltic urine propulsion from renal pelvis to urinary bladder.',
    clinicalCorrelations: [
      'Right ureteric colic radiates "loin to groin" and can mimic acute appendicitis on presentation.',
    ],
    relatedTopicIds: ['renal-nephron-filtration'],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: [],
  }),
  makeStructure({
    id: 'left-ureter',
    assetId: 'kidneys-bp3d',
    meshId: 'left-ureter',
    fmaId: 'FMA15859',
    latinName: 'Ureter sinister',
    standardName: 'Left Ureter',
    sourceName: 'left ureter',
    group: 'Collecting System',
    color: '#fbbf24',
    location: 'Left retroperitoneum descending anterior to psoas major and left iliac bifurcation.',
    anatomicalRelationships: ['Crossed anteriorly by left colic and gonadal vessels; enters bladder trigone obliquely preventing vesicoureteric reflux.'],
    mainFunction: 'Unidirectional peristaltic transport of urine into the bladder.',
    clinicalCorrelations: ['Ureterovesical junction (UVJ) is the tightest narrowing where renal calculi most frequently impact.'],
    relatedTopicIds: ['renal-nephron-filtration'],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: [],
  }),
  makeStructure({
    id: 'right-renal-artery',
    assetId: 'kidneys-bp3d',
    meshId: 'right-renal-artery',
    fmaId: 'FMA14752',
    latinName: 'Arteria renalis dextra',
    standardName: 'Right Renal Artery',
    sourceName: 'right renal artery',
    group: 'Renal Vasculature',
    color: '#ef4444',
    location: 'Arises laterally from abdominal aorta (L1-L2) and courses posterior to the IVC.',
    anatomicalRelationships: ['Longer than left renal artery because abdominal aorta sits slightly left of midline.'],
    mainFunction: 'Delivers ~10-12% of cardiac output to right glomerular capillary beds.',
    clinicalCorrelations: ['Fibromuscular dysplasia ("string of beads" angiogram) classically affects mid/distal right renal artery in young women, causing secondary hypertension.'],
    relatedTopicIds: ['renal-nephron-filtration'],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: [],
  }),
  makeStructure({
    id: 'left-renal-artery',
    assetId: 'kidneys-bp3d',
    meshId: 'left-renal-artery',
    fmaId: 'FMA14753',
    latinName: 'Arteria renalis sinistra',
    standardName: 'Left Renal Artery',
    sourceName: 'left renal artery',
    group: 'Renal Vasculature',
    color: '#dc2626',
    location: 'Short direct lateral branch from abdominal aorta at L1-L2 entering the left renal hilum.',
    anatomicalRelationships: ['Lies posterior to the left renal vein; divides into segmental end-arteries (no collateral anastomoses).'],
    mainFunction: 'High-pressure renal perfusion driving glomerular hydrostatic pressure (PGC ~60 mmHg).',
    clinicalCorrelations: ['Atherosclerotic ostial renal artery stenosis activates RAAS (high renin/aldosterone) and risks flash pulmonary edema if bilateral.'],
    relatedTopicIds: ['renal-nephron-filtration'],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: [],
  }),
];

// =========================================================================
// 4. LIVER, GALLBLADDER & PORTAL TRIAD (liver.glb — 7 structures, CC BY 4.0)
// =========================================================================
export const LIVER_STRUCTURES: AnatomicalStructureMetadata[] = [
  makeStructure({
    id: 'liver',
    assetId: 'liver-bp3d',
    meshId: 'liver',
    fmaId: 'FMA7197',
    latinName: 'Hepar',
    standardName: 'Liver Parenchyma (Couinaud Segments)',
    sourceName: 'liver (tissue subset)',
    group: 'Hepatic Parenchyma',
    color: '#b91c1c',
    location: 'Right upper quadrant (RUQ) and epigastrium beneath the right hemidiaphragm.',
    anatomicalRelationships: [
      'Functionally divided into 8 vascular Couinaud segments based on portal & hepatic venous branching.',
      'Bare area posteriorly directly contacts diaphragm without visceral peritoneum.',
    ],
    mainFunction: 'Metabolic regulation, gluconeogenesis, albumin/coagulation factor synthesis, bilirubin conjugation, bile secretion, and xenobiotic detoxification.',
    clinicalCorrelations: [
      'Right-sided subphrenic or hepatic abscess causes referred right shoulder tip pain via phrenic nerve (C3-C5).',
    ],
    relatedTopicIds: [],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: [],
  }),
  makeStructure({
    id: 'gallbladder',
    assetId: 'liver-bp3d',
    meshId: 'gallbladder',
    fmaId: 'FMA7202',
    latinName: 'Vesica biliaris',
    standardName: 'Gallbladder',
    sourceName: 'Gallbladder',
    group: 'Biliary Tree',
    color: '#16a34a',
    location: 'Gallbladder fossa on the visceral inferior hepatic surface between Couinaud segments IVb and V.',
    anatomicalRelationships: ['Fundus projects at right 9th costal cartilage tip (midclavicular line, Murphy’s point).'],
    mainFunction: 'Stores, acidifies, and concentrates (~5–10x) hepatic bile, contracting in response to cholecystokinin (CCK).',
    clinicalCorrelations: [
      'Gallstone impaction + inflammation triggers Murphy’s sign (inspiratory arrest during RUQ palpation).',
    ],
    relatedTopicIds: [],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: [],
  }),
  makeStructure({
    id: 'portal',
    assetId: 'liver-bp3d',
    meshId: 'portal',
    fmaId: 'FMA15711',
    latinName: 'Vena portae hepatis',
    standardName: 'Hepatic Portal Vein',
    sourceName: 'Portal vein',
    group: 'Portal Triad',
    color: '#7c3aed',
    location: 'Formed posterior to pancreatic neck (L2) by splenic + superior mesenteric veins; enters porta hepatis posteriorly.',
    anatomicalRelationships: ['Delivers ~75% of hepatic blood flow (nutrient-rich, partially deoxygenated venous blood from GI tract and spleen).'],
    mainFunction: 'First-pass metabolic delivery from splanchnic viscera to hepatic sinusoids.',
    clinicalCorrelations: [
      'Cirrhosis elevates portal pressure (>10 mmHg), opening portosystemic anastomoses: esophageal varices, caput medusae, and hemorrhoids.',
    ],
    relatedTopicIds: [],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: [],
    references: [GRAYS_REF, ROBBINS_REF, BP3D_ONTOLOGY_REF],
  }),
  makeStructure({
    id: 'hepatic-veins',
    assetId: 'liver-bp3d',
    meshId: 'hepatic-veins',
    fmaId: 'FMA15393',
    latinName: 'Venae hepaticae',
    standardName: 'Hepatic Veins (Right, Middle, Left)',
    sourceName: 'Hepatic veins',
    group: 'Venous Outflow',
    color: '#2563eb',
    location: 'Course intersegmentally between Couinaud sectors superiorly directly into the Inferior Vena Cava.',
    anatomicalRelationships: ['Middle hepatic vein demarcates Cantlie’s surgical plane dividing functional right and left hemilivers.'],
    mainFunction: 'Collects post-sinusoidal blood directly into subdiaphragmatic IVC.',
    clinicalCorrelations: [
      'Hepatic vein thrombosis (Budd-Chiari syndrome) presents with painful hepatomegaly, ascites, and caudate lobe hypertrophy (drains directly into IVC).',
    ],
    relatedTopicIds: [],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: [],
  }),
  makeStructure({
    id: 'artery',
    assetId: 'liver-bp3d',
    meshId: 'artery',
    fmaId: 'FMA14771',
    latinName: 'Arteria hepatica propria',
    standardName: 'Hepatic Arterial Tree',
    sourceName: 'Hepatic artery',
    group: 'Portal Triad',
    color: '#ef4444',
    location: 'Ascends within hepatoduodenal ligament on the anterior-left side of portal triad.',
    anatomicalRelationships: ['Right hepatic artery usually gives off the cystic artery inside Calot’s (cystohepatic) triangle.'],
    mainFunction: 'Provides ~25% of hepatic blood flow and ~50% of hepatic oxygen supply.',
    clinicalCorrelations: [
      'Pringle maneuver compresses the hepatoduodenal ligament (portal triad) to control severe hepatic parenchymal hemorrhage.',
    ],
    relatedTopicIds: [],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: [],
  }),
  makeStructure({
    id: 'biliary',
    assetId: 'liver-bp3d',
    meshId: 'biliary',
    fmaId: 'FMA15389',
    latinName: 'Ductus hepatici & choledochus',
    standardName: 'Hepatic & Common Bile Ducts',
    sourceName: 'Hepatic bile ducts',
    group: 'Biliary Tree',
    color: '#10b981',
    location: 'Confluence at porta hepatis descending anteriorly-right within the free edge of lesser omentum.',
    anatomicalRelationships: ['Common hepatic duct + cystic duct = Common Bile Duct (CBD), joining main pancreatic duct at hepatopancreatic ampulla (of Vater).'],
    mainFunction: 'Drains bile salts, conjugated bilirubin, and cholesterol into second part of duodenum.',
    clinicalCorrelations: [
      'Choledocholithiasis causes Charcot’s triad (fever, RUQ pain, obstructive jaundice) in ascending cholangitis.',
    ],
    relatedTopicIds: [],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: [],
  }),
  makeStructure({
    id: 'cystic',
    assetId: 'liver-bp3d',
    meshId: 'cystic',
    fmaId: 'FMA14546',
    latinName: 'Ductus cysticus',
    standardName: 'Cystic Duct (Spiral Valve of Heister)',
    sourceName: 'Cystic duct',
    group: 'Biliary Tree',
    color: '#22c55e',
    location: 'Links gallbladder neck to common hepatic duct inside Calot’s hepatocystic triangle.',
    anatomicalRelationships: ['Calot’s triangle borders: Cystic duct, Common hepatic duct, and Inferior liver edge (contains cystic artery).'],
    mainFunction: 'Bidirectional bile passage during gallbladder filling and CCK-mediated emptying.',
    clinicalCorrelations: [
      'Must establish Critical View of Safety around cystic duct & artery during laparoscopic cholecystectomy to avoid CBD injury.',
    ],
    relatedTopicIds: [],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: [],
  }),
];

// =========================================================================
// 5. HUMAN EYE & ORBIT (eye.glb — 21 structures, CC BY-SA 2.1 Japan)
// =========================================================================
const EYE_RAW: Array<{
  id: string;
  name: string;
  latin: string;
  group: 'Tunics & Chambers' | 'Optical Media' | 'Extraocular Muscles' | 'Adnexa & Nerve';
  color: string;
  clinical: string;
}> = [
  { id: 'cornea', name: 'Cornea', latin: 'Cornea', group: 'Tunics & Chambers', color: '#bae6fd', clinical: 'Provides ~2/3 (+43 D) of total eye refractive power; avascular, nourished by aqueous humor & tear film; sensory innervation V1.' },
  { id: 'sclera', name: 'Sclera', latin: 'Sclera', group: 'Tunics & Chambers', color: '#e2e8f0', clinical: 'Tough collagenous outer coat continuous posteriorly with optic nerve dura; thinning in osteogenesis imperfecta yields blue sclera.' },
  { id: 'choroid', name: 'Choroid (Vascular Uvea)', latin: 'Choroidea', group: 'Tunics & Chambers', color: '#991b1b', clinical: 'Vascular pigmented middle layer nourishing outer photoreceptors (rods/cones).' },
  { id: 'retina', name: 'Retina', latin: 'Retina', group: 'Tunics & Chambers', color: '#f59e0b', clinical: 'Macula/fovea subserves high-acuity cone vision; central retinal artery occlusion gives "cherry-red spot".' },
  { id: 'iris', name: 'Iris', latin: 'Iris', group: 'Tunics & Chambers', color: '#0284c7', clinical: 'Sphincter pupillae (parasympathetic CN III constriction) vs dilator pupillae (sympathetic dilation).' },
  { id: 'anterior-chamber', name: 'Anterior Chamber', latin: 'Camera anterior bulbi', group: 'Tunics & Chambers', color: '#38bdf8', clinical: 'Aqueous humor flows from posterior chamber through pupil and drains via trabecular meshwork -> Canal of Schlemm (glaucoma site).' },
  { id: 'lens', name: 'Crystalline Lens', latin: 'Lens', group: 'Optical Media', color: '#a5f3fc', clinical: 'Dynamic accommodation (+15–20 D); opacification causes cataract.' },
  { id: 'suspensory-ligament', name: 'Suspensory Zonular Ligaments (Zinn)', latin: 'Zonula ciliaris', group: 'Optical Media', color: '#cbd5e1', clinical: 'Upward superotemporal lens subluxation occurs in Marfan syndrome (FBN1 fibrillin-1 mutation).' },
  { id: 'vitreous-body', name: 'Vitreous Body', latin: 'Corpus vitreum', group: 'Optical Media', color: '#7dd3fc', clinical: 'Transparent hyaluronic-collagen gel; posterior vitreous detachment causes floaters and retinal traction tears.' },
  { id: 'superior-rectus', name: 'Superior Rectus Muscle', latin: 'Musculus rectus superior', group: 'Extraocular Muscles', color: '#e11d48', clinical: 'Innervated by CN III (superior division); elevates, intorts, and adducts eyeball.' },
  { id: 'inferior-rectus', name: 'Inferior Rectus Muscle', latin: 'Musculus rectus inferior', group: 'Extraocular Muscles', color: '#be123c', clinical: 'Innervated by CN III (inferior division); commonly entrapped in orbital floor blowout fracture (restricted upward gaze).' },
  { id: 'medial-rectus', name: 'Medial Rectus Muscle', latin: 'Musculus rectus medialis', group: 'Extraocular Muscles', color: '#f43f5e', clinical: 'Pure adductor (CN III inferior division); affected in internuclear ophthalmoplegia (MLF lesion).' },
  { id: 'lateral-rectus', name: 'Lateral Rectus Muscle', latin: 'Musculus rectus lateralis', group: 'Extraocular Muscles', color: '#fb7185', clinical: 'Innervated by Abducens Nerve (LR6 -> CN VI); palsy causes medial strabismus and horizontal diplopia worse on ipsilateral gaze.' },
  { id: 'superior-oblique', name: 'Superior Oblique Muscle', latin: 'Musculus obliquus superior', group: 'Extraocular Muscles', color: '#db2777', clinical: 'Innervated by Trochlear Nerve (SO4 -> CN IV); intorts and depresses adducted eye—palsy causes compensatory head tilt away from lesion.' },
  { id: 'inferior-oblique', name: 'Inferior Oblique Muscle', latin: 'Musculus obliquus inferior', group: 'Extraocular Muscles', color: '#ec4899', clinical: 'Innervated by CN III; extorts and elevates adducted eye.' },
  { id: 'levator-palpebrae', name: 'Levator Palpebrae Superioris', latin: 'Musculus levator palpebrae superioris', group: 'Extraocular Muscles', color: '#f472b6', clinical: 'Skeletal muscle (CN III) raising upper eyelid (with Müller’s smooth muscle via sympathetic chain); CN III lesion causes severe ptosis.' },
  { id: 'optic-nerve', name: 'Optic Nerve (CN II)', latin: 'Nervus opticus', group: 'Adnexa & Nerve', color: '#eab308', clinical: 'CNS myelinated tract (oligodendrocytes + meningeal sheath); raised ICP transmits to subarachnoid sheath causing papilledema.' },
  { id: 'trochlea', name: 'Trochlea of Superior Oblique', latin: 'Trochlea musculi obliqui superioris', group: 'Adnexa & Nerve', color: '#94a3b8', clinical: 'Fibrocartilaginous pulley at superomedial frontal roof redirecting superior oblique tendon posterolaterally.' },
  { id: 'lacrimal-gland', name: 'Lacrimal Gland', latin: 'Glandula lacrimalis', group: 'Adnexa & Nerve', color: '#14b8a6', clinical: 'Secretomotor parasympathetic fibers travel CN VII -> greater petrosal nerve -> pterygopalatine ganglion -> V1/V2.' },
  { id: 'upper-tarsal-plate', name: 'Superior Tarsal Plate', latin: 'Tarsus superior', group: 'Adnexa & Nerve', color: '#64748b', clinical: 'Dense fibrous eyelid scaffold containing Meibomian glands; blocked gland causes chalazion.' },
  { id: 'lower-tarsal-plate', name: 'Inferior Tarsal Plate', latin: 'Tarsus inferior', group: 'Adnexa & Nerve', color: '#475569', clinical: 'Maintains lower eyelid margin apposition for tear drainage into puncta.' },
];

export const EYE_STRUCTURES: AnatomicalStructureMetadata[] = EYE_RAW.map((s) =>
  makeStructure({
    id: s.id,
    assetId: 'eye-bp3d',
    meshId: s.id,
    latinName: s.latin,
    standardName: s.name,
    sourceName: s.name,
    group: s.group,
    color: s.color,
    location: `Orbital cavity (${s.group}).`,
    anatomicalRelationships: [
      'Extraocular recti insert anterior to equator from common tendinous ring (Annulus of Zinn); obliques insert posterior to equator.',
    ],
    mainFunction:
      s.group === 'Extraocular Muscles'
        ? 'Ocular motility and binocular visual alignment.'
        : 'Optical refraction, sensory phototransduction, or orbital protection.',
    clinicalCorrelations: [s.clinical],
    relatedTopicIds: [],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: [],
  })
);

// =========================================================================
// UNIFIED REGISTRIES & CLINICAL PATHOLOGY TERRITORY OVERLAYS
// =========================================================================
export const ORGAN_STRUCTURES_BY_ASSET: Record<string, AnatomicalStructureMetadata[]> = {
  'brain-bp3d': BRAIN_STRUCTURES,
  'lungs-bp3d': LUNGS_STRUCTURES,
  'kidneys-bp3d': KIDNEYS_STRUCTURES,
  'liver-bp3d': LIVER_STRUCTURES,
  'eye-bp3d': EYE_STRUCTURES,
};

export const PATHOLOGY_TERRITORIES: Record<string, PathologyTerritoryPreset[]> = {
  'heart-bp3d': [
    {
      id: 'path-inferior-stemi',
      title: 'Acute Inferior Wall STEMI (RCA Territory)',
      summary:
        'Proximal Right Coronary Artery (RCA) occlusion threatens both the SA/AV nodal conduction supply and inferior ventricular wall.',
      affectedStructureIds: ['right-coronary', 'right-atrium', 'right-ventricle', 'ventricular-wall'],
      clinicalSigns: [
        'ST-segment elevation in II, III, aVF',
        'Sinus bradycardia / AV heart block',
        'RV preload sensitivity (hypotension with nitrates)',
      ],
      highlightColor: '#ef4444',
    },
    {
      id: 'path-anterior-stemi',
      title: 'Anterior Wall STEMI (LCA / LAD Territory)',
      summary:
        'Left Coronary / LAD occlusion threatens the anterior LV myocardium, apex, and interventricular septum.',
      affectedStructureIds: ['left-coronary', 'left-ventricle', 'ventricular-wall'],
      clinicalSigns: [
        'ST elevation in V1–V4',
        'Acute pulmonary edema / cardiogenic shock risk',
        'Bundle branch / fascicular blocks',
      ],
      highlightColor: '#f97316',
    },
  ],
  'skeleton-bp3d': [
    {
      id: 'path-radial-palsy',
      title: 'Humeral Midshaft Fracture — Radial Nerve Palsy',
      summary:
        'Spiral groove fracture injures the radial nerve along the posterior humeral shaft.',
      affectedStructureIds: ['right-humerus', 'right-radius', 'right-ulna'],
      clinicalSigns: [
        'Wrist drop (loss of wrist & MCP extension)',
        'Preserved elbow extension (triceps branches arise proximally)',
        '1st dorsal web space sensory loss',
      ],
      highlightColor: '#ef4444',
    },
    {
      id: 'path-epidural-pterion',
      title: 'Pterion Fracture — Epidural Hematoma',
      summary:
        'Blunt temporal impact at the sphenoparietal/frontal junction lacerates the Middle Meningeal Artery.',
      affectedStructureIds: ['sphenoid-bone', 'frontal-bone', 'right-parietal-bone'],
      clinicalSigns: [
        'Lucid interval followed by rapid neurological decline',
        'Biconvex (lens-shaped) hyperdensity limited by cranial sutures',
        'Ipsilateral CN III uncal herniation risk',
      ],
      highlightColor: '#dc2626',
    },
  ],
  'brain-bp3d': [
    {
      id: 'path-left-mca-stroke',
      title: 'Left MCA Territory Ischemia (Broca / Wernicke)',
      summary:
        'Left Middle Cerebral Artery stroke affects lateral frontal, parietal, and superior temporal language cortex.',
      affectedStructureIds: ['left-frontal', 'left-parietal', 'left-temporal'],
      clinicalSigns: [
        'Right-sided face/arm > leg hemiparesis & sensory loss',
        'Broca (expressive) &/or Wernicke (receptive) aphasia',
      ],
      highlightColor: '#ef4444',
    },
    {
      id: 'path-hydrocephalus-aqueduct',
      title: 'Aqueductal Stenosis (Non-Communicating Hydrocephalus)',
      summary:
        'Obstruction at the midbrain Cerebral Aqueduct dilates Lateral and Third Ventricles proximally while sparing the Fourth Ventricle.',
      affectedStructureIds: [
        'cerebral-aqueduct',
        'left-lateral-ventricle',
        'right-lateral-ventricle',
        'third-ventricle',
      ],
      clinicalSigns: ['Elevated ICP (headache, vomiting, papilledema)', 'Enlarged lateral + 3rd ventricles; normal 4th'],
      highlightColor: '#3b82f6',
    },
  ],
  'lungs-bp3d': [
    {
      id: 'path-aspiration-right',
      title: 'Right Main Bronchus / Supine Aspiration Segments',
      summary:
        'Due to wider vertical right main bronchus, aspirated material preferentially enters S2 (posterior upper) or S6 (superior basal).',
      affectedStructureIds: ['FMA26661', 'FMA7339', 'FMA7366'],
      clinicalSigns: ['Right lung crackles / consolidation on CXR', 'Halitosis & putrid sputum if anaerobic abscess forms'],
      highlightColor: '#f59e0b',
    },
  ],
  'kidneys-bp3d': [
    {
      id: 'path-ureteric-stone',
      title: 'Acute Left Ureteric Calculus & Obstruction',
      summary:
        'Renal calculus lodging along the left ureter increases upstream pelvicalyceal pressure (hydronephrosis).',
      affectedStructureIds: ['left-ureter', 'left-kidney'],
      clinicalSigns: ['Severe colicky flank pain radiating to groin', 'Microscopic or gross hematuria'],
      highlightColor: '#f59e0b',
    },
  ],
  'liver-bp3d': [
    {
      id: 'path-cholecystitis',
      title: 'Cystic Duct Obstruction -> Acute Cholecystitis',
      summary:
        'Impacted gallstone in the cystic duct causes biliary stasis, mucosal ischemia, and RUQ peritoneal inflammation.',
      affectedStructureIds: ['cystic', 'gallbladder'],
      clinicalSigns: ['Positive Murphy’s sign', 'RUQ tenderness + fever + leukocytosis'],
      highlightColor: '#ef4444',
    },
  ],
  'eye-bp3d': [
    {
      id: 'path-cn6-lr6',
      title: 'Abducens Nerve (CN VI) Palsy — Lateral Rectus',
      summary:
        'Loss of Lateral Rectus abduction results in unopposed Medial Rectus tone (esotropia).',
      affectedStructureIds: ['lateral-rectus', 'optic-nerve'],
      clinicalSigns: ['Inability to abduct affected eye past midline', 'Horizontal diplopia worse on distant / ipsilateral gaze'],
      highlightColor: '#ef4444',
    },
  ],
};
