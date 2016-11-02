import React, { Component, PropTypes } from 'react'

export default class Header extends Component {
  
  _renderLoggedIn() {
    return (
      <ul id="nav" className="unstyled">
				<li><a href="/logout">Sign Out</a></li>
			</ul>
    );
  }
  
  _renderLoggedOut() {
    return (
      <ul id="nav" className="unstyled">
        <li><a href={"/join"}>Join</a></li>
        <li><a href={"/login"} onClick={this.props.onJoinClicked} >Sign In</a></li>
      </ul>
    );
  }

  render() {
    
    const loggedIn = this.props.loggedIn; 

    return (
      <header>
        <img src={'images/gradientBG.png'} className="BGimage" />
        <div className="container">
          <span id="logo">
            <img src={'images/dotBC-logo.svg'} />
            <span className="name">dotBC Music</span>
          </span>
          {(loggedIn) ? this._renderLoggedIn() : this._renderLoggedOut() }
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