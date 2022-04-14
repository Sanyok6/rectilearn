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
    Divider,
    useColorModeValue,
    Link,
    chakra,
    useToast,
} from '@chakra-ui/react';
import React from 'react';
import { PasswordField } from './PasswordField';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FiUser } from 'react-icons/fi';

const LoginPage = () => {
    const Router = useRouter();
    const toast = useToast();
    return (
        <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
            <Stack spacing="8">
            <Stack spacing="6">
                <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                <Heading size={'xl'}>
                    Log in to your account
                </Heading>
                <HStack spacing="1" justify="center">
                    <Text color="muted">Don't have an account?</Text>
                    <Button variant="link" colorScheme="blue" onClick={() => Router.push("/signup")}>
                        Sign up
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
                        <PasswordField />
                    </Stack>
                    <HStack justify="space-between">
                        <Checkbox defaultIsChecked>Remember me</Checkbox>
                        <Button
                            variant="link"
                            colorScheme="blue"
                            size="sm"
                            onClick={() => toast({
                                title: 'You forgot your password?',
                                description: "Consider using a password manager. Contact us on our GitHub Page to free your account.",
                                status: 'warning',
                                duration: 9000,
                                isClosable: true,
                            })}
                        >
                            Forgot password?
                        </Button>
                    </HStack>
                    <Stack spacing="6">
                        <Button variant="primary" bg={"blue.400"} color={"white"} _hover={{ transform: "scale(1.01)" }}>Login</Button>
                        <HStack>
                        <Divider />
                        <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                            or
                        </Text>
                        <Divider />
                        </HStack>
                        <NextLink href="#" passHref>
                            <Link maxW="40%" alignSelf="center" _hover={{
                                textDecor: "none",
                            }}>
                                <HStack>
                                    <FiUser />
                                    <Text>Login as<chakra.span
                                        color={useColorModeValue("blue", "blue.200")}
                                        px={"3.2px"}
                                        _hover={{ textDecor: "underline", transform: "scale(1.05)" }}>Guest</chakra.span>
                                    </Text>
                                </HStack>
                            </Link>
                        </NextLink>
                    </Stack>
                </Stack>
            </Box>
            </Stack>
        </Container>
    );
}

export default LoginPage;