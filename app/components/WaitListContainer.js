import React, { Component, PropTypes } from 'react'

export default class WaitListContainer extends Component {

  render() {

    return (
      <main>
        <div className="container">
          <div className="queueNav">
            <span className="active">Agencies and Organizations on the Waitlist</span>
            <span>Full List of Current Partners</span>
          </div>

          <ul id="queue" className="unstyled">
            <li>
              <span className="org">Spotify</span>
              <span className="name">Patricia Jensen</span>
              <span className="title">Vice Technology Officer</span>
            </li>
            <li>
              <span className="org">Spotify</span>
              <span className="name">Patricia Jensen</span>
              <span className="title">Vice Technology Officer</span>
            </li>
            <li>
              <span className="org">Spotify</span>
              <span className="name">Patricia Jensen</span>
              <span className="title">Vice Technology Officer</span>
            </li>
            <li>
              <span className="org">Spotify</span>
              <span className="name">Patricia Jensen</span>
              <span className="title">Vice Technology Officer</span>
            </li>
            <li>
              <span className="org">Spotify</span>
              <span className="name">Patricia Jensen</span>
              <span className="title">Vice Technology Officer</span>
            </li>
            <li>
              <span className="org">Spotify</span>
              <span className="name">Patricia Jensen</span>
              <span className="title">Vice Technology Officer</span>
            </li>
            <li>
              <span className="org">Spotify</span>
              <span className="name">Patricia Jensen</span>
              <span className="title">Vice Technology Officer</span>
            </li>
          </ul>

        </div>
      </main>
    );

  }

}