"use client"
import styles from "@/components/navigation/navigation.module.css";
import {
  Flex,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Button,
  Tooltip,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@/wrapper/chakra/ui";
import {
  BiChevronDownCircle,
  BsCartCheck,
  PiSignOutBold,
  PiSignInBold,
  AiOutlineArrowDown,
} from "@/wrapper/icons";
import { Link } from "@/wrapper/chakra/next-js";
import DrawerToggleButton from "../buttons/DrawerToggleButton";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { signOut,useSession } from "next-auth/react";

const navItems = [

  {
    name: "Public",
    href: "/",
  },
];
const NavBar = () => {
  const { isDrawerOpen, setIsDrawerOpen, isSmallScreen } = useDashboardContext();
    const { status: sessionStatus } = useSession();

  return (
    <header className={styles.navbar}>
      <Flex justify="space-between">
        <DrawerToggleButton
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
        />
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
        {navItems.map((item) => (
          <ListItem key={item.name}>
            <Link href={item.href}>
              <Button variant="ghost" colorScheme="teal">
                {item.name}
              </Button>
            </Link>
          </ListItem>
        ))}
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
                signOut({callbackUrl:"/"})
              }}
            />
          </Tooltip>
        </ListItem>
        <ListItem>
          {sessionStatus === "unauthenticated" && (
            <Button
              variant="solid"
              colorScheme="blue"
              leftIcon={<PiSignInBold />}
            >
              Sign In
            </Button>
          )}
        </ListItem>
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

        <MenuItem sx={itemStyle}>
          {sessionStatus === "unauthenticated" && (
            <Link href="#" onClick={() => {}} sx={linkStyle}>
              Sign In
            </Link>
          )}
        </MenuItem>
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
      </MenuList>
    </Menu>
  );
};

export default NavBar;
