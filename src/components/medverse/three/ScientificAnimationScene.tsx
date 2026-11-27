'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import {
  Box3,
  CatmullRomCurve3,
  Color,
  Group,
  Mesh,
  MeshStandardMaterial,
  Vector3,
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { AnimationStepSpec, ScientificAnimationSpec } from '@/types/medverse';
import { disposeObject3D } from './threeUtils';

export interface TimelinePlaybackState {
  progress: number; // 0..1 deterministic timeline clock
  isPlaying: boolean;
  speed: 0.5 | 1 | 2;
  stepByStep: boolean;
}

interface ScientificAnimationSceneProps {
  animation: ScientificAnimationSpec;
  playbackRef: React.MutableRefObject<TimelinePlaybackState>;
  activeStep: AnimationStepSpec;
  followCamera: boolean;
  showLabels: boolean;
  reducedMotion: boolean;
  onClockTick: (progress: number, reachedEnd: boolean) => void;
}

// =========================================================================
// SHARED CAMERA & DETERMINISTIC CLOCK DRIVER
// =========================================================================

const TimelineClockAndCamera: React.FC<{
  animation: ScientificAnimationSpec;
  playbackRef: React.MutableRefObject<TimelinePlaybackState>;
  activeStep: AnimationStepSpec;
  followCamera: boolean;
  reducedMotion: boolean;
  onClockTick: (progress: number, reachedEnd: boolean) => void;
}> = ({ animation, playbackRef, activeStep, followCamera, reducedMotion, onClockTick }) => {
  const orbitRef = useRef<OrbitControlsImpl | null>(null);
  const { camera } = useThree();
  const desiredPos = useMemo(() => new Vector3(...activeStep.cameraPosition), [activeStep]);
  const desiredTarget = useMemo(() => new Vector3(...activeStep.cameraTarget), [activeStep]);
  const uiThrottleRef = useRef(0);

  useEffect(() => {
    if (!followCamera || !orbitRef.current) return;
    if (reducedMotion) {
      camera.position.copy(desiredPos);
      orbitRef.current.target.copy(desiredTarget);
      orbitRef.current.update();
    }
  }, [desiredPos, desiredTarget, followCamera, reducedMotion, camera]);

  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.1);
    const state = playbackRef.current;

    if (state.isPlaying) {
      const prevStep =
        animation.steps.find(
          (s) => state.progress >= s.startProgress && state.progress <= s.endProgress
        ) || animation.steps[0];

      const stepDelta = (dt * state.speed) / Math.max(4, animation.durationSeconds);
      let next = state.progress + stepDelta;
      let hitEnd = false;

      if (state.stepByStep && prevStep && next >= prevStep.endProgress) {
        next = prevStep.endProgress;
        state.isPlaying = false;
        hitEnd = next >= 1;
        state.progress = next;
        onClockTick(next, hitEnd);
      } else {
        if (next >= 1) {
          next = 1;
          state.isPlaying = false;
          hitEnd = true;
        }
        state.progress = next;
        uiThrottleRef.current += dt;
        if (hitEnd || uiThrottleRef.current >= 0.04) {
          uiThrottleRef.current = 0;
          onClockTick(next, hitEnd);
        }
      }
    }

    if (followCamera && !reducedMotion && orbitRef.current) {
      camera.position.lerp(desiredPos, Math.min(1, dt * 3.2));
      orbitRef.current.target.lerp(desiredTarget, Math.min(1, dt * 3.2));
      orbitRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={orbitRef}
      makeDefault
      enableDamping={!reducedMotion}
      dampingFactor={0.08}
      minDistance={1.4}
      maxDistance={12}
    />
  );
};

// =========================================================================
// 1. REAL GLB HEART BLOOD-FLOW & CONDUCTION SCENE
// =========================================================================

