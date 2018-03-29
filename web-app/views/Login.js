import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import MenuContainer from '../containers/MenuContainer';
import { login } from '../helpers/session';
import { loginUserAction } from '../actions/user';

const { getAuthToken } = require('../helpers/utils');

class Login extends Component {
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
    if (getAuthToken()) {
      this.props.history.push('/home');
    }
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  handleSubmit() {
    const { email, password } = this.state;
    login(email, password, (res) => {
      if (res) {
        this.props.loginUser(res.data.user);
        document.cookie = `token=${res.data.token}`;
        this.props.history.push('/home');
      } else {
        this.setState({ didError: true });
      }
    });
  }
  render() {
    const {
      email,
      password,
    } = this.state;

    return (
      <div>
        <MenuContainer>
          <div className='login-form'>
            {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
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
                  {' '}Log-in to your account
                </Header>
                <Form size='large' onSubmit={this.handleSubmit} error={this.state.didError}>
                  <Segment stacked>
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
                    <Form.Button color='teal' fluid size='large'>Login</Form.Button>
                    <Message
                      error
                      header='Incorrect email or password'
                      content='Please try again.  If errors persist, please contact the system administrator.'
                    />
                  </Segment>
                </Form>
                <Message>
                  New to us? <a href='/register'>Sign Up</a>
                </Message>
              </Grid.Column>
            </Grid>
          </div>
        </MenuContainer>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loginUser: user => dispatch(loginUserAction(user)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Login);
