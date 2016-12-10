import moment from 'moment';
import Dropzone from 'react-dropzone';
import React, { Component, PropTypes } from 'react'
import request from 'superagent';
import { RIEInput } from 'riek'
import $ from 'jquery';

export default class QueueRow extends Component {

  state = { 
    open: this.props.isOpen || false,
    user: this.props.user || { logo: null },
  }

  logoClicked () {
    window.open(this.state.user.logo.preview || this.state.user.logo);
  }

	onLogoDrop (files) {

    const userId = this.props.user._id;
    const file = files[0];

    request.post('/api/admin/update-logo/' + userId)
      .attach('logo', file)
      .end((err, res) => {
        this.setState({ user: { logo: file } });
      });

	}

  toggleOpen (e) {
    if (['IMG', 'A', 'INPUT', 'TEXTAREA', 'path', 'polygon', 'g', 'svg' ].indexOf(e.target.tagName) > -1) return;
    if (e.target.classList.length && e.target.classList.contains && e.target.classList.contains('ignoreOpenClose')) return;
    this.setState({
      open: ! this.state.open
    })
  }

  _renderButton () {
    if ( ! this.props.user.accepted) {
      return (<a className="button" onClick={this.props.onAcceptClicked.bind(this, this.props.user)}>Accept</a>);
    } else return (<a className="button" onClick={this.props.onUnAcceptClicked.bind(this, this.props.user)}>Unaccept</a>);
  }

  _renderMove () {
    if (this.props.user.accepted) {
      return (null);
    } else return (<img src="images/move-top.svg" onClick={this.props.onPlaceInQueueChanged.bind(this, this.props.user._id, { placeInQueue: 1 })} />);
  }

  _renderClosed () {

    const numberFiles = (this.props.user.files || []).length;
    const colOne = this.props.user.accepted ? 
      moment(new Date(this.props.user.accepted)).format("dddd, MMMM Do YYYY, h:mm:ss a") : 
      (<RIEInput value={this.props.index}
								change={this.props.onPlaceInQueueChanged.bind(this, this.props.user._id)}
                className="input-field"
								propName="placeInQueue" />);

    return (
      <tr onClick={this.toggleOpen.bind(this)}>
        <td>{colOne}</td>
        <td>
          {this._renderLogo()}          
        </td> 
        <td>
          <span className="org">{this.props.user.organization}</span><span className="name">{this.props.user.fullName}</span>
          <span className="title">{this.props.user.title}</span>
          <span className="email"><a href="mailto:{this.props.user.email}">{this.props.user.email}</a></span>
        </td>
        <td><p>FILES: {numberFiles}</p></td>
        <td>{this._renderButton()}</td>
        <td>{this._renderMove()}</td>
      </tr>
    );
  }

  _renderLogo () {
    return this.state.user.logo
            ? (<div>
                <img className="ignoreOpenClose file" src={this.state.user.logo.preview || this.state.user.logo} onClick={this.logoClicked.bind(this)} /> 
                <Dropzone className="dropzone ignoreOpenClose" accept="image/*" onDrop={this.onLogoDrop.bind(this)} >
                  <button>change</button>
                </Dropzone>
               </div>)
            :  (<Dropzone className="dropzone ignoreOpenClose file" accept="image/*" onDrop={this.onLogoDrop.bind(this)} >
                  <span className="ignoreOpenClose">Add logo</span>
                </Dropzone>);
  }

