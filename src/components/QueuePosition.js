import React, { Component, PropTypes } from 'react'

export default React.createClass({

  propTypes: {
    placeInQueue: PropTypes.number
  },

  render () {

    return (
      <div className="queueNumber">
				<p>Your queue position is: <span>{this.props.placeInQueue}</span></p>
			</div>
    );

  }

});