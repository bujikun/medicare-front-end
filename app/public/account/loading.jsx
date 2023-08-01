import {Box,SkeletonText} from "@/wrapper/chakra/ui"
const LoadingUI = () => {
  return (
    <Box padding="6" boxShadow="lg" bg="white" height="100vh">
      <SkeletonText mt="8" noOfLines={4} spacing="4" skeletonHeight="2" />
    </Box>
  );
}
export default LoadingUI