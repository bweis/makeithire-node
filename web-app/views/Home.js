import React, { Component } from 'react';

import MenuContainer from '../containers/MenuContainer';
import { getUserDetails } from '../helpers/api';
import AdminDashboard from '../views/AdminDashboard';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { isRecruiter: -1 };
    this.getHomeComponent = this.getHomeComponent.bind(this);
  }

  componentWillMount() {
    getUserDetails((res) => {
      if (!res) {
        console.log('Could not get user details');
      } else {
        console.log(res.data.response);
        // this.setState({ isRecruiter: res.data.response.type }); // Not a real thing. TODO FIX THIS OR GET STATUS ON LOGIN
        this.setState({ isRecruiter: 3 }); // Mock student state
      }
    });
  }

  getHomeComponent() {
    console.log(this.state);
    if (this.state.isRecruiter === 0) {
      return (<h1>Student Home Page</h1>);
    } else if (this.state.isRecruiter === 1) {
      return (<h1>Recruiter Home Page</h1>);
    } else if (this.state.isRecruiter === 2) {
      return (<h1>Head Recruiter Home Page</h1>);
    } else if (this.state.isRecruiter === 3) {
      return(<AdminDashboard />);
    } else {
      return (<h1>COULD NOT GET STATE</h1>);
    }
  }

  render() {
    console.log(this.state.accountType);
    return (
      <div>
        <MenuContainer loggedIn>
          {this.getHomeComponent()}
        </MenuContainer>
      </div>
    );
  }
}

export default Home;
