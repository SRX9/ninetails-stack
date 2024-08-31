import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      active_plan: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    active_plan: string | null;
  }
}
