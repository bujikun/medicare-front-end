"use client"

import VSubmitButton from "@/components/buttons/VSubmitButton";
import VInputField from "@/components/forms/inputs/VInputField";
import {
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
  setTimeout(() => {
    setSubmitting(true);
    console.log(values);
  }, 3000);
};

const SignInForm = () => {
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
                  />
                  <VInputField
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="on"
                  />
                 <VSubmitButton text="Log In"/>
                </Form>
              </Formik>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    );
}
export default SignInForm