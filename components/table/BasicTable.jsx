"use client"

import { useReactTable } from "@tanstack/react-table"
import { useMemo } from "react";
import {
  Table,
  TableContainer,
  TableCaption,
  Thead,
  Tr,
  Tfoot,
  Tbody,
  Th,
  Td,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@/wrapper/chakra/ui";

const BasicTable = ({ data, columns }) => {
    const memoizedData = useMemo(()=>data,[]);
    const table = useReactTable({ memoizedData, columns });
    
    return (
      <Card direction="column"  variant="elevated">
        <CardHeader></CardHeader>
        <CardBody>
          <TableContainer>
            <Table variant="striped" colorScheme="green">
              <TableCaption>Imperial to metric conversion factors</TableCaption>

              <Thead>
                <Tr>
                  <Th>To convert</Th>
                  <Th>into</Th>
                  <Th isNumeric>multiply by</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>inches</Td>
                  <Td>millimetres (mm)</Td>
                  <Td isNumeric>25.4</Td>
                </Tr>
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>To convert</Th>
                  <Th>into</Th>
                  <Th isNumeric>multiply by</Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </CardBody>
        <CardFooter></CardFooter>
      </Card>
    );
}
export default BasicTable