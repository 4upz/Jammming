import React from "react";
import "./App.css";

// Components
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

// Spotify Util
import Spotify from "../../utils/Spotify";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "",
      playlistTracks: [],
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
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

  /**
   * Removes a track from the current playlist
   * @param {object} track the track to be removed
   */
  removeTrack(track) {
    // Filter the current playlist by the track to be removed
    const playlist = this.state.playlistTracks.filter((savedTrack) => {
      return savedTrack.id !== track.id;
    });
    this.setState({ playlistTracks: playlist });
  }

  /**
   * Updates the current state of the playlist name
   * @param {string} name the new name for the playlist
   */
  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  /**
   * Saves the currently state of the playlist to the user's Spotify account
   */
  savePlaylist() {
    // Saves an array of track uris from the current playlist
    const trackURIs = this.state.playlistTracks.map((track) => {
      return track.uri;
    });
    console.log(`Saved Playlist!`);
    console.log(trackURIs);
  }

  /**
   * Searches through Spotify via API with the provided search term
   * @param {string} searchTerm the term to search
   */
  search(searchTerm) {
    Spotify.search(searchTerm).then((searchResults) =>
      this.setState({ searchResults: searchResults })
    );
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}
