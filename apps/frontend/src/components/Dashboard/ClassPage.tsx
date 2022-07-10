import { CheckIcon, MinusIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    CircularProgress,
    CircularProgressLabel,
    Flex,
    Grid,
    GridItem,
    HStack,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    propNames,
    SimpleGrid,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tag,
    TagCloseButton,
    TagLabel,
    TagRightIcon,
    Text,
    useColorModeValue,
    useDisclosure,

} from '@chakra-ui/react';
import { emit } from 'process';
import { useState } from 'react';
import { IoSchool } from 'react-icons/io5';

interface classObj {
    id: number;
    name: string;
    color: string;
    students: Array<number>;
    teacher: number;
    study_sets: Array<number>;
    assignments: [];
}

const RightSidebar = () => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [curAssignment, setCurAssignment] = useState<assignmentObj>({title:"", due:"", gameMode: "", assignmentIndex:0, completedBy:[]});

    const assignments = [{title: "Complete 20 questions", due: "1/1/22", gameMode: "", assignmentIndex:0, completedBy:[], completed:true}, {title: "Earn $100 in Food Fight", due: "1/2/22", gameMode: "", assignmentIndex:0, completedBy:[], completed:true}, {title: "Complete 40 questions", due: "10/1/22", gameMode: "", assignmentIndex:0, completedBy:[], completed:false}];
    const leaderboard = [{name: "Sanya", correct: 10, incorrect: 5}, {name: "Rush", correct: 10, incorrect: 6}, {name: "llama", correct: 10, incorrect: 7},{name: "Sanya", correct: 10, incorrect: 5}, {name: "Rush", correct: 10, incorrect: 6}, {name: "llama", correct: 10, incorrect: 7},{name: "Sanya", correct: 10, incorrect: 5}, {name: "Rush", correct: 10, incorrect: 6}, {name: "llama", correct: 10, incorrect: 7},{name: "Sanya", correct: 10, incorrect: 5}, {name: "Rush", correct: 10, incorrect: 6}, {name: "llama", correct: 10, incorrect: 7},];
    return (
        <>
            <Box borderRadius={"lg"} bg={useColorModeValue('white', '#171923')} >
                <AssignmentModal isOpen={isOpen} onClose={onClose} assignment={curAssignment} />
                <Tabs isFitted variant='enclosed'>
                    <TabList mb='1em'>
                        <Tab>Home</Tab>
                        <Tab>Leaderboard</Tab>
                        <Tab>Settings</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Text fontSize={"xl"}>Your Stats</Text>
                            <SimpleGrid minChildWidth={"150px"} spacing="6" my="3">
                                <GridItem>
                                    <CircularProgress value={85} size='120px' thickness={"12px"} color="green.400" >
                                        <CircularProgressLabel fontSize="sm">Accuracy<br /><b>17/20</b></CircularProgressLabel>
                                    </CircularProgress>
                                </GridItem>

                                <GridItem>
                                    <CircularProgress value={85} size='120px' thickness={"12px"} color="green.400" >
                                        <CircularProgressLabel fontSize="xs">Asignments Completed<br /><b>17/20</b></CircularProgressLabel>
                                    </CircularProgress>
                                </GridItem>
                            </SimpleGrid>
                            <Text fontSize={"xl"} m="4" mt="25px">Asignments</Text>
                            <Box maxH="50vh" overflow={"scroll"}>
                                {assignments.map((assignment, index) => (
                                    <Box key={index} my="2" onClick={() => {setCurAssignment(assignment); onOpen()}}>
                                         {/* border="solid rgba(39, 211, 245, 0.8) 1px"  */}
                                        <Flex bg={useColorModeValue("#edf2f7", "#20242e")} rounded={"2xl"} boxShadow="md" justifyContent="space-between" p="3" _hover={{filter: useColorModeValue("brightness(95%)", "brightness(120%)")}}>
                                            <Text fontSize={"xl"} fontWeight="bold">{assignment.title}</Text>
                                            <Text fontSize="lg">Due: {assignment.due}</Text>
                                            <Icon color={assignment.completed ? 'green.400' : useColorModeValue('gray.500', 'gray.300')} as={assignment.completed ? CheckIcon : MinusIcon} w="6" h="6" />
                                        </Flex>
                                    </Box>
                                ))}
                            </Box>
                        </TabPanel>
                        <TabPanel>
                            <Text fontSize={"3xl"} m="3">Leaderboard</Text>
                            <Text fontSize={"lg"} m="3" mt="5">By Accuracy</Text>
                            <SimpleGrid columns={6} border="1px solid" borderRadius={"lg"} fontSize="lg" py="2" maxH={"30vh"} overflow="scroll">
                                <GridItem borderBottom={"1px solid"}>#</GridItem>
                                <GridItem colSpan={2} borderBottom="1px solid">Name</GridItem>
                                <GridItem borderBottom="1px solid">Correct</GridItem>
                                <GridItem borderBottom="1px solid">Incorrect</GridItem>
                                <GridItem borderBottom="1px solid">%</GridItem>
                                {leaderboard.map((user, index) => (
                                    <>
                                        <GridItem key={index}>{index+1}</GridItem>
                                        <GridItem colSpan={2}>{user.name}</GridItem>
                                        <GridItem color="green.500">{user.correct}</GridItem>
                                        <GridItem color="red.500">{user.incorrect}</GridItem>
                                        <GridItem color="blue.500">{Math.floor(user.correct/(user.correct+user.incorrect)*100)}%</GridItem>
                                    </>
                                ))}
                            </SimpleGrid>
                            <Text fontSize={"lg"} m="3" mt="5">By Questions Answered</Text>
                            <SimpleGrid mt="5" columns={5} border="1px solid" borderRadius={"lg"} fontSize="lg" py="2" maxH={"30vh"} overflow="scroll">
                                <GridItem borderBottom={"1px solid"}>#</GridItem>
                                <GridItem colSpan={2} borderBottom="1px solid">Name</GridItem>
                                <GridItem borderBottom="1px solid">Attempted</GridItem>
                                <GridItem borderBottom="1px solid">%</GridItem>
                                {leaderboard.map((user, index) => (
                                    <>
                                        <GridItem key={index}>{index+1}</GridItem>
                                        <GridItem colSpan={2}>{user.name}</GridItem>
                                        <GridItem color="blue.300">{user.correct+user.incorrect}</GridItem>
                                        <GridItem color="blue.500">{Math.floor(user.correct/(user.correct+user.incorrect)*100)}%</GridItem>
                                    </>
                                ))}
                            </SimpleGrid>
                        </TabPanel>
                        <TabPanel>
                            <Text fontSize={"xl"} m="3">Settings</Text>
                            <Button colorScheme={"red"} w="75%">Unenroll From class</Button>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </>
    );
}

