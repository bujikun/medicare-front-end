import { checkSessionValidity,} from "@/lib/util";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { redirect } from "next/navigation";
export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
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
      session.username = token.username;
      session.balance = token.balance;
      session.name = token.name;
      session.user_id = token.user_id;
      const response = await checkSessionValidity("/auth/introspect",token.access_token)
      if (response.status === 401) {
        session.active = false;
        redirect("/auth/signin");
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
        token.account_number = user.account_number;
        token.name = user.name;
        token.balance = user.balance;
        token.username = user.username;
        token.user_id = user.id;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
