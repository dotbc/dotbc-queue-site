import React, { Component, PropTypes } from 'react'
import UploadedFile from './UploadedFile';

export default React.createClass({

  render () {

    return (
      <div className="filesDocs">
				<label>Files & Documents</label>
				<div className="uploaded">
					<ul className="unstyled">
						

						
					</ul>
				</div>
				<div className="uploadNew">
					<svg className="docIcon" width="35px" height="47px" viewBox="0 0 35 47" version="1.1">
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
					<p>+ Upload New File</p>
				</div>
			</div>
    );

  }

});