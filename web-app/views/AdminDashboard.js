/**
 * Created by Zack on 3/28/18.
 */
import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import Companies from '../components/Companies';
import Statistics from '../components/Statistics';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Grid centered columns={2} padded>
        <Statistics />
        <Companies />
      </Grid>
    );
  }
}

export default AdminDashboard;
