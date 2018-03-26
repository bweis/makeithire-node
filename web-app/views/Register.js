/* eslint-env browser */
import React, { Component } from 'react';
import axios from 'axios/index';

import { Form, Grid, Header, Message, Segment, Tab } from 'semantic-ui-react';
import MenuContainer from '../containers/MenuContainer';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      didError: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (document.cookie.length !== 0) {
      this.props.history.push('/home');
    }
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const { email, password } = this.state;
    axios.post('/api/login', { EmailID: email, Password: password })
      .then((res) => {
        document.cookie = `token=${res.data.token}`;
        this.props.history.push('/home');
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
      lastName,
      email,
      password,
      company,
      description,
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
                                fluid
                                icon='angle right'
                                iconPosition='left'
                                placeholder='First Name'
                                value={firstName}
                                onChange={this.handleChange}
                              />
                              <Form.Input
                                name='lastName'
                                fluid
                                icon='angle right'
                                iconPosition='left'
                                placeholder='Last Name'
                                value={lastName}
                                onChange={this.handleChange}
                              />
                              <Form.Input
                                name='email'
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='E-mail address'
                                value={email}
                                onChange={this.handleChange}
                              />
                              <Form.Input
                                name='password'
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                value={password}
                                onChange={this.handleChange}
                              />
                              <Form.Button color='teal' fluid size='large'>Register as Student</Form.Button>
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
                                fluid
                                icon='angle right'
                                iconPosition='left'
                                placeholder='First Name'
                                value={firstName}
                                onChange={this.handleChange}
                              />
                              <Form.Input
                                name='lastName'
                                fluid
                                icon='angle right'
                                iconPosition='left'
                                placeholder='Last Name'
                                value={lastName}
                                onChange={this.handleChange}
                              />
                              <Form.Input
                                name='email'
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='E-mail address'
                                value={email}
                                onChange={this.handleChange}
                              />
                              <Form.Input
                                name='password'
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                value={password}
                                onChange={this.handleChange}
                              />
                              <Form.Select
                                name='company'
                                fluid
                                placeholder='Select Your Company'
                                value={company}
                                onChange={this.handleChange}
                              />
                              <Form.TextArea
                                fluid
                                name='description'
                                label='Company Description'
                                placeholder='Tell us more about the company...'
                                value={description}
                                onChange={this.handleChange}
                              />
                              <Form.Button color='teal' fluid size='large'>Register as Recruiter</Form.Button>
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






//   if(!isRegistered) {
//     return (
//       <div className='login-page'>
//         <div className='login-container'>
//           <div className='form'>
//             <form className='register-form'>
//               {/*/!*<input type='checkbox' name='checkbox' id='recruiter' onChange='toggleCheckbox(this)' />Recruiter?*!/*/}
//               {/*<input type='text' id='fName' placeholder='First Name' />*/}
//               {/*<input type='text' id='lName' placeholder='Last Name' />*/}
//               {/*<input type='text' id='email' placeholder='Email Address' />*/}
//               {/*<input type='password' id='pass' placeholder='password' />*/}
//               {/*/!*<label id='company_label' htmlFor='company_list' style='display: none'>Company</label>*!/*/}
//               {/*/!*<select name='companies' id='company_list' style='display: none;' onChange='companySelect(this)'>*!/*/}
//               {/*/!*<option value='-1' selected='selected'>Select Company</option>*!/*/}
//               {/*/!*</select>*!/*/}
//               {/*/!* <input type="text" id="company" placeholder="Current Company" style="display: none;"/> *!/*/}
//               {/*/!* <input type="text" id="description" placeholder="Description" style="display: none;"/> *!/*/}
//               {/*<button className='Reg'>create</button>*/}
//               {/*<p className='message'>Already registered? <a href='#' id='goBack'>Sign In</a></p>*/}
//             </form>
//           </div>
//         </div>
//       </div>
//     )
//   }
//   return (
//     <div className='login-page'>
//       <div className='login-container'>
//         <div className='form'>
//           <form className='register-form'>
//             {/*/!*<input type='checkbox' name='checkbox' id='recruiter' onChange='toggleCheckbox(this)' />Recruiter?*!/*/}
//             {/*<input type='text' id='fName' placeholder='First Name' />*/}
//             {/*<input type='text' id='lName' placeholder='Last Name' />*/}
//             {/*<input type='text' id='email' placeholder='Email Address' />*/}
//             {/*<input type='password' id='pass' placeholder='password' />*/}
//             {/*/!*<label id='company_label' htmlFor='company_list' style='display: none'>Company</label>*!/*/}
//             {/*/!*<select name='companies' id='company_list' style='display: none;' onChange='companySelect(this)'>*!/*/}
//               {/*/!*<option value='-1' selected='selected'>Select Company</option>*!/*/}
//             {/*/!*</select>*!/*/}
//             {/*/!* <input type="text" id="company" placeholder="Current Company" style="display: none;"/> *!/*/}
//             {/*/!* <input type="text" id="description" placeholder="Description" style="display: none;"/> *!/*/}
//             {/*<button className='Reg'>create</button>*/}
//             {/*<p className='message'>Already registered? <a href='#' id='goBack'>Sign In</a></p>*/}
//           </form>
//           {/*<form className='login-form'>*/}
//             {/*<input type='text' id='mail' placeholder='email' />*/}
//             {/*<input type='password' id='password' placeholder='password' />*/}
//             {/*<button className='loginMe'>login</button>*/}
//             {/*<p className='message'>Not registered? <a href='#' id='goReg'>Create an account</a></p>*/}
//           {/*</form>*/}
//         </div>
//       </div>
//     </div>
//   );
// }
