"use client";

import { useCartContext } from "@/contexts/CartContext";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  List,
  ListItem,
  Text,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
import { FaChevronUp, FaChevronDown, FaTrash } from "react-icons/fa6";
import { IoBagCheckOutline } from "react-icons/io5";
  const calculateTotalPrice = (arr) => {
    const totalPrice =  arr.reduce((total, current) => {
      total += current.price * current.count;
      return total;
    }, 0);
      return Number(totalPrice).toFixed(2);
  };
const Cart = () => {
    const { state, dispatch } = useCartContext();
  
  return (
    <Flex direction="column" w="95vw">
      <Box textAlign="center">
        <Heading as="h6" fontWeight={400} my={2}>
          Cart Items
        </Heading>
      </Box>
      <Flex w="100%" wrap="wrap">
        <Box>
          <List>
            {state.items.map((product) => (
              <ListItem key={product.id} my={3}>
                <Flex align="center" justify="space-between" gap={4}>
                  <Box>
                    <Image
                      src={product.image_url}
                      width={150}
                      height={150}
                      alt={product.name}
                      style={{ borderRadius: "0.5rem" }}
                    />
                  </Box>
                  <Box textAlign="start">
                    <Text>{product.name}</Text>
                    <Text fontWeight={500}>${product.price}</Text>
                    <IconButton
                      variant="outline"
                      colorScheme="red"
                      isRound={true}
                      onClick={() => {
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: product.id,
                        });
                      }}
                      icon={<FaTrash />}
                    />
                  </Box>
                  <Flex direction="column" justify="space-between" gap={1}>
                    <IconButton
                      icon={<FaChevronUp />}
                      isRound={true}
                      colorScheme="teal"
                      size="sm"
                      onClick={() =>
                        dispatch({
                          type: "INCREASE_PRODUCT_COUNT",
                          payload: product.id,
                        })
                      }
                    />
                    <Text fontWeight={600} textAlign="center">
                      {product.count}
                    </Text>
                    <IconButton
                      icon={<FaChevronDown />}
                      isRound={true}
                      colorScheme="teal"
                      size="sm"
                      onClick={() =>
                        dispatch({
                          type: "REDUCE_PRODUCT_COUNT",
                          payload: product.id,
                        })
                      }
                    />
                  </Flex>
                </Flex>
              </ListItem>
            ))}
          </List>
        </Box>
        <Flex
          direction="column"
          justify="flex-start"
          align="center"
          sx={{ flexGrow: "4" }}
          width="300px"
          mt={4}
        >
          <Box>
            <Text fontSize="4xl">
              Total :
              <Text as="span" fontSize="5xl" fontWeight={500} color="green.500">
                &nbsp; ${calculateTotalPrice(state.items)}
              </Text>
            </Text>
            <Button
              leftIcon={<IoBagCheckOutline />}
              w="full"
              variant="solid"
              size="lg"
              my={2}
              colorScheme="orange"
            >
              Checkout
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Cart;
