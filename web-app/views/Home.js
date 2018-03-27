import React, { Component } from 'react';

import MenuContainer from '../containers/MenuContainer';
import { getUserDetails } from '../helpers/api';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { isRecruiter: -1 };
  }

  componentWillMount() {
    getUserDetails((res) => {
      if (!res) {
        console.log('Could not get user details');
      } else {
        console.log(res.data.response);
        // this.setState({ isRecruiter: res.data.response.type }); // Not a real thing. TODO FIX THIS OR GET STATUS ON LOGIN
        this.setState({ isRecruiter: 0 }); // Mock student state
      }
    });
  }
  render() {
    let home = ''; // TODO fix this, is Recruiter is async and not retrieved before rendered.
    if (this.state.isRecruiter === 0) {
      home = <h1>Student Home Page</h1>;
    } else if (this.state.isRecruiter === 1) {
      home = <h1>Recruiter Home Page</h1>;
    } else if (this.state.isRecruiter === 2) {
      home = <h1>Head Recruiter Home Page</h1>;
    } else {
      home = <h1>COULD NOT GET STATE</h1>;
    }
    return (
      <div>
        <MenuContainer loggedIn>
          {home}
        </MenuContainer>
      </div>
    );
  }
}

export default Home;
