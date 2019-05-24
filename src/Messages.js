import React, { useState, useEffect } from "react";
import useCollection from "./useCollection";
import { db } from "./firebase";
import parseDate from "./parseDate";

const getOnlyDate = date => date.toISOString().slice(0, 10);
const datesEqual = (date1, date2) => getOnlyDate(date1) === getOnlyDate(date2);

function Messages({ channelId }) {
  const messages = useCollection(`channels/${channelId}/messages`, "createdAt");

  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every message!</div>

      {messages.map((message, index) => {
        const previous = messages[index - 1];
        const showDateLine =
        index === 0 || !datesEqual(previous.createdAt, message.createdAt);
        const showAvatar = !previous || message.user.id !== previous.user.id;

        const result = [
          showDateLine ? (
            <DateLine
              key={"date " + message.id}
              date={parseDate(message.createdAt).date}
            />
          ) : null,
          showAvatar || showDateLine ? (
            <FirstMessage key={message.id} message={message} />
          ) : (
            <MessageNoAvatar key={message.id} message={message} />
          )
        ];

        return result;
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

function DateLine({ date }) {
  return (
    <div className="Day">
      <div className="DayLine" />
      <div className="DayText">{date}</div>
      <div className="DayLine" />
    </div>
  );
}

const FirstMessage = ({ message }) => {
  const author = useDoc(message.user.path);
  const dateRaw = message.createdAt;
  const { time } = parseDate(dateRaw);
  const { photoURL = "", displayName = "" } = author || {};

  return author ? (
    <div key={message.id}>
      <div className="Message with-avatar">
        <div className="Avatar">
          <img
            alt={`${author.displayName} avatar`}
            src={photoURL ? photoURL : ""}
            style={{ width: "100%", fontSize: 0 }}
          />
        </div>
        <div className="Author">
          <div>
            <span className="UserName">{displayName}</span>
            <span className="TimeStamp">{time}</span>
          </div>
          <div className="MessageContent">{message.text}</div>
        </div>
      </div>
    </div>
  ) : null;
};

const MessageNoAvatar = ({ message }) => (
  <div key={message.id}>
    <div className="Message no-avatar">
      <div className="MessageContent">{message.text}</div>
    </div>
  </div>
);

export default Messages;
