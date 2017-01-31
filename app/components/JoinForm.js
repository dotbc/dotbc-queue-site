import React, { Component, PropTypes } from 'react'

export default React.createClass({

  getInitialState () {
    return {
      submitDisabled: this.props.submitDisabled,
      fullName: this.props.fullName,
      organization: this.props.organization,
      title: this.props.title,
      email: this.props.email,
      interest: this.props.interest,
    };
  },

  handleSubmit (event) {
    event.preventDefault();
    this.props.onSubmit(this.state);
  },

  handleChange (key, e) {
    var change = {};
    change[key] = e.target.value;
    this.setState(change);
  },

  render () {

    const { 
      onSubmit, 
    } = this.props;

    const {
      fullName,
      organization,
      title,
      email,
      interest,
    } = this.state;
    
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-field">
          <label htmlFor="email">Email Address<span>*</span></label>
          <input name="email" required type="email" value={this.state.email} onChange={this.handleChange.bind(this, "email")} />
          <p className="instruction">
            <span>* Please use your work email for verification</span>
            <br />
            <span>* Your email will serve as your username and login</span>
          </p>
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input name="password" required type="password" value={this.state.password} onChange={this.handleChange.bind(this, "password")} />
        </div>
        <div className="input-field">
          <label htmlFor="fullName">Full Name</label>
          <input name="fullName" required type="text" value={this.state.fullName} onChange={this.handleChange.bind(this, "fullName")} />
        </div>
        <div className="input-field">
          <label htmlFor="organization">Your Company/Organization</label>
          <input name="organization" required type="text" value={this.state.organization} onChange={this.handleChange.bind(this, "organization")} />
        </div>
        <div className="input-field">
          <label htmlFor="title">Your Role/Title</label>
          <input name="title" required type="text" value={this.state.title} onChange={this.handleChange.bind(this, "title")} />
        </div>
        <div className="input-field">
          <label htmlFor="interest">Why are you interested in participating in the dBC project?</label>
          <textarea name="interest" required rows="8" value={this.state.interest} onChange={this.handleChange.bind(this, "interest")} ></textarea>
        </div>
        <div className="input-field">
          <label htmlFor="interestedInSponsoredDevelopment">Interested in Sponsored Development</label>
          <input name="interestedInSponsoredDevelopment" type="checkbox" value={this.state.interestedInSponsoredDevelopment} onChange={this.handleChange.bind(this, "interestedInSponsoredDevelopment")} />
        </div>

        <input type="submit" className="button" disabled={this.state.submitDisabled} value="Agree and Continue" />
      </form>
    );

        // place the following above submit to enable hide from public
        // <div className="input-field">
        //   <label htmlFor="hideMeFromPublic">Hide my name from the public waitlist</label>
        //   <input name="hideMeFromPublic" required type="checkbox" value={this.state.hideMeFromPublic} onChange={this.handleChange.bind(this, "hideMeFromPublic")} />
        // </div>

  }

});