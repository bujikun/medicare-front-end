import VLink from "@/components/misc/VLink";
import AllOrdersTable from "@/components/table/AllOrdersTable";
import BasicTable from "@/components/table/BasicTable";
import { fetchGET } from "@/lib/util";
import {
  Alert,
  AlertIcon,
  AlertTitle,
    AlertDescription,
  Box,
  Heading,
} from "@/wrapper/chakra/ui";
import { redirect } from "next/navigation";

const OrdersIndexPage = async () => {
    const response = await fetchGET("/orders");
  if (response.status === 401) {
    redirect("/auth/signin", "replace");
    }
  if (!response.ok) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription>Could not fetch orders</AlertDescription>
      </Alert>
    );
  }
  const orders = await response.json();
  if (orders.length <= 0) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription>No orders made so far!</AlertDescription>
      </Alert>
    );
  }
    return (
      <div
        style={{
          backgroundColor: "#fff",
          padding: "0.5rem",
          borderRadius: "0.2rem",
        }}
      >
        <Box mb={8}>
          <Heading as="h3" fontWeight="normal">
            Orders
          </Heading>
        </Box>
        <AllOrdersTable data={orders}/>
      </div>
    );
};

export default OrdersIndexPage;
