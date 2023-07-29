import PublicNavBar from "@/components/navigation/PublicNavBar";
import CartContext from "@/contexts/CartContext";
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
      <CartContext>
        <DashboardContext>
          <PublicNavBar />
        </DashboardContext>
        {children}
      </CartContext>
    </Flex>
  );
};
export default PublicLayout;
