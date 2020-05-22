import React from "react";
import "./Track.css";

const Track = ({ track, isRemoval }) => {
  const renderAction = (
    <button className="Track-action">{isRemoval ? "+" : "-"}</button>
  );

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.name}</h3>
        <p>{`${track.artist} | ${track.album}`}</p>
      </div>
      {renderAction}
    </div>
  );
};

export default Track;