const HeartAnimationModel: React.FC<{
  animation: ScientificAnimationSpec;
  playbackRef: React.MutableRefObject<TimelinePlaybackState>;
  activeStep: AnimationStepSpec;
}> = ({ animation, playbackRef, activeStep }) => {
  const [heartModel, setHeartModel] = React.useState<Group | null>(null);
  const groupRef = useRef<Group>(null);
  const venousDotsRef = useRef<Array<Mesh | null>>([]);
  const arterialDotsRef = useRef<Array<Mesh | null>>([]);
  const conductionPulseRef = useRef<Mesh>(null);

  const venousCurve = useMemo(
    () =>
      new CatmullRomCurve3([
        new Vector3(0.55, 1.15, 0.05), // SVC
        new Vector3(0.5, 0.35, 0.15), // Right Atrium
        new Vector3(0.25, -0.35, 0.3), // Right Ventricle
        new Vector3(-0.08, 0.25, 0.42), // RV outflow
        new Vector3(-0.22, 0.85, 0.1), // Pulmonary Trunk
      ]),
    []
  );

  const arterialCurve = useMemo(
    () =>
      new CatmullRomCurve3([
        new Vector3(-0.35, 0.32, -0.42), // Left Atrium
        new Vector3(-0.38, -0.38, -0.05), // Left Ventricle apex
        new Vector3(-0.12, 0.15, 0.08), // LV outflow
        new Vector3(0.05, 0.72, 0.05), // Ascending Aorta
        new Vector3(-0.15, 1.08, -0.22), // Aortic Arch
      ]),
    []
  );

  useEffect(() => {
    const abort = new AbortController();
    let loaded: Group | null = null;
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch('/models/medverse/heart.glb', { signal: abort.signal });
        if (!res.ok) return;
        const buf = await res.arrayBuffer();
        const loader = new GLTFLoader();
        const gltf = await loader.parseAsync(buf, '');
        if (cancelled) {
          disposeObject3D(gltf.scene);
          return;
        }
        gltf.scene.traverse((obj) => {
          if (obj instanceof Mesh) {
            const srcMat = Array.isArray(obj.material) ? obj.material[0] : obj.material;
            obj.material = srcMat
              ? srcMat.clone()
              : new MeshStandardMaterial({ color: '#b86661' });
          }
        });
        loaded = gltf.scene;
        setHeartModel(gltf.scene);
      } catch {}
    }

    void load();
    return () => {
      cancelled = true;
      abort.abort();
      disposeObject3D(loaded);
    };
  }, []);

  useEffect(() => {
    if (!heartModel) return;
    const activeHighlights = new Set(activeStep.highlightStructureIds);
    heartModel.traverse((obj) => {
      if (!(obj instanceof Mesh)) return;
      const id = (obj.userData?.structureId as string) || obj.name;
      const mat = obj.material as MeshStandardMaterial;
      const isHighlighted = activeHighlights.has(id);
      const isWall = id === 'ventricular-wall';

      if (isHighlighted) {
        mat.emissive.set('#14b8a6');
        mat.emissiveIntensity = 0.42;
      } else {
        mat.emissive.set('#000000');
        mat.emissiveIntensity = 0;
      }
      // Make ventricular wall translucent so internal blood flow boluses & chambers remain visible
      const opacity = isWall ? (isHighlighted ? 0.48 : 0.25) : isHighlighted ? 1.0 : 0.45;
      mat.transparent = opacity < 0.99;
      mat.opacity = opacity;
      mat.depthWrite = opacity >= 0.95;
      mat.needsUpdate = true;
    });
  }, [heartModel, activeStep]);

  useFrame(() => {
    const p = playbackRef.current.progress;
    // Realistic beat pulsation derived directly from timeline progress (6 cycles across clip)
    const phase = (p * 6) % 1;
    const systolePulse = phase > 0.25 && phase < 0.58 ? Math.sin(((phase - 0.25) / 0.33) * Math.PI) : 0;
    if (groupRef.current) {
      const s = 1 - systolePulse * 0.035;
      groupRef.current.scale.set(s, 1 + systolePulse * 0.02, s);
    }

    if (animation.renderKind === 'heart_blood_flow') {
      venousDotsRef.current.forEach((dot, idx) => {
        if (!dot) return;
        const u = Math.max(0, Math.min(1, p * 1.85 - idx * 0.1));
        dot.visible = p <= 0.62;
        dot.position.copy(venousCurve.getPointAt(u % 1));
      });
      arterialDotsRef.current.forEach((dot, idx) => {
        if (!dot) return;
        const u = Math.max(0, Math.min(1, (p - 0.5) * 2.0 - idx * 0.1));
        dot.visible = p >= 0.5;
        dot.position.copy(arterialCurve.getPointAt(Math.max(0, Math.min(1, u))));
      });
    } else if (conductionPulseRef.current) {
      const conductionNodes = [
        new Vector3(0.58, 0.52, 0.2), // SA node
        new Vector3(0.18, 0.12, 0.15), // AV node
        new Vector3(-0.08, -0.25, 0.22), // Bundle / septum
        new Vector3(-0.42, -0.42, 0.1), // Apex Purkinje
      ];
      const idx = Math.min(2, Math.floor(p * 3));
      const localT = (p * 3) % 1;
      conductionPulseRef.current.position.lerpVectors(
        conductionNodes[idx],
        conductionNodes[idx + 1],
        localT
      );
    }
  });

  if (!heartModel) return null;

  return (
    <group ref={groupRef}>
      <primitive object={heartModel} />
      {animation.renderKind === 'heart_blood_flow' ? (
        <>
          {[0, 1, 2, 3].map((i) => (
            <mesh
              key={`v-${i}`}
              ref={(el) => {
                venousDotsRef.current[i] = el;
              }}
            >
              <sphereGeometry args={[0.055, 16, 16]} />
              <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={1.4} />
            </mesh>
          ))}
          {[0, 1, 2, 3].map((i) => (
            <mesh
              key={`a-${i}`}
              ref={(el) => {
                arterialDotsRef.current[i] = el;
              }}
            >
              <sphereGeometry args={[0.055, 16, 16]} />
              <meshStandardMaterial color="#fb7185" emissive="#e11d48" emissiveIntensity={1.4} />
            </mesh>
          ))}
        </>
      ) : (
        <mesh ref={conductionPulseRef}>
          <sphereGeometry args={[0.08, 18, 18]} />
          <meshStandardMaterial color="#fde047" emissive="#f59e0b" emissiveIntensity={1.8} />
        </mesh>
      )}
    </group>
  );
};

