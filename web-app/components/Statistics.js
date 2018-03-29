/**
 * Created by Zack on 3/28/18.
 */
import React, { Component } from 'react';
import { getCompanyList } from '../helpers/api';

import { Grid, Header, Card, Button, Modal, Input } from 'semantic-ui-react';

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: 5,
      users: 40,
      students: 30,
      recruiters: 10,
      applications: 0,
      jobs: 5,
    };
  }

  render() {
    return (
      <Grid.Column centered>
        <Grid.Row>
          <Header size='large'>
                        Statistics
          </Header>
        </Grid.Row>
        <Card.Group>
          <Card
            header='Companies'
            meta='Number of Active Companies'
            description={this.state.companies}
            raised
          />
          <Card
            header='Users'
            meta='Number of Active Users'
            description={this.state.users}
            rasised
          />
        </Card.Group>
        <Card.Group>
          <Card
            header='Students'
            meta='Number of Active Students'
            description={this.state.students}
            raised
          />
          <Card
            header='Recruiters'
            meta='Number of Active Recruiters'
            description={this.state.recruiters}
            rasised
          />
        </Card.Group>
        <Card.Group>
          <Card
            header='Jobs'
            meta='Number of Job Listings'
            description={this.state.jobs}
            raised
          />
          <Card
            header='Submitted Applications'
            meta='Number of Submitted Applications'
            description={this.state.applications}
            rasised
          />
        </Card.Group>
      </Grid.Column>
    );
  }
}

export default Statistics;
