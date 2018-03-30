import React, {Component} from 'react';
import {Form} from 'semantic-ui-react';

import MenuContainer from '../containers/MenuContainer';

import {getCompanyDetails, getJobDetails} from '../helpers/api'

class JobInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        console.log(this.props.match.params.jobId);


        this.state = {
            jobDescr: {},
            companyName: "",
        };
    }

    componentDidMount() {


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
            </MenuContainer>
        );
    }
}

export default JobInfo;
