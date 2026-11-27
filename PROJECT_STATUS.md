# MedVerse 3D — Project & Milestone Status

Last Updated: 2026-11-26  
Platform Wing: Doctor (MBBS) inside AzurLearn (`Engineering` wing preserved intact)

## 1. Milestone Summary

| Milestone | Scope | Status | Notes |
| --- | --- | --- | --- |
| **Milestone 1 — Foundation & NMC Curriculum** | Design system, `/doctor/*` routes, Phase → Subject → Module → Topic schema, honest content statuses, Supabase config | **Completed** | Covers NMC CBME Preclinical, Paraclinical, and Clinical phases; only authored topics marked `published`. |
| **Milestone 2 — Real Interactive 3D Viewer (VOKA-Style Workstation)** | Three.js + R3F + Drei viewer with real GLB assets, orbit/zoom/pan, reset, fullscreen, selection, hover, labels, hide/isolate/restore, X-Ray mode, 3D surface pinning, 2D drawing + PNG export, Clinical/Latin/FMA terminology toggle, pathology territory overlays, collections, `/doctor/embed`, opacity, layers, clipping plane, keyboard alt | **Completed (7 Real Organ GLBs)** | Uses MIT/BodyParts3D `heart.glb` (11), `skeleton.glb` (242), `brain.glb` (19), `lungs.glb` (20), `kidneys.glb` (6), `liver.glb` (7), and `eye.glb` (21) — `326` selectable meshes mapped 1:1. |
| **Milestone 3 — Complete Cardiovascular Module** | Synchronized 3D heart + blood flow & cardiac cycle + referenced short notes (`60s` / `2m` / `Detailed`) + MCQs + flashcards + clinical correlations | **Completed** | Implemented via shared topic IDs (`cv-heart-blood-flow`, `cv-cardiac-cycle-conduction`, `msk-axial-appendicular-skeleton`, plus respiratory/renal/neuro/molecular topics) & synced Subject Short Notes drawer. |
| **Milestone 4 — Cinematic Scientific Animation Engine** | Deterministic single-clock timeline controller (play/pause, scrub, restart, 0.5x/1x/2x, prev/next, step-by-step, captions, camera keyframes, reduced motion) | **Completed** | Real `heart.glb`-coupled Cardiovascular Blood Flow & Conduction, real `skeleton.glb`-coupled Upper-Limb Elbow Kinematics (`anim-upper-limb-kinematics`), plus `5` labeled 3D educational schematics. |
| **Milestone 5 — Learning Platform & Admin Studio** | Real progress tracking, bookmarks, SM-2 flashcards, 3D surface pins, collections, structure-ID & MCQ quizzes, synthetic clinical cases, SQL schema + RLS, Admin Studio | **Completed** | Persists to Supabase when migrated & authenticated, with localStorage fallback. Admin Studio enforces server-side owner/admin role checks. |
| **Milestone 6 — Full MBBS Curriculum Expansion** | Authoring & medical review of remaining topics across all 21 NMC subjects + remaining specialty GLBs (ear, full vascular/muscular trees, commercial pathology meshes) | **In Progress / Pending Content** | Full curriculum tree is modeled with explicit `published`, `in_development`, and `planned` statuses. |
| **Milestone 7 — Production Verification** | TypeScript, integrity tests, MedVerse unit/schema tests, production Next.js build, headless Chrome WebGL inspection | **Completed** | Verified (`npx tsc --noEmit`, `npm run test:medverse`, `npm run test:integrity`, `node tests/verify.js`, `npm run build`, and live headless Chrome WebGL on all `/doctor/*` routes with zero runtime/console errors). |

---

## 2. Asset Provenance & Honest Limitations

### Bundled Licensed 3D GLB Models (`public/models/medverse/`)
1. **`heart.glb` (2.52 MB, 11 selectable meshes)**
   - **Source:** `organui/heart-3d` (MIT wrapper) using **BodyParts3D 4.0** (DBCLS, `isa_BP3D_4.0_obj_99.zip`).
   - **License:** CC BY 4.0 (`https://creativecommons.org/licenses/by/4.0/`). Credit: *BodyParts3D, © The Database Center for Life Science licensed under CC Attribution 4.0 International*.
   - **Known Limitation (Disclosed in UI):** As documented in `heart-ATTRIBUTION.md`, the left and right ventricular myocardium share a single `ventricular-wall` mesh (`FMA13884`), while `right-ventricle` and `left-ventricle` represent chamber cavity surfaces. Heart valves are not separate meshes in this dataset; valve mechanics in animations are represented by synchronized directional flow markers and captions.
2. **`skeleton.glb` (5.22 MB, 242 selectable meshes)**
   - **Source:** `organui/skeleton-3d` (MIT wrapper) using **BodyParts3D 3.0** (DBCLS).
   - **License:** CC BY-SA 2.1 Japan (`https://creativecommons.org/licenses/by-sa/2.1/jp/deed.en`). Credit: *BodyParts3D, © The Database Center for Life Science*.
   - **Known Limitation:** Reference adult male bone, cartilage, and intervertebral disc surface meshes simplified for web delivery; teeth are not modeled separately on the mandible.

