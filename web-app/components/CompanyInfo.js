import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Input, Segment } from 'semantic-ui-react';
import { login } from '../helpers/session';
import { updateCompanyDetails } from '../helpers/api';

class CompanyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editable: false,
      CompanyName: '',
      Description: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  componentWillReceiveProps(newProps) {
    console.log('Got New Props', newProps);
    this.setState({
      CompanyName: newProps.companyDetails.CompanyName,
      Description: newProps.companyDetails.Description,
    });
  }
  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }
  handleEdit() {
    this.setState({ editable: true });
  }
  handleSave() {
    this.setState({ editable: false });
    const { CompanyName, Description } = this.state;
    const company = {
      CompanyName,
      Description,
      HashTags: this.props.companyDetails.HashTags,
      idCompany: this.props.companyDetails.idCompany,
      idHeadRecruiter: this.props.companyDetails.idHeadRecruiter,
    };
    updateCompanyDetails(company, (res, err) => {
      if (res) {
        console.log(res);
      } else {
        console.log(err);
      }
    });

    console.log(company);
  }
  render() {
    const {
      editable,
      CompanyName,
      Description,
    } = this.state;
    if (!editable) {
      return (
        <Segment style={{ padding: '8em 0em' }} vertical color='teal'>
          <Grid centered columns={2}>
            <Grid.Column>
              <Image src='/img/google.png' size='small' circular />
              <Header as='h1' textAlign='center'>{CompanyName}</Header>
              <Header as='h3' textAlign='left'>Description: {Description}</Header>
              <Button onClick={this.handleEdit}>Edit</Button>
            </Grid.Column>
          </Grid>
        </Segment>
      );
    } else {
      return (
        <Segment style={{ padding: '8em 0em' }} vertical color='teal'>
          <Grid centered columns={2}>
            <Grid.Column>
              <Image src='/img/google.png' size='small' circular />
              <Form onSubmit={this.handleSave} >
                <Segment stacked>
                  <Form.Input
                    name='CompanyName'
                    fluid
                    value={CompanyName}
                    onChange={this.handleChange}
                    label='Company Name'
                  />
                  <Form.Input
                    name='Description'
                    fluid
                    value={Description}
                    onChange={this.handleChange}
                    label='Description'
                  />
                  <Form.Button color='teal' fluid>Save</Form.Button>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </Segment>
      );
    }
  }
}

export default CompanyInfo;

