import { Heading, Box, useColorMode } from "@chakra-ui/react";
import React from "react";
import SidebarItem from "./_SidebarItem";

const Sidebar = (): React.ReactElement => {
    const { colorMode } = useColorMode();
    return (
        <Box
            width={"14vw"}
            height={"100vh"}
            position={"fixed"}
            top={0}
            left={0}
            background={"white"}
            boxShadow={"0 120px 160px 0 rgba(0,0,0,0.2)"}
            borderRight={"solid"}
            borderColor={"black"}
        >
            <Heading as="h1">
                Username
            </Heading>
            <SidebarItem onClick={() => {/* scrollIntoView on cards_section reference*/}}>
                Sets
            </SidebarItem>
            <SidebarItem onClick={() => {/* scrollIntoView */}}>
                Games
            </SidebarItem>
            <Box
                position={"absolute"}
                left={0}
                right={0}
                marginLeft={"auto"}
                marginRight={"auto"}
                bottom="10px"
            >
                <SidebarItem>
                    Profile
                </SidebarItem>
                <SidebarItem color={"rgb(197, 0, 0)"}>
                    Logout
                </SidebarItem>
            </Box>
        </Box>
    )
}

export default Sidebar;