import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Loader} from 'semantic-ui-react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import {
    Grid,
    Button,
} from 'semantic-ui-react';


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
            return (<h1>Head Recruiter Home Page</h1>);
        } else if (this.props.user.isAdmin) {
            return (<AdminDashboard/>);
        } else if (this.props.user.isStudent) {
            return (<h1>Student Home Page</h1>);
        }
        return (<h1>Recruiter Home Page</h1>);
    }

    render() {

        const {jobs} = this.state;

        const jobListItems = jobs.map(job =>
            <Grid.Row stretched>
                <Grid.Column width={5}>
                    <Link to={`/company/${job.idCompany}/job/${job.idJobs}`}><h1>{job.CompanyName}</h1></Link>
                    {job.JobName}
                </Grid.Column>
                <Grid.Column width={8}>
                    <h3> {job.Description}</h3>
                    {job.type}<br/>
                    Deadline: {job.Deadline}
                </Grid.Column>
                <Grid.Column width={3}>
                    <Button primary>Apply</Button>
                </Grid.Column>
            </Grid.Row>
        );


        return (
            <div>
                <MenuContainer loggedIn>
                    {this.getHomeComponent()}
                </MenuContainer>
                <div>
                </div>

                <Grid celled>
                    {jobListItems}
                </Grid>


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
