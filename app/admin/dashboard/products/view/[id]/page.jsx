import VLink from "@/components/misc/VLink";
import { fetchGET } from "@/lib/util";
import { Card,Stack,CardBody,Text,Heading,Button,CardFooter, Box } from "@/wrapper/chakra/ui";
import Image from "next/image";
import {AiOutlineEdit} from "@/wrapper/icons"
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
      <Image
        //maxW={{ base: "100%", sm: "300px" }}
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt={`${product.name}`}
        width={300}
        height={300}
      />

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
              <VLink
                href={`/admin/dashboard/products/edit/${params.id}`}
                                  icon={<AiOutlineEdit />}
                                  scheme="red"
              >
                Disable
              </VLink>
            </Box>
          )}
        </CardFooter>
      </Stack>
    </Card>
  );
}
export default ViewProductPage