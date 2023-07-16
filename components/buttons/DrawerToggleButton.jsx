"use client"
import {
  IconButton,
} from "@/wrapper/chakra/ui";
import {
  AiOutlineMenu,
} from "@/wrapper/icons";

const DrawerToggleButton = ({ isDrawerOpen, setIsDrawerOpen }) => {
  const style = {
    bg: "none",
    fontWeight: "500",
    fontSize: "1.4rem",
    borderRadius: "50%",
    _hover: {
      // bg: "none",
    },
  };

  return (
    <IconButton
      icon={<AiOutlineMenu />}
      colorScheme="gray"
      size="md"
      sx={style}
      onClick={() => {
        setIsDrawerOpen(!isDrawerOpen);
      }}
    />
  );
};
export default DrawerToggleButton;
