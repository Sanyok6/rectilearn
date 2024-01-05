"use client";

// there is no point of using a server on this page

import type { NextPage } from "next";
import FishingGame from "@/components/Games/fishingGame/index";


const Games: NextPage = () => {
	return <FishingGame studySet={{
        id: 0,
        subject: "",
        questions: [{
            question: "",
            answers: [""]
        }]
    }} avatar={0} />
};

export default Games;
