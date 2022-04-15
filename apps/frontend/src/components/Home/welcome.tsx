import { Box } from "@chakra-ui/react";
import NavBar from "./navBar";
import Background from "./background";
import Section1 from "./section1";
import Section2 from "./section2";
import Section3 from "./section3";
import Footer from "./footer";

export default function WelcomePage() {
    return (
        <>
            <Box>
                <Background /> 
                <NavBar />
                <Section1 />
                <Section2 />
                <Section3 />
                <Footer />
            </Box>
        </>
    )
}