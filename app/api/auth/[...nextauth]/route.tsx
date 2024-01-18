import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";

import CredentialProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        nome: { type: "nome" },
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        signup: { type: "boolean" },
      },
      async authorize(credentials) {
        console.log(credentials);

        let user = {
          id: "1",
          email: "user@gmail.com",
          password: "@123",
          name: "Usuário",
          role: "admin",
        };

        if (credentials?.signup === "false") {
            console.log("login")
            const isValidEmail = user.email === credentials?.email;
            const isValidPassword = user.password === credentials?.password;
            if (!isValidEmail || !isValidPassword) return null;
            return user;
        }else{
            user = {
                id: `${parseInt(user.id+1)}`,
                email: credentials?.email || "",
                password: credentials?.password || "",
                name: credentials?.nome || "",
                role: "user",
            }
        }

        return user

      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      const customUser = user as unknown as any;

      if (user) {
        return {
          ...token,
          role: customUser.role,
        };
      } else return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          name: token.name,
          email: token.email,
          role: token.role,
        },
      };
    },
  },
  pages: {
    signIn: "/auth/login",
    newUser: '/auth/pages'
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
