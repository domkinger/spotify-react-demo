import React, {Component} from 'react';

class SpotifyForm extends Component {
    constructor(){
      super();
    }
  
    render() {
      return (
        <div className="SpotifyForm">
          <form onSubmit={ this.generateRecommendations }>
            <input value={ this.props.searchQuery } onChange={ this.props.onChange(this.props.searchQuery) }/>
            <button type='submit'>
              Get Rec
            </button>
          </form>
      </div>
      );
    }
  }
  
  export default SpotifyForm;
  