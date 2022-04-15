import { Formik, Field } from "formik";
import {
    Box,
    useColorModeValue,
    Stack,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    HStack,
    Button,
    Divider,
    Text,
    chakra,
    Link,
    useToast
} from "@chakra-ui/react";
import NextLink from 'next/link';
import { PasswordField } from "../PasswordField";
import { FiUser } from "react-icons/fi";

const LoginForm = () => {
    const toast = useToast();
    const bgEmail = useColorModeValue(undefined, 'RGBA(0, 0, 0, 0.16)');
    const guestColor = useColorModeValue("blue", "blue.200");
    return (
        <Box
            py={{ base: '6', sm: '8' }}
            px={{ base: '4', sm: '10' }}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
            borderRadius={'xl'}
        >
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    rememberMe: false
                }}
                onSubmit={async (values) => {
                    const d = new FormData();
                    Object.entries(values).forEach((val) => {
                        d.append(val[0], JSON.stringify(val[1]));
                    });
                    await fetch("/api/auth/token", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        },
                        body: d
                    })
                    // alert(JSON.stringify(values, null, 2));
                }}
            >
                {({ handleSubmit, errors, touched }) => (
                    <form onSubmit={handleSubmit}>
                        <Stack spacing="6">
                            <Stack spacing="5">
                                <FormControl>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Field as={Input} id="email" type="email" name="email" bg={bgEmail} />
                                </FormControl>
                                <PasswordField errors={errors} touched={touched} />
                            </Stack>
                            <HStack justify="space-between">
                                <Field as={Checkbox} id="rememberMe" name="rememberMe" defaultIsChecked>Remember me</Field>
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
                                <Button type="submit" variant="primary" bg={"blue.400"} color={"white"} _hover={{ transform: "scale(1.01)" }}>Login</Button>
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
                                                color={guestColor}
                                                px={"3.2px"}
                                                _hover={{ textDecor: "underline", transform: "scale(1.05)" }}>Guest</chakra.span>
                                            </Text>
                                        </HStack>
                                    </Link>
                                </NextLink>
                            </Stack>
                        </Stack>
                    </form>
                )}
            </Formik>
        </Box>
    )
}

export default LoginForm;