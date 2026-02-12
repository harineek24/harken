export type Project = {
	id: string;
	title: string;
	subtitle: string;
	description: string;
	color: string;
	accentColor: string;
	tech: string[];
	url?: string;
	github?: string;
};

export const projects: Project[] = [
	{
		id: "harken",
		title: "Harken",
		subtitle: "AI Chatbot",
		description:
			"An AI-powered chatbot with perspective-checking capabilities. Built with Next.js, Vercel AI SDK, and Grok models. Features multimodal input, rich text editing, document artifacts, and real-time streaming responses.",
		color: "#1a1a2e",
		accentColor: "#e94560",
		tech: ["Next.js", "React", "TypeScript", "Vercel AI SDK", "PostgreSQL"],
		github: "https://github.com/harineek24/harken",
	},
	{
		id: "project-alpha",
		title: "Project Alpha",
		subtitle: "Web Application",
		description:
			"A modern web application showcasing responsive design and dynamic interactions. Full-stack development with real-time features.",
		color: "#0f3460",
		accentColor: "#16213e",
		tech: ["React", "Node.js", "MongoDB"],
	},
	{
		id: "project-beta",
		title: "Project Beta",
		subtitle: "Mobile App",
		description:
			"Cross-platform mobile application with native performance. Intuitive user experience with offline-first architecture.",
		color: "#533483",
		accentColor: "#2b1055",
		tech: ["React Native", "Firebase", "TypeScript"],
	},
	{
		id: "project-gamma",
		title: "Project Gamma",
		subtitle: "Data Visualization",
		description:
			"Interactive data visualization dashboard for complex datasets. Real-time charts and dynamic filtering capabilities.",
		color: "#1b4332",
		accentColor: "#2d6a4f",
		tech: ["D3.js", "Python", "Flask"],
	},
	{
		id: "project-delta",
		title: "Project Delta",
		subtitle: "API Platform",
		description:
			"Scalable RESTful API platform with comprehensive documentation. Microservices architecture with automated testing.",
		color: "#3c1642",
		accentColor: "#7b2d8e",
		tech: ["Go", "Docker", "PostgreSQL"],
	},
	{
		id: "project-epsilon",
		title: "Project Epsilon",
		subtitle: "Design System",
		description:
			"A comprehensive design system and component library. Accessible, themeable, and well-documented UI components.",
		color: "#1a1a1a",
		accentColor: "#4a4a4a",
		tech: ["Figma", "Storybook", "CSS"],
	},
	{
		id: "project-zeta",
		title: "Project Zeta",
		subtitle: "Machine Learning",
		description:
			"Machine learning pipeline for natural language processing. Model training, evaluation, and deployment infrastructure.",
		color: "#2c2c54",
		accentColor: "#474787",
		tech: ["Python", "PyTorch", "AWS"],
	},
];

// Artwork positions in the gallery (world coordinates)
// Left wall: x = -3.8, Right wall: x = 3.8
// Spaced along z-axis
export const artworkPositions: {
	position: [number, number, number];
	rotation: [number, number, number];
	wall: "left" | "right";
}[] = [
	// Left wall (facing right, rotated +90 on Y)
	{ position: [-3.85, 2.2, -8], rotation: [0, Math.PI / 2, 0], wall: "left" },
	{ position: [-3.85, 2.2, -2], rotation: [0, Math.PI / 2, 0], wall: "left" },
	{ position: [-3.85, 2.2, 4], rotation: [0, Math.PI / 2, 0], wall: "left" },
	{ position: [-3.85, 2.2, 10], rotation: [0, Math.PI / 2, 0], wall: "left" },
	// Right wall (facing left, rotated -90 on Y)
	{
		position: [3.85, 2.2, -5],
		rotation: [0, -Math.PI / 2, 0],
		wall: "right",
	},
	{
		position: [3.85, 2.2, 1],
		rotation: [0, -Math.PI / 2, 0],
		wall: "right",
	},
	{
		position: [3.85, 2.2, 7],
		rotation: [0, -Math.PI / 2, 0],
		wall: "right",
	},
];
