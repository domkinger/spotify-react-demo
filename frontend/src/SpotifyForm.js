import React, { Component } from 'react';
import update from 'immutability-helper';
import TextField from '@material-ui/core/TextField';
import ArgumentList from './ArgumentList.js'

class SpotifyForm extends Component {
  constructor() {
    super();
    this.state = {
      searchQuery: '',
      searchParams: { seed_artists: [] },
      artists: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeParamById = this.removeParamById.bind(this);
  }

  handleChange(event) {
    this.setState({ searchQuery: event.target.value });
  }

  handleSubmit(event) {
    this.props.getArtistId(this.state.searchQuery).then(artist => {
      console.log(artist);
      if (this.state.searchParams.seed_artists.length < 5) {
        this.setState({
          searchParams: update(this.state.searchParams, { seed_artists: { $push: [artist.id] } })
        });
        this.setState({
          artists: update(this.state.artists, { $push: [artist] })
        });
      }
      this.setState({searchQuery: ''});
      this.props.generateRecs(this.state.searchParams);
    });
    event.preventDefault();
  }

  removeParamById(artist) {
    const index = this.state.artists.indexOf(artist);
    this.setState({
      artists: update(this.state.artists, { $splice: [[index, 1]] })
    })
    this.setState({
      searchParams: update(this.state.searchParams, { seed_artists: { $splice: [[index, 1]] } })
    }, function() {
      if(this.state.artists.length > 0) {
        this.props.generateRecs(this.state.searchParams);
      }
    })
  }

  render() {

    return (
      <div className="SpotifyForm">
        <form onSubmit={this.handleSubmit}>
          <TextField label="Enter an artist name" variant="outlined" value={this.state.searchQuery} onChange={this.handleChange} />
        </form>
        <ArgumentList artists={this.state.artists} removeParamById={this.removeParamById}/>
      </div>
    );
  }
}

export default SpotifyForm;
