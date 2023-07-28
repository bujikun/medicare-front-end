"use client"
import SearchBarTable from "@/components/table/SearchBarTable";
import {
  Icon,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Box,
  SkeletonText,
} from "@/wrapper/chakra/ui";
import {BsSearch } from "@/wrapper/icons";
import { useEffect, useState } from "react";

const columns = [
  {
    header: "name",
    accessorKey: "name",
  },
  {
    header: "Price ($)",
    accessorKey: "price",
  },
  // {
  //   header: "Category",
  //   accessorKey: "category_name",
  // },
];

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [result, setResult] = useState([]);
  useEffect(() => {
    const fetchData = async (queryString) => {
      const response = await fetch("/api/public/products/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(queryString)
      });

      const data = await response.json();
      setResult(data);
      setIsFetching(false);
    }
    
    if (isFetching && query.length >= 3) {
      fetchData(query);
    }

  }, [isFetching, query]);
  
  const handleChange = (e) => {
    setQuery(e.target.value);
    if (query.length >= 3) {
      setIsFetching(true);
    } else {
      setIsFetching(false);
      setResult([])
    }
  }
  console.log(result);
  return (
    <Box>
      <FormControl mb={4}>
        <FormLabel htmlFor="search-bar"></FormLabel>
        <InputGroup size="lg">
          <Input
            placeholder="Search for product"
            borderColor="gray.400"
            type="text"
            name="search-bar"
            id="search-bar"
            value={query}
            onChange={handleChange}
          />
          <InputRightElement pointerEvents="none">
            <Icon
              as={BsSearch}
              sx={{
                color: "#333",
                fontWeight: 600,
                fontSize: "lg",
              }}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
      {isFetching &&  query.length>=3 && (
        <Box padding="6" boxShadow="lg" bg="white">
          <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
        </Box>
      )}
      {result.length > 0 ? (
        <SearchBarTable data={result} columns={columns} name="products" />
      ) : (
        <></>
      )}
    </Box>
  );
};
export default SearchBar;
