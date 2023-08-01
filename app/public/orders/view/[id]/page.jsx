import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import OrderReportSummary from "@/components/misc/OrderReportSummary";
import {  Box } from "@/wrapper/chakra/ui"
import { getServerSession } from "next-auth";

const ViewSingleOrderPage =  async({params}) => {
  const session = await getServerSession(authOptions);
    const response =  await fetch(`${process.env.BACKEND_API_BASE_URL}/orders/${params.id}`, {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });
  const data = await response.json();
  return (
    <Box w="95vw" p={8} m={4} height="85vh" bg="#fff" textAlign="center">
      <OrderReportSummary order={data} />
    </Box>
  );
}
export default ViewSingleOrderPage