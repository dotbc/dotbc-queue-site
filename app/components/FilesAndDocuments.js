import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import React, { Component, PropTypes } from 'react'
import UploadedFile from './UploadedFile';
import UploadNew from './UploadNew';
import $ from 'jquery';

export default React.createClass({

	getInitialState () {
		return {
			files: []
		};
	},

	componentDidMount () {
		// console.log(this.props.files)
	},

	fileDeleted () {
		$.get('/api/home')
		.done(((res) => {
			if (res.errorMessage) {
				this.setState({
					submitDisabled: false,
					errorMessage: res.errorMessage || 'Unable to upload file.',
				});
			} else {
				this.setState({
					submitDisabled: false,
					files: res.files
				});
			}
		}).bind(this))
		.fail(function(res) {
			this.setState({
				submitDisabled: false,
				errorMessage: res.errorMessage || 'Unable to upload file. Please try again.',
			});
		}.bind(this));
	},

	onError (err) {
		// console.error(error)
	},

	onProgress () {
		// console.log(arguments)
	},

	onFinish (file) {
		this.setState({ submitDisabled: true }, () => {

			file._id = file.filename.substring(0, file.filename.indexOf('_'));
			file.filename = file.filename.substring(file.filename.indexOf('_') + 1, file.filename.length); 

      $.ajax({
        type: 'POST',
        url: '/api/add-file',
        data: { file }
      })
      .done(((res) => {
        if (res.errorMessage) {
          this.setState({
            submitDisabled: false,
            errorMessage: res.errorMessage || 'Unable to upload file.',
          });
        } else {
          this.setState({
						submitDisabled: false,
						files: res.files
					});
        }
      }).bind(this))
      .fail(function(res) {
        this.setState({
          submitDisabled: false,
          errorMessage: res.errorMessage || 'Unable to upload file. Please try again.',
        });
      }.bind(this));

    });
	},

	_renderUploadedFiles () {
		const uploadedFiles = [];
		const stateOrPropFiles = (this.state.files && this.state.files.length || this.props.files === undefined ? this.state.files : this.props.files);
		stateOrPropFiles.forEach((file) => {
			uploadedFiles.push(<UploadedFile key={file._id} file={file} onFileDeleted={this.fileDeleted.bind(this)} userId={this.props.userId} />)
		});
		return uploadedFiles;
	},

  render () {

		const style = {
			className: "uploadNew"
		}

		const uploaderProps = {
			style, 
			uploadRequestHeaders: { 'x-amz-acl': 'public-read' },
			contentDisposition: "auto",
		}

    return (
		<div className="filesDocs">
			<label>Files & Documents</label>
			<div className="uploaded">
				<ul className="unstyled">
					{this._renderUploadedFiles()}					
				</ul>
			</div>
			<DropzoneS3Uploader onError={this.onError} onProgress={this.onProgress} onFinish={this.onFinish} {...uploaderProps} >
				<UploadNew />
			</DropzoneS3Uploader>
		</div>

    );

  }

});