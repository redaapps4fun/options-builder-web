import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { db } from './db';
import { compare } from 'bcrypt';
import NextAuth from 'next-auth';

export const authConfig: NextAuthConfig = {  
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-out',
  },

  callbacks: {
    async session({ session, token }) {
      console.log('session', session);
      console.log('token', token);
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username as string,
          email: token.email,
        },
      };
    },

    async jwt({ token, user, account, profile }) {
      console.log('token', token);
      console.log('user', user);
      if (user) {
        return {
          ...token,
          username: user.username,
          email: user.email,
        };
      }
      return token;
    },
  },

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jsmith@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const existingUser = await db.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!existingUser) {
          return null;
        }

        const passwordsMatch = await compare(credentials.password as string, existingUser.password);

        if (!passwordsMatch) {
          return null;
        }

        return {
          id: `${existingUser.id}`,
          username: existingUser.username,
          email: existingUser.email,
        };
      },
    }),
  ],
};

export const { auth } = NextAuth(authConfig);
