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
            <a href="/" className="name">
              <img src={'images/dotBC-logo.svg'} />
              <span className="name">The dotBlockchain Music Project</span>
            </a>
          </span>
          {(loggedIn) ? this._renderLoggedIn() : this._renderLoggedOut() }
          <p className="intro">
            <span>
              We are now accepting data submissions from all participants in the music industry.
              Onboarding will be on a first come first served basis and we can accept any and all formats.
              All data will be kept private and confidential.
              If would would like to be included in the list for sponsored development please let us here. (link
              to email list) 
            </span> 
          </p>
        </div>
      </header>
    );

  }

}