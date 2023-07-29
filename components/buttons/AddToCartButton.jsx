"use client"
import { useCartContext } from "@/contexts/CartContext";
import { Button } from "@chakra-ui/react";
import { FaCartArrowDown } from "react-icons/fa6";
const AddToCartButton = ({product}) => {
  const {dispatch} = useCartContext()
  return (
    <Button
      leftIcon={<FaCartArrowDown />}
      colorScheme="blue"
      variant="outline"
      onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
    >
      Add to Cart
    </Button>
  );
}
export default AddToCartButton