import React, { Component } from 'react';
import './Avatar.scss';

class Avatar extends Component {
  render () {
    return (
      <a className="avatar" target="_blank" rel="noopener noreferrer" href={`https://www.freecodecamp.org/${this.props.username}`}>
        <img className="avatar-img" src={this.props.avatarURL} alt={this.props.username} />
        <span className="username">{this.props.username}</span>
      </a>
    );
  }
}

export default Avatar;
