import _ from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Loader, Grid, Header, Card, Button, Modal, Input, Label, Search } from 'semantic-ui-react';


import MenuContainer from '../containers/MenuContainer';
import AdminDashboard from '../views/AdminDashboard';

import { getEveryJobAndDetail, apply } from '../helpers/api';


class Home extends Component {
  constructor(props) {
    super(props);
    this.getHomeComponent = this.getHomeComponent.bind(this);
    this.showSupp = this.showSupp.bind(this);
    this.hideSupp = this.hideSupp.bind(this);
    this.suppApply = this.suppApply.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
    this.state = {
      jobs: [],
      openModal: false,
      idJob: '',
      supplementaryQ: '',
      supplementaryA: '',
      results: [],
    };
  }

  componentDidMount() {
    getEveryJobAndDetail((res) => {
      if (res) {
        const jobsRes = res.data.response;
        for (let i = 0; i < jobsRes.length; i++) {
          jobsRes[i].applied = 0;
        }
        console.log(`jobs: ${jobsRes}`);
        this.setState({ jobs: jobsRes });
      }
    });
  }

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent() {
    this.setState({ isLoading: false, results: [], value: '' });
  }

  handleResultSelect(e, { result }) {
    this.setState({ value: result.title });
    console.log('click');
  }

  handleSearchChange(e, { value }) {
    this.setState({
      isLoading: true,
      value,
    });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.JobName) || re.test(result.CompanyName) || re.test(result.Tags);
      console.log('search set', this.state.jobs);
      console.log('filtered', _.filter(this.state.jobs, isMatch));
      this.setState({
        isLoading: false,
        results: _.filter(this.state.jobs, isMatch),
      });
    }, 300);
  }

  showSupp(e, { idjob }) {
    const jobs = this.state.jobs;
    for (let i = 0; i < jobs.length; i++) {
      if (jobs[i].idJobs == idjob) {
        if (jobs[i].SupplementaryQs == '') {
            console.log('in showSupp ' + jobs[i].idJobs);
          this.apply(jobs[i].idJobs);
          break;
        } else {
          const stateVars = {
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
      console.log('in apply: ' + idJobs);
    apply((res) => {
      if (!res) {
        console.log('Could not apply for job');
      } else {
        console.log('Applied');
          var j = this.state.jobs;
          for (var i = 0; i < j.length; i++) {
              if (j[i].idJobs == idJobs) {
                  j[i].idApplication = 1;
                  break;
              }
          }
          this.setState({jobs: j});
      }
    }, idJobs, "");
  }

  suppApply() {
    const jobs = this.state.jobs;
      console.log(this.state.idJob);
      apply((res) => {
          if (!res) {
              console.log('could not apply');
          } else {
              console.log('applied');
              var j = this.state.jobs;
              for (var i = 0; i < j.length; i++) {
                  if (j[i].idJobs == this.state.idJob) {
                      j[i].idApplication = 1;
                      break;
                  }
              }
              this.setState({
                  jobs: j,
                  idJob: '',
                  openModal: false,
                  supplementaryQ: '',
                  supplementaryA: '',
              });
          }
      }, this.state.idJob, this.state.supplementaryA);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  hideSupp() {
    this.setState({
      openModal: false,
      idJob: '',
      supplementaryQ: '',
      supplementaryA: '',
    });
  }


  getHomeComponent() {
    console.log('Logging', this.props.user);
    if (Object.keys(this.props.user).length === 0 && this.props.user.constructor === Object) {
      return (
        <Loader size='massive' style={{ marginTop: '4em' }} active inline='centered'>Loading Content</Loader>);
    } else if (this.props.user.isHeadRecruiter) {
      return (<Link to={`/company/${this.props.user.idCompany}`}>My Company Page</Link>);
    } else if (this.props.user.isAdmin) {
      return (<AdminDashboard />);
    } else if (this.props.user.isStudent) {
      const jobs = this.state.results.length !== 0 ? this.state.results : this.state.jobs;
      const jobListItems = jobs.map(job =>
        (<Grid.Row stretched key={job.idJobs}>
          <Grid.Column width={5}>
            <Link to={`/company/${job.idCompany}`}><h1>{job.CompanyName}</h1></Link>
            {job.JobName}<br/>
            Tags: {job.Tags}
          </Grid.Column>
          <Grid.Column width={8}>
            <h3> {job.Description}</h3> {job.SupplementaryQs != '' ? <span style={{ textAlign: 'right' }}>Supplementary Q Required</span> : null}
            {job.type}<br />
                  Deadline: {job.Deadline}
          </Grid.Column>
          <Grid.Column width={3}>
            {job.idApplication == null ? <Button primary idjob={job.idJobs} onClick={this.showSupp}>Apply</Button> : <Button positive idjob={job.idJobs} disabled>Applied</Button>}
          </Grid.Column>
         </Grid.Row>));
      const { isLoading, value, results } = this.state;
      const resultRenderer = ({ JobName, CompanyName, Tags, value }) => <Label as='a' href={`/job/${value}`} content={`${JobName} | ${CompanyName} | ${Tags}`} />

      return (
        <Grid celled>
          <Grid.Row>
            <Search
              aligned='right'
              // loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
              results={results}
              size='big'
              value={value}
              open={false}
              showNoResults={false}
              // resultRenderer={resultRenderer}
            />
          </Grid.Row>
          {jobListItems}
        </Grid>);
    }
    return (<Link to={`/company/${this.props.user.idCompany}`}>My Company Page</Link>);
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
              <Input fluid name='supplementaryA' placeholder='Answer...' onChange={this.handleChange} />
            </Modal.Content>
            <Modal.Actions>
              <Button negative onClick={this.hideSupp}>
                                No
              </Button>
              <Button positive icon='checkmark' labelPosition='right' content='Apply' onClick={this.suppApply} />
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
