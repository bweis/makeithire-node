import React, { Component } from 'react';
import { getUserDetails } from '../helpers/api';
import { getCompanyList } from '../helpers/api';
import { getCookie } from '../helpers/utils';
import MenuContainer from '../containers/MenuContainer';


import { Form } from 'semantic-ui-react'



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
    console.log(this.props.match.params.companyId);
    this.state = { company: '', readOnly: true, modal: false };
    console.log(this.props.isLoggedIn);
    this.state = { isRecruiter: -1, company: {} };
    this._click = this._click.bind(this);
    this._toggle = this._toggle.bind(this);
    this._updateInfo = this._toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // getUserDetails((res) => {
    //   if (!res) {
    //     console.log('Could not get user details');
    //   } else {
    //     console.log(res.data.response);
    //     // this.setState({ isRecruiter: res.data.response.type }); // Not a real thing. TODO FIX THIS OR GET STATUS ON LOGIN
    //     lol.setState({ isRecruiter: 0 }); // Mock student state
    //     getCompanyDetails(lol, cookie, this.props.match.params.companyId);
    //   }
    // });
    // $.ajax({
    //   type: 'GET',
    //   headers: { authorization: cookie },
    //   url: `${url}/api/getUserDetails`,
    // })
    //   .done((data, status, xhr) => {
    //     if (data.message === 'Success') {
    //       console.log(data.response);
    //       lol.setState({ isRecruiter: data.response.type });
    //       getCompanyDetails(lol, cookie, data.response.idCompany);
    //     }
    //   })
    //   .fail((jqxhr, settings, ex) => {
    //     console.log('failed on isRecruiter');
    //   });
    getCompanyList((res) => {
      if (!res) {
        console.log('Could not get company list');
      } else {
        var companyID = this.props.match.params.companyId;
        for (let i = 0; i < res.data.response.length; i++) {
          console.log(`loop companyID: ${companyID} checked against: ${res.data.response[i].idCompany}`);
          if (res.data.response[i].idCompany == companyID) {
            console.log('match');
            console.log(res.data.response[i]);
            this.setState({company: res.data.response[i]});
            break;
          }
        }
      }
    });
  }

  handleChange(e, { name, value }){
    this.setState({ [name]: value });
  }

  _updateInfo() {
    console.log('update');
  }

  _click() {
    this.setState(prevState => ({ readOnly: !prevState.readOnly }));
  }

  _toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  _remove() {
    const cookie = getCookie('token');
    const email = { EmailToDelete: $('#recruiters').val() };
    $.ajax({
      type: 'POST',
      url: `${url}/api/requestDelete`,
      headers: { authorization: cookie },
      data: email,
      success(msg) {
        console.log('successful request to delete');
      },
      failure(msg) {
        console.log('request to delete failed');
      },
    });
    this._toggle();
  }

  onTodoChange(value) {
    const temp = this.company;
    temp.Description = value;
    this.setState({
      company: value,
    });
  }

  render() {
    let button;
    if (this.state.isRecruiter === 2) {
      button = (
        <FormGroup row hidden={this.state.readOnly}>
          <Button onClick={() => { this._toggle(); }}>Remove recruiter</Button>
          <Button onClick={() => { this._click(); }}>Edit Information</Button>
        </FormGroup>
      );
    }
    return (
      <MenuContainer loggedIn>
        <Form>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Company' value={this.state.company.CompanyName} readOnly/>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.TextArea label='About' name='description' value={this.state.company.Description}/>
          </Form.Group>
        </Form>
        </MenuContainer>
    );
  }
}

export default Company;
