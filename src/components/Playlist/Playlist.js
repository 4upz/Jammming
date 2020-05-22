import React from "react";
import "./Playlist.css";

// Components
import TrackList from "../TrackList/TrackList";

export default class Playlist extends React.Component {
  render() {
    const playlistName = this.props.playlistName;
    const playlistTracks = this.props.playlistTracks;

    return (
      <div className="Playlist">
        <input defaultValue="New Playlist" value={playlistName} />
        <TrackList tracks={playlistTracks} />
        <button className="Playlist-save">SAVE TO SPOTIFY</button>
      </div>
    );
  }
}
