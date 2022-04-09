import { Box, Flex, Text, Link, Button, ButtonProps } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

interface ICardProps {
    title: string;
}

interface ICardButtonProps extends ButtonProps {
    children?: React.ReactNode;
}

const CardButton: React.FC<ICardButtonProps> = ({ children, ...rest }) => {
    return (
        <Button
            width={"30%"}
            bg={"none"}
            bgColor={"transparent"}
            padding={"none"}
            border={"none"}
            _hover={{
                color: "blue"
            }}
            {...rest}
        >
            {children}
        </Button>
    )
}

const Card: React.FC<ICardProps> = ({ title }) => {
    return (
        <Box
            height={{ md: "30vh", lg: "35vh"}}
            width={{ md: "25vh", lg: "30vh" }}
            position={"relative"}
            borderRadius={"15px"}
            border={"solid"}
            boxShadow={"0 6px 8px 0 rgba(0,0,0,0.2)"}
            borderWidth={"1.5px"}
            margin={"15px"}
            bgColor={"white"}
        >
            <Text
                width={"100%"}
                height={"15vh"}
                color={"white"}
                bg={"linear-gradient(127deg, rgba(6,211,255,1) 0%, rgba(71,224,255,1) 33%, rgba(121,245,255,1) 100%)"}
                fontSize={"2em"}
                paddingTop={"15%"}
                overflow={"hidden"}
                // borderBottom={"solid"}
                // borderWidth={"1.5px"}
                borderRadius={"15px 15px 0 0"}
                // borderColor={"black"}
                fontWeight={"bold"}
            >
                {"Rectilearn"}
            </Text>
            <Box borderTop={"solid"}>
                <NextLink href={"#"} passHref>
                    <Link
                        fontSize={"x-large"}
                        color={"black"}
                        textDecor={"underline"}
                        _hover={{
                            color: "blue"
                        }}
                    >
                        {title}
                    </Link>
                </NextLink>
                <Text fontSize={"small"} marginTop={"1em"}>
                    {"Created: 00/00/00"}
                </Text>
                <Button
                    bgColor={"blue"}
                    height="4vh"
                    width="45%"
                    border="none"
                    borderRadius={"20px"}
                    color={"white"}
                    fontSize={"medium"}
                    marginTop={"1em"}
                    _hover={{
                        fontSize: "large"
                    }}
                >
                    {"Play"}
                </Button>
            </Box>
            <Flex
                flexWrap={"wrap"}
                borderTop={"solid"}
                borderWidth={"1.5px"}
                borderRadius={"15px"}
                borderTopLeftRadius={"0px"}
                borderTopRightRadius={"0px"}
                position={"absolute"}
                bottom={0}
                left={0}
                width={"100%"}
                justifyContent={"space-evenly"}
            >
                <CardButton>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                    </svg>
                </CardButton>
                <CardButton>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                    </svg>
                </CardButton>
                <CardButton
                    _hover={{
                        color: "red"
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>
                </CardButton>
            </Flex>
        </Box>
    )
}

export default Card;