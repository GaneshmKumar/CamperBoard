import React, { Component } from 'react';
import './Container.scss';
import Leaderboard from '../Leaderboard/Leaderboard';
import SearchBar from '../SearchBar/SearchBar';

class Container extends Component {
  constructor (props) {
    super(props);

    this.state = {
      searchText: ''
    };
  }

  _handleChange (e) {
    const searchText = e.target.value;

    this.setState({
      searchText
    });
  }

  render () {
    return (
      <div className="container">
        <h1 className="app-title">CamperBoard</h1>
        <SearchBar _handleChange={e => this._handleChange(e)} />
        <Leaderboard searchText={this.state.searchText} />
      </div>
    );
  }
}

export default Container;
