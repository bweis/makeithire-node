import React, {Component} from 'react';
import {Link, Switch, Route, Redirect, BrowserHistory} from 'react-router-dom';
import {
    Container,
    ListGroup,
    ListGroupItemHeading,
    ListGroupItem
} from 'reactstrap';

var jobs = [
    {
        id: "1",
        job_title: "Software Engineer - Front End",
        type: "Internship",
        company: "Google",
        company_id: 1,
        location: "New York, NY",
        deadline: "2018-02-20",
        supplementary: true
    },
    {
        id: "2",
        job_title: "Software Engineer - Back End",
        type: "Full-time",
        company: "Google",
        company_id: 1,
        location: "San Francisco, CA",
        deadline: "2018-02-21",
        supplementary: false
    },
    {
        id: "3",
        job_title: "Marketing",
        type: "Full-time",
        company: "LinkedIn",
        company_id: 2,
        location: "Chicago, IL",
        deadline: "2018-02-28",
        supplementary: false

    },
    {
        id: "4",
        job_title: "Software Engineer",
        type: "Internship",
        company: "Google",
        company_id: 1,
        location: "New York, NY",
        deadline: "2018-02-28",
        supplementary: true

    },
    {
        id: "5",
        job_title: "IOS Developer",
        company: "Robinhood",
        company_id: 3,
        type: "Full-time",
        location: "San Francisco, CA",
        deadline: "2018-03-01",
        supplementary: false

    },
    {
        id: "6",
        job_title: "Sales Representative",
        company: "Robinhood",
        company_id: 3,
        type: "Full-time",
        location: "Chicago, IL",
        deadline: "2018-03-01",
        supplementary: true

    },
    {
        id: "7",
        job_title: "Software Engineer",
        type: "Internship",
        company: "Salesforce",
        company_id: 4,
        location: "Indianapolis, IN",
        deadline: "2018-03-05",
        supplementary: true

    },
    {
        id: "8",
        job_title: "Software Engineering Internship",
        type: "Full-time",
        company: "Salesforce",
        company_id: 4,
        location: "New York, NY",
        deadline: "2018-03-05",
        supplementary: false
    },
];

class JobPostings extends Component {

//<Link to={{ pathname: '/company', state: { companyId: job.companyId} }}>

    render() {
        const jobListItems =  jobs.map((job) =>
            <ListGroupItem key={job.id}>

                    {job.company} {job.job_title} {job.type} {job.location} {job.deadline}
            </ListGroupItem>);

        return (
            <div>
                <Container>
                    <ListGroup className="homepage">
                        {jobListItems}
                    </ListGroup>
                </Container>
            </div>
        )
    }
}

export default JobPostings;