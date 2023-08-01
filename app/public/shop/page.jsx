import AddToCartButton from "@/components/buttons/AddToCartButton";
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
  Text
} from "@/wrapper/chakra/ui";
import {BsFillEyeFill} from "@/wrapper/icons"
import Image from "next/image";
export const dynamic = "force-dynamic";

const ShopPage = async () => {
      const response = await fetch(`${process.env.BACKEND_API_BASE_URL}/products/shop`);
    const products = await response.json();
    return (
      <Box mt={8}>
        <Flex justify="center">
          <Heading>Shop With Us Today!</Heading>
        </Flex>
        <SimpleGrid minChildWidth="300px" spacing={4} mt={8} mr={2}>
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>{product.name}</CardHeader>
              <CardBody
                display="flex"
                justifyContent="center"
                flexDirection="column"
              >
                <Image
                  src={product.image_url}
                  height={300}
                  width={300}
                  alt={product.name}
                />
                <Text fontWeight={600} mt={2}>
                  ${product.price}
                </Text>
                <Text mt={1}>{product.seller_name}</Text>
                <Text mt={1}>{product.category_name}</Text>
              </CardBody>
              <CardFooter>
                <Button
                  leftIcon={<BsFillEyeFill />}
                  colorScheme="blue"
                  mx={2}
                  variant="outline"
                  as="a"
                  href={`/public/products/${product.id}`}
                >
                  View
                </Button>
                <AddToCartButton product={product} />
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    );
};
export default ShopPage;
