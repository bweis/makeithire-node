import React, {Component} from 'react';
import { Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react';
import PropTypes from 'prop-types';
// import {connect} from 'react-redux';
// import {bindActionCreators} from 'redux';
// import {Link, Switch, Route, Redirect} from 'react-router-dom';
// import {Container} from 'reactstrap';
// import Header from '../../components/Header/';
// import Sidebar from '../../components/Sidebar/';
//
// import Home from '../../views/Home/';
// import Profile from '../../views/Profile/';
// import Applications from '../../views/Applications/';
// import Chat from '../../views/Chat/';
// import Company from '../../views/Company/'
// import Login from '../../views/LoginSignup/';

class Full extends Component {

    // constructor (props) {
    //     super(props)
    //     this.state = {isLoggedIn: true};
    // }
    //
    // componentDidMount() {
    //     this.setState({isLoggedIn: true});
    // }
    //
    // render() {
    //     let sidebar = null;
    //     if (this.state.isLoggedIn) {
    //         document.body.classList.add('sidebar-fixed');
    //         sidebar = <Sidebar {...this.props}/>;
    //     }
    //     return (
    //         <div className="app">
    //             <Header isLoggedIn={this.state.isLoggedIn}/>
    //             <div className="app-body">
    //                 {sidebar}
    //                 <main className="main">
    //                     <Container fluid>
    //                         <Switch>
    //                             <Route path="/home" name="Home" component={Home}/>
    //                             <Route path="/profile" name="Profile" component={Profile} />
    //                             <Route path="/login" name="Login" component={Login} />
    //                             <Route path="/applications" name="Applications" component={Applications} />
    //                             <Route path="/chat" name="Chat" component={Chat} />
    //                             <Route path="/company/" name="Company" component={Company} />
    //                             <Redirect from="/" to="/home"/>
    //                         </Switch>
    //                     </Container>
    //                 </main>
    //             </div>
    //         </div>
    //     );
    // }
    state = { visible: true };

    toggleVisibility = () => this.setState({ visible: !this.state.visible });

    render() {
        const { visible } = this.state;
        return (
            <div className="app">
            <Button onClick={this.toggleVisibility}>Toggle Visibility</Button>
                <Sidebar.Pushable className="test" as={Segment}>
                    <Sidebar as={Menu} animation='push' width='thin'  visible='true' icon='labeled' vertical inverted>
                        <Menu.Item>
                            Gauge
                        </Menu.Item>
                    </Sidebar>
                    <Sidebar.Pusher>
                        <div>

                        </div>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
        </div>);
    }
}

export default Full;