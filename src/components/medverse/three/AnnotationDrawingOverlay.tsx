'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PenTool, Undo2, Trash2, Download } from 'lucide-react';

interface Stroke {
  color: string;
  width: number;
  points: Array<{ x: number; y: number }>;
}

interface AnnotationDrawingOverlayProps {
  active: boolean;
  onToggleActive: () => void;
  stageRef: React.RefObject<HTMLDivElement | null>;
}

const PEN_COLORS = [
  { id: 'cyan', hex: '#22d3ee', label: 'Cyan' },
  { id: 'rose', hex: '#fb7185', label: 'Rose' },
  { id: 'amber', hex: '#fbbf24', label: 'Amber' },
  { id: 'emerald', hex: '#34d399', label: 'Emerald' },
];

/**
 * 2D Annotation Drawing Canvas & Composite Snapshot Exporter over WebGL viewport.
 */
export const AnnotationDrawingOverlay: React.FC<AnnotationDrawingOverlayProps> = ({
  active,
  onToggleActive,
  stageRef,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const currentStrokeRef = useRef<Stroke | null>(null);
  const [penColor, setPenColor] = useState<string>('#22d3ee');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
      redraw();
    };
    const redraw = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const all = currentStrokeRef.current ? [...strokes, currentStrokeRef.current] : strokes;
      for (const s of all) {
        if (s.points.length < 2) continue;
        ctx.strokeStyle = s.color;
        ctx.lineWidth = s.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(s.points[0].x, s.points[0].y);
        for (let i = 1; i < s.points.length; i++) {
          ctx.lineTo(s.points[i].x, s.points[i].y);
        }
        ctx.stroke();
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [strokes]);

  const drawImmediate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const all = currentStrokeRef.current ? [...strokes, currentStrokeRef.current] : strokes;
    for (const s of all) {
      if (s.points.length < 2) continue;
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(s.points[0].x, s.points[0].y);
      for (let i = 1; i < s.points.length; i++) {
        ctx.lineTo(s.points[i].x, s.points[i].y);
      }
      ctx.stroke();
    }
  };

  const getRelPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!active) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const pt = getRelPoint(e);
    currentStrokeRef.current = { color: penColor, width: 3, points: [pt] };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!active || !currentStrokeRef.current) return;
    currentStrokeRef.current.points.push(getRelPoint(e));
    drawImmediate();
  };

  const handlePointerUp = () => {
    if (!currentStrokeRef.current) return;
    const finished = currentStrokeRef.current;
    currentStrokeRef.current = null;
    if (finished.points.length >= 2) {
      setStrokes((prev) => [...prev, finished]);
    }
  };

  const handleExportSnapshot = () => {
    const stage = stageRef.current;
    if (!stage) return;
    const webglCanvas = stage.querySelector('canvas[data-engine]') || stage.querySelector('canvas');
    if (!(webglCanvas instanceof HTMLCanvasElement)) return;

    const out = document.createElement('canvas');
    out.width = webglCanvas.width;
    out.height = webglCanvas.height;
    const ctx = out.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#070c17';
    ctx.fillRect(0, 0, out.width, out.height);
    ctx.drawImage(webglCanvas, 0, 0, out.width, out.height);
    if (canvasRef.current && strokes.length > 0) {
      ctx.drawImage(canvasRef.current, 0, 0, out.width, out.height);
    }

    const url = out.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `medverse-3d-snapshot-${Date.now()}.png`;
    a.click();
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`absolute inset-0 z-10 w-full h-full ${
          active ? 'pointer-events-auto cursor-crosshair' : 'pointer-events-none'
        }`}
        aria-label="2D anatomical drawing overlay"
      />

      {/* Drawing Controls Pill when Draw Mode is ON */}
      {active && (
        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-950/90 border border-cyan-500/60 shadow-lg backdrop-blur-md">
          <PenTool className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[10px] font-bold text-cyan-200 mr-1">Draw Mode</span>
          {PEN_COLORS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setPenColor(c.hex)}
              title={`Color: ${c.label}`}
              aria-label={`Select ${c.label} pen`}
              className={`w-4 h-4 rounded-full border-2 transition-transform ${
                penColor === c.hex ? 'border-white scale-115' : 'border-slate-700'
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
          <button
            type="button"
            onClick={() => setStrokes((prev) => prev.slice(0, -1))}
            disabled={strokes.length === 0}
            title="Undo stroke"
            aria-label="Undo drawing stroke"
            className="p-1 text-slate-300 hover:text-white disabled:opacity-30"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setStrokes([])}
            disabled={strokes.length === 0}
            title="Clear drawing"
            aria-label="Clear drawing strokes"
            className="p-1 text-slate-300 hover:text-rose-400 disabled:opacity-30"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleExportSnapshot}
            title="Download PNG Snapshot"
            aria-label="Download PNG snapshot"
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-[10px] font-bold"
          >
            <Download className="w-3 h-3" />
            <span>PNG</span>
          </button>
          <button
            type="button"
            onClick={onToggleActive}
            className="px-2 py-0.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[10px] font-semibold"
          >
            Done
          </button>
        </div>
      )}
    </>
  );
};
