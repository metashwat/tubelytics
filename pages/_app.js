import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const { session } = pageProps;
  if (session && session.token) {
    session.accessToken = session.token.accessToken;
  }

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
