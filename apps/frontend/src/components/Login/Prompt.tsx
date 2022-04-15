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
import React, {useState} from 'react';
import requestApi from '../../utils/api';
import { PasswordField } from './PasswordField';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FiUser } from 'react-icons/fi';
import { BiHandicap } from 'react-icons/bi';


async function handleLogin(email: string, password: string): Promise<void> {
    console.log("clicked")
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);
    requestApi('auth/token', 'POST', {'Content-Type': `multipart/form-data}`}, formData).then((response) => {
        console.log(response)
        if (response.status === 200) {
            localStorage.setItem('accessToken', response.data['access_token']);
        } else {
            // Show error message
        }
    });
}

const LoginPage = () => {
    const Router = useRouter();
    const toast = useToast();

    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');

    const handleEmailChange = (newEmail: any) => {
        console.log("email changed")
        updateEmail(newEmail);
    }

    const handlePasswordChange = (newPassword: any) => {
        console.log("password changed")
        updatePassword(newPassword);
    }

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
                        <Input id="email" onChange={handleEmailChange} type="email" bg={useColorModeValue(undefined, 'RGBA(0, 0, 0, 0.16)')} />
                        </FormControl>
                        <PasswordField onChange={handlePasswordChange} />
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
`                        <Button variant="primary" bg={"blue.400"} color={"white"} _hover={{ transform: "scale(1.01)" }} onClick={() => handleLogin(email, password)}>Login</Button>
`                        <HStack>
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