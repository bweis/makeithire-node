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


var user = {
    firstName: "Zack",
    lastName: "Fernandez"
}

class MyNav extends Component {



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
                            {user.firstName} {user.lastName}
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