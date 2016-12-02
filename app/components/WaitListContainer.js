import React, { Component, PropTypes } from 'react'

export default class WaitListContainer extends Component {

  state = {
    selectedTab: 'left'
  }

  _renderWaitlist () {
    const list = [];

    let input = null;
    
    if (this.props.partners && this.props.partners.length === 0) input = this.props.waitlist;
    else if (this.props.waitlist && this.props.waitlist.length === 0) input = this.props.partners;
    else input = (this.state.selectedTab === 'left') ? this.props.waitlist : this.props.partners;


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

  _renderAgencyButton() {

  }

  _setNavStyle() {
    return ! this.props.waitlist.length || ! this.props.partners.length ? ( { backgroundColor: '#fff', width: 100 + '%' }) : null;
  }

  _renderQueueNav() {
    if ( ! this.props.waitlist && ! this.props.partners) {
      return null;
    } 

    const waitlist = this.props.waitlist.length === 0 ? null : (<span className={this.setIfActive.bind(this, 'left')()} style={this._setNavStyle()} onClick={this.toggle.bind(this, 'left')}>Agencies and Organizations on the Waitlist</span>);
    const partners = this.props.partners.length === 0 ? null : (<span className={this.setIfActive.bind(this, 'right')()} style={this._setNavStyle()} onClick={this.toggle.bind(this, 'right')}>Full List of Current accepted</span>);
 
    return (
      <div className="queueNav">
        {waitlist}
        {partners}
      </div>);
  }

  render() {

    return (
      <main>
        <div className="container">

          {this._renderQueueNav()}

          <ul id="queue" className="unstyled">
            {this._renderWaitlist()}
          </ul>

        </div>
      </main>
    );

  }

}