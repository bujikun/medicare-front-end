"use client"
import styles from "@/components/navigation/navigation.module.css";
import { Flex, IconButton, List, ListIcon, ListItem, Text, } from "@/wrapper/chakra/ui";
import {
  BiSolidDashboard,
  FaBriefcaseMedical,
  BiCategory,
  AiOutlineShopping,
  FiUsers,
  FaOpencart,
  AiOutlineClose,
} from "@/wrapper/icons";
import Image from "next/image";
import { Link } from "@/wrapper/chakra/next-js";
import { useDashboardContext } from "@/contexts/DashboardContext";
  const sidebarItems = [
    {
      name: "Home",
      href: "/admin/dashboard/home",
      icon: BiSolidDashboard,
    },
    {
      name: "Products",
      href: "/admin/dashboard/products",
      icon: FaBriefcaseMedical,
    },
    {
      name: "Categories",
      href: "/admin/dashboard/categories",
      icon: BiCategory,
    },
    {
      name: "Sellers",
      href: "/admin/dashboard/sellers",
      icon: FaOpencart,
    },
    {
      name: "Orders",
      href: "/admin/dashboard/orders",
      icon: AiOutlineShopping,
    },
    {
      name: "Users",
      href: "/admin/dashboard/users",
      icon: FiUsers,
    },
  ];
const SideBar = () => {
  const { setIsDrawerOpen } = useDashboardContext();

  return (
    <>
      {
        <div className={styles.sidebar}>
          <div className={styles.close_button}>
            <IconButton
              icon={<AiOutlineClose />}
              sx={{
                size: "1rem",
                borderRadius: "1rem",
                bg: "none",
                color: "#333",
                fontWeight: 500,
                fontSize: "1.5rem",
              }}
              onClick={() => {
                setIsDrawerOpen(false);
              }}
            />
          </div>
          <Image
            src="/logo.png"
            width={100}
            height={100}
            alt="logo"
            style={{ marginBottom: "3rem", marginTop: "2.5rem" }}
            priority={true}
          />
          <List spacing={4}>
            {sidebarItems.map((item) => (
              <ListItem
                key={item.name}
                sx={{
                  fontWeight: 500,
                  borderRadius: "0.5rem",
                  padding: "0.3rem 0.5rem",
                  _hover: {
                    bg: "teal.100",
                    color: "teal.700",
                    fontWeight: 600,
                  },
                }}
              >
                <Link
                  href={item.href}
                  sx={{
                    _hover: { textDecoration: "none" },
                  }}
                >
                  <Flex justify="flex-start" align="center" ml="0.3rem" gap={1}>
                    <ListIcon as={item.icon} />
                    <Text as="span">{item.name}</Text>
                  </Flex>
                </Link>
              </ListItem>
            ))}
          </List>
        </div>
      }
    </>
  );
};

export default SideBar;
