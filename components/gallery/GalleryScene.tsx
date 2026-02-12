"use client";

import { Text } from "@react-three/drei";
import { ArtworkFrame } from "./ArtworkFrame";
import { Stanchion } from "./Stanchion";
import { Character } from "./Character";
import { projects, artworkPositions, type Project } from "./projects";
import type { Keys } from "./useKeyboardControls";

type GallerySceneProps = {
  keysRef: React.RefObject<Keys>;
  nearbyIndex: number;
  onNearbyProject: (project: Project | null, index: number) => void;
  menuOpen: boolean;
};

const ROOM_WIDTH = 8;
const ROOM_HEIGHT = 5;
const ROOM_LENGTH = 28;

function FloorMarkers() {
  const markers: [number, number][] = [
    [0, -8],
    [0, -2],
    [0, 4],
    [0, 10],
    [-1.5, -5],
    [1.5, 1],
    [-1.5, 7],
  ];

  return (
    <group>
      {markers.map(([x, z], i) => (
        <mesh
          key={i}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[x, 0.01, z]}
        >
          <circleGeometry args={[0.3, 24]} />
          <meshStandardMaterial
            color="#d0d0d0"
            transparent
            opacity={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

function CeilingLights() {
  const positions: [number, number, number][] = [
    [0, ROOM_HEIGHT - 0.05, -8],
    [0, ROOM_HEIGHT - 0.05, -1],
    [0, ROOM_HEIGHT - 0.05, 6],
  ];

  return (
    <group>
      {positions.map((pos, i) => (
        <group key={i} position={pos}>
          {/* Light fixture box */}
          <mesh>
            <boxGeometry args={[1.5, 0.08, 0.6]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#ffffff"
              emissiveIntensity={0.5}
            />
          </mesh>
          {/* Actual light */}
          <rectAreaLight
            width={1.4}
            height={0.5}
            intensity={3}
            position={[0, -0.1, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            color="#fff5e6"
          />
        </group>
      ))}
    </group>
  );
}

function BackWall() {
  return (
    <group position={[0, ROOM_HEIGHT / 2, -ROOM_LENGTH / 2 + 0.1]}>
      {/* Title */}
      <Text
        position={[0, 0.8, 0.05]}
        fontSize={0.5}
        color="#1a1a1a"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.15}
      >
        Hark Back
      </Text>

      {/* Subtitle */}
      <Text
        position={[0, 0.2, 0.05]}
        fontSize={0.15}
        color="#666666"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.3}
      >
        projects
      </Text>

      {/* Divider line */}
      <mesh position={[0, -0.05, 0.05]}>
        <planeGeometry args={[2, 0.003]} />
        <meshStandardMaterial color="#999999" />
      </mesh>

      {/* Description */}
      <Text
        position={[0, -0.5, 0.05]}
        fontSize={0.08}
        color="#888888"
        anchorX="center"
        anchorY="middle"
        maxWidth={3}
        textAlign="center"
        lineHeight={1.6}
      >
        {
          "Welcome to the gallery.\nExplore the space and discover projects.\nUse arrow keys to move, Enter to see details."
        }
      </Text>
    </group>
  );
}

export function GalleryScene({
  keysRef,
  nearbyIndex,
  onNearbyProject,
  menuOpen,
}: GallerySceneProps) {
  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.3} color="#f5f5f5" />

      {/* Directional light (sun-like from the opening) */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={0.4}
        color="#87ceeb"
        castShadow
      />

      {/* Sky plane (visible through opening) */}
      <mesh position={[6, ROOM_HEIGHT / 2, 5]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[12, ROOM_HEIGHT + 2]} />
        <meshBasicMaterial color="#87ceeb" />
      </mesh>

      {/* Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[ROOM_WIDTH, ROOM_LENGTH]} />
        <meshStandardMaterial color="#e8e4de" roughness={0.9} />
      </mesh>

      {/* Floor markers */}
      <FloorMarkers />

      {/* Ceiling */}
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, ROOM_HEIGHT, 0]}
      >
        <planeGeometry args={[ROOM_WIDTH, ROOM_LENGTH]} />
        <meshStandardMaterial color="#d4d0ca" roughness={0.95} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-ROOM_WIDTH / 2, ROOM_HEIGHT / 2, 0]}>
        <planeGeometry args={[ROOM_LENGTH, ROOM_HEIGHT]} />
        <meshStandardMaterial color="#ece8e1" roughness={0.95} />
        <mesh rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[ROOM_LENGTH, ROOM_HEIGHT]} />
          <meshStandardMaterial color="#ece8e1" roughness={0.95} />
        </mesh>
      </mesh>

      {/* Right wall - partial (with opening for sky) */}
      {/* Back section */}
      <mesh position={[ROOM_WIDTH / 2, ROOM_HEIGHT / 2, -5]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[18, ROOM_HEIGHT]} />
        <meshStandardMaterial color="#ece8e1" roughness={0.95} />
      </mesh>
      {/* Front section (leaves a gap for sky) */}
      <mesh position={[ROOM_WIDTH / 2, ROOM_HEIGHT / 2, 10]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[8, ROOM_HEIGHT]} />
        <meshStandardMaterial color="#ece8e1" roughness={0.95} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, ROOM_HEIGHT / 2, -ROOM_LENGTH / 2]}>
        <planeGeometry args={[ROOM_WIDTH, ROOM_HEIGHT]} />
        <meshStandardMaterial color="#f0ece6" roughness={0.95} />
      </mesh>

      {/* Front wall (entry) - just a thin section on each side */}
      <mesh position={[-2.5, ROOM_HEIGHT / 2, ROOM_LENGTH / 2]}>
        <planeGeometry args={[3, ROOM_HEIGHT]} />
        <meshStandardMaterial color="#ece8e1" roughness={0.95} />
      </mesh>
      <mesh position={[2.5, ROOM_HEIGHT / 2, ROOM_LENGTH / 2]}>
        <planeGeometry args={[3, ROOM_HEIGHT]} />
        <meshStandardMaterial color="#ece8e1" roughness={0.95} />
      </mesh>

      {/* Back wall text */}
      <BackWall />

      {/* Ceiling lights */}
      <CeilingLights />

      {/* Artwork */}
      {projects.map((project, i) => {
        if (i >= artworkPositions.length) return null;
        const { position, rotation } = artworkPositions[i];
        return (
          <ArtworkFrame
            key={project.id}
            project={project}
            position={position}
            rotation={rotation}
            isNearby={nearbyIndex === i}
          />
        );
      })}

      {/* Stanchion barriers */}
      {/* Left side */}
      <Stanchion
        start={[-2.8, 0, -11]}
        end={[-2.8, 0, 13]}
        postCount={6}
      />
      {/* Right side */}
      <Stanchion
        start={[2.8, 0, -8]}
        end={[2.8, 0, 10]}
        postCount={5}
      />

      {/* Character */}
      <Character
        keysRef={keysRef}
        onNearbyProject={onNearbyProject}
        projects={projects}
        menuOpen={menuOpen}
      />
    </>
  );
}
