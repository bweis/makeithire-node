import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { Button, Input, Checkbox } from 'semantic-ui-react';
import axios from 'axios/index';

import MenuContainer from '../containers/MenuContainer';
import { getCompanyList, addJobPosting } from '../helpers/api';


const jobTypes = [
  { key: 'Full-Time', text: 'Full-Time', value: 'Full-Time' },
  { key: 'Part-Time', text: 'Part-Time', value: 'Part-Time' },
  { key: 'Internship', text: 'Internship', value: 'Internship' },
];

const states = [
  {
    text: 'Alabama',
    key: 'AL',
    value: 'AL',
  },
  {
    text: 'Alaska',
    key: 'AK',
    value: 'AK',
  },
  {
    text: 'Arizona',
    key: 'AZ',
    value: 'AZ',
  },
  {
    text: 'Arkansas',
    key: 'AR',
    value: 'AR',
  },
  {
    text: 'California',
    key: 'CA',
    value: 'CA',
  },
  {
    text: 'Colorado',
    key: 'CO',
    value: 'CO',
  },
  {
    text: 'Connecticut',
    key: 'CT',
    value: 'CT',
  },
  {
    text: 'Delaware',
    key: 'DE',
    value: 'DE',
  },
  {
    text: 'Florida',
    key: 'FL',
    value: 'FL',
  },
  {
    text: 'Georgia',
    key: 'GA',
    value: 'GA',
  },
  {
    text: 'Hawaii',
    key: 'HI',
    value: 'HI',
  },
  {
    text: 'Idaho',
    key: 'ID',
    value: 'ID',
  },
  {
    text: 'Illinois',
    key: 'IL',
    value: 'IL',
  },
  {
    text: 'Indiana',
    key: 'IN',
    value: 'IN',
  },
  {
    text: 'Iowa',
    key: 'IA',
    value: 'IA',
  },
  {
    text: 'Kansas',
    key: 'KS',
    value: 'KS',
  },
  {
    text: 'Kentucky',
    key: 'KY',
    value: 'KY',
  },
  {
    text: 'Louisiana',
    key: 'LA',
    value: 'LA',
  },
  {
    text: 'Maine',
    key: 'ME',
    value: 'ME',
  },
  {
    text: 'Maryland',
    key: 'MD',
    value: 'MD',
  },
  {
    text: 'Massachusetts',
    key: 'MA',
    value: 'MA',
  },
  {
    text: 'Michigan',
    key: 'MI',
    value: 'MI',
  },
  {
    text: 'Minnesota',
    key: 'MN',
    value: 'MN',
  },
  {
    text: 'Mississippi',
    key: 'MS',
    value: 'MS',
  },
  {
    text: 'Missouri',
    key: 'MO',
    value: 'MO',
  },
  {
    text: 'Montana',
    key: 'MT',
    value: 'MT',
  },
  {
    text: 'Nebraska',
    key: 'NE',
    value: 'NE',
  },
  {
    text: 'Nevada',
    key: 'NV',
    value: 'NV',
  },
  {
    text: 'New Hampshire',
    key: 'NH',
    value: 'NH',
  },
  {
    text: 'New Jersey',
    key: 'NJ',
    value: 'NJ',
  },
  {
    text: 'New Mexico',
    key: 'NM',
    value: 'NM',
  },
  {
    text: 'New York',
    key: 'NY',
    value: 'NY',
  },
  {
    text: 'North Carolina',
    key: 'NC',
    value: 'NC',
  },
  {
    text: 'North Dakota',
    key: 'ND',
    value: 'ND',
  },
  {
    text: 'Ohio',
    key: 'OH',
    value: 'OH',
  },
  {
    text: 'Oklahoma',
    key: 'OK',
    value: 'OK',
  },
  {
    text: 'Oregon',
    key: 'OR',
    value: 'OR',
  },
  {
    text: 'Pennsylvania',
    key: 'PA',
    value: 'PA',
  },
  {
    text: 'Rhode Island',
    key: 'RI',
    value: 'RI',
  },
  {
    text: 'South Carolina',
    key: 'SC',
    value: 'SC',
  },
  {
    text: 'South Dakota',
    key: 'SD',
    value: 'SD',
  },
  {
    text: 'Tennessee',
    key: 'TN',
    value: 'TN',
  },
  {
    text: 'Texas',
    key: 'TX',
    value: 'TX',
  },
  {
    text: 'Utah',
    key: 'UT',
    value: 'UT',
  },
  {
    text: 'Vermont',
    key: 'VT',
    value: 'VT',
  },
  {
    text: 'Virginia',
    key: 'VA',
    value: 'VA',
  },
  {
    text: 'Washington',
    key: 'WA',
    value: 'WA',
  },
  {
    text: 'West Virginia',
    key: 'WV',
    value: 'WV',
  },
  {
    text: 'Wisconsin',
    key: 'WI',
    value: 'WI',
  },
  {
    text: 'Wyoming',
    key: 'WY',
    value: 'WY',
  },
];

class NewJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {},
      supp: false,
      jobInfo: {
        idCompany: this.props.match.params.companyId,
        JobName: '',
        Description: '',
        DateAdded: '',
        Deadline: '',
        tags: '',
        SupplementaryQs: '',
      }
    };
    this.postJob = this.postJob.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleSupp = this.toggleSupp.bind(this);
    getCompanyList((res) => {
      if (!res) {
        console.log('Could not get company list');
      } else {
        const companyID = this.props.match.params.companyId;
        for (let i = 0; i < res.data.response.length; i++) {
          console.log(`loop companyID: ${companyID} checked against: ${res.data.response[i].idCompany}`);
          if (res.data.response[i].idCompany == companyID) {
            console.log('match');
            console.log(res.data.response[i]);
            this.setState({ company: res.data.response[i] });
            break;
          }
        }
      }
    });
  }

  handleChange(e, { name, value }) {
    let info = this.state.jobInfo;
    info[name] = value;
    this.setState({ info });
  }

  toggleSupp() {
    var s = !this.state.supp;
    this.setState({supp: s});
  }


  postJob() {
    addJobPosting((res) => {
      if (!res) {
        console.log('Could not get student details');
      } else {
        console.log('updated!')
      }
    }, this.state.jobInfo);
  }
  
  render() {
    return (
      <MenuContainer loggedIn>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Company' value={this.state.company.CompanyName} readOnly />
            <Form.Input fluid label='Job Name' name='JobName' placeholder='Job Title' onChange={this.handleChange} />
            <Form.Select fluid label='Type' name='type' options={jobTypes} placeholder='Type' onChange={this.handleChange} />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input type='date' fluid label='Date Added' name='DateAdded' onChange={this.handleChange}/>
            <Form.Input type='date' fluid label='Deadline' name='Deadline' onChange={this.handleChange}/>
          </Form.Group>

          <Form.TextArea label='Job Description' placeholder='Job description...' name='Description' onChange={this.handleChange}/>
          <Form.Input label='tags' placeholder='Tags' name='tags' onChange={this.handleChange}/>
          <Form.Checkbox label='Include Supplemental Question' onClick={this.toggleSupp}/>
          {this.state.supp && <Form.Input fluid label='Supplemental Question' placeholder='Supplemental ...' name="SupplementaryQs" onChange={this.handleChange} />}
          <Form.Button onClick={this.postJob}>Post Job</Form.Button>
        </Form>
      </MenuContainer>
    );
  }
}

export default NewJob;
