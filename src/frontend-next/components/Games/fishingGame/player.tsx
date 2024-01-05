import { PerspectiveCamera } from "@react-three/drei";
import { useEffect, useRef, useState, useContext, useCallback } from "react";
import ThirdPerson from "./controls/thirdPerson";
import { BallCollider, CapsuleCollider, type RapierRigidBody, RigidBody, interactionGroups } from "@react-three/rapier";
import { GameContext } from ".";
import { BoxGeometry, Euler, MeshBasicMaterial, Quaternion, Vector3 } from "three";
// import type * as THREE from "three";
import PointerLock from "./controls/pointerLock";
import { useFrame, useThree } from "@react-three/fiber";

const speed = 0.6;

export default function Player() {
	const { playerPos, setDeath, setPlayerPos } = useContext(GameContext);
	const radius = 0.45;
	const height = 2;
	const [isPLOCK, setPLOCK] = useState<boolean>(false);
	const [zooming, setZooming] = useState<number>(-1);
	const [camBack, setCamBack] = useState<boolean>(false);
	const [ground, setGround] = useState<boolean>(false);
	const [mobile, setMobile] = useState<boolean>(false);
	const [forward, setForward] = useState<number>(0);
	const [backward, setBackward] = useState<number>(0);
	const [right, setRight] = useState<number>(0);
	const [left, setLeft] = useState<number>(0);
	const [shift, setShift] = useState<number>(0);
	// const [death, setDeath] = useState<boolean>(false);
	// const [structure, setStructure] = useState<boolean>(false);
	const capRef = useRef<THREE.Group | null>(null);
	const capsule = useRef<THREE.Group>(null);
	const cam = useRef<THREE.PerspectiveCamera>(null);
	const rigidBody = useRef<RapierRigidBody>(null);
	const model = useRef<THREE.Group>(null);

	const { gl } = useThree();

	const domElement = gl.domElement;

	useEffect(() => {
		if (capsule.current) {
			capRef.current = capsule.current;
		}
	}, [capsule]);

	useEffect(() => {
		if (!domElement && !mobile) return;
		if (isPLOCK) domElement.requestPointerLock();
	}, [isPLOCK, domElement, mobile]);

	useEffect(() => {
		// @ts-ignore
		(function (a) {
			if (
				/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
					a
				) ||
				/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
					a.substr(0, 4)
				)
			)
				setMobile(true);
			// @ts-ignore
		})(navigator.userAgent || navigator.vendor || window["opera"]);
	}, []);

	const t = new Vector3();

	useFrame((_, dt) => {
		// or death
		if (!rigidBody.current || !capsule.current || !cam.current || !model.current) return;

		const multi = shift ? 1 : 0.5;

		const cameraForward = new Vector3();
		const cameraRight = new Vector3();

		cam.current.getWorldDirection(cameraForward);
		cameraRight.crossVectors(cameraForward, new Vector3(0, 1, 0));

		cameraForward.y = 0;
		cameraRight.y = 0;

		cameraForward.normalize().multiplyScalar((forward - backward) * multi * speed);
		cameraRight.normalize().multiplyScalar((right - left) * multi * speed);
		console.log(forward - backward, right - left);
		// Normalize
		if (backward - forward && right - left) {
			t.x = (cameraForward.x + cameraRight.x) * 0.7;
			t.z = (cameraForward.z + cameraRight.z) * 0.7;
		} else {
			t.x = cameraForward.x + cameraRight.x;
			t.z = cameraForward.z + cameraRight.z;
		}

		const linvel = rigidBody.current.linvel();
		const pos = rigidBody.current.translation();

		// if (pos.y < -50) {
		//     pos.y = 2;
		//     linvel.y = 0;
		//     rigidBody.current.setTranslation(pos, false);
		// }

        // pos.y = pos.y - 2 * linvel.y * dt;
        pos.y = 0;
        rigidBody.current.setTranslation(pos, false);

		// t.y = linvel.y - 9.81 * dt;

		console.log("POS", pos);
		console.log("LV", linvel);
        console.log("T", t);

		rigidBody.current.setLinvel(t, true);

		// update linvel and pos
		const posArr: [number, number, number] = [Math.fround(pos.x), Math.fround(pos.y), Math.fround(pos.z)];
		setPlayerPos(posArr);

		// add isPLOCK condition here if necessary
		if (right || left || forward || backward) {
			// Calculate the angle based on linear velocities, and for some reason it is inverted by half a period
			const velAngle = Math.atan2(t.x, t.z) + Math.PI;

			// Calculate the target rotation based on the angle
			const targetRotation = new Quaternion();
			// YXZ!!! not sure if this was a typo, but if it works then I am not going to touch it.
			targetRotation.setFromEuler(new Euler(0, velAngle, 0, "YXZ"));

			// Interpolate between current rotation and target rotation (slerp)
			const maxRotationSpeed = 0.1; // Adjust the speed of rotation
			model.current.quaternion.slerp(targetRotation, maxRotationSpeed);
		}
	});

	const onKeyDown = useCallback(
		function onKeyDown(e: KeyboardEvent) {
			e.preventDefault();
			switch (e.key.toLowerCase()) {
				case "v":
					setCamBack(true);
					break;
				case "s":
					setBackward(1);
					break;
				case "w":
					setForward(1);
					break;
				case "a":
					setLeft(1);
					break;
				case "d":
					setRight(1);
					break;
				case "shift":
					setShift(1);
					break;
				case " ":
					// or death
					if (!ground || !rigidBody.current) break;
					const linVel = rigidBody.current.linvel();
					linVel.y = 5;
					rigidBody.current.setLinvel(linVel, true);
					break;
				default:
					break;
			}
		},
		[ground]
	);

	const onKeyUp = useCallback(function onKeyUp(e: KeyboardEvent) {
		switch (e.key.toLowerCase()) {
			case "v":
				setCamBack(false);
				break;
			case "s":
				setBackward(0);
				break;
			case "w":
				setForward(0);
				break;
			case "a":
				setLeft(0);
				break;
			case "d":
				setRight(0);
				break;
			case "shift":
				setShift(0);
				break;
			default:
				break;
		}
	}, []);

	useEffect(() => {
		window.addEventListener("keydown", onKeyDown);
		window.addEventListener("keyup", onKeyUp);
		return () => {
			window.removeEventListener("keydown", onKeyDown);
			window.removeEventListener("keyup", onKeyUp);
		};
	}, [onKeyDown, onKeyUp]);

	return (
		<>
			<PerspectiveCamera fov={120} ref={cam} makeDefault>
				{isPLOCK ? (
					<PointerLock camera={cam} object={capRef} plock={isPLOCK} setPlock={setPLOCK} zooming={zooming} camBack={camBack} />
				) : (
					<ThirdPerson camera={cam} object={capRef} plock={isPLOCK} setPlock={setPLOCK} zooming={zooming} camBack={camBack} />
				)}
			</PerspectiveCamera>
			<group ref={capsule} position={playerPos} rotation={[0, Math.PI, 0]}>
				<RigidBody
					type="dynamic"
					ref={rigidBody}
					lockRotations={true}
					userData={{ name: "player" }}
					// collisionGroups={interactionGroups([0, 5], [0, 5])}
					name="player"
					friction={100}
					restitution={0.5}
					colliders={false}
                    mass={100}
					onCollisionEnter={(e) => {
						// alert("Collision");
						if (e.other.rigidBody && rigidBody.current) {
							// alert(JSON.stringify(e.other.rigidBody.userData));
							// @ts-ignore
							if (e.other.rigidBody.userData?.name === "ground") {
								// alert("Ground");
								setGround(true);
								const linvel = rigidBody.current.linvel();
								linvel.y = 0;
								rigidBody.current.setLinvel(linvel, true);
							}

							// @ts-ignore
							// if (e.other.rigidBody.userData?.name === "structure") {
							//     setStructure(true);
							// }

							// @ts-ignore
							if (e.targetRigidBody.userData?.name === "water") {
								// alert("Water");
								setDeath(true);
								const linvel = rigidBody.current.linvel();
								linvel.y = 0;
								rigidBody.current.setLinvel(linvel, true);
							}
						}
					}}
					onCollisionExit={(e) => {
						if (e.other.rigidBody && rigidBody.current) {
							// @ts-ignore
							if (e.other.rigidBody.userData?.name === "ground") {
								setGround(false);
								rigidBody.current.resetForces(false);
							}

							// if (e.other.rigidBody.userData?.name === "structure") {
							//     setStructure(false);
							//     rigidBody.current.resetForces(false);
							// }
						}
					}}
				>
					<CapsuleCollider args={[height / 2 - radius, radius]} />
				</RigidBody>
				<group visible={!isPLOCK}>
					<mesh ref={model} geometry={new BoxGeometry(1, 1, 1)} material={new MeshBasicMaterial({ color: 0x00000 })}></mesh>
				</group>
				<group position={[0, -height / 2 + radius, 0]}>
					<BallCollider sensor args={[radius * 1.2]}></BallCollider>
				</group>
			</group>
		</>
	);
}
