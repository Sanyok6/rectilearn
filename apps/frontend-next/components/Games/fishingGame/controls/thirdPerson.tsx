// import { useThree } from "@react-three/fiber";
import { useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// import type * as THREE from "three";
import { Vector2, Vector3 } from "three";

export default function ThirdPerson({
	object,
	rotateSpeed = 1.0,
	camBack,
	zooming,
	camera,
}: {
	object: React.RefObject<THREE.Group>;
	rotateSpeed?: number;
	camBack: boolean;
	zooming: number;
	camera: React.RefObject<THREE.PerspectiveCamera>;
}) {
	const idealOffset = useMemo(() => ({ x: 0, y: 0, z: -5 }), []);
	const [isLocked, setLocked] = useState<boolean>(true);
	const [isOrbiting, setOrbiting] = useState<boolean>(false);
	const [pointerDown, setPointerDown] = useState<boolean>(false);
	const [zoom, setZoom] = useState<number>(zooming);

	const rotateStart = useMemo(() => new Vector2(), []);
	const rotateEnd = useMemo(() => new Vector2(), []);
	const rotateDelta = useMemo(() => new Vector2(), []);

	const cameraControls = useMemo(
		() => ({
			theta: 0,
			phi: 0,
			radius: idealOffset.z,
		}),
		[idealOffset]
	);

	const { gl } = useThree();
	const domElement = gl.domElement;

	const lock = useCallback(() => domElement.requestPointerLock(), [domElement]);
	// const unlock = useCallback(() => document.exitPointerLock(), []);

	useEffect(() => {
		lock();
		document.addEventListener("click", lock);
		return () => document.removeEventListener("click", lock);
	}, [lock]);

	useEffect(() => {
		if (zoom !== -1) {
			if (zoom < 1) {
				setZoom(0);
				// setPlock(true);
			} else {
				idealOffset.z = -zoom;
			}
		}
	}, [zoom, setZoom, idealOffset, lock]);

	const onWheel = useCallback(
		(event: WheelEvent) => {
			idealOffset.z = Math.min(-2, idealOffset.z - Math.round(event.deltaY / 12));
		},
		[idealOffset]
	);

	const rotatePointer = useCallback(
		(x: number, y: number) => {
			if (isLocked) return;
			if (pointerDown && !isOrbiting) {
				const distCheck = Math.sqrt(Math.pow(x - rotateStart.x, 2) + Math.pow(y - rotateStart.y, 2)) > 10;
				if (distCheck) {
					setOrbiting(true);
				}
			}
			if (!isOrbiting) return;
			rotateEnd.set(x, y);
			rotateDelta.subVectors(rotateEnd, rotateStart).multiplyScalar(rotateSpeed);
			rotateStart.copy(rotateEnd);
			cameraControls.theta -= rotateDelta.x * 0.01;
			cameraControls.phi -= rotateDelta.y * 0.01;

			cameraControls.phi = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, cameraControls.phi));
		},
		[cameraControls, isLocked, isOrbiting, pointerDown, rotateDelta, rotateEnd, rotateSpeed, rotateStart]
	);

	const onPointerMove = useCallback(
		(event: PointerEvent) => {
			const { x, y } = event;
			rotatePointer(x, y);
		},
		[rotatePointer]
	);

	const onMouseMove = useCallback(
		(event: MouseEvent) => {
			if (!isLocked) return;
			if (!camera.current) return;
			const { movementX, movementY } = event;
			cameraControls.phi -= movementY * 0.02;
			cameraControls.theta -= movementX * 0.02;
			cameraControls.phi = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, cameraControls.phi));
		},
		[cameraControls, isLocked, camera]
	);

	const onKeyDown = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === "ArrowLeft") {
				cameraControls.theta += rotateSpeed * 0.1;
			} else if (event.key === "ArrowRight") {
				cameraControls.theta -= rotateSpeed * 0.1;
			} else if (event.key === "ArrowUp") {
				cameraControls.phi -= rotateSpeed * 0.1;
			} else if (event.key === "ArrowDown") {
				cameraControls.phi += rotateSpeed * 0.1;
			}
		},
		[cameraControls, rotateSpeed]
	);

	const onPointerDown = useCallback(
		(event: PointerEvent) => {
			const { x, y } = event;
			rotateStart.set(x, y);
			setPointerDown(true);
		},
		[rotateStart]
	);

	const onPointerUp = useCallback(() => {
		rotateDelta.set(0, 0);
		setPointerDown(false);
		setOrbiting(false);
	}, [rotateDelta]);

	const onPointerLeave = useCallback(() => {
		rotateDelta.set(0, 0);
		setPointerDown(false);
		setOrbiting(false);
	}, [rotateDelta]);

	const onPointerlockChange = useCallback(() => {
		if (document.pointerLockElement === domElement) {
			setLocked(true);
		} else {
			setLocked(false);
		}
	}, [domElement]);

	const ran = useRef<boolean>(false);

	useEffect(() => {
		if (!domElement) return;
		if (ran.current) return;
		ran.current = true;
		// console.log("ran");
		domElement.addEventListener("pointerdown", onPointerDown);
		domElement.addEventListener("pointermove", onPointerMove);
		domElement.addEventListener("pointerleave", onPointerLeave);
		domElement.addEventListener("pointerup", onPointerUp);
		domElement.addEventListener("wheel", onWheel);
		domElement.ownerDocument.addEventListener("pointerlockchange", onPointerlockChange);
		window.addEventListener("keydown", onKeyDown);
		return () => {
			domElement.removeEventListener("pointerdown", onPointerDown);
			domElement.removeEventListener("pointermove", onPointerMove);
			domElement.removeEventListener("pointerleave", onPointerLeave);
			domElement.removeEventListener("pointerup", onPointerUp);
			domElement.removeEventListener("wheel", onWheel);
			domElement.ownerDocument.removeEventListener("pointerlockchange", onPointerlockChange);
			domElement.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("keydown", onKeyDown);
			setLocked(true);
			ran.current = false;
		};
	}, [domElement, onPointerDown, onPointerMove, onPointerLeave, onPointerUp, onWheel, onPointerlockChange, onKeyDown, onMouseMove]);

	useFrame(() => {
		if (!object.current || !camera.current) return;
		const target = new Vector3().setFromSphericalCoords(
			idealOffset.z,
			Math.PI / 2 - cameraControls.phi,
			cameraControls.theta + (camBack ? Math.PI : 0)
		);

		// console.log(cameraControls);

		// Update camera position
		camera.current.position.copy(target.clone().add(object.current.position));

		// Update camera lookAt direction
		const lookAtDirection = target.clone().normalize().add(object.current.position);
		// console.log("Looking at", lookAtDirection);
		camera.current.lookAt(lookAtDirection);
	});

	return <></>;
}
