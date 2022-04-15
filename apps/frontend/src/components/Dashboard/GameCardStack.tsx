import {
    Box, Center, ScaleFade, Skeleton, useBreakpointValue, useDisclosure, VStack,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import CardGrid from './CardGrid';
import GameCard from './GameCard';

const games = [
    {
        id: 1,
        name: "WWWWWWWWWWWWWWWWWWWWWWW",
        imageUrl: "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc="
    },
    {
        id: 2,
        name: "test2_ezezeze",
        imageUrl: "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc="
    },
    {
        id: 3,
        name: "test3",
        imageUrl: "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc="
    },
    {
        id: 4,
        name: "test4",
        imageUrl: "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc="
    },
    {
        id: 5,
        name: "test5",
        imageUrl: "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc="
    },
    {
        id: 6,
        name: "test6",
        imageUrl: "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc="
    },
    {
        id: 7,
        name: "test7",
        imageUrl: "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc="
    },
    {
        id: 8,
        name: "test8",
        imageUrl: "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc="
    },
    {
        id: 9,
        name: "test9",
        imageUrl: "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc="
    },
];

const GameCardStack = () => {
    const { isOpen, onToggle } = useDisclosure();
    useEffect(() => {
        onToggle();
    }, []);
    return (
        <>
            {!isOpen && (
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
            <ScaleFade initialScale={0.99} in={isOpen}>
                <Box
                    maxW="7xl"
                    mx="auto"
                    px={{ base: '4', md: '8', lg: '12' }}
                    py={{ base: '6', md: '8', lg: '12' }}
                    display={isOpen ? undefined : "none"}
                >
                    <CardGrid autoRows="1fr">
                        <GameCard
                            games={{ id: 10, name: "GAME OF THE DAY", imageUrl: "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=" }}
                            rootProps={{
                                gridRow: "1 / 3",
                                gridColumn: useBreakpointValue({ base: "1 / 3 ", md: "1 / 4" }),
                            }}
                        />
                        {games.map((game) => (
                            <GameCard games={game} />
                        ))}
                    </CardGrid>
                </Box>
            </ScaleFade>
        </>
    );
}

export default GameCardStack;