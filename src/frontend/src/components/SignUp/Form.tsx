import { Formik, Field } from "formik";
import {
    Box,
    useColorModeValue,
    Stack,
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast,
} from "@chakra-ui/react";
import { PasswordField } from "../PasswordField";
import { useRouter } from "next/router";

const SignUpForm = () => {
    const bgFields = useColorModeValue(undefined, 'RGBA(0, 0, 0, 0.16)');
    const Router = useRouter();
    const toast = useToast();
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
                    name: "",
                    password: "",
                }}
                onSubmit={async (values) => {
                    const res = await fetch("/api/auth/users/create/", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(values)
                    }).catch(console.error);
                    if (res && res.status === 200) {
                        Router.replace("/login")
                    } else {
                        toast({
                            title: "Something went wrong",
                            description: res ? (await res.json()).detail || "err" : "Something went wrong while trying to sign you up. Please try again.",
                            status: "error",
                            isClosable: true,
                            duration: null
                        })
                    }
                    // alert(JSON.stringify(values, null, 2));
                }}
            >
                {({ handleSubmit, errors, touched }) => (
                    <form onSubmit={handleSubmit}>
                        <Stack spacing="6">
                            <Stack spacing="5">
                                <FormControl>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Field as={Input} id="email" type="email" name="email" bg={bgFields} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel htmlFor="username">Username</FormLabel>
                                    <Field as={Input} id="username" type="username" name="name" bg={bgFields} />
                                </FormControl>
                                <PasswordField errors={errors} touched={touched} />
                            </Stack>
                            <Stack spacing="6">
                                <Button type="submit" variant="primary" bg={"blue.400"} color={"white"} _hover={{ transform: "scale(1.01)" }}>Sign Up</Button>
                            </Stack>
                        </Stack>
                    </form>
                )}
            </Formik>
        </Box>
    )
}

export default SignUpForm;