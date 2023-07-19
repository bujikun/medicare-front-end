"use client"
import { Link } from "@/wrapper/chakra/next-js"
import { Button } from "@/wrapper/chakra/ui";
import { MdAddCircle } from "@/wrapper/icons";
const VLink = ({href,children,icon,scheme}) => {
  return (
    <Link
      href={href}
      sx={{
        _hover: {
          textDecoration: "none",
        },
      }}
      >
          <Button colorScheme={scheme??"blue"} variant="outline" leftIcon={icon??<MdAddCircle/>}>
              {children}
          </Button>
    </Link>
  );
}
export default VLink