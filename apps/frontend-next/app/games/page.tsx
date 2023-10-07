"use client";

// there is no point of using a server on this page

import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import BushGame from "@/components/Games/bushGame";
import Dogeball from "@/components/Games/dogeball";
import FishingGame from "@/components/Games/fishingGame";
import FoodFight from "@/components/Games/foodFight";
import LavaGame from "@/components/Games/lavaGame";
import ThreeGame from "@/components/Games/three_game_template/threeGame"
import AuthCtx from "@/lib/auth";

const Games: NextPage = () => {
	const { gameSession } = useContext(AuthCtx);
	const [GameObj, setGameObj] = useState<React.FC>(() => <></>);
	const Router = useRouter();

	useEffect(() => {
		if (!gameSession) {
			Router.push("/dashboard");
			return;
		}
		const avatar = gameSession?.avatar;
		console.log(gameSession);
		// alert(gameSession.game)
		switch (gameSession.game) {
			case "lavaGame":
				setGameObj(() => (
					<LavaGame studySet={gameSession.studySet} avatar={avatar}></LavaGame>
				));
				break;
			case "fishingGame":
				setGameObj(() => (
					<FishingGame studySet={gameSession.studySet} avatar={avatar}></FishingGame>
				));
				break;
			case "bushGame":
				setGameObj(() => (
					<BushGame studySet={gameSession.studySet} avatar={avatar} ></BushGame>
				));
				break;
			case "foodFight":
				setGameObj(() => (
					<FoodFight studySet={gameSession.studySet} avatar={avatar} ></FoodFight>
				));
				break;
			case "dogeball":
				setGameObj(() => (
					<Dogeball studySet={gameSession.studySet} avatar={avatar} ></Dogeball>
				));
				break;
			case "threeGame":
				setGameObj(() => (
					<ThreeGame studySet={gameSession.studySet} avatar={avatar} ></ThreeGame>
				));
				break;
			default:
				setGameObj(() => <BushGame studySet={gameSession.studySet} avatar={avatar} />);
		}
	}, []);
	return <>{gameSession && GameObj}</>;
};

export default Games;
