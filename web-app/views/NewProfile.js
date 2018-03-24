import React, { Component } from 'react';
import { Button, Input } from 'semantic-ui-react';
import axios from 'axios';

import MenuContainer from '../containers/MenuContainer';
import { getCookie } from '../utils';

export default class NewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.uploadFile = this.uploadFile.bind(this);
  }

  uploadFile() {
    const file = this.resumeInput.inputRef.files[ 0 ]

    axios.get('/api/uploadResume',
      {
        headers: {
          'Authorization': getCookie('token'),
        },
        params: {
          'contentType': file.type,
        },
      })
      .then((response) => {
        const signedUrl = response.data.signedUrl;
        const fileName = response.data.fileName;

        axios.put(signedUrl, file, {
          headers: {
            'Content-Type': file.type,
          },
        })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <MenuContainer loggedIn >
        <Input ref={(input) => { this.resumeInput = input; }} size='large' icon='folder open outline' placeholder='Your Resume Here' type='file' />
        <Button onClick={this.uploadFile} />
      </MenuContainer>
    );
  }
}
