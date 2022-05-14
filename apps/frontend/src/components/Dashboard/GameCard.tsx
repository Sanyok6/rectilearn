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
    useDisclosure,
    Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	ModalFooter,
    Select,
    useToast
} from '@chakra-ui/react';
import React, { useState, useContext } from 'react';
import { Image } from '../../utils/next-chakra-image';
import { StudySet } from './Card';
import AuthCtx from "../../lib/auth";
import { useRouter } from "next/router";

interface game {
    id: number;
    name: string;
    imageUrl: string;
    gameName: string;
}

interface Props {
    games: game;
    rootProps?: StackProps,
    studySets: Array<StudySet>
}

const GameCard = (props: Props) => {
    const { games, rootProps, studySets } = props;
    const { name, imageUrl, gameName } = games;
    const [isLoading, setLoading] = useState<boolean>(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selected, setSelected] = useState<string>("");
    const { setGameSession } = useContext(AuthCtx);
    const toast = useToast();
    const Router = useRouter();
    function onComplete() {
		if (selected === "") {
			toast({
				title: "Please select a set",
				variant: "warning"
			})
			return;
		}
		setGameSession({
            game: gameName,
            studySet: studySets.find((i) => i.id === Number(selected)) || studySets[0]
        });
        Router.push("/games");
	}
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
                        <Button onClick={onOpen}>PLAY</Button>
                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Select a set to study</ModalHeader>
                                <ModalBody>
                                    <Select placeholder="select a set to study" value={selected} onChange={(e) => setSelected(e.target.value)}>
                                        {studySets.map((i, ind) => (
                                            <option key={ind} value={String(i.id)}>{i.subject}</option>
                                        ))}
                                    </Select>
                                </ModalBody>
                                <ModalFooter>
                                    <Button colorScheme="blue" mr={3} onClick={onComplete}>
                                        Play
                                    </Button>
                                    <Button colorScheme="red" mr={3} onClick={onClose}>
                                        Cancel
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    )
}

export default GameCard;