import Cart from "@/components/misc/Cart"
import {  Flex } from "@/wrapper/chakra/ui"

const CartPage = () => {
  return (
    <Flex
      m={8}
      bg="#fff"
      borderRadius={2}
      p={4}
      justify="flex-start"
      minH="80vh"
    >
        <Cart />
      
    </Flex>
  );
}
export default CartPage