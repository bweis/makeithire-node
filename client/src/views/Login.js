import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStudent: true,
      isRegistered: true,
    };
  }

  render() {
    const { isStudent, isRegistered } = this.state;
    if(!isRegistered) {
      return (
        <div className='login-page'>
          <div className='login-container'>
            <div className='form'>
              <form className='register-form'>
                {/*/!*<input type='checkbox' name='checkbox' id='recruiter' onChange='toggleCheckbox(this)' />Recruiter?*!/*/}
                {/*<input type='text' id='fName' placeholder='First Name' />*/}
                {/*<input type='text' id='lName' placeholder='Last Name' />*/}
                {/*<input type='text' id='email' placeholder='Email Address' />*/}
                {/*<input type='password' id='pass' placeholder='password' />*/}
                {/*/!*<label id='company_label' htmlFor='company_list' style='display: none'>Company</label>*!/*/}
                {/*/!*<select name='companies' id='company_list' style='display: none;' onChange='companySelect(this)'>*!/*/}
                {/*/!*<option value='-1' selected='selected'>Select Company</option>*!/*/}
                {/*/!*</select>*!/*/}
                {/*/!* <input type="text" id="company" placeholder="Current Company" style="display: none;"/> *!/*/}
                {/*/!* <input type="text" id="description" placeholder="Description" style="display: none;"/> *!/*/}
                {/*<button className='Reg'>create</button>*/}
                {/*<p className='message'>Already registered? <a href='#' id='goBack'>Sign In</a></p>*/}
              </form>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div className='login-page'>
        <div className='login-container'>
          <div className='form'>
            <form className='register-form'>
              {/*/!*<input type='checkbox' name='checkbox' id='recruiter' onChange='toggleCheckbox(this)' />Recruiter?*!/*/}
              {/*<input type='text' id='fName' placeholder='First Name' />*/}
              {/*<input type='text' id='lName' placeholder='Last Name' />*/}
              {/*<input type='text' id='email' placeholder='Email Address' />*/}
              {/*<input type='password' id='pass' placeholder='password' />*/}
              {/*/!*<label id='company_label' htmlFor='company_list' style='display: none'>Company</label>*!/*/}
              {/*/!*<select name='companies' id='company_list' style='display: none;' onChange='companySelect(this)'>*!/*/}
                {/*/!*<option value='-1' selected='selected'>Select Company</option>*!/*/}
              {/*/!*</select>*!/*/}
              {/*/!* <input type="text" id="company" placeholder="Current Company" style="display: none;"/> *!/*/}
              {/*/!* <input type="text" id="description" placeholder="Description" style="display: none;"/> *!/*/}
              {/*<button className='Reg'>create</button>*/}
              {/*<p className='message'>Already registered? <a href='#' id='goBack'>Sign In</a></p>*/}
            </form>
            {/*<form className='login-form'>*/}
              {/*<input type='text' id='mail' placeholder='email' />*/}
              {/*<input type='password' id='password' placeholder='password' />*/}
              {/*<button className='loginMe'>login</button>*/}
              {/*<p className='message'>Not registered? <a href='#' id='goReg'>Create an account</a></p>*/}
            {/*</form>*/}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
