import React from "react";
import "./App.css";

// Components
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: "Sunshine",
          artist: "4upz",
          album: "Color Palette",
          id: "1",
        },
        {
          name: "Shenanigans",
          artist: "4upz",
          album: "Color Palette",
          id: "2",
        },
        {
          name: "Time Machine",
          artist: "4upz",
          album: "Color Palette",
          id: "3",
        },
      ],
      playlistName: "The Fourth",
      playlistTracks: [
        {
          name: "WYM",
          artist: "4upz",
          album: "Son of October",
          id: "4",
        },
      ],
    };
    this.addTrack = this.addTrack.bind(this);
  }

  /**
   * Adds a new track to the current playlist
   * @param {object} track the track to be added
   */
  addTrack(track) {
    const playlist = this.state.playlistTracks;
    // If the song id doesn't exist in the current playlist...
    if (!playlist.find((savedTrack) => savedTrack.id === track.id)) {
      playlist.push(track);
      this.setState({ playlistTracks: playlist });
    }
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
            />
          </div>
        </div>
      </div>
    );
  }
}
