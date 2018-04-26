import React, {Component} from 'react';
import {Form, Grid, Card, Header, Input, Button, Icon} from 'semantic-ui-react';
import { Link } from 'react-router-dom';


import MenuContainer from '../containers/MenuContainer';

import {getCompanyDetails, getJobDetails, getApplicants, getUserDetails} from '../helpers/api'

class JobInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        console.log(this.props.match.params.jobId);
        this.getApps = this.getApps.bind(this);
        this.apply = this.apply.bind(this);
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
                        this.state.isRecruiter = true;
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
                            <Link to="/chat">
                                <Icon name="comment" size="large" style={{float: "right"}}/>
                            </Link>
                        </Grid.Column>
                    </Grid>
                </Card.Header>
                 <Card.Meta>
                     {item.SubmissionDate}
                 </Card.Meta>
             </Card>
         ));

    }

    applyFilter() {
       alert('Rajat Srivastava');

    }

    apply() {
        console.log('apply');

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
