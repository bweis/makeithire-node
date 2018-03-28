import React, { Component } from 'react';
import { getUserDetails } from '../helpers/api';
import { getCompanyList } from '../helpers/api';
import { getCookie } from '../helpers/utils';
import MenuContainer from '../containers/MenuContainer';
import CompanyInfo from '../components/CompanyInfo';
import JobListing from '../components/JobListing'

import Recruiters from '../components/Recruiters'

import { Grid } from 'semantic-ui-react';

class Company extends Component {
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
    this.state = { accountType: 1 };
    this.getDisplayTiles = this.getDisplayTiles.bind(this);
  }

  getDisplayTiles() {
    if (this.state.accountType == 0) {
      return (
          <Grid centered columns={2} padded>
            <JobListing {...this.props}/>
          </Grid>
      );
    }
    else if (this.state.accountType == 1 || this.state.accountType == 2) {
      return (
          <Grid centered columns={2} padded>
            <JobListing {...this.props}/>
            <Recruiters {...this.props}/>
          </Grid>
      );
    } else {
      return (
          <Grid centered columns={2} padded>
            <Recruiters {...this.props}/>
          </Grid>
      );
    }
  }

  render() {

    return (
      <MenuContainer loggedIn>
          <CompanyInfo {...this.props}/>
        {this.getDisplayTiles()}
      </MenuContainer>
    );
  }
}

export default Company;
