"use client";

import { 
    Box, 
    Button, 
    Container, 
    Heading, 
    Stack,
    Text, 
    useColorModeValue,
} from '@chakra-ui/react'
// import NextLink from 'next/link';
import { Link } from '@chakra-ui/next-js';

import "@fontsource/pacifico"

import FadeIn from './fadeIn'
import { useContext } from 'react';
import AuthCtx from '@/lib/auth';
import { PathCtx } from '@/utils/useNavigationEvent';

export default function Section3() {
    const ctx = useContext(AuthCtx);
    const path = useContext(PathCtx);

    return (
        <FadeIn>
            <Box as="section" bg="bg-surface" minHeight="50vh" my={40}>
                <Container py={{ base: '16', md: '24' }}>
                <Stack spacing={{ base: '8', md: '10' }}>
                    <Stack spacing={{ base: '4', md: '5' }} align="center">
                    <Heading color="blue.500" fontSize={40}>Ready to start learning smarter?</Heading>
                    <Text color={useColorModeValue("black.500", "#CBD5E0")} maxW="2xl" textAlign="center" fontSize="xl">
                        Level up your learning journey with the best studying tool in existence! Create your account for free!
                    </Text>
                    </Stack>
                    <Stack spacing="3" direction={{ base: 'column', sm: 'row' }} justify="center">
                    <Link
                        href={ctx.loggedIn ? "/dashboard" : "/login"}
                        padding="10" 
                        borderRadius={20} 
                        fontSize={30} 
                        color={useColorModeValue("blue.600", "blue.400")} 
                        animation={""} 
                        shadow="0px 0px 28px 14px #0ff;"
                        onClick={() => path.setPath(true)}
                    >
                        Start learning
                    </Link>
                    </Stack>
                </Stack>
                </Container>
            </Box>
        </FadeIn>
    )
}