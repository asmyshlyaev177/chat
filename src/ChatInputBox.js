import React from 'react';
import { db } from './firebase';

function ChatInputBox({ user }) {
  return (
    <form onSubmit={event => {
      event.preventDefault();
      const value = event.target.elements[0].value;
      if (!value.length) return false;
      db
        .collection('channels/general/messages')
        .add({
          user: db.collection('users').doc(user.uid),
          text: value,
          createdAt: new Date()
        })
        event.target.reset();
    }} className="ChatInputBox">
      <input className="ChatInput" placeholder="Message #general" />
    </form>
  );
}

export default ChatInputBox;
