import { checkSessionValidity, fetchPOST } from "@/lib/util";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {},
      authorize: async (credentials, req) => {
        //do login from backend using fetch
        //body need to stringified
        const response = await fetch(
          `${process.env.BACKEND_BASE_URL}/auth/login`,
          {
            method: "POST",
            headers: {
              Authorization:
                "Basic " +
                Buffer.from(
                  credentials.username + ":" + credentials.password
                ).toString("base64"),
            },
          }
        );
        if (response.status === 401) {
          return null;
        }
        const data = await response.json();
        console.log(data);
        return data;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  callbacks: {
    async session({ session, user, token }) {
      session.access_token = token.access_token;
      session.role = token.role;
      session.account_number = token.account_number;
      const response = await checkSessionValidity("/auth/introspect",token.access_token)
      if (response.status === 401) {
        session.active = false;
      } else if (response.ok){
        session.active = true;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) {
        //account available only first time after login
        token.access_token = user.token;
        token.role = user.role;
        token.account_number = user.account_number
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
