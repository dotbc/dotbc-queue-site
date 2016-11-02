import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import JoinButton from '../components/JoinButton';
import Modal from '../components/Modal';
import SelectedPartners from '../components/SelectedPartners';
import WaitListContainer from '../components/WaitListContainer';
import { resetErrorMessage } from '../actions';
import $ from 'jquery';

class App extends Component {

  state = {
    showLogin: false,
    user: null
  }
  
  componentDidMount() {
    if (this.props.inputValue === 'login') {
      this.setState({
        showLogin: true,
      });
    }

    this.serverRequest = $.get('/api/home/', function (data, message, res) {
      debugger;
      this.setState({ user: data });
    }.bind(this));

  }

  componentWillUnmount() {
    this.serverRequest.abort();
    this.loginRequest.abort();
  }

  handleChange = nextValue => {
    browserHistory.push(`/${nextValue}`)
  };

  handleLoginClicked = (data) => {
    const postRoute = this.props.inputValue === 'admin-login' ? '/admin-login' : '/login';
    const redirectLocation = this.props.inputValue === 'admin-login' ? '/admin-home' : '/home';
    this.loginRequest = $.post(postRoute, data, function (data, message, res) {
      window.location = redirectLocation;
    }.bind(this)).fail(function(one, two, errorMessage) {
      this.setState({ errorMessage: errorMessage });
    }.bind(this));;
  };

  handleLoginErrorDismissedClicked = (data) => {
    this.setState({
      errorMessage: undefined,
    });
  };

  joinClicked = (e) => {
    e.preventDefault();
    this.setState({
      showLogin: true,
    });
  };

  render() {
    const { children, inputValue } = this.props
    return (
      <div>
        <Modal showLogin={this.state.showLogin} 
          handleErrorDismissed={this.handleLoginErrorDismissedClicked} 
          handleSubmit={this.handleLoginClicked} 
          errorMessage={this.state.errorMessage}/>
        <Header loggedIn={this.state.user} onJoinClicked={this.joinClicked}/>
        <SelectedPartners />
        <JoinButton />
        <WaitListContainer value={inputValue} onChange={this.handleChange} />
        <Footer />
        <hr />
        {children}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  errorMessage: state.errorMessage,
  inputValue: ownProps.location.pathname.substring(1)
})

export default connect(mapStateToProps, {
  resetErrorMessage
})(App)
