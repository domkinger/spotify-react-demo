import React, {Component} from 'react';

class SpotifyForm extends Component {
    constructor(){
      super();
      this.state = {
        searchQuery: ''
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({searchQuery: event.target.value});
    }

    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.searchQuery);
      this.props.generateRecs(this.state.searchQuery);
      event.preventDefault();
    }
  
    render() {
      return (
        <div className="SpotifyForm">
          <form onSubmit={this.handleSubmit}>
            <input value={this.state.searchQuery} onChange={this.handleChange}/>
            <button type='submit'>
              Find Music
            </button>
          </form>
      </div>
      );
    }
  }
  
  export default SpotifyForm;
  