import React, { Component } from 'react';
import './SearchBar.scss';

class SearchBar extends Component {
  render () {
    return (
      <input type="search" placeholder="Search Campers" className="search-bar" onChange={this.props._handleChange} />
    );
  }
}

export default SearchBar;
