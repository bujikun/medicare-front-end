import EditCategoryForm from "@/components/forms/full/EditCategoryForm";
import { fetchGET } from "@/lib/util";

const EditCategoryPage = async ({ params }) => {
  const response = await fetchGET(`/categories/${params.id}`);
  const category = await response.json();
  return (
    <EditCategoryForm categoryName={category.name} id={params.id} />
  )
}
export default EditCategoryPage