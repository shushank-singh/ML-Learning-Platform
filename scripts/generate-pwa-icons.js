const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

/**
 * Pure Node.js high-resolution icon generator for Complete Tech Learning Academy.
 * Generates PNG files with RGBA channels, supersampled anti-aliased vector rendering,
 * and standard PNG chunking (IHDR, IDAT, IEND).
 */

function createPNG(width, height, pixelShader) {
  // 2x supersampling for ultra-crisp antialiasing
  const ss = 2;
  const ssW = width * ss;
  const ssH = height * ss;
  
  // Create high-res supersampled buffer
  const ssBuf = new Uint8ClampedArray(ssW * ssH * 4);
  
  for (let y = 0; y < ssH; y++) {
    const ny = y / (ssH - 1); // 0 to 1
    for (let x = 0; x < ssW; x++) {
      const nx = x / (ssW - 1); // 0 to 1
      const [r, g, b, a] = pixelShader(nx, ny);
      const idx = (y * ssW + x) * 4;
      ssBuf[idx] = r;
      ssBuf[idx + 1] = g;
      ssBuf[idx + 2] = b;
      ssBuf[idx + 3] = a;
    }
  }
  
  // Downsample to target resolution with box filter
  const targetBuf = Buffer.alloc(height * (1 + width * 4));
  let writeOffset = 0;
  
  for (let y = 0; y < height; y++) {
    targetBuf[writeOffset++] = 0; // Filter type 0 (None)
    for (let x = 0; x < width; x++) {
      let rSum = 0, gSum = 0, bSum = 0, aSum = 0;
      for (let sy = 0; sy < ss; sy++) {
        for (let sx = 0; sx < ss; sx++) {
          const idx = ((y * ss + sy) * ssW + (x * ss + sx)) * 4;
          rSum += ssBuf[idx];
          gSum += ssBuf[idx + 1];
          bSum += ssBuf[idx + 2];
          aSum += ssBuf[idx + 3];
        }
      }
      const count = ss * ss;
      targetBuf[writeOffset++] = Math.round(rSum / count);
      targetBuf[writeOffset++] = Math.round(gSum / count);
      targetBuf[writeOffset++] = Math.round(bSum / count);
      targetBuf[writeOffset++] = Math.round(aSum / count);
    }
  }
  
  // PNG signature
  const signature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  
  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace
  const ihdrChunk = createChunk('IHDR', ihdr);
  
  // IDAT (Deflate)
  const compressed = zlib.deflateSync(targetBuf, { level: 9 });
  const idatChunk = createChunk('IDAT', compressed);
  
  // IEND
  const iendChunk = createChunk('IEND', Buffer.alloc(0));
  
  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(8 + len + 4);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  
  const crc = zlib.crc32(chunk.subarray(4, 8 + len));
  chunk.writeUInt32BE(crc >>> 0, 8 + len);
  return chunk;
}

// Distance helper functions
function dist(x1, y1, x2, y2) {
  return Math.hypot(x2 - x1, y2 - y1);
}

function distToSegment(px, py, x1, y1, x2, y2) {
  const l2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
  if (l2 === 0) return dist(px, py, x1, y1);
  let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
  t = Math.max(0, Math.min(1, t));
  return dist(px, py, x1 + t * (x2 - x1), y1 + t * (y2 - y1));
}

// Smoothstep for anti-aliasing
function smoothstep(edge0, edge1, x) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/**
 * Aesthetic definition for the icon:
 * - Rounded squircle container with #0b1020 background and glowing vibrant blue/cyan gradient border
 * - Stylized neural brain lattice with connected synapse nodes
 * - Tech graduation cap / academy diamond peak
 * - High-tech glowing core
 */
