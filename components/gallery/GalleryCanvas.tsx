"use client";

import { Canvas } from "@react-three/fiber";
import { useCallback, useRef, useState } from "react";
import { GalleryScene } from "./GalleryScene";
import { GalleryUI } from "./GalleryUI";
import type { Project } from "./projects";
import { type Keys, useKeyboardControls } from "./useKeyboardControls";

export default function GalleryCanvas() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [nearbyProject, setNearbyProject] = useState<Project | null>(null);
	const [nearbyIndex, setNearbyIndex] = useState(-1);
	const [detailProject, setDetailProject] = useState<Project | null>(null);

	const nearbyRef = useRef<Project | null>(null);

	const handleToggleMenu = useCallback(() => {
		setMenuOpen((prev) => !prev);
		setDetailProject(null);
	}, []);

	const handleEscape = useCallback(() => {
		if (detailProject) {
			setDetailProject(null);
		} else {
			setMenuOpen((prev) => !prev);
		}
	}, [detailProject]);

	const handleEnter = useCallback(() => {
		if (menuOpen) return;
		if (nearbyRef.current) {
			setDetailProject(nearbyRef.current);
		}
	}, [menuOpen]);

	const handleNearbyProject = useCallback(
		(project: Project | null, index: number) => {
			nearbyRef.current = project;
			setNearbyProject(project);
			setNearbyIndex(index);
		},
		[],
	);

	const handleCloseDetail = useCallback(() => {
		setDetailProject(null);
	}, []);

	const keysRef = useKeyboardControls(handleEscape, handleEnter);

	return (
		<div className="gallery-container">
			<Canvas
				shadows
				camera={{
					fov: 60,
					near: 0.1,
					far: 100,
					position: [0, 2.5, 14],
				}}
				gl={{ antialias: true, alpha: false }}
				style={{ background: "#87ceeb" }}
			>
				<fog attach="fog" args={["#ece8e1", 15, 35]} />
				<GalleryScene
					keysRef={keysRef as React.RefObject<Keys>}
					nearbyIndex={nearbyIndex}
					onNearbyProject={handleNearbyProject}
					menuOpen={menuOpen || detailProject !== null}
				/>
			</Canvas>

			<GalleryUI
				menuOpen={menuOpen}
				onToggleMenu={handleToggleMenu}
				nearbyProject={nearbyProject}
				detailProject={detailProject}
				onCloseDetail={handleCloseDetail}
			/>
		</div>
	);
}
