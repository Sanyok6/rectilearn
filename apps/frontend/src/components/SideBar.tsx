import React, { ReactNode, ReactText } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
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
  useColorMode
} from '@chakra-ui/react';

import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiSun,
  FiMoon,
} from 'react-icons/fi';
import { IconType } from 'react-icons';

interface LinkItemProps {
  name: string;
  icon: IconType;
}

const LinkItems: Array<LinkItemProps> = [
//   { name: 'Home', icon: FiHome },
//   { name: 'Trending', icon: FiTrendingUp },
//   { name: 'Favourites', icon: FiStar },
//   { name: 'Settings', icon: FiSettings },
    { name: 'Sets', icon: FiStar },
    { name: 'Games', icon: FiBell },
    { name: 'Explore', icon: FiCompass }
];

export default function Sidebar({
  children,
}: {
  children?: ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="0.5s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Username
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}

const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: useColorModeValue('blue.300', 'blue.500'),
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
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
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Username
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton 
            size="lg"
            variant="ghost"
            aria-label="toggle theme"
            icon={useColorModeValue(<FiSun />, <FiMoon />)}
            onClick={toggleColorMode}
        />
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                    size={'sm'}
                    src={
                        'data:image/png;base64,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'
                    }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">Name Here</Text>
                  <Text fontSize="xs" color="gray.600">
                    Role Here
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
              <MenuItem
              >Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};