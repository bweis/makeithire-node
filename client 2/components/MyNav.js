import React, { Component } from 'react';
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

import { NavLink as RRNavLink } from 'react-router-dom';

import $ from 'jquery';

const url = 'http://localhost:3001';

function getCookie(name) {
  const match = document.cookie.match(new RegExp(`${name}=([^;]+)`));
  if (match) return match[1];
  return '';
}


class MyNav extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.isLoggedIn);
    this.state = {
      user: {
        firstName: '',
        lastName: '',
      },
      isRecruiter: -1,
    };
    const cookie = getCookie('token');

    const lol = this;

    $.ajax({
      type: 'GET',
      headers: { authorization: cookie },
      url: `${url}/api/getUserDetails`,
    })
      .done((data, status, xhr) => {
        if (data.message === 'Success') {
          console.log('success on isRecruiter');
          console.log(data.response.type);
          const u = {
            firstName: data.response.FirstName,
            lastName: data.response.LastName,
          };
          lol.setState({ isRecruiter: data.response.type, user: u });
        }
      })
      .fail((jqxhr, settings, ex) => {
        console.log('failed on isRecruiter');
      });
  }

  render() {
    let profLink = '';
    if (this.state.isRecruiter === -1) {
      //
    } else if (this.state.isRecruiter === 0) {
      profLink = <Link to='/profile'>My Profile</Link>;
    } else if (this.state.isRecruiter === 1) {
      profLink = <Link to='/company'>My Company</Link>;
    } else if (this.state.isRecruiter === 2) {
      profLink = <Link to='/company'>My Company</Link>;
    }
    return (
      <div className='top-nav'>
        <Navbar color='faded' light>
          <NavbarToggler className='d-lg-none' onClick={this.mobileSidebarToggle}>&#9776;</NavbarToggler>
          <NavbarBrand href='/'>
            <NavLink to='/home' tag={RRNavLink}>MiH</NavLink>
          </NavbarBrand>
          <Nav>
            <UncontrolledDropdown>
              <DropdownToggle nav caret>
                {this.state.user.firstName} {this.state.user.lastName}
              </DropdownToggle>
              <DropdownMenu >
                <DropdownItem>
                  {profLink}
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                                Sign out
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default MyNav;
