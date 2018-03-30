import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import { Button, Input } from 'semantic-ui-react';
import axios from 'axios/index';

import MenuContainer from '../containers/MenuContainer';
import { getCompanyList } from '../helpers/api';
import { getCookie } from '../helpers/utils';


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
      company: '',
      title: '',
      city: '',
      state: '',
      expiration: '',
      description: '',
      tags: '',
    };
    this.postJob = this.postJob.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    this.setState({ [name]: value });
  }

  postJob() {
    console.log(`${this.state.title} ${this.state.type}`);
  }
  render() {
    return (
      <MenuContainer loggedIn>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Company' value={this.state.company.CompanyName} readOnly />
            <Form.Input fluid label='Job Title' name='title' placeholder='Job Title' onChange={this.handleChange} />
            <Form.Select fluid label='Type' name='type' options={jobTypes} placeholder='Type' onChange={this.handleChange} />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Input fluid label='City' name='city' placeholder='City' />
            <Form.Select fluid label='State' name='state' options={states} placeholder='State' />
            <Form.Input type='date' fluid label='Expiration Date' name='expiration' />
          </Form.Group>
          <Form.TextArea label='Job Description' placeholder='Job description...' name='description' />
          <Form.Input label='Tags' placeholder='Tags' name='tags' />
          <Form.Button onClick={this.postJob}>Post Job</Form.Button>
        </Form>
      </MenuContainer>
    );
  }
}

export default NewJob;
