import {
    Box,
    Text,
    Stack,
    StackProps,
    useBreakpointValue,
    useColorModeValue,
    Button,
    AspectRatio
} from '@chakra-ui/react';
import React from 'react';
import CardGrid from './CardGrid';
import Card from './Card';
import { FiPlus } from 'react-icons/fi';

interface ICreateCardProps {
    rootProps?: StackProps
}

const sets = [
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

const CardStack = () => (
  <Box
    maxW="7xl"
    mx="auto"
    px={{ base: '4', md: '8', lg: '12' }}
    py={{ base: '6', md: '8', lg: '12' }}
  >
    <CardGrid>
      {sets.map((set) => (
        <Card key={set.id} sets={set} />
      ))}
      <CreateCard />
    </CardGrid>
  </Box>
);

export default CardStack;

const CreateCard = (props: ICreateCardProps) => {
    const { rootProps } = props;
    return (
        <Stack spacing={useBreakpointValue({ base: '4', md: '5' })} {...rootProps}>
            <Box
                maxW={'420px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.600')}
                boxShadow={'2xl'}
                rounded={'xl'}
                p={5}
                textAlign={'center'}
                height="100%"
            >
                <AspectRatio ratio={10 / 9}>
                    <Button height="10em" width="10em">
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