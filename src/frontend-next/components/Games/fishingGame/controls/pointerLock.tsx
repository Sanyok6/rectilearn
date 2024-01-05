import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Root from "../root";
import { useFrame, useThree } from "@react-three/fiber";
import { Euler, Quaternion } from "three";

const _PI_2 = Math.PI / 2;

export default function PointerLock({
	minPolarAngle = 1.0,
	maxPolarAngle = Math.PI,
	pointerSpeed = 1.0,
	object,
	plock,
	setPlock,
	zooming,
	camBack,
	camera,
}: {
	minPolarAngle?: number;
	maxPolarAngle?: number;
	pointerSpeed?: number;
	object: React.RefObject<THREE.Group>;
	plock: boolean;
	setPlock: React.Dispatch<React.SetStateAction<boolean>>;
	zooming: number;
	camBack: boolean;
	camera: React.RefObject<THREE.PerspectiveCamera>;
}) {
	const [zoom, setZoom] = useState<number>(zooming);
	const [isLocked, setLocked] = useState<boolean>(false);

	const { gl } = useThree();
	const domElement = gl.domElement;

	const _euler = useMemo(() => new Euler(0, 0, 0, "YXZ"), []);

	const lock = useCallback(() => domElement.requestPointerLock(), [domElement]);
	const unlock = useCallback(() => document.exitPointerLock(), []);

	const ran = useRef<boolean>(false);

	const [oldCam, setOldCam] = useState<boolean>(camBack);

	useEffect(() => {
		const new_value = camBack;
		if (new_value != oldCam && camera.current) {
			// console.log("Ran");
			if (!isLocked) return;
			if (!camera) return;
			const flipRotation = new Quaternion().setFromAxisAngle(camera.current.up, Math.PI);
			camera.current.quaternion.multiplyQuaternions(flipRotation, camera.current.quaternion);
			setOldCam(new_value);
		}
	}, [camBack, camera, isLocked, oldCam]);

	const [prev, setPrev] = useState<[number, number] | null>(null);

	const onTouchEnd = useCallback((_: TouchEvent) => {
		setPrev(null);
	}, []);

	const onTouchMove = useCallback(
		(event: TouchEvent) => {
			// console.log(event.touches)
			// event.preventDefault();
			if (!camera.current) return;
			const touch = event.touches[event.touches.length - 1];
			let movementX = 0,
				movementY = 0;
			if (prev) {
				// be aware that these only store the movement of the first touch in the touches array
				movementX = touch.pageX - prev[0];
				movementY = touch.pageY - prev[1];
			}

			setPrev([touch.pageX, touch.pageY]);
			// console.log(movementX, movementY)
			_euler.setFromQuaternion(camera.current.quaternion);
			_euler.y -= movementX * 0.02 * pointerSpeed;
			_euler.x -= movementY * 0.02 * pointerSpeed;
			_euler.x = Math.max(_PI_2 - maxPolarAngle, Math.min(_PI_2 - minPolarAngle, _euler.x));
			camera.current.quaternion.setFromEuler(_euler);
		},
		[_euler, camera, maxPolarAngle, minPolarAngle, pointerSpeed, prev]
	);

	const onWheel = useCallback(
		(event: WheelEvent) => {
			// console.log(event.deltaY / 16);
			// console.log(idealOffset.z)
			if (Math.floor(event.deltaY / 32) > 0) {
				// dispatch("unlock");
				unlock();
				setLocked(false);
				setPlock(false);
			}
		},
		[unlock, setPlock]
	);

	const onMouseMove = useCallback(
		(event: MouseEvent) => {
			if (!isLocked) return;
            // console.log(camera.current);
			if (!camera.current) return;
			const { movementX, movementY } = event;
			_euler.setFromQuaternion(camera.current.quaternion);
            // console.log("changing", _euler);
			_euler.y -= movementX * 0.002 * pointerSpeed;
			_euler.x -= movementY * 0.002 * pointerSpeed;
			_euler.x = Math.max(_PI_2 - maxPolarAngle, Math.min(_PI_2 - minPolarAngle, _euler.x));
			camera.current.quaternion.setFromEuler(_euler);
		},
		[_euler, isLocked, maxPolarAngle, minPolarAngle, pointerSpeed, camera]
	);

	const onPointerlockChange = useCallback(() => {
        // console.log("OK lock");
		if (document.pointerLockElement === domElement) {
			// dispatch("lock");
            // console.log("LOCKED");
			setLocked(true);
		} else {
			// dispatch("unlock");
			setLocked(false);
		}
	}, [domElement]);

	useEffect(() => {
		if (ran.current) return;
		if (!domElement) return;
        // console.log("added event listeners");
		ran.current = true;
		domElement.addEventListener("mousemove", onMouseMove);
		domElement.addEventListener("touchmove", onTouchMove);
		domElement.addEventListener("wheel", onWheel);
		domElement.addEventListener("click", lock);
		domElement.addEventListener("touchend", onTouchEnd);
		domElement.ownerDocument.addEventListener("pointerlockchange", onPointerlockChange);
		return () => {
			domElement.removeEventListener("mousemove", onMouseMove);
			domElement.removeEventListener("touchmove", onTouchMove);
			domElement.removeEventListener("wheel", onWheel);
			domElement.removeEventListener("click", lock);
			domElement.removeEventListener("touchend", onTouchEnd);
			domElement.ownerDocument.removeEventListener("pointerlockchange", onPointerlockChange);
            ran.current = false;
		};
	}, [domElement, lock, onMouseMove, onPointerlockChange, onTouchEnd, onTouchMove, onWheel]);

	useEffect(() => {
		if (zoom !== -1) {
			zoom > 1 && setPlock(false);
		}
	}, [zoom, setPlock]);

	useFrame(() => {
		if (!camera.current || !object.current) return;
		camera.current.position.copy(object.current.position);
	});

	return (
		<Root>
			<svg
				// className="flex justify-center items-center h-screen z-[5]"
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
					zIndex: "5",
				}}
				enableBackground="new 0 0 50 50"
				height="50px"
				id="Layer_1"
				version="1.1"
				viewBox="0 0 50 50"
				width="50px"
				xmlSpace="preserve"
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
			>
				<rect fill="none" height="50" width="50" />
				<line fill="none" stroke="#ffffff" strokeMiterlimit="10" strokeWidth="2" x1="9" x2="41" y1="25" y2="25" />
				<line fill="none" stroke="#ffffff" strokeMiterlimit="10" strokeWidth="2" x1="25" x2="25" y1="9" y2="41" />
			</svg>
		</Root>
	);
}
