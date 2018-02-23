
var allMajors = "http://localhost:3001/api/getMajors";
var allDegress = "http://localhost:3001/api/getDegrees";
var url = "http://localhost:3001/api/updateStudentDetails";
var allUnis = "http://localhost:3001/api/getUniversityList";

var getStudentInfo = "http://localhost:3001/api/getStudentDetails";

var userDetailsUrl = "http://localhost:3001/api/getUserDetails";

var majors = [];
var degrees = [];
var universities = [];

import $ from 'jquery';
import axios, { post } from 'axios';
import React, { Component } from 'react';

var name;
var surName;
var mail;


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
    firstName: '',
    lastName: '',
    university: 'Purdue University',
    bio: '',
    major: 'Computer Science',
    degreePursuing: 'Bachelor of Science',
    gradYear: "",
    coverLetter: '',
    resume: '',
    email: '',
    phoneNumber: '',
    professional_accounts: {'github': 'github.com/', 'linkedin': 'linkedin.com/', 'facebook': 'facebook.com/'},
    skills: [],
    applications: []
};




function onResumeSubmit(e) {
alert("HEY, I DO WORK");

}



function  mount(yo) {
    var lol = yo;
    var cookie = getCookie("token");

    $.ajax({
        type: 'GET',
        headers: {'authorization': cookie},
        url: userDetailsUrl,
        data: [],

    })

        .done(function (data, status, xhr) {

            if (data.message === "Success") {

                let ref = data.response;
                name = ref.FirstName;
                surName = ref.LastName;
                mail = ref.EmailID;

                var terra = yo.state.user;
                terra.firstName = name;
                terra.lastName = surName;
                terra.email = mail;
                yo.setState({user:terra});





            }
        })

        .fail(function (jqxhr, settings, ex) {
            var dan = JSON.parse(jqxhr.responseText);
            if (dan.message === "unauthorized access") {

            }
        });









    $.get(allDegress, {}, function (data, status, xhr) {
    })
        .done(function (data, status, xhr) {
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


                //last call
                var cookie = getCookie("token");



                $.ajax({
                    type: 'GET',
                    headers: {'authorization': cookie},
                    url: getStudentInfo,
                    data: [],

                })

                    .done(function (data, status, xhr) {

                        if (data.message === "Success") {
                            let temp = lol.state.user;


                            let ref = data.response[0];
                            //  var day = universities[ref.University].UnivName
                            temp.university = universities[ref.University-1].UnivName;
                            temp.degreePursuing = degrees[ref.CurrentPursuingDegree].Level;
                            temp.major = majors[ref.Major-1].MajorName;
                            temp.bio = ref.Bio;
                            temp.gradYear = Number(ref.GraduationYear);

                            temp.phoneNumber = ref.PhoneNumber;
                           // temp.email = mail;
                           // temp.name = name;
                           // temp.lastName = surName;

                            lol.setState({user:temp});



                        }
                    })

                    .fail(function (jqxhr, settings, ex) {
                        var dan = JSON.parse(jqxhr.responseText);
                        if (dan.message === "unauthorized access") {

                        }
                    })
            }
        })
        .fail(function (jqxhr, settings, ex) {
            var dan = JSON.parse(jqxhr.responseText);
            if (dan.message === "unauthorized access") {

            }
        });
}

