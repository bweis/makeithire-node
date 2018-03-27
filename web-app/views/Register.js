/* eslint-env browser */
import React, { Component } from 'react';
import axios from 'axios/index';

import { Form, Grid, Header, Message, Segment, Tab, Divider } from 'semantic-ui-react';
import MenuContainer from '../containers/MenuContainer';
import { getCompanyList } from '../helpers/api';

class Register extends Component {
  constructor(props) {
    super(props);
    this.activeTab = 0;
    this.state = {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      password: '',
      company: '',
      newCompany: '',
      description: '',
      didError: false,
      companyOptions: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  componentWillMount() {
    if (document.cookie.length !== 0) { // TODO FIX THIS, SCROLL COOKIE SPOOFS LOGIN
      this.props.history.push('/home');
    }
    getCompanyList((res) => {
      if (!res) {
        console.log('Could not get company list');
      } else {
        const companyOptions = res.data.response.map(company => ({
          key: company.idCompany,
          value: company.idCompany,
          text: company.CompanyName,
        }));
        this.setState({ companyOptions });
      }
    });
  }

  handleTabChange(e, data) {
    this.activeTab = data.activeIndex;
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const {
      firstName,
      middleName,
      lastName,
      email,
      password,
      company,
      description,
      newCompany,
    } = this.state;
    let route = '/api/signupstudent';
    if (this.activeTab === 1) {
      route = '/api/signuprecruiter';
    }
    axios.post(
      route,
      {
        FirstName: firstName,
        MiddleName: middleName,
        LastName: lastName,
        EmailID: email,
        Password: password,
        idCompany: company, // 0 = student, -1 = head Recruiter, id = company ID
        CompanyName: company,
        Description: description,
        Published: 0, // Flag for if we publish the page
      },
    )
      .then((res) => {
        this.props.history.push('/login');
        console.log(res);
      })
      .catch((err) => {
        this.setState({ didError: true });
        console.log(err);
      });
  }

  render() {
    const {
      firstName,
      middleName,
      lastName,
      email,
      password,
      company,
      description,
      companyOptions,
    } = this.state;

    return (
      <div>
        <MenuContainer>
          <div className='login-form'>
            <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}
            </style>
            <Grid
              textAlign='center'
              style={{ height: '100%' }}
              verticalAlign='middle'
            >
              <Grid.Column style={{ maxWidth: 450, marginTop: '5%' }}>
                <Header as='h2' color='teal' textAlign='center'>
                  {' '}Register for MakeItHire
                </Header>
                <Tab
                  onTabChange={this.handleTabChange}
                  menu={{ pointing: true, widths: 2 }}
                  panes={[
                    {
                      menuItem: 'Student',
                      render: () => (
                        <Tab.Pane attached={false}>
                          <Form size='large' onSubmit={this.handleSubmit} error={this.state.didError}>
                            <Segment stacked>
                              <Form.Input
                                name='firstName'
                                icon='angle right'
                                iconPosition='left'
                                placeholder='First Name'
                                value={firstName}
                                onChange={this.handleChange}
                              />
                              <Form.Input
                                name='middleName'
                                icon='angle right'
                                iconPosition='left'
                                placeholder='Middle Name'
                                value={middleName}
                                onChange={this.handleChange}
                              />
                              <Form.Input
                                name='lastName'
                                icon='angle right'
                                iconPosition='left'
                                placeholder='Last Name'
                                value={lastName}
                                onChange={this.handleChange}
                              />
                              <Form.Input
                                name='email'
                                icon='user'
                                iconPosition='left'
                                placeholder='E-mail address'
                                value={email}
                                onChange={this.handleChange}
                              />
                              <Form.Input
                                name='password'
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                value={password}
                                onChange={this.handleChange}
                              />
                              <Form.Button color='teal' fluid size='large'>Register as a Student</Form.Button>
                              <Message
                                error
                                header='Error with registration'
                                content='If errors persist, please contact the system administrator.'
                              />
                            </Segment>
                          </Form>
                          <Message>
                            Already have an account? <a href='/login'>Log In</a>
                          </Message>
                        </Tab.Pane>
                      ),
                    },
                    {
                      menuItem: 'Recruiter',
                      render: () => (
                        <Tab.Pane attached={false}>
                          <Form size='large' onSubmit={this.handleSubmit} error={this.state.didError}>
                            <Segment stacked>
                              <Form.Input
                                name='firstName'
                                icon='angle right'
                                iconPosition='left'
                                placeholder='First Name'
                                value={firstName}
                                onChange={this.handleChange}
                              />
                              <Form.Input
                                name='middleName'
                                icon='angle right'
                                iconPosition='left'
                                placeholder='Middle Name'
                                value={middleName}
                                onChange={this.handleChange}
                              />
                              <Form.Input
                                name='lastName'
                                icon='angle right'
                                iconPosition='left'
                                placeholder='Last Name'
                                value={lastName}
                                onChange={this.handleChange}
                              />
                              <Form.Input
                                name='email'
                                icon='user'
                                iconPosition='left'
                                placeholder='E-mail address'
                                value={email}
                                onChange={this.handleChange}
                              />
                              <Form.Input
                                name='password'
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                value={password}
                                onChange={this.handleChange}
                              />
                              <Divider horizontal section>Company Details</Divider>
                              <Form.Select
                                name='company'
                                placeholder='Select Your Company'
                                value={company}
                                onChange={this.handleChange}
                                options={companyOptions}
                              />
                              <div>
                                <Form.Input
                                  name='newCompany'
                                  icon='angle right'
                                  iconPosition='left'
                                  placeholder='Company name'
                                  value={company}
                                  onChange={this.handleChange}
                                />
                                <Form.TextArea
                                  name='description'
                                  placeholder='Tell us more about the company...'
                                  value={description}
                                  onChange={this.handleChange}
                                />
                              </div>
                              <Form.Button color='teal' fluid size='large'>Register as a Recruiter</Form.Button>
                              <Message
                                error
                                header='Error with registration'
                                content='If errors persist, please contact the system administrator.'
                              />
                            </Segment>
                          </Form>
                          <Message>
                            Already have an account? <a href='/login'>Log In</a>
                          </Message>
                        </Tab.Pane>
                      ),
                    },
                  ]}
                />
              </Grid.Column>
            </Grid>
          </div>
        </MenuContainer>
      </div>
    );
  }
}

export default Register;
