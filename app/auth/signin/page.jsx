import SignInForm from "@/components/forms/full/SignInForm";
import {getCsrfToken} from "next-auth/react"
const SignInPage = async ({searchParams}) => {
  return <SignInForm csrfToken={await getCsrfToken()} callbackUrl={searchParams.callbackUrl}/>;
}
export default SignInPage