3. **`brain.glb` (5.87 MB, 19 selectable meshes)** — `organui/brain-3d` (MIT wrapper), BodyParts3D 4.0 (CC BY 4.0). Cerebral lobes, brainstem, cerebellum, hippocampi & ventricular system.
4. **`lungs.glb` (3.90 MB, 20 selectable meshes)** — `organui/lungs-3d` (MIT wrapper), BodyParts3D 4.3 (CC BY-SA 2.1 Japan). Trachea, main bronchial trees & 17 bronchopulmonary segments.
5. **`kidneys.glb` (380 KB, 6 selectable meshes)** — `organui/kidneys-3d` (MIT wrapper), BodyParts3D 4.0 (CC BY 4.0). Bilateral kidneys, ureters & renal arteries.
6. **`liver.glb` (5.58 MB, 7 selectable meshes)** — `organui/liver-3d` (MIT wrapper), BodyParts3D 4.0 (CC BY 4.0). Liver parenchyma, gallbladder, portal vein, hepatic veins, hepatic artery, hepatic & cystic ducts.
7. **`eye.glb` (3.95 MB, 21 selectable meshes)** — `organui/eye-3d` (MIT wrapper), BodyParts3D 4.3 (CC BY-SA 2.1 Japan). Cornea, sclera, choroid, retina, lens, iris, vitreous, 6 extraocular muscles, optic nerve & orbital adnexa.

### Educational Physiological Schematics (Explicitly Labeled)
For physiological mechanisms lacking segmented cadaveric GLBs in the current bundle (Respiratory Diaphragm/Alveolus, Renal Nephron, Axon Action Potential & Synapse, Sarcomere Sliding-Filament, DNA Replication Fork), the animation engine renders articulated, timeline-driven Three.js 3D schematics explicitly labeled **"Educational Physiological Schematic"** rather than misrepresenting them as patient scans or cadaveric organs.

---

## 3. Curriculum Coverage Ledger

- **Published & Interactive (`published`):**
  - `cv-heart-blood-flow` — Blood Flow Through Heart Chambers & Great Vessels (`heart.glb` + 3D blood-flow animation + notes + MCQs + flashcards)
  - `cv-cardiac-cycle-conduction` — Cardiac Cycle, Conduction System & ECG Correlation (`heart.glb` + conduction/systole animation + notes + MCQs + flashcards)
  - `msk-axial-appendicular-skeleton` — Axial & Appendicular Skeleton Overview (`skeleton.glb` 242 bones + notes + MCQs + flashcards)
  - `resp-mechanics-gas-exchange` — Mechanics of Breathing & Alveolar Gas Exchange (3D schematic animation + notes + MCQs + flashcards)
  - `renal-nephron-filtration` — Glomerular Filtration & Nephron Transport (3D schematic animation + notes + MCQs + flashcards)
  - `neuro-action-potential-synapse` — Action Potential & Synaptic Transmission (3D schematic animation + notes + MCQs + flashcards)
  - `msk-sarcomere-contraction` — Skeletal Muscle Sarcomere Sliding-Filament Mechanism (3D schematic animation + notes + MCQs + flashcards)
  - `biochem-dna-replication` — Semi-Conservative DNA Replication Fork (3D schematic animation + notes + MCQs + flashcards)
- **Pending Authoring & Medical Review (`in_development` / `planned`):**
  - Remaining modules across Anatomy, Physiology, Biochemistry, Pathology, Pharmacology, Microbiology, Forensic Medicine, Community Medicine, General Medicine, General Surgery, OB-GYN, Pediatrics, Ophthalmology, ENT, Orthopaedics, Dermatology, Psychiatry, Anaesthesiology, Radiodiagnosis, Respiratory Medicine, and Emergency Medicine.
- **Pending Licensed 3D Organ GLBs (`blocked` until licensed assets sourced):**
  - Ear, whole-body arterial/venous/muscular trees, embryology/microanatomy, and custom sculpted diseased pathology meshes (currently represented via healthy-vs-lesion clinical territory overlays).

---

## 4. Verification Summary & Pending Operational Steps

- **Static & Type Safety:** `npx tsc --noEmit` exited `0`; production `npm run build` exited `0` (all `/doctor/*`, `/doctor/embed`, `/engineering`, `/` and `/api/medverse/*` routes built cleanly).
- **Automated Suites:**
  - `npm run test:medverse` (`tests/medverse-verify.js`): Passed all 6 checks (`52` required files/assets present, 1:1 mesh metadata mapping across all `7` GLB organs totaling `326` structures plus pathology territories, `21` subjects / `29` topics / `8` published topics / `27` MCQs / `25` flashcards, `8` monotonic timeline animations, Zod schemas + SM-2 scheduler + zero-attempt `null` accuracy math, and RLS + Studio 401/403 checks).
  - `npm run test:integrity` & `node tests/verify.js`: Passed with zero broken engineering/curriculum links (`131` modules, `417` lessons preserved intact).
- **Live Headless Chrome WebGL Inspection (`http://127.0.0.1:3097` & `3098`):**
  - Verified `/doctor/anatomy` across all `7` GLB organs (`Heart 11/11`, `Skeleton 242/242`, `Brain 19/19`, `Lungs 20/20`, `Kidneys 6/6`, `Liver 7/7`, `Eye 21/21`), X-Ray mode, Latin/FMA terminology switching, Draw Mode, Pathology Territory overlays, Personal Collections saving, `/doctor/animations?anim=anim-upper-limb-kinematics` elbow hinge kinematics, `/doctor/embed`, `/doctor/topics/cv-heart-blood-flow`, `/doctor/curriculum`, `/doctor/cases`, `/doctor/quizzes`, and `/doctor/studio` (signed-out `401` gate) with `0` runtime exceptions and `0` console errors.
- **Pending Live Database Setup:**
  - Run `supabase/migrations/20261126_medverse_3d_schema.sql` and `supabase/seed_medverse_3d.sql` in the target Supabase SQL Editor so authenticated cloud progress sync and Admin Content Studio writes persist to PostgreSQL in production (until then, progress gracefully persists to `localStorage` and Studio safely falls back with an explicit persistence status).
