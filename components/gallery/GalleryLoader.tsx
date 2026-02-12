"use client";

import dynamic from "next/dynamic";

const GalleryCanvas = dynamic(
	() => import("@/components/gallery/GalleryCanvas"),
	{ ssr: false },
);

export function GalleryLoader() {
	return <GalleryCanvas />;
}
