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
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(4, "Name must be four or more characters"),
});

const AddCategoryForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); 
  const [isFailed, setIsFailed] = useState(false);
  const params = useSearchParams();
  const error = params.get("error");
  const initialValues = {
  name: "",
};
  
  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    setIsLoading(true);
    const response = await fetch("/api/admin/categories/add", {
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
      router.replace(`/admin/dashboard/categories`);
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
            Add New Category
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
            <AlertDescription>Category could not be saved.Try again later</AlertDescription>
          </Alert>
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form method="POST">
            <VInputField
              label="Name"
              name="name"
              type="text"
              autoComplete="on"
              error={error}
            />
            <VSubmitButton text="Add" isLoading={isLoading}  loadingText="Adding Category..."/>
          </Form>
        </Formik>
      </Box>
    </Flex>
  );
};
export default AddCategoryForm;
