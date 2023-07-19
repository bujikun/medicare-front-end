import { Menu,MenuButton,MenuList,MenuItem,IconButton } from "@/wrapper/chakra/ui";
import {
  BsThreeDotsVertical,
  MdRemoveRedEye,
  MdEditSquare,
  FaTrash,
} from "@/wrapper/icons";
const ActionMenu = ({ id }) => {
    const style = {
        bg: "none",
        _hover: {
            bg: "teal.50",
            color: "teal.700",
            fontWeight: "600"
        }
    };
  return (
    <Menu colorScheme="teal">
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<BsThreeDotsVertical />}
        variant="ghost"
        bg="none"
        _active={{
          bg: "none",
        }}
        _hover={{
          bg: "none",
        }}
      />
      <MenuList>
        <MenuItem
          icon={<MdRemoveRedEye />}
          as="a"
          href={`/admin/dashboard/products/view/${id}`}
          sx={style}
        >
          View
        </MenuItem>
        <MenuItem
          icon={<MdEditSquare />}
          as="a"
          href={`/admin/dashboard/products/edit/${id}`}
          sx={style}
        >
          Edit
        </MenuItem>
        <MenuItem
          icon={<FaTrash />}
          sx={{
            bg: "none",
            _hover: {
              bg: "red.50",
              color: "red.700",
              fontWeight: "600",
            },
          }}
        >
          Disable
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
export default ActionMenu