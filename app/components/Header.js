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
          <p className="intro1 intro">
            We are now accepting request sample data submissions from all participants in the music industry.
          </p>
          <p className="intro">
            On-boarding will be on a first-come, first-served basis. We can accept any and all formats during this phase to aid our research and development efforts. However, future submission to the future blockchain-backed system will be governed by the Minimum Viable Data requirements.
          </p>
          <p className="intro">
            All data will be kept strictly private and confidential during this pre-release period. You will be invited to use the dotBC Bundler application when it reaches its beta period to submit your information officially.
          </p>
          <p className="sponsoredDevelopment">
            If would would like to pursue sponsored development for a plug-in for automated ingestion and processing, please let us know at <a href={"/join"}>signup</a>.
          </p>
        </div>
      </header>
    );

    







  }

}