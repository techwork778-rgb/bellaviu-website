import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import { database } from "../../../../config/dbconnection"; // Assuming this path is correct
import { database } from "../../../../config/dbconnection";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Custom sign-in page (optional)
    error: "/auth/error", // Custom error page (optional)
    redirect: "/", // Redirect after successful login
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const { email, name } = user;
        const [existingUser] = await database.execute(
          "SELECT * FROM users WHERE email_id = ?",
          [email]
        );

        // If the user doesn't exist, insert them into the database
        if (existingUser.length === 0) {
          const [firstName, lastName] = name.split(" "); // Simple split, can be improved
          await database.execute(
            "INSERT INTO users (created_dt, updated_dt, first_name, last_name, email_id) VALUES (now(), now(), ?, ?, ?)",
            [firstName, lastName, email]
          );
        } else {
          console.log("User already exists:", email);
        }

        // Allow the sign-in process to continue
        return true;
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false; // If there's an error, the sign-in process will fail
      }
    },
    async session(session, user) {
      session.user = user; // Attach user to session
      return session;
    },
  },
  session: {
    jwt: true, // Use JWT for session handling
  },
  secret: "HSIUHIUHIDHDIDUTUEUE", // Hardcoded secret (unsafe for production)
  NEXTAUTH_URL: "http://localhost:3000", // Hardcoded URL (adjust as necessary)
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// This file is a duplicate and has been removed
// Please use route.ts instead
