import React, { Component } from 'react';

import JobPostings from '../components/JobPostings.js';

class Home extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.isLoggedIn);
    }

    render() {

        let home = <JobPostings />;;
        /*
         if (isLoggedIn) {
         home =
         } else {
         home = <Landing />
         }
         */
        return (
            <div>
                {home}
            </div>
        );
    }
}

export default Home;