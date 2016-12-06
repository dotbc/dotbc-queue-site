import QueueRow from './QueueRow';
import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form';
import $ from 'jquery';

export default class QueueTabs extends Component {
  
  state = { 
    submitDisabled: false,
  }

  _rowAccepted (row) {    
    
    if (this.state.submitDisabled) return;

    this.setState({
      submitDisabled: true,
    }, () => {
      this.serverRequest = $.post('/api/admin/accept', { _id: row._id, placeInQueue: row.placeInQueue }, function (data, message, res) {
        data.submitDisabled = false;
        this.setState(data, this.props.rowsUpdated);
      }.bind(this));
    });

  }

  _rowUnaccepted (row) {    
    
    if (this.state.submitDisabled) return;

    this.setState({
      submitDisabled: true,
    }, () => {
      this.serverRequest = $.post('/api/admin/unaccept', { _id: row._id }, function (data, message, res) {
        data.submitDisabled = false;
        this.setState(data, this.props.rowsUpdated);
      }.bind(this));
    });

  }

  _onPlaceInQueueChanged (change) {

    if (this.state.submitDisabled) return;

    this.setState({
      submitDisabled: true,
    }, () => {
      change.userId = this.props.user._id;
      change.currentPlaceInQueue = this.props.user.placeInQueue;

      $.ajax({
        type: 'POST',
        url: '/api/admin/update-place-in-queue',
        data: change
      })
      .done(((res) => {
        if (res.error) {
          this.setState({
            submitDisabled: false,
            errorMessage: res.error || 'Unable update participant logo.',
          });
        } else {
          this.setState({
            submitDisabled: false,
          }, () => {
            this.props.onRowUpdated();
          }); 
        }
      }).bind(this))
      .fail(function(res) {
        this.setState({
          submitDisabled: false,
          errorMessage: res.error || 'Unable update place in queue. Please try again.',
        });
      }.bind(this));
    });

	}

  componentWillUnmount() {
    if (this.serverRequest) this.serverRequest.abort();
  }

  _renderRows () {
    var rows = [];
  
    if (this.props.activeTab === 'left') {
      (this.props.inQueue || []).forEach((row) => {
        rows.push(<QueueRow key={row._id} user={row} 
          submitDisabled={this.state.submitDisabled}
          onPlaceInQueueChanged={this._onPlaceInQueueChanged}
          onRowUpdated={this.props.rowsUpdated} 
          onAcceptClicked={this._rowAccepted.bind(this)} />)
      });
    } else {
      (this.props.accepted || []).forEach((row) => {
        rows.push(<QueueRow key={row._id} user={row}
          submitDisabled={this.state.submitDisabled} 
          onPlaceInQueueChanged={this._onPlaceInQueueChanged}
          onRowUpdated={this.props.rowsUpdated} 
          onUnAcceptClicked={this._rowUnaccepted.bind(this)} />)
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