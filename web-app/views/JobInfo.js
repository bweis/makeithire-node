
import React, { Component } from 'react';
import MenuContainer from '../containers/MenuContainer';

class JobInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    console.log(this.props.match.params.jobId);
  }

  render() {
    return (
      <MenuContainer loggedIn>
        <p>
          {this.props.match.params.jobId}
        </p>
      </MenuContainer>
    );
  }
}

export default JobInfo;
