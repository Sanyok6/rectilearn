"use client";

import {
    Button,
    Container,
    Heading,
    HStack,
    Stack,
    Text,
    Center,
    useColorModeValue
} from '@chakra-ui/react';
// import React from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from './Form';

const LoginPage = () => {
    const Router = useRouter();
    return (
        <Center bg={useColorModeValue("#F7FAFC", "gray.900")} height="100%" flex="1 1 auto">
            <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
                <Stack spacing="8">
                <Stack spacing="6">
                    <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                    <Heading size={'xl'}>
                        Log in to your account
                    </Heading>
                    <HStack spacing="1" justify="center">
                        <Text color="muted">{"Don't have an account?"}</Text>
                        <Button variant="link" colorScheme="blue" onClick={() => Router.push("/signup")}>
                            Sign up
                        </Button>
                    </HStack>
                    </Stack>
                </Stack>
                <LoginForm />
                </Stack>
            </Container>
        </Center>
    );
}

export default LoginPage;