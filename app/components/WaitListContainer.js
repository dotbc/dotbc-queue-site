import React, { Component, PropTypes } from 'react'

export default class WaitListContainer extends Component {

  state = {
    selectedTab: 'left'
  }

  _renderWaitlist () {
    const list = [];

    const input = this.state.selectedTab === 'left' ? this.props.waitlist : this.props.partners;

    if ( ! input) return null;

    input.forEach((w) => {
      list.push((
        <li key={w.organization + w.fullName + w.title}>
          <span className="org">{w.organization}</span>
          <span className="name">{w.fullName}</span>
          <span className="title">{w.title}</span>
        </li>
      ));
    });
    return list;
  }

  setIfActive (tab) {
    if (this.state === 'undefined') return (tab === 'left') ? 'active' : '';
    return tab === this.state.selectedTab ? 'active' : '';
  }

  toggle (tab) {
    this.setState({
      selectedTab: tab
    })
  }

  render() {

    return (
      <main>
        <div className="container">
          <div className="queueNav">
            <span className={this.setIfActive.bind(this, 'left')()} onClick={this.toggle.bind(this, 'left')}>Agencies and Organizations on the Waitlist</span>
            <span className={this.setIfActive.bind(this, 'right')()} onClick={this.toggle.bind(this, 'right')}>Full List of Current accepted</span>
          </div>

          <ul id="queue" className="unstyled">
            {this._renderWaitlist()}
          </ul>

        </div>
      </main>
    );

  }

}