import { ReactNode, useRef } from "react";
import NextLink from "next/link";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Collapse,
  useOutsideClick,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon,
  UnlockIcon,
} from "@chakra-ui/icons";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Links } from "../../utils/constants";

const NavLink = ({ children, href }: { children: ReactNode; href: string }) => (
  <Link
    as={NextLink}
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={href}
  >
    {children}
  </Link>
);

const TOOLBAR_HEIGHT = 16;

export default function Toolbar() {
  const { user, isLoading: isLoadingUser } = useUser();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ref = useRef<HTMLDivElement | null>(null);
  useOutsideClick({
    ref,
    handler: onClose,
  });

  const userRoles: string[] = user
    ? (user[process.env.NEXT_PUBLIC_AUTH0_ROLES_AREA!] as string[])
    : [];

  const isDarkMode = colorMode === "dark";

  const LinksList = Links.filter(
    (link) =>
      !link.roles?.length ||
      Boolean(link.roles.find((role) => userRoles.includes(role)))
  ).map((link) => (
    <NavLink key={link.href} href={link.href}>
      {link.name}
    </NavLink>
  ));

  return (
    <>
      <Box h={TOOLBAR_HEIGHT} />
      <Box
        ref={ref}
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        position="fixed"
        top={0}
        left={0}
        right={0}
        zIndex={1}
      >
        <Flex
          h={TOOLBAR_HEIGHT}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"} justifyContent="flex-start">
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {LinksList}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            {!user && !isLoadingUser && (
              <NextLink href="/api/auth/login">
                <Button colorScheme="purple">Sign In</Button>
              </NextLink>
            )}
            {user && (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                >
                  <Avatar
                    size={"sm"}
                    src={user.picture ?? ""}
                    referrerPolicy="no-referrer"
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={toggleColorMode}
                    icon={isDarkMode ? <SunIcon /> : <MoonIcon />}
                  >
                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                  </MenuItem>
                  <MenuDivider />
                  <NextLink href="/api/auth/logout">
                    <MenuItem icon={<UnlockIcon />}>Sign Out</MenuItem>
                  </NextLink>
                </MenuList>
              </Menu>
            )}
          </Flex>
        </Flex>

        <Collapse in={isOpen}>
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4} onClick={onClose}>
              {LinksList}
            </Stack>
          </Box>
        </Collapse>
      </Box>
    </>
  );
}
