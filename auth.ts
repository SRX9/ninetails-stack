import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import PostgresAdapter from "@auth/pg-adapter";
import { getDBPool } from "./Database/dbClient";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth(() => {
  const pool = getDBPool();
  return {
    adapter: PostgresAdapter(pool),
    providers: [
      Google({
        authorization: {
          params: {
            prompt: "consent",
            access_type: "offline",
            response_type: "code",
          },
        },
      }),
      GitHub,
    ],
  };
});
