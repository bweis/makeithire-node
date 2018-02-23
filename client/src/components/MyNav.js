import React, {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem} from 'reactstrap';
import {Link} from 'react-router-dom';

import { NavLink as RRNavLink } from 'react-router-dom';

import $ from 'jquery';

var url = "http://localhost:3001";

function getCookie(name) {
    var match = document.cookie.match(new RegExp(name + '=([^;]+)'));
    if (match) return match[1];
    else return "";
}


class MyNav extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.isLoggedIn);
        this.state = {user: {}, isRecruiter: -1};
        var cookie = getCookie("token");

        var lol = this;

        $.ajax({
            type: 'GET',
            headers: {'authorization': cookie},
            url: url + "/api/getUserDetails"
        })
            .done(function (data, status, xhr) {
                if (data.message === "Success") {
                    console.log('success on getDetails');
                    console.log(data.response);
                    lol.setState({isRecruiter: data.response})
                }
            })
            .fail(function (jqxhr, settings, ex) {
                console.log('failed on isRecruiter');
            })
    }

    render() {
        return (
          <div className="top-nav">
              <Navbar color="faded" light>
                <NavbarToggler className="d-lg-none" onClick={this.mobileSidebarToggle}>&#9776;</NavbarToggler>
                <NavbarBrand href="/">
                    <NavLink to="/home" tag={RRNavLink}>MiH</NavLink>
                </NavbarBrand>
                <Nav>
                    <UncontrolledDropdown>
                        <DropdownToggle nav caret>

                        </DropdownToggle>
                        <DropdownMenu >
                            <DropdownItem>
                                <Link to="/profile">My Profile</Link>
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