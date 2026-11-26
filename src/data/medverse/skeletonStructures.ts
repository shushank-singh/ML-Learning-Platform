import { AnatomicalStructureMetadata, MedicalReference } from '@/types/medverse';
import skeletonManifest from '../../../public/models/medverse/skeleton-manifest.json';

const SKELETON_REFS: MedicalReference[] = [
  {
    id: 'ref-grays-osteology',
    citation:
      'Standring S. Gray’s Anatomy: The Anatomical Basis of Clinical Practice. 42nd ed. Elsevier; 2020. Osteology & Musculoskeletal Sections.',
    sourceType: 'textbook',
  },
  {
    id: 'ref-bp3d-skeleton',
    citation:
      'Mitsuhashi N et al. BodyParts3D: 3D structure database for anatomical concepts. Nucleic Acids Res. 2009;37:D782–D785.',
    sourceType: 'ontology',
    url: 'https://doi.org/10.1093/nar/gkn613',
  },
];

interface HighYieldBoneOverride {
  group: string;
  location: string;
  relationships: string[];
  functionText: string;
  clinical: string[];
}

const HIGH_YIELD_BONE_DETAILS: Record<string, HighYieldBoneOverride> = {
  'frontal-bone': {
    group: 'Skull',
    location: 'Forms the forehead, anterior cranial fossa floor, and superior orbital margins.',
    relationships: [
      'Articulates posteriorly with parietal bones at the coronal suture.',
      'Articulates inferiorly with nasal, maxillary, zygomatic, and sphenoid bones.',
    ],
    functionText: 'Protects the frontal cerebral lobes and houses the frontal paranasal sinuses.',
    clinical: [
      'Frontal sinus fractures can breach the posterior wall leading to CSF rhinorrhea or pneumocephalus.',
      'Supraorbital notch/foramen transmits the supraorbital nerve (V1) and vessels.',
    ],
  },
  'sphenoid-bone': {
    group: 'Skull',
    location: 'Keystone bone of the middle cranial fossa linking cranial and facial skeletons.',
    relationships: [
      'Houses the pituitary gland in the sella turcica (hypophyseal fossa).',
      'Transmits CN II (optic canal), CN III, IV, V1, VI (superior orbital fissure), V2 (rotundum), V3 (ovale).',
    ],
    functionText: 'Forms central skull base architecture and key neurovascular foramina.',
    clinical: [
      'Pituitary macroadenomas expand the sella turcica and compress the optic chiasm (bitemporal hemianopsia).',
      'Pterion junction (frontal, parietal, temporal, greater wing of sphenoid) overlies the anterior division of the middle meningeal artery (epidural hematoma).',
    ],
  },
  'right-clavicle': {
    group: 'Right upper limb',
    location: 'Subcutaneous S-shaped strut spanning horizontally from manubrium sterni to acromion of scapula.',
    relationships: [
      'Medial 2/3 convex anteriorly; lateral 1/3 concave anteriorly.',
      'Subclavian vessels and brachial plexus cords pass immediately posterior/inferior in the costoclavicular space.',
    ],
    functionText: 'Transmits upper-limb axial weight to the trunk and keeps the glenohumeral joint laterally positioned.',
    clinical: [
      'Most frequently fractured bone (especially at the junction of medial 2/3 and lateral 1/3).',
      'Medial fragment elevates due to sternocleidomastoid pull; lateral fragment drops under arm weight.',
    ],
  },
  'left-clavicle': {
    group: 'Left upper limb',
    location: 'Subcutaneous S-shaped strut spanning horizontally from manubrium sterni to acromion of scapula.',
    relationships: [
      'Medial 2/3 convex anteriorly; lateral 1/3 concave anteriorly.',
      'Subclavian vessels and brachial plexus cords pass immediately inferiorly.',
    ],
    functionText: 'Transmits upper-limb axial weight to the sternum and stabilizes shoulder girdle elevation.',
    clinical: [
      'Commonest fracture site at the middle-to-lateral third junction.',
      'Rarely, posterior displacement can threaten subclavian vessels or brachial plexus.',
    ],
  },
  'right-humerus': {
    group: 'Right upper limb',
    location: 'Long bone of the right arm extending from glenohumeral joint to elbow.',
    relationships: [
      'Surgical neck relates closely to the axillary nerve and posterior circumflex humeral artery.',
      'Radial (spiral) groove posteriorly transmits the radial nerve and profunda brachii artery.',
      'Medial epicondyle grooves posteriorly for the ulnar nerve.',
    ],
    functionText: 'Provides lever arm for shoulder and elbow motion and muscle attachments.',
    clinical: [
      'Surgical neck fracture -> Axillary nerve injury (deltoid paralysis + regimental badge anesthesia).',
      'Midshaft fracture -> Radial nerve injury (wrist drop).',
      'Supracondylar fracture -> Brachial artery / median nerve (AIN) compromise (Volkmann ischemic contracture).',
    ],
  },
  'left-humerus': {
    group: 'Left upper limb',
    location: 'Long bone of the left arm extending from glenohumeral joint to elbow.',
    relationships: [
      'Surgical neck relates to axillary nerve; midshaft spiral groove relates to radial nerve; medial epicondyle relates to ulnar nerve.',
    ],
    functionText: 'Forms glenohumeral and humeroulnar/humeroradial joints.',
    clinical: [
      'Classic three-nerve fracture correlations: surgical neck (axillary), midshaft (radial), medial epicondyle (ulnar).',
    ],
  },
  'right-scaphoid': {
    group: 'Right upper limb',
    location: 'Radial-side proximal carpal bone forming the floor of the anatomical snuffbox.',
    relationships: [
      'Articulates proximally with distal radius and distally with trapezium/trapezoid.',
      'Blood supply enters primarily at the distal pole via radial artery branches (retrograde flow).',
    ],
    functionText: 'Bridges proximal and distal carpal rows across wrist radial deviation and extension.',
    clinical: [
      'Commonest carpal fracture (FOOSH -> anatomical snuffbox tenderness).',
      'Retrograde blood supply places the proximal pole at high risk of avascular necrosis (AVN) and nonunion.',
    ],
  },
  'left-scaphoid': {
    group: 'Left upper limb',
    location: 'Radial-side proximal carpal bone forming the floor of the left anatomical snuffbox.',
    relationships: [
      'Articulates proximally with distal radius; blood supply enters distally and flows retrogradely.',
    ],
    functionText: 'Primary load-bearing carpal bone linking proximal and distal rows.',
    clinical: [
      'Initial radiographs may be normal; persist with clinical suspicion (snuffbox tenderness) -> thumb spica immobilization or MRI.',
    ],
  },
  'sternum': {
    group: 'Thorax',
    location: 'Flat midline anterior thoracic bone comprising manubrium, body, and xiphoid process.',
    relationships: [
      'Manubriosternal joint (sternal angle of Louis) aligns with the 2nd costal cartilage and T4/T5 disc plane.',
      'Articulates laterally with clavicles and costal cartilages 1–7.',
    ],
    functionText: 'Protects the heart and great vessels anteriorly and anchors the anterior ribcage.',
    clinical: [
      'Sternal angle (T4/T5) marks the aortic arch start/end, tracheal bifurcation (carina), and azygos entry into SVC.',
      'Midline sternotomy provides surgical access to the heart and anterior mediastinum.',
    ],
  },
  'right-femur': {
    group: 'Right lower limb',
    location: 'Longest and strongest bone of the human body, spanning acetabulum to knee.',
    relationships: [
      'Femoral neck is supplied by medial femoral circumflex artery (retinacular branches).',
      'Articulates proximally at the hip and distally with tibia and patella.',
    ],
    functionText: 'Bears axial weight during standing/gait and provides mechanical leverage for thigh musculature.',
    clinical: [
      'Intracapsular femoral neck fractures risk disrupting retinacular vessels -> femoral head avascular necrosis (AVN).',
      'Femoral shaft fractures can sequester 1–1.5 L of blood and trigger fat embolism syndrome.',
    ],
  },
  'left-femur': {
    group: 'Left lower limb',
    location: 'Longest and strongest bone of the left lower limb, spanning acetabulum to knee.',
    relationships: [
      'Femoral head/neck perfused predominantly by medial femoral circumflex retinacular vessels.',
    ],
    functionText: 'Primary weight-bearing bone of the lower limb.',
    clinical: [
      'Shortened and externally rotated lower limb is the classic presentation of displaced femoral neck fracture.',
    ],
  },
};