interface assignmentObj {
    title: string;
    due: string;
    gameMode: string;
    assignmentIndex: number;
    completedBy: Array<number>;
}

const AssignmentModal = ({assignment, isOpen, onClose}: {assignment: assignmentObj; isOpen: boolean; onClose: () => void;}) =>  {
    return (
        <>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>{assignment.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                    <Text my={2}>Task: {assignment.title}</Text>
                    <Text my={2}>Game Mode: {assignment.gameMode}</Text>
                    <Text my={2}>Due: {assignment.due}</Text>
            </ModalBody>
    
            <ModalFooter>
                <Button colorScheme='blue' width={"90%"} mr={3} onClick={onClose}>
                Start Assignment 
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}

const ClassSets = () => {
    return (
        <>
            <Box color="blue.400" fontWeight={"extrabold"} fontSize={"2xl"} my="5" margin={"auto"} >
                <Icon as={IoSchool} mr="6" mb="-1" w="8" h="8"></Icon>
                Bob's Class
            </Box>
            <Box width={{base: "95%", lg: "80%"}}></Box>
        </>
    )
}

export default function ClassPage({curClass}: {curClass: classObj}) {
    return (
        <> 
            <SimpleGrid minChildWidth='250px' spacing={6}>
                <GridItem colSpan={{base: 1, lg: 2}}><ClassSets /></GridItem>
                <GridItem><RightSidebar /></GridItem>
            </SimpleGrid>
        
        </>
    );
}

