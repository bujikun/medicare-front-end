
import { fetchGETPublic } from "@/lib/util";
import { Card,Stack,CardBody,Text,Heading,Alert,AlertTitle,AlertDescription,CardFooter, Box,Flex } from "@/wrapper/chakra/ui";
import ImageViewer from "@/components/misc/ImageViewer";
import AddToCartButton from "@/components/buttons/AddToCartButton";

const ViewProductPage = async ({ params }) => {

    const response = await fetchGETPublic(`/products/${params.id}`);
  const product = await response.json();
  if (!response.ok) {
  return  (<Alert status="error">
      <AlertTitle>Error!</AlertTitle>
      <AlertDescription>Product could not be found</AlertDescription>
    </Alert>)
  }
  return (
    <Flex justify="center" m={8}>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        border="none"
      >
        <Box
          m="0.4rem"
          minWidth="300px"
          maxWidth="400px"
          minHeight="300px"
          maxHeight="400px"
        >
          <ImageViewer src={product.image_url} name={product.name} />
        </Box>
        <Stack>
          <CardBody>
            <Heading size="md">{`${product.name}`}</Heading>

            <Text py="2">{`${product.description}`}</Text>
            <Text fontWeight={700} display="block">
              Price: ${product.price}
            </Text>
            <Text>Category: {product.category_name}</Text>
            <Text mt={1}>Seller: {product.seller_name}</Text>
          </CardBody>

          <CardFooter>
            <Box sx={{ display: "inline-block", margin: "0 0.5rem 0 0" }}>
              <AddToCartButton product={product} />
            </Box>
          </CardFooter>
        </Stack>
      </Card>
    </Flex>
  );
}

export default ViewProductPage