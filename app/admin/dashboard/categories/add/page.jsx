import AddProductForm from "@/components/forms/full/AddProductForm"
import { fetchGET } from "@/lib/util";
import { getCsrfToken } from "next-auth/react"

const AddProductPage = async() => {
  const token = await getCsrfToken();
  let response = await fetchGET("/sellers");
  const sellers = await response.json()
  response = await fetchGET("/categories");
  const categories = await response.json();
  return (
    <AddProductForm token={token} sellers={sellers} categories={categories} />
  )
}
export default AddProductPage