"use client";

import {
    Button,
    Container,
    Heading,
    HStack,
    Stack,
    Center,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
// import { PasswordField } from '../PasswordField';
import { useRouter } from 'next/navigation';
import SignUpForm from './Form';
import { PathCtx } from '@/utils/useNavigationEvent';

const LoginPage = () => {
    const Router = useRouter();
    const path = useContext(PathCtx);
    return (
        <Center bg={useColorModeValue("#F7FAFC", "gray.900")} height="100%" flex="1 1 auto">
            <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
                <Stack spacing="8">
                <Stack spacing="6">
                    {/* Put logo here? */}
                    <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                    <Heading size={'xl'}>
                        Sign up for an account
                    </Heading>
                    <HStack spacing="1" justify="center">
                        <Text color="muted">Already have an account?</Text>
                        <Button variant="link" colorScheme="blue" onClick={() => [path.setPath(true), Router.push("/login")]}>
                            Login
                        </Button>
                    </HStack>
                    </Stack>
                </Stack>
                <SignUpForm />
                </Stack>
            </Container>
        </Center>
    );
}

export default LoginPage;