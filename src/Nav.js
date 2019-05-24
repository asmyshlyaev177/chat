import React from "react";
import { Link } from "@reach/router";
import useCollection from "./useCollection";
import { firebase } from './firebase';

function Nav({ user }) {
  const channels = useCollection("channels");
  const { displayName, photoURL } = user;

  return (
    <div className="Nav">
      <div className="User">
        <img className="UserImage" alt="whatever" src={photoURL} />
        <div>
          <div>{displayName}</div>
          <div>
            <button onClick={() => firebase.auth().signOut()} 
            className="text-button">log out</button>
          </div>
        </div>
      </div>
      <nav className="ChannelNav">
        {channels.map(channel => (
          <Link key={channel.id} to={`/channel/${channel.id}`}>
            # {channel.id}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Nav;