function inferRegionGroup(id: string, sourceName: string): { group: string; subGroup: string; color: string } {
  const s = `${id} ${sourceName}`.toLowerCase();
  if (
    s.includes('frontal') ||
    s.includes('parietal') ||
    s.includes('occipital') ||
    s.includes('temporal') ||
    s.includes('sphenoid') ||
    s.includes('ethmoid') ||
    s.includes('nasal') ||
    s.includes('lacrimal') ||
    s.includes('zygomatic') ||
    s.includes('maxilla') ||
    s.includes('palatine') ||
    s.includes('vomer') ||
    s.includes('mandible') ||
    s.includes('hyoid')
  ) {
    return { group: 'Skull', subGroup: 'Craniofacial', color: '#e6d8bd' };
  }
  if (
    s.includes('vertebra') ||
    s.includes('atlas') ||
    s.includes('axis') ||
    s.includes('sacrum') ||
    s.includes('coccyx') ||
    s.includes('intervertebral')
  ) {
    return {
      group: 'Vertebral column',
      subGroup: s.includes('disc') ? 'Intervertebral discs' : 'Vertebrae',
      color: s.includes('disc') ? '#a9c3cb' : '#dcc59d',
    };
  }
  if (s.includes('sternum') || s.includes('rib') || s.includes('costal-cartilage')) {
    return {
      group: 'Thorax',
      subGroup: s.includes('cartilage') ? 'Costal cartilages' : 'Ribcage & Sternum',
      color: s.includes('cartilage') ? '#a9c3cb' : '#e6d8bd',
    };
  }
  if (s.includes('hip-bone') || s.includes('ilium') || s.includes('ischium') || s.includes('pubis') || s.includes('pelvis')) {
    return { group: 'Pelvis', subGroup: 'Pelvic girdle', color: '#d8c19a' };
  }
  if (
    s.includes('clavicle') ||
    s.includes('scapula') ||
    s.includes('humerus') ||
    s.includes('radius') ||
    s.includes('ulna') ||
    s.includes('scaphoid') ||
    s.includes('lunate') ||
    s.includes('triquetrum') ||
    s.includes('pisiform') ||
    s.includes('trapezium') ||
    s.includes('trapezoid') ||
    s.includes('capitate') ||
    s.includes('hamate') ||
    s.includes('metacarpal') ||
    s.includes('hand')
  ) {
    return {
      group: id.startsWith('left-') ? 'Left upper limb' : 'Right upper limb',
      subGroup: 'Upper extremity',
      color: '#e0cdaa',
    };
  }
  return {
    group: id.startsWith('left-') ? 'Left lower limb' : 'Right lower limb',
    subGroup: 'Lower extremity',
    color: '#e3d1b0',
  };
}

