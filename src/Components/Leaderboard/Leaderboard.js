import React, { Component } from 'react';
import axios from 'axios';
import './Leaderboard.scss';
import Avatar from '../Avatar/Avatar';

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
        <td className="rank">{index + 1}</td>
        <td className="camper">
          <Avatar username={camper.username} avatarURL={camper.img} />
        </td>
        <td className="recent-points">{camper.recent}</td>
        <td className="alltime-points">{camper.alltime}</td>
      </tr>
    ));
  }

  _generateTableMarkup () {
    return (
      <table>
        <thead>
          <th className="rank">Rank</th>
          <th className="camper">Camper</th>
          <th className="recent-points">Points in past 30 days</th>
          <th className="alltime-points">All time points</th>
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
