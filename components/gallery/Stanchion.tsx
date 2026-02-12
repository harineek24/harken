"use client";

import { useMemo } from "react";
import * as THREE from "three";

type StanchionProps = {
  start: [number, number, number];
  end: [number, number, number];
  postCount?: number;
};

export function Stanchion({ start, end, postCount = 4 }: StanchionProps) {
  const posts = useMemo(() => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < postCount; i++) {
      const t = i / (postCount - 1);
      positions.push([
        start[0] + (end[0] - start[0]) * t,
        0.4,
        start[2] + (end[2] - start[2]) * t,
      ]);
    }
    return positions;
  }, [start, end, postCount]);

  const ropePath = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < postCount; i++) {
      const t = i / (postCount - 1);
      const x = start[0] + (end[0] - start[0]) * t;
      const z = start[2] + (end[2] - start[2]) * t;
      points.push(new THREE.Vector3(x, 0.7, z));
    }
    return new THREE.CatmullRomCurve3(points);
  }, [start, end, postCount]);

  return (
    <group>
      {/* Posts */}
      {posts.map((pos, i) => (
        <group key={i} position={pos}>
          {/* Post body */}
          <mesh castShadow>
            <cylinderGeometry args={[0.03, 0.04, 0.8, 8]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Post top ball */}
          <mesh position={[0, 0.42, 0]} castShadow>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Post base */}
          <mesh position={[0, -0.4, 0]}>
            <cylinderGeometry args={[0.06, 0.08, 0.04, 8]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Rope between posts */}
      <mesh>
        <tubeGeometry args={[ropePath, 20, 0.015, 6, false]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.6} />
      </mesh>
    </group>
  );
}
