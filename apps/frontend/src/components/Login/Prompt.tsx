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
    useBreakpointValue,
    useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import { PasswordField } from './PasswordField'

const LoginPage = () => (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        <Stack spacing="8">
        <Stack spacing="6">
            {/* Put logo here? */}
            <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={'xl'}>
                Log in to your account
            </Heading>
            <HStack spacing="1" justify="center">
                <Text color="muted">Don't have an account?</Text>
                <Button variant="link" colorScheme="blue">
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
                    <Button variant="link" colorScheme="blue" size="sm">
                        Forgot password?
                    </Button>
                </HStack>
                <Stack spacing="6">
                    <Button variant="primary" bg={"blue.400"} color={"white"}>Login</Button>
                    {/* <HStack>
                    <Divider />
                    <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                        or continue with
                    </Text>
                    <Divider />
                    </HStack> */}
                </Stack>
            </Stack>
        </Box>
        </Stack>
    </Container>
);

export default LoginPage;