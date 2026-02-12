import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
	title: "Hark Back",
	description:
		"A 3D virtual art gallery portfolio. Walk through the gallery and explore projects.",
};

export const viewport = {
	maximumScale: 1,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			className={`${GeistSans.variable} ${GeistMono.variable}`}
			lang="en"
			suppressHydrationWarning
		>
			<body className="antialiased">{children}</body>
		</html>
	);
}
