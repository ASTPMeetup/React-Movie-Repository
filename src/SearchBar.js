import React, { Component, PropTypes } from 'react';

class SearchBar extends Component {
  render(){
    return (
      <input
        aria-labelledby="movie_search"
        className='search-bar search_input'
        type="text"
        value={this.props.value}
        onChange={ event => this.props.onChange(event) }
      />
    );
  }
}

SearchBar.PropTypes = {
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default SearchBar;
