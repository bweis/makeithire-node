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

var companies = [
    {
    company_id: 1,
    companyName: 'Google',
    logo: './img/google.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    headquarters: 'Mountain View, CA',
    tags: [],
    openings: []
    },
    {
        company_id: 2,
        companyName: 'LinkedIn',
        logo: './img/google.png',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        headquarters: 'Mountain View, CA',
        tags: [],
        openings: []
    },
    {
        company_id: 3,
        companyName: 'Robinhood',
        logo: './img/google.png',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        headquarters: 'Mountain View, CA',
        tags: [],
        openings: []
    },
    {
        company_id: 4,
        companyName: 'Salesforce',
        logo: './img/google.png',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
        headquarters: 'Mountain View, CA',
        tags: [],
        openings: []
    },
];

var company = {
    company_id: 1,
    companyName: 'Google',
    logo: './img/google.png',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
    headquarters: 'Mountain View, CA',
    tags: [],
    openings: []
};

var user = {
    isRecruiter: true
};

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
        this._click = this._click.bind(this);
        this._toggle = this._toggle.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.location == this.props.location) {
            console.log('here')
        }
    }

    _click() {
        this.setState(prevState => ({readOnly: !prevState.readOnly}))
    }

    _toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        var button;
        if (user.isRecruiter) {
            button = (
                <FormGroup>
                    <Button onClick={this._toggle}>Remove recruiter</Button>
                    <Button onClick={this._click}>Edit Information</Button>
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
                                    <Media object className="profile-image" src={company.logo} />
                                </Media>
                            </Col>
                            <Col>
                                <h4>
                                    {company.companyName}
                                </h4>
                                <Input className="profile-input align-middle" id="company_hq" type="text" defaultValue={company.headquarters} readOnly={this.state.readOnly} />

                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Input className="profile-input align-middle" id="company_description" type="textarea" name="description" defaultValue={company.description} readOnly={this.state.readOnly}/>
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
                            <ModalHeader toggle={this._toggle}>Modal title</ModalHeader>
                            <ModalBody>
                                <Input id="recruiters"></Input>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this._toggle}>Remove Recruiters</Button>
                                <Button color="secondary" onClick={this._toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                        {button}
                    </Form>
                </Container>
            </div>
        )
    }
}

export default Company;