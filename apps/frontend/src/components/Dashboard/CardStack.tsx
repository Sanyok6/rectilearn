import {
	Box,
	Text,
	Stack,
	StackProps,
	useBreakpointValue,
	useColorModeValue,
	Button,
	AspectRatio,
	Skeleton,
	Center,
	VStack,
	ScaleFade,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    FormControl,
    FormLabel,  
    ModalOverlay,
    ModalFooter,
    useDisclosure,
    ModalCloseButton,
    Input,
    Menu,
    MenuButton,
    MenuList,
    InputGroup,
    InputRightElement
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import CardGrid from "./CardGrid";
import Card, { StudySet, StudySetQuestion } from "./Card";
import { FiPlus } from "react-icons/fi";
import useSWR from "swr";
import AuthCtx from "../../lib/auth";

interface ICreateCardProps {
	rootProps?: StackProps;
}

const fetcher = (url: string) =>
	fetch(url, { headers: { "Content-Type": "application/json" } }).then(
		(res) => res.json()
	);

const CardStack = () => {
    const { accessToken } = useContext(AuthCtx);
	const { data: d, error } = useSWR<Array<StudySet>>("/api/studysets/", fetcher);
    const [data, setData] = useState<Array<StudySet>>([]);

	const [shouldOpen, setShouldOpen] = useState<boolean>(false);
	useEffect(() => {
		setShouldOpen(true);
	}, []);
    useEffect(() => {
        if (accessToken && accessToken === "guest") {
            setData([]);
            alert("Note: Guests cannot create any studysets or play any games. Please make an account to get access to all features");
        } else if (accessToken && d) {
            setData(d);
        }
        if (error) {
            console.error(error);
        }
    }, [d, error]);
	return (
		<>
			{!shouldOpen && (
				<Center w="100%">
					<VStack w="40%" mt="2em" spacing={3}>
						<Skeleton w="80%" h="6em" />
						<Skeleton w="80%" h="1.5em" />
						<Skeleton w="80%" h="1.5em" />
						<Skeleton w="80%" h="1.5em" />
						<Skeleton w="80%" h="1.5em" />
					</VStack>
					<VStack w="40%" mt="2em" spacing={3}>
						<Skeleton w="80%" h="6em" />
						<Skeleton w="80%" h="1.5em" />
						<Skeleton w="80%" h="1.5em" />
						<Skeleton w="80%" h="1.5em" />
						<Skeleton w="80%" h="1.5em" />
					</VStack>
				</Center>
			)}
			<ScaleFade initialScale={0.99} in={shouldOpen}>
				<Box
					maxW="7xl"
					mx="auto"
					px={{ base: "4", md: "8", lg: "12" }}
					py={{ base: "6", md: "8", lg: "12" }}
					display={shouldOpen ? undefined : "none"}
				>
					<CardGrid>
						{data
							? data.map((set) => (
									<Card key={set.id.toString()} sets={set} />
							  ))
							: "Loading"}
						<CreateCard />
					</CardGrid>
				</Box>
			</ScaleFade>
		</>
	);
};

export default CardStack;

const CreateCard = (props: ICreateCardProps) => {
	const AddRef = useRef<HTMLButtonElement>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
	const { rootProps } = props;
    return (
		<Stack
			spacing={useBreakpointValue({ base: "4", md: "5" })}
			{...rootProps}
		>
			<Box
				maxW={"420px"}
				w={"full"}
				bg={useColorModeValue("white", "gray.700")}
				boxShadow={"2xl"}
				rounded={"xl"}
				p={5}
				textAlign={"center"}
				height="100%"
				onClick={() => AddRef.current && AddRef.current.focus()}
			>
				<AspectRatio ratio={10 / 9}>
                    <>
                        <Button ref={AddRef} height="10em" width="10em" onClick={onOpen}>
                            <FiPlus size={120} />
                        </Button>
                        <CreateCardModal isOpen={isOpen} onClose={onClose} />
                    </>
				</AspectRatio>
				<Text fontWeight="bold" fontSize="2xl" mt="2em">
					{"Create New"}
				</Text>
			</Box>
		</Stack>
	);
};

const CreateCardModal = (props: any) => {
    const { isOpen, onClose: oC } = props;
    const [v, setV] = useState<string>("");
    const [questions, setQuestions] = useState<Array<StudySetQuestion>>([]);
    function onClose() {
        setQuestions([]);
        setV("");
        oC();
    }

    const handleSubmission = () => {
        console.log("called")
        fetch("/api/studysets/new/").then((res) => console.log("res", res));
        onClose();
    };

	return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create study set</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel htmlFor="subject">Subject or Name</FormLabel>
                            <Input id="subject" placeholder="Your subject/name here" value={v} onChange={(e) => setV(e.target.value)} />
                        </FormControl>
                        {
                            questions.map((i, ind) => (
                                <FormControl key={ind}>
                                    <FormLabel htmlFor={`q${ind}`}>Question</FormLabel>
                                    <Input id={`q${ind}`} placeholder="Your question here" value={i.question} onChange={(e) => setQuestions(qs => {
                                        let newQ = [...qs];
                                        newQ[ind] = {
                                            ...newQ[ind],
                                            question: e.target.value
                                        }
                                        return newQ;
                                    })} />
                                    <Menu>
                                        <MenuButton as={Button} mt={3}>
                                            View Answers
                                        </MenuButton>
                                        <MenuList maxWidth={"20vw"}>
                                            {i.answers.map((ite, idx) => (
                                                <InputGroup key={idx} display="flex" flexDir="row" alignItems="center" justifyContent="center">
                                                    <Input alignSelf="center" mx={3} value={ite} onChange={(e) => setQuestions(qs => {
                                                        let newQ = [...qs];
                                                        if (newQ[ind].answers[idx] !== undefined) {
                                                          newQ[ind] = {
                                                            ...newQ[ind],
                                                            answers: newQ[ind].answers.map((answer, i) => (i === idx ? e.target.value : answer)),
                                                          };
                                                        }
                                                        return newQ;
                                                    })} my={3} />
                                                    <InputRightElement onClick={() => setQuestions(qs => {
                                                        let newQ = [...qs];
                                                        newQ[ind] = {
                                                            ...newQ[ind],
                                                            answers: newQ[ind].answers.filter((_, i) => i !== idx)
                                                        }
                                                        return newQ;
                                                    })} children={<CloseIcon />} />
                                                </InputGroup>
                                            ))}
                                            <Button mt={3} onClick={() => setQuestions(qs => {
                                                let newQ = [...qs];
                                                newQ[ind] = {
                                                    ...newQ[ind],
                                                    answers: [...newQ[ind].answers, ""]
                                                }
                                                return newQ;
                                            })}>Add Answer</Button>
                                        </MenuList>
                                    </Menu>
                                </FormControl>
                            ))
                        }
                        <Button mt={5} width={"80%"} colorScheme="blue" onClick={() => setQuestions(questions => [...questions, { question: "", answers: [] }])} >Add Question</Button>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSubmission}>
                            Add
                        </Button>
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
	);
};