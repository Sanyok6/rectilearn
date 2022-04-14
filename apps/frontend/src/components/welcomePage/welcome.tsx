import CallToActionWithVideo from "./section1";
import WithAction from "./navBar";
import Background from "./background";
import Section2 from "./section2";

import { Box } from "@chakra-ui/react"

export default function WelcomePage() {
    return (
        <>
            <Box>
                <Background />
                <WithAction />
                <CallToActionWithVideo />
                <Section2 />
            </Box>
        </>
    )
}