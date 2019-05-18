import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { apiKey, messagingSenderId, appId } from "./env.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey,
  authDomain: "chat-app-a490d.firebaseapp.com",
  databaseURL: "https://chat-app-a490d.firebaseio.com",
  projectId: "chat-app-a490d",
  storageBucket: "chat-app-a490d.appspot.com",
  messagingSenderId,
  appId
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function App() {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    async function getChannels() {
      return await db
        .collection("channels")
        .get()
        .then(snapshot => {
          const docs = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
          }));
          setChannels(docs);
        });
    }
    getChannels();
  }, []);

  return (
    <div className="App">
      <div className="Nav">
        <div className="User">
          <img
            className="UserImage"
            alt="whatever"
            src="https://placekitten.com/64/64"
          />
          <div>
            <div>Asmyshlyaev177</div>
            <div>
              <button className="text-button">log out</button>
            </div>
          </div>
        </div>
        <nav className="ChannelNav">
          {channels.map(channel => (
            <a
              key={channel.id}
              href={`/channel/${channel.id}`}
              className="active"
            >
              # {channel.id}
            </a>
          ))}
        </nav>
      </div>
      <div className="Channel">
        <div className="ChannelMain">
          <div className="ChannelInfo">
            <div className="Topic">
              Topic:{" "}
              <input
                className="TopicInput"
                onChange={() => false}
                value="Awesome stuff"
              />
            </div>
            <div className="ChannelName">#general</div>
          </div>
          <div className="Messages">
            <div className="EndOfMessages">That's every message!</div>
            <div>
              <div className="Day">
                <div className="DayLine" />
                <div className="DayText">12/6/2018</div>
                <div className="DayLine" />
              </div>
              <div className="Message with-avatar">
                <div className="Avatar" />
                <div className="Author">
                  <div>
                    <span className="UserName">Ryan Florence </span>
                    <span className="TimeStamp">3:37 PM</span>
                  </div>
                  <div className="MessageContent">Alright, lets do this.</div>
                </div>
              </div>
            </div>
            <div>
              <div className="Message no-avatar">
                <div className="MessageContent">works now?</div>
              </div>
            </div>
          </div>
          <div className="ChatInputBox">
            <input className="ChatInput" placeholder="Message #general" />
          </div>
        </div>
        <div className="Members">
          <div>
            <div className="Member">
              <div className="MemberStatus offline" />
              Ryan Florence
            </div>
            <div className="Member">
              <div className="MemberStatus online" />
              cleverbot
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
