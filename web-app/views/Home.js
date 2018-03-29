import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Loader} from 'semantic-ui-react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import {
    Container,
    Grid,
    Header,
    Image,
    List,
    Segment,
    Button,
    Rating,
    Table,
} from 'semantic-ui-react';


import MenuContainer from '../containers/MenuContainer';
import AdminDashboard from '../views/AdminDashboard';


var jobs = [];

class Home extends Component {
    constructor(props) {
        super(props);
        this.getHomeComponent = this.getHomeComponent.bind(this);

        this.state = {
            jobs: [],
        };
    }


    componentDidMount() {

        let day = document.cookie.substr(6);
        const AuthStr = 'Bearer '.concat(day);

        axios.get(`api/getEveryJobAndDetail`, {headers: {authorization: AuthStr}})
            .then(res => {

                this.setState({jobs: res.data.response})
            })
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
                    <Link to={`/company/${job.idCompany}/jobInfo/${job.idJobs}`}><h1>{job.CompanyName}</h1></Link>
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

                <Grid celled verticalAlign='center'>
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
