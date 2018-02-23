import React, { Component } from 'react';

import {
    Container,
    Row,
    Col,
    Media,
    Form,
    FormGroup,
    Input,
    Label,
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
} from 'reactstrap';

import $ from 'jquery';

var url = "http://localhost:3001";

function getCookie(name) {
    var match = document.cookie.match(new RegExp(name + '=([^;]+)'));
    if (match) return match[1];
    else return "";
}

function getCompanyDetails(context, cookie, companyID) {
    $.ajax({
        type: 'GET',
        headers: {'authorization': cookie},
        url: url + "/api/getCompanyList"
    })
        .done(function (data, status, xhr) {
            if (data.message === "Success") {
                console.log(companyID);
                for (var i = 0; i < data.response.length; i++) {
                    console.log('loop companyID: ' + companyID + ' checked against: ' + data.response[i].idCompany);
                    if (data.response[i].idCompany == companyID) {
                        console.log('match');
                        context.setState({company: data.response[i]});
                    }
                    console.log(context.state.company);
                }
            }
        })
        .fail(function (jqxhr, settings, ex) {
            console.log('failed on isRecruiter');
        });
}

class Company extends Component {
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
        this.state = {readOnly: true, modal: false};
        console.log(this.props.isLoggedIn);
        this.state = {isRecruiter: -1, company: {}};
        var cookie = getCookie("token");
        var lol = this;
        this._click = this._click.bind(this);
        this._toggle = this._toggle.bind(this);
        this._updateInfo = this._toggle.bind(this);
        $.ajax({
            type: 'GET',
            headers: {'authorization': cookie},
            url: url + "/api/getUserDetails"
        })
            .done(function (data, status, xhr) {
                if (data.message === "Success") {
                    console.log(data.response);
                    lol.setState({isRecruiter: data.response.type});
                    getCompanyDetails(lol, cookie, data.response.idCompany);
                }
            })
            .fail(function (jqxhr, settings, ex) {
                console.log('failed on isRecruiter');
            });

    }

    _updateInfo() {
        alert('TODO: update details');
    }

    _click() {
        this.setState(prevState => ({readOnly: !prevState.readOnly}))
    }

    _toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    _remove() {
        var d = {
            
        };
        $.ajax({
            type: 'POST',
            url: url + '/api/deleteRecruiter',
            data: u,
            success: function(msg) {
                console.log("successful update");
                mount(haha)
            },
            failure: function(msg) {
                console.log("shit failed");
            }
        });
        this._toggle();
    }

    onTodoChange(value){
        let temp = this.company;
        temp.Description = value;
        this.setState({
            company:value
        });
    }

    render() {
        var button;
        if (this.state.isRecruiter == 2) {
            button = (
                <FormGroup row hidden={this.state.readOnly}>
                    <Button onClick={() => { this._toggle()}}>Remove recruiter</Button>
                    <Button onClick={() => { this._click()}}>Edit Information</Button>
                </FormGroup>
            )
        }
        return (
            <div>
                <Container className="pad-top">
                    <Form>
                        <FormGroup row>
                            <Col>
                                <Media className="col-form-label">
                                    <Media object className="profile-image" src={this.state.company.logo} />
                                </Media>
                            </Col>
                            <Col>
                                <h4>
                                    {this.state.company.CompanyName}
                                </h4>

                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Input className="profile-input align-middle" id="company_description" onChange={e => this.onTodoChange(e.target.value)} type="textarea" name="description" value={this.state.company.Description} readOnly={this.state.readOnly} />
                        </FormGroup>
                        <br />
                        <FormGroup row>
                            Job Listings
                        </FormGroup>
                        <br />
                        <FormGroup row>
                            Tags
                        </FormGroup>
                        <Modal isOpen={this.state.modal} toggle={this._toggle}>
                            <ModalHeader toggle={() => {this._toggle()}}>Modal title</ModalHeader>
                            <ModalBody>
                                <Input id="recruiters"></Input>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={() => { this._remove()}}>Remove Recruiters</Button>
                                <Button color="secondary" onClick={() => { this._toggle()}}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                        {button}
                        <FormGroup row hidden={!this.state.readOnly}>
                            <Col>
                                <Button onClick={() => { this._updateInfo()}} className="col-form-label">
                                    Save Changes
                                </Button>
                            </Col>
                            <Col>
                                <Button onClick={this._click}>
                                    Deactivate Account
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Container>
            </div>
        )
    }
}

export default Company;