// =========================================================================
// 2. MECHANISTIC 3D SCHEMATIC SCENES (DRIVEN BY SINGLE DETERMINISTIC CLOCK)
// =========================================================================

const RespiratorySchematicScene: React.FC<{
  playbackRef: React.MutableRefObject<TimelinePlaybackState>;
}> = ({ playbackRef }) => {
  const diaphragmRef = useRef<Mesh>(null);
  const leftLungRef = useRef<Mesh>(null);
  const rightLungRef = useRef<Mesh>(null);
  const o2DotRef = useRef<Mesh>(null);
  const co2DotRef = useRef<Mesh>(null);

  useFrame(() => {
    const p = playbackRef.current.progress;
    // Expansion peaks around p = 0.55
    const inhale = Math.max(0, Math.sin(Math.min(1, p / 0.85) * Math.PI));
    if (diaphragmRef.current) {
      diaphragmRef.current.position.y = -0.62 - inhale * 0.34;
    }
    if (leftLungRef.current && rightLungRef.current) {
      const s = 1 + inhale * 0.18;
      leftLungRef.current.scale.set(s, 1 + inhale * 0.14, s);
      rightLungRef.current.scale.set(s, 1 + inhale * 0.14, s);
    }
    if (o2DotRef.current && co2DotRef.current) {
      const gasPhase = Math.max(0, Math.min(1, (p - 0.5) / 0.35));
      o2DotRef.current.visible = p >= 0.45;
      co2DotRef.current.visible = p >= 0.45;
      o2DotRef.current.position.set(0.35 + gasPhase * 0.45, 0.15 - gasPhase * 0.15, 0.65);
      co2DotRef.current.position.set(0.8 - gasPhase * 0.45, 0.05 + gasPhase * 0.25, 0.65);
    }
  });

  return (
    <group>
      {/* Trachea */}
      <mesh position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.85, 20]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.45} />
      </mesh>
      {/* Left & Right Lung Lobes (Schematic) */}
      <mesh ref={rightLungRef} position={[-0.65, 0.22, 0]}>
        <capsuleGeometry args={[0.42, 0.72, 12, 24]} />
        <meshStandardMaterial color="#fb7185" transparent opacity={0.62} roughness={0.45} />
      </mesh>
      <mesh ref={leftLungRef} position={[0.65, 0.22, 0]}>
        <capsuleGeometry args={[0.4, 0.68, 12, 24]} />
        <meshStandardMaterial color="#fb7185" transparent opacity={0.62} roughness={0.45} />
      </mesh>
      {/* Diaphragm Dome */}
      <mesh ref={diaphragmRef} position={[0, -0.62, 0]} rotation={[0.1, 0, 0]}>
        <cylinderGeometry args={[1.15, 1.25, 0.14, 32]} />
        <meshStandardMaterial color="#14b8a6" roughness={0.4} />
      </mesh>
      {/* Gas Diffusion Markers */}
      <mesh ref={o2DotRef} position={[0.5, 0.15, 0.65]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#f43f5e" emissive="#e11d48" emissiveIntensity={1.2} />
      </mesh>
      <mesh ref={co2DotRef} position={[0.5, 0.15, 0.65]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
};

const RenalNephronSchematicScene: React.FC<{
  playbackRef: React.MutableRefObject<TimelinePlaybackState>;
}> = ({ playbackRef }) => {
  const filtrateRef = useRef<Mesh>(null);
  const nephronCurve = useMemo(
    () =>
      new CatmullRomCurve3([
        new Vector3(-1.35, 0.72, 0), // Glomerulus / Bowman's
        new Vector3(-0.55, 0.65, 0.15), // PCT
        new Vector3(-0.25, -0.1, 0), // Descending limb
        new Vector3(0.05, -0.95, 0), // Loop hairpin
        new Vector3(0.35, -0.1, 0), // Thick ascending limb (NKCC2)
        new Vector3(0.75, 0.58, -0.1), // DCT
        new Vector3(1.25, 0.45, 0), // Collecting duct top
        new Vector3(1.25, -0.95, 0), // Collecting duct bottom
      ]),
    []
  );

  const tubeGeometryArgs = useMemo(() => [nephronCurve, 80, 0.09, 14, false] as const, [nephronCurve]);

  useFrame(() => {
    const p = playbackRef.current.progress;
    if (filtrateRef.current) {
      filtrateRef.current.position.copy(nephronCurve.getPointAt(Math.min(1, Math.max(0, p))));
    }
  });

  return (
    <group>
      {/* Glomerular Capillary Tuft */}
      <mesh position={[-1.4, 0.75, 0]}>
        <sphereGeometry args={[0.26, 24, 24]} />
        <meshStandardMaterial color="#f43f5e" roughness={0.35} />
      </mesh>
      {/* Bowman's Capsule Cup */}
      <mesh position={[-1.35, 0.72, 0]}>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.35} />
      </mesh>
      {/* Nephron Tubule Path */}
      <mesh>
        <tubeGeometry args={[...tubeGeometryArgs]} />
        <meshStandardMaterial color="#eab308" transparent opacity={0.55} roughness={0.4} />
      </mesh>
      {/* Ultrafiltrate Bolus */}
      <mesh ref={filtrateRef}>
        <sphereGeometry args={[0.14, 18, 18]} />
        <meshStandardMaterial color="#22d3ee" emissive="#06b6d4" emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
};

const NeuroSynapseSchematicScene: React.FC<{
  playbackRef: React.MutableRefObject<TimelinePlaybackState>;
}> = ({ playbackRef }) => {
  const pulseRef = useRef<Mesh>(null);
  const vesicleRef = useRef<Mesh>(null);

  useFrame(() => {
    const p = playbackRef.current.progress;
    if (pulseRef.current) {
      const x = -1.6 + Math.min(1, p / 0.65) * 2.4;
      pulseRef.current.position.set(x, 0, 0);
      pulseRef.current.visible = p <= 0.7;
    }
    if (vesicleRef.current) {
      const t = Math.max(0, Math.min(1, (p - 0.6) / 0.35));
      vesicleRef.current.visible = p >= 0.58;
      vesicleRef.current.position.set(0.9 + t * 0.45, 0, 0);
    }
  });

  return (
    <group>
      {/* Axon Cylinder */}
      <mesh position={[-0.45, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.14, 0.14, 2.4, 20]} />
        <meshStandardMaterial color="#64748b" />
      </mesh>
      {/* Myelin Sheath Segments */}
      {[-1.25, -0.45, 0.35].map((x) => (
        <mesh key={x} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.25, 0.25, 0.55, 20]} />
          <meshStandardMaterial color="#2dd4bf" transparent opacity={0.75} />
        </mesh>
      ))}
      {/* Presynaptic Bouton */}
      <mesh position={[0.9, 0, 0]}>
        <sphereGeometry args={[0.34, 24, 24]} />
        <meshStandardMaterial color="#818cf8" transparent opacity={0.65} />
      </mesh>
      {/* Postsynaptic Spine */}
      <mesh position={[1.55, 0, 0]}>
        <boxGeometry args={[0.32, 0.72, 0.55]} />
        <meshStandardMaterial color="#38bdf8" />
      </mesh>
      {/* Action Potential Wave */}
      <mesh ref={pulseRef}>
        <sphereGeometry args={[0.2, 18, 18]} />
        <meshStandardMaterial color="#fde047" emissive="#f59e0b" emissiveIntensity={1.6} />
      </mesh>
      {/* Released Neurotransmitter Vesicle */}
      <mesh ref={vesicleRef} position={[1.1, 0, 0]}>
        <sphereGeometry args={[0.11, 16, 16]} />
        <meshStandardMaterial color="#f472b6" emissive="#db2777" emissiveIntensity={1.4} />
      </mesh>
    </group>
  );
};

