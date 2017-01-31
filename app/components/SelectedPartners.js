import React, { Component, PropTypes } from 'react'

export default class SelectedPartners extends Component {

  render() {

    return (
      <div id="selectedPartners">
        <div className="container">
          <p className="sectionTitle">Sponsored Development Partners</p>
          <div className="logos">
            <img src="images/SOCAN@2x.png" />
            <img src="images/MediaNet.png" />
            <img src="images/Songtrust.png" />
            <img src="images/DowntownMP.png" />
            <img src="images/CDBaby.png" />
            <img src="images/Avid.png" />
          </div>
        </div>
      </div>
    );

  }

}