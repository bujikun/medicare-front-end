"use client"

import { CacheProvider } from "@chakra-ui/next-js"
import { ChakraProvider } from "@chakra-ui/react"
import {theme} from "@/theme/theme"

const ChakraContextProvider = ({children}) => {
  return (
      <CacheProvider>
          <ChakraProvider theme={theme}>
              {children}
          </ChakraProvider>
    </CacheProvider>
  )
}
export default ChakraContextProvider