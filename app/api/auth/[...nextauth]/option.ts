import type { NextAuthOptions, User } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { UserType } from "@/lib/type";

export const options: NextAuthOptions = {
  providers: [
    // GitHubProvider({
    //     clientId: process.env.GITHUB_ID as string,
    //     clientSecret: process.env.GITHUB_SECRET as string,
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Username:",
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

        const response = await axios.post(
          process.env.API_BASE_URL + "/auth/login",
          {
            email: credentials?.email,
            password: credentials?.password,
          }
        );

        console.log(response.data);

        if (response.data.result) {
          const user2 = {
            id: response.data.result._id,
            name: response.data.result.username,
            role: response.data.result.role,
            division: response.data.result.division,
          };

          return user2;
        }

        const user = {
          id: "01",
          name: "admin",
          password: "admin",
          role: "ADMIN",
          division: "Marketing",
        };
        if (
          credentials?.email === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.division = user.division;
      }

      return token;
    },
    // If you want to use the role in client components
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.division = token.division;
      }
      return session;
    },
  },
};
