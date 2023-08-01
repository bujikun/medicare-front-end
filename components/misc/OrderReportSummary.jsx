import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
    TableContainer,
    Box,
  Text,
  Heading
} from "@/wrapper/chakra/ui";

const OrderReportSummary = ({ order }) => {
    return (
      <Box>
        <Heading as="h6" fontWeight={500} my={8}>
          Order Summary Report
        </Heading>
        <Box>
          <Text fontWeight="bold" my={1}>
            Order Number: {String(order.id).toLocaleUpperCase()}
          </Text>
          <Text fontWeight="bold" my={1}>
            Customer Name: {String(order.customer_name).toLocaleUpperCase()}
          </Text>
          <Text fontWeight="bold" my={1}>
            Order Date: {String(order.created_on)}
          </Text>
        </Box>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Unit Price</Th>
                <Th> Quantity</Th>
                <Th> Amount</Th>
              </Tr>
            </Thead>
            <Tbody>
              {order.order_items.map((item) => (
                <Tr key={item.product_name}>
                  <Td>{item.product_name}</Td>
                  <Td>${item.unit_price}</Td>
                  <Td>{item.quantity}</Td>
                  <Td>${item.total_order_item_price}</Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>
                  <Box
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: "600",
                      verticalAlign: "bottom",
                    }}
                  >
                    <Text>Total</Text>
                  </Box>
                </Th>
                <Th></Th>
                <Th></Th>
                <Th>
                  <Box
                    sx={{
                      fontSize: "2rem",
                      fontWeight: "600",
                      verticalAlign: "bottom",
                    }}
                  >
                    <Text>${order.total_price}</Text>
                  </Box>
                </Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    );
};
export default OrderReportSummary;
