"use client";

import { useCallback, useEffect, useRef } from "react";

export type Keys = {
	forward: boolean;
	backward: boolean;
	left: boolean;
	right: boolean;
	escape: boolean;
	enter: boolean;
};

export function useKeyboardControls(onEscape: () => void, onEnter: () => void) {
	const keys = useRef<Keys>({
		forward: false,
		backward: false,
		left: false,
		right: false,
		escape: false,
		enter: false,
	});

	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			switch (e.code) {
				case "ArrowUp":
				case "KeyW":
					keys.current.forward = true;
					e.preventDefault();
					break;
				case "ArrowDown":
				case "KeyS":
					keys.current.backward = true;
					e.preventDefault();
					break;
				case "ArrowLeft":
				case "KeyA":
					keys.current.left = true;
					e.preventDefault();
					break;
				case "ArrowRight":
				case "KeyD":
					keys.current.right = true;
					e.preventDefault();
					break;
				case "Escape":
					onEscape();
					break;
				case "Enter":
					onEnter();
					break;
			}
		},
		[onEscape, onEnter],
	);

	const handleKeyUp = useCallback((e: KeyboardEvent) => {
		switch (e.code) {
			case "ArrowUp":
			case "KeyW":
				keys.current.forward = false;
				break;
			case "ArrowDown":
			case "KeyS":
				keys.current.backward = false;
				break;
			case "ArrowLeft":
			case "KeyA":
				keys.current.left = false;
				break;
			case "ArrowRight":
			case "KeyD":
				keys.current.right = false;
				break;
		}
	}, []);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, [handleKeyDown, handleKeyUp]);

	return keys;
}
