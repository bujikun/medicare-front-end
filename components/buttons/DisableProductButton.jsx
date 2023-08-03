"use client"

import { Button, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";
import { FaTrash } from "react-icons/fa6";

const DisableProductButton = ({product}) => {
    const [isDisabling, setIsDisabling] = useState(false);
    const router = useRouter();
    useEffect(() => {
      const disableProduct = async () => {
        const response = await fetch(`/api/admin/products/disable`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: product.id, disabled: !product.disabled }),
        });
        if (response.ok) {
          router.push("/admin/dashboard/products");
        }
      };
      if (isDisabling) {
        disableProduct();
        setIsDisabling(false);
      }
    }, [isDisabling]);
    const toast = useToast();
  return (
      <Button
          variant="solid"
      leftIcon={<FaTrash />}
      colorScheme="red"
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
    </Button>
  );
}
export default DisableProductButton