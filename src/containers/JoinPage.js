import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'
import Footer from '../components/Footer';
import Header from '../components/Header';
import JoinForm from '../components/JoinForm';
import LegalInfo from '../components/LegalInfo';
import { resetErrorMessage } from '../actions';

class JoinPage extends Component {

  handleSubmit = (formData) => {
    console.log(formData);
  }

  renderErrorMessage() {
    const { errorMessage } = this.props
    if (!errorMessage) {
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
        <Header />
        <main>
          <div className="container">
            <JoinForm onSubmit={this.handleSubmit} />
            <LegalInfo />
          </div>
        </main>
        <Footer />
        <hr />
        {this.renderErrorMessage()}
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
})(JoinPage)