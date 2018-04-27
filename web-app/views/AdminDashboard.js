import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import Companies from '../components/Companies';
import Statistics from '../components/Statistics';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('Admin Dash', this.props);
    return (
      <Grid centered columns={2} padded>
        <Statistics {...this.props}/>
        <Companies {...this.props}/>
      </Grid>
    );
  }
}

export default AdminDashboard;
