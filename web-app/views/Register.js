import React, { Component } from 'react';
import axios from 'axios/index';
import { Form, Grid, Header, Message, Segment, Tab, Divider } from 'semantic-ui-react';
import MenuContainer from '../containers/MenuContainer';

const { getCompanyList } = require('../helpers/api');
const { getAuthToken } = require('../helpers/utils');

class Register extends Component {
  constructor(props) {
    super(props);
    this.activeTab = 0;
    this.state = {
      first_name: '',
      middle_name: '',
      last_name: '',
      email_address: '',
      password: '',
      company_id: '',
      company_name: '',
      didError: false,
      companyOptions: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
  }

  componentWillMount() {
    if (getAuthToken()) {
      this.props.history.push('/home');
    }
  }

  componentDidMount() {
    getCompanyList((res) => {
      console.log(res.data.data);
      if (res) {
        const companyOptions = res.data.data.map(company => ({
          key: company.id,
          text: company.name,
          value: company.id,
        }));
        companyOptions.push({
          key: -1,
          text: 'Company Not Listed',
          value: -1,
        });

        // console.log('array', res.data);
        // console.log('formatted', companyOptions);
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
      first_name,
      middle_name,
      last_name,
      email_address,
      password,
      company_id,
      company_name,
    } = this.state;

    // Determine the kind of user to sign up.
    let user_type = 0;
    if (this.activeTab === 1) {
      user_type = 1;
      console.log('company_id', this.state.company_id);
      if (this.state.company_id == -1) {
        user_type = 2;
      }
    }

    axios.post(
      '/api/user',
      {
        user_type,
        first_name,
        middle_name,
        last_name,
        email_address,
        password,
        company_id,
        company_name,
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
      first_name,
      middle_name,
      last_name,
      email_address,
      password,
      company_id,
      company_name,
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
                                name='first_name'
                                icon='angle right'
                                iconPosition='left'
                                placeholder='First Name'
                                value={first_name}
                                onChange={this.handleChange}
                              />
                              <Form.Input
                                name='middle_name'
                                icon='angle right'
                                iconPosition='left'
                                placeholder='Middle Name'
                                value={middle_name}
                                onChange={this.handleChange}
                              />
                              <Form.Input
                                name='last_name'
                                icon='angle right'
                                iconPosition='left'
                                placeholder='Last Name'
                                value={last_name}
                                onChange={this.handleChange}
                              />
                              <Form.Input
                                name='email_address'
                                icon='user'
                                iconPosition='left'
                                placeholder='E-mail address'
                                value={email_address}
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
                                name='first_name'
                                icon='angle right'
                                iconPosition='left'
                                placeholder='First Name'
                                value={first_name}
                                onChange={this.handleChange}
                              />
                              <Form.Input
                                name='middle_name'
                                icon='angle right'
                                iconPosition='left'
                                placeholder='Middle Name'
                                value={middle_name}
                                onChange={this.handleChange}
                              />
                              <Form.Input
                                name='last_name'
                                icon='angle right'
                                iconPosition='left'
                                placeholder='Last Name'
                                value={last_name}
                                onChange={this.handleChange}
                              />
                              <Form.Input
                                name='email_address'
                                icon='user'
                                iconPosition='left'
                                placeholder='E-mail address'
                                value={email_address}
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
                                name='company_id'
                                placeholder='Select Your Company'
                                value={company_id}
                                onChange={this.handleChange}
                                options={companyOptions}
                              />

                              {this.state.company_id == -1 ? (
                                <div>
                                  <Form.Input
                                    name='company_name'
                                    icon='angle right'
                                    iconPosition='left'
                                    placeholder='Company name'
                                    value={company_name}
                                    onChange={this.handleChange}
                                  />
                                </div>
                              ) : (
                                <div></div>
                              )}

                              <Divider />
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
