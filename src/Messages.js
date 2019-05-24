import React from "react";
import useCollection from "./useCollection";
import parseDate from "./parseDate";
import useDocWithCache from "./useDocWithCache";

function Messages({ channelId }) {
  const messages = useCollection(`channels/${channelId}/messages`, "createdAt");

  return (
    <div className="Messages">
      <div className="EndOfMessages">That's every message!</div>

      {messages.map((message, index) => {
        const previous = messages[index - 1];
        const showDateLine =
          !previous ||
          olderThen(60 * 60 * 24)(previous.createdAt, message.createdAt);
        const showAvatar = needShowAvatar(previous, message);

        const result = [
          showDateLine ? (
            <DateLine
              key={"date " + message.id}
              date={parseDate(message.createdAt).date}
            />
          ) : null,
          showAvatar ? (
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
  const author = useDocWithCache(message.user.path);
  const dateRaw = message.createdAt;
  const { time } = parseDate(dateRaw);

  return author ? (
    <div key={message.id}>
      <div className="Message with-avatar">
        <div className="Avatar">
          <img
            alt={`${author.displayName} avatar`}
            src={author && author.photoURL ? author.photoURL : ""}
            style={{ width: "100%", fontSize: 0 }}
          />
        </div>
        <div className="Author">
          <div>
            <span className="UserName">{author && author.displayName}</span>
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

const olderThen = (time = 60 * 5) => (prevDate, date) =>
  (date.getTime() - prevDate.getTime()) / 1000 > time;

const needShowAvatar = (prev, message) => {
  const isFirst = !prev;
  if (isFirst) {
    return true;
  }

  const diffUser = message.user.id !== prev.user.id;
  if (diffUser) {
    return true;
  }

  const hasBeenAWhile = olderThen(60 * 10)(prev.createdAt, message.createdAt);
  if (hasBeenAWhile) {
    return true;
  }
};

export default Messages;
