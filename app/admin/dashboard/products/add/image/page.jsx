import ImageUploader from "@/components/forms/ImageUploader";
import{Box, Button, Heading,Text} from "@/wrapper/chakra/ui"
import { getCsrfToken } from "next-auth/react";
const AddImagePage = async ({ searchParams }) => {
    const csrfToken = await getCsrfToken()
  return (
    <div style={{ height: "80vh", backgroundColor: "#fff", padding: "4rem" }}>
      <Heading>Add Product Image</Heading>
      <Box my={4}>
        <Text as="p" fontWeight="500" my={2}>
          Product ID : {searchParams.id}
        </Text>
        <Text as="p" fontWeight="500">
          Product Name : {searchParams.name}
        </Text>
      </Box>
      <ImageUploader csrfToken={csrfToken} id={searchParams.id} />
    </div>
  );
}
export default AddImagePage