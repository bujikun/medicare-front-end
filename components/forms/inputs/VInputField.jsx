import {Icon, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement } from "@/wrapper/chakra/ui";
import { useField } from "formik";
import { MdCheckCircle,MdCancel } from "@/wrapper/icons";

const VInputField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={props.error || meta.touched && meta.error}>
      <FormLabel htmlFor={props?.id || props?.name}>{label}</FormLabel>
      <InputGroup>
        <Input {...props} {...field} />
        {meta.touched && (
          <InputRightElement>
            <Icon
              as={meta.error ? MdCancel : MdCheckCircle}
              sx={{
                color: meta.error ? "red" : "green",
                fontWeight: 500,
                fontSize: "md",
              }}
            />
          </InputRightElement>
        )}
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};
export default VInputField;
