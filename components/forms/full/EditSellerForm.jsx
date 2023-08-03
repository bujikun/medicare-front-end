"use client";

import VSubmitButton from "@/components/buttons/VSubmitButton";
import VInputField from "@/components/forms/inputs/VInputField";
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

const EditSellerForm = ({sellerName,id}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false); 
  const [isFailed, setIsFailed] = useState(false);
  const params = useSearchParams();
  const error = params.get("error");
  const initialValues = {
  name: sellerName,
};
  
  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    setIsLoading(true);
    const response = await fetch("/api/admin/sellers/edit", {
      method: "POST",
      body: JSON.stringify({...values,id}),
    });
    const data = await response.json();
    setSubmitting(false);
    if (!data.success) {
      //error 
      setIsLoading(false);
      setIsFailed(true);
    } else {
      router.replace(`/admin/dashboard/sellers`);
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
            Edit Seller
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
              Seller could not be saved.Try again later
            </AlertDescription>
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
            <VSubmitButton
              text="Save"
              isLoading={isLoading}
              loadingText="Saving Seller..."
            />
          </Form>
        </Formik>
      </Box>
    </Flex>
  );
};
export default EditSellerForm;
