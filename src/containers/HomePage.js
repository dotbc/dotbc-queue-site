import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'
import FilesAndDocuments from '../components/FilesAndDocuments';
import Footer from '../components/Footer';
import Header from '../components/Header';
import JoinForm from '../components/JoinForm';
import LegalInfo from '../components/LegalInfo';
import QueuePosition from '../components/QueuePosition';
import UserSubmittedInfo from '../components/UserSubmittedInfo';
import { resetErrorMessage } from '../actions';
import $ from 'jquery';

class HomePage extends Component {

  state = {
    user: { }
  }

  componentDidMount() {
    this.serverRequest = $.get('/api/home/', function (data, message, res) {
      this.setState({ user: data });
    }.bind(this));
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  handleSubmit = (data) => {

    $.ajax({
      type: 'POST',
      url: '/api/join',
      data: data
    })
    .done(((res) => {
      if (res.errorMessage) {
        this.setState({
          errorMessage: 'Unable to create user.'
        });
        this.renderErrorMessage();
      } else {
        window.navigate('/home')
      }
    }).bind(this))
    .fail(function(res) {
      this.setState({
        errorMessage: 'Unable to create user.'
      });
      this.renderErrorMessage();
    }.bind(this));

  }

  renderErrorMessage() {
    
    const { errorMessage } = this.props
   
    if ( ! errorMessage) {
      return null
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href="#"
            onClick={this.handleDismissClick}>
          Dismiss
        </a>)
      </p>
    )
  }

  render() {
    const { children, inputValue } = this.props
    return (
      <div>
        <Header loggedIn={ !!this.state.user} />
        <main>
          <div className="container userAccountContainer">
            <QueuePosition placeInQueue={this.state.user.placeInQueue} />
            <UserSubmittedInfo user={this.state.user} />
            <FilesAndDocuments />
            {this.renderErrorMessage()}
            <LegalInfo />
          </div>
        </main>
        <Footer />
        <hr />
        {children}
      </div>
    )
  }

};

const mapStateToProps = (state, ownProps) => ({
  errorMessage: state.errorMessage,
  inputValue: ownProps.location.pathname.substring(1)
})

export default connect(mapStateToProps, {
  resetErrorMessage
})(HomePage)