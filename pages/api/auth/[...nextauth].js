import NextAuth from "next-auth";
// import googleProvider from "@/custom-providers/google.js";
import GoogleProvider from "next-auth/providers/google";
import { GoogleAuth } from "google-auth-library";

const googleAuthClient = new GoogleAuth({
  scopes: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/youtube.readonly",
  ],
});

export default NextAuth({
  // Add a secret string here
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    authorizationUrl: "https://accounts.google.com/o/oauth2/auth?response_type=code&access_type=offline&prompt=consent",
    scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube.readonly",
  }),
],

  callbacks: {
  async session(session, user) {
    if (user) {
      session.user.id = user.id;
    }
    return session;
  },
},

});

