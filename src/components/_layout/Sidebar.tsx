import React, { ReactNode, useEffect } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
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
  ColorMode,
  Button,
  Spinner,
} from "@chakra-ui/react";
import {
  ChevronDownIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
  UnlockIcon,
} from "@chakra-ui/icons";
import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";
import NextLink from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";

const SIDEBAR_WIDTH = 60;

interface LinkItemProps {
  name: string;
  href: string;
  roles?: string[];
}
const LinkItems: Array<LinkItemProps> = [
  { name: "sidebar.admin.teams", href: "/admin/teams", roles: ["Admin"] },
  { name: "sidebar.admin.games", href: "/admin/games", roles: ["Admin"] },
  { name: "sidebar.squad", href: "/my-squad" },
  { name: "sidebar.leaderboard", href: "/leaderboard" },
];

export default function SidebarWithHeader({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, isLoading: isLoadingUser } = useUser();
  const userRoles: string[] = user
    ? (user[process.env.NEXT_PUBLIC_AUTH0_ROLES_AREA!] as string[]) || []
    : [];
  const filteredLinkItems = LinkItems.filter(
    (link) =>
      !link.roles?.length ||
      Boolean(link.roles.find((role) => userRoles.includes(role)))
  );

  useEffect(() => {
    router.events.on("routeChangeStart", onClose);
    return () => {
      router.events.off("routeChangeStart", onClose);
    };
  }, [router.events, onClose]);

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        links={filteredLinkItems}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent bg={useColorModeValue("gray.100", "gray.900")}>
          <SidebarContent onClose={onClose} links={filteredLinkItems} />
        </DrawerContent>
      </Drawer>
      <MobileNav
        onOpen={onOpen}
        userRoles={userRoles}
        colorMode={colorMode}
        toggleColorMode={toggleColorMode}
        user={user}
        isLoadingUser={isLoadingUser}
      />
      <Box ml={{ base: 0, md: 60 }} p="4" minH="100dvh" position="relative">
        <>
          <Box h={20}></Box>
          {children}
        </>
      </Box>
    </Box>
  );
}

const Logo = ({ size }: { size: number }) => (
  <Image src="/logo.png" alt="logo" width={size} height={size} />
);

interface SidebarProps extends BoxProps {
  onClose: () => void;
  links: typeof LinkItems;
}

const SidebarContent = ({ onClose, links, ...rest }: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      borderRight="1px"
      borderRightColor={"transparent"}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h={SIDEBAR_WIDTH * 2}
        alignItems="center"
        mx="8"
        justifyContent="center"
      >
        <CloseButton
          display={{ base: "flex", md: "none" }}
          position="absolute"
          top={4}
          right={4}
          onClick={onClose}
        />
        <Logo size={SIDEBAR_WIDTH * 2} />
      </Flex>
      {links.map((link) => (
        <NavItem key={link.href} href={link.href}>
          <FormattedMessage id={link.name} />
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  href: string;
  children: React.ReactElement;
}
const NavItem = ({ children, href, ...rest }: NavItemProps) => {
  return (
    <Link
      as={NextLink}
      href={href}
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
          bg: useColorModeValue("gray.200", "gray.800"),
          color: useColorModeValue("black", "white"),
        }}
        {...rest}
      >
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  userRoles: string[];
  onOpen: () => void;
  user: UserProfile | undefined;
  isLoadingUser: boolean;
  toggleColorMode: () => void;
  colorMode: ColorMode;
}
const MobileNav = ({
  onOpen,
  user,
  isLoadingUser,
  toggleColorMode,
  colorMode,
  userRoles,
  ...rest
}: MobileProps) => {
  const isDarkMode = colorMode === "dark";
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      borderBottomWidth="1px"
      borderBottomColor={"transparent"}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      position="fixed"
      right={0}
      width="-webkit-fill-available"
      zIndex={1}
      bg={useColorModeValue("gray.100", "gray.900")}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<HamburgerIcon />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        <Logo size={SIDEBAR_WIDTH} />
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          {isLoadingUser && <Spinner />}
          {!isLoadingUser && Boolean(user) && (
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: "none" }}
              >
                <HStack>
                  <Avatar
                    size={"sm"}
                    src={user?.picture ?? undefined}
                    name={user?.name ?? undefined}
                    referrerPolicy="no-referrer"
                  />
                  <VStack
                    display={{ base: "none", md: "flex" }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">{user?.name}</Text>
                    <Text fontSize="xs" color="gray.600">
                      {userRoles.join(", ")}
                    </Text>
                  </VStack>
                  <Box display={{ base: "none", md: "flex" }}>
                    <ChevronDownIcon />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={toggleColorMode}
                  icon={isDarkMode ? <SunIcon /> : <MoonIcon />}
                >
                  {isDarkMode ? (
                    <FormattedMessage id="sidebar.light-mode" />
                  ) : (
                    <FormattedMessage id="sidebar.dark-mode" />
                  )}
                </MenuItem>
                <MenuDivider />
                <NextLink href="/api/auth/logout">
                  <MenuItem icon={<UnlockIcon />}>
                    <FormattedMessage id="sidebar.sign-out" />
                  </MenuItem>
                </NextLink>
              </MenuList>
            </Menu>
          )}
          {!isLoadingUser && !Boolean(user) && (
            <NextLink href="/api/auth/login">
              <Button>
                <FormattedMessage id="sidebar.sign-in" />
              </Button>
            </NextLink>
          )}
        </Flex>
      </HStack>
    </Flex>
  );
};
