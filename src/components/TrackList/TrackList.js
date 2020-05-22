import React from "react";
import "./TrackList.css";

// Components
import Track from "../Track/Track";

const TrackList = ({ tracks }) => {
  return (
    <div className="TrackList">
      {tracks.map((track) => {
        // Create a list of Track components
        return <Track track={track} key={track.id} />;
      })}
    </div>
  );
};

export default TrackList;
