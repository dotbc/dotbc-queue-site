import QueueRow from './QueueRow';
import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form';
import $ from 'jquery';

export default class QueueTabs extends Component {

  state = { 
    submitDisabled: false,
  }

  componentWillUnmount() {
    if (this.serverRequest) this.serverRequest.abort();
  }

  _renderRows () {
    var rows = [];

    var index = 0;
  
    if (this.props.activeTab === 'left') {
      (this.props.inQueue || []).forEach((row) => {
        rows.push(<QueueRow key={row._id} 
          index={++index}
          user={row} 
          submitDisabled={this.state.submitDisabled}
          onAcceptClicked={this._rowAccepted} 
          onPlaceInQueueChanged={this._onPlaceInQueueChanged}
          onRowUpdated={this.props.rowsUpdated}/>)
      });
    } else {
      (this.props.accepted || []).forEach((row) => {
        rows.push(<QueueRow key={row._id} 
          user={row}
          submitDisabled={this.state.submitDisabled} 
          onUnAcceptClicked={this._rowUnaccepted} 
          onPlaceInQueueChanged={this._onPlaceInQueueChanged}
          onRowUpdated={this.props.rowsUpdated}/>)
      });
    }
  
    return rows;
  }

  render() {

    return (
      <table id="adminQueue" className="queue">
        <tbody>
          
        {this._renderRows()}

        </tbody>
      </table>

    );

  }

};