const SarcomereSchematicScene: React.FC<{
  playbackRef: React.MutableRefObject<TimelinePlaybackState>;
}> = ({ playbackRef }) => {
  const leftGroupRef = useRef<Group>(null);
  const rightGroupRef = useRef<Group>(null);

  useFrame(() => {
    const p = playbackRef.current.progress;
    // Contraction peaks around p = 0.7
    const contract = Math.max(0, Math.sin(Math.min(1, p / 0.9) * Math.PI));
    const shift = contract * 0.45;
    if (leftGroupRef.current && rightGroupRef.current) {
      leftGroupRef.current.position.x = -1.35 + shift;
      rightGroupRef.current.position.x = 1.35 - shift;
    }
  });

  return (
    <group>
      {/* Central Thick Myosin Filaments (Constant A-Band) */}
      {[-0.35, 0, 0.35].map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.07, 0.07, 1.5, 16]} />
          <meshStandardMaterial color="#f43f5e" />
        </mesh>
      ))}
      {/* Left Z-disc + Actin Thin Filaments */}
      <group ref={leftGroupRef} position={[-1.35, 0, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.1, 1.25, 0.4]} />
          <meshStandardMaterial color="#38bdf8" />
        </mesh>
        {[-0.48, -0.18, 0.18, 0.48].map((y) => (
          <mesh key={y} position={[0.55, y, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.035, 0.035, 1.1, 12]} />
            <meshStandardMaterial color="#2dd4bf" />
          </mesh>
        ))}
      </group>
      {/* Right Z-disc + Actin Thin Filaments */}
      <group ref={rightGroupRef} position={[1.35, 0, 0]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.1, 1.25, 0.4]} />
          <meshStandardMaterial color="#38bdf8" />
        </mesh>
        {[-0.48, -0.18, 0.18, 0.48].map((y) => (
          <mesh key={y} position={[-0.55, y, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.035, 0.035, 1.1, 12]} />
            <meshStandardMaterial color="#2dd4bf" />
          </mesh>
        ))}
      </group>
    </group>
  );
};

