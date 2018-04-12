import React, { Component } from 'react';
import './Container.scss';
import Leaderboard from '../Leaderboard/Leaderboard';

class Container extends Component {
  render () {
    return (
      <div className="container">
        <Leaderboard />
      </div>
    );
  }
}

export default Container;
