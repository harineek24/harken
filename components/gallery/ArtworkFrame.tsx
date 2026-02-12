"use client";

import { Text } from "@react-three/drei";
import type { Project } from "./projects";

type ArtworkFrameProps = {
  project: Project;
  position: [number, number, number];
  rotation: [number, number, number];
  isNearby: boolean;
};

export function ArtworkFrame({
  project,
  position,
  rotation,
  isNearby,
}: ArtworkFrameProps) {
  const frameWidth = 1.8;
  const frameHeight = 1.4;
  const frameDepth = 0.08;
  const borderWidth = 0.1;

  return (
    <group position={position} rotation={rotation}>
      {/* Outer frame (black border) */}
      <mesh castShadow>
        <boxGeometry
          args={[
            frameWidth + borderWidth * 2,
            frameHeight + borderWidth * 2,
            frameDepth,
          ]}
        />
        <meshStandardMaterial color="#111111" />
      </mesh>

      {/* White mat inside frame */}
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry
          args={[frameWidth + 0.04, frameHeight + 0.04, frameDepth]}
        />
        <meshStandardMaterial color="#f5f5f0" />
      </mesh>

      {/* Canvas / painting surface */}
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[frameWidth - 0.1, frameHeight - 0.1]} />
        <meshStandardMaterial color={project.color} />
      </mesh>

      {/* Project title on canvas */}
      <Text
        position={[0, 0.15, 0.03]}
        fontSize={0.12}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={frameWidth - 0.3}
        font="/fonts/inter-bold.woff"
      >
        {project.title}
      </Text>

      {/* Subtitle */}
      <Text
        position={[0, -0.05, 0.03]}
        fontSize={0.07}
        color={project.accentColor}
        anchorX="center"
        anchorY="middle"
        maxWidth={frameWidth - 0.3}
      >
        {project.subtitle}
      </Text>

      {/* Decorative accent line */}
      <mesh position={[0, -0.18, 0.025]}>
        <planeGeometry args={[0.6, 0.005]} />
        <meshStandardMaterial color={project.accentColor} />
      </mesh>

      {/* Glow effect when nearby */}
      {isNearby && (
        <pointLight
          position={[0, 0, 0.5]}
          intensity={0.5}
          distance={2}
          color={project.accentColor}
        />
      )}

      {/* Small label below frame */}
      <Text
        position={[0, -(frameHeight / 2 + borderWidth + 0.15), 0.01]}
        fontSize={0.05}
        color="#666666"
        anchorX="center"
        anchorY="middle"
      >
        {project.title}
      </Text>
    </group>
  );
}
