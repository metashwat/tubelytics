import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import VideoList from "./VideoList";

const Layout = ({ children }) => {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const [showVideoList, setShowVideoList] = useState(false);

  // components/Layout.js
// ...

const handleClick = async () => {
  try {
    const response = await fetch('/api/fetchAndSaveVideos', {
        method: 'GET'
    });
    const data = await response.json();
    console.log('Fetched and saved videos:', data);
  } catch (error) {
    console.error('Failed to fetch and save videos', error);
  }
};


// ...



  return (
    <div>
      {!session && !loading && (
        <button onClick={() => signIn("google")}>Sign in with Google</button>
      )}
      {session && (
        <>
          <p>
            Welcome, {session.session.user.name}!{" "}
            <button onClick={() => signOut()}>Sign out</button>
          </p>
          <button onClick={handleClick}>Fetch Videos</button>
          {showVideoList && <VideoList />}
        </>
      )}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
