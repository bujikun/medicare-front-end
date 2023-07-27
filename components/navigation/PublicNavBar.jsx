"use client"
import styles from "@/components/navigation/navigation.module.css";
import {
  Flex,
  IconButton,
  List,
  ListItem,
  Button,
  Tooltip,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Heading,
} from "@/wrapper/chakra/ui";
import {
  BiChevronDownCircle,
  BsCartCheck,
  PiSignOutBold,
  PiSignInBold,
} from "@/wrapper/icons";
import { Link } from "@/wrapper/chakra/next-js";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { signIn, signOut,useSession } from "next-auth/react";

const navItems = [
  {
    name: "Shop",
    href: "/public/shop",
    session: "unauthenticated",
  },
  {
    name: "My Orders",
    href: "/public/orders",
    session: "authenticated",
  },
  {
    name: "Account",
    href: "/public/account",
    session: "authenticated",
  },
];
const PublicNavBar = () => {
  const {isSmallScreen } = useDashboardContext();
    const { status: sessionStatus } = useSession();

  return (
    <header className={styles.navbar}>
      <Flex justify="space-between">
        <Heading as="h6" fontWeight={400} fontSize="1.3rem">Medicare</Heading>
        {isSmallScreen ? (
          <NavBarList navItems={navItems} sessionStatus={sessionStatus} />
        ) : (
          <NavBarMenu navItems={navItems} sessionStatus={sessionStatus} />
        )}
      </Flex>
    </header>
  );
};

const NavBarList = ({ navItems,sessionStatus }) => {
  
  return (
    <List>
      <Flex gap={4} mr="1rem" align="center" as="nav">
        <ListItem>
          <IconButton
            icon={<BsCartCheck />}
            sx={{
              fontSize: "1.5rem",
              color: "#333",
              bg: "none",
              _hover: {
                color: "teal.700",
                bg: "teal.50",
              },
            }}
          />
        </ListItem>
        {navItems.map((item) => {
          if (item.session === sessionStatus) {
            return (
              <ListItem key={item.name}>
                <Link href={item.href}>
                  <Button variant="ghost" colorScheme="teal">
                    {item.name}
                  </Button>
                </Link>
              </ListItem>
            );
          }
        })}
        {sessionStatus === "authenticated" && (
          <ListItem>
            <Tooltip
              label="Sign Out"
              hasArrow
              aria-label="signout tooltip"
              tabIndex={0}
              fontSize="md"
            >
              <IconButton
                icon={<PiSignOutBold />}
                colorScheme="gray"
                sx={{
                  bg: "none",
                  fontWeight: "500",
                  fontSize: "1.4rem",
                  borderRadius: "50%",
                  _hover: {
                    bg: "#e60000",
                    color: "white",
                  },
                }}
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                }}
              />
            </Tooltip>
          </ListItem>
        )}
        {sessionStatus === "unauthenticated" && (
          <>
            <ListItem>
              <Button
                variant="ghost"
                colorScheme="blue"
                onClick={() => {}}
              >
                Register
              </Button>
            </ListItem>
            <ListItem>
              <Button
                variant="solid"
                colorScheme="blue"
                leftIcon={<PiSignInBold />}
                onClick={() => signIn()}
              >
                Sign In
              </Button>
            </ListItem>
          </>
        )}
      </Flex>
    </List>
  );
};

const NavBarMenu = ({ navItems, sessionStatus }) => {
  const itemStyle = {
    fontWeight: 500,
    _hover: {
      bg: "teal.100",
      color: "teal.700",
      fontWeight: 600,
    },
  };

  const linkStyle = {
    _hover: { textDecoration: "none" },
  };
  return (
    <Menu mr={2}>
      <MenuButton
        as={Button}
        rightIcon={<BiChevronDownCircle />}
        sx={{
          bg: "none",
          fontWeight: "500",
          fontSize: "1.4rem",
          borderRadius: "1rem",
          size: "md",
          _hover: {
            bg: "none",
          },
          _expanded: {
            bg: "blue.500",
            color: "white",
          },
        }}
      >
        Menu
      </MenuButton>
      <MenuList>
        {navItems.map((item) => (
          <MenuItem key={item.name} sx={itemStyle}>
            <Link href={item.href} sx={linkStyle}>
              {item.name}
            </Link>
          </MenuItem>
        ))}

        {sessionStatus === "unauthenticated" && (
          <>
            <MenuItem sx={itemStyle}>
              <Link href="#" onClick={() => {}} sx={linkStyle}>
                Register
              </Link>
            </MenuItem>
            <MenuItem sx={itemStyle}>
              <Link
                href="#"
                onClick={() => signIn()}
                sx={linkStyle}
              >
                Sign In
              </Link>
            </MenuItem>
          </>
        )}

        {sessionStatus === "authenticated" && (
          <MenuItem sx={itemStyle}>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                signOut({ callbackUrl: "/" });
              }}
              sx={linkStyle}
            >
              Sign Out
            </Link>
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default PublicNavBar;
