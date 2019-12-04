import React, { Component } from 'react';
import update from 'immutability-helper';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
    this.props.search(event.target.value);
  }

  handleSubmit(event) {
    this.props.getArtistId(this.state.searchQuery).then(artist => {

      if (artist == null) {
        this.setState({ searchQuery: '' });
        return;
      }

      if (this.state.artists.length < 5 && !this.state.searchParams.seed_artists.includes(artist.id)) {
        this.setState({
          searchParams: update(this.state.searchParams, { seed_artists: { $push: [artist.id] } })
        });
        this.setState({
          artists: update(this.state.artists, { $push: [artist] })
        });
      }
      this.setState({ searchQuery: '' });
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
    }, function () {
      if (this.state.artists.length > 0) {
        this.props.generateRecs(this.state.searchParams);
      }
      else {
        this.props.clearRecs();
      }
    })
  }

  render() {

    return (
      <div className="SpotifyForm">
        <form onSubmit={this.handleSubmit}>
          <Autocomplete
            id="combo-box-demo"
            options={this.props.searchResults}
            getOptionLabel={option => option.name}
            style={{ width: 300 }}
            renderInput={params => (
              <TextField {...params} label="Search" variant="outlined" fullWidth value={this.state.searchQuery} onChange={this.handleChange} />
            )}
          />
        </form>
        <ArgumentList artists={this.state.artists} removeParamById={this.removeParamById} />
      </div>
    );
  }
}

export default SpotifyForm;
