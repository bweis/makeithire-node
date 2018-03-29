/**
 * Created by Zack on 3/27/18.
 */
import React, { Component } from 'react';
import { getUserDetails } from '../helpers/api';
import { getCompanyList } from '../helpers/api';
import { getCookie } from '../helpers/utils';
import MenuContainer from '../containers/MenuContainer';


import { Form, Grid, Image, Input } from 'semantic-ui-react';


class CompanyInfo extends Component {
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
    this.state = {
      readOnly: true, modal: false, isRecruiter: -1, company: {},
    };
    this._click = this._click.bind(this);
    this._toggle = this._toggle.bind(this);
    this._updateInfo = this._toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    getCompanyList((res) => {
      if (!res) {
        console.log('Could not get company list');
      } else {
        const companyID = this.props.match.params.companyId;
        for (let i = 0; i < res.data.response.length; i++) {
          console.log(`loop companyID: ${companyID} checked against: ${res.data.response[i].idCompany}`);
          if (res.data.response[i].idCompany == companyID) {
            console.log('match');
            console.log(res.data.response[i]);
            this.setState({ company: res.data.response[i] });
            break;
          }
        }
      }
    });
  }

  handleChange(e, { name, value }) {
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
    const style = {
      textAlign: 'center',
      margin: 'auto !important',
      border: 'none',
      resize: 'none',
    };
    return (
      <Grid centered columns={2}>
        <Grid.Column centered>
          <Form>
            <Form.Group>
              <Image src='./img/google.png' size='small' circular />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input fluid value={this.state.company.CompanyName} readOnly transparent />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.TextArea fluid name='description' value={this.state.company.Description} readOnly style={style} />
            </Form.Group>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default CompanyInfo;
