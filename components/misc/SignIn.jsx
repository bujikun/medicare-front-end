
"use client"

import { signIn } from "next-auth/react";

const SignIn = ({callbackUrl}) => {
  return <>{signIn(undefined,{callbackUrl:callbackUrl})}</>;
}
export default SignIn