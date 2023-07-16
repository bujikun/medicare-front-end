"use client"
import { Button } from "@/wrapper/chakra/ui"
import { PiSignInBold } from "@/wrapper/icons";
import { useFormikContext } from "formik";
const VSubmitButton = ({text}) => {
    const {errors}= useFormikContext();
  return (
    <Button
      colorScheme="blue"
      w="full"
      rightIcon={<PiSignInBold />}
      type="submit"
      my={6}
          isDisabled={!(Object.keys(errors).length === 0)}
        
    >
      {text}
    </Button>
  );
}
export default VSubmitButton