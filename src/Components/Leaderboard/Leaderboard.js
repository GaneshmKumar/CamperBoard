import React, { Component } from 'react';
import axios from 'axios';
import './Leaderboard.scss';

const recentURL = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';

class Leaderboard extends Component {
  constructor (props) {
    super(props);

    this.state = {
      recentCampers: []
    };
  }

  componentDidMount () {
    axios.get(recentURL)
      .then((response) => {
        this.setState({
          recentCampers: response.data
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  _generateTableRowMarkup (campers) {
    return campers.map((camper, index) => (
      <tr>
        <td>{index + 1}</td>
        <td>{camper.username}</td>
        <td>{camper.recent}</td>
        <td>{camper.alltime}</td>
      </tr>
    ));
  }

  _generateTableMarkup () {
    return (
      <table>
        <thead>
          <th>#</th>
          <th>Name</th>
          <th>Points in past 30 days</th>
          <th>All time points</th>
        </thead>
        <tbody>
          {this._generateTableRowMarkup(this.state.recentCampers)}
        </tbody>
      </table>
    );
  }

  render () {
    return (
      <div className="leaderboard">
        {this._generateTableMarkup()}
      </div>
    );
  }
}

export default Leaderboard;
