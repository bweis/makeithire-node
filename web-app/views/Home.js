

import {
    Grid,
    Button,
} from 'semantic-ui-react';

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';

import MenuContainer from '../containers/MenuContainer';
import AdminDashboard from '../views/AdminDashboard';

import {getEveryJobAndDetail} from '../helpers/api'


class Home extends Component {

    constructor(props) {
        super(props);
        this.getHomeComponent = this.getHomeComponent.bind(this);

        this.state = {
            jobs: [],
        };
    }


    componentDidMount() {

        getEveryJobAndDetail((res) => {
                if (res) {
                    this.setState({jobs: res.data.response})
                }
            }
        );
    }

    getHomeComponent() {
        console.log('Logging', this.props.user);
        if (Object.keys(this.props.user).length === 0 && this.props.user.constructor === Object) {
            return (
                <Loader size='massive' style={{marginTop: '4em'}} active inline='centered'>Loading Content</Loader>);
        } else if (this.props.user.isHeadRecruiter) {
            return (<Link to={'/company/' + this.props.user.idCompany}>My Company Page</Link>);
        } else if (this.props.user.isAdmin) {
            return (<AdminDashboard/>);
        } else if (this.props.user.isStudent) {
          const  { jobs } = this.state;
          const jobListItems = jobs.map(job =>
              <Grid.Row stretched>
                <Grid.Column width={5}>
                  <Link to={`/company/${job.idCompany}`}><h1>{job.CompanyName}</h1></Link>
                  {job.JobName}
                </Grid.Column>
                <Grid.Column width={8}>
                  <h3> {job.Description}</h3>
                  {job.type}<br/>
                  Deadline: {job.Deadline}
                </Grid.Column>
                <Grid.Column width={3}>
                  <Link to={`/company/${job.idCompany}/job/${job.idJobs}`}>
                    <Button primary>Apply</Button>
                  </Link>
                </Grid.Column>
              </Grid.Row>
          );
            return (
                <Grid celled>
                  {jobListItems}
                </Grid>);
        }
        return (<Link to={'/company/' + this.props.user.idCompany}>My Company Page</Link>);
    }

    render() {
        return (
            <div>
                <MenuContainer loggedIn>
                    {this.getHomeComponent()}
                </MenuContainer>
            </div>

        );
    }

}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(
    mapStateToProps,
    null,
)(Home);
