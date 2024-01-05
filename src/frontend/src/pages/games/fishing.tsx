import { NextPage } from "next";
import FishingGame from "../../components/Games/fishingGame";

const Games: NextPage = () => {
    return (
        <FishingGame studySet={{id: 0, subject: "test", questions: [{question: "t", answers:["t"]}]}} />
    )
};

export default Games;
