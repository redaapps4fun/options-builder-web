import { authConfig } from "@/lib/auth";
import NextAuth from "next-auth";

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

export const { GET, POST } = handlers;
