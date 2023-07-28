import PublicNavBar from "@/components/navigation/PublicNavBar";
import DashboardContext from "@/contexts/DashboardContext";
import { Flex } from "@/wrapper/chakra/ui";
const PublicLayout = ({ children }) => {
  return (
      <Flex
      direction="column"
          justifyContent="flex-start"
      h="100vh"
      width="98vw"
      my="0.5rem"
      mx="1rem"
      mr={4}
    >
      <DashboardContext>
        <PublicNavBar />
      </DashboardContext>
      {children}
    </Flex>
  );
};
export default PublicLayout;
