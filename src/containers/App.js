import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import JoinButton from '../components/JoinButton';
import SelectedPartners from '../components/SelectedPartners';
import WaitListContainer from '../components/WaitListContainer';
import { resetErrorMessage } from '../actions';

class App extends Component {
  static propTypes = {
    // Injected by React Redux
    errorMessage: PropTypes.string,
    // resetErrorMessage: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
    // Injected by React Router
    // children: PropTypes.element
  }

  handleDismissClick = e => {
    this.props.resetErrorMessage()
    e.preventDefault()
  };

  handleChange = nextValue => {
    browserHistory.push(`/${nextValue}`)
  };

  render() {
    const { children, inputValue } = this.props
    return (
      <div>
        <Header />
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
