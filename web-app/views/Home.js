import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';

import MenuContainer from '../containers/MenuContainer';
import AdminDashboard from '../views/AdminDashboard';


class Home extends Component {
  constructor(props) {
    super(props);
    this.getHomeComponent = this.getHomeComponent.bind(this);
  }

  getHomeComponent() {
    if (Object.keys(this.props.user).length === 0 && this.props.user.constructor === Object) {
      return (<Loader size='massive' style={{ marginTop: '4em' }} active inline='centered'>Loading Content</Loader>);
    } else if (this.props.user.isHeadRecruiter) {
      return (<h1>Head Recruiter Home Page</h1>);
    } else if (this.props.user.isAdmin) {
      return (<AdminDashboard />);
    } else if (this.props.user.isStudent) {
      return (<h1>Student Home Page</h1>);
    }
    return (<h1>Recruiter Home Page</h1>);
  }
  render() {
    console.log('home', this.props);
    return (
      <div>
        <MenuContainer loggedIn>
          {this.getHomeComponent()}
        </MenuContainer>
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
)(Home);
