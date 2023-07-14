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
import { AiOutlineMenu, BsCartCheck, PiSignOutBold } from "@/wrapper/icons";
import { Link } from "@/wrapper/chakra/next-js";

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
        <IconButton
          icon={<AiOutlineMenu />}
          colorScheme="gray"
          size="md"
          sx={{
            bg: "none",
            fontWeight: "500",
            fontSize: "1.4rem",
            _hover: {
              bg: "none",
            },
          }}
        />

        <List>
          <Flex gap={4} mr="1rem" align="center">
            <ListItem>
              <ListIcon as={BsCartCheck} sx={{ fontSize: "1.5rem" }} />
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
                <Tooltip hasArrow label='Search places' bg='red.600'>
  <Button>Button</Button>
</Tooltip>
              {/* <Tooltip
                label="Sign Out"
                hasArrow
                bg="gray.300"
                aria-label="A tooltip"
                tabIndex={0}
                fontSize="md"
              >
                <span>I am here</span>

                {/* <PiSignOutBold /> */}
                {/* <IconButton
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
              </Tooltip> */}
            </ListItem>
          </Flex>
        </List>
      </Flex>
    </header>
  );
};
export default NavBar;
