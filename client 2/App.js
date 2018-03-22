import React, { Component } from 'react';
import { Redirect, BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import AuthenticatedRoute from './AuthenticatedRoute';

import MyNav from './components/MyNav';
import Home from './views/Home';
import Profile from './views/Profile';
import Company from './views/Company';
import Login from './views/Login';
import Register from './views/Register';

class App extends Component {
  render() {
    return (
      <div>
        {/*<MyNav />*/}
        <Container fluid>
          <Router>
            <div>
              <Route path='/login' name='Login' component={Login} />
              <Route path='/register' name='Register' component={Register} />
              <AuthenticatedRoute path='/home' name='Home' component={Home} />
              <AuthenticatedRoute path='/profile' name='Profile' component={Profile} />
              <AuthenticatedRoute path='/company' name='Company' component={Company} />
              {/*<Redirect from='/' to='/home' />*/}
            </div>
          </Router>
        </Container>
      </div>
    );
  }
}

export default App;
