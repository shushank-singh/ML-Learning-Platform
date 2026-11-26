import { Box3, Group, Intersection, Mesh, Object3D, Vector3 } from 'three';

/**
 * Picks the closest visible, non-ghosted mesh from a Three.js raycast intersection list.
 */
export function pickVisibleMesh(intersections: Intersection[]): Mesh | null {
  const meshes = intersections
    .map((hit) => hit.object)
    .filter((object): object is Mesh => {
      if (!(object instanceof Mesh)) return false;
      for (let cur: Object3D | null = object; cur; cur = cur.parent) {
        if (!cur.visible) return false;
      }
      return true;
    });

  if (meshes.length === 0) return null;

  return (
    meshes.find((mesh) => {
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      return mats.some((mat) => mat && (!mat.transparent || mat.opacity >= 0.45));
    }) ?? meshes[0]
  );
}

/**
 * Properly disposes geometries and materials of a loaded Three.js object tree.
 */
export function disposeObject3D(root: Object3D | null): void {
  if (!root) return;
  root.traverse((obj) => {
    if (obj instanceof Mesh) {
      obj.geometry?.dispose();
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      for (const m of mats) {
        m?.dispose();
      }
    }
  });
}

/**
 * Samples bounding-box corner points across all meshes in a group for framing calculations.
 */
export function collectSurfacePoints(root: Group): Vector3[] {
  const pts: Vector3[] = [];
  root.updateMatrixWorld(true);
  root.traverse((obj) => {
    if (obj instanceof Mesh && obj.visible) {
      const box = new Box3().setFromObject(obj);
      if (!box.isEmpty()) {
        pts.push(
          new Vector3(box.min.x, box.min.y, box.min.z),
          new Vector3(box.max.x, box.min.y, box.min.z),
          new Vector3(box.min.x, box.max.y, box.min.z),
          new Vector3(box.max.x, box.max.y, box.min.z),
          new Vector3(box.min.x, box.min.y, box.max.z),
          new Vector3(box.max.x, box.min.y, box.max.z),
          new Vector3(box.min.x, box.max.y, box.max.z),
          new Vector3(box.max.x, box.max.y, box.max.z)
        );
      }
    }
  });
  return pts;
}

/**
 * Computes framing center and ideal camera distance to fit a bounding point cloud inside a perspective viewport.
 */
export function computeFramingFit(
  points: Vector3[],
  direction: Vector3,
  fovDeg: number,
  aspect: number,
  padding = 1.28
): { center: Vector3; distance: number; radius: number } {
  if (points.length === 0) {
    return { center: new Vector3(0, 0, 0), distance: 3.5, radius: 1.2 };
  }
  const box = new Box3().setFromPoints(points);
  const center = new Vector3();
  const size = new Vector3();
  box.getCenter(center);
  box.getSize(size);

  const radius = Math.max(0.25, size.length() * 0.5);
  const dir = direction.clone().normalize();
  const up = Math.abs(dir.y) > 0.9 ? new Vector3(0, 0, 1) : new Vector3(0, 1, 0);
  const right = new Vector3().crossVectors(up, dir).normalize();
  const camUp = new Vector3().crossVectors(dir, right).normalize();

  let maxHalfW = 0.2;
  let maxHalfH = 0.2;
  const rel = new Vector3();
  for (const p of points) {
    rel.subVectors(p, center);
    maxHalfW = Math.max(maxHalfW, Math.abs(rel.dot(right)));
    maxHalfH = Math.max(maxHalfH, Math.abs(rel.dot(camUp)));
  }

  const vFov = (fovDeg * Math.PI) / 180;
  const hFov = 2 * Math.atan(Math.tan(vFov / 2) * Math.max(0.4, aspect));
  const distV = (maxHalfH * padding) / Math.tan(vFov / 2);
  const distH = (maxHalfW * padding) / Math.tan(hFov / 2);

  return {
    center,
    distance: Math.max(distV, distH, radius * 1.1),
    radius,
  };
}
