"use client";
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
  Badge
} from "@/wrapper/chakra/ui";
import {
  BiChevronDownCircle,
  BsCartCheck,
  PiSignOutBold,
  PiSignInBold,
} from "@/wrapper/icons";
import { Link } from "@/wrapper/chakra/next-js";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { signIn, signOut, useSession } from "next-auth/react";
import { useCartContext } from "@/contexts/CartContext";

const navItems = [
  {
    name: "Shop",
    href: "/public/shop",
    session: "free",
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
  const { isSmallScreen } = useDashboardContext();
  const { status: sessionStatus } = useSession();
  const { state,} = useCartContext();

  return (
    <header className={styles.navbar}>
      <Flex justify="space-between">
        <Heading as="a" fontWeight={600} fontSize="1.7rem" href="/">
          Medicare
        </Heading>
        {isSmallScreen ? (
          <NavBarList
            navItems={navItems}
            sessionStatus={sessionStatus}
            state={state}
          />
        ) : (
          <NavBarMenu
            navItems={navItems}
            sessionStatus={sessionStatus}
            state={state}
          />
        )}
      </Flex>
    </header>
  );
};

const NavBarList = ({ navItems, sessionStatus,state }) => {

  return (
    <List>
      <Flex gap={4} mr="1rem" align="center" as="nav">
        <ListItem>
          <Button
            leftIcon={<BsCartCheck />}
            as="a"
            href="/public/cart"
            sx={{
              fontSize: "1.5rem",
              color: "#333",
              bg: "none",
              padding:"0",
              position:"relative",
              _hover: {
                color: "teal.700",
                bg: "teal.50",
              },
            }}
          >
            {state.totalItemsCount>0 && <Badge variant="solid" colorScheme="red" sx={{position:"absolute",top:0,right:0}}>
              {state.totalItemsCount}
            </Badge>}
          </Button>
        </ListItem>
        {navItems.map((item) => {
          if (item.session === "free" || item.session === sessionStatus) {
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
                href="/public/register"
                as="a"
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

const NavBarMenu = ({ navItems, sessionStatus, state }) => {
  
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
        <MenuItem>
          <Button
            leftIcon={<BsCartCheck />}
            sx={{
              fontSize: "1.5rem",
              color: "#333",
              bg: "none",
              padding: "0",
              position: "relative",
              _hover: {
                color: "teal.700",
                bg: "teal.50",
              },
            }}
          >
            {state.totalItemsCount>0 && (
              <Badge
                variant="solid"
                colorScheme="red"
                sx={{ position: "absolute", top: 0, right: 0 }}
              >
                {state.totalItemsCount}
              </Badge>
            )}
          </Button>
        </MenuItem>
        {navItems.map((item) => {
          if (item.session === "free" || item.session === sessionStatus) {
            return (
              <MenuItem key={item.name} sx={itemStyle}>
                <Link href={item.href} sx={linkStyle}>
                  {item.name}
                </Link>
              </MenuItem>
            );
          }
        })}

        {sessionStatus === "unauthenticated" && (
          <>
            <MenuItem sx={itemStyle}>
              <Link href="/public/register" sx={linkStyle}>
                Register
              </Link>
            </MenuItem>
            <MenuItem sx={itemStyle}>
              <Link href="#" onClick={() => signIn()} sx={linkStyle}>
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
