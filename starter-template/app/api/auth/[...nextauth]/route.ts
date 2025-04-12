import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = "force-dynamic";

const nextAuth = NextAuth(authOptions);
export const { handlers } = nextAuth;

export { handlers as GET, handlers as POST };
