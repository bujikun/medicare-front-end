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
    error: "/auth/signin"
  },
  callbacks: {
    // redirect: async ({ url, baseUrl }) => {
    //     console.log("URL", url);
    //     console.log("BASE", baseUrl);
    //     if (url.startsWith("/")) {
    //         return `${baseUrl}${url}`
    //     }
    //     return "/";
    // }
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
