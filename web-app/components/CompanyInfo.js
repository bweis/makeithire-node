import React, { Component } from 'react';
import { Form, Grid, Header, Image } from 'semantic-ui-react';

class CompanyInfo extends Component {
  render() {
    const { companyDetails } = this.props;
    console.log(companyDetails);

    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <Image src='/img/google.png' size='small' circular />
          <Header as='h1' textAlign='center'>{companyDetails.CompanyName}</Header>
          <Header as='h2' textAlign='left'>Description: {companyDetails.Description}</Header>
        </Grid.Column>
      </Grid>
    );
  }
}

export default CompanyInfo;

