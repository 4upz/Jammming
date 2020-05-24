const clientID = "664c3d6b58bc4428b06726d8c1645e73";
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
    return userAccessToken;
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
};

export default Spotify;
