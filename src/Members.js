import React from "react";
import useCollection from "./useCollection";

function Members({ channelId }) {
  const members = useCollection("users", "displayName", [
    `channels.${channelId}`,
    "==",
    true
  ]);

  return (
    <div className="Members">
      <div>
        {members && members.length && members.map(member => (
          <div key={'member ' + member.id} className="Member">
            <div className={`MemberStatus ${member.status ? member.status.state : 'offline'}`} />
            {member.displayName}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Members;
