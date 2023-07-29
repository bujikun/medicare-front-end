import VLink from "@/components/misc/VLink";
import { fetchGET, fetchGETPublic } from "@/lib/util";
import { Card,Stack,CardBody,Text,Heading,Button,CardFooter, Box,Flex } from "@/wrapper/chakra/ui";
import Image from "next/image";
import { FaCartArrowDown } from "@/wrapper/icons";
import ImageViewer from "@/components/misc/ImageViewer";

const ViewProductPage = async ({ params }) => {

    const response = await fetchGETPublic(`/products/${params.id}`);
  const product = await response.json();
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
          </CardBody>

          <CardFooter>
            <Box sx={{ display: "inline-block", margin: "0 0.5rem 0 0" }}>
              <VLink
                href={`/admin/dashboard/products/edit/${params.id}`}
                icon={<FaCartArrowDown />}
              >
                Add To Cart
              </VLink>
            </Box>
          </CardFooter>
        </Stack>
      </Card>
    </Flex>
  );
}

export default ViewProductPage