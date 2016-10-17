import React, { Component, PropTypes } from 'react'

export default class Header extends Component {

  render() {

    return (
      <header>
        <img src={'images/gradientBG.png'} className="BGimage" />
        <div className="container">
          <span id="logo">
            <img src={'images/dotBC-logo.svg'} />
            <span className="name">dotBC Music</span>
          </span>
          <ul id="nav" className="unstyled">
            <li><a href={"/join"}>Join</a></li>
            <li><a href={"/login"}>Sign In</a></li>
          </ul>
          <p className="intro">
          <span>We are looking for volunteers to share their data with us to enhance the </span> 
          <a href={"http://dotblockchainmusic.com"}>dotBC Music</a> 
          <span> project.</span>
          </p>
        </div>
      </header>
    );

  }

}