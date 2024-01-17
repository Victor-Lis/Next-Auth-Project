import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";

import CredentialProvider from 'next-auth/providers/credentials'

const authOptions: NextAuthOptions = {
    providers: [
        CredentialProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email"},
                password: { label: "Password", type: "password"}
            },
            async authorize(credentials){
                return null
            }
        })
    ]
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }