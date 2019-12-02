import React, {Component} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import SpotifyForm from './SpotifyForm.js'
import logo from './logo.png';
import './App.css';

const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
    }

    this.generateRecs = this.generateRecs.bind(this);
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getArtistId(searchParam) {
    spotifyApi.searchArtists(searchParam)
    .then(function(data) {
      return data.artists.items[0].id;
    })
  }

  generateRecs() {
    spotifyApi.getRecommendations({"seed_artists": ["4NHQUGzhtTLFvgF5SZesLK"]}).then(function(data) {
      console.log(data);
    })
  }

  render() {
    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a href='http://localhost:8888' > Login to Spotify </a>

        { this.state.loggedIn &&
        <SpotifyForm generateRecs={this.generateRecs}/>
      }
      </header>
    </div>
    );
  }
}

export default App;
