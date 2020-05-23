const clientID = "664c3d6b58bc4428b06726d8c1645e73";
const redirectURI = "http://localhost:3000/";

let userAccessToken;

const Spotify = {
  getAccessToken() {
    if (userAccessToken) {
      return userAccessToken;
    } else {
      // Spotify returns access information via the authorized url
      // Grab the access token and expiration from the url, and set it to time out at given timep
      let accessToken = window.location.href.match(/access_token=([^&]*)/);
      let tokenExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
      // Set the access token and expiration if the URI contains it
      if (accessToken && tokenExpiresIn) {
        userAccessToken = accessToken;
        window.setTimeout(() => (userAccessToken = ""), tokenExpiresIn * 1000);
        window.history.pushState("Access Token", null, "/");
      } else {
        // Otherwise, redirect to authorization site to restart process
        window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      }
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
        jsonResponse.map((track) => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artist,
            album: track.album,
            uri: track.uri,
          };
        });
      });
  },
};

export default Spotify;
