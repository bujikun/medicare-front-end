import SignInForm from "@/components/forms/full/SignInForm";
import {getCsrfToken} from "next-auth/react"
const SignInPage = async ({ params }) => {
    console.log("PARAMS: ",params);
  return <SignInForm csrfToken={await getCsrfToken()} />;
}
export default SignInPage