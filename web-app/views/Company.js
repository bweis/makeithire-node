import React, { Component } from 'react';
import { getUserDetails } from '../helpers/api';
import { getCompanyList } from '../helpers/api';
import { getCookie } from '../helpers/utils';
import MenuContainer from '../containers/MenuContainer';
import CompanyInfo from '../components/CompanyInfo';
import JobListing from '../components/JobListing'


import { Form, Grid, Image, Input } from 'semantic-ui-react'



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
    this.state = { readOnly: true, modal: false , type: -1, company: {} };
  }

  render() {

    return (
      <MenuContainer loggedIn>
          <CompanyInfo {...this.props}/>
          <JobListing {...this.props}/>
      </MenuContainer>
    );
  }
}

export default Company;
