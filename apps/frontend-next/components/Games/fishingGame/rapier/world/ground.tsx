"use client";

import { MeshStandardMaterial, Euler, PlaneGeometry, CanvasTexture, TextureLoader, Vector3, RepeatWrapping, MathUtils, BoxGeometry } from "three";
import type * as THREE from "three";
import { RigidBody } from "@react-three/rapier";
import { useCallback, useEffect, useMemo, useState } from "react";
import alea from "alea";
import { createNoise2D } from "simplex-noise";
import { Water } from "three/examples/jsm/objects/Water";
import { Sky } from "three/examples/jsm/objects/Sky";
import { useFrame } from "@react-three/fiber";
import { Stand } from "../../models/stand";
import { Fish } from "../../models/fish";

const width = 1000;
const height = 1000;
const x_units = 225;
const y_units = 225;

function Ground({ enableShaders }: { enableShaders: boolean }) {
	const seed = useMemo(() => Math.floor(Math.random() * 100), []);
	const [groundGeo, setGroundGeo] = useState<PlaneGeometry | null>(null);
	const [groundTexture, setGroundTexture] = useState<CanvasTexture | null>(null);
    const [water, setWater] = useState<Water | null>(null);
    const [sky, setSky] = useState<Sky | null>(null);
	// const toast = useToast();

    useFrame((_, dt) => {
		if (!water) return;
		water.material.uniforms["time"].value += dt;
	});

	function generateRandomGreenShade() {
		const redValue = Math.floor(Math.random() * 51); // Low red value
		const greenValue = Math.floor(Math.random() * 206) + 50; // Vary green value between 50 and 255
		const blueValue = Math.floor(Math.random() * 51); // Low blue value

		return `rgb(${redValue}, ${greenValue}, ${blueValue})`;
	}

	async function loadTexture(): Promise<THREE.Texture> {
		return new Promise((resolve, reject) => {
			new TextureLoader().load(
				"/textures/grass_texture.jpeg",
				(texture) => {
					resolve(texture);
				},
				undefined,
				(error) => {
					reject(error);
				}
			);
		});
	}

	const getColorBasedOnHeight = useCallback(function (h: number) {
		if (h === 30) {
			// return `rgb(0, 255, 0)`
			return generateRandomGreenShade();
		} else {
			// alert(h)
			return `rgb(${String(160 + (h - 30) * 8)}, ${String(90 + (h - 30) * 5)}, 0)`;
			// return `rgb(255, 255, 255)`
		}
	}, []);

	const loadGround = useCallback(
		async function (): Promise<any> {
			let index = 0;
			let heights: number[] = [];
			const geometry = new PlaneGeometry(width, height, x_units, y_units);
			const prng = seed ? alea(seed) : alea();
			const noise = createNoise2D(prng);
			const vertices = geometry.getAttribute("position").array;
			console.log("Length: ", vertices.length);

			const textureCanvas = document.createElement("canvas");
			textureCanvas.width = x_units;
			textureCanvas.height = y_units;
			const textureContext = textureCanvas.getContext("2d")!;
			const imageTexture = await loadTexture();
			let offscreenCanvas = document.createElement("canvas");
			offscreenCanvas.width = imageTexture.image.width;
			offscreenCanvas.height = imageTexture.image.height;
			let offscreenContext = offscreenCanvas.getContext("2d")!;
			offscreenContext.drawImage(imageTexture.image, 0, 0);

            let sun: Vector3, waterGeometry: PlaneGeometry, water: Water, sky: Sky;

			for (let i = 0; i <= x_units; i++) {
				for (let j = 0; j <= y_units; j++) {
					// const index = (i * ((width * height) + 1) + j) * 3;
					const x = (i / x_units - 0.5) * x_units;
					const y = (j / y_units - 0.5) * y_units;

					// Calculate distance from center
					const distanceFromCenter = Math.sqrt(x * x + y * y);

					// Apply noise to vertices based on distance from center
					// const noiseValue = noise4(x * 5, y * 5, 0.1, 0.1) * 10;

					// Apply noise for height
					// const heightNoise = noise(x / 16, y / 16) * 5 + noise(x / 4, y / 4) * 2;
                    const heightNoise = noise(x / 32, y / 32) * 7;
					// Apply noise for irregular shape
					// const shapeNoise = noise(x / 32, y / 32);
                    const shapeNoise = noise(x / 32, y / 32);
                    // const islandRadius = shapeNoise;
					const islandRadius = Math.min(x_units, y_units) / 2 - shapeNoise * (Math.min(x_units, y_units) / 10000); // Vary the island radius

                    const pondCenterX = 0; // X-coordinate of the pond's center
                    const pondCenterY = 0; // Y-coordinate of the pond's center
                    const pondRadius = 15 - noise(x / 32, y / 32) * 30; // Radius of the pond

                    // Check if the current point is inside the pond
                    const isInPond = Math.sqrt((x - pondCenterX) * (x - pondCenterX) + (y - pondCenterY) * (y - pondCenterY)) < pondRadius;

                    // Define pond height
                    const pondHeight = Math.min(30, heightNoise + islandRadius - distanceFromCenter) - 2.8; // Adjust this value for the depth of the pond

                    const minHeight = -20;
                    const maxHeight = 30;
                    // Calculate final height
                    const h = isInPond ? pondHeight : Math.max(minHeight, Math.min(maxHeight, heightNoise + islandRadius - distanceFromCenter));
					// const h = Math.max(minHeight, Math.min(maxHeight, heightNoise + islandRadius - distanceFromCenter));
					// const h = Math.max(minHeight, Math.min(maxHeight, noiseValue + islandRadius - distanceFromCenter));

					// Update the vertex position
					if (isInPond) {
                        textureContext.fillStyle = `rgb(218, 165, 32)`;
						textureContext.fillRect(j, i, 1, 1);
						// @ts-ignore
						vertices[index + 2] = h - 30;
                    } else if (h <= 5) {
						// ISSUE: For some reason quadruples the load time when set as "undefined"???

						// fill with dark blue if no shaders, light blue if shaders
						// light blue makes more sense with shaders because it looks like ice
						// textureContext.fillStyle = enableShaders ? `rgb(79, 129, 236)` : `rgb(0, 8, 61)`;
						textureContext.fillStyle = `rgb(0, 8, 61)`;
						textureContext.fillRect(j, i, 1, 1);
						// @ts-ignore
						vertices[index + 2] = -25;
					} else if (h === 30) {
                        // geometry
                        // textureContext.fillStyle = getColorBasedOnHeight(h);
                        textureContext.fillStyle = `rgb(31, 173, 53)`;
                        textureContext.fillRect(j, i, 1, 1);
                        // textureContext.drawImage(offscreenCanvas, j, i, 1, 1, j, i, 1, 1);
                        // @ts-ignore
                        vertices[index + 2] = h - 30;
					} else {
						// geometry
						textureContext.fillStyle = getColorBasedOnHeight(h);
						textureContext.fillRect(j, i, 1, 1);
						// @ts-ignore
						vertices[index + 2] = h - 30;
					}
					heights.push(vertices[index + 2]);
					index += 3;
				}
			}

			// Create Texture from canvas
			const texture = new CanvasTexture(textureCanvas);
			console.log(texture);

			// needed for lighting
			geometry.computeVertexNormals();

            if (enableShaders) {
                sun = new Vector3();
    
                // Water
    
                waterGeometry = new PlaneGeometry(width, height);
    
                water = new Water(waterGeometry, {
                    textureWidth: 512,
                    textureHeight: 512,
                    waterNormals: new TextureLoader().load("/textures/waternormals.jpg", function (texture) {
                        texture.wrapS = texture.wrapT = RepeatWrapping;
                    }),
                    sunDirection: new Vector3(),
                    sunColor: 0xffffff,
                    waterColor: 0x001e0f,
                    distortionScale: 3.7,
                    fog: true,
                });
    
                water.rotation.x = -Math.PI / 2;
    
                sky = new Sky();
                sky.scale.setScalar(10000);
    
                const parameters = {
                    elevation: 2,
                    azimuth: 180,
                };
    
                const phi = MathUtils.degToRad(90 - parameters.elevation);
                const theta = MathUtils.degToRad(parameters.azimuth);
    
                sun.setFromSphericalCoords(1, phi, theta);
    
                sky.material.uniforms["sunPosition"].value.copy(sun);
                water.material.uniforms["sunDirection"].value.copy(sun).normalize();
    
                const skyUniforms = sky.material.uniforms;
    
                skyUniforms["turbidity"].value = 10;
                skyUniforms["rayleigh"].value = 2;
                skyUniforms["mieCoefficient"].value = 0.005;
                skyUniforms["mieDirectionalG"].value = 0.8;

                setSky(sky);
                setWater(water);
            }

			setGroundTexture(texture);
			setGroundGeo(geometry);
		},
		[getColorBasedOnHeight, enableShaders, seed]
	);

	useEffect(() => {
		loadGround();
	}, [loadGround]);

	return (
        <>
            {groundTexture && groundGeo && (
                <>
                    <group position={[0, -0.01, 0]}>
                        <RigidBody colliders="trimesh" type="fixed" userData={{ name: "ground" }}>
                            <mesh
                                receiveShadow
                                geometry={groundGeo}
                                material={new MeshStandardMaterial({ map: groundTexture })}
                                rotation={new Euler((-90 / 180) * Math.PI, 0, 0, "XYZ")}
                            />
                        </RigidBody>
                    </group>
                    {enableShaders && water && sky && (
                        <>
                            <primitive object={water} position={[0, -2.5, 0]} />
                            <primitive object={sky} />
                        </>
                    )}
                    <group position={[0, -3, 0]}>
                        <RigidBody colliders="cuboid" type="fixed" userData={{ name: "water" }}>
                            <mesh
                                receiveShadow
                                geometry={new BoxGeometry(width, 1, height)}
                                material={new MeshStandardMaterial({ color: 0x4f81ec, opacity: enableShaders ? 0 : 0.2, transparent: true })}
                            />
                        </RigidBody>
                    </group>
                    <group position={[35 * width / x_units, 0, 0]} scale={20}>
                        <Stand />
                        <group position={[5 / 20 * width / x_units, 0, 0]} scale={1/20} rotation={[0, 3 * Math.PI / 2, 0]}>
                            <Fish />
                        </group>
                    </group>
                </>
            )}
        </>
	);
}

export default Ground;
