import React, {Component} from 'react';
import {Form, Grid, Card, Header, Input, Button, Icon} from 'semantic-ui-react';
import { Link } from 'react-router-dom';


import MenuContainer from '../containers/MenuContainer';

import {getCompanyDetails, getJobDetails, getApplicants, getUserDetails, createMessage, getStudentChats, getRecruiterChats} from '../helpers/api'

class JobInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        console.log(this.props.match.params.jobId);
        this.getApps = this.getApps.bind(this);
        this.apply = this.apply.bind(this);
        this.chat = this.chat.bind(this);
        this.state = {
            isRecruiter: true,
            jobDescr: {
                JobName: '',
                DateAdded: '',
                Deadline: '',
                Description: '',
                Tags: '',
                SupplementaryQs: ''
            },
            userInfo: {},
            SupplementaryA: '',
            companyName: "",
            applicants: [],
            filter: '',
        };
        if (this.state.isRecruiter) {
            console.log('is recruiter');
        }
    }

    componentWillMount() {

        getCompanyDetails(this.props.match.params.companyId, (res) => {
                if (res) {
                    console.log(res.data.response.CompanyName);
                    this.setState({companyName: res.data.response.CompanyName})
                }
            }
        );


        getJobDetails(this.props.match.params.jobId, (res) => {
            if (res) {
                console.log(res.data.response[0]);
                this.setState({jobDescr: res.data.response[0]});
            }
        });
        
        getUserDetails((res) => {
                if (res) {
                    if (res.data.response.idCompany != 0) {
                        console.log('recruiter');
                        this.setState({isRecruiter: true, userInfo: res.data.response})
                    }
                }
            });

        var idJob = {
            idJob: this.props.match.params.jobId
        }
        getApplicants((res) => {
            if (!res) {
                console.log('could not get applicants')
            } else {
                console.log('get applicants ' + res.data.response);
                this.setState({applicants: res.data.response})
            }
        }, idJob)

    }

    getApps() {
        console.log(this.state.applicants);
        return this.state.applicants.map((item, index) => (
             <Card fluid key={item.idUser}>
                <Card.Header>
                    <Grid>
                        <Grid.Column width={10}>
                            {item.FirstName + ' ' + item.LastName}
                        </Grid.Column>
                        <Grid.Column width={6}>
                            <Button icon="comment" style={{float: "right"}} onClick={() => this.chat(item.idUser, item.FirstName)}/>
                        </Grid.Column>
                    </Grid>
                </Card.Header>
                 <Card.Meta>
                     {item.SubmissionDate}
                 </Card.Meta>
             </Card>
         ));

    }

    componentDidMount() {
        if (this.state.userInfo) {
            console.log("getChats: " + this.state.userInfo);
            if (this.state.userInfo.idCompany == 0) {
                getStudentChats((res) => {
                    if (!res) {
                        console.log('Could not get student chats');
                    } else {
                        this.setState({chats: res.data.response});
                    }
                })
            } else {
                getRecruiterChats((res) => {
                    if (!res) {
                        console.log('Could not get recruiter chats');
                    } else {
                        this.setState({chats: res.data.response});
                    }
                })
            }
        }
    }

    applyFilter() {
       alert('Rajat Srivastava');

    }

    apply() {
        console.log('apply');

    }

    chat(idStudent, firstName) {
        var found = false;
        for (var i = 0; i < this.state.chats.length; i++) {
            if (this.state.chats[i].StudentID == idStudent) {
                this.props.history.push('/chat');
                found = true;
            }
        }
        if (!found) {
            var message = `Hi ${firstName}, this is ${this.state.userInfo.FirstName} ${this.state.userInfo.LastName} from ${this.state.companyName} and I would like to speak with you regarding the ${this.state.jobDescr.JobName} position you applied for.`;
            alert('sending message:');
            createMessage((res) => {
                if (!res) {
                    console.log('could not send message');
                } else {
                    alert('message sent');
                    var c = this.state.chats;
                    var temp = {
                        StudentID: idStudent,
                        RecruiterID: this.state.userInfo.idUser,
                    }
                    c.push(temp);
                    this.setState({chats: c});
                }
            }, idStudent, message);
        }

    }

    render() {
        return (
            <MenuContainer loggedIn>
                <h1>Job Detailed Information</h1>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Company' value={this.state.companyName} readOnly/>
                        <Form.Input fluid label='Job Title' name='title' placeholder='Job Title'
                                    value={this.state.jobDescr.JobName} readOnly/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='Job posted' name='postDate' value={this.state.jobDescr.DateAdded}
                                    readOnly/>
                        <Form.Input fluid label='Submission deadline' name='expiration'
                                    value={this.state.jobDescr.Deadline} readOnly/>
                    </Form.Group>

                    <Form.TextArea label='Job Description' placeholder='Job description...'
                                   value={this.state.jobDescr.Description} name='description' readOnly/>
                    <Form.Input label='Tags' placeholder='Tags' name='tags' value={this.state.jobDescr.Tags} readOnly/>
                    {this.state.jobDescr.SupplementaryQs && <h3>Supplementary Question</h3>}
                    {this.state.jobDescr.SupplementaryQs && <Form.TextArea label={this.state.jobDescr.SupplementaryQs} name="SupplementaryA" />}
                    {!this.state.isRecruiter && <Button positive icon='checkmark' labelPosition='right' content='Apply' onClick={this.apply}/>}
                </Form>
                <br />
                {this.state.isRecruiter && <Grid centered>
                    <Grid.Column width={8}>
                    <Form>
                    <Form.Input label="Filter" name="filter" placeholder="filter" />
                    <Button onClick={this.applyFilter}>Apply Filter</Button>
                    </Form>
                    <Header size="medium">Applicants</Header>
                        {this.getApps()}
                    </Grid.Column>
                </Grid>}
            </MenuContainer>
        );
    }
}

export default JobInfo;
