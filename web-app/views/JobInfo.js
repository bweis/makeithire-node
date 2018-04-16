import React, {Component} from 'react';
import {Form, Grid, Card, Header, Input, Button} from 'semantic-ui-react';

import MenuContainer from '../containers/MenuContainer';

import {getCompanyDetails, getJobDetails, getApplicants, getUserDetails} from '../helpers/api'

class JobInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        console.log(this.props.match.params.jobId);
        this.getApps = this.getApps.bind(this);
        this.state = {
            isRecruiter: false,
            jobDescr: {
                JobName: '',
                DateAdded: '',
                Deadline: '',
                Description: '',
                Tags: ''
            },
            companyName: "",
            applicants: [],
            filter: ''
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
                this.setState({jobDescr: res.data.response[0]})


            }
        })
        
        getUserDetails((res) => {
                if (res) {
                    if (res.data.response.idCompany != 0) {
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
             <Card fluid key={item.idUser} header={item.FirstName + ' ' + item.LastName} meta={item.SubmissionDate} />
         ));

    }

    applyFilter() {
       alert('Rajat Srivastava');

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
                </Form>
                <br />
                <Grid centered>
                    <Form>
                    <Form.Input label="Filter" name="filter" placeholder="filter" />
                    <Button onClick={this.applyFilter}>Apply</Button>
                    </Form>
                    <Header size="medium">Applicants</Header>
                {this.getApps()}
                </Grid>
            </MenuContainer>
        );
    }
}

export default JobInfo;
