"use client"

import VSubmitButton from "@/components/buttons/VSubmitButton";
import VInputField from "@/components/forms/inputs/VInputField";
import {signIn} from "next-auth/react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
  Card,
  CardBody,
  CardHeader,
  Divider,Flex,Grid,
  GridItem,
  Text,
} from "@/wrapper/chakra/ui";
import { Form, Formik, } from "formik";
import * as Yup from "yup";
import { useSearchParams } from "next/navigation";
import { v4 as uuid } from "uuid";
import { useState } from "react";
const initialValues = {
  username: "",
  password: "",
  confirm_password: "",
  firstname: "",
  lastname: "",
  account_number: String(uuid()).toUpperCase().replace("-", ""),
  balance:"100"
};
const validationSchema = Yup.object({
  account_number:Yup.string(),
  username: Yup.string()
    .required("Username is required")
    .min(4, "Username must be four or more characters"),
  firstname: Yup.string()
    .required("First Name is required")
    .min(4, "First Name must be four or more characters"),
  lastname: Yup.string()
    .required("Last Name is required")
    .min(4, "Last Name must be four or more characters"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be six or more characters"),
  confirm_password: Yup.string()
    .required("Password must be retyped")
    .min(6, "Password must be six or more characters")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});



const RegistrationForm = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [usernameError, setUsernameError] = useState(null);
   const params = useSearchParams();
   const error = params.get("error"); 
  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    setIsRegistering(true);
    const response = await fetch("/api/public/users", {
      method:"POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify(values)
    })
          const data = await response.json();
      setIsRegistering(false);
    if (data.status === "201") {
      signIn(undefined,{callbackUrl:"/"});
    } else {
      setUsernameError(data.detail);
    }
  };
    return (
      <Grid mt={2} h="100vh" w="100vw">
        <GridItem>
          <Card w="30rem" m="auto">
            <CardHeader>
              <Text as="h3" textAlign="center" fontWeight="700">
                Medicare Registration
              </Text>
            </CardHeader>
            <Divider color="gray.300" />
            {usernameError && (
              <Alert status="error">
                <AlertTitle>Error!</AlertTitle>
                <AlertDescription>{usernameError}</AlertDescription>
              </Alert>
            )}
            <CardBody>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Form method="POST">
                  <VInputField
                    label="Account Number"
                    name="account_number"
                    type="text"
                    autoComplete="on"
                    error={error}
                    isDisabled={true}
                    fontWeight={500}
                  />
                  <VInputField
                    label="Initial Account Balance ($)"
                    name="balance"
                    type="text"
                    autoComplete="on"
                    error={error}
                    isDisabled={true}
                  />
                  <VInputField
                    label="Username"
                    name="username"
                    type="text"
                    autoComplete="on"
                    error={usernameError}
                  />
                  <VInputField
                    label="First Name"
                    name="firstname"
                    type="text"
                    autoComplete="on"
                    error={error}
                  />
                  <VInputField
                    label="Last Name"
                    name="lastname"
                    type="text"
                    autoComplete="on"
                    error={error}
                  />
                  <VInputField
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="on"
                    error={error}
                  />
                  <VInputField
                    label="Confirm Password"
                    name="confirm_password"
                    type="password"
                    autoComplete="on"
                    error={error}
                  />
                  <VSubmitButton text="Register" isLoading={isRegistering} />
                </Form>
              </Formik>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    );
}
export default RegistrationForm