// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // Add secret if needed: secret: process.env.NEXTAUTH_SECRET,
  // Optionally add callbacks, session, etc.
  secret: process.env.NEXTAUTH_SECRET, // optional but best practice
};

const handler = NextAuth(authOptions);

// THIS EXPORT IS CRUCIAL FOR APP ROUTER!
export { handler as GET, handler as POST };
