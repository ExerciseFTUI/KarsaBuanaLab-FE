import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    // GitHubProvider({
    //     clientId: process.env.GITHUB_ID as string,
    //     clientSecret: process.env.GITHUB_SECRET as string,
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
        },
        password: {
          label: "Password:",
          type: "password",
        },
      },
      async authorize(credentials) {
        // This is where you need to retrieve user data
        // to verify with credentials
        // Docs: https://next-auth.js.org/configuration/providers/credentials
        const user = {
          id: "01",
          name: "admin",
          password: "admin",
          email: "RD@gmail.com",
        };

        if (
          credentials?.email === user.name &&
          credentials?.password === user.password
        ) {
          return {
            name: user.name,
            email: user.email,
            role: "admin",
            _id: user.id,
          };
        }

        try {
          const res = await axios.post(`${process.env.API_URL}/auth/login`, {
            email: credentials?.email,
            password: credentials?.password,
          });

          return res.data.result;
        } catch (error: any) {
          console.error(error.response.data);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60 * 7, // 24 * 7  hours = 1 week
  },
  callbacks: {
    async jwt({ token, user, account, profile }: any) {
      if (account?.provider === "credentials") {
        token.email = user.email;
        token.username = user.username;
        token.role = user.role;
        token.id = user._id;
      }
      return token;
    },

    async session({ session, token }: any) {
      session.user.email = token.email;
      session.user.username = token.username;
      session.user.role = token.role;
      session.user.id = token.id;
      return session;
    },
  },
};
