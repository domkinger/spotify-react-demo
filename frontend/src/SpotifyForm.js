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
      artistNames: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ searchQuery: event.target.value });
  }

  handleSubmit(event) {
    this.props.getArtistId(this.state.searchQuery).then(id => {
      if (this.state.searchParams.seed_artists.length < 5) {
        this.setState({
          searchParams: update(this.state.searchParams, { seed_artists: { $push: [id] } })
        });
        this.setState({
          artistNames: update(this.state.artistNames, { $push: [this.state.searchQuery] })
        });
      }
      this.setState({searchQuery: ''});
      this.props.generateRecs(this.state.searchParams);
    });
    event.preventDefault();
  }

  render() {

    return (
      <div className="SpotifyForm">
        <form onSubmit={this.handleSubmit}>
          <TextField label="Enter an artist name" variant="outlined" value={this.state.searchQuery} onChange={this.handleChange} />
        </form>
        <ArgumentList artists={this.state.artistNames}/>
      </div>
    );
  }
}

export default SpotifyForm;
