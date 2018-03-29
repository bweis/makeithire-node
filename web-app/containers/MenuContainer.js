import React, { Component } from 'react';
import {
  Button,
  Container,
  Segment,
  Menu,
} from 'semantic-ui-react';
import { loginUserAction } from '../actions/user';
import { connect } from 'react-redux';

const { logout } = require('../helpers/session');

const logoutMenuItem = (
  <Menu.Item position='right'>
    <Button as='a' onClick={logout}>Log out</Button>
  </Menu.Item>
);

const loginMenuItem = (
  <Menu.Item position='right'>
    <Button as='a' href='/login'>Log in</Button>
    <Button as='a' href='/register' style={{ marginLeft: '0.5em' }}>Sign Up</Button>
  </Menu.Item>
);

class MenuContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  createNavItem(name, href) {
    return (
      <Menu.Item
        as='a'
        name={name}
        href={href}
        active={window.location.pathname.indexOf(href) === 0}
      />
    );
  }
  render() {
    const { children, loggedIn } = this.props;
    console.log('HEY! THIS IS YOUR USER DATA:', this.props.user);
    return (
      <div>
        <Segment textAlign='center' style={{ padding: '0em 0em' }} vertical>
          <Menu size='large' color='teal' inverted>
            <Container>
              <Menu.Item><img alt='Logo' src='/img/logo.png' /></Menu.Item>
              {loggedIn ? this.createNavItem('Home', '/home') : null}
              {loggedIn ? this.createNavItem('Profile', '/profile') : null}
              {loggedIn ? this.createNavItem('Job', '/job') : null}
              {loggedIn ? this.createNavItem('Chat', '/chat') : null}
              {loggedIn ? logoutMenuItem : loginMenuItem}
            </Container>
          </Menu>
        </Segment>

        {children}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  null,
)(MenuContainer);
