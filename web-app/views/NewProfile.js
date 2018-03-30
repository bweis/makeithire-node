import React, { Component } from 'react';
import { Button, Input, Grid, TextArea, Image, Form, Header  } from 'semantic-ui-react';
import axios from 'axios/index';

import MenuContainer from '../containers/MenuContainer';
import { getStudentDetails, getUserDetails, updateStudentDetails, getUniversityList, getMajors, getDegrees } from '../helpers/api'
import { getCookie } from '../helpers/utils';
import { uploadFileToS3Bucket } from '../helpers/s3';

const gradYears = [
  {
    text: 2018,
    key: '2018',
    value: 2018,
  },
  {
    text: 2019,
    key: '2019',
    value: 2019,
  },
  {
    text: 2020,
    key: '2020',
    value: 2020,
  },
  {
    text: 2021,
    key: '2021',
    value: 2021,
  },
  {
    text: 2022,
    key: '2022',
    value: 2022,
  },
  {
    text: 2023,
    key: '2023',
    value: 2023,
  },
];


export default class NewProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentInfo: {},
      userInfo: {},
      universities: [],
      majors: [],
      degrees: [],
      editing: false
    };
    this.uploadResume = this.uploadResume.bind(this);
    this.uploadCoverLetter = this.uploadCoverLetter.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
    getUserDetails((res) => {
      if (!res) {
        console.log('Could not get user details');
      } else {
        this.setState({ userInfo: res.data.response});
      }
    });
    getStudentDetails((res) => {
      if (!res) {
        console.log('Could not get student details');
      } else {
        this.setState({ studentInfo: res.data.response});
      }
    });
  }

  componentWillMount() {
    getMajors((res) => {
      if (!res) {
        console.log('Could not get majors');
      } else {
        var temp = res.data.response;
        var majors = [];
        temp.forEach(function (arrayItem) {
          var major = {};
          major.key = arrayItem.idMajor;
          major.text = arrayItem.MajorName;
          major.value = arrayItem.idMajor;
          majors.push(major);
        });
        console.log(majors);
        this.setState({majors: majors});
      }
    });
    getDegrees((res) => {
      if (!res) {
        console.log('Could not get degrees');
      } else {
        var temp = res.data.response;
        var degrees = [];
        temp.forEach( function (arrayItem)
        {
          var degree = {};
          degree.key = arrayItem.idDegree;
          degree.text = arrayItem.Level;
          degree.value = arrayItem.idDegree;
          degrees.push(degree);
        });
        console.log(degrees);
        this.setState({ degrees: degrees});
      }
    });
    getUniversityList((res) => {
      if (!res) {
        console.log('Could not get universities');
      } else {
        var temp = res.data.response;
        var univs = [];
        temp.forEach( function (arrayItem)
        {
          var univ = {};
          univ.key = arrayItem.idUniversity;
          univ.text = arrayItem.UnivName;
          univ.value = arrayItem.idUniversity;
          univs.push(univ);
        });
        console.log(univs);
        this.setState({ universities: univs});
      }
    });
  }

  handleChange(e, { name, value }) {
    if (this.state.editing == false) {
      this.state.editing = true;
    }
    console.log('changing ' + value)
    let info = this.state.studentInfo;
    info[name] = value;
    this.setState({ info });
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

  updateInfo() {
    var studentInfo = this.state.studentInfo;
    for (var property in studentInfo) {
      console.log(studentInfo[property]);
      if (studentInfo[property] == null) {
        studentInfo[property] = 'blah';
      }
    }
    updateStudentDetails((res) => {
      if (!res) {
        console.log('Could not get student details');
      } else {
        console.log('updated!')
      }
    }, studentInfo);
  }

  render() {
    return (
      <MenuContainer loggedIn>
        <Grid centered columns={2}>
          <Grid.Row>
            <Image src='./img/zack.jpg' size='small' circular />
          </Grid.Row>
          <Grid.Row>
            <Header size='medium'>
              {this.state.userInfo.FirstName} {this.state.userInfo.MiddleName} {this.state.userInfo.LastName}
            </Header>
          </Grid.Row>
          <Grid.Column>
          <Form>
            {this.state.editing && <Button onClick={this.updateInfo}>Update Profile</Button>}
            <Form.TextArea fluid name='Bio' value={this.state.studentInfo.Bio} onChange={this.handleChange}/>
            <Form.Group widths='equal'>
              <Form.Select fluid name='University' placeholder='University' value={this.state.studentInfo.University} options={this.state.universities}  onChange={this.handleChange}/>
              <Form.Select fluid name='GraduationYear' placeholder='Graduation Year' value={this.state.studentInfo.GraduationYear} options={gradYears} onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Select fluid name='Major' value={this.state.studentInfo.Major} placeholder='Major' options={this.state.majors} onChange={this.handleChange}/>
              <Form.Select fluid name='CurrentPursuingDegree' placeholder='Current Degree' value={this.state.studentInfo.CurrentPursuingDegree} options={this.state.degrees} onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group>
            <Form.Input
                ref={(input) => {
            this.resumeInput = input;
          }}
                size='large'
                icon='folder open outline'
                placeholder='Your Resume Here'
                type='file'
            />
            <Button onClick={this.uploadResume}>Upload Resume</Button>
            </Form.Group>
            <Form.Group>
            <Form.Input
                ref={(input) => {
            this.coverLetterInput = input;
          }}
                size='large'
                icon='folder open outline'
                placeholder='Your Cover Letter Here'
                type='file'
            />
            <Button onClick={this.uploadCoverLetter}>Upload Cover Letter</Button>
            </Form.Group>
            <Form.TextArea label='Skills' placeholder='Skills...' value={this.state.studentInfo.Skills} name='Skills' onChange={this.handleChange}/>
            <Form.TextArea label='Projects' placeholder='Projects...' value={this.state.studentInfo.Projects} name='Projects' onChange={this.handleChange}/>
          </Form>
          </Grid.Column>
        </Grid>
      </MenuContainer>
    );
  }
}
