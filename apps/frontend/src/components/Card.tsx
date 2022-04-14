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
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { Image } from '../utils/chakraImage';

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

interface set {
    id: number;
    name: string;
    imageUrl: string;
}

interface Props {
    sets: set;
    rootProps?: StackProps
}

const Card = (props: Props) => {
    const { sets, rootProps } = props;
    const { name, imageUrl } = sets;
    const [isLoading, setLoading] = useState<boolean>(true);
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
                                alt={name}
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
                        aria-label={`Add ${name} to your favourites`}
                    />
                    <InfoButton
                        position="absolute"
                        top="2"
                        right="47"
                        aria-label={`View ${name} information`}
                    />
                </Box>
                <Stack mt={2} mb={3}>
                    <Stack spacing="1">
                        <Tooltip label={name} aria-label={`tooltip ${name}`}>
                            <Text fontWeight="medium" color={useColorModeValue('gray.700', 'white')} fontSize="2xl" overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" width="100%">
                                {name}
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
                    >
                        Edit
                    </Button>
                    <Button
                        colorScheme="red"
                        isFullWidth
                        flex={1}
                        fontSize={'sm'}
                    >
                        Delete
                    </Button>
                </Stack>
            </Box>
        </Stack>
    )
}

export default Card;