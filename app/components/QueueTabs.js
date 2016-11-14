import QueueRow from './QueueRow';
import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form';
import $ from 'jquery';

export default class QueueTabs extends Component {

  _rowAccepted (row) {
    this.serverRequest = $.post('/api/admin/accept', { _id: row._id }, function (data, message, res) {
      this.setState(data, this.props.rowsUpdated);
    }.bind(this));
  }

  _rowUnaccepted (row) {
    this.serverRequest = $.post('/api/admin/unaccept', { _id: row._id }, function (data, message, res) {
      this.setState(data, this.props.rowsUpdated);
    }.bind(this));
  }

  componentWillUnmount() {
    if (this.serverRequest) this.serverRequest.abort();
  }

  _renderRows () {
    var rows = [];
  
    if (this.props.activeTab === 'left') {
      (this.props.inQueue || []).forEach((row) => {
        rows.push(<QueueRow key={row._id} user={row} onAcceptClicked={this._rowAccepted.bind(this)} />)
      });
    } else {
      (this.props.accepted || []).forEach((row) => {
        rows.push(<QueueRow key={row._id} user={row} onUnAcceptClicked={this._rowUnaccepted.bind(this)} />)
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