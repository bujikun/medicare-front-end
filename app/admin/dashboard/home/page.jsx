import { fetchGET } from "@/lib/util";
import {
  Grid,
  GridItem,
  Text,
  Card,
  Stack,
  CardBody,
  Heading,
  Flex,
  Icon,
} from "@/wrapper/chakra/ui";
import { redirect } from "next/navigation";
import {
  BiSolidPurchaseTag,
  MdOutlineCategory,
  FaUsers,
 AiOutlineShopping,

} from "@/wrapper/icons";

const Home = async () => {
  const response = await fetchGET("/home");
  let homeItems = null;
  if (response.status === 401) {
    //invalid jwt backend token
    //force sign in
    redirect("/auth/signin");
  } else if (response.ok) {
    homeItems = await response.json();
  }
  const icons = [
    BiSolidPurchaseTag,
    MdOutlineCategory,
    FaUsers,
    AiOutlineShopping,
  ];
  return (
    <Grid
      templateColumns="repeat(auto-fit, minmax(30rem, 1fr))"
      m="auto"
      gap={4}
    >
      {homeItems?.map((item,index) => (
        <GridItem p="0.5rem" key={item.title} >
          <HomeCard
            title={item.title}
            count={item.count}
            summary={item.summary}
            icon={icons[index]}
          />
        </GridItem>
      ))}
    </Grid>
  );
};

const HomeCard = ({ title, count, summary,icon }) => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="elevated"    >
      <Flex
        justify="center"
        align="center"
        minH="10rem"
        minW="10rem"
        p="0.5rem"
      >
        <Icon as={icon} height="50%" width="50%" />
      </Flex>
      <Stack>
        <CardBody>
          <Text size="md">{title}</Text>

          <Heading size="lg" py="2">
            {count}
          </Heading>
          <Text fontWeight="thin" color="gray.400">
            {summary}
          </Text>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default Home;
