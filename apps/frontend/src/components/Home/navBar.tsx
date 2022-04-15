import { ReactNode } from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
  IconButton
} from '@chakra-ui/react';
import "@fontsource/pacifico";
import NextLink from 'next/link';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import {
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { useRouter } from 'next/router';

const links = [
  {
    name: 'Home',
    url: '/'
  },
  {
    name: 'About',
    url: '/about'
  },
  {
    name: 'Login',
    url: '/login'
  },
  {
    name: 'Signup',
    url: '/signup'
  },
];

const NavLink = ({ children, href }: { children: ReactNode, href: string }) => (
  <NextLink href={href} passHref>
    <Link
      px={3}
      py={2}
      rounded={'md'}
      fontWeight={"bold"}
      color={useColorModeValue('gray.600', undefined)}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('blue.100', 'gray.700'),
      }}
    >
      {children}
    </Link>
  </NextLink>
);

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  const { pathname } = useRouter();
  const Links = links.filter((i) => i.url !== pathname.toLowerCase());
  return (
    <>
      <Box bg={useColorModeValue('rgba(0, 0, 0, 0.05)', 'rgba(0, 0, 0, 0.5)')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <Box fontFamily={"pacifico"}>Rectilearn</Box>
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

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link, index) => (
                <NavLink key={index} href={link.url}>{link.name}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

    </>
  );
}
