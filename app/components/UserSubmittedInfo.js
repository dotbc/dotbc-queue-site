import React, { Component, PropTypes } from 'react'

export default React.createClass({

  propTypes: {
    user: PropTypes.shape({
      name: PropTypes.string,
      organization: PropTypes.string,
      title: PropTypes.string,
      email: PropTypes.string,
      interest: PropTypes.string,
    })
  },

  render () {

    return (
      <div className="userSubmittedInfo">
				<div className="personal">
					<div className="pair">
						<label>Name</label>
						<p>{this.props.user.fullName}</p>
					</div>
					<div className="pair">
						<label>Your Company/Organization</label>
						<p>{this.props.user.organization}</p>
					</div>
					<div className="pair">
						<label>Your Roll/Title</label>
						<p>{this.props.user.title}</p>
					</div>
					<div className="pair">
						<label>Email Address</label>
						<p>{this.props.user.email}</p>
					</div>
				</div>
				<div className="purpose">
					<div className="pair">
						<label>Why are you interestd in participating in the dBC project?</label>
						<p>{this.props.user.interest}</p>
					</div>
				</div>
			</div>
    );

  }

});