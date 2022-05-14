import { Box, Center, Flex, useColorModeValue } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";

import SignUpPage from "../components/SignUp/Prompt";
import NavBar from "../components/Home/navBar";

const SignUp: NextPage = () => {
  return (
    <>
      <Head>
        <title>Page</title>
      </Head>
      <Flex flexDir="column" height="100vh">
        <Box flex="0 1 auto">
          <NavBar />
        </Box>
        <Center bg={useColorModeValue("#F7FAFC", "gray.900")} height="100%" flex="1 1 auto">
          <SignUpPage />
        </Center>
      </Flex>
    </>
  );
}

export default SignUp;