import React, {Component} from 'react';
import update from 'immutability-helper';
import TextField from '@material-ui/core/TextField';

class SpotifyForm extends Component {
    constructor(){
      super();
      this.state = {
        searchQuery: '',
        searchParams: {seed_artists: []},
        listItems: null
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({searchQuery: event.target.value});
    }

    handleSubmit(event) {
      this.props.getArtistId(this.state.searchQuery).then(id => {
        console.log(id);
        this.setState({
          searchParams: update(this.state.searchParams, {seed_artists: {$push: [id]}})
        });
        console.log(this.state.searchParams);
        this.props.generateRecs(this.state.searchParams);
      });
      event.preventDefault();
    }
  
    render() {

      return (
        <div className="SpotifyForm">
          <form onSubmit={this.handleSubmit}>
            <TextField label="Enter an artist name" variant="outlined" value={this.state.searchQuery} onChange={this.handleChange}/>
          </form>
        </div>
      );
    }
  }
  
  export default SpotifyForm;
  