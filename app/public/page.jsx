
import SearchBar from "@/components/forms/inputs/SearchBar";
import { Flex, Text, Heading,Stack,Input,InputGroup,InputLeftElement, Icon,Box} from "@/wrapper/chakra/ui";
import {BsSearch} from "@/wrapper/icons"
const IndexPage =  () => {

  return (
    <Flex
      direction="column"
      justifyContent="flex-start"
      h="100vh"
      width="100vw"
      my="0.5rem"
      mx="1rem"
      mr="2rem"
    >
      <Flex justify="center" direction="column" align="center"> 
        <Heading mt="2rem">Welcome to Medicare</Heading>
        <Text mt="2rem" fontSize="3xl">
          You number one stop for various medical products and accessories
        </Text>
        <Text fontSize="2xl" mb="2rem">
          Add items then check out. It is that simple.
        </Text>

        <Box width="80vw">
          <SearchBar mt={8} />
        </Box>
      </Flex>
    </Flex>
  );
};
export default IndexPage;
