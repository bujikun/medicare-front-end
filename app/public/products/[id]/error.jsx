"use client"
import { Alert, AlertDescription, AlertTitle } from "@/wrapper/chakra/ui"

const ProductNotFound = () => {
  return (
      <Alert status="error">
          <AlertTitle>Error!</AlertTitle>
          <AlertDescription>Product could not be found</AlertDescription>
    </Alert>
  )
}
export default ProductNotFound