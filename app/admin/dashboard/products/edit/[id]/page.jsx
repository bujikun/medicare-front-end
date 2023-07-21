import EditProductForm from "@/components/forms/full/EditProductForm";
import { fetchGET } from "@/lib/util";
import { getCsrfToken } from "next-auth/react"

const EditProductPage = async ({ params }) => {
  const token = await getCsrfToken();
  let response = await fetchGET("/sellers");
  const sellers = await response.json();
  response = await fetchGET("/categories");
  const categories = await response.json();
  response = await fetchGET(`/products/${params.id}`);
  const product = await response.json();

  return (
    <EditProductForm token={token} sellers={sellers} categories={categories} product={product} />
  )
}
export default EditProductPage