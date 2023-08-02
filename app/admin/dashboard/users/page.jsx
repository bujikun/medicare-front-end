import AllOrdersTable from "@/components/table/AllOrdersTable";
import AllUsersTable from "@/components/table/AllUsersTable";
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

const UsersIndexPage = async () => {
    const response = await fetchGET("/users");
  if (response.status === 401) {
    redirect("/auth/signin", "replace");
    }
  if (!response.ok) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription>Could not fetch user</AlertDescription>
      </Alert>
    );
  }
  const users = await response.json();
  if (users.length <= 0) {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>Error!</AlertTitle>
        <AlertDescription>No users made so far!</AlertDescription>
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
            Users
          </Heading>
        </Box>
        <AllUsersTable data={users}/>
      </div>
    );
};

export default UsersIndexPage;
