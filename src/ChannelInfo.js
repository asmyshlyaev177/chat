import React from 'react';

function ChannelInfo({ channelId }) {
  return (
    <div className="ChannelInfo">
      <div className="Topic">
        Topic: <input className="TopicInput" value="Awesome stuff" readOnly/>
      </div>
      <div className="ChannelName">#{channelId}</div>
    </div>
  );
}

export default ChannelInfo;
