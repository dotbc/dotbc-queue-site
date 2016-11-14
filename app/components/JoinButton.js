import React, { Component, PropTypes } from 'react'

export default class JoinButton extends Component {

  render() {

    return (
      <div id="joinButton">
        <a href="/join">
          <button className="button">Join the Partnership Queue</button>
        </a>
      </div>
    );

  }

}