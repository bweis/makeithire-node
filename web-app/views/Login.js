import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import MenuContainer from '../containers/MenuContainer';


class Login extends Component {
  constructor(props) {
    super(props);
    this.validateUser = this.validateUser.bind(this);
  }

  componentWillMount() {
    if (document.cookie.length !== 0) {
      this.props.history.push('/home');
    }
  }

  render() {
    return (
      <div>
        <MenuContainer>
          {/*<Menu stackable >*/}
            {/*<Menu.Item>*/}
              {/*<img src='/img/logo.png' />*/}
            {/*</Menu.Item>*/}
          {/*</Menu>*/}
          <div className='login-container'>
            <div className='form'>
              <input type='text' id='mail' placeholder='email'
                     ref={(input) => {this.emailInput = input; }}
              />
              <input type='password' id='password' placeholder='password'
                     ref={(input) => {this.passwordInput = input; }}
              />
              {/*<button className='loginMe' onClick={this.validateUser}>login</button>*/}
              <Button onClick={this.validateUser}>Click Here</Button>

              <Link to='/register'>Create an account</Link>
            </div>
          </div>
        </MenuContainer>
      </div>
    );
  }

  validateUser() {
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    axios.post('/api/login', { EmailID: email, Password: password })
      .then((res) => {
        document.cookie = `token=${res.data.token}`;
        this.props.history.push('/home');
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default Login;
