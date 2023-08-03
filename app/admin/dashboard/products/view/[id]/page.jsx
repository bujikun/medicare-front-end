import VLink from "@/components/misc/VLink";
import { fetchGET } from "@/lib/util";
import { Card,Stack,CardBody,Text,Heading,Button,CardFooter, Box } from "@/wrapper/chakra/ui";
import Image from "next/image";
import {AiOutlineEdit} from "@/wrapper/icons"
import ImageViewer from "@/components/misc/ImageViewer";
import DisableProductButton from "@/components/buttons/DisableProductButton";
const ViewProductPage = async ({ params }) => {

    const response = await fetchGET(`/products/${params.id}`);
  const product = await response.json();
  return (
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
          <Text>Added On: {product.created_on}</Text>
        </CardBody>

        <CardFooter>
          <Box sx={{ display: "inline-block", margin: "0 0.5rem 0 0" }}>
            <VLink
              href={`/admin/dashboard/products/edit/${params.id}`}
              icon={<AiOutlineEdit />}
            >
              Edit
            </VLink>
          </Box>
          {product.disabled ? (
            <Box sx={{ display: "inline-block", margin: "0 0.5rem 0 0" }}>
              <VLink
                href={`/admin/dashboard/products/edit/${params.id}`}
                icon={<AiOutlineEdit />}
              >
                Enable
              </VLink>
            </Box>
          ) : (
            <Box sx={{ display: "inline-block", margin: "0 0.5rem 0 0" }}>
              <DisableProductButton product={product}/>
            </Box>
          )}
        </CardFooter>
      </Stack>
    </Card>
  );
}

export default ViewProductPage