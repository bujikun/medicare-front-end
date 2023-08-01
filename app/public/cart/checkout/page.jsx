"use client"
import OrderReportSummary from "@/components/misc/OrderReportSummary";
import { useCartContext } from "@/contexts/CartContext";
import { Flex, Box,Progress,Heading, Badge,Text } from "@/wrapper/chakra/ui"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const CheckoutPage = () => {
    const { state,dispatch } = useCartContext();
    const [data, setData] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
    
    if (!state?.isCheckingOut) {
        redirect("/");
    }
    const { data: session } = useSession();
    const timerRef = useRef(null);
    useEffect(() => {
        timerRef.current =  setTimeout(async () => {
            const response = await fetch("/api/public/orders", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(state)
            })
                    console.log("TIMER ID", timerRef.current);

            const data = await response.json();
            if (data.status === "success") {
                setData(data);
                dispatch({ type: "CLEAR_CART" });
                setIsSuccess(true);
            }

        }, 3000);
        return ()=> clearTimeout(timerRef.current);
    },[])
      return (
        <Box w="95vw" p={8} m={4} height="85vh" bg="#fff" textAlign="center">
          {!isSuccess && (
            <>
              <Heading my={16} fontSize="md">
                Making payment via Dummy Payment Gateway ...
              </Heading>
              {!data && (
                <>
                  <Flex justify="center" align="center">
                    <Progress
                      size="lg"
                      isIndeterminate={true}
                      height="1.5rem"
                      colorScheme="orange"
                      sx={{ flexGrow: 4, alignSelf: "stretch" }}
                      hasStripe
                    />
                  </Flex>
                  <Heading my={16} fontSize="md" fontWeight={400}>
                    <>
                      Deducting ${" "}
                      <Text as="span" color="green.400" fontWeight="bold">
                        {state.totalPrice}
                      </Text>{" "}
                      from{" "}
                      <Badge
                        variant="subtle"
                        colorScheme="blue"
                        fontWeight="bold"
                        p="1"
                      >
                        &nbsp;{session?.account_number}
                      </Badge>
                    </>

                    {data?.status === "error" && (
                      <Text color="red.400">
                        An error occurred. Please try again later!
                      </Text>
                    )}
                  </Heading>
                </>
              )}
            </>
              )}
              
              {isSuccess && (
                  <OrderReportSummary order={data.payload}/>
              )}
        </Box>
      );
}
export default CheckoutPage