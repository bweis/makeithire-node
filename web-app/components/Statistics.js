import React, { Component } from 'react';
import { getCompanyList, adminGetNumUsers,
    adminGetNumJobs,
    adminGetNumApplications,
    adminNumCompany,
    adminNumStudents } from '../helpers/api';

import { Grid, Header, Card, Button, Modal, Input } from 'semantic-ui-react';

class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: '',
      users: '',
      students: '',
      applications: '',
      jobs: '',
    };
  }

    componentDidMount() {
        adminGetNumUsers((res) => {
            if (!res) {
                console.log('could not get users');
            } else {
                this.setState({users: res.data.response[0].num});
            }
        })
        adminGetNumJobs((res) => {
            if (!res) {
                console.log('could not get jobs');
            } else {
                this.setState({jobs: res.data.response[0].num});
            }
        })
        adminGetNumApplications((res) => {
            if (!res) {
                console.log('could not get applications');
            } else {
                this.setState({applications: res.data.response[0].num});
            }
        })
        adminNumCompany((res) => {
            if (!res) {
                console.log('could not get compaines');
            } else {
                this.setState({companies: res.data.response[0].num});
            }
        })
        adminNumStudents((res) => {
            if (!res) {
                console.log('could not get students');
            } else {
                this.setState({students: res.data.response[0].num});
            }
        })
    }

  render() {
    return (
      <Grid.Column >
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
            raised
          />
        </Card.Group>
        <Card.Group>
          <Card
            header='Students'
            meta='Number of Active Students'
            description={this.state.students}
            raised
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
            raised
          />
        </Card.Group>
      </Grid.Column>
    );
  }
}

export default Statistics;
