"use client"
import { Link } from "@/wrapper/chakra/next-js"
import { Button } from "@/wrapper/chakra/ui";
import { MdAddCircle } from "@/wrapper/icons";
const VLink = ({href,children,sx}) => {
  return (
    <Link
      href={href}
      sx={{
        _hover: {
          textDecoration: "none",
        },
      }}
      >
          <Button colorScheme="blue" variant="outline" leftIcon={<MdAddCircle/>}>
              {children}
          </Button>
    </Link>
  );
}
export default VLink