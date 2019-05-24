import React, { useState, useEffect } from "react";
import { Router, Redirect } from '@reach/router';
import Nav from "./Nav";
import { db, firebase } from "./firebase";
import Channel from "./Channel";

function App() {
  const user = useAuth();

  return user ? (
    <div className="App">
      <Nav user={user} />
      <Router>
        <Channel path="channel/:channelId" user={user} />
        <Redirect from="/" to="channel/general" noThrow />
      </Router>
    </div>
  ) : (
    <Login />
  );
}

function Login() {
  const [authError, setAuthError] = useState(null);

  const handleSignin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (err) {
      setAuthError(err);
    }
  };

  return (
    <div className="Login">
      <h1>Chat!</h1>
      <button onClick={handleSignin}>Sign in with Google account</button>
      {authError && (
        <div>
          <p>Sorry, error poped up!</p>
          <p>{authError.message}</p>
        </div>
      )}
    </div>
  );
}

function useAuth() {
  const [user, setUser] = useState();

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(userRes => {
      if (userRes) {
        const firebaseUser = {
          displayName: userRes.displayName,
          photoURL: userRes.photoURL,
          uid: userRes.uid
        };
        db.collection("users")
          .doc(userRes.uid)
          .set(firebaseUser, { merge: true });
        setUser(firebaseUser);
      }
    });
  }, []);

  return user;
}

export default App;
