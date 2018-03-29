import React, { Component } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getCompanyDetails, getRecruiters } from '../helpers/api';

import MenuContainer from '../containers/MenuContainer';
import CompanyInfo from '../components/CompanyInfo';
import Recruiters from '../components/Recruiters';

class Company extends Component {
  constructor(props) {
    super(props);
    this.getCompanyComponent = this.getCompanyComponent.bind(this);
    this.companyId = this.props.match.params.companyId;
    this.state = {
      companyDetails: {},
      companyRecruiters: [],
    };
  }

  componentWillMount() {
    getCompanyDetails(this.companyId, (res, err) => {
      if (res) {
        this.setState({
          companyDetails: res.data.response,
        });
      } else {
        console.log(err);
      }
    });

    getRecruiters(this.companyId, (res, err) => {
      if (res) {
        this.setState({
          companyRecruiters: res.data.response,
        });
      } else {
        console.log(err);
      }
    });
  }
  getCompanyComponent() {
    console.log(this.state.companyRecruiters);
    if (Object.keys(this.props.user).length === 0 && this.props.user.constructor === Object) {
      return (<Loader size='massive' style={{ marginTop: '4em' }} active inline='centered'>Loading Content</Loader>);
    } else if (this.props.user.isHeadRecruiter) {
      return (<h1>Head Recruiter Company</h1>);
    } else if (this.props.user.isAdmin) { // IS ADMIN
      return (
        <Recruiters companyRecruiters={this.state.companyRecruiters} />
      );
    } else if (this.props.user.isStudent) {
      return (<h1>Student Company</h1>);
    }
    return (<h1>Recruiter Company</h1>);
  }

  render() {
    return (
      <MenuContainer loggedIn>
        <CompanyInfo companyDetails={this.state.companyDetails} />
        <Grid centered columns={2}>
          {this.getCompanyComponent()}
        </Grid>
      </MenuContainer>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  null,
)(Company);
