"use client";

import { ReactNode, useContext } from 'react';
import {
  Box,
  Flex,
  HStack,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
  IconButton
} from '@chakra-ui/react';
import "@fontsource/pacifico";
import { Link } from '@chakra-ui/next-js';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import {
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { usePathname } from 'next/navigation';
import AuthCtx from '@/lib/auth';
import { PathCtx } from '@/utils/useNavigationEvent';

const links = [
  {
    name: 'Home',
    url: '/'
  },
  // {
  //   name: 'About',  // about page does not exist currently
  //   url: '/about'
  // },
  {
    name: 'Login',
    url: '/login'
  },
  {
    name: 'Signup',
    url: '/signup'
  },
  {
    name: 'Dashboard',
    url: '/dashboard'
  }
];

const NavLink = ({ children, href }: { children: ReactNode, href: string }) => {
  const { setPath }= useContext(PathCtx);
  return (
    <Link
      href={href}
      px={3}
      py={2}
      rounded={'md'}
      fontWeight={"bold"}
      color={useColorModeValue('gray.600', undefined)}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('blue.100', 'gray.700'),
      }}
      onClick={() => setPath(true)}
    >
      {children}
    </Link>
  );
}

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  const pathname = usePathname();
  const ctx = useContext(AuthCtx);
  const { setPath } = useContext(PathCtx);
  const Links = links.filter((i) => {
    if (["/login", "/signup"].includes(i.url) && ctx.loggedIn) {
      return false;
    } else if (i.url === "/dashboard" && !ctx.loggedIn) {
      return false;
    }
    return (i.url !== pathname.toLowerCase())
  });
  return (
    <>
      <Box bg={useColorModeValue('rgba(0, 0, 0, 0.05)', 'rgba(0, 0, 0, 0.5)')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <Box fontFamily={"pacifico"}>
              <Link href={"/"} onClick={() => setPath(true)}>Rectilearn</Link>
            </Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}
            >
              <IconButton
                size="lg"
                variant="ghost"
                aria-label="toggle theme"
                icon={useColorModeValue(<FiSun />, <FiMoon />)}
                onClick={toggleColorMode}
                _hover={{
                  bg: useColorModeValue('blue.100', 'gray.700')
                }}
              />
              {Links.map((link, index) => (
                <NavLink key={index} href={link.url}>{link.name}</NavLink>
              ))}
            </HStack>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'flex', md: 'none' }}
            >
              <IconButton
                size={'md'}
                variant="ghost"
                aria-label="toggle theme"
                icon={useColorModeValue(<FiSun />, <FiMoon />)}
                bg={useColorModeValue('blue.100', 'gray.700')}
                onClick={toggleColorMode}
              />
              <IconButton
                size={'md'}
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                aria-label={'Open Menu'}
                display={{ md: 'none' }}
                onClick={isOpen ? onClose : onOpen}
              />
            </HStack>
        </Flex>

        {isOpen && (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link, index) => (
                <NavLink key={index} href={link.url}>{link.name}</NavLink>
              ))}
            </Stack>
          </Box>
        )}
      </Box>
    </>
  );
}
