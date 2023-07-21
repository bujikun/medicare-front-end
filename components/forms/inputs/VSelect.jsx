import {
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
} from "@/wrapper/chakra/ui"; 
import { useField } from "formik";

const VSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <FormControl isInvalid={(meta.touched && meta.error) || props.error}>
      <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
          <Select {...field} {...props}>
              {props.children}
              </Select>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default VSelect;