/**
 * Created by Zack on 3/28/18.
 */
import React, { Component } from 'react';
import { getCompanyList } from '../helpers/api';

import { Grid, Header, Card, Button, Modal, Input } from 'semantic-ui-react';

class Companies extends Component {
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
    this.state = { companies: [] };
    this.makeTiles = this.makeTiles.bind(this);
    getCompanyList((res) => {
      if (!res) {
        console.log('Could not get company list');
      } else {
        console.log(res);
        let companyOptions = res.data.response.map(company => ({
          key: company.idCompany,
          value: company.idCompany,
          text: company.CompanyName,
        }));

        companyOptions = companyOptions.filter(obj => obj.key != -1);
        this.setState({ companies: companyOptions });
      }
    });
  }

  handleClick(e, { name, value }) {
    this.setState({ [name]: value });
  }

  makeTiles() {
    return this.state.companies.map((item, index) => (
      <Card fluid key={item.key} href={`/company:${item.value}`} header={item.text} meta={item.type} description={item.description} />
    ));
  }

  render() {
    return (
      <Grid.Column centered>
        <Grid.Row>
          <Header size='large'>
                        Companies
          </Header>
        </Grid.Row>
        <Card.Group>
          {this.makeTiles()}
        </Card.Group>
      </Grid.Column>
    );
  }
}

export default Companies;
