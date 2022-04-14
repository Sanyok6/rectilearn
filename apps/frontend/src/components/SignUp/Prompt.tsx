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
import { PasswordField } from './PasswordField';
import { useRouter } from 'next/router';

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
            <Box
                py={{ base: '6', sm: '8' }}
                px={{ base: '4', sm: '10' }}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
                borderRadius={'xl'}
            >
                <Stack spacing="6">
                    <Stack spacing="5">
                        <FormControl>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input id="email" type="email" bg={useColorModeValue(undefined, 'RGBA(0, 0, 0, 0.16)')} />
                        </FormControl>
                        <FormControl>
                        <FormLabel htmlFor="username">Username</FormLabel>
                        <Input id="username" type="username" bg={useColorModeValue(undefined, 'RGBA(0, 0, 0, 0.16)')} />
                        </FormControl>
                        <PasswordField />
                    </Stack>
                    <HStack justify="space-between">
                        <Checkbox defaultIsChecked>Remember me</Checkbox>
                    </HStack>
                    <Stack spacing="6">
                        <Button variant="primary" bg={"blue.400"} color={"white"} _hover={{ transform: "scale(1.01)" }}>Sign Up</Button>
                    </Stack>
                </Stack>
            </Box>
            </Stack>
        </Container>
    );
}

export default LoginPage;