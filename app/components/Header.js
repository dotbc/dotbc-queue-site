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
          We are building the only cross vertical solutions for modern rights and data management for the global music 
          industry, leveraging the power of the blockchain, distributed cloud technology, and 21st century machine based 
          data management tools.  To make dotBC work, we want your involvement and insight.  We are looking for rights 
          data and audio track data owners, and users who are looking for a modern rights management data solution to 
          partner with us as we develop dotBC.
        </p>
      </div> );

    const tableStyle = {
      border: '1px solid',
    };

    return (<div>
            <p className="intro1 intro">We are building the only cross vertical solutions for modern rights and data management for the global music industry, leveraging the power of the blockchain, distributed cloud technology, and 21st century machine based data management tools.  To make dotBC work, we want your involvement and insight.  We are looking for rights data and audio track data owners, and users who are looking for a modern rights management data solution to partner with us as we develop dotBC.
            </p>
            <p className="intro">To assist our development effort, we are encouraging all participants to upload their current audio tracks and meta data.  All uploads are kept strictly private and confidential, and the data will only be used for our research purposes.
            </p>
            <p className="intro">We have tiered membership levels that suit every individual and company in the recorded music industry.  From artist, songwriter, producer and manager to labels, distributors, publishers, performing rights organizations, streaming services, digital service providers, licensing companies and more, we are developing tools to allow you to focus on making and monetizing music assets.
            </p>
            <p className="intro">Tiers:</p>
            <table className="intro" style={tableStyle}>
              <tbody>
                <tr className="row">
                  <td>Free:</td>
                  <td>$0</td>
                  <td colSpan={4}>Expected Release at end of 2017.  Free tools for single song dotBC creation</td>
                </tr>
                <tr className="row">
                  <td>Bronze:</td>
                  <td>$5,000:</td>
                  <td colSpan={4}> Free+: Limited data ingestion assistance from dotBC</td>
                </tr>
                <tr className="row">
                  <td>Silver:</td>
                  <td>$25,000:</td>
                  <td colSpan={4}> Bronze+: Blockchain and cloud gateway set up.  Data ingestion.</td>
                </tr>
                <tr className="row">
                  <td>Gold:</td>
                  <td>$100,000:</td>
                  <td colSpan={4}> Sliver+: Workflow connections to internal systems for dotBC ingestion.</td>
                </tr>
                <tr className="row">
                  <td>Enterprise:</td>
                  <td>Contact Us</td>
                  <td colSpan={4}>Custom development work</td>
                </tr>
              </tbody>
            </table>
          <br />
          <p className="intro">For more details please review our membership tiers <a href="https://view.attach.io/rkV8QNaXW">here</a>.</p>

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
              <span className="name">Dot Blockchain Media Partner Queue</span>
            </a>
          </span>
          {(loggedIn) ? this._renderLoggedInControls() : this._renderLoggedOutControls() }
          {this._renderTextContent()}
        </div>
      </header>
    );

     












  }

}