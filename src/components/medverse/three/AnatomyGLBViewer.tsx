'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ThreeEvent, useThree } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { Box3, Color, Group, Mesh, MeshStandardMaterial, Plane, Vector3 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  RotateCcw,
  Maximize2,
  Minimize2,
  Eye,
  EyeOff,
  Focus,
  Search,
  Layers,
  Tag,
  Scissors,
  ZoomIn,
  ZoomOut,
  Bookmark,
  AlertCircle,
  Loader2,
  BookOpen,
  Play,
  HelpCircle,
  ExternalLink,
  Info,
} from 'lucide-react';
import { MedVerseSceneCanvas } from './MedVerseSceneCanvas';
import { collectSurfacePoints, computeFramingFit, disposeObject3D, pickVisibleMesh } from './threeUtils';
import {
  ANATOMY_ASSETS,
  getStructureMetadata,
  getStructuresForAsset,
} from '@/data/medverse';
import { AnatomicalStructureMetadata } from '@/types/medverse';
import { getMedVerseProgress, toggleMedVerseStructureBookmark } from '@/lib/medverse/progress';

interface CameraControllerProps {
  model: Group | null;
  activeView: string;
  availableViews: Array<{
    id: string;
    label: string;
    direction: [number, number, number];
    targetOffset?: [number, number, number];
  }>;
  zoomTrigger: { seq: number; factor: number };
  resetSeq: number;
  selectedStructureId: string | null;
  focusSeq: number;
}

