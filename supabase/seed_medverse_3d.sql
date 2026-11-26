-- ==============================================================================
-- MedVerse 3D — Reproducible Seed Data (NMC CBME Curriculum v1 + Core 3D Assets)
-- ==============================================================================

insert into public.curriculum_versions (id, name, authority, is_active)
values ('nmc-cbme-2024', 'NMC Competency-Based Medical Education (MBBS)', 'National Medical Commission (India)', true)
on conflict (id) do update set name = excluded.name, is_active = excluded.is_active;

insert into public.subjects (id, curriculum_version_id, phase_id, slug, title, short_code, department_type, nmc_code_range, description, display_order)
values
  ('mbbs-anatomy', 'nmc-cbme-2024', 'phase-1-preclinical', 'anatomy', 'Human Anatomy', 'AN', 'preclinical', 'AN1.1–AN82.1', 'Gross anatomy, neuroanatomy, histology, and embryology.', 1),
  ('mbbs-physiology', 'nmc-cbme-2024', 'phase-1-preclinical', 'physiology', 'Human Physiology', 'PY', 'preclinical', 'PY1.1–PY11.14', 'Organ-system homeostatic mechanisms and bedside physiology.', 2),
  ('mbbs-biochemistry', 'nmc-cbme-2024', 'phase-1-preclinical', 'biochemistry', 'Biochemistry', 'BI', 'preclinical', 'BI1.1–BI11.24', 'Metabolic pathways, enzymology, molecular genetics, and nutrition.', 3),
  ('mbbs-pathology', 'nmc-cbme-2024', 'phase-2-paraclinical', 'pathology', 'Pathology', 'PA', 'paraclinical', 'PA1.1–PA36.1', 'Cell injury, inflammation, neoplasia, and systemic pathology.', 4),
  ('mbbs-pharmacology', 'nmc-cbme-2024', 'phase-2-paraclinical', 'pharmacology', 'Pharmacology', 'PH', 'paraclinical', 'PH1.1–PH5.7', 'Pharmacokinetics, pharmacodynamics, and rational therapeutics.', 5),
  ('mbbs-microbiology', 'nmc-cbme-2024', 'phase-2-paraclinical', 'microbiology', 'Microbiology', 'MI', 'paraclinical', 'MI1.1–MI8.16', 'Bacteriology, virology, mycology, parasitology, and immunology.', 6),
  ('mbbs-medicine', 'nmc-cbme-2024', 'phase-3-part2-clinical', 'general-medicine', 'General Medicine', 'IM', 'clinical', 'IM1.1–IM26.43', 'Internal medicine diagnosis and evidence-based management.', 9)
on conflict (id) do update set title = excluded.title, description = excluded.description;

insert into public.anatomy_assets (id, title, kind, public_url, source, license, license_url, attribution_text, file_format, file_size_bytes, limitations_note, medical_review_status)
values
  (
    'heart-bp3d',
    'Human Heart (Segmented Chambers, Walls, Great Vessels & Coronaries)',
    'glb_anatomical',
    '/models/medverse/heart.glb',
    'BodyParts3D 4.0 (DBCLS) packaged via organui/heart-3d',
    'CC BY 4.0',
    'https://creativecommons.org/licenses/by/4.0/',
    'BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International',
    'GLB',
    2524400,
    'Ventricular myocardium is combined in one mesh (ventricular-wall); cavity meshes represent interior spaces; cardiac valves are not separate meshes in this asset.',
    'published'
  ),
  (
    'skeleton-bp3d',
    'Human Skeleton (242 Bone, Cartilage & Disc Structures)',
    'glb_anatomical',
    '/models/medverse/skeleton.glb',
    'BodyParts3D 3.0 (DBCLS) packaged via organui/skeleton-3d',
    'CC BY-SA 2.1 Japan',
    'https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en',
    'BodyParts3D, © The Database Center for Life Science licensed under CC BY-SA 2.1 Japan',
    'GLB',
    5221116,
    'Simplified adult male reference surface meshes; teeth are not modeled separately on the mandible.',
    'published'
  )
on conflict (id) do update set public_url = excluded.public_url, medical_review_status = excluded.medical_review_status;

insert into public.modules (id, subject_id, title, organ_system, description, display_order)
values
  ('mod-cv-anatomy-phys', 'mbbs-physiology', 'Cardiovascular Anatomy & Physiology', 'Cardiovascular System', 'Heart chambers, blood-flow circuit, cardiac cycle, and conduction system.', 1),
  ('mod-msk-skeleton', 'mbbs-anatomy', 'Osteology & Musculoskeletal System', 'Musculoskeletal System', 'Axial and appendicular skeleton landmarks and sarcomere contraction.', 1)
on conflict (id) do update set title = excluded.title;

insert into public.topics (id, module_id, subject_id, phase_id, title, subtitle, status, difficulty, estimated_minutes, asset_id, focus_structure_ids)
values
  ('cv-heart-blood-flow', 'mod-cv-anatomy-phys', 'mbbs-physiology', 'phase-1-preclinical', 'Blood Flow Through Heart Chambers & Great Vessels', 'Pulmonary & systemic circuit mapped on 3D heart anatomy', 'published', 'Foundational', 20, 'heart-bp3d', '["right-atrium","right-ventricle","pulmonary-trunk","left-atrium","left-ventricle","ascending-aorta"]'::jsonb),
  ('cv-cardiac-cycle-conduction', 'mod-cv-anatomy-phys', 'mbbs-physiology', 'phase-1-preclinical', 'Cardiac Cycle & Conduction System', 'SA node to Purkinje depolarization synchronized with systole/diastole', 'published', 'Intermediate', 25, 'heart-bp3d', '["right-atrium","ventricular-wall","left-ventricle","left-coronary","right-coronary"]'::jsonb),
  ('msk-axial-appendicular-skeleton', 'mod-msk-skeleton', 'mbbs-anatomy', 'phase-1-preclinical', 'Axial & Appendicular Skeleton Overview', '242 interactive bones across skull, spine, thorax, pelvis, and limbs', 'published', 'Foundational', 30, 'skeleton-bp3d', '["frontal-bone","clavicle","sternum","femur"]'::jsonb)
on conflict (id) do update set status = excluded.status, asset_id = excluded.asset_id;
