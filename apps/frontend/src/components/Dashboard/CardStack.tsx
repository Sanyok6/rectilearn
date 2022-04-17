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
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import CardGrid from './CardGrid';
import Card from './Card';
import { FiPlus } from 'react-icons/fi';
import useSWR from 'swr';
import { exit } from 'process';

interface ICreateCardProps {
    rootProps?: StackProps
}

interface StudySetQuestion {
    question: string,
    answers: Array<string>
}

interface StudySet {
    id: Number,
    subject: string,
    questions: Array<StudySetQuestion>
}

const fetcher = (url: string) => fetch(url, {headers: {"Content-Type": "application/json"}}).then((res) => res.json());

const CardStack = () => {
    const { data, error } = useSWR<StudySet>(
        "/api/studysets/",
        fetcher
      );

    console.log('errors: ', error)
    console.log("data: ", data);

    const [shouldOpen, setShouldOpen] = useState<boolean>(false);
    useEffect(() => {
        setShouldOpen(true);
    }, []);
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
                    px={{ base: '4', md: '8', lg: '12' }}
                    py={{ base: '6', md: '8', lg: '12' }}
                    display={shouldOpen ? undefined : "none"}
                >
                    <CardGrid>
                    {data.map((set) => (
                        <Card key={set.id.toString()} sets={{"subject": set.subject}} />
                    ))}
                    <CreateCard />
                    </CardGrid>
                </Box>
            </ScaleFade>
        </>
    );
}

export default CardStack;

const CreateCard = (props: ICreateCardProps) => {
    const AddRef = useRef<HTMLButtonElement>(null);
    const { rootProps } = props;
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
                height="100%"
                onClick={() => AddRef.current && AddRef.current.focus()}
            >
                <AspectRatio ratio={10 / 9}>
                    <Button ref={AddRef} height="10em" width="10em">
                        <FiPlus size={120} />
                    </Button>
                </AspectRatio>
                <Text fontWeight="bold" fontSize="2xl" mt="2em">
                    {"Create New"}
                </Text>
            </Box>
        </Stack>
    )
}