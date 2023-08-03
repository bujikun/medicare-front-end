"use client";

import VSubmitButton from "@/components/buttons/VSubmitButton";
import VInputField from "@/components/forms/inputs/VInputField";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
  Flex,
  Heading,
  Text,
} from "@/wrapper/chakra/ui";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import VSelect from "../inputs/VSelect";
import { useState } from "react";

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

const EditProductForm = ({ token, sellers, categories, product }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const params = useSearchParams();
  const error = params.get("error");
  const initialValues = {
    id:product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    csrfToken: token,
    seller_id: product.seller_id,
    category_id: product.category_id,
  };

  const onSubmit = async (values, { setSubmitting }) => {
    console.log(JSON.stringify(values));
    setSubmitting(true);
    setIsLoading(true);
    console.log(values);
    const response = await fetch("/api/admin/products/edit", {
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
      console.log(data);
      // router.replace(`/admin/dashboard/products/edit/image?id=${data.product.id}&name=${data.product.name}`);
      router.replace("/admin/dashboard/products");
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
            Edit Product
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
              Product changes could not be saved.Try again later
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
            <VInputField
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
              text="Submit"
              isLoading={isLoading}
              loadingText="Submitting Changes ...!"
            />
          </Form>
        </Formik>
      </Box>
    </Flex>
  );
};
export default EditProductForm;
