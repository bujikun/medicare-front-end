import VLink from "@/components/misc/VLink";
import CategoriesTable from "@/components/table/CategoriesTable";
import { fetchGET } from "@/lib/util";
import {
  Alert,
  AlertIcon,
  AlertTitle,
    AlertDescription,
  Box,
  Heading,
} from "@/wrapper/chakra/ui";
import { redirect } from "next/navigation";

const columns = [
    {
        header: "ID",
        accessorKey:"id"
},
    {
        header: "Name",
        accessorKey: "name",
},
    {
        header: "Added On",
        accessorKey:"created_on"
},
];
const CategoryIndexPage = async () => {
    const response = await fetchGET("/categories");
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
  const categories = await response.json();
  if (categories.length <= 0) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription>No categories in the database!</AlertDescription>
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
            Categories
          </Heading>
        </Box>
        <Box mb={4}>
          <VLink
            href="/admin/dashboard/categories/add"
            sx={{ marginBottom: "2rem" }}
          >
            Add New Category
          </VLink>
        </Box>

            <CategoriesTable columns={columns} data={categories} name="Categories"/>
      </div>
    );
};

export default CategoryIndexPage;
