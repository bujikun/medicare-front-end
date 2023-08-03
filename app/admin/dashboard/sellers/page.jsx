import VLink from "@/components/misc/VLink";
import CategoriesTable from "@/components/table/CategoriesTable";
import SellersTable from "@/components/table/SellersTable";
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
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Added On",
    accessorKey: "created_on",
  },
];
const SellersIndexPage = async () => {
  const response = await fetchGET("/sellers");
  if (response.status === 401) {
    redirect("/auth/signin", "replace");
  }
  if (!response.ok) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription>Could not fetch sellers data</AlertDescription>
      </Alert>
    );
  }
  const sellers = await response.json();
  if (sellers.length <= 0) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription>No sellers in the database!</AlertDescription>
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
          Sellers
        </Heading>
      </Box>
      <Box mb={4}>
        <VLink
          href="/admin/dashboard/sellers/add"
          sx={{ marginBottom: "2rem" }}
        >
          Add Seller
        </VLink>
      </Box>

      <SellersTable columns={columns} data={sellers} name="Sellers" />
    </div>
  );
};

export default SellersIndexPage;
