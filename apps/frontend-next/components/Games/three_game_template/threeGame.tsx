"use client";

import { Html, OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { MeshStandardMaterial, Euler, PlaneGeometry, CanvasTexture, TextureLoader } from "three";
import type * as THREE from "three";
import { Physics, RigidBody } from "@react-three/rapier";
import { Suspense, useEffect, useState } from "react";
import { StudySet } from "../../Dashboard/Card";
import { useToast } from "@chakra-ui/react";
import Questions from "../../questions";
import alea from "alea";
import { createNoise2D } from "simplex-noise";

const width = 1000;
const height = 1000;
const x_units = 225;
const y_units = 225;

function ThreeGame({ studySet, avatar }: { studySet: StudySet, avatar: number }) {
    const seed = 1;

    const [open, setOpen] = useState<boolean>(false);
    const [groundGeo, setGroundGeo] = useState<PlaneGeometry | null>(null);
    const [groundTexture, setGroundTexture] = useState<CanvasTexture | null>(null);
    // const toast = useToast();

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

    function getColorBasedOnHeight(h: number) {
		if (h === 30) {
			// return `rgb(0, 255, 0)`
			return generateRandomGreenShade();
		} else {
			// alert(h)
			return `rgb(${String(160 + (h - 30) * 8)}, ${String(90 + (h - 30) * 5)}, 0)`;
			// return `rgb(255, 255, 255)`
		}
	}

    async function loadGround(): Promise<any> {
        let index = 0;
        let buildings: {
            i: number;
            j: number;
            index: number;
        }[] = [];
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
				const heightNoise = noise(x / 16, y / 16) * 5 + noise(x / 4, y / 4) * 2;
				// Apply noise for irregular shape
				const shapeNoise = noise(x / 32, y / 32);
				const islandRadius = Math.min(x_units, y_units) / 2.67 - shapeNoise * ((Math.min(x_units, y_units) / 20) * 3); // Vary the island radius
				// make sure it is within a specific radius
				const canHaveBuilding = islandRadius < Math.min(x_units, y_units) / 2.7 && islandRadius > 5;

				const minHeight = -20;
				const maxHeight = 30;
				const h = Math.max(minHeight, Math.min(maxHeight, heightNoise + islandRadius - distanceFromCenter));
				// const h = Math.max(minHeight, Math.min(maxHeight, noiseValue + islandRadius - distanceFromCenter));

				// Update the vertex position
				if (h <= 5) {
					// ISSUE: For some reason quadruples the load time when set as "undefined"???

					// fill with dark blue if no shaders, light blue if shaders
					// light blue makes more sense with shaders because it looks like ice
					// textureContext.fillStyle = enableShaders ? `rgb(79, 129, 236)` : `rgb(0, 8, 61)`;
                    textureContext.fillStyle = `rgb(0, 8, 61)`;
					textureContext.fillRect(j, i, 1, 1);
					// @ts-ignore
					vertices[index + 2] = -25;
				} else if (h === 30 && canHaveBuilding) {
					const rng = noise(x, y);
					// alert(rng);
					const hasBuilding = rng > 0.01 && rng < 0.015;
					if (hasBuilding) {
						buildings.push({
							i,
							j,
							index,
						});
						// set all around to be the same height
					} else {
						// geometry
						// textureContext.fillStyle = getColorBasedOnHeight(h);
						// textureContext.fillRect(j, i, 1, 1);
						textureContext.drawImage(
							offscreenCanvas,
							j, i,
							offscreenCanvas.width, offscreenCanvas.height,
							j, i,
							1, 1
						);
						// @ts-ignore
						vertices[index + 2] = h - 30;
					}
				} else if (h === 30) {
					const rng = noise(x, y);
					// alert(rng);
					const hasBuilding = rng > 0.1 && rng < 0.2;
					if (hasBuilding) {
						textureContext.fillStyle = `rgb(0, 110, 90)`;
						textureContext.fillRect(j, i, 1, 1);
						// set all around to be the same height
						// @ts-ignore
						vertices[index + 2] = 2;
					} else {
						// geometry
						// textureContext.fillStyle = getColorBasedOnHeight(h);
						// textureContext.fillRect(j, i, 1, 1);
						textureContext.drawImage(
							offscreenCanvas,
							j, i,
							1, 1,
							j, i,
							1, 1
						);
  					// @ts-ignore
						vertices[index + 2] = h - 30;
					}
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
		// 69420 will decide where to place building
		const ind = Math.floor(((noise(69420, 69420) + 1) / 2) * buildings.length);
		console.log("Choosing from:", buildings.length, "Got:", ind);
		if (buildings.length === 0) {
			// this can happen to the seed lmao
		}
		let b = buildings[ind];
		// @ts-ignore
		vertices[b.index - 1] = 5;
		// @ts-ignore
		vertices[b.index + 2] = 5;
		// @ts-ignore
		vertices[b.index + 5] = 5;
		// @ts-ignore
		vertices[b.index - 1 - (x_units + 1) * 3] = 5;
		// @ts-ignore
		vertices[b.index + 2 - (x_units + 1) * 3] = 5;
		// @ts-ignore
		vertices[b.index + 5 - (x_units + 1) * 3] = 5;
		// @ts-ignore
		vertices[b.index - 1 + (x_units + 1) * 3] = 5;
		// @ts-ignore
		vertices[b.index + 2 + (x_units + 1) * 3] = 5;
		// @ts-ignore
		vertices[b.index + 5 + (x_units + 1) * 3] = 5;
		textureContext.fillStyle = `rgb(0, 0, 255)`;
		textureContext.fillRect(b.j - 1, b.i - 1, 1, 1);
		textureContext.fillRect(b.j - 1, b.i, 1, 1);
		textureContext.fillRect(b.j - 1, b.i + 1, 1, 1);
		textureContext.fillRect(b.j - 1, b.i - 2, 1, 1);
		textureContext.fillRect(b.j, b.i - 1, 1, 1);
		textureContext.fillRect(b.j, b.i, 1, 1);
		textureContext.fillRect(b.j, b.i + 1, 1, 1);
		textureContext.fillRect(b.j, b.i - 2, 1, 1);
		textureContext.fillRect(b.j + 1, b.i - 1, 1, 1);
		textureContext.fillRect(b.j + 1, b.i, 1, 1);
		textureContext.fillRect(b.j + 1, b.i + 1, 1, 1);
		textureContext.fillRect(b.j + 1, b.i - 2, 1, 1);
		textureContext.fillRect(b.j - 2, b.i - 1, 1, 1);
		textureContext.fillRect(b.j - 2, b.i, 1, 1);
		textureContext.fillRect(b.j - 2, b.i + 1, 1, 1);
		textureContext.fillRect(b.j - 2, b.i - 2, 1, 1);

		// Create Texture from canvas
		const texture = new CanvasTexture(textureCanvas);
		console.log(texture);

		// needed for lighting
		geometry.computeVertexNormals();

		setGroundTexture(texture);
        setGroundGeo(geometry);
	}

    useEffect(() => {
        loadGround();
    }, []);
	
    return (
        <>
            <Canvas style={{
                width: '100vw',
                height: '100vh',
                position: 'fixed'
            }}>
                <Suspense fallback={<Html>Loading</Html>}>
                    {/* <directionalLight castShadow position={[8, 20, -3]} /> */}
                    <ambientLight />
                    <OrbitControls />
                    <Stats />
                    <Physics debug>
                    {
                        groundTexture && groundGeo && (
                            <group position={[0, -0.01, 0]}>
                                <RigidBody colliders="trimesh" type="fixed" userData={{ name: "ground" }}>
                                    <mesh receiveShadow geometry={groundGeo} material={new MeshStandardMaterial({ map: groundTexture })} rotation={new Euler(-90 / 180 * Math.PI, 0, 0, 'xyz')} />
                                </RigidBody>
                            </group>
                        )
                    }
                    </Physics>
                </Suspense>
            </Canvas>
            <Questions
				questions={studySet.questions}
				open={open}
				isOpen={setOpen}
			/>
        </>
    );
}

export default ThreeGame;