function getCookie(name) {
    var match = document.cookie.match(new RegExp(name + '=([^;]+)'));
    if (match) return match[1];
    else return "";
}

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {readOnly: true, updating: true, user: {}};
        this._click = this._click.bind(this);
        this._updateInfo = this._updateInfo.bind(this);
        //Run all initial post and get requests here
        mount(this)


    }


    _click() {

        this.setState(prevState => ({readOnly: !prevState.readOnly}))
    }


    _updateInfo() {
        var haha = this

        var u = {
            University: $('#profile_university').val(),
            Major: $('#profile_major').val(),
            GraduationYear: $('#profile_gradYear').val(),
            CurrentPursuingDegree: $('#profile_currentDegree').val(),
            HighestDegreeLevel: 'Masters',
            Skills: 'No Skills',
            Projects: 'No Projects',
            Bio: $('#profile_bio').val(),
            PhoneNumber: $('#profile_phoneNumber').val(),
            Links: $('#profile_github').val()
        };


        alert($('#profile_gradYear').val());

        var cookie = getCookie("token");


        this.setState(prevState => ({readOnly: !prevState.readOnly}));
        $.ajax({
            type: 'POST',
            headers: {'authorization': cookie},
            url: 'http://localhost:3001/api/updateStudentDetails',
            data: u,
            success: function (msg) {
                console.log("successful update");
               mount(haha)

            },
            failure: function (msg) {
                console.log("shit failed");
            }
        });




        const config = {
            headers: {'authorization': cookie, 'content-type': 'multipart/form-data'}
        };





        var file =  $('#profile_resume')[0].files[0];
        var formData = new FormData();
        formData.append('resume', file);
        $.ajax({
            url: "http://localhost:3001/api/uploadResume",
            type: 'POST',
            data: formData,
            headers: {'Authorization': cookie},
            encType: 'multipart/form-data',
            cache: false,
            contentType: false,

            processData: false,

            success: function (data, textStatus, jqXHR) {
                alert("yes");

            }
        });

        var file2 =  $('#profile_cv')[0].files[0];
        var form = new FormData();
        form.append('coverletter', file2);



        $.ajax({
            url: "http://localhost:3001/api/uploadCoverLetter",
            type: 'POST',
            data: form,
            headers: {'Authorization': cookie},
            encType: 'multipart/form-data',
            cache: false,
            contentType: false,

            processData: false,

            success: function (data, textStatus, jqXHR) {
                alert("yes");

            }
        });




    }


     onTodoChange(value){
         let temp = this.user;
        temp.email = value
        this.setState({
            user:value
        });
    }
    onTodoChange2(value){
        let temp = this.user;
        temp.phoneNumber = value
        this.setState({
            user:value
        });
    }
    onTodoChange3(value){
        let temp = this.user;
        temp.phoneNumber = value
        this.setState({
            user:value
        });
    }
    onTodoChange4(value){
        let temp = this.user;
        temp.university = value
        this.setState({
            user:value
        });
    }
    onTodoChange5(value){
        let temp = this.user;
        temp.bio = value
        this.setState({
            user:value
        });
    }
    onTodoChange6(value){
        let temp = this.user;
        temp.major
            = value
        this.setState({
            user:value
        });
    }
    onTodoChange7(value){
        let temp = this.user;
        temp.gradYear = value;
        this.setState({
            user:value
        });
    }
    onTodoChange8(value){
        let temp = this.user;
        temp.coverLetter = value
        this.setState({
            user:value
        });
    }
    onTodoChange9(value){
        let temp = this.user;
        temp.resume = value
        this.setState({
            user:value
        });
    }
    onTodoChange10(value){
        let temp = this.user;
        temp.professional_accounts["github"] = value
        this.setState({
            user:value
        });
    }
    onTodoChange11(value){
        let temp = this.user;
        temp.professional_accounts["linkedin"] = value
        this.setState({
            user:value
        });
    }
    onTodoChange12(value){
        let temp = this.user;
        temp.professional_accounts["facebook"] = value
        this.setState({
            user:value
        });
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
                                <h4 onChange={e => this.onTodoChange(e.target.value)} >
                                     {this.state.user.firstName } {this.state.user.lastName}
                                </h4>
                                <h4>
                                </h4>
                                <Input className="profile-input align-middle"  onChange={e => this.onTodoChange(e.target.value)} id="profile_email" type="email" value={this.state.user.email} readOnly/>
                                <Input className="profile-input align-middle" onChange={e => this.onTodoChange2(e.target.value)}  id="profile_phoneNumber" type="text" value={this.state.user.phoneNumber} readOnly={this.state.readOnly}/>
                                <Input className="profile-input align-middle" onChange={e => this.onTodoChange3(e.target.value)}  id="profile_university" type="select" value={this.state.user.university} readOnly={this.state.readOnly}>
                                    {universities.map(function(university, index){
                                        return <option key={ index }>{university.UnivName}</option>;
                                    })}
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Input className="profile-input align-middle" id="profile_bio" onChange={e => this.onTodoChange4(e.target.value)} type="textarea" name="bio" value={this.state.user.bio} readOnly={this.state.readOnly} />
                        </FormGroup>
                        <FormGroup row>
                            <Col>
                                <Label className="col-form-label" for="profile_major">Major</Label>
                            </Col>
                            <Col>
                                <Input id="profile_major" type="select" className="profile-input align-middle" onChange={e => this.onTodoChange5(e.target.value)} value={this.state.user.major} readOnly={this.state.readOnly}>
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
                                <Input id="profile_currentDegree" type="select" className="profile-input align-middle"onChange={e => this.onTodoChange6(e.target.value)}  value={this.state.user.degreePursuing} readOnly={this.state.readOnly}>
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
                                <Input id="profile_gradYear" type="text" className="profile-input align-middle" onChange={e => this.onTodoChange7(e.target.value)}  value={this.state.user.gradYear} readOnly={this.state.readOnly}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col>
                                <Label className="col-form-label" for="profile_cv">Cover Letter</Label>
                            </Col>
                            <Col>
                                <Input id="profile_cv" type="file" accept="application/pdf" className="profile-input align-middle" onChange={e => this.onTodoChange8(e.target.value)} value={user.coverLetter} readOnly={this.state.readOnly}/>
                            </Col>

                        </FormGroup>
                        <FormGroup row>
                            <Col>
                                <Label className="col-form-label" for="profile_resume">Resume</Label>
                            </Col>
                            <Col>

                                <Input id="profile_resume" type="file" accept="application/pdf" className="profile-input align-middle" onChange={e => this.onTodoChange9(e.target.value)} value={user.resume} readOnly={this.state.readOnly}/>

                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col>
                                <Label className="col-form-label" for="profile_github">github</Label>
                            </Col>
                            <Col>
                                <Input id="profile_github" type="text" className="profile-input align-middle" onChange={e => this.onTodoChange10(e.target.value)} value={user.professional_accounts["github"]} readOnly={this.state.readOnly}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col>
                                <Label className="col-form-label" for="profile_linkedin">LinkedIn</Label>
                            </Col>
                            <Col>
                                <Input id="profile_linkedin" type="text" className="profile-input align-middle" onChange={e => this.onTodoChange11(e.target.value)} value={user.professional_accounts["linkedin"]} readOnly={this.state.readOnly}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col>
                                <Label className="col-form-label" for="profile_facebook">Facebook</Label>
                            </Col>
                            <Col>
                                <Input id="profile_facebook" type="text" className="profile-input align-middle" onChange={e => this.onTodoChange12(e.target.value)} value={user.professional_accounts["facebook"]} readOnly={this.state.readOnly}/>
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