const CameraController: React.FC<CameraControllerProps> = ({
  model,
  activeView,
  availableViews,
  zoomTrigger,
  resetSeq,
  selectedStructureId,
  focusSeq,
}) => {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const { camera, size } = useThree();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const applyView = useCallback(
    (viewId: string) => {
      if (!model || !controlsRef.current) return;
      const view = availableViews.find((v) => v.id === viewId) || availableViews[0];
      if (!view) return;
      const pts = collectSurfacePoints(model);
      const dir = new Vector3(...view.direction).normalize();
      const fit = computeFramingFit(pts, dir, 38, size.width / Math.max(1, size.height));
      const target = fit.center.clone();
      if (view.targetOffset) {
        target.add(new Vector3(...view.targetOffset));
      }
      const distance = view.targetOffset ? fit.distance * 0.52 : fit.distance;
      controlsRef.current.target.copy(target);
      camera.position.copy(target).add(dir.multiplyScalar(distance));
      camera.lookAt(target);
      controlsRef.current.update();
    },
    [model, availableViews, camera, size.width, size.height]
  );

  useEffect(() => {
    applyView(activeView);
  }, [activeView, resetSeq, applyView]);

  useEffect(() => {
    if (!controlsRef.current || zoomTrigger.seq === 0) return;
    const target = controlsRef.current.target;
    const offset = camera.position.clone().sub(target);
    const nextLen = Math.max(0.45, Math.min(14, offset.length() * zoomTrigger.factor));
    offset.setLength(nextLen);
    camera.position.copy(target).add(offset);
    controlsRef.current.update();
  }, [zoomTrigger, camera]);

  useEffect(() => {
    if (!model || !selectedStructureId || focusSeq === 0 || !controlsRef.current) return;
    let targetMesh: Mesh | null = null;
    model.traverse((obj) => {
      if (obj instanceof Mesh) {
        const sid = (obj.userData?.structureId as string) || obj.name;
        if (sid === selectedStructureId) targetMesh = obj;
      }
    });
    if (!targetMesh) return;
    const box = new Box3().setFromObject(targetMesh);
    if (box.isEmpty()) return;
    const center = new Vector3();
    const s = new Vector3();
    box.getCenter(center);
    box.getSize(s);
    const dir = camera.position.clone().sub(controlsRef.current.target).normalize();
    if (dir.lengthSq() < 0.01) dir.set(0, 0, 1);
    const dist = Math.max(1.2, s.length() * 2.1);
    controlsRef.current.target.copy(center);
    camera.position.copy(center).add(dir.multiplyScalar(dist));
    controlsRef.current.update();
  }, [focusSeq, selectedStructureId, model, camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enablePan
      enableZoom
      enableRotate
      enableDamping={!reducedMotion}
      dampingFactor={0.08}
      minDistance={0.35}
      maxDistance={15}
    />
  );
};

interface LoadedModelSceneProps {
  model: Group;
  assetId: string;
  selectedId: string | null;
  hoveredId: string | null;
  hiddenIds: Set<string>;
  isolatedId: string | null;
  opacityLevel: number;
  showLabels: boolean;
  clipEnabled: boolean;
  clipHeight: number;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

const LoadedModelScene: React.FC<LoadedModelSceneProps> = ({
  model,
  assetId,
  selectedId,
  hoveredId,
  hiddenIds,
  isolatedId,
  opacityLevel,
  showLabels,
  clipEnabled,
  clipHeight,
  onSelect,
  onHover,
}) => {
  const [labelAnchor, setLabelAnchor] = useState<[number, number, number] | null>(null);
  const clipPlane = useMemo(() => new Plane(new Vector3(0, -1, 0), clipHeight), [clipHeight]);

  useEffect(() => {
    let selectedCenter: [number, number, number] | null = null;
    model.traverse((obj) => {
      if (!(obj instanceof Mesh)) return;
      const id = (obj.userData?.structureId as string) || obj.name;
      const meta = getStructureMetadata(assetId, id);
      const isHidden = hiddenIds.has(id);
      const isDimmedByIsolation = Boolean(isolatedId && isolatedId !== id);
      const isDimmedBySelection = Boolean(!isolatedId && selectedId && selectedId !== id);
      const isSelected = selectedId === id;
      const isHovered = hoveredId === id;

      obj.visible = !isHidden && !isDimmedByIsolation;

      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      mats.forEach((mat) => {
        if (!(mat instanceof MeshStandardMaterial)) return;
        const baseHex = meta?.color || '#cbd5e1';
        mat.color.copy(new Color(baseHex));

        if (isSelected) {
          mat.emissive.set('#14b8a6');
          mat.emissiveIntensity = 0.45;
        } else if (isHovered) {
          mat.emissive.set('#38bdf8');
          mat.emissiveIntensity = 0.3;
        } else {
          mat.emissive.set('#000000');
          mat.emissiveIntensity = 0;
        }

        const effectiveOpacity = isDimmedBySelection
          ? Math.min(opacityLevel, 0.28)
          : opacityLevel;
        mat.transparent = effectiveOpacity < 0.99;
        mat.opacity = effectiveOpacity;
        mat.depthWrite = effectiveOpacity >= 0.95;
        mat.roughness = 0.54;
        mat.metalness = 0.08;
        mat.clippingPlanes = clipEnabled ? [clipPlane] : [];
        mat.clipShadows = clipEnabled;
        mat.needsUpdate = true;
      });

      if (isSelected && obj.visible) {
        const box = new Box3().setFromObject(obj);
        if (!box.isEmpty()) {
          const c = new Vector3();
          box.getCenter(c);
          selectedCenter = [c.x, c.y, c.z];
        }
      }
    });
    setLabelAnchor(selectedCenter);
  }, [
    model,
    assetId,
    selectedId,
    hoveredId,
    hiddenIds,
    isolatedId,
    opacityLevel,
    clipEnabled,
    clipPlane,
  ]);

  const selectedMeta = selectedId ? getStructureMetadata(assetId, selectedId) : null;

  return (
    <>
      <primitive
        object={model}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          if (e.delta > 6) return;
          const hit = pickVisibleMesh(e.intersections);
          if (!hit) return;
          const id = (hit.userData?.structureId as string) || hit.name;
          if (id) onSelect(id);
        }}
        onPointerMove={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          const hit = pickVisibleMesh(e.intersections);
          const id = hit ? (hit.userData?.structureId as string) || hit.name : null;
          onHover(id || null);
          if (typeof document !== 'undefined') {
            document.body.style.cursor = id ? 'pointer' : 'auto';
          }
        }}
        onPointerOut={() => {
          onHover(null);
          if (typeof document !== 'undefined') {
            document.body.style.cursor = 'auto';
          }
        }}
      />

      {showLabels && selectedMeta && labelAnchor && (
        <Html position={labelAnchor} center distanceFactor={6} zIndexRange={[20, 0]}>
          <div className="pointer-events-none px-2.5 py-1 rounded-lg bg-slate-950/90 border border-teal-400/70 text-white shadow-lg whitespace-nowrap">
            <span className="text-[11px] font-bold block leading-tight">
              {selectedMeta.standardName}
            </span>
            {selectedMeta.fmaId && (
              <span className="text-[9px] font-mono text-teal-300">{selectedMeta.fmaId}</span>
            )}
          </div>
        </Html>
      )}
    </>
  );
};

