import React, { Component, PropTypes } from 'react'
import { RouterContext } from 'react-router';

export default React.createClass({

  getInitialState () {
    return {};
  },

  handleChange (key, e) {
    var change = {};
    change[key] = e.target.value;
    this.setState(change);
  },

  handleErrorDismissed(e) {
    e.preventDefault();
    this.props.handleErrorDismissed(this.state)
  },

  handleSubmit (event) {
    event.preventDefault();
    this.props.handleSubmit(this.state)
  },

  renderErrorMessage () {
    
    const errorMessage = this.props.errorMessage;
   
    if ( ! errorMessage) {
      return null
    };

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href="#" onClick={this.handleErrorDismissed.bind(this)}>Dismiss</a>)
      </p>
    )
  },

  render () {

    if ( ! this.props.showLogin) return null;

    return (
      <div className="modal">
        <form method="post" action="/login" noValidate onSubmit={this.handleSubmit}>
          <div className="input-field">
            <label htmlFor="email">Email Address</label>
            <input type="email" name="email" placeholder="email" onChange={this.handleChange.bind(this, "email")} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="password" onChange={this.handleChange.bind(this, "password")} />
          </div>
          <input className="button" type="submit" />
          <a href="/forgot">forgot password</a>
        </form>
        {this.renderErrorMessage()}
      </div>
    );

  }

});


