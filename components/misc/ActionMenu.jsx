"use client";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import {
  BsThreeDotsVertical,
  MdRemoveRedEye,
  MdEditSquare,
  FaTrash,
} from "@/wrapper/icons";
import { useState, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";
const ActionMenu = ({ id, name, product }) => {
  const [isDisabling, setIsDisabling] = useState(false);
  const router = useRouter()
  useEffect(() => {
    const disableProduct = async () => {
      const response = await fetch(`/api/admin/products/disable`, {
        method: "PATCH",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({ id: product.id,disabled:!product.disabled }),
      });
              console.log("RESPONSE",response.ok);

      if (response.ok) {
        router.refresh("/admin/dashboard/products");
      }
    };
    if (isDisabling) {
      disableProduct();
      setIsDisabling(false);
    }
  }, [isDisabling]);
  const toast = useToast();
  const style = {
    bg: "none",
    _hover: {
      bg: "teal.50",
      color: "teal.700",
      fontWeight: "600",
    },
  };
  return (
    <Menu colorScheme="teal">
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<BsThreeDotsVertical />}
        variant="ghost"
        bg="none"
        _active={{
          bg: "none",
        }}
        _hover={{
          bg: "none",
        }}
      />
      <MenuList>
       {!product.disabled && <>
          <MenuItem
            icon={<MdRemoveRedEye />}
            as="a"
            href={`/admin/dashboard/products/view/${id}`}
            sx={style}
          >
            View
          </MenuItem>
          <MenuItem
            icon={<MdEditSquare />}
            as="a"
            href={`/admin/dashboard/products/edit/${id}`}
            sx={style}
          >
            Edit
          </MenuItem>
          <MenuItem
            icon={<MdEditSquare />}
            as="a"
            href={`/admin/dashboard/products/add/image?id=${id}&name=${name}`}
            sx={style}
          >
            Change Image
          </MenuItem>
        </>}
        <MenuItem
          icon={<FaTrash />}
          sx={{
            bg: "none",
            _hover: {
              bg: "red.50",
              color: "red.700",
              fontWeight: "500",
            },
          }}
          onClick={() => {
            toast({
              title: product.disabled ? "Enabling..." : "Disabling...",
              description: name,
              status: product.disabled ? "success" : "error",
              duration: 5000,
              isClosable: true,
              position: "top-right",
            });
            setIsDisabling(true);
          }}
        >
          {product.disabled ? "Enable" : "Disable"}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
export default ActionMenu;