function toDisplayName(sourceName: string): string {
  return sourceName
    .split(' ')
    .map((w) => (w.length > 0 ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');
}

interface RawManifestStructure {
  id: string;
  fma?: string;
  sourceName: string;
}

export const SKELETON_STRUCTURES: AnatomicalStructureMetadata[] = (
  (skeletonManifest as { structures: RawManifestStructure[] }).structures || []
).map((raw) => {
  const inferred = inferRegionGroup(raw.id, raw.sourceName);
  const override = HIGH_YIELD_BONE_DETAILS[raw.id];
  const isCartilage =
    raw.id.includes('cartilage') || raw.id.includes('intervertebral-disc');

  return {
    id: raw.id,
    assetId: 'skeleton-bp3d',
    meshId: raw.id,
    fmaId: raw.fma,
    standardName: toDisplayName(raw.sourceName),
    sourceName: raw.sourceName,
    group: override?.group || inferred.group,
    subGroup: inferred.subGroup,
    color: inferred.color,
    location:
      override?.location ||
      `Part of the ${inferred.group} (${inferred.subGroup}) in the human skeletal system.`,
    anatomicalRelationships: override?.relationships || [
      `Articulates within the ${inferred.group} skeletal framework.`,
      'Anchored by regional joint capsules, ligaments, and periosteal muscle attachments.',
    ],
    mainFunction:
      override?.functionText ||
      (isCartilage
        ? 'Provides compliant shock absorption and flexible articulation within the axial skeleton.'
        : 'Provides structural support, organ protection, mineral reservoir homeostasis, and mechanical leverage for movement.'),
    clinicalCorrelations: override?.clinical || [
      `Evaluate structural continuity on orthogonal radiographs when localizing trauma in the ${inferred.group.toLowerCase()}.`,
    ],
    relatedTopicIds: ['msk-axial-appendicular-skeleton'],
    relatedAnimationIds: [],
    relatedQuizQuestionIds: ['mcq-msk-clavicle-1', 'mcq-msk-femur-1'],
    limitationsNote:
      'BodyParts3D 3.0 simplified surface mesh; ligaments, periosteum, and bone marrow are omitted.',
    references: SKELETON_REFS,
  };
});

export const SKELETON_STRUCTURES_BY_ID: Record<string, AnatomicalStructureMetadata> =
  Object.fromEntries(SKELETON_STRUCTURES.map((s) => [s.id, s]));
