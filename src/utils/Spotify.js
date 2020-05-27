const clientID = "664c3d6b58bc4428b06726d8c1645e73";
// Set this to localhost if in dev mode, or to your domain when building
const redirectURI = "http://localhost:3000/";

let userAccessToken = undefined;
let userAccessExpiration = undefined;

const Spotify = {
  getAccessToken() {
    // Return the access token if it exists
    if (userAccessToken) {
      return userAccessToken;
    }
    // Spotify returns access information via the authorized url
    // Grab the access token and expiration from the url, and set it to time out at given time
    const accessToken = window.location.href.match(/access_token=([^&]*)/);
    const tokenExpiration = window.location.href.match(/expires_in=([^&]*)/);
    // Set the access token and expiration if the URI contains it
    if (accessToken && tokenExpiration) {
      userAccessToken = accessToken[1];
      userAccessExpiration = tokenExpiration[1];
      window.setTimeout(
        () => (userAccessToken = ""),
        userAccessExpiration * 1000
      );
      window.history.pushState("Access Token", null, "/");
    } else {
      // Otherwise, redirect to authorization site to restart process
      window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    }
  },
  search(searchTerm) {
    return fetch(
      `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      {
        headers: { Authorization: `Bearer ${this.getAccessToken()}` },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (jsonResponse.tracks) {
          // Map each track and its information to an array
          return jsonResponse.tracks.items.map((track) => {
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri,
            };
          });
        }
        // Return empty array if there are no tracks
        return [];
      })
      .catch((error) => {
        console.log(error);
      });
  },
  savePlaylist(playlistName, trackURIs) {
    // Only save if both parameters aren't empty
    if (playlistName !== "" && trackURIs) {
      const accessToken = userAccessToken;
      const headers = { Authorization: `Bearer ${accessToken}` };
      let userID;
      let playlistID;
      // Send a request to fetch the User's ID
      fetch(`https://api.spotify.com/v1/me`, {
        headers: headers,
      })
        .then((response) => {
          return response.json();
        })
        .then((jsonResponse) => {
          userID = jsonResponse.id;
        })
        .then(() => {
          // Send a request to create a new playlist with the given name and fetch its ID
          fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ name: playlistName }),
          })
            .then((response) => {
              return response.json();
            })
            .then((jsonResponse) => {
              playlistID = jsonResponse.id;
            })
            .then(() => {
              // Send a request to save the tracks to the newly created playlist
              fetch(
                `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
                {
                  method: "POST",
                  headers: headers,
                  body: JSON.stringify({ uris: trackURIs }),
                }
              );
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
};

export default Spotify;
