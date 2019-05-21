import React, { useState, useEffect } from "react";
import useCollection from "./useCollection";
import { db } from "./firebase";
import parseDate from "./parseDate";

function Messages() {
  const messages = useCollection("channels/general/messages", "createdAt");

  // if (messages[0]) {
  //   console.log(db.collection(messages[0].user.id).get());
  // }

  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every message!</div>

      {messages.map((message, index) => {
        const previous = messages[index - 1];
        const showAvatar = !previous || message.user.id !== previous.user.id;

        return showAvatar ? (
          <FirstMessage key={message.id} message={message} />
        ) : (
          <div key={message.id}>
            <div className="Message no-avatar">
              <div className="MessageContent">{message.text}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function useDoc(path) {
  const [doc, setDoc] = useState();
  useEffect(() => {
    db.doc(path).onSnapshot(doc => {
      setDoc({
        ...doc.data(),
        id: doc.id
      });
    });
  }, [path]);

  return doc;
}

function FirstMessage({ message, showDay }) {
  const author = useDoc(message.user.path);
  const date = parseDate(message.createdAt);

  return (
    <div key={message.id}>
      <div className="Day">
        <div className="DayLine" />
        <div className="DayText">12/6/2018</div>
        <div className="DayLine" />
      </div>
      <div className="Message with-avatar">
        <div
          className="Avatar"
          style={{
            backgroundImage: author ? `url("${author.photoURL}")` : ""
          }}
        />
        <div className="Author">
          <div>
            <span className="UserName">
              {author ? author.displayName : ""}
            </span>
            <span className="TimeStamp">{date}</span>
          </div>
          <div className="MessageContent">{message.text}</div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
