import {
    Box, Center, ScaleFade, Skeleton, useBreakpointValue, VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import CardGrid from './CardGrid';
import GameCard from './GameCard';

export const games = [
    {
        id: 1,
        name: "Fishillionare",
        imageUrl: "/screenshots/fishing.png"
    },
    {
        id: 2,
        name: "Food Fight",
        imageUrl: "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc="
    },
    {
        id: 3,
        name: "The floor is lava",
        imageUrl: "/screenshots/lavaGame.png"
    },
    {
        id: 4,
        name: "Escape",
        imageUrl: "/screenshots/bushGame.png"
    },
];

const GameCardStack = () => {
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
                    <CardGrid autoRows="1fr">
                        <GameCard
                            games={{ id: 10, name: "GAME OF THE DAY", imageUrl: "https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc=" }}
                            rootProps={{
                                gridRow: "1 / 3",
                                gridColumn: useBreakpointValue({ base: "1 / 3 ", md: "1 / 4" }),
                            }}
                        />
                        {games.map((game, index) => (
                            <GameCard games={game} key={index} />
                        ))}
                    </CardGrid>
                </Box>
            </ScaleFade>
        </>
    );
}

export default GameCardStack;