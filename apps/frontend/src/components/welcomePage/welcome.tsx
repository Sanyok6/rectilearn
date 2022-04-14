import { Box } from "@chakra-ui/react";
import NavBar from "./navBar";
import Background from "./background";
import Section1 from "./section1";
import Section2 from "./section2";

export default function WelcomePage() {
    return (
        <>
            <Box>
                <Background /> 
                <NavBar />
                <Section1 />
                <Section2 />
            </Box>
        </>
    )
}