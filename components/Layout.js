import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

const Layout = ({ children }) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  return (
    <div>
      <header>
        {!loading && (
          <>
            {!session ? (
              <button onClick={() => signIn("google")}>
                Sign in with Google
              </button>
            ) : (
              <>
                <p>Welcome, {session?.user?.name}!</p>
                <button onClick={() => signOut()}>Sign out</button>
              </>
            )}
          </>
        )}
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
