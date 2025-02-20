import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    username: string;
  }

  interface Session {
    user: User & {
      /** The user's postal address. */
      name: string
    }
    token: {
      username: string;
    }
  }
}