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
    chakra
} from '@chakra-ui/react';
import React, { useState } from 'react';
import NextImage from 'next/image';

export const Image = chakra(NextImage, {
    baseStyle: { maxH: 120, maxW: 120 },
    shouldForwardProp: (prop) =>
      [
        "width",
        "height",
        "src",
        "alt",
        "quality",
        "placeholder",
        "blurDataURL",
        "loader",
        "layout",
        "onLoad"
      ].includes(prop),
});

interface game {
    id: number;
    name: string;
    imageUrl: string;
}

interface Props {
    games: game;
    rootProps?: StackProps
}

const GameCard = (props: Props) => {
    const { games, rootProps } = props;
    const { name, imageUrl } = games;
    const [isLoading, setLoading] = useState<boolean>(true);
    return (
        <Stack spacing={useBreakpointValue({ base: '4', md: '5' })} {...rootProps}>
            <Box
                maxW={'1540px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'2xl'}
                rounded={'xl'}
                p={5}
                textAlign={'center'}
                height="100%"
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
                                alt={name}
                                draggable="false"
                                layout="fill"
                                onLoad={() => setLoading(false)}
                                display={isLoading ? "none" : undefined}
                                borderRadius={useBreakpointValue({ base: 'md', md: 'xl' })}
                            />
                        </>
                    </AspectRatio>
                </Box>
                <Stack mt={2} mb={3}>
                    <Stack spacing="1">
                        <Tooltip label={name} aria-label={`tooltip ${name}`}>
                            <Text fontWeight="medium" color={useColorModeValue('gray.700', 'white')} fontSize="2xl" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" width="100%">
                                {name}
                            </Text>
                        </Tooltip>
                    </Stack>
                    <Stack>
                        <Button>PLAY</Button>
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    )
}

export default GameCard;