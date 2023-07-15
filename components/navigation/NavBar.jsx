import styles from "@/components/navigation/navigation.module.css";
import {
  Flex,
  IconButton,
  List,
  ListIcon,
  ListItem,
  Button,
  Tooltip,
} from "@/wrapper/chakra/ui";
import {
  AiOutlineMenu,
  BsCartCheck,
  PiSignOutBold,
  PiSignInBold,
} from "@/wrapper/icons";
import { Link } from "@/wrapper/chakra/next-js";
import DrawerToggleButton from "../buttons/DrawerToggleButton";

const navItems = [
  {
    name: "Products",
    href: "/admin/dashboard/products",
  },
  {
    name: "Orders",
    href: "/admin/dashboard/orders",
  },
  {
    name: "Account",
    href: "/admin/dashboard/account",
  },
];
const NavBar = () => {
  return (
    <header className={styles.navbar}>
      <Flex justify="space-between">
        <DrawerToggleButton/>

        <List>
          <Flex gap={4} mr="1rem" align="center" as="nav">
            <ListItem>
              <IconButton icon={BsCartCheck} sx={{ fontSize: "1.5rem" }} />
            </ListItem>
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
                  /> 
              </Tooltip>
                      </ListItem>
                      <ListItem>
                          <Button variant="solid" colorScheme="blue" leftIcon={<PiSignInBold/>}>Sign In</Button>
                      </ListItem>
          </Flex>
        </List>
      </Flex>
    </header>
  );
};
export default NavBar;
