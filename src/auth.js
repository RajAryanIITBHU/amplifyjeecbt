import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { supabaseAdmin } from "./superbase/superbaseConfig";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      id: "credentials",
      name: "Roll No and Password",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Email",
        },
        phone: {
          label: "Phone",
          type: "text",
          placeholder: "Phone",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.phone) {
          throw new Error("EMAIL_PHONE_REQUIRED");
        }

        try {
          const { data: users, error: userError } = await supabaseAdmin
            .from("users")
            .select("*")
            .eq("email", credentials.email)
            .limit(1)
            .single();

          

          if (userError || !users) {
            throw new Error("USER_NOT_FOUND");
          }

          const { data: batchesData, error: enrollmentError } = await supabaseAdmin
            .from("enrollments")
            .select("batch_id, batches (*)") // fetch batch info via foreign key
            .eq("user_id", users.id);

          if (enrollmentError || !batchesData) {
            throw new Error("BATCHES_NOT_FOUND");
          }

          let b = {};
          for (const enrollment of batchesData) {
            if (enrollment.batches?.id && enrollment.batches?.name) {
              b[enrollment.batches.id] = enrollment.batches.name;
            }
          }

          // const batches = batchesData.map((enrollment) => {enrollment.batches.name});

          const isValidPassword = parseInt(credentials.phone) === users.phone;
          if (!isValidPassword) {
            throw new Error("PHONE_MISMATCH");
          }

          return {
            id: users.id,
            email: users.email,
            phone: users.phone,
            name: users.name,
            dob: users.dob,
            batches: b,
            role: users.role,
            rollNo: users.rollNo,
          };
        } catch (error) {
          console.error("Auth error:", error.message);
          throw new Error(error.message || "AUTH_FAILED");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.phone = user.phone;
        token.name = user.name;
        token.dob = user.dob;
        token.batches = user.batches;
        token.role = user.role;
        token.rollNo = user.rollNo;
        
      }

      // if (trigger === "update" && session?.tests) {
      //   token.tests = session.tests;
      // }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.phone = token.phone;
        session.user.name = token.name;
        session.user.dob = token.dob;
        session.user.batches = token.batches;
        session.user.role = token.role;
        session.user.rollNo = token.rollNo;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
    error: "/",
  },
  secret: process.env.AUTH_SECRET,
});
