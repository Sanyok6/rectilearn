import CallToActionWithVideo from "./ctaVideo";
import WithAction from "./navBar";
import Background from "./background";

import { Box } from "@chakra-ui/react"

export default function WelcomePage() {
    return (
        <>
            <Box>
                <Background />
                <WithAction />
                <CallToActionWithVideo />
            </Box>
        </>
    )
}