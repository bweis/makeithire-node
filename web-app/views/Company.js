import React, { Component } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getCompanyDetails, getRecruiters } from '../helpers/api';

import MenuContainer from '../containers/MenuContainer';
import CompanyInfo from '../components/CompanyInfo';
import Recruiters from '../components/Recruiters';
import JobListing from '../components/JobListing';

class Company extends Component {
  constructor(props) {
    super(props);
    this.getCompanyComponent = this.getCompanyComponent.bind(this);
    this.companyId = this.props.match.params.companyId;
    this.state = {
      companyDetails: {},
      companyRecruiters: [],
      headRecruiter: {}
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
        var temp = res.data.response;
        var recs = [];
        var hr = {};
        for(var i = 0; i < temp.length; i++) {
          if(temp[i].idUser == this.state.companyDetails.idHeadRecruiter) {
            hr = temp[i];
          } else {
            recs.push(temp[i]);
          }
        }
        if (this.props.user.isHeadRecruiter) {
          this.setState({
            companyRecruiters: recs
          });
        }
        this.setState({
          companyRecruiters: recs,
          headRecruiter: hr
        });
      } else {
        console.log(err);
      }
    });
  }
  getCompanyComponent() {
    console.log(this.state.companyRecruiters);
    if (Object.keys(this.props.user).length === 0 && this.props.user.constructor === Object) {
      return (
          <Grid centered columns={2}>
            <Loader size='massive' style={{ marginTop: '4em' }} active inline='centered'>Loading Content</Loader>
          </Grid>
      );
    } else if (this.props.user.isHeadRecruiter) {
      return (
      <Grid centered columns={2}>
          <JobListing {...this.props} />
          <Recruiters companyRecruiters={this.state.companyRecruiters} headRecruiter={this.state.headRecruiter} {...this.props}/>
      </Grid>
      );
    } else if (this.props.user.isAdmin) { // IS ADMIN
      return (
          <Grid centered columns={2}>
            <Recruiters companyRecruiters={this.state.companyRecruiters} headRecruiter={this.state.headRecruiter} {...this.props}/>
          </Grid>
      );
    } else if (this.props.user.isStudent) {
      return (
          <Grid centered columns={2}>
            <JobListing {...this.props}/>
          </Grid>
      );
    }
    return (
        <Grid centered columns={2}>
          <JobListing {...this.props}/>
        </Grid>
    );
  }

  render() {
    return (
      <MenuContainer loggedIn>
        <CompanyInfo companyDetails={this.state.companyDetails} />
        {this.getCompanyComponent()}
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
