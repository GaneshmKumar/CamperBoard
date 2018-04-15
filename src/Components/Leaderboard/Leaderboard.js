import React, { Component } from 'react';
import axios from 'axios';
import './Leaderboard.scss';
import Avatar from '../Avatar/Avatar';

const urls = {
  recent: 'https://fcctop100.herokuapp.com/api/fccusers/top/recent',
  alltime: 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime'
};

class Leaderboard extends Component {
  constructor (props) {
    super(props);

    this.state = {
      campers: {
        recent: [],
        alltime: []
      },
      activeColumn: 'recent'
    };
  }

  componentDidMount () {
    axios.all([
      axios.get(urls.recent),
      axios.get(urls.alltime)
    ])
      .then(axios.spread((recentResponse, alltimeResponse) => {
        this.setState({
          campers: {
            recent: recentResponse.data,
            alltime: alltimeResponse.data
          }
        });
      }))
      .catch((error) => {
        console.error(error);
      });
  }

  _updateActiveLeaderboard (type) {
    this.setState({
      activeColumn: type
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

  _generateTableMarkup (campers) {
    return (
      <table>
        <thead>
          <th className="rank">Rank</th>
          <th className="camper">Camper</th>
          <th className={`${this.state.activeColumn === 'recent' ? 'active-column' : ''} recent-points`} onClick={() => this._updateActiveLeaderboard('recent')}>Recent</th>
          <th className={`${this.state.activeColumn === 'alltime' ? 'active-column' : ''} alltime-points`} onClick={() => this._updateActiveLeaderboard('alltime')}>All Time</th>
        </thead>
        <tbody>
          {this._generateTableRowMarkup(campers)}
        </tbody>
      </table>
    );
  }

  render () {
    return (
      <div className="leaderboard">
        {this._generateTableMarkup(this.state.campers[this.state.activeColumn])}
      </div>
    );
  }
}

export default Leaderboard;