const DNAReplicationSchematicScene: React.FC<{
  playbackRef: React.MutableRefObject<TimelinePlaybackState>;
}> = ({ playbackRef }) => {
  const helicaseRef = useRef<Mesh>(null);
  const topArmRef = useRef<Mesh>(null);
  const botArmRef = useRef<Mesh>(null);

  useFrame(() => {
    const p = playbackRef.current.progress;
    if (helicaseRef.current) {
      helicaseRef.current.position.x = -0.9 + p * 1.6;
      helicaseRef.current.rotation.x = p * Math.PI * 6;
    }
    if (topArmRef.current && botArmRef.current) {
      const openAngle = 0.18 + p * 0.28;
      topArmRef.current.rotation.z = openAngle;
      botArmRef.current.rotation.z = -openAngle;
    }
  });

  return (
    <group>
      {/* Parental Double Helix Stem */}
      <mesh position={[-1.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.12, 0.12, 1.1, 16]} />
        <meshStandardMaterial color="#6366f1" />
      </mesh>
      {/* Leading & Lagging Separated Arms */}
      <mesh ref={topArmRef} position={[0.45, 0.35, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.075, 0.075, 2.0, 14]} />
        <meshStandardMaterial color="#2dd4bf" />
      </mesh>
      <mesh ref={botArmRef} position={[0.45, -0.35, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.075, 0.075, 2.0, 14]} />
        <meshStandardMaterial color="#38bdf8" />
      </mesh>
      {/* Helicase Unwinding Ring */}
      <mesh ref={helicaseRef} position={[-0.4, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.25, 0.07, 14, 28]} />
        <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
};

const SkeletonKinematicsModel: React.FC<{
  playbackRef: React.MutableRefObject<TimelinePlaybackState>;
  activeStep: AnimationStepSpec;
}> = ({ playbackRef, activeStep }) => {
  const [sceneGroup, setSceneGroup] = React.useState<Group | null>(null);
  const forearmPivotRef = useRef<Group | null>(null);

  useEffect(() => {
    const abort = new AbortController();
    let active: Group | null = null;
    const loader = new GLTFLoader();

    fetch('/models/medverse/skeleton.glb', { signal: abort.signal })
      .then((r) => r.arrayBuffer())
      .then((buf) => loader.parseAsync(buf, ''))
      .then((gltf) => {
        if (abort.signal.aborted) {
          disposeObject3D(gltf.scene);
          return;
        }

        const upperLimbFocus = new Set([
          'right-clavicle',
          'right-scapula',
          'right-humerus',
          'right-radius',
          'right-ulna',
          'right-scaphoid',
        ]);
        const forearmIds = new Set(['right-radius', 'right-ulna', 'right-scaphoid']);

        let elbowPivot = new Vector3(-0.22, 0.08, 0);
        const forearmMeshes: Mesh[] = [];

        gltf.scene.traverse((obj) => {
          if (!(obj instanceof Mesh)) return;
          const sid = (obj.userData?.structureId as string) || obj.name;
          const srcMat = Array.isArray(obj.material) ? obj.material[0] : obj.material;
          obj.material = srcMat
            ? srcMat.clone()
            : new MeshStandardMaterial({ color: '#e2e8f0' });

          const isFocus = upperLimbFocus.has(sid);
          const mat = obj.material as MeshStandardMaterial;
          mat.transparent = !isFocus;
          mat.opacity = isFocus ? 1.0 : 0.14;
          mat.depthWrite = isFocus;

          if (sid === 'right-humerus') {
            const box = new Box3().setFromObject(obj);
            if (!box.isEmpty()) {
              elbowPivot = new Vector3(
                (box.min.x + box.max.x) / 2,
                box.min.y + 0.025,
                (box.min.z + box.max.z) / 2
              );
            }
          }
          if (forearmIds.has(sid)) {
            forearmMeshes.push(obj);
          }
        });

        const pivot = new Group();
        pivot.position.copy(elbowPivot);
        gltf.scene.add(pivot);
        for (const m of forearmMeshes) {
          pivot.attach(m);
        }
        forearmPivotRef.current = pivot;
        active = gltf.scene;
        setSceneGroup(gltf.scene);
      })
      .catch(() => {});

    return () => {
      abort.abort();
      disposeObject3D(active);
    };
  }, []);

  useFrame(() => {
    const p = playbackRef.current.progress;
    if (forearmPivotRef.current) {
      // 0..0.34 hold extended -> 0.34..0.72 flex anteriorly up to ~115 deg -> 0.72..1.0 return
      let flexRatio = 0;
      if (p >= 0.34 && p <= 0.72) {
        flexRatio = (p - 0.34) / 0.38;
      } else if (p > 0.72) {
        flexRatio = Math.max(0, 1 - (p - 0.72) / 0.28);
      }
      forearmPivotRef.current.rotation.x = -flexRatio * 2.0;
    }

    if (sceneGroup) {
      const hi = new Set(activeStep.highlightStructureIds);
      sceneGroup.traverse((obj) => {
        if (!(obj instanceof Mesh)) return;
        const sid = (obj.userData?.structureId as string) || obj.name;
        const mat = obj.material;
        if (!(mat instanceof MeshStandardMaterial)) return;
        if (hi.has(sid)) {
          mat.emissive.set('#14b8a6');
          mat.emissiveIntensity = 0.55;
        } else {
          mat.emissive.set('#000000');
          mat.emissiveIntensity = 0;
        }
      });
    }
  });

  if (!sceneGroup) return null;
  return <primitive object={sceneGroup} position={[0, -0.1, 0]} />;
};

export const ScientificAnimationScene: React.FC<ScientificAnimationSceneProps> = ({
  animation,
  playbackRef,
  activeStep,
  followCamera,
  showLabels,
  reducedMotion,
  onClockTick,
}) => {
  return (
    <>
      <TimelineClockAndCamera
        animation={animation}
        playbackRef={playbackRef}
        activeStep={activeStep}
        followCamera={followCamera}
        reducedMotion={reducedMotion}
        onClockTick={onClockTick}
      />

      {(animation.renderKind === 'heart_blood_flow' ||
        animation.renderKind === 'heart_conduction') && (
        <HeartAnimationModel
          animation={animation}
          playbackRef={playbackRef}
          activeStep={activeStep}
        />
      )}

      {animation.renderKind === 'skeleton_kinematics' && (
        <SkeletonKinematicsModel playbackRef={playbackRef} activeStep={activeStep} />
      )}

      {animation.renderKind === 'respiratory_mechanics' && (
        <RespiratorySchematicScene playbackRef={playbackRef} />
      )}

      {animation.renderKind === 'renal_nephron' && (
        <RenalNephronSchematicScene playbackRef={playbackRef} />
      )}

      {animation.renderKind === 'neuro_action_potential' && (
        <NeuroSynapseSchematicScene playbackRef={playbackRef} />
      )}

      {animation.renderKind === 'sarcomere_contraction' && (
        <SarcomereSchematicScene playbackRef={playbackRef} />
      )}

      {animation.renderKind === 'dna_replication' && (
        <DNAReplicationSchematicScene playbackRef={playbackRef} />
      )}

      {showLabels && activeStep.calloutLabel && activeStep.calloutPosition && (
        <Html position={activeStep.calloutPosition} center distanceFactor={6} zIndexRange={[20, 0]}>
          <div className="pointer-events-none px-3 py-1 rounded-lg bg-slate-950/90 border border-cyan-400/70 text-cyan-100 text-[11px] font-bold shadow-lg whitespace-nowrap">
            {activeStep.calloutLabel}
          </div>
        </Html>
      )}
    </>
  );
};
