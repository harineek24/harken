"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { Project } from "./projects";

type GalleryUIProps = {
	menuOpen: boolean;
	onToggleMenu: () => void;
	nearbyProject: Project | null;
	detailProject: Project | null;
	onCloseDetail: () => void;
};

function ControlHUD({ nearbyProject }: { nearbyProject: Project | null }) {
	return (
		<div className="gallery-hud">
			<div className="hud-section">
				<span className="hud-label">Move</span>
				<div className="hud-keys">
					<kbd>↑</kbd>
					<div className="hud-keys-row">
						<kbd>←</kbd>
						<kbd>↓</kbd>
						<kbd>→</kbd>
					</div>
				</div>
			</div>

			<div className="hud-section">
				<span className="hud-label">Open/Close Menu</span>
				<div className="hud-keys">
					<kbd>ESC</kbd>
				</div>
			</div>

			<div className="hud-section">
				<span className="hud-label">See details</span>
				<div className="hud-keys">
					<kbd className={nearbyProject ? "hud-key-active" : ""}>↵</kbd>
				</div>
				{nearbyProject && (
					<motion.span
						className="hud-nearby-hint"
						initial={{ opacity: 0, y: 5 }}
						animate={{ opacity: 1, y: 0 }}
					>
						{nearbyProject.title}
					</motion.span>
				)}
			</div>
		</div>
	);
}

function MenuPanel({ onClose }: { onClose: () => void }) {
	return (
		<motion.div
			className="gallery-menu-overlay"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
		>
			<motion.div
				className="gallery-menu-content"
				initial={{ scale: 0.9, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				exit={{ scale: 0.9, opacity: 0 }}
				transition={{ duration: 0.3, delay: 0.1 }}
			>
				<h1 className="menu-title">Hark Back</h1>
				<p className="menu-subtitle">portfolio gallery</p>

				<div className="menu-divider" />

				<nav className="menu-nav">
					<button type="button" onClick={onClose} className="menu-link">
						Resume Exploring
					</button>
					<a
						href="https://github.com/harineek24"
						target="_blank"
						rel="noopener noreferrer"
						className="menu-link"
					>
						GitHub
					</a>
				</nav>

				<div className="menu-divider" />

				<p className="menu-footer">
					Use arrow keys to explore the gallery.
					<br />
					Walk up to a painting and press Enter for details.
				</p>

				<button type="button" onClick={onClose} className="menu-close-btn">
					Press ESC or click to close
				</button>
			</motion.div>
		</motion.div>
	);
}

function DetailModal({
	project,
	onClose,
}: {
	project: Project;
	onClose: () => void;
}) {
	return (
		<motion.div
			className="gallery-detail-overlay"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			onClick={onClose}
		>
			<motion.div
				className="gallery-detail-panel"
				initial={{ x: 60, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				exit={{ x: 60, opacity: 0 }}
				transition={{ type: "spring", damping: 25, stiffness: 200 }}
				onClick={(e) => e.stopPropagation()}
			>
				{/* Color swatch */}
				<div
					className="detail-swatch"
					style={{ backgroundColor: project.color }}
				>
					<span className="detail-swatch-title">{project.title}</span>
					<span className="detail-swatch-subtitle">{project.subtitle}</span>
				</div>

				<div className="detail-body">
					<p className="detail-description">{project.description}</p>

					<div className="detail-tech">
						{project.tech.map((t) => (
							<span key={t} className="detail-tech-tag">
								{t}
							</span>
						))}
					</div>

					<div className="detail-links">
						{project.github && (
							<a
								href={project.github}
								target="_blank"
								rel="noopener noreferrer"
								className="detail-link"
							>
								GitHub →
							</a>
						)}
						{project.url && (
							<a
								href={project.url}
								target="_blank"
								rel="noopener noreferrer"
								className="detail-link"
							>
								Live Demo →
							</a>
						)}
					</div>
				</div>

				<button type="button" onClick={onClose} className="detail-close">
					✕
				</button>
			</motion.div>
		</motion.div>
	);
}

export function GalleryUI({
	menuOpen,
	onToggleMenu,
	nearbyProject,
	detailProject,
	onCloseDetail,
}: GalleryUIProps) {
	return (
		<>
			{/* Menu button top-right */}
			<button type="button" className="gallery-menu-btn" onClick={onToggleMenu}>
				MENU
			</button>

			{/* Bottom HUD */}
			<ControlHUD nearbyProject={nearbyProject} />

			{/* Menu overlay */}
			<AnimatePresence>
				{menuOpen && <MenuPanel onClose={onToggleMenu} />}
			</AnimatePresence>

			{/* Detail modal */}
			<AnimatePresence>
				{detailProject && (
					<DetailModal project={detailProject} onClose={onCloseDetail} />
				)}
			</AnimatePresence>
		</>
	);
}
