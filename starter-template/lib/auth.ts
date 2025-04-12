import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { LOGIN } from "@/configs/api.config";

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phoneNumber: { label: "Phone Number", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.phoneNumber || !credentials?.password) {
            return null;
          }

          const res = await axios.post(LOGIN, {
            phoneNumber: credentials.phoneNumber,
            password: credentials.password,
            type: "user",
          });

          const user = res.data.data.user;
          if (user) {
            return {
              id: user._id,
              name: user.fullName,
              email: user.emailAddress,
              phoneNumber: user.phoneNumber,
              token: res.data.data.token,
            };
          }
          return null;
        } catch (error) {
          console.error("Authorize error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.phoneNumber = user.phoneNumber;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id as string;
        session.user.phoneNumber = token.phoneNumber as string;
        session.user.token = token.token as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/phone",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 روز
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// صادر کردن توابع NextAuth
const nextAuth = NextAuth(authOptions);
export const { handlers, signIn, signOut, auth } = nextAuth;
