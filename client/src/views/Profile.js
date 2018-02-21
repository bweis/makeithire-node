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

var user = {
    firstName: 'Zack',
    lastName: 'Fernandez',
    university: 'Purdue University',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    major: 'Computer Science',
    degreePursuing: 'Bachelor of Science',
    gradYear: 2018,
    coverLetter: '',
    resume: '',
    email: 'zfernand@purdue.edu',
    phoneNumber: '7609089377',
    professional_accounts: [{'github': 'github.com/zfernand'}, {'linkedin': 'linkedin.com'}, {'facebook': 'facebook.com'}],
    skills: [],
    applications: []
};

var majors = [
    'Computer Science',
    'Computer Engineering',
    'Marketing',
    'Management',
    'UX/UI Design'
];

var universities = [
    'Purdue University WL - Main Campus',
    'Purdue University Kokomo',
    'Purdue University Calumet',
    'Indiana University Purdue University Indiana'

];

var degrees = [
    'Bachelor of Science',
    'Bachelor of Arts',
    'MBA',
    'PhD'
]

class Profile extends Component {
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
                                <Input className="profile-input align-middle" id="profile_email" type="email" value={user.email} readOnly/>
                                <Input className="profile-input align-middle" id="profile_phoneNumber" type="email" value={user.phoneNumber} readOnly/>
                                <Input className="profile-input align-middle" id="profile_university" type="select" value={user.university}>
                                    {universities.map(function(university, index){
                                        return <option key={ index }>{university}</option>;
                                    })}
                                </Input>


                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <p className="col-small-margin">{user.bio}</p>
                        </FormGroup>
                        <FormGroup row>
                            <Col>
                                <Label className="col-form-label" for="profile_major">Major</Label>
                            </Col>
                            <Col>
                                <Input id="profile_major" type="select" className="profile-input align-middle" value={user.major}>
                                    {majors.map(function(major, index){
                                        return <option key={ index }>{major}</option>;
                                    })}
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col>
                                <Label className="col-form-label" for="profile_currentDegree">Current Degree Pursuing</Label>
                            </Col>
                            <Col>
                                <Input id="profile_currentDegree" type="select" className="profile-input align-middle" value={user.degreePursuing}>
                                    {degrees.map(function(degree, index){
                                        return <option key={ index }>{degree}</option>;
                                    })}
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col>
                                <Label className="col-form-label" for="profile_gradYear">Grad Year</Label>
                            </Col>
                            <Col>
                                <Input id="profile_gradYear" type="text" className="profile-input align-middle" value={user.gradYear} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col>
                                <Label className="col-form-label" for="profile_cv">Cover Letter</Label>
                            </Col>
                            <Col>
                                <Input id="profile_cv" type="file" className="profile-input align-middle" value={user.coverLetter} />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col>
                                <Label className="col-form-label" for="profile_resume">Resume</Label>
                            </Col>
                            <Col>
                                <Input id="profile_resume" type="file" className="profile-input align-middle" value={user.resume} />
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
                        <FormGroup row>
                            <Col>
                                <Button className="col-form-label">
                                    Save Changes
                                </Button>
                            </Col>
                            <Col>
                                <Button>
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