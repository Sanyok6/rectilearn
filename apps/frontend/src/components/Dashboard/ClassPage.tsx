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

} from '@chakra-ui/react';

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
    const assignments = [{title: "Complete 20 questions", due: "1/1/22", completed:true}, {title: "Earn $100 in Food Fight", due: "1/2/22", completed:true}, {title: "Complete 40 questions", due: "10/1/22", completed:false}];
    const leaderboard = [{name: "Sanya", correct: 10, incorrect: 5}, {name: "Rush", correct: 10, incorrect: 6}, {name: "llama", correct: 10, incorrect: 7},{name: "Sanya", correct: 10, incorrect: 5}, {name: "Rush", correct: 10, incorrect: 6}, {name: "llama", correct: 10, incorrect: 7},{name: "Sanya", correct: 10, incorrect: 5}, {name: "Rush", correct: 10, incorrect: 6}, {name: "llama", correct: 10, incorrect: 7},{name: "Sanya", correct: 10, incorrect: 5}, {name: "Rush", correct: 10, incorrect: 6}, {name: "llama", correct: 10, incorrect: 7},];
    return (
        <>

            <Box borderRadius={"lg"} bg={useColorModeValue('white', '#171923')} >

                <Tabs isFitted variant='enclosed'>
                    <TabList mb='1em'>
                        <Tab>Stats</Tab>
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
                                    <Box key={index} my="1">
                                        <Flex border="solid rgba(39, 211, 245, 0.8) 1px" borderRadius={"2xl"} justifyContent="space-between" p="3">
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

export default function ClassPage() {
    return (
        <>

            <SimpleGrid minChildWidth='250px' spacing={6}>
                <GridItem bg='blue.500' colSpan={{base: 1, lg: 2}}></GridItem>
                <GridItem><RightSidebar /></GridItem>
            </SimpleGrid>
        
        </>
    );
}

