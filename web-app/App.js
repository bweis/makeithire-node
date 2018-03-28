import React, { Component } from 'react';
import { Redirect, BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import AuthenticatedRoute from './AuthenticatedRoute';

import MyNav from './components/MyNav';
import NewJob from './views/NewJob';
import JobInfo from './views/JobInfo';
import Home from './views/Home';
import Profile from './views/Profile';
import NewProfile from './views/NewProfile';
import Company from './views/Company';
import Login from './views/Login';
import Register from './views/Register';
import LandingPage from './views/LandingPage';
import { checkSession } from './helpers/session';

class App extends Component {
  componentWillMount() {
    checkSession((valid) => {
      if (!valid) {
        document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      }
    });
  }
  render() {
    return (
      <div>
        <Container fluid>
          <Router>
            <div>
              <Route exact path='/' name='LandingPage' component={LandingPage} />
              <Route path='/login' name='Login' component={Login} />
              <Route path='/register' name='Register' component={Register} />
              <AuthenticatedRoute path='/home' name='Home' component={Home} />
              <AuthenticatedRoute path='/profile' name='Profile' component={Profile} />
              <AuthenticatedRoute path='/newprofile' name='NewProfile' component={NewProfile} />
              <AuthenticatedRoute path='/company::companyId' name='Company' component={Company} />
              <AuthenticatedRoute path="/company::companyId/newJob" name="NewJob" component={NewJob} />
              <AuthenticatedRoute path="/company::companyId/job::jobId" name="JobInfo" component={JobInfo} />
            </div>
          </Router>
        </Container>
      </div>
    );
  }
}

export default App;
