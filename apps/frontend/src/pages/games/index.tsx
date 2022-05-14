import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import BushGame from "../../components/Games/bushGame";
import Dogeball from "../../components/Games/dogeball";
import FishingGame from "../../components/Games/fishingGame";
import FoodFight from "../../components/Games/foodFight";
import LavaGame from "../../components/Games/lavaGame";
import AuthCtx from "../../lib/auth";

const Games: NextPage = () => {
	const { gameSession } = useContext(AuthCtx);
	const [GameObj, setGameObj] = useState<React.FC>(() => <></>);
	const Router = useRouter();
	useEffect(() => {
		if (!gameSession) {
			Router.push("/dashboard");
			return;
		}
		switch (gameSession.game) {
			case "lavaGame":
				setGameObj(() => (
					<LavaGame studySet={gameSession.studySet}></LavaGame>
				));
				break;
			case "fishingGame":
				setGameObj(() => (
					<FishingGame studySet={gameSession.studySet}></FishingGame>
				));
				break;
			case "bushGame":
				setGameObj(() => (
					<BushGame studySet={gameSession.studySet}></BushGame>
				));
				break;
			case "foodFight":
				setGameObj(() => (
					<FoodFight studySet={gameSession.studySet}></FoodFight>
				));
				break;
			case "dogeball":
				setGameObj(() => (
					<Dogeball studySet={gameSession.studySet}></Dogeball>
				));
				break;
			default:
				setGameObj(() => <BushGame studySet={gameSession.studySet} />);
		}
	}, []);
	return <>{gameSession && GameObj}</>;
};

export default Games;
