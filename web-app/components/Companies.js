import _ from 'lodash';
import { Grid, Header, Card, Search, Label } from 'semantic-ui-react';


import React, { Component } from 'react';
import { getCompanyList } from '../helpers/api';


class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = { companies: [] };
    this.makeTiles = this.makeTiles.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
    console.log(props);
    getCompanyList((res) => {
      if (!res) {
        console.log('Could not get company list');
      } else {
        let companyOptions = res.data.response.map(company => ({
          key: company.idCompany,
          value: company.idCompany,
          title: company.CompanyName,
        }));

        companyOptions = companyOptions.filter(obj => obj.key !== -1);
        this.setState({ companies: companyOptions });
      }
    });
  }

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent() {
    this.setState({ isLoading: false, results: [], value: '' });
  }

  handleResultSelect(e, { result }) {
    this.setState({ value: result.title });
    console.log('click');
  }

  handleSearchChange(e, { value }) {
    this.setState({
      isLoading: true,
      value,
    });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.title);
      console.log(this.state.companies);
      this.setState({
        isLoading: false,
        results: _.filter(this.state.companies, isMatch),
      });
    }, 300);
  }

  handleClick(e, { name, value }){
    this.setState({ [name]: value });
  }

  makeTiles() {
    return this.state.companies.map(item => (
      <Card fluid key={item.key} href={`/company/${item.value}`} header={item.title} meta={item.type} description={item.description} />
    ));
  }
  render() {
    const { isLoading, value, results } = this.state;
    const resultRenderer = ({ title, value }) => <Label as='a' href={`/company/${value}`} content={title} />

    return (
      <Grid.Column >
        <Grid.Row>
          <Header size='large'>
            Companies
          </Header>
        </Grid.Row>
        <Grid.Row>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            results={results}
            value={value}
            resultRenderer={resultRenderer}
          />
        </Grid.Row>
        <Grid.Row>
          <Card.Group>
            {this.makeTiles()}
          </Card.Group>
        </Grid.Row>
      </Grid.Column>
    );
  }
}

export default Companies;
