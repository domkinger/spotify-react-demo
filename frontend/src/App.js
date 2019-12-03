import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SpotifyWebApi from 'spotify-web-api-js';
import SpotifyForm from './SpotifyForm.js'
import TrackCard from './TrackCard.js';
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
      this.setState({ tracks: data.tracks });
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
        <div className='root'>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={6}>
              <Paper className='paper'>
                <header className="App-header">
                  <img src={logo} className="App-logo" alt="logo" />
                  {
                    !this.state.loggedIn &&
                    <Button variant="contained" href='http://localhost:8888'>Login to Spotify</Button>
                  }
                  {
                    this.state.loggedIn &&
                    <div className="Form" >
                      <SpotifyForm generateRecs={this.generateRecs} getArtistId={this.getArtistId} clearRecs={this.clearRecs} />
                    </div>
                  }
                </header>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className='paper'>
                <List>
                  {this.state.tracks.map(track => <TrackCard track={track}/>)}
                </List>
                
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default App;
