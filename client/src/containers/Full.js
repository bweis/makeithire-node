import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';

import MyNav from '../components/MyNav.js';
import Home from '../views/Home.js';
import Profile from '../views/Profile.js';
import Company from '../views/Company.js';

class Full extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: true };
  }
    handleContextRef = contextRef => this.setState({ contextRef });
    render() {
      return (

        <div>
          <MyNav />
          <main className='main'>
            <Container fluid>
              <Switch>
                <Route path='/home' name='Home' component={Home} />
                <Route path='/profile' name='Profile' component={Profile} />
                <Route path='/company' name='Company' component={Company} />
                <Redirect from='/' to='/home' />
              </Switch>
            </Container>
          </main>
        </div>
      );
    }
}

export default Full;