interface AnatomyGLBViewerProps {
  assetId: string;
  initialSelectedStructureId?: string | null;
  highlightStructureIds?: string[];
  compact?: boolean;
  onStructureSelect?: (structure: AnatomicalStructureMetadata | null) => void;
}

export const AnatomyGLBViewer: React.FC<AnatomyGLBViewerProps> = ({
  assetId,
  initialSelectedStructureId = null,
  compact = false,
  onStructureSelect,
}) => {
  const asset = ANATOMY_ASSETS[assetId];
  const structures = useMemo(() => getStructuresForAsset(assetId), [assetId]);
  const groups = useMemo(
    () => Array.from(new Set(structures.map((s) => s.group))),
    [structures]
  );

  const stageRef = useRef<HTMLDivElement>(null);
  const [model, setModel] = useState<Group | null>(null);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [retrySeq, setRetrySeq] = useState<number>(0);

  const [selectedId, setSelectedId] = useState<string | null>(
    initialSelectedStructureId || structures[0]?.id || null
  );
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hiddenIds, setHiddenIds] = useState<Set<string>>(() => new Set());
  const [isolatedId, setIsolatedId] = useState<string | null>(null);
  const [opacityLevel, setOpacityLevel] = useState<number>(1.0);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [clipEnabled, setClipEnabled] = useState<boolean>(false);
  const [clipHeight, setClipHeight] = useState<number>(0.25);
  const [activeView, setActiveView] = useState<string>(asset?.defaultCameraView || 'Anterior');
  const [resetSeq, setResetSeq] = useState<number>(0);
  const [focusSeq, setFocusSeq] = useState<number>(0);
  const [zoomTrigger, setZoomTrigger] = useState<{ seq: number; factor: number }>({
    seq: 0,
    factor: 1,
  });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeGroupFilter, setActiveGroupFilter] = useState<string>('all');
  const [bookmarkedStructures, setBookmarkedStructures] = useState<string[]>([]);

  useEffect(() => {
    const prog = getMedVerseProgress();
    setBookmarkedStructures(prog.bookmarkedStructureIds);
  }, []);

  // Load real GLB asset with byte progress & proper cleanup
  useEffect(() => {
    if (!asset?.modelUrl) {
      setModel(null);
      setLoadError(null);
      return;
    }

    const abort = new AbortController();
    let activeModel: Group | null = null;
    let cancelled = false;

    setModel(null);
    setLoadError(null);
    setLoadProgress(0);
    setHiddenIds(new Set());
    setIsolatedId(null);
    setActiveView(asset.defaultCameraView);

    async function loadGLB() {
      try {
        const res = await fetch(asset!.modelUrl!, { signal: abort.signal });
        if (!res.ok) {
          throw new Error(`HTTP ${res.status} while loading ${asset!.modelUrl}`);
        }
        const total = Number(res.headers.get('content-length')) || asset!.fileSizeBytes || 2_500_000;
        const reader = res.body?.getReader();
        let buffer: ArrayBuffer;

        if (reader) {
          const chunks: Uint8Array[] = [];
          let received = 0;
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            if (value) {
              chunks.push(value);
              received += value.byteLength;
              if (!cancelled) {
                setLoadProgress(Math.min(96, Math.round((received / total) * 100)));
              }
            }
          }
          const combined = new Uint8Array(received);
          let offset = 0;
          for (const c of chunks) {
            combined.set(c, offset);
            offset += c.byteLength;
          }
          buffer = combined.buffer;
        } else {
          buffer = await res.arrayBuffer();
        }

        const loader = new GLTFLoader();
        const gltf = await loader.parseAsync(buffer, '');
        if (cancelled) {
          disposeObject3D(gltf.scene);
          return;
        }

        // Normalize materials to editable MeshStandardMaterial clones
        gltf.scene.traverse((obj) => {
          if (obj instanceof Mesh) {
            const srcMat = Array.isArray(obj.material) ? obj.material[0] : obj.material;
            obj.material = srcMat
              ? srcMat.clone()
              : new MeshStandardMaterial({ color: '#cbd5e1', roughness: 0.55 });
          }
        });

        activeModel = gltf.scene;
        setLoadProgress(100);
        setModel(gltf.scene);
      } catch (err: unknown) {
        if (abort.signal.aborted || cancelled) return;
        const msg = err instanceof Error ? err.message : 'Failed to load 3D model asset.';
        setLoadError(msg);
      }
    }

    void loadGLB();

    return () => {
      cancelled = true;
      abort.abort();
      disposeObject3D(activeModel);
    };
  }, [asset, retrySeq]);

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const selectedMeta = useMemo(
    () => (selectedId ? getStructureMetadata(assetId, selectedId) : null),
    [assetId, selectedId]
  );

  useEffect(() => {
    onStructureSelect?.(selectedMeta);
  }, [selectedMeta, onStructureSelect]);

  const filteredStructures = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return structures.filter((s) => {
      if (activeGroupFilter !== 'all' && s.group !== activeGroupFilter) return false;
      if (!q) return true;
      return (
        s.standardName.toLowerCase().includes(q) ||
        s.sourceName.toLowerCase().includes(q) ||
        (s.fmaId && s.fmaId.toLowerCase().includes(q)) ||
        s.group.toLowerCase().includes(q)
      );
    });
  }, [structures, searchQuery, activeGroupFilter]);

  const handleSelectStructure = useCallback((id: string) => {
    setSelectedId(id);
    setHiddenIds((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const toggleHideStructure = (id: string) => {
    setHiddenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleLayerVisibility = (groupName: string) => {
    const groupIds = structures.filter((s) => s.group === groupName).map((s) => s.id);
    const allHidden = groupIds.every((id) => hiddenIds.has(id));
    setHiddenIds((prev) => {
      const next = new Set(prev);
      for (const id of groupIds) {
        if (allHidden) next.delete(id);
        else next.add(id);
      }
      return next;
    });
  };

  const toggleFullscreen = async () => {
    if (!stageRef.current) return;
    try {
      if (!document.fullscreenElement) {
        await stageRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {}
  };

  const handleResetAll = () => {
    setHiddenIds(new Set());
    setIsolatedId(null);
    setOpacityLevel(1.0);
    setClipEnabled(false);
    setActiveView(asset?.defaultCameraView || 'Anterior');
    setResetSeq((s) => s + 1);
  };

  if (!asset) {
    return (
      <div className="p-6 rounded-2xl border border-rose-500/40 bg-rose-950/20 text-rose-200 text-sm">
        Unknown anatomy asset: {assetId}
      </div>
    );
  }

  const isSchematicOnly = asset.kind === 'educational_schematic';

  return (
    <div
      ref={stageRef}
      className={`grid grid-cols-1 ${
        compact ? 'lg:grid-cols-12' : 'xl:grid-cols-12'
      } gap-4 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800/90 p-3 sm:p-4 shadow-2xl`}
    >
      {/* LEFT: Searchable Structure & Layer Explorer */}
      <aside className={`${compact ? 'lg:col-span-3' : 'xl:col-span-3'} flex flex-col gap-3 rounded-2xl bg-slate-900/90 border border-slate-800 p-3 max-h-[620px]`}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-teal-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Structures ({structures.length})
            </h3>
          </div>
          {hiddenIds.size > 0 || isolatedId ? (
            <button
              type="button"
              onClick={() => {
                setHiddenIds(new Set());
                setIsolatedId(null);
              }}
              className="text-[11px] font-semibold text-teal-400 hover:text-teal-300"
            >
              Restore All
            </button>
          ) : null}
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search name or FMA ID..."
            aria-label="Search anatomical structures"
            className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
          />
        </div>

        {/* Layer / Group Visibility Toggles */}
        {groups.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setActiveGroupFilter('all')}
              className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-colors ${
                activeGroupFilter === 'all'
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All
            </button>
            {groups.map((grp) => {
              const grpIds = structures.filter((s) => s.group === grp).map((s) => s.id);
              const allHidden = grpIds.every((id) => hiddenIds.has(id));
              return (
                <div key={grp} className="inline-flex items-center rounded-lg overflow-hidden border border-slate-700">
                  <button
                    type="button"
                    onClick={() => setActiveGroupFilter(grp)}
                    className={`px-2 py-1 text-[10px] font-semibold transition-colors ${
                      activeGroupFilter === grp
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {grp}
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleLayerVisibility(grp)}
                    title={allHidden ? `Show ${grp}` : `Hide ${grp}`}
                    aria-label={allHidden ? `Show ${grp} layer` : `Hide ${grp} layer`}
                    className="px-1.5 py-1 bg-slate-900 text-slate-400 hover:text-white border-l border-slate-700"
                  >
                    {allHidden ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Structure List (Keyboard Accessible Alternative to Pointer Picking) */}
        <div className="flex-1 overflow-y-auto space-y-1 pr-1" role="listbox" aria-label="Anatomical structure list">
          {filteredStructures.length === 0 ? (
            <p className="text-xs text-slate-500 p-3 text-center">
              {isSchematicOnly
                ? 'This topic uses a timeline mechanism schematic. Open the Animation Studio to explore step-by-step mechanisms.'
                : 'No matching structures found.'}
            </p>
          ) : (
            filteredStructures.map((s) => {
              const isSelected = selectedId === s.id;
              const isHidden = hiddenIds.has(s.id);
              return (
                <div
                  key={s.id}
                  className={`flex items-center justify-between gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs transition-colors ${
                    isSelected
                      ? 'bg-teal-950/60 border-teal-500/70 text-white'
                      : 'bg-slate-950/50 border-slate-800/80 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleSelectStructure(s.id)}
                    className="flex items-center gap-2 text-left min-w-0 flex-1"
                    role="option"
                    aria-selected={isSelected}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0 border border-white/20"
                      style={{ backgroundColor: s.color }}
                    />
                    <span className={`truncate font-medium ${isHidden ? 'line-through opacity-50' : ''}`}>
                      {s.standardName}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleHideStructure(s.id)}
                    aria-label={isHidden ? `Show ${s.standardName}` : `Hide ${s.standardName}`}
                    className="p-1 text-slate-400 hover:text-white rounded"
                  >
                    {isHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              );
            })
          )}
        </div>
      </aside>

      {/* CENTER: Real 3D Viewport + Compact Scene Toolbar */}
      <div className={`${compact ? 'lg:col-span-5' : 'xl:col-span-5'} flex flex-col gap-3`}>
        {/* Camera & Viewport Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-slate-900/90 border border-slate-800 px-3 py-2">
          <div className="flex flex-wrap items-center gap-1">
            {asset.availableViews.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setActiveView(v.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                  activeView === v.id
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setZoomTrigger((z) => ({ seq: z.seq + 1, factor: 0.82 }))}
              title="Zoom In"
              aria-label="Zoom in"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoomTrigger((z) => ({ seq: z.seq + 1, factor: 1.22 }))}
              title="Zoom Out"
              aria-label="Zoom out"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setShowLabels((l) => !l)}
              title="Toggle Anatomical Labels"
              aria-label="Toggle anatomical labels"
              className={`p-1.5 rounded-lg transition-colors ${
                showLabels ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setClipEnabled((c) => !c)}
              title="Toggle Cross-Section Clipping Plane"
              aria-label="Toggle cross-section clipping plane"
              className={`p-1.5 rounded-lg transition-colors ${
                clipEnabled ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Scissors className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleResetAll}
              title="Reset Camera & Restore All"
              aria-label="Reset camera and restore structures"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={toggleFullscreen}
              title="Toggle Fullscreen"
              aria-label="Toggle fullscreen"
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Main 3D Stage */}
        <div
          className={`relative w-full ${
            compact ? 'h-[400px] sm:h-[460px]' : 'h-[440px] sm:h-[520px]'
          } rounded-2xl bg-[radial-gradient(circle_at_center,#132238_0%,#070b14_100%)] border border-slate-800 overflow-hidden`}
        >
          {/* Loading Overlay */}
          {!isSchematicOnly && !model && !loadError && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/85 p-6 text-center space-y-3">
              <Loader2 className="w-7 h-7 text-teal-400 animate-spin" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-100">
                  Loading {asset.title} ({loadProgress}%)
                </p>
                <div className="w-48 h-1.5 rounded-full bg-slate-800 overflow-hidden mx-auto">
                  <div
                    className="h-full bg-teal-400 transition-all duration-150"
                    style={{ width: `${loadProgress}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Error & Retry Overlay */}
          {loadError && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/95 p-6 text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-rose-400" />
              <p className="text-xs text-rose-200 max-w-sm">{loadError}</p>
              <button
                type="button"
                onClick={() => setRetrySeq((r) => r + 1)}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold"
              >
                Retry Loading 3D Model
              </button>
            </div>
          )}

          {isSchematicOnly ? (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-3">
              <Info className="w-8 h-8 text-cyan-400" />
              <div className="max-w-sm space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300">
                  Educational Physiological Schematic
                </span>
                <h4 className="text-sm font-bold text-white pt-1">{asset.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{asset.limitationsNote}</p>
              </div>
            </div>
          ) : (
            <MedVerseSceneCanvas frameloop="always">
              <CameraController
                model={model}
                activeView={activeView}
                availableViews={asset.availableViews}
                zoomTrigger={zoomTrigger}
                resetSeq={resetSeq}
                selectedStructureId={selectedId}
                focusSeq={focusSeq}
              />
              {model && (
                <LoadedModelScene
                  model={model}
                  assetId={assetId}
                  selectedId={selectedId}
                  hoveredId={hoveredId}
                  hiddenIds={hiddenIds}
                  isolatedId={isolatedId}
                  opacityLevel={opacityLevel}
                  showLabels={showLabels}
                  clipEnabled={clipEnabled}
                  clipHeight={clipHeight}
                  onSelect={handleSelectStructure}
                  onHover={setHoveredId}
                />
              )}
            </MedVerseSceneCanvas>
          )}

          {/* Selected / Hovered Pill Overlay */}
          {hoveredId && hoveredId !== selectedId && (
            <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-lg bg-slate-950/85 border border-sky-500/50 text-[11px] text-sky-200 pointer-events-none">
              {getStructureMetadata(assetId, hoveredId)?.standardName || hoveredId}
            </div>
          )}
        </div>

        {/* Opacity, Isolation & Cross-Section Controls Bar */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <label htmlFor="medverse-opacity" className="text-[11px] font-semibold text-slate-400">
              Opacity: {Math.round(opacityLevel * 100)}%
            </label>
            <input
              id="medverse-opacity"
              type="range"
              min={0.15}
              max={1}
              step={0.05}
              value={opacityLevel}
              onChange={(e) => setOpacityLevel(Number(e.target.value))}
              className="w-24 accent-teal-400"
            />
          </div>

          {clipEnabled && (
            <div className="flex items-center gap-2">
              <label htmlFor="medverse-clip" className="text-[11px] font-semibold text-cyan-300">
                Section Plane:
              </label>
              <input
                id="medverse-clip"
                type="range"
                min={-1.5}
                max={1.5}
                step={0.05}
                value={clipHeight}
                onChange={(e) => setClipHeight(Number(e.target.value))}
                className="w-28 accent-cyan-400"
              />
            </div>
          )}

          {selectedId && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setFocusSeq((f) => f + 1)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold"
              >
                <Focus className="w-3 h-3 text-teal-400" />
                <span>Focus</span>
              </button>
              <button
                type="button"
                onClick={() => setIsolatedId((prev) => (prev === selectedId ? null : selectedId))}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                  isolatedId === selectedId
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                {isolatedId === selectedId ? 'Exit Isolate' : 'Isolate'}
              </button>
              <button
                type="button"
                onClick={() => toggleHideStructure(selectedId)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold"
              >
                {hiddenIds.has(selectedId) ? 'Show' : 'Hide'}
              </button>
            </div>
          )}
        </div>

        {/* Asset Provenance, Attribution & Limitation Disclosure */}
        <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 px-3 py-2 text-[11px] text-slate-400 space-y-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span>
              <strong className="text-slate-200">Asset License:</strong> {asset.license} · {asset.attributionText}
            </span>
            <a
              href={asset.licenseUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-teal-400 hover:underline"
            >
              License <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <p className="text-slate-500 leading-snug">
            <strong className="text-slate-400">Model Scope Note:</strong> {asset.limitationsNote}
          </p>
        </div>
      </div>

      {/* RIGHT: Synchronized Anatomical Information & Learning Links Panel */}
      <aside className={`${compact ? 'lg:col-span-4' : 'xl:col-span-4'} rounded-2xl bg-slate-900/90 border border-slate-800 p-4 overflow-y-auto max-h-[640px] space-y-4`}>
        {selectedMeta ? (
          <>
            <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-950 text-teal-300 border border-teal-800">
                    {selectedMeta.group}
                  </span>
                  {selectedMeta.fmaId && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                      {selectedMeta.fmaId}
                    </span>
                  )}
                </div>
                <h2 className="text-base sm:text-lg font-extrabold text-white leading-snug">
                  {selectedMeta.standardName}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => {
                  const updated = toggleMedVerseStructureBookmark(selectedMeta.id);
                  setBookmarkedStructures(updated.bookmarkedStructureIds);
                }}
                aria-label="Bookmark anatomical structure"
                className={`p-2 rounded-xl border transition-colors ${
                  bookmarkedStructures.includes(selectedMeta.id)
                    ? 'bg-teal-600/20 border-teal-500 text-teal-300'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>

            {selectedMeta.limitationsNote && (
              <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-800/60 text-[11px] text-amber-200 leading-relaxed">
                <strong>Mesh Note:</strong> {selectedMeta.limitationsNote}
              </div>
            )}

            <div className="space-y-1">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-teal-400">
                Anatomical Location
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedMeta.location}</p>
            </div>

            <div className="space-y-1">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-teal-400">
                Main Function
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">{selectedMeta.mainFunction}</p>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                Key Relationships
              </h4>
              <ul className="space-y-1 text-xs text-slate-300">
                {selectedMeta.anatomicalRelationships.map((rel) => (
                  <li key={rel} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                    <span>{rel}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-1.5">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-violet-400">
                Clinical Correlations
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {selectedMeta.clinicalCorrelations.map((corr) => (
                  <li
                    key={corr}
                    className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 leading-relaxed"
                  >
                    {corr}
                  </li>
                ))}
              </ul>
            </div>

            {/* Connected Learning Links */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Synchronized Study Links
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedMeta.relatedTopicIds[0] && (
                  <Link
                    href={`/doctor/topics/${selectedMeta.relatedTopicIds[0]}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Open Topic &amp; Notes</span>
                  </Link>
                )}
                {selectedMeta.relatedAnimationIds[0] && (
                  <Link
                    href={`/doctor/animations?anim=${selectedMeta.relatedAnimationIds[0]}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-semibold transition-colors"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Watch Mechanism</span>
                  </Link>
                )}
                <Link
                  href="/doctor/quizzes"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-violet-300 border border-slate-700 text-xs font-semibold transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Structure Quiz</span>
                </Link>
              </div>
            </div>

            {/* References */}
            <div className="pt-2 border-t border-slate-800 space-y-1">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Verified References
              </h4>
              {selectedMeta.references.map((ref) => (
                <p key={ref.id} className="text-[10px] text-slate-400 leading-snug">
                  • {ref.citation}
                </p>
              ))}
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2 text-slate-400">
            <Info className="w-6 h-6 text-teal-400" />
            <p className="text-xs">Select any structure in the 3D viewport or list to inspect its anatomical metadata.</p>
          </div>
        )}
      </aside>
    </div>
  );
};
