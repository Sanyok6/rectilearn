import { NextPage } from "next";
import Dogeball from "../../components/Games/dogeball";

const Games: NextPage = () => {
    return (
        <Dogeball studySet={{id: 0, subject: "test", questions: [{question: "t", answers:["t"]}]}} />
    )
};

export default Games;
