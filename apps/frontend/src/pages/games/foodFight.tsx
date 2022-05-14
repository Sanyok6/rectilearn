import { NextPage } from "next";
import FoodFight from "../../components/Games/foodFight";

const Games: NextPage = () => {
	return (
        <FoodFight studySet={{id: 0, subject: "test", questions: [{question: "t", answers:["t"]}]}} />
    )
};

export default Games;
