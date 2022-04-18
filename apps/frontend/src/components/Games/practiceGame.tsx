import { useEffect, useState, useRef } from "react";
import Questions from "../../components/questions";

import { Button, useToast } from "@chakra-ui/react";
import { StudySet } from "../Dashboard/Card";

const LavaGame = ({ studySet }: { studySet: StudySet }) => {
	const [open, setOpen] = useState<boolean>(false);
	return (
		<>
			<Button 
				onClick={() => {setOpen(true)}}
				position={"absolute"}
				top="94vh"
				left="0"
				height="6vh"
				width="100%"
				backgroundColor={"rgba(123, 123, 123, 0.8)"}
				>
				Next question</Button>
			<Questions
				questions={studySet.questions}
				open={open}
				isOpen={setOpen}
			/>
		</>
	);
};

export default LavaGame;
