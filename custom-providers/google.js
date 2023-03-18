import { OAuth2Client } from "google-auth-library";

const googleProvider = (options) => {
  return {
    id: "google",
    name: "Google",
    type: "oauth",
    version: "2.0",
    scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
    params: { grant_type: "authorization_code" },
    accessTokenUrl: "https://accounts.google.com/o/oauth2/token",
    authorizationUrl: "https://accounts.google.com/o/oauth2/auth?response_type=code",
    profileUrl: "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
    clientId: options.clientId,
      clientSecret: options.clientSecret,
    issuer: "https://accounts.google.com",
    async getProfile(profile) {
      return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      };
    },
    async getAccessToken({ code, redirect_uri }) {
      const client = new OAuth2Client(options.clientId, options.clientSecret, redirect_uri);
      const { tokens } = await client.getToken(code);
      return tokens;
    },
  };
};

export default googleProvider;
