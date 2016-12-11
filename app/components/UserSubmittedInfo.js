import React, { Component, PropTypes } from 'react'
import { RIEInput, RIETextArea } from 'riek'
import $ from 'jquery';

export default React.createClass({

	getInitialState () {
		return {
			user: {}
		}
	},

  propTypes: {
    user: PropTypes.shape({
      name: PropTypes.string,
      organization: PropTypes.string,
      title: PropTypes.string,
      email: PropTypes.string,
      interest: PropTypes.string,
    })
  },
  
  handleDismissClick(e) {
    e.preventDefault();
    this.setState({ errorMessage: undefined });
  },

	onChange (change) {

		this.setState({ errorMessage: null });

		const key = Object.keys(change)[0];
		const value = change[key];

		if (value.trim().length === 0) return this.setState({ errorMessage: `Cannot update ${key} to blank. Please provide a value.` });

		$.ajax({
      type: 'POST',
      url: '/api/update-form-data',
      data: change
    })
    .done(((res) => {
      if (res.error) {
        this.setState({
          submitDisabled: false,
          errorMessage: res.error || 'Unable update form data.',
        });
      } else {
        this.setState({
          user: res
        });
      }
    }).bind(this))
    .fail(function(res) {
      this.setState({
        submitDisabled: false,
        errorMessage: res.error || 'Unable update form data. Please try again.',
      });
    }.bind(this));
	},

  renderErrorMessage() {
    
    const { errorMessage } = this.state;
   
    if ( ! errorMessage) {
      return null
    };

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
				{' '}
				<a href="#" onClick={this.handleDismissClick}>Dismiss</a>
      </p>
    )
  },

  render () {

    return (
      <div className="userSubmittedInfo">
				<span>{this.renderErrorMessage()}</span>
				<div className="personal">
					<div className="pair">
						<label>Name</label>
						<p className="input-field">
							<RIEInput value={this.state.user.fullName || this.props.user.fullName || ''}
								change={this.onChange}
								propName="fullName" />
					</p>
					</div>
					<div className="pair">
						<label>Your Company/Organization</label>
						<p className="input-field">
							<RIEInput value={this.state.user.organization || this.props.user.organization || ''}
								change={this.onChange}
								propName="organization" />
						</p>
					</div>
					<div className="pair">
						<label>Your Roll/Title</label>
						<p className="input-field">
							<RIEInput value={this.state.user.title || this.props.user.title || ''}
								change={this.onChange}
								propName="title" />
						</p>
					</div>
					<div className="pair">
						<label>Email Address</label>
						<p className="input-field">
							{this.state.user.email || this.props.user.email || ''}
						</p>
					</div>
				</div>
				<div className="purpose">
					<div className="pair">
						<label>Why are you interested in participating in the dBC project?</label>
						<p className="input-field">
							<RIETextArea value={this.state.user.interest || this.props.user.interest || ''}
								change={this.onChange}
								propName="interest" />
						</p>
					</div>
				</div>
			</div>
    );

  }

});