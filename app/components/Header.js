import React, { Component, PropTypes } from 'react'

export default class Header extends Component {
  
  _renderLoggedInControls() {
    return (
      <ul id="nav" className="unstyled">
				<li><a href="/logout">Sign Out</a></li>
			</ul>
    );
  }
  
  _renderLoggedOutControls() {
    return (
      <ul id="nav" className="unstyled">
        <li><a href={"/join"}>Join</a></li>
        <li><a href={"/login"} onClick={this.props.onJoinClicked} >Sign In</a></li>
      </ul>
    );
  }

  _renderTextContent () {

    if ( this.props.loggedIn) 
      return (
      <div>
        <p className="intro1 intro">
          We're building the world's first open framework for decentralized interoperability in the music industry, based on open source software and the biggest thing to ever come 
          along in distributed computing: the Blockchain. 
        </p>
      </div> );

    return (<div>
      <p className="intro1 intro">
        We're building the world's first open framework for decentralized interoperability in the music industry, based on open source software and the biggest thing to ever come 
        along in distributed computing: the Blockchain.
      </p>
      <p className="intro">
        To make a platform that works for the needs of the whole industry, we want you involved.
      </p>
      <p className="intro">
        We're onboarding partners and accepting sample data uploads to help guide development, and to make sure the types and formats of media files that run your business 
        get the support they deserve. All uploads are kept strictly private and confidential. 
      </p>
      <p className="sponsoredDevelopment">
        Join us today! On-boarding is first-come, first serve. If would would like to pursue sponsored development for a plug-in for automated ingestion and processing, please let us know at <a href={"/join"}>signup</a>.
      </p>
    </div>);
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
          {(loggedIn) ? this._renderLoggedInControls() : this._renderLoggedOutControls() }
          {this._renderTextContent()}
        </div>
      </header>
    );

     












  }

}