function academyIconShader(nx, ny) {
  // Coordinates centered around (0, 0), from -1 to 1
  const x = (nx - 0.5) * 2;
  const y = (ny - 0.5) * 2;
  const r = Math.hypot(x, y);

  // Background: Deep dark navy (#0b1020 = [11, 16, 32])
  let bgR = 11, bgG = 16, bgB = 32, bgA = 255;

  // Subtle radial gradient from center (#162038 at center to #070a14 at edges)
  const centerGlow = Math.max(0, 1 - r * 0.9);
  bgR = Math.min(255, bgR + centerGlow * 18);
  bgG = Math.min(255, bgG + centerGlow * 24);
  bgB = Math.min(255, bgB + centerGlow * 45);

  // Rounded squircle container mask (for maskable compliance, squircle radius ~0.88)
  const squircleD = Math.pow(Math.abs(x), 4) + Math.pow(Math.abs(y), 4);
  const squircleR = Math.pow(squircleD, 0.25);
  
  // Subtle outer edge glow
  if (squircleR > 0.85 && squircleR < 0.94) {
    const edgeT = 1 - Math.abs(squircleR - 0.895) / 0.045;
    // Blue-cyan gradient around edge
    const angle = Math.atan2(y, x);
    const grad = (Math.sin(angle * 2) + 1) * 0.5;
    bgR = bgR * (1 - edgeT * 0.6) + (37 + 10 * grad) * edgeT * 0.6;
    bgG = bgG * (1 - edgeT * 0.6) + (99 + 80 * grad) * edgeT * 0.6;
    bgB = bgB * (1 - edgeT * 0.6) + (235 + 20 * grad) * edgeT * 0.6;
  }

  // Neural Synapse Network Definition
  // Left and Right symmetrical brain / neural nodes:
  const nodes = [
    // Center column & core
    { x: 0.0, y: -0.32, color: [56, 189, 248], size: 0.048 }, // Top crest / mortarboard apex
    { x: 0.0, y: -0.12, color: [99, 102, 241], size: 0.052 }, // Upper central hub
    { x: 0.0, y: 0.12,  color: [37, 99, 235],  size: 0.060 }, // Core engine
    { x: 0.0, y: 0.38,  color: [16, 185, 129], size: 0.046 }, // Base root / foundation

    // Left hemisphere nodes
    { x: -0.32, y: -0.28, color: [129, 140, 248], size: 0.044 },
    { x: -0.42, y: -0.06, color: [56, 189, 248],  size: 0.050 },
    { x: -0.36, y: 0.18,  color: [99, 102, 241],  size: 0.046 },
    { x: -0.20, y: 0.35,  color: [52, 211, 153],  size: 0.040 },
    { x: -0.18, y: -0.18, color: [147, 197, 253], size: 0.040 },
    { x: -0.22, y: 0.06,  color: [129, 140, 248], size: 0.042 },

    // Right hemisphere nodes (mirror)
    { x: 0.32,  y: -0.28, color: [129, 140, 248], size: 0.044 },
    { x: 0.42,  y: -0.06, color: [56, 189, 248],  size: 0.050 },
    { x: 0.36,  y: 0.18,  color: [99, 102, 241],  size: 0.046 },
    { x: 0.20,  y: 0.35,  color: [52, 211, 153],  size: 0.040 },
    { x: 0.18,  y: -0.18, color: [147, 197, 253], size: 0.040 },
    { x: 0.22,  y: 0.06,  color: [129, 140, 248], size: 0.042 },
  ];

  // Neural Synaptic Edges
  const edges = [
    // Academy Cap / Apex Diamond
    [0, 4], [0, 10], [4, 8], [10, 14], [8, 1], [14, 1],
    // Left hemisphere connections
    [4, 5], [5, 9], [5, 6], [8, 9], [9, 2], [6, 7], [6, 2], [7, 3],
    // Right hemisphere connections
    [10, 11], [11, 15], [11, 12], [14, 15], [15, 2], [12, 13], [12, 2], [13, 3],
    // Central spine
    [1, 2], [2, 3],
    // Cross connections
    [8, 14], [9, 15],
  ];

  let rAcc = bgR;
  let gAcc = bgG;
  let bAcc = bgB;

  // Draw glowing edges
  for (const [i1, i2] of edges) {
    const p1 = nodes[i1];
    const p2 = nodes[i2];
    const dEdge = distToSegment(x, y, p1.x, p1.y, p2.x, p2.y);

    // Outer soft glow (width ~0.035)
    if (dEdge < 0.04) {
      const glowT = Math.pow(1 - dEdge / 0.04, 2) * 0.45;
      rAcc += 37 * glowT;
      gAcc += 99 * glowT;
      bAcc += 235 * glowT;
    }

    // Crisp inner stroke (thickness ~0.012)
    if (dEdge < 0.015) {
      const strokeT = smoothstep(0.015, 0.005, dEdge);
      rAcc = rAcc * (1 - strokeT * 0.85) + 180 * strokeT * 0.85;
      gAcc = gAcc * (1 - strokeT * 0.85) + 220 * strokeT * 0.85;
      bAcc = bAcc * (1 - strokeT * 0.85) + 255 * strokeT * 0.85;
    }
  }

  // Draw nodes (with halo & core)
  for (const node of nodes) {
    const dNode = dist(x, y, node.x, node.y);
    const radius = node.size;

    // Node outer atmospheric glow
    const glowRadius = radius * 2.8;
    if (dNode < glowRadius) {
      const glow = Math.pow(1 - dNode / glowRadius, 2) * 0.65;
      rAcc += node.color[0] * glow * 0.6;
      gAcc += node.color[1] * glow * 0.6;
      bAcc += node.color[2] * glow * 0.6;
    }

    // Node solid body
    if (dNode < radius) {
      const bodyT = smoothstep(radius, radius * 0.7, dNode);
      rAcc = rAcc * (1 - bodyT) + node.color[0] * bodyT;
      gAcc = gAcc * (1 - bodyT) + node.color[1] * bodyT;
      bAcc = bAcc * (1 - bodyT) + node.color[2] * bodyT;

      // Bright white-hot center spark
      const centerR = radius * 0.45;
      if (dNode < centerR) {
        const centerT = smoothstep(centerR, 0, dNode);
        rAcc = rAcc * (1 - centerT * 0.9) + 255 * centerT * 0.9;
        gAcc = gAcc * (1 - centerT * 0.9) + 255 * centerT * 0.9;
        bAcc = bAcc * (1 - centerT * 0.9) + 255 * centerT * 0.9;
      }
    }
  }

  // Academy Diamond Crest / Spark at the top
  const dPeak = dist(x, y, 0, -0.42);
  if (dPeak < 0.06) {
    const peakGlow = Math.pow(1 - dPeak / 0.06, 2) * 0.8;
    rAcc += 56 * peakGlow;
    gAcc += 189 * peakGlow;
    bAcc += 248 * peakGlow;
  }

  return [
    Math.min(255, Math.max(0, Math.round(rAcc))),
    Math.min(255, Math.max(0, Math.round(gAcc))),
    Math.min(255, Math.max(0, Math.round(bAcc))),
    bgA,
  ];
}

// Generate files
const outDir = path.resolve(__dirname, '..', 'public', 'icons');
fs.mkdirSync(outDir, { recursive: true });

console.log('Generating 192x192 PNG...');
const png192 = createPNG(192, 192, academyIconShader);
fs.writeFileSync(path.join(outDir, 'icon-192x192.png'), png192);

console.log('Generating 512x512 PNG...');
const png512 = createPNG(512, 512, academyIconShader);
fs.writeFileSync(path.join(outDir, 'icon-512x512.png'), png512);

console.log('Generating 180x180 Apple Touch Icon PNG...');
const png180 = createPNG(180, 180, academyIconShader);
fs.writeFileSync(path.join(outDir, 'apple-touch-icon.png'), png180);

console.log('Generating 48x48 Favicon PNG...');
const png48 = createPNG(48, 48, academyIconShader);
fs.writeFileSync(path.join(outDir, 'icon-48x48.png'), png48);

// Also copy or place in root public/ for standard fallbacks
fs.writeFileSync(path.resolve(__dirname, '..', 'public', 'apple-touch-icon.png'), png180);
fs.writeFileSync(path.resolve(__dirname, '..', 'public', 'favicon.ico'), png48);

console.log('All PWA icons generated successfully!');
