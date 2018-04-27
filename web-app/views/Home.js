import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Loader, Grid, Header, Card, Button, Modal, Input } from 'semantic-ui-react';


import MenuContainer from '../containers/MenuContainer';
import AdminDashboard from '../views/AdminDashboard';

import {getEveryJobAndDetail, apply} from '../helpers/api'


class Home extends Component {

    constructor(props) {
        super(props);
        this.getHomeComponent = this.getHomeComponent.bind(this);
        this.showSupp = this.showSupp.bind(this);
        this.hideSupp = this.hideSupp.bind(this);
        this.suppApply = this.suppApply.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            jobs: [],
            openModal: false,
            idJob: '',
            supplementaryQ: '',
            supplementaryA: ''
        };
    }

    componentDidMount() {
        getEveryJobAndDetail((res) => {
                if (res) {
                    var jobsRes = res.data.response;
                    for (var i = 0; i < jobsRes.length; i++) {
                        jobsRes[i].applied = 0;
                    }
                    console.log('jobs: ' + jobsRes);
                    this.setState({jobs: jobsRes})
                }
            }
        );
    }

    showSupp(e, { idjob }) {
        var jobs = this.state.jobs;
        for (var i = 0; i < jobs.length; i++) {
            if (jobs[i].idJobs == idjob) {
                if (jobs[i].SupplementaryQs == "") {
                    apply(jobs[i].idJobs);
                    break;

                } else {
                    var stateVars = {
                        openModal: true,
                        supplementaryQ: jobs[i].SupplementaryQs,
                        idJob: idjob,
                    };
                    this.setState(stateVars);
                    break;
                }
            }
        }
    }

    apply(idJobs) {
        apply((res) => {
            if (!res) {
                console.log('Could not apply for job');
            } else {
                console.log('Applied');
            }
        })
    }

    suppApply() {
        var jobs = this.state.jobs;
        for (var i = 0; i < jobs.length; i++) {
            if (jobs[i].idJobs == this.state.idJob) {
                jobs[i].applied = 1;
                console.log('suppApply: ' + this.state.supplementaryA);
                var stateVars = {
                    jobs: jobs,
                    idJob: '',
                    openModal: false,
                    supplementaryQ: '',
                    supplementaryA: ''
                }
                this.setState(stateVars);
                break;
            }
        }
    }

    handleChange(e, { name, value }) {
        this.setState({ [ name ]: value });
    }

    hideSupp() {
        this.setState({
            openModal: false,
            idJob: '',
            supplementaryQ: '',
            supplementaryA: ''
        });
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
          const jobs = this.state.jobs;
          const jobListItems = jobs.map(job =>
              <Grid.Row stretched key={job.idJobs}>
                <Grid.Column width={5}>
                  <Link to={`/company/${job.idCompany}`}><h1>{job.CompanyName}</h1></Link>
                  {job.JobName}
                </Grid.Column>
                <Grid.Column width={8}>
                  <h3> {job.Description}</h3> {job.SupplementaryQs != '' ? <span style={{textAlign: "right"}}>Supplementary Q Required</span> : null}
                  {job.type}<br/>
                  Deadline: {job.Deadline}
                </Grid.Column>
                <Grid.Column width={3}>
                    {job.idApplication == null ? <Button primary idjob={job.idJobs} onClick={this.showSupp}>Apply</Button> : <Button positive idjob={job.idJobs} disabled>Applied</Button>}
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
                    <Modal size='small' open={this.state.openModal} onClose={this.hideSupp}>
                        <Modal.Header>
                            Please Answer The Following Supplementary Question To Complete This Application
                        </Modal.Header>
                        <Modal.Content>
                            <p>{this.state.supplementaryQ}</p>
                            <Input fluid name='supplementaryA' placeholder='Answer...' onChange={this.handleChange}/>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button negative onClick={this.hideSupp}>
                                No
                            </Button>
                            <Button positive icon='checkmark' labelPosition='right' content='Apply' onClick={this.suppApply}/>
                        </Modal.Actions>
                    </Modal>
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
