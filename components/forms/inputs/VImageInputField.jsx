import {Icon, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement } from "@/wrapper/chakra/ui";
import { useField } from "formik";
import { MdCheckCircle,MdCancel } from "@/wrapper/icons";

const VImageInputField = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);
  return (
    <FormControl isInvalid={meta.touched && meta.error || props.error}>
      <FormLabel htmlFor={props?.id || props?.name}>{label}</FormLabel>
        <input {...props} {...field}  onChange={e=>helpers.setValue(e.target.files[0])} value={{}}/>
        {meta.touched && (
          <InputRightElement>
              <Icon
                as={meta.error? MdCancel:MdCheckCircle}
              sx={{
                  color:(meta.error?"red":"green"),
                fontWeight:500,
                fontSize:"md"
                }}
              />
          </InputRightElement>
        )}
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};
export default VImageInputField;
