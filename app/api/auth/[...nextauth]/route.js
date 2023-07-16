import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
const authOptions = {
    session: {
    strategy:"jwt"
    },
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {},
            authorize: async ({credentials,req}) => {
                //do login from backend using fetch
                //body need to stringified

                return {
                    name: credentials.username,
                    email: "fake_user@gmail.com",
                    image:"some image url"
                }
            }
        })
    ],
    pages: {
        
    }
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}