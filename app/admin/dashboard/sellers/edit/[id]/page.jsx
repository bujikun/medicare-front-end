import EditCategoryForm from "@/components/forms/full/EditCategoryForm";
import EditSellerForm from "@/components/forms/full/EditSellerForm";
import { fetchGET } from "@/lib/util";

const EditSellerPage = async ({ params }) => {
  const response = await fetchGET(`/sellers/${params.id}`);
  const seller = await response.json();
  return (
    <EditSellerForm sellerName={seller.name} id={params.id} />
  )
}
export default EditSellerPage