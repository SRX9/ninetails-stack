import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./database/drizzleClient";
import { users } from "./database/schema";
import { eq } from "drizzle-orm";

export const { handlers, auth, signIn, signOut } = NextAuth(() => {
  return {
    adapter: DrizzleAdapter(db),
    providers: [
      GoogleProvider({
        clientId: process.env.AUTH_GOOGLE_ID,
        clientSecret: process.env.AUTH_GOOGLE_SECRET,
      }),
      GitHubProvider({
        clientId: process.env.AUTH_GITHUB_ID,
        clientSecret: process.env.AUTH_GITHUB_SECRET,
      }),
    ],
    callbacks: {
      async session({ session, token }) {
        const userRecord = await db
          .select({
            active_plan: users.active_plan,
          })
          .from(users)
          .where(eq(users.email, session.user.email as string))
          .limit(1);

        if (userRecord.length > 0) {
          session.user.active_plan = userRecord[0].active_plan;
        }

        return session;
      },
      async jwt({ token, user }) {
        if (user) {
          token.id = user.id;
        }
        return token;
      },
    },
  };
});
