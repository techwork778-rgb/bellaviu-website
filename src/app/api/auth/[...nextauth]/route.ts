import NextAuth, { Session, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { database } from "@/config/dbconnection";
import { RowDataPacket, FieldPacket } from "mysql2";
import { JWT } from "next-auth/jwt";

// Fetch environment variables with fallbacks for development
const googleClientId = process.env.GOOGLE_CLIENT_ID || 'development_client_id';
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || 'development_client_secret';
const secretKey = process.env.SECRET_KEY || 'development_secret_key_change_in_production';

if (!googleClientId || !googleClientSecret || !secretKey) {
  // Only throw error in production, allow development with fallbacks
  if (process.env.NODE_ENV === 'production') {
    throw new Error("Missing environment variables for Google OAuth or Secret key");
  }
}

// Define the NextAuth options
const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
    error: "/auth/error",   // Custom error page
  },
  callbacks: {
    // SignIn callback to check user in database
    async signIn({ user, account, profile }) {
      try {
        const { email, name } = user;

        if (!name || !email) {
          return false;
        }

        // Fetch user from the database
        const [rows] = await database.execute(
          "SELECT * FROM users WHERE email_id = ?",
          [email]
        ) as [RowDataPacket[], FieldPacket[]];

        const existingUser = rows.length > 0 ? rows[0] : null;

        if (!existingUser) {
          const [firstName = "", lastName = ""] = name.split(" ");
          await database.execute(
            "INSERT INTO users (created_dt, updated_dt, first_name, last_name, email_id) VALUES (now(), now(), ?, ?, ?)",
            [firstName, lastName, email]
          );
        }

        return true;
      } catch (error) {
        return false;
      }
    },

    // JWT callback to attach user data to the token
    async jwt({ token, user }) {
      // Only add user data if it's the first sign-in
      if (user) {
        // Add the user id and email to the token
        token.id = user.id || ""; // Attach user id
        token.email = user.email; // Attach email
      }
      return token;
    },

    // Session callback to attach user data to the session
    async session({ session, token }) {
      // Ensure session.user is defined and attach user data
      if (session.user) {
        // session.user.id = token.id as string; // Attach user ID from token
        session.user.email = token.email as string; // Attach email from token
      }
      return session;
    },

    // Redirect callback
    async redirect({ url, baseUrl }) {
      return baseUrl;
    }
  },
  session: {
    strategy: "jwt", // Use JWT for session handling
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: secretKey!, // Secret for signing JWT
};

// Create the NextAuth handler for API routes
const handler = NextAuth(authOptions);

// Export the handler for GET and POST requests
export { handler as GET, handler as POST };
