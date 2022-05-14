import LavaGame from "../../components/Games/lavaGame";
import { NextPage } from "next";

const Games: NextPage = () => {
	return (
        <LavaGame studySet={{id: 0, subject: "test", questions: [{question: "t", answers:["t"]}]}} />
    )
};

export default Games;