  _renderOpenFiles () {
    const openFiles = [];
    this.props.user.files.forEach((file) => {
      openFiles.push((
        <div key={file._id} className="file">
          <svg className="docIcon" width="35px" height="29px" viewBox="0 0 35 47" version="1.1">
              <g id="Designs-r2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g id="B" transform="translate(-362.000000, -883.000000)" fill="#0C62AD">
                      <g id="Group" transform="translate(362.000000, 883.000000)">
                          <polygon id="Fill-1903" points="13.6111111 35.25 7.77777778 35.25 7.77777778 39.1666667 13.6111111 39.1666667"></polygon>
                          <polygon id="Fill-1904" points="27.2222222 35.25 15.5555556 35.25 15.5555556 39.1666667 27.2222222 39.1666667"></polygon>
                          <polygon id="Fill-1905" points="27.2222222 23.5 15.5555556 23.5 15.5555556 27.4166667 27.2222222 27.4166667"></polygon>
                          <polygon id="Fill-1906" points="27.2222222 29.375 15.5555556 29.375 15.5555556 33.2916667 27.2222222 33.2916667"></polygon>
                          <polygon id="Fill-1907" points="13.6111111 23.5 7.77777778 23.5 7.77777778 27.4166667 13.6111111 27.4166667"></polygon>
                          <polygon id="Fill-1908" points="13.6111111 29.375 7.77777778 29.375 7.77777778 33.2916667 13.6111111 33.2916667"></polygon>
                          <polygon id="Fill-1909" points="27.2222222 17.625 15.5555556 17.625 15.5555556 21.5416667 27.2222222 21.5416667"></polygon>
                          <polygon id="Fill-1910" points="13.6111111 17.625 7.77777778 17.625 7.77777778 21.5416667 13.6111111 21.5416667"></polygon>
                          <path d="M22.3611111,12.7291667 L22.3611111,0.979166667 L34.0277778,12.7291667 L22.3611111,12.7291667 Z M29.1666667,41.125 L5.83333333,41.125 L5.83333333,15.6666667 L29.1666667,15.6666667 L29.1666667,41.125 Z M34.7151389,12.0368958 L23.0484722,0.286895833 C22.8656944,0.1028125 22.61875,0 22.3611111,0 L0.972222222,0 C0.435555556,0 0,0.4376875 0,0.979166667 L0,46.0208333 C0,46.5623125 0.435555556,47 0.972222222,47 L34.0277778,47 C34.5644444,47 35,46.5623125 35,46.0208333 L35,12.7291667 C35,12.4687083 34.8969444,12.22 34.7151389,12.0368958 L34.7151389,12.0368958 Z" id="Fill-1911"></path>
                      </g>
                  </g>
              </g>
          </svg>
          <a href={file.publicUrl} target="_blank" download>
            <svg className="downloadIcon" width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
                <g id="Designs-r2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="A" transform="translate(-950.000000, -690.000000)" fill="#808080">
                        <g id="Fill-1880-+-Fill-1881" transform="translate(950.000000, 690.000000)">
                            <path d="M9.70541667,15.71125 C9.78333333,15.7891667 9.88958333,15.8333333 10,15.8333333 C10.1104167,15.8333333 10.2166667,15.7891667 10.2945833,15.71125 L16.1279167,9.8775 C16.2470833,9.75833333 16.2829167,9.57916667 16.2183333,9.42333333 C16.15375,9.2675 16.0016667,9.16625 15.8333333,9.16625 L13.3333333,9.16666667 L13.3333333,0.416666667 C13.3333333,0.18625 13.1466667,0 12.9166667,0 L7.08333333,0 C6.85333333,0 6.66666667,0.18625 6.66666667,0.416666667 L6.66666667,9.16625 L4.16666667,9.16625 C3.99833333,9.16625 3.84625,9.2675 3.78166667,9.42333333 C3.71708333,9.57916667 3.75291667,9.75833333 3.87208333,9.8775 L9.70541667,15.71125 Z" id="Fill-1880"></path>
                            <path d="M19.1666667,14.5833333 C18.70625,14.5833333 18.3333333,14.9566667 18.3333333,15.4166667 L18.3333333,18.3333333 L1.66666667,18.3333333 L1.66666667,15.4166667 C1.66666667,14.9566667 1.29333333,14.5833333 0.833333333,14.5833333 C0.372916667,14.5833333 0,14.9566667 0,15.4166667 L0,19.1666667 C0,19.6266667 0.372916667,20 0.833333333,20 L19.1666667,20 C19.6266667,20 20,19.6266667 20,19.1666667 L20,15.4166667 C20,14.9566667 19.6266667,14.5833333 19.1666667,14.5833333" id="Fill-1881"></path>
                        </g>
                    </g>
                </g>
            </svg>
          </a>
          
          <p className="docName">{file.filename}</p>
          <p className="description">{file.description}</p>
        </div>
      ));
    });
    return openFiles;
  }

  _renderOpen () {

    const numberFiles = (this.props.user.files || []).length;
    const colOne = this.props.user.accepted ? 
      moment(new Date(this.props.user.accepted)).format("dddd, MMMM Do YYYY, h:mm:ss a") : 
      (<RIEInput value={this.props.index}
								change={this.props.onPlaceInQueueChanged.bind(this, this.props.user._id)}
                className="input-field"
								propName="placeInQueue" />);

    return (
      <tr className="open" onClick={this.toggleOpen.bind(this)}>
        <td>{colOne}</td>
        <td>
          {this._renderLogo()}
        </td> 
        <td>
          <span className="org">{this.props.user.organization}</span>
          <span className="name">{this.props.user.fullName}</span>
          <span className="title">{this.props.user.title}</span>
          <span className="email"><a href="mailto:pjenson@example.com">{this.props.user.email}</a></span>
          <div className="moreInfo">
            <p> {this.props.user.interest}</p>
          </div>
        </td>
        <td>
          <p>FILES: {numberFiles}</p>
          <div className="moreInfo">
            {this._renderOpenFiles()}
          </div>
        </td>
        <td>{this._renderButton()}</td>
        <td>{this._renderMove()}</td>
      </tr>
    );
  }

  render () {
    if (this.state.open) return this._renderOpen();
    else return this._renderClosed();

  }

};