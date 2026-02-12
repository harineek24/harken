"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { Keys } from "./useKeyboardControls";
import { artworkPositions, type Project } from "./projects";

type CharacterProps = {
  keysRef: React.RefObject<Keys>;
  onNearbyProject: (project: Project | null, index: number) => void;
  projects: Project[];
  menuOpen: boolean;
};

const MOVE_SPEED = 0.06;
const ROTATE_SPEED = 0.035;
const ROOM_HALF_WIDTH = 3.2;
const ROOM_MIN_Z = -13;
const ROOM_MAX_Z = 13;
const PROXIMITY_THRESHOLD = 2.5;

export function Character({
  keysRef,
  onNearbyProject,
  projects,
  menuOpen,
}: CharacterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const rotationRef = useRef(0); // Y-axis rotation (facing direction)
  const { camera } = useThree();
  const lastNearbyIndex = useRef(-1);

  useFrame(() => {
    if (!groupRef.current || !keysRef.current || menuOpen) return;

    const keys = keysRef.current;

    // Rotate character
    if (keys.left) rotationRef.current += ROTATE_SPEED;
    if (keys.right) rotationRef.current -= ROTATE_SPEED;

    // Move in facing direction
    const direction = new THREE.Vector3(0, 0, -1);
    direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotationRef.current);

    const pos = groupRef.current.position;

    if (keys.forward) {
      pos.x += direction.x * MOVE_SPEED;
      pos.z += direction.z * MOVE_SPEED;
    }
    if (keys.backward) {
      pos.x -= direction.x * MOVE_SPEED;
      pos.z -= direction.z * MOVE_SPEED;
    }

    // Clamp to room bounds
    pos.x = Math.max(-ROOM_HALF_WIDTH, Math.min(ROOM_HALF_WIDTH, pos.x));
    pos.z = Math.max(ROOM_MIN_Z, Math.min(ROOM_MAX_Z, pos.z));

    // Apply rotation
    groupRef.current.rotation.y = rotationRef.current;

    // Camera follow (third-person, behind and above)
    const cameraOffset = new THREE.Vector3(0, 2.5, 4);
    cameraOffset.applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      rotationRef.current
    );
    const targetCamPos = new THREE.Vector3(
      pos.x + cameraOffset.x,
      pos.y + cameraOffset.y,
      pos.z + cameraOffset.z
    );

    camera.position.lerp(targetCamPos, 0.08);

    // Camera look at character position (slightly ahead)
    const lookTarget = new THREE.Vector3(
      pos.x - direction.x * 2,
      1.5,
      pos.z - direction.z * 2
    );
    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    camera.lookAt(lookTarget);

    // Proximity detection for artwork
    let closestIndex = -1;
    let closestDist = PROXIMITY_THRESHOLD;

    for (let i = 0; i < artworkPositions.length; i++) {
      const artPos = artworkPositions[i].position;
      const dx = pos.x - artPos[0];
      const dz = pos.z - artPos[2];
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = i;
      }
    }

    if (closestIndex !== lastNearbyIndex.current) {
      lastNearbyIndex.current = closestIndex;
      if (closestIndex >= 0 && closestIndex < projects.length) {
        onNearbyProject(projects[closestIndex], closestIndex);
      } else {
        onNearbyProject(null, -1);
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 10]}>
      {/* Body */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <capsuleGeometry args={[0.15, 0.35, 4, 8]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.85, 0]} castShadow>
        <sphereGeometry args={[0.14, 12, 12]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.7} />
      </mesh>

      {/* Hair (curly/afro-like - sphere slightly bigger than head) */}
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshStandardMaterial color="#111111" roughness={1} />
      </mesh>

      {/* Left leg */}
      <mesh position={[-0.08, 0.12, 0]} castShadow>
        <capsuleGeometry args={[0.05, 0.15, 4, 6]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>

      {/* Right leg */}
      <mesh position={[0.08, 0.12, 0]} castShadow>
        <capsuleGeometry args={[0.05, 0.15, 4, 6]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
      </mesh>
    </group>
  );
}
