import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import OrdersTable from "@/components/table/UserOrdersTable"
import { Alert, AlertDescription, AlertTitle, Box, Flex, Heading } from "@/wrapper/chakra/ui"
import { getServerSession } from "next-auth"

const OrdersIndexPage = async () => {
    const session = await getServerSession(authOptions);
    const response =  await fetch(`${process.env.BACKEND_API_BASE_URL}/orders/user?id=${session.user_id}`, {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });
    const data = await response.json();

  return (
    <Flex bg="#fff" w="95vw" h="85vh" direction="column" mt={4}>
      <Heading my={8} p={8} fontWeight={400}>
        My Orders
      </Heading>
      {data.length > 0 ? (
        <OrdersTable data={data}/>
      ) : (
        <Box mx={8} px={8}>
          <Alert status="error">
            <AlertTitle>No Orders!</AlertTitle>
            <AlertDescription>
              
              You have not purchased anything.
            </AlertDescription>
          </Alert>
        </Box>
      )}
    </Flex>
  );
}
export default OrdersIndexPage