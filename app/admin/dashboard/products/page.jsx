import VLink from "@/components/misc/VLink";
import BasicTable from "@/components/table/BasicTable";
import { fetchGET } from "@/lib/util";
import {
  Alert,
  AlertIcon,
  AlertTitle,
    AlertDescription,
  Box,
  Heading,
  Button,
  IconButton
} from "@/wrapper/chakra/ui";
import { redirect } from "next/navigation";

const columns = [
    {
        header: "name",
        accessorKey:"name"
},
    {
        header: "Price ($)",
        accessorKey: "price",
},
    {
        header: "Added On",
        accessorKey:"created_on"
},
    {
        header: "Category",
        accessorKey:"category_name"
    },
];
const ProductIndexPage = async () => {
    const response = await fetchGET("/products");
  if (response.status === 401) {
    redirect("/auth/signin", "replace");
    }
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
      <div
        style={{
          backgroundColor: "#fff",
          padding: "0.5rem",
          borderRadius: "0.2rem",
        }}
      >
        <Box mb={8}>
          <Heading as="h3" fontWeight="normal">
            Products
          </Heading>
        </Box>
        <Box mb={4}>
          <VLink
            href="/admin/dashboard/products/add"
            sx={{ marginBottom: "2rem" }}
          >
            Add New Product
          </VLink>
        </Box>

            <BasicTable columns={columns} data={products} name="Products"/>
      </div>
    );
};

export default ProductIndexPage;
