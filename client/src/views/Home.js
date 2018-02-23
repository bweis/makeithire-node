import React, { Component } from 'react';

import $ from 'jquery';
import JobPostings from '../components/JobPostings.js';
var url = "http://localhost:3001";

function getCookie(name) {
    var match = document.cookie.match(new RegExp(name + '=([^;]+)'));
    if (match) return match[1];
    else return "";
}

class Home extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.isLoggedIn);
        this.state = {isRecruiter: -1};
        var cookie = getCookie("token");

        var lol = this;

        $.ajax({
            type: 'GET',
            headers: {'authorization': cookie},
            url: url + "/api/isRecruiter"
        })
            .done(function (data, status, xhr) {
                if (data.message === "Success") {
                    console.log('success on isRecruiter');
                    console.log(data.response);
                    lol.setState({isRecruiter: data.response})
                }
            })
            .fail(function (jqxhr, settings, ex) {
                console.log('failed on isRecruiter');
            })
    }

    render() {
        let home = '';
        if (this.state.isRecruiter == -1) {
            //
        } else if (this.state.isRecruiter == 0) {
            home = '<h1>Student Home Page</h1>';
        } else if (this.state.isRecruiter == 1) {
            home = '<h1>Recruiter Home Page</h1>';
        } else {
            home = '<h1>Head Recruiter Home Page</h1>'
        }
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