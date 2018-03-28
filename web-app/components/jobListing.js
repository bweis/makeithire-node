/**
 * Created by Zack on 3/27/18.
 */
import React, { Component } from 'react';
import { getUserDetails } from '../helpers/api';
import { getCompanyList } from '../helpers/api';
import { getCookie } from '../helpers/utils';

import { Form, Grid, Image, Input, Card } from 'semantic-ui-react'

const jobs = [
    {
        jobID: 0,
        title: 'Software Engineering',
        type: 'Full-Time',
        description: 'blah blah blah description'
    },
    {
        jobID: 1,
        title: 'Software Engineering',
        type: 'Internship',
        description: 'blah blah blah description'
    },
    {
        jobID: 2,
        title: 'Marketing',
        type: 'Full-Time',
        description: 'blah blah blah description'
    },
    {
        jobID: 3,
        title: 'Sales',
        type: 'Part-Time',
        description: 'blah blah blah description'
    },
    {
        jobID: 4,
        title: 'Infrastructure',
        type: 'Full-Time',
        description: 'blah blah blah description'
    },
];

class CompanyInfo extends Component {
    /*
     constructor(props) {
     super(props);
     }
     componentWillMount(props) {
     company = companies.find(o => o.companyId == props.location.state.companyId);
     }


     */

    constructor(props) {
        super(props);
        this.state = { readOnly: true, modal: false , isRecruiter: -1, company: {} };
        this.makeTiles = this.makeTiles.bind(this);
    }

    _click() {
        this.setState(prevState => ({ readOnly: !prevState.readOnly }));
    }

    makeTiles() {
        return jobs.map((item, index) => (
            <Card fluid header={item.title} meta={item.type} description={item.description} />
        ));
    }

    render() {
        return (
            <Grid centered columns={2}>
                <Grid.Column centered>
                    <Card.Group>
                        {this.makeTiles()}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        );
    }
}

export default CompanyInfo;
