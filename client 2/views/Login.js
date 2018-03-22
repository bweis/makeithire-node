import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
      <div className='login-page'>
        <div className='login-container'>
          <div className='form'>
            <input type='text' id='mail' placeholder='email'
                   ref={(input) => {this.emailInput = input; }}
            />
            <input type='password' id='password' placeholder='password'
                   ref={(input) => {this.passwordInput = input; }}
            />
            <button className='loginMe' onClick={this.validateUser}>login</button>
            <Link to='/register'>Create an account</Link>
          </div>
        </div>
      </div>
    );
  }

  validateUser() {
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    axios.post('http://localhost:3001/api/login', { EmailID: email, Password: password })
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
