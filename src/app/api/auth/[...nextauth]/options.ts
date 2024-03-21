import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { checkUserExists, createUser } from "@/lib/actions";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: process.env.NEXT_PUBLIC_SERVER_URL,
  },
  callbacks: {
    async signIn({ user }) {
      try {
        const userExists = await checkUserExists(user.email as string);

        if (userExists) return true;

        await createUser({
          name: user.name as string,
          email: user.email as string,
          image: user.image as string,
        });

        return true;
      } catch (error) {
        return false;
      }
    },
  },
};
