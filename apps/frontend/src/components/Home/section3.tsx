import { 
    Box, 
    Button, 
    Container, 
    Heading, 
    Stack, 
    Text, 
    useColorModeValue,
} from '@chakra-ui/react'

import "@fontsource/pacifico"

import FadeIn from './fadeIn'

export default function Section3() {
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
                        <Button 
                            padding="10" 
                            borderRadius={20} 
                            fontSize={30} 
                            color={useColorModeValue("blue.600", "blue.400")} 
                            animation={""} 
                            shadow="0px 0px 28px 14px #0ff;"
                        >
                            <Text>Start learning</Text>
                        </Button>
                    </Stack>
                </Stack>
                </Container>
            </Box>
        </FadeIn>
    )
}