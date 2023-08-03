import {Icon, Box, Textarea, Text, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useField } from "formik";
import { MdCheckCircle,MdCancel } from "@/wrapper/icons";

const VTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <Box>
      <Text mb="8px">{label}</Text>
      <Textarea
        {...props} {...field}
        size="md"
        resize="vertical"
        isInvalid={props.error || (meta.touched && meta.error)}
      />
    </Box>
    // <FormControl isInvalid={props.error || meta.touched && meta.error}>
    //   <FormLabel htmlFor={props?.id || props?.name}>{label}</FormLabel>
    //   <InputGroup>
    //     <Input {...props} {...field} />
    //     {meta.touched && (
    //       <InputRightElement>
    //         <Icon
    //           as={meta.error ? MdCancel : MdCheckCircle}
    //           sx={{
    //             color: meta.error ? "red" : "green",
    //             fontWeight: 500,
    //             fontSize: "md",
    //           }}
    //         />
    //       </InputRightElement>
    //     )}
    //   </InputGroup>
    //   <FormErrorMessage>{meta.error}</FormErrorMessage>
    // </FormControl>
  );
};
export default VTextArea;
