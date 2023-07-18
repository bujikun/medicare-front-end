import { fetchGET } from "@/lib/util";
import {
  Table,
  TableContainer,
  TableCaption,
  Thead,
  Tr,
  Tfoot,
  Tbody,
  Th,
  Td,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Alert,
  AlertIcon,
  AlertTitle,
    AlertDescription,
    Breadcrumb,BreadcrumbItem,BreadcrumbLink,
  Box,
  Heading,
  Button
} from "@/wrapper/chakra/ui";
import {BiSolidChevronRight} from "@/wrapper/icons"
const ProductIndexPage = async () => {
  const response = await fetchGET("/products");
  if (!response.ok) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription>Could not fetch product data</AlertDescription>
      </Alert>
    );
  }
  const products = await response.json();
  if (products.length <= 0) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription>No products in the database!</AlertDescription>
      </Alert>
    );
  }
    return (
      <div>
            <Box mb={8}>
                <Heading as="h3" fontWeight="normal">Products</Heading>
        </Box>
        <Card
          direction="column"
          variant="elevated"
          maxWidth="90%"
          overflow="scroll"
        >
                <CardHeader>
                    <Button colorScheme="blue" variant="outline">New Product</Button>
          </CardHeader>
          <CardBody>
            <TableContainer>
              <Table
                variant="striped"
                colorScheme="green"
                overflow="scroll"
                size="sm"
              >
                <TableCaption>Available products</TableCaption>
                <Thead>
                  <Tr>
                    {/* <Th>ID</Th> */}
                    <Th>Name</Th>
                    <Th>Price</Th>
                    <Th>Category</Th>
                    <Th>Added On</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {products.map((product) => (
                    <Tr key={product.id}>
                      {/* <Td>{product.id}</Td> */}
                      <Td>{product.name}</Td>
                      <Td>{product.price}</Td>
                      <Td>{product.category_name}</Td>
                      <Td>{product.created_on}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
      </div>
    );
};
export default ProductIndexPage;
