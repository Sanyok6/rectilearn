import {
    AspectRatio,
    Box,
    Button,
    Skeleton,
    Stack,
    StackProps,
    Text,
    useBreakpointValue,
    useColorModeValue,
    Tooltip,
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
    InputRightElement,
    useToast
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { CloseIcon } from "@chakra-ui/icons";
import { Image } from '../../utils/next-chakra-image';

import { Icon, IconButton, IconButtonProps, LightMode } from '@chakra-ui/react';
import { FiInfo, FiPlay, FiStar } from 'react-icons/fi';


export const InfoButton = (props: IconButtonProps) => (
    <LightMode>
        <IconButton
            isRound
            bg="white"
            color="gray.900"
            size="sm"
            _hover={{ transform: 'scale(1.1)' }}
            sx={{ ':hover > svg': { transform: 'scale(1.1)' } }}
            transition="all 0.15s ease"
            icon={<Icon as={FiInfo} transition="all 0.15s ease" />}
            boxShadow="base"
            {...props}
        />
    </LightMode>
);

export const FavouriteButton = (props: IconButtonProps) => (
  <LightMode>
    <IconButton
      isRound
      bg="white"
      color="gray.900"
      size="sm"
      _hover={{ transform: 'scale(1.1)' }}
      sx={{ ':hover > svg': { transform: 'scale(1.1)' } }}
      transition="all 0.15s ease"
      icon={<Icon as={FiStar} transition="all 0.15s ease" />}
      boxShadow="base"
      {...props}
    />
  </LightMode>
);

export interface StudySetQuestion {
    question: string,
    answers: Array<string>
}

export interface StudySet {
    id: Number,
    subject: string,
    questions: Array<StudySetQuestion>
}

interface Props {
    studySet: StudySet;
    rootProps?: StackProps;
    updateStudySet: Function;
}

const Card = (props: Props) => {
    const imageUrl = "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc="
    const { studySet, updateStudySet, rootProps } = props;
    const { id, subject } = studySet;
    const [isLoading, setLoading] = useState<boolean>(true);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const deleteStudySet = async (e: any) => {
        // e.preventDefault();
        // console.log("stopped ", e)
        const resp = await fetch(`/api/studysets/${id}/delete_study_set/`, {
            method: "DELETE"
        });
        // console.log(resp);
    }

    return (
        <Stack spacing={useBreakpointValue({ base: '4', md: '5' })} {...rootProps}>
            <Box
                maxW={'420px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'2xl'}
                rounded={'xl'}
                p={5}
                textAlign={'center'}
            >
                <Box position="relative">
                    <AspectRatio ratio={10 / 9}>
                        <>
                            {
                                isLoading &&
                                    <Skeleton />
                            }
                            <Image
                                src={imageUrl}
                                alt={subject}
                                draggable="false"
                                layout="fill"
                                onLoad={() => setLoading(false)}
                                display={isLoading ? "none" : undefined}
                                borderRadius={useBreakpointValue({ base: 'md', md: 'xl' })}
                            />
                        </>
                    </AspectRatio>
                    <FavouriteButton
                        position="absolute"
                        top="2"
                        right="2"
                        aria-label={`Add ${subject} to your favourites`}
                    />
                    <InfoButton
                        position="absolute"
                        top="2"
                        right="47"
                        aria-label={`View ${subject} information`}
                    />
                </Box>
                <Stack mt={2} mb={3}>
                    <Stack spacing="1">
                        <Tooltip label={subject} aria-label={`tooltip ${subject}`}>
                            <Text fontWeight="medium" color={useColorModeValue('gray.700', 'white')} fontSize="2xl" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" width="100%">
                                {subject}
                            </Text>
                        </Tooltip>
                    </Stack>
                </Stack>
                <Stack align="center" mb={2}>
                    <Button
                        colorScheme="blue"
                        isFullWidth
                        fontSize={'sm'}
                    >
                        <FiPlay />
                        <Text ml="0.5em">{"Play"}</Text>
                    </Button>
                </Stack>
                <Stack align="center" direction="row">
                    <Button
                        colorScheme="yellow"
                        isFullWidth
                        flex={1}
                        fontSize={'sm'}
                        onClick={onOpen}
                    >
                        Edit
                    </Button>
                    <EditStudySetModal isOpen={isOpen} onClose={onClose} currentStudySet={studySet} updateStudySet={updateStudySet} />
                    <Button
                        colorScheme="red"
                        isFullWidth
                        flex={1}
                        fontSize={'sm'}
                        onClick={deleteStudySet}
                    >
                        Delete
                    </Button>
                </Stack>
            </Box>
        </Stack>
    )
}


const EditStudySetModal = (props: any) => {
    const { currentStudySet, updateStudySet } = props;
    const { id, subject: currentSubject, questions: currentQuestions } = currentStudySet;

    const { isOpen, onClose: oC } = props;
    const [v, setV] = useState<string>(currentSubject);
    const [questions, setQuestions] = useState<Array<StudySetQuestion>>(currentQuestions);
    const toast = useToast();

    function onClose() {
        setQuestions(currentQuestions);
        setV(currentSubject);
        oC();
    }

    const handleSubmission = async () => {
        const values = {
            subject: v,
            questions: questions
        };

        const res = await fetch(`/api/studysets/${id}/update/`, {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        })

        if (!res.ok){
            toast({
                title: "Something went wrong",
                description: res ? (await res.json()).detail || "err" : "Something went wrong while creating studyset. Please try again.",
                status: "error",
                isClosable: true,
                duration: 4000
            })
            return;
        }
        
        updateStudySet(await res.json());

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
                                                    })}><CloseIcon /></InputRightElement>
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
                            Edit
                        </Button>
                        <Button colorScheme="red" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
	);
}


export default Card;