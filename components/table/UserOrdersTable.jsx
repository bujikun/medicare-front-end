"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import {
  Table,
  TableContainer,
  TableCaption,
  Thead,
  Tr,
    Stack,
    InputGroup,
    InputLeftElement,
  Input,
  Tbody,
  Th,
  Td,
  IconButton,
  Icon,
} from "@/wrapper/chakra/ui";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
  MdOutlineArrowUpward,
  MdOutlineArrowDownward,
  BsSearch,
  BsFillEyeFill,
} from "@/wrapper/icons";

const columns = [
  {
    header: "Order Number",
    accessorKey: "id",
  },
  {
    header: "Item Count",
    accessorFn: row => `${row.order_items.length}`,
    
  },
  {
    header: "Total Price ($)",
    accessorKey: "total_price",
  },
  {
    header: "Placed On",
    accessorKey: "created_on",
  },
];
const UserOrdersTable = ({ data }) => {
  const [sorting, setIsSorting] = useState([]);
  const [filtering, setIsFiltering] = useState('');
  const memoizedData = useMemo(() => data, [data]);
  const table = useReactTable({
    data: memoizedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
        sorting: sorting,
        globalFilter:filtering,
    },
      onSortingChange: setIsSorting,
    onGlobalFilterChange:setIsFiltering
  });
  return (
    <TableContainer mx={8}>
      <Stack spacing={4} my={4}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={BsSearch} />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Type to search"
            value={filtering}
            onChange={(e) => setIsFiltering(e.target.value)}
          />
        </InputGroup>
      </Stack>
      <Table variant="striped" colorScheme="gray" overflow="scroll" size="sm">
        <TableCaption>
          {memoizedData.length} order(s) made.
        </TableCaption>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th
                  key={header.id}
                  cursor="pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {
                    {
                      asc: (
                        <Icon
                          as={MdOutlineArrowUpward}
                          mx={2}
                          fontWeight={900}
                        />
                      ),
                      desc: (
                        <Icon
                          as={MdOutlineArrowDownward}
                          mx={2}
                          fontWeight={600}
                        />
                      ),
                    }[header.column.getIsSorted() ?? null]
                  }
                </Th>
              ))}
              <Th>Action</Th>
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
              <Td>
                <IconButton
                  icon={<BsFillEyeFill />}
                  fontSize="1.2rem"
                  isRound={true}
                  mx={2}
                  as="a"
                  href={`/public/orders/view/${row.original.id}`}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <IconButton
        icon={<BsChevronDoubleLeft />}
        mx={4}
        colorScheme="green"
        borderRadius="50%"
        onClick={() => table.setPageIndex(0)}
      />
      <IconButton
        icon={<BsChevronLeft />}
        mx={4}
        colorScheme={"blue"}
        borderRadius="50%"
        onClick={() => table.previousPage()}
        isDisabled={!table.getCanPreviousPage()}
      />
      <IconButton
        icon={<BsChevronRight />}
        mx={4}
        colorScheme={"blue"}
        borderRadius="50%"
        onClick={() => table.nextPage()}
        isDisabled={!table.getCanNextPage()}
      />
      <IconButton
        icon={<BsChevronDoubleRight />}
        mx={4}
        colorScheme="green"
        borderRadius="50%"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
      />
    </TableContainer>
  );
};
export default UserOrdersTable;
