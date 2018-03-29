/**
 * Created by Zack on 3/28/18.
 */
import React, { Component } from 'react';

import { Grid, Header, Card, Button, Modal, Input } from 'semantic-ui-react';

const recruiters = [
  {
    userID: 0,
    FirstName: 'Recruiter',
    LastName: 'Number 0',
  },
  {
    userID: 1,
    FirstName: 'Recruiter',
    LastName: 'Number 1',
  },
  {
    userID: 2,
    FirstName: 'Recruiter',
    LastName: 'Number 2',
  },
  {
    userID: 3,
    FirstName: 'Recruiter',
    LastName: 'Number 3',
  },
  {
    userID: 4,
    FirstName: 'Recruiter',
    LastName: 'Number 4',
  },
];

class Recruiter extends Component {
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
      openRemove: false, openAdd: false, recruiterToRemove: '', recruiterToAdd: '',
    };
    this.makeTiles = this.makeTiles.bind(this);
    this.showRemove = this.showRemove.bind(this);
    this.showAdd = this.showAdd.bind(this);
    this.hideRemove = this.hideRemove.bind(this);
    this.hideAdd = this.hideAdd.bind(this);
    this.remove = this.remove.bind(this);
    this.add = this.add.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(e, { name, value }) {
    this.setState({ [name]: value });
  }

  showRemove(e, { userID }) {
    console.log(userID);
    this.setState({ openRemove: true, recruiterToRemove: userID });
  }

  showAdd() {
    this.setState({ openAdd: true, recruiterToAdd: '' });
  }

  hideRemove() {
    this.setState({ openRemove: false, recruiterToRemove: '' });
  }

  hideAdd() {
    this.setState({ openAdd: false, recruiterToAdd: '' });
  }

  remove() {
    console.log(`deleting ${this.state.recruiterToRemove}`);
    this.hideRemove();
  }

  add() {
    console.log(`adding ${this.state.recruiterToAdd}`);
    this.hideAdd();
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value });
  }

  makeTiles() {
    return recruiters.map((item, index) => (
      <Card fluid key={item.userID}>
        <Card.Content>
          <Card.Header>
            {item.FirstName} {item.LastName}
          </Card.Header>
          <Card.Meta>
                        Recruiter
          </Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <Button basic color='red' userID={item.userID} onClick={this.showRemove}>Remove Recruiter</Button>
        </Card.Content>
      </Card>
    ));
  }

  render() {
    return (
      <Grid.Column centered>
        <Grid.Row>
          <Header size='large'>
                    Recruiters <Button circular icon='add user' size='small' floated='right' onClick={this.showAdd} />
          </Header>
        </Grid.Row>
        <Card.Group>
          {this.makeTiles()}
        </Card.Group>
        <Modal size='tiny' open={this.state.openRemove} onClose={this.hideRemove}>
          <Modal.Header>
                        Delete Your Account
          </Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to delete {this.state.recruiterToRemove}?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.hideRemove}>
                            No
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={this.remove} />
          </Modal.Actions>
        </Modal>
        <Modal size='tiny' open={this.state.openAdd} onClose={this.hideAdd}>
          <Modal.Header>
                        Add Recruiter
          </Modal.Header>
          <Modal.Content>
            <p>Enter the email address of the recruiter you wish to add</p>
            <Input fluid name='recruiterToAdd' placeholder='Recruiter email' onChange={this.handleChange} />
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={this.hideAdd}>
                            No
            </Button>
            <Button positive icon='checkmark' labelPosition='right' content='Yes' onClick={this.add} />
          </Modal.Actions>
        </Modal>
      </Grid.Column>

    );
  }
}

export default Recruiter;
