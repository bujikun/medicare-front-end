"use client"
import {Box,Button} from "@/wrapper/chakra/ui"
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
const ImageUploader = ({csrfToken,id}) => {
    const ref = useRef(null);
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const input = ref.current
        const formData = new FormData();
        console.log(input.files);
        formData.append("image", input.files[0] ?? []);
        formData.append("id", id);
        formData.append("csrfToken", csrfToken);
        const response = await fetch("/api/admin/products/add/image", {
            method: "POST",
            body:formData
        })
        if (response.ok) {
            router.push("/admin/dashboard/products/")
        }
    };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="hidden" value={csrfToken} name="csrfToken" />
        <input type="hidden" value={id} name="id" />
        <input
          label="Image"
          name="image"
          type="file"
          accept="image/jpeg"
          required={true}
          ref={ref}
        />
        <Box my={4}>
          <Button colorScheme="blue" type="submit" isLoading={isSubmitting} loadingText="Uploading ...">
            Upload
          </Button>
        </Box>
      </form>
    </div>
  );
}
export default ImageUploader
