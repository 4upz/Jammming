import React from "react";
import "./TrackList.css";

// Components
import Track from "../Track/Track";

const TrackList = ({ tracks, onAdd, onRemove, isRemoval }) => {
  return (
    <div className="TrackList">
      {tracks.map((track) => {
        // Create a list of Track components
        return (
          <Track
            track={track}
            key={track.id}
            onAdd={onAdd}
            onRemove={onRemove}
            isRemoval={isRemoval}
          />
        );
      })}
    </div>
  );
};

export default TrackList;
