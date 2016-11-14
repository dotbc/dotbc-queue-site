import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'
import FilesAndDocuments from '../components/FilesAndDocuments';
import Footer from '../components/Footer';
import Header from '../components/Header';
import TabSelector from '../components/TabSelector';
import { resetErrorMessage } from '../actions';
import $ from 'jquery';

class HomePage extends Component {

  state = {
    rows: [],
    user: {}
  }

  componentDidMount() {
    this.serverRequest = $.get('/api/admin/queue/', function (data, message, res) {
      this.setState(data);
    }.bind(this));
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    const { children, inputValue } = this.props
    return (
      <div>
        <Header loggedIn={ !!this.state.user} />
        <main>
          <TabSelector activeTab="left" />
        </main>
        <Footer />
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