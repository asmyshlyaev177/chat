import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { db, firebase } from "./firebase";
import Channel from "./Channel";

function App() {
  const user = useAuth();

  return user ? (
    <div className="App">
      <Nav user={user} />
      <Channel user={user} />
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const firebaseUser = {
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid
        };
        setUser(firebaseUser);
        db.collection("users")
          .doc(user.uid)
          .set(firebaseUser, { merge: true });
      } else {
        setUser(null);
      }
    });
  }, []);

  return user;
}

export default App;
