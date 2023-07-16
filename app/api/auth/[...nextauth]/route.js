import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
export const authOptions = {
    session: {
    strategy:"jwt"
    },
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {},
            authorize: async (credentials,req) => {
                //do login from backend using fetch
                //body need to stringified
                console.log(credentials);
                return {
                    name: credentials.username,
                    email: "fake_user@gmail.com",
                    image:"some image url"
                }
            },
            
        })
    ],
    pages: {
        signIn: "/auth/signin",
        
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
    }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}