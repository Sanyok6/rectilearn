import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { PasswordField } from '../PasswordField';
import { useRouter } from 'next/router';
import SignUpForm from './Form';

const LoginPage = () => {
    const Router = useRouter();
    return (
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
                    <Button variant="link" colorScheme="blue" onClick={() => Router.push("/login")}>
                        Login
                    </Button>
                </HStack>
                </Stack>
            </Stack>
            <SignUpForm />
            </Stack>
        </Container>
    );
}

export default LoginPage;