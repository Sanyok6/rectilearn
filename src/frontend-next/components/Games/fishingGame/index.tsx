"use client";

import { Html, OrbitControls, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import React, { Suspense, createContext, useState } from "react";
import { StudySet } from "../../Dashboard/Card";
// import { useToast } from "@chakra-ui/react";
import Questions from "../../questions";
import Ground from "./rapier/world/ground";
import Player from "./player";

const gameCtxDefault = {
	playerPos: [0, 0, 0] as [number, number, number],
	setPlayerPos: (() => {}) as StateSetter<[number, number, number]>,
	death: false as boolean,
	setDeath: (() => {}) as StateSetter<boolean>,
};

type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export const GameContext: React.Context<{
	playerPos: [number, number, number];
	setPlayerPos: StateSetter<[number, number, number]>;
	death: boolean;
	setDeath: StateSetter<boolean>;
}> = createContext(gameCtxDefault);

// function Experience() {
// 	return (
// 		<Physics timeStep="vary" gravity={[0, -1, 0]}>
// 			{/* <Player />
// 			<Ground enableShaders={true} /> */}
// 		</Physics>
// 	);
// }
import { Grid, KeyboardControls } from "@react-three/drei";
import Ecctrl from "./character/Ecctrl";
import { Leva, useControls } from "leva";
import CharacterModel from "./character/Character";
import { Vector3 } from "three";

function Experience() {
  /**
   * Debug settings
   */
  const { physics } = useControls("World Settings", {
    physics: false,
  });

  /**
   * Keyboard control preset
   */
  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
    { name: "action1", keys: ["1"] },
    { name: "action2", keys: ["2"] },
    { name: "action3", keys: ["3"] },
    { name: "action4", keys: ["KeyF"] },
  ];

  return (
    <>
      {/* <Perf position="top-left" /> */}

      <Grid
        args={[300, 300]}
        sectionColor={"lightgray"}
        cellColor={"gray"}
        position={[0, -0.99, 0]}
        userData={{ camExcludeCollision: true }} // this won't be collide by camera ray
      />

      {/* <Lights /> */}

      <Physics debug={physics} timeStep="vary">
        {/* Keyboard preset */}
        <KeyboardControls map={keyboardMap}>
          {/* Character Control */}
          <Ecctrl
            // debug
            animated
            followLight
            springK={2}
            dampingC={0.2}
            autoBalanceSpringK={1.2}
            autoBalanceDampingC={0.04}
          >
            {/* Replace your model here */}
            <CharacterModel />
          </Ecctrl>
        </KeyboardControls>

        <Ground enableShaders />
      </Physics>
    </>
  );
}

function FishingGame({ studySet, avatar }: { studySet: StudySet, avatar: number }) {
    const [open, setOpen] = useState<boolean>(false);
	const [playerPos, setPlayerPos] = useState<[number, number, number]>(gameCtxDefault.playerPos);
	const [death, setDeath] = useState<boolean>(gameCtxDefault.death);
    return (
        <GameContext.Provider value={{
			playerPos,
			setPlayerPos,
			death,
			setDeath
		}}>
			<Leva collapsed />
            <Canvas style={{
                width: '100%',
                height: '100%',
                position: 'fixed'
            }}>
				<Suspense fallback={<Html>Loading</Html>}>
					{/* <directionalLight castShadow position={[8, 20, -3]} /> */}
					<ambientLight />
					{/* <OrbitControls /> */}
					<Stats />
					<Experience />
				</Suspense>
            </Canvas>
            <Questions
				questions={studySet.questions}
				open={open}
				isOpen={setOpen}
			/>
        </GameContext.Provider>
    );
}

export default FishingGame;