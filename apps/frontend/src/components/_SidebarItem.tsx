import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

interface ISidebarItemProps extends ButtonProps {
    children: React.ReactNode;
}

const SidebarItem: React.FC<ISidebarItemProps> = ({ children, ...rest }): React.ReactElement => {
    return (
        <Button
            backgroundColor={"inherit"}
            border={"none"}
            color={"rbg(70,70,70)"}
            fontSize={"x-large"}
            width={"100%"}
            _hover={{
                    color: "blue",
                    textDecoration: "underline"
            }}
            {...rest}
        >
            {children}
        </Button>
    )
}

export default SidebarItem