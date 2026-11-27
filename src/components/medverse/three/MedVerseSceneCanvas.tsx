'use client';

import React, { Component, ReactNode, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface SceneErrorBoundaryProps {
  children: ReactNode;
  onFailure?: () => void;
}

interface SceneErrorBoundaryState {
  hasError: boolean;
}

class SceneErrorBoundary extends Component<SceneErrorBoundaryProps, SceneErrorBoundaryState> {
  state: SceneErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): SceneErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn('[MedVerse3D Scene ErrorBoundary]', error);
    this.props.onFailure?.();
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export function isWebGLAvailable(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

interface MedVerseSceneCanvasProps {
  children: ReactNode;
  fallback?: ReactNode;
  frameloop?: 'always' | 'demand';
  cameraPosition?: [number, number, number];
  fov?: number;
  className?: string;
}

export const MedVerseSceneCanvas: React.FC<MedVerseSceneCanvasProps> = ({
  children,
  fallback,
  frameloop = 'always',
  cameraPosition = [0, 0.25, 3.8],
  fov = 38,
  className = 'w-full h-full',
}) => {
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [contextLost, setContextLost] = useState<boolean>(false);
  const [mountKey, setMountKey] = useState<number>(0);

  useEffect(() => {
    setWebglSupported(isWebGLAvailable());
  }, []);

  if (!webglSupported || contextLost) {
    if (fallback) return <>{fallback}</>;
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-950 text-slate-200 rounded-2xl border border-slate-800 space-y-3">
        <AlertTriangle className="w-8 h-8 text-amber-400" />
        <div className="space-y-1 max-w-md">
          <h3 className="text-sm font-bold">3D WebGL Context Unavailable</h3>
          <p className="text-xs text-slate-400">
            Your browser or device could not initialize a hardware WebGL context. Use the Structure Explorer, Notes, and Step Controls alongside this panel.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setContextLost(false);
            setWebglSupported(isWebGLAvailable());
            setMountKey((k) => k + 1);
          }}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Retry 3D Viewport</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <SceneErrorBoundary onFailure={() => setContextLost(true)}>
        <Canvas
          key={mountKey}
          dpr={[1, 2]}
          frameloop={frameloop}
          camera={{ position: cameraPosition, fov, near: 0.03, far: 150 }}
          gl={{
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true,
            localClippingEnabled: true,
            powerPreference: 'high-performance',
          }}
          onCreated={({ gl }) => {
            gl.localClippingEnabled = true;
            const handleLost = (e: Event) => {
              e.preventDefault();
              setContextLost(true);
            };
            gl.domElement.addEventListener('webglcontextlost', handleLost, { once: true });
          }}
        >
          <ambientLight intensity={0.7} />
          <hemisphereLight args={['#e2f1ff', '#1e293b', 0.85]} />
          <directionalLight position={[4, 6, 5]} intensity={1.35} color="#fff9f2" />
          <directionalLight position={[-5, 2, -4]} intensity={0.65} color="#7dd3fc" />
          <directionalLight position={[0, -5, 2]} intensity={0.35} color="#99f6e4" />
          {children}
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
};
