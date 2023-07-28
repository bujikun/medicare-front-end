import {
  Box,
  Button,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Flex,
} from "@/wrapper/chakra/ui";
import Image from "next/image";
const ShopPage = async () => {
      const response = await fetch(`${process.env.BACKEND_API_BASE_URL}/products/shop`);
    const products = await response.json();
    return (
      <Box>
        <Flex justify="center">
          <Heading>Shop With Us Today!</Heading>
        </Flex>
        <SimpleGrid minChildWidth="300px" spacing={4} mt={8} mr={2}>
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>{product.name}</CardHeader>
              <CardBody display="flex" justifyContent="center">
                <Image
                  src={product.image_url}
                  height={300}
                  width={300}
                  alt={product.name}
                />
              </CardBody>
              <CardFooter>
                <Button colorScheme="blue" mx={2} variant="outline">
                  View
                </Button>
                <Button colorScheme="blue" variant="outline">
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    );
};
export default ShopPage;
