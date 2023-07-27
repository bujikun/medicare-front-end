import PublicNavBar from "@/components/navigation/PublicNavBar";
import DashboardContext from "@/contexts/DashboardContext";
import { Flex, Text, Heading, Box, Button, SimpleGrid,Card,CardHeader,CardBody,CardFooter } from "@/wrapper/chakra/ui";
import Image from "next/image";

const IndexPage = async () => {
  const response = await fetch(`${process.env.BACKEND_API_BASE_URL}/products/shop`);
    const products = await response.json();
    console.log(products);
  return (
    <Flex
      direction="column"
      justifyContent="flex-start"
      h="100vh"
      width="100vw"
      my="0.5rem"
      mx="1rem"
      mr="2rem"
    >
      <DashboardContext>
        <PublicNavBar />
      </DashboardContext>
      <Flex justify="center" direction="column" align="center">
        <Heading mt="2rem">Welcome to Medicare</Heading>
        <Text mt="2rem" fontSize="3xl">
          You number one stop for various medical products and accessories
        </Text>
        <Text fontSize="2xl" mb="2rem">
          Add items then check out. It is that simple.
        </Text>
      </Flex>
      <SimpleGrid minChildWidth="300px" spacing={4} mt={8}>
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
    </Flex>
  );
};
export default IndexPage;
