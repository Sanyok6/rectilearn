import { Box, useColorModeValue } from "@chakra-ui/react"

export default function Background() {
    return (
        <Box 
            position={"fixed"}
            zIndex={-1}
            width={"100%"}
            height={"100%"}
            background={useColorModeValue("radial-gradient(circle, rgba(255,255,255,1) 30%, rgba(179,235,255,1) 100%);", "radial-gradient(circle, rgba(0,0,0,1) 30%, rgba(0,44,60,1) 100%);")}
        />
    )
}