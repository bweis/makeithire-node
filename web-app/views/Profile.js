import $ from 'jquery';
import React, { Component } from 'react';
import {
  Container,
  Col,
  Media,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from 'reactstrap';

const allMajors = '/api/getMajors';
const allDegress = '/api/getDegrees';
// const url = 'http://localhost:3001/api/updateStudentDetails';
const allUnis = '/api/getUniversityList';

const getStudentInfo = '/api/getStudentDetails';

const userDetailsUrl = '/api/getUserDetails';

const majors = [];
const degrees = [];
const universities = [];


let name;
let surName;
let mail;


/*
 {Object.keys(user.professional_accounts).map(function(keyName, keyIndex) {
 return (
 <FormGroup row key={keyIndex}>
 <Col>
 <Label className="col-form-label" for={"profile_"+keyName}>{keyName}</Label>
 </Col>
 <Col>
 <Input id={"profile_"+keyName} type="text" className="profile-input align-middle" value={user.professional_accounts[keyName]} />
 </Col>
 </FormGroup>)
 })}
 */

const user = {
  firstName: '',
  lastName: '',
  university: 'Purdue University',
  bio: '',
  major: 'Computer Science',
  degreePursuing: 'Bachelor of Science',
  gradYear: '',
  coverLetter: '',
  resume: '',
  email: '',
  phoneNumber: '',
  professional_accounts: { github: 'github.com/', linkedin: 'linkedin.com/', facebook: 'facebook.com/' },
  skills: [],
  git: '',

  applications: [],
};


function onResumeSubmit(e) {
  alert('HEY, I DO WORK');
}


function mount(yo) {
  const lol = yo;
  const cookie = getCookie('token');

  $.ajax({
    type: 'GET',
    headers: { authorization: `Bearer ${cookie}` },
    url: userDetailsUrl,
    data: [],

  })

    .done((data, status, xhr) => {
      if (data.message === 'Success') {
        const ref = data.response;
        name = ref.FirstName;
        surName = ref.LastName;
        mail = ref.EmailID;

        const terra = yo.state.user;
        terra.first_name = name;
        terra.lastName = surName;
        terra.email = mail;
        yo.setState({ user: terra });
      }
    })

    .fail((jqxhr, settings, ex) => {
      const dan = JSON.parse(jqxhr.responseText);
      if (dan.message === 'unauthorized access') {

      }
    });


  // $.get(allDegress, {}, (data, status, xhr) => {
  // })
  //   .done((data, status, xhr) => {
  //     if (data.message === 'Success') {
  //       degrees = data.response;
  //     }
  //   })
  //   .fail((jqxhr, settings, ex) => {
  //     const dan = JSON.parse(jqxhr.responseText);
  //     if (dan.message === 'unauthorized access') {
  //     }
  //   });
  //
  //
  // $.get(allMajors, {}, (data, status, xhr) => {
  // })
  //   .done((data, status, xhr) => {
  //     //      alert(data.response);
  //     if (data.message === 'Success') {
  //       majors = data.response;
  //     }
  //   })
  //   .fail((jqxhr, settings, ex) => {
  //     const dan = JSON.parse(jqxhr.responseText);
  //     if (dan.message === 'unauthorized access') {
  //     }
  //   });


  // $.get(allUnis, {}, (data, status, xhr) => {
  //
  // })
  //   .done((data, status, xhr) => {
  //     if (data.message === 'Success') {
  //       universities = data.response;
  //
  //
  //       // last call
  //       const cookie = getCookie('token');
  //
  //
  //       $.ajax({
  //         type: 'GET',
  //         headers: { authorization: cookie },
  //         url: getStudentInfo,
  //         data: [],
  //
  //       })
  //
  //         .done((data, status, xhr) => {
  //           if (data.message === 'Success') {
  //             const temp = lol.state.user;
  //
  //
  //             const ref = data.response[0];
  //             //  var day = universities[ref.University].UnivName
  //             temp.university = universities[ref.University - 1].UnivName;
  //             temp.degreePursuing = degrees[ref.CurrentPursuingDegree].Level;
  //             temp.major = majors[ref.Major - 1].MajorName;
  //             temp.bio = ref.Bio;
  //             temp.gradYear = Number(ref.GraduationYear);
  //
  //             temp.phoneNumber = ref.PhoneNumber;
  //             temp.professional_accounts = ref.Links;
  //             temp.git = ref.Links;
  //             // temp.email = mail;
  //             // temp.name = name;
  //             // temp.lastName = surName;
  //
  //             lol.setState({ user: temp });
  //           }
  //         })
  //
  //         .fail((jqxhr, settings, ex) => {
  //           const dan = JSON.parse(jqxhr.responseText);
  //           if (dan.message === 'unauthorized access') {
  //
  //           }
  //         });
  //     }
  //   })
  //   .fail((jqxhr, settings, ex) => {
  //     const dan = JSON.parse(jqxhr.responseText);
  //     if (dan.message === 'unauthorized access') {
  //
  //     }
  //   });
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp(`${name}=([^;]+)`));
  if (match) return match[1];
  return '';
}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { readOnly: true, updating: true, user: {} };
    this._click = this._click.bind(this);
    this._updateInfo = this._updateInfo.bind(this);
    // Run all initial post and get requests here
    mount(this);
  }


  _click() {
    this.setState(prevState => ({ readOnly: !prevState.readOnly }));
  }


  _updateInfo() {
    const haha = this;

    const u = {
      University: $('#profile_university').val(),
      Major: $('#profile_major').val(),
      GraduationYear: $('#profile_gradYear').val(),
      CurrentPursuingDegree: $('#profile_currentDegree').val(),
      HighestDegreeLevel: 'Masters',
      Skills: 'No Skills',
      Projects: 'No Projects',
      Bio: $('#profile_bio').val(),
      PhoneNumber: $('#profile_phoneNumber').val(),
      Links: $('#profile_github').val(),
    };


    alert($('#profile_gradYear').val());

    const cookie = getCookie('token');


    this.setState(prevState => ({ readOnly: !prevState.readOnly }));
    $.ajax({
      type: 'POST',
      headers: { authorization: cookie },
      url: '/api/updateStudentDetails',
      data: u,
      success(msg) {
        console.log('successful update');
        mount(haha);
      },
      failure(msg) {
        console.log('shit failed');
      },
    });


    const config = {
      headers: { 'authorization': cookie, 'content-type': 'multipart/form-data' },
    };


    const file = $('#profile_resume')[0].files[0];
    const formData = new FormData();
    formData.append('resume', file);
    $.ajax({
      url: '/api/uploadResume',
      type: 'POST',
      data: formData,
      headers: { Authorization: cookie },
      encType: 'multipart/form-data',
      cache: false,
      contentType: false,

      processData: false,

      success(data, textStatus, jqXHR) {
        alert('yes');
      },
    });

    const file2 = $('#profile_cv')[0].files[0];
    const form = new FormData();
    form.append('coverletter', file2);


    $.ajax({
      url: '/api/uploadCoverLetter',
      type: 'POST',
      data: form,
      headers: { Authorization: cookie },
      encType: 'multipart/form-data',
      cache: false,
      contentType: false,

      processData: false,

      success(data, textStatus, jqXHR) {
        alert('yes');
      },
    });
  }


  onTodoChange(value) {
    const temp = this.user;
    temp.email = value;
    this.setState({
      user: value,
    });
  }
  onTodoChange2(value) {
    const temp = this.user;
    temp.phoneNumber = value;
    this.setState({
      user: value,
    });
  }
  onTodoChange3(value) {
    const temp = this.user;
    temp.phoneNumber = value;
    this.setState({
      user: value,
    });
  }
  onTodoChange4(value) {
    const temp = this.user;
    temp.university = value;
    this.setState({
      user: value,
    });
  }
  onTodoChange5(value) {
    const temp = this.user;
    temp.bio = value;
    this.setState({
      user: value,
    });
  }
  onTodoChange6(value) {
    const temp = this.user;
    temp.major
            = value;
    this.setState({
      user: value,
    });
  }
  onTodoChange7(value) {
    const temp = this.user;
    temp.gradYear = value;
    this.setState({
      user: value,
    });
  }
  onTodoChange8(value) {
    const temp = this.user;
    temp.coverLetter = value;
    this.setState({
      user: value,
    });
  }
  onTodoChange9(value) {
    const temp = this.user;
    temp.resume = value;
    this.setState({
      user: value,
    });
  }
  onTodoChange10(value) {
    const temp = this.user;
    temp.professional_accounts.github = value;
    this.setState({
      user: value,
    });
  }
  onTodoChange11(value) {
    const temp = this.user;
    temp.professional_accounts.linkedin = value;
    this.setState({
      user: value,
    });
  }
  onTodoChange12(value) {
    const temp = this.user;
    temp.professional_accounts.facebook = value;
    this.setState({
      user: value,
    });
  }


  render() {
    return (
      <div>
        <Container className='pad-top'>
          <Form>
            <FormGroup row>
              <Col>
                <Media className='col-form-label'>
                  <Media object className='profile-image' src='./img/zack.jpg' />
                </Media>
              </Col>
              <Col>
                <h4 onChange={e => this.onTodoChange(e.target.value)} >
                  {this.state.user.first_name } {this.state.user.lastName}
                </h4>
                <h4 />
                <Input className='profile-input align-middle' onChange={e => this.onTodoChange(e.target.value)} id='profile_email' type='email' value={this.state.user.email} readOnly />
                <Input className='profile-input align-middle' onChange={e => this.onTodoChange2(e.target.value)} id='profile_phoneNumber' type='text' value={this.state.user.phoneNumber} readOnly={this.state.readOnly} />
                <Input className='profile-input align-middle' onChange={e => this.onTodoChange3(e.target.value)} id='profile_university' type='select' value={this.state.user.university} readOnly={this.state.readOnly}>
                  {universities.map((university, index) => <option key={index}>{university.UnivName}</option>)}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Input className='profile-input align-middle' id='profile_bio' onChange={e => this.onTodoChange4(e.target.value)} type='textarea' name='bio' value={this.state.user.bio} readOnly={this.state.readOnly} />
            </FormGroup>
            <FormGroup row>
              <Col>
                <Label className='col-form-label' for='profile_major'>Major</Label>
              </Col>
              <Col>
                <Input id='profile_major' type='select' className='profile-input align-middle' onChange={e => this.onTodoChange5(e.target.value)} value={this.state.user.major} readOnly={this.state.readOnly}>
                  {majors.map((major, index) => <option key={index}>{major.MajorName}</option>)}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col>
                <Label className='col-form-label' for='profile_currentDegree'>Current Degree Pursuing</Label>
              </Col>
              <Col>
                <Input id='profile_currentDegree' type='select' className='profile-input align-middle'onChange={e => this.onTodoChange6(e.target.value)} value={this.state.user.degreePursuing} readOnly={this.state.readOnly}>
                  {degrees.map((degree, index) => <option key={index}>{degree.Level}</option>)}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col>
                <Label className='col-form-label' for='profile_gradYear'>Grad Year</Label>
              </Col>
              <Col>
                <Input id='profile_gradYear' type='text' className='profile-input align-middle' onChange={e => this.onTodoChange7(e.target.value)} value={this.state.user.gradYear} readOnly={this.state.readOnly} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col>
                <Label className='col-form-label' for='profile_cv'>Cover Letter</Label>
              </Col>
              <Col>
                <Input id='profile_cv' type='file' accept='application/pdf' className='profile-input align-middle' onChange={e => this.onTodoChange8(e.target.value)} value={user.coverLetter} readOnly={this.state.readOnly} />
              </Col>

            </FormGroup>
            <FormGroup row>
              <Col>
                <Label className='col-form-label' for='profile_resume'>Resume</Label>
              </Col>
              <Col>

                <Input id='profile_resume' type='file' accept='application/pdf' className='profile-input align-middle' onChange={e => this.onTodoChange9(e.target.value)} value={user.resume} readOnly={this.state.readOnly} />

              </Col>
            </FormGroup>

            <FormGroup row>
              <Col>
                <Label className='col-form-label' for='profile_github'>github</Label>
              </Col>
              <Col>
                <Input id='profile_github' type='text' className='profile-input align-middle' onChange={e => this.onTodoChange10(e.target.value)} value={this.state.user.git} readOnly={this.state.readOnly} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col>
                <Label className='col-form-label' for='profile_linkedin'>LinkedIn</Label>
              </Col>
              <Col>
                <Input id='profile_linkedin' type='text' className='profile-input align-middle' onChange={e => this.onTodoChange11(e.target.value)} value={user.professional_accounts.linkedin} readOnly={this.state.readOnly} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col>
                <Label className='col-form-label' for='profile_facebook'>Facebook</Label>
              </Col>
              <Col>
                <Input id='profile_facebook' type='text' className='profile-input align-middle' onChange={e => this.onTodoChange12(e.target.value)} value={user.professional_accounts.facebook} readOnly={this.state.readOnly} />
              </Col>
            </FormGroup>
            <br />
            <FormGroup row>
                            Skills
            </FormGroup>
            <br />
            <FormGroup row>
                            Applications
            </FormGroup>
            <FormGroup row hidden={!this.state.readOnly}>
              <Col>
                <Button onClick={() => { this._click(); }} className='col-form-label'>
                                    Edit Profile
                </Button>
              </Col>
            </FormGroup>
            <FormGroup row hidden={this.state.readOnly}>
              <Col>
                <Button onClick={() => { this._updateInfo(); }} className='col-form-label'>
                                    Save Changes
                </Button>
              </Col>
              <Col>
                <Button onClick={this._click}>
                                    Deactivate Account
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default Profile;
