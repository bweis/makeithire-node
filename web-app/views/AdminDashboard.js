/**
 * Created by Zack on 3/28/18.
 */
import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import Companies from '../components/Companies';
import Statistics from '../components/Statistics';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid centered columns={2} padded>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Statistics />
          <Companies />
        </Segment>
      </Grid>
    );
  }
}

export default AdminDashboard;
