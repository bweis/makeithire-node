/**
 * Created by Zack on 3/27/18.
 */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUserDetails, getCompanyJobs } from '../helpers/api';
import { getCompanyList } from '../helpers/api';
import { getCookie } from '../helpers/utils'
import {getEveryJobAndDetail} from '../helpers/api';


import { Grid, Header, Card, Button } from 'semantic-ui-react';

class JobListing extends Component {
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
    this.state = {
      readOnly: true, modal: false, isRecruiter: -1, company: {}, jobs: []
    };
    this.makeTiles = this.makeTiles.bind(this);
  }

  componentDidMount() {
    var companyId = {
      idCompany: this.props.match.params.companyId
    };
    getCompanyJobs((res) => {
      if (!res) {
        console.log('could not get company jobs');
      } else {
        console.log(res.data.response);
        
        this.setState({jobs: res.data.response});
      }
    }, companyId);
  }


  _click() {
    this.setState(prevState => ({ readOnly: !prevState.readOnly }));
  }

  makeTiles() {
    return this.state.jobs.map((item, index) => (
        <Card fluid key={item.idJobs} href={`/company/${this.props.match.params.companyId}/job/${item.idJobs}`} header={item.JobName} meta={'Deadline: ' + item.Deadline} description={item.Description} />
    ));
  }

  render() {
    return (
      <Grid.Column centered>
        <Header size='large'>
            Job Listings <Link to={`/company/${this.props.match.params.companyId}/newJob`}><Button circular icon='add circle' size='medium' floated='right' /></Link>
        </Header>
        <Card.Group>
          {this.makeTiles()}
        </Card.Group>
      </Grid.Column>
    );
  }
}


export default JobListing;
