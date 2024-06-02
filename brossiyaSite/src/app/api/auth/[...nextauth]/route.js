import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";

const prisma = new PrismaClient();
 const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials, req) {
        const { username, password } = credentials;

        try {
          if (!username || !password) {
            return null;
          }
          const user = await prisma.users.findUnique({
            where: {
              username: credentials.username,
            },
          });

          if (!user) {
            console.log("Not found ");

            return null;
          }
          console.log("user found ", user);
          const isPasswordValid = await compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            console.log("wrong password ");

            return null;
          }

          return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
          };
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],

  callbacks: {
    async session({ session, token }) {
      console.log("session token", token);
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          firstName: token.firstName,
          lastName: token.lastName,
          role: token.role,
        },
      };
    },

    async jwt({ token, user }) {
      // after login jwt token and get the user data from here

      if (user) {
        return {
          ...token,
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        };
      }
      return token;
    },
  },

  pages: {
    signIn: "/components",
    signOut: "/",
  },

  // secret: process.env.NEXTAUTH_SECRET,
  // secret: "LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=",

  debug: process.env.NODE_ENV === "development",
  jwt: {
    // secret: process.env.NEXTAUTH_JWT_SECRET,
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
