import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import SpotifyWebApi from 'spotify-web-api-js';
import SpotifyForm from './SpotifyForm.js'
import logo from './logo.png';
import './App.css';

const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      tracks: []
    }

    this.generateRecs = this.generateRecs.bind(this);
    this.clearRecs = this.clearRecs.bind(this);
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

  getArtistId(artistName) {
    return spotifyApi.searchArtists(artistName)
      .then(function (data) {
        return data.artists.items[0];
      });
  }

  generateRecs(searchParams) {
    spotifyApi.getRecommendations(searchParams).then(function (data) {
      this.setState({ tracks: data.tracks }, console.log(this.state.tracks));
    }.bind(this));
  }

  clearRecs() {
    this.setState({
      tracks: []
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {
            !this.state.loggedIn &&
            <Button variant="contained" href='http://localhost:8888'>Login to Spotify</Button>
          }
          {
            this.state.loggedIn &&
            <div className="Form" >
              <SpotifyForm generateRecs={this.generateRecs} getArtistId={this.getArtistId} clearRecs={this.clearRecs}/>
            </div>
          }
        </header>
        <List>
          {this.state.tracks.map(rec => <div>{rec.artists[0].name} - {rec.name}</div>)}
        </List>
      </div>
    );
  }
}

export default App;
