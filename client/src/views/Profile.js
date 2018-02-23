
var allMajors = "http://localhost:3001/api/getMajors";
var allDegress = "http://localhost:3001/api/getDegrees";
var url = "http://localhost:3001/api/updateStudentDetails";
var allUnis = "http://localhost:3001/api/getUniversityList";

var getStudentInfo = "http://localhost:3001/api/getStudentDetails";



var majors = [];
var degrees = [];
var universities = [];

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
    Button
} from 'reactstrap';

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

var user = {
    firstName: 'Nik',
    lastName: 'Suprunov',
    university: 'Purdue University',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    major: 'Computer Science',
    degreePursuing: 'Bachelor of Science',
    gradYear: 2018,
    coverLetter: '',
    resume: '',
    email: 'zfernand@purdue.edu',
    phoneNumber: '7609089377',
    professional_accounts: {'github': 'github.com/zfernand', 'linkedin': 'linkedin.com', 'facebook': 'facebook.com'},
    skills: [],
    applications: []
};




function getCookie(name) {
    var match = document.cookie.match(new RegExp(name + '=([^;]+)'));
    if (match) return match[1];
    else return "";
}

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {readOnly: true, updating: true};
        this._click = this._click.bind(this);
        this._updateInfo = this._updateInfo.bind(this);
        //Run all initial post and get requests here


        $.get(allDegress, {}, function (data, status, xhr) {
        })
            .done(function (data, status, xhr) {
                //   alert(data.response);
                if (data.message === "Success") {
                    degrees = data.response;
                }
            })
            .fail(function (jqxhr, settings, ex) {
                var dan = JSON.parse(jqxhr.responseText);
                if (dan.message === "unauthorized access") {
                }
            });
        $.get(allMajors, {}, function (data, status, xhr) {
        })
            .done(function (data, status, xhr) {
                //      alert(data.response);
                if (data.message === "Success") {
                    majors = data.response;
                }
            })
            .fail(function (jqxhr, settings, ex) {
                var dan = JSON.parse(jqxhr.responseText);
                if (dan.message === "unauthorized access") {
                }
            });


        $.get(allUnis, {}, function (data, status, xhr) {
        })
            .done(function (data, status, xhr) {
                if (data.message === "Success") {
                    universities = data.response;
                }
            })
            .fail(function (jqxhr, settings, ex) {
                var dan = JSON.parse(jqxhr.responseText);
                if (dan.message === "unauthorized access") {

                }
            });
        var cookie = getCookie("token");

        $.ajax({
            type: 'GET',
            headers: {'authorization': cookie},
            url: getStudentInfo,
            data: [],

        })

            .done(function (data, status, xhr) {

                if (data.message === "Success") {
                    alert(data.response);

                }
            })
            .fail(function (jqxhr, settings, ex) {
                alert("failed");
                var dan = JSON.parse(jqxhr.responseText);
                if (dan.message === "unauthorized access") {

                }
            })







    }
    _click() {
        this.setState(prevState => ({readOnly: !prevState.readOnly}))
    }



    _updateInfo() {
        var u = {
            University: $('#profile_university').val(),
            Major: $('#profile_major').val(),
            GraduationYear: $('#profile_gradYear').val(),
            CurrentPursuingDegree: $('#profile_currentDegree').val(),
            Bio: $('#profile_bio').val(),
            PhoneNumber: $('#profile_phoneNumber').val(),

        };



        console.log(u);
        var cookie = getCookie("token");
        this.setState(prevState => ({readOnly: !prevState.readOnly}));
        $.ajax({
            type: 'POST',
            headers: { 'authorization': cookie},
            url: 'http://localhost:3001/api/updateStudentDetails',
            data: u,
            success: function(msg) {
                console.log("successful update");
            },
            failure: function(msg) {
                console.log("shit failed");
            }
         });


        // $.post(url, u,function (data) {
        //
        //
        // })
        //     .done(function (data) {
        //         alert(data.message);
        //
        //     })
        //     .fail(function(data, settings, ex) {
        //
        //   //      alert(data.response);
        //     });
    }



    render() {
        return (
            <div>
                <Container className="pad-top">
                    <Form>
                        <FormGroup row>
                            <Col>
                                <Media className="col-form-label">
                                    <Media object className="profile-image" src="./img/zack.jpg" />
                                </Media>
                            </Col>
                            <Col>
                                <h4>
                                    {user.firstName} {user.lastName}
                                </h4>
                                <Input className="profile-input align-middle" id="profile_email" type="email" defaultValue={user.email} readOnly={this.state.readOnly}/>
                                <Input className="profile-input align-middle" id="profile_phoneNumber" type="text" defaultValue={user.phoneNumber} readOnly={this.state.readOnly}/>
                                <Input className="profile-input align-middle" id="profile_university" type="select" defaultValue={user.university} readOnly={this.state.readOnly}>
                                    {universities.map(function(university, index){
                                        return <option key={ index }>{university.UnivName}</option>;
                                    })}
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Input className="profile-input align-middle" id="profile_bio" type="textarea" name="bio" defaultValue={user.bio} readOnly={this.state.readOnly} />
                        </FormGroup>
                        <FormGroup row>
                            <Col>
                                <Label className="col-form-label" for="profile_major">Major</Label>
                            </Col>
                            <Col>
                                <Input id="profile_major" type="select" className="profile-input align-middle" defaultValue={user.major} readOnly={this.state.readOnly}>
                                    {majors.map(function(major, index){
                                        return <option key={ index }>{major.MajorName}</option>;
                                    })}
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col>
                                <Label className="col-form-label" for="profile_currentDegree">Current Degree Pursuing</Label>
                            </Col>
                            <Col>
                                <Input id="profile_currentDegree" type="select" className="profile-input align-middle" defaultValue={user.degreePursuing} readOnly={this.state.readOnly}>
                                    {degrees.map(function(degree, index){
                                        return <option key={ index }>{degree.Level}</option>;
                                    })}
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col>
                                <Label className="col-form-label" for="profile_gradYear">Grad Year</Label>
                            </Col>
                            <Col>
                                <Input id="profile_gradYear" type="text" className="profile-input align-middle" defaultValue={user.gradYear} readOnly={this.state.readOnly}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col>
                                <Label className="col-form-label" for="profile_cv">Cover Letter</Label>
                            </Col>
                            <Col>
                                <Input id="profile_cv" type="file" accept="application/pdf" className="profile-input align-middle" defaultValue={user.coverLetter} readOnly={this.state.readOnly}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col>
                                <Label className="col-form-label" for="profile_resume">Resume</Label>
                            </Col>
                            <Col>
                                <Input id="profile_resume" type="file" accept="application/pdf" className="profile-input align-middle" defaultValue={user.resume} readOnly={this.state.readOnly}/>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col>
                                <Label className="col-form-label" for="profile_github">github</Label>
                            </Col>
                            <Col>
                                <Input id="profile_github" type="text" className="profile-input align-middle" defaultValue={user.professional_accounts["github"]} readOnly={this.state.readOnly}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col>
                                <Label className="col-form-label" for="profile_linkedin">LinkedIn</Label>
                            </Col>
                            <Col>
                                <Input id="profile_linkedin" type="text" className="profile-input align-middle" value={user.professional_accounts["linkedin"]} readOnly={this.state.readOnly}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col>
                                <Label className="col-form-label" for="profile_facebook">Facebook</Label>
                            </Col>
                            <Col>
                                <Input id="profile_facebook" type="text" className="profile-input align-middle" defaultValue={user.professional_accounts["facebook"]} readOnly={this.state.readOnly}/>
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
                                <Button onClick={() => { this._click()}}  className="col-form-label">
                                    Edit Profile
                                </Button>
                            </Col>
                        </FormGroup>
                        <FormGroup row hidden={this.state.readOnly}>
                            <Col>
                                <Button onClick={() => { this._updateInfo()}} className="col-form-label">
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
        )
    }
}

export default Profile;
