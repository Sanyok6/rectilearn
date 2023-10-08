"use client";

import { Html, OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useState } from "react";
import { StudySet } from "../../Dashboard/Card";
// import { useToast } from "@chakra-ui/react";
import Questions from "../../questions";
import Ground from "./rapier/world/ground";
import Player from "./player";

function FishingGame({ studySet, avatar }: { studySet: StudySet, avatar: number }) {

    const [open, setOpen] = useState<boolean>(false);
	
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
					{/* <OrbitControls /> */}
					<Stats />
					<Physics>
						<Player />
						<Ground enableShaders={true} />
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

export default FishingGame;