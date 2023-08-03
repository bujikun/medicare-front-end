"use client";

import VSubmitButton from "@/components/buttons/VSubmitButton";
import VInputField from "@/components/forms/inputs/VInputField";
import { getCsrfToken, signIn } from "next-auth/react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  Divider,
  Flex,
  Heading,
  Text,
} from "@/wrapper/chakra/ui";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import VSelect from "../inputs/VSelect";
import VImageInputField from "../inputs/VImageInputField";
import { useState } from "react";
import VTextArea from "../inputs/VTextArea";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(6, "Name must be six or more characters"),
  description: Yup.string()
    .required("Description is required")
    .min(6, "Name must be six or more characters"),
  price: Yup.number("Price must be a number")
    .required("Price is required")
    .positive("Price must be a positive number"),

});



const AddProductForm = ({ token, sellers, categories }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); 
  const [isFailed, setIsFailed] = useState(false);
  const params = useSearchParams();
  const error = params.get("error");
  const initialValues = {
  name: "",
  description: "",
  price: 0.0,
  csrfToken: token ,
  seller_id: sellers[0].id,
    category_id:categories[0].id,
};
  
  const onSubmit = async (values, { setSubmitting }) => {
        console.log(JSON.stringify(values));
    setSubmitting(true);
    setIsLoading(true);
    const response = await fetch("/api/admin/products/add", {
      method: "POST",
      body: JSON.stringify(values),
    });
    const data = await response.json();
    setSubmitting(false);
    if (!data.success) {
      //error 
      setIsLoading(false);
      setIsFailed(true);
    } else {
      router.replace(`/admin/dashboard/products/add/image?id=${data.product.id}&name=${data.product.name}`);
    }
  };
  return (
    <Flex
      bg="#fff"
      h="80vh"
      direction="column"
      justify="flex-start"
      align="center"
    >
      <Box w={{ base: "300px", md: "400px", lg: "500px" }}>
        <Box my={8}>
          <Heading as="h4" textAlign="center">
            Add New Product
          </Heading>
        </Box>
        {error && (
          <Alert status="error">
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>An error occured</AlertDescription>
          </Alert>
        )}

        {isFailed && (
          <Alert status="error">
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>
              Product could not be saved.Try again later
            </AlertDescription>
          </Alert>
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form method="POST">
            <input type="hidden" name="csrfToken" value={token} />
            <VInputField
              label="Name"
              name="name"
              type="text"
              autoComplete="on"
              error={error}
            />
            <VInputField
              label="Price($)"
              name="price"
              type="number"
              step="0.1"
              autoComplete="on"
              error={error}
            />

            <VTextArea
              label="Description"
              name="description"
              type="text"
              autoComplete="on"
              error={error}
            />
            <VSelect label="Seller" name="seller_id" error={error}>
              {sellers.map((seller) => (
                <option key={seller.id} value={seller.id}>
                  {seller.name}
                </option>
              ))}
            </VSelect>
            <VSelect label="Category" name="category_id" error={error}>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </VSelect>
            <VSubmitButton
              text="Add"
              isLoading={isLoading}
              loadingText="Adding Product..."
            />
          </Form>
        </Formik>
      </Box>
    </Flex>
  );
};
export default AddProductForm;
