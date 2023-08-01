import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  Box,
  List,
  ListItem,
  Badge,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@/wrapper/chakra/ui";
import { getServerSession } from "next-auth";
const AccountPage = async () => {
  const session = await getServerSession(authOptions);
  const response = await fetch(
    `${process.env.BACKEND_API_BASE_URL}/users/${session.user_id}`,
    {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    }
  );
  const user = await response.json();
  return (
    <Box
      w="95vw"
      p={8}
      m={4}
      height="85vh"
      bg="#fff"
      textAlign="start"
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        flexDirection="column"
    >
      <Heading my={4} as="h6" fontWeight={400}>
        Account Details
      </Heading>
      <List spacing={3} fontSize="1.5rem"></List>

      <TableContainer>
        <Table variant="unstyled">
          <Thead>
            <Tr>
              <Th></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <Text as="span">Username:&nbsp;</Text>
              </Td>
              <Td>
                <Badge
                  variant="solid"
                  colorScheme="green"
                  textTransform="lowercase"
                  fontSize="1.2rem"
                >
                  <Text as="span" fontWeight="500">
                    {user.username}
                  </Text>
                </Badge>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text as="span">Name:&nbsp;</Text>
              </Td>
              <Td>
                <Badge
                  variant="solid"
                  colorScheme="green"
                  textTransform="capitalize"
                  fontSize="1.2rem"
                >
                  <Text
                    as="span"
                    fontWeight="500"
                  >{`${user.firstname} ${user.lastname}`}</Text>
                </Badge>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text as="span">Account Number:&nbsp;</Text>
              </Td>
              <Td>
                <Badge variant="solid" colorScheme="green" fontSize="1.2rem">
                  <Text as="span" fontWeight="500">
                    {user.account_number}
                  </Text>
                </Badge>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text as="span">Account Balance:&nbsp;</Text>
              </Td>
              <Td>
                <Badge variant="solid" colorScheme="green" fontSize="1.2rem">
                  <Text as="span" fontWeight="500">
                    ${user.balance}
                  </Text>
                </Badge>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <Text as="span">Date of Creation:&nbsp;</Text>
              </Td>
              <Td>
                <Badge variant="solid" colorScheme="green" fontSize="1.2rem">
                  <Text as="span" fontWeight="500">
                    {user.created_on}
                  </Text>
                </Badge>
              </Td>
            </Tr>
          </Tbody>
          <Tfoot></Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default AccountPage;
