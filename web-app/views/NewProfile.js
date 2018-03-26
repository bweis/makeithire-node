import React, { Component } from 'react';
import { Button, Input } from 'semantic-ui-react';
import axios from 'axios/index';

import MenuContainer from '../containers/MenuContainer';
import { getCookie } from '../helpers/utils';
import { uploadFileToS3Bucket } from '../helpers/s3';

export default class NewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.uploadResume = this.uploadResume.bind(this);
    this.uploadCoverLetter = this.uploadCoverLetter.bind(this);
  }

  uploadResume() {
    const file = this.resumeInput.inputRef.files[0];

    axios.get('/api/uploadResume', {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
      },
      params: {
        contentType: file.type,
      },
    })
      .then((response) => {
        uploadFileToS3Bucket(file, response.data.signedUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  uploadCoverLetter() {
    const file = this.coverLetterInput.inputRef.files[0];

    axios.get('/api/uploadCoverLetter', {
      headers: {
        Authorization: `Bearer ${getCookie('token')}`,
      },
      params: {
        contentType: file.type,
      },
    })
      .then((response) => {
        uploadFileToS3Bucket(file, response.data.signedUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <MenuContainer loggedIn>
        <Input
          ref={(input) => {
          this.resumeInput = input;
        }}
          size='large'
          icon='folder open outline'
          placeholder='Your Resume Here'
          type='file'
        />
        <Button onClick={this.uploadResume}>Upload Resume</Button>

        <Input
          ref={(input) => {
          this.coverLetterInput = input;
        }}
          size='large'
          icon='folder open outline'
          placeholder='Your Cover Letter Here'
          type='file'
        />
        <Button onClick={this.uploadCoverLetter}>Upload Cover Letter</Button>
      </MenuContainer>
    );
  }
}
