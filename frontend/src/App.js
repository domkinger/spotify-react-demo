import React, {Component} from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import logo from './logo.svg';
import './App.css';

const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    this.generateRecommendations = this.generateRecommendations.bind(this);
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      searchQuery: ''
    }
    console.log(this.state.loggedIn);
    console.log(token);
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

  generateRecommendations(){
    spotifyApi.searchArtists(this.state.searchQuery)
    .then(function(data) {
      return data.artists.items[0].id;
    }).then(function(id) {
      return spotifyApi.getArtistAlbums(id);
    }).then(function (data) {
      console.log(data);
    });
  }

  render() {
    return (
      <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a href='http://localhost:8888' > Find an artist </a>

        { this.state.loggedIn &&
        <form onSubmit={ this.generateRecommendations }>
          <input value={ this.state.searchQuery } onChange={ e => this.setState({searchQuery: e.target.value}) }/>
          <button type='submit'>
            Get Rec
          </button>
        </form>
      }
      </header>
    </div>
    );
  }
}

export default App;
