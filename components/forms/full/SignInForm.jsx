"use client"

import VSubmitButton from "@/components/buttons/VSubmitButton";
import VInputField from "@/components/forms/inputs/VInputField";
import {signIn} from "next-auth/react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
    Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,Grid,
  GridItem,
  Text,
} from "@/wrapper/chakra/ui";
import { Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
const initialValues = {
  username: "",
  password: "",
};
const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(4, "Username must be four or more characters"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be six or more characters"),
});

const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
   signIn("credentials", {
      username: values.username,
        password: values.password,
      callbackUrl: "/admin/dashboard/home",
    });
};

const SignInForm = () => {
    const params = useSearchParams();
    const error = params.get("error");
    return (
      <Grid placeItems="center" h="100vh" w="100vw">
        <GridItem>
          <Card w="25rem" m="auto">
            <CardHeader>
              <Text as="h3" textAlign="center" fontWeight="700">
                Medicare Login
              </Text>
            </CardHeader>
            <Divider color="gray.300" />
            {error && (
              <Alert status="error">
                <AlertTitle>Error!</AlertTitle>
                <AlertDescription>Invalid credentials!</AlertDescription>
              </Alert>
            )}
            <CardBody>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Form>
                  <VInputField
                    label="Username"
                    name="username"
                    type="text"
                    autoComplete="on"
                    loginerror={error}
                  />
                  <VInputField
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="on"
                    loginerror={error}
                  />
                  <VSubmitButton text="Log In" />
                </Form>
              </Formik>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    );
}
export default SignInForm