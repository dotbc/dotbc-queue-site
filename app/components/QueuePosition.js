import React, { Component, PropTypes } from 'react'

export default React.createClass({

  propTypes: {
    placeInQueue: PropTypes.number
  },

  render () {

    if (this.props.accepted) return <div className="queueNumber"></div>;

    return (
      <div className="queueNumber">
				<p>Your queue position is: <span>{this.props.placeInQueue}</span></p>
			</div>
    );

  }

});