import {
    Box, Center, ScaleFade, Skeleton, useBreakpointValue, VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import CardGrid from './CardGrid';
import GameCard from './GameCard';
import useSWR from 'swr';
import { StudySet } from './Card';

export const games = [
    {
        id: 1,
        name: "Fishillionare",
        imageUrl: "/screenshots/fishing.png",
        gameName: "fishingGame"
    },
    {
        id: 2,
        name: "Food Fight",
        imageUrl: "/screenshots/foodFight.png",
        gameName: "foodFight"
    },
    {
        id: 3,
        name: "The floor is lava",
        imageUrl: "/screenshots/lavaGame.png",
        gameName: "lavaGame"
    },
    {
        id: 4,
        name: "Escape the room as a bush",
        imageUrl: "/screenshots/bushGame.png",
        gameName: "bushGame"
    },
];

const fetcher = (url: string) =>
	fetch(url, { headers: { "Content-Type": "application/json" } }).then(
		(res) => res.json()
	);

const GameCardStack = () => {
    const [shouldOpen, setShouldOpen] = useState<boolean>(false);
	const { data: d, error } = useSWR<Array<StudySet>>("/api/studysets/", fetcher);
    const [data, setData] = useState<Array<StudySet>>([]);
    useEffect(() => {
        setShouldOpen(true);
    }, []);
    useEffect(() => {
        if (d) {
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
                    px={{ base: '4', md: '8', lg: '12' }}
                    py={{ base: '6', md: '8', lg: '12' }}
                    display={shouldOpen ? undefined : "none"}
                >
                    <CardGrid autoRows="1fr">
                        <GameCard
                            games={games[Math.floor(Math.random() * games.length)]}
                            rootProps={{
                                gridRow: "1 / 3",
                                gridColumn: useBreakpointValue({ base: "1 / 3 ", md: "1 / 4" }),
                            }}
                            studySets={data}
                        />
                        {games.map((game, index) => (
                            <GameCard games={game} key={index} studySets={data} />
                        ))}
                    </CardGrid>
                </Box>
            </ScaleFade>
        </>
    );
}

export default GameCardStack;