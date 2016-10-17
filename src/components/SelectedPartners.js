import React, { Component, PropTypes } from 'react'

export default class SelectedPartners extends Component {

  render() {

    return (
      <div id="selectedPartners">
        <div className="container">
          <p className="sectionTitle">Selected Partners</p>
          <div className="logos">
            <img src="images/BMI-logo.png" />
            <img src="images/spotify-logo.png" />
            <img src="images/ascap-logo.png" />
            <img src="images/monegraph-logo.png" />
            <img src="images/hfa-logo.png" />
          </div>
        </div>
      </div>
    );

  }

}