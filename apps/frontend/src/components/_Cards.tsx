import { Box, Flex, Heading } from "@chakra-ui/react";
import React from "react";

interface ICardsProps {
    children?: React.ReactNode;
}

const Cards: React.FC<ICardsProps> = ({ children }) => {
    return (
        <Box marginLeft={"17vw"} marginTop={"1vh"}>
            <Heading as="h1" textAlign={"left"} fontSize={"xx-large"}>
                Study Sets
            </Heading>
            <Flex flexWrap={"wrap"}>
                {children}
            </Flex>
        </Box>
    )
}

export default Cards;