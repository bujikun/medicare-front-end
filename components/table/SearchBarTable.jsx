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
    InputGroup,
    IconButton,
  Input,
  Tbody,
  Th,
  Td,
  Icon,
  HStack,
} from "@/wrapper/chakra/ui";
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
  MdOutlineArrowUpward,
  MdOutlineArrowDownward,
  FaCartArrowDown,
  BsFillEyeFill,
} from "@/wrapper/icons";
const SearchBarTable = ({ data, columns, name }) => {
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
    <TableContainer bg="white" p={2} borderRadius="0.5rem">
      <HStack spacing={4} my={4} justify="flex-end">
        <InputGroup w="10rem">
          <Input
            type="text"
            placeholder="Filter"
            value={filtering}
            onChange={(e) => setIsFiltering(e.target.value)}
            borderColor="gray.400"
          />
        </InputGroup>
      </HStack>
      <Table variant="striped" colorScheme="gray" overflow="scroll" size="sm">
        <TableCaption>
          {memoizedData.length} {name} found!
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
              <Th></Th>
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
                {/* <ActionMenu id={row.original.id} name={row.original.name} /> */}
                <IconButton
                  icon={<BsFillEyeFill />}
                  colorScheme="teal"
                  fontSize="1.2rem"
                  isRound={true}
                  mx={2}
                  as="a"
                  href={`/public/products/${row.original.id}`}
                />
                <IconButton
                  icon={<FaCartArrowDown />}
                  colorScheme="teal"
                  fontSize="1.2rem"
                  isRound={true}
                  mx={2}
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
export default SearchBarTable;
