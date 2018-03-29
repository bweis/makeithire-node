/**
 * Created by Zack on 3/27/18.
 */
import React, { Component } from 'react';
import MenuContainer from '../containers/MenuContainer';

class JobInfo extends Component {
  /*
     constructor(props) {
     super(props);
     }
     componentWillMount(props) {
     company = companies.find(o => o.companyId == props.location.state.companyId);
     }


     */

  constructor(props) {
    super(props);
    this.state = {};
    console.log(this.props.match.params.jobId);
  }

  render() {
    return (
      <MenuContainer loggedIn>
        <p>
          haha
          {this.props.match.params.jobId}
        </p>
      </MenuContainer>
    );
  }
}

export default JobInfo;
