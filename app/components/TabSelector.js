import QueueTabs from './QueueTabs';
import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form';
import $ from 'jquery';

export default class TabSelector extends Component {

  state = {
    activeTab: this.props.activeTab,
    accepted: this.props.accepted || [],
    inQueue: this.props.inQueue || [],
  }

  componentDidMount() {
    this._updateRows();
  }

  componentWillUnmount() {
    if (this.serverRequest) this.serverRequest.abort();
  }

  onClick (e) {
    this.setState({
      activeTab: (e.target.id === 'in_queue_tab') ? 'left' : 'right'
    });
  }

  _updateRows () {
    this.serverRequest = $.get('/api/admin/queue/', function (data, message, res) {
      this.setState(data);
    }.bind(this));
  }

  _renderTab() {
    return <QueueTabs activeTab={this.state.activeTab} 
                      accepted={this.state.accepted} 
                      inQueue={this.state.inQueue} 
                      rowsUpdated={this._updateRows.bind(this)} />
  }

  render() {

    const { activeTab, accepted, inQueue } = this.state;
    const inQueueTabClass = (activeTab === 'left') ? 'active' : '';
    const acceptedTabClass = (activeTab === 'left') ? '' : 'active';

    return (
      <div> 
        <div className="container">
          <ul className="unstyled" id="adminTabs">
            <li id="in_queue_tab" className={inQueueTabClass} onClick={this.onClick.bind(this)}>In Queue <span>({inQueue.length})</span></li>
            <li id="accepted_tab" className={acceptedTabClass} onClick={this.onClick.bind(this)}>Accepted <span>({accepted.length})</span></li>
          </ul>
        </div>

        { this._renderTab() } 

      </div>
    );

  }

};



