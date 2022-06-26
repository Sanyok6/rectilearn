import React, { Dispatch, ReactNode, ReactText, SetStateAction, useContext, useState } from "react";
import {
  Button,
  IconButton,
  Avatar,
  Box,
  // CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Switch,
  Image,
} from "@chakra-ui/react";

import {
  FiCompass,
  FiStar,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { IoGameController } from "react-icons/io5";
import NextLink from "next/link";
import { IconType } from "react-icons";
import { SectionType } from "../../pages/dashboard";
import DashboardCtx from "../../lib/dashboard";
import { useRouter } from "next/router";

import "@fontsource/pacifico"

interface LinkItemProps {
  name: string;
  icon: IconType;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Sets", icon: FiStar },
  { name: "Games", icon: IoGameController },
  { name: "Explore", icon: FiCompass },
];

const LinkItemsBined: Array<LinkItemProps> = [
  { name: "Sets & Games", icon: FiStar },
  { name: "Explore", icon: FiCompass },
]

export default function Sidebar({
  children,
  alterSection,
}: {
  children?: ReactNode;
  alterSection: Dispatch<SetStateAction<SectionType>>;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={onClose}
        display={{ base: "none", md: "block" }}
        alterSection={alterSection}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} alterSection={alterSection} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box
        ml={{ base: 0, md: 60 }}
        p="4"
        bg={useColorModeValue("gray.100", "gray.800")}
      >
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  alterSection: Dispatch<SetStateAction<SectionType>>;
}

const SidebarContent = ({ onClose, alterSection, ...rest }: SidebarProps) => {
  const ctx = useContext(DashboardCtx);
  const LinkItemsArr = ctx.groupGS ? LinkItemsBined : LinkItems;
  return (
    <Box
      transition="0.2s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <Box mx="4" fontFamily={"pacifico"}><NextLink href={"/"}>Rectilearn</NextLink></Box>
        </Flex>
      {LinkItemsArr.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          alterSection={() => [
            alterSection(link.name.toLowerCase() as SectionType),
            onClose(),
          ]}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  alterSection: React.MouseEventHandler<HTMLAnchorElement>;
}

const NavItem = ({ icon, children, alterSection, ...rest }: NavItemProps) => {
  return (
    <Link
      onClick={alterSection}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: useColorModeValue("blue.300", "blue.500"),
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { toggleColorMode } = useColorMode();
  const { 
    isOpen: isAvOpen, 
    onOpen: onAvOpen, 
    onClose: onAvClose 
  } = useDisclosure()
  const {
    isOpen: isStOpen,
    onOpen: onStOpen,
    onClose: onStClose,
  } = useDisclosure();
  const { user } = useContext(DashboardCtx);
  const Router = useRouter();

  const [avatarIndex, setAvatarIndex] = useState(user.profile_picture_index);

  const avatars = ["/avatars/avatar_b.png", "/avatars/avatar_g.png", "/avatars/avatar_o.png", "/avatars/avatar_p.png"];
  
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
        overflow="hidden"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
        width="100%"
      >
        {user.name || "Loading"}
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="toggle theme"
          icon={useColorModeValue(<FiSun />, <FiMoon />)}
          onClick={toggleColorMode}
        />
        {/* <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        /> */}
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  bg="inherit"
                  borderRadius="0"
                  src={
                    avatars[avatarIndex] || avatars[user.profile_picture_index]
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user.name || "Loading"}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {user.role || "Loading"}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem onClick={onAvOpen}>Avatar</MenuItem>
              <AvatarModal isAvOpen={isAvOpen} onAvClose={onAvClose} avatars={avatars} avatarIndex={avatarIndex || user.profile_picture_index} setAvatarIndex={setAvatarIndex}/>
              <MenuItem onClick={onStOpen}>Settings</MenuItem>
              <SettingsModal isStOpen={isStOpen} onStClose={onStClose} />
              <MenuDivider />
              <MenuItem onClick={() => Router.push("/api/logout")}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const SettingsModal = ({ isStOpen, onStClose }: { isStOpen: boolean, onStClose: () => void }) => {
  const { groupGS, setGroupGS } = useContext(DashboardCtx);
  return (
    <Modal isOpen={isStOpen} onClose={onStClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <HStack align="center" justify="center">
            <Text>Show Games and Sets in same panel</Text>
            <Switch isChecked={groupGS} onChange={(e: any) => setGroupGS(e.target.checked)}></Switch>
          </HStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onStClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

function AvatarModal({ isAvOpen, onAvClose, avatars, avatarIndex, setAvatarIndex}: { isAvOpen: boolean, onAvClose: () => void, avatars: Array<string>, avatarIndex: number, setAvatarIndex: (index: number) => void }) {
  return (
    <>
      <Modal isOpen={isAvOpen} onClose={onAvClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>select an avatar</ModalHeader>
          <ModalCloseButton />
          <ModalBody my={3}>
            <Flex justify="center" align="center" flexWrap="wrap">
              {avatars.map((avatar, index) => (
                <Image 
                  p={1} 
                  bgColor={index == avatarIndex && "rgba(0, 212, 255, 0.4)"} 
                  onClick={() => {
                    setAvatarIndex(index)                  
                    fetch("/api/set-profile-picture/"+index, {method: 'POST'})
                  }} 
                  borderRadius="30%" 
                  width="20" 
                  src={avatar}
                  _hover={{bgColor: "rgba(0, 212, 255, 0.2)"}}
                  />
              ))}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button w="70%" margin="auto" colorScheme='blue' onClick={onAvClose}>
              